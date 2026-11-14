import { BALANCE, RARITIES, TIEN_NO, TRIAL } from '../content';
import { validateName } from './name';
import { levelCap } from './progress';
import { hpMaxFor } from './character';
import { validParty } from './roster';
import { migrate, parseSave, SAVE_SHAPE, SAVE_VERSION, serialize, type GameState } from './save';

export const IMPORT_MAX_CHARS = 1_000_000; // 1 MB of text; a real save is a few KB
export interface ImportSummary { name: string; level: number; linhThach: number; floor: number; tienNo: number; version: number }
export type ImportResult = { ok: true; state: GameState; summary: ImportSummary } | { ok: false; error: string };

// Duplicate pulls are unbounded in play (only the cap bonus is capped at duplicateCapMax), so this just rejects absurd counts.
const MAX_COPIES = 100_000;
const fail = (error: string): ImportResult => ({ ok: false, error });
const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const int = (v: unknown, min: number, max = Number.MAX_SAFE_INTEGER): boolean => Number.isInteger(v) && (v as number) >= min && (v as number) <= max;

// Value-range checks on top of the shape checks: first problem found, in Vietnamese, or null.
function checkCharacter(c: unknown, what: string): string | null {
  if (!isObj(c)) return `${what}: sai kiểu dữ liệu.`;
  if (typeof c.id !== 'string' || !c.id) return `${what}: thiếu mã.`;
  if (typeof c.name !== 'string' || validateName(c.name) !== c.name) return `${what}: tên không hợp lệ.`;
  if (!RARITIES.includes(c.rarity as never)) return `${what}: độ hiếm "${String(c.rarity)}" không có trong nội dung.`;
  if (!int(c.level, 1, BALANCE.progression.maxLevel)) return `${what}: cấp ${String(c.level)} ngoài miền 1..${BALANCE.progression.maxLevel}.`;
  if (typeof c.exp !== 'number' || !Number.isFinite(c.exp) || c.exp < 0 || c.exp > Number.MAX_SAFE_INTEGER) return `${what}: kinh nghiệm không hợp lệ.`;
  // Real HP is statsFor at the same level; allow 2x headroom over the max-level value (element bias, future balance), reject absurd values.
  const hpCeil = 2 * hpMaxFor(c.rarity as never, BALANCE.progression.maxLevel, String(c.element));
  if (!int(c.hpMax, 1, hpCeil) || !int(c.hp, 0, c.hpMax as number)) return `${what}: máu không hợp lệ.`;
  return null;
}

function checkRanges(s: GameState): string | null {
  const bad = checkCharacter(s.player, 'Nhân vật chính');
  if (bad) return bad;
  if (s.player.id !== 'CHAR.PLAYER.MAIN') return 'Nhân vật chính: mã không đúng.';
  const seen = new Set<string>();
  for (const t of s.tienNo) {
    const e = checkCharacter(t, 'Tiên Nô');
    if (e) return e;
    const def = TIEN_NO.find(d => d.id === t.id);
    if (!def) return `Tiên Nô "${t.id}" không có trong nội dung.`;
    if (seen.has(t.id)) return `Tiên Nô "${t.id}" bị trùng.`;
    seen.add(t.id);
    if (t.rarity !== def.rarity) return `Tiên Nô ${def.name}: độ hiếm ${t.rarity} sai (đúng là ${def.rarity}).`;
    if (!int(t.copies, 0, MAX_COPIES)) return `Tiên Nô ${def.name}: số bản sao không hợp lệ.`;
    if (t.level > levelCap(t, s.player.level, false)) return `Tiên Nô ${def.name}: cấp ${t.level} vượt trần cấp ${levelCap(t, s.player.level, false)}.`;
  }
  if (!validParty(s.party, s.player.id, [...seen])) return 'Tổ đội không hợp lệ (trùng người, người chưa sở hữu hoặc thiếu nhân vật chính).';
  if (!int(s.tickets, 0)) return 'Số thẻ triệu hồi không hợp lệ.';
  for (const [k, v] of Object.entries(s.currency)) if (!int(v, 0)) return `Tiền tệ ${k} = ${String(v)} ngoài miền (phải là số nguyên không âm).`;
  if (!int(s.pity.sinceSR, 0) || !int(s.pity.sinceUR, 0)) return 'Bộ đếm bảo đảm không hợp lệ.';
  if (!int(s.linhLuc.max, 0) || !int(s.linhLuc.cur, 0, s.linhLuc.max)) return 'Linh lực không hợp lệ.';
  const t = s.trial;
  if (!int(t.cleared, 0, TRIAL.floors) || !int(t.floor, 1, Math.min(t.cleared + 1, TRIAL.floors))) return `Thí Luyện: tầng ${String(t.floor)}/đã qua ${String(t.cleared)} ngoài miền 1..${TRIAL.floors}.`;
  if (Object.values(t.repeats).some(v => !int(v, 0))) return 'Thí Luyện: số lần lặp không hợp lệ.';
  return Number.isFinite(s.rng.state) ? null : 'Hạt giống ngẫu nhiên không hợp lệ.';
}

// Pure import check: same parse/migrate/shape code as the real loader, plus range checks. Never touches storage.
export function importSave(text: string): ImportResult {
  if (text.length > IMPORT_MAX_CHARS) return fail('Chuỗi quá dài (tối đa 1 MB), không đọc.');
  let raw: unknown;
  try { raw = JSON.parse(text); } catch { return fail('Không phải JSON hợp lệ.'); }
  if (!isObj(raw)) return fail('Save phải là một đối tượng JSON.');
  const v = raw.version;
  if (typeof v !== 'number') return fail('Thiếu trường version.');
  if (!Number.isInteger(v) || v < 1 || v > SAVE_VERSION) return fail(`Phiên bản save ${String(v)} không hỗ trợ (hỗ trợ 1..${SAVE_VERSION}).`);
  if (!isObj(raw.player) || !Array.isArray(raw.tienNo)) return fail(`Thiếu hoặc sai kiểu trường ${isObj(raw.player) ? 'tienNo' : 'player'}.`);
  let state: GameState | null = null;
  try { state = migrate(raw as { version: number }); } catch { return fail('Dữ liệu sai kiểu, không nâng cấp được lên phiên bản hiện tại.'); }
  if (!state) return fail(`Không nâng cấp được save phiên bản ${v}.`);
  const field = SAVE_SHAPE.find(([, ok]) => !ok(state as unknown as Record<string, unknown>));
  if (field) return fail(`Thiếu hoặc sai kiểu trường ${field[0]}.`);
  const range = checkRanges(state);
  if (range) return fail(range);
  if (parseSave(serialize(state)).warning) return fail('Save không qua bộ nạp của game.'); // last guard: the real loader must accept it
  return { ok: true, state, summary: { name: state.player.name, level: state.player.level, linhThach: state.currency.LINH_THACH, floor: state.trial.floor, tienNo: state.tienNo.length, version: v } };
}
