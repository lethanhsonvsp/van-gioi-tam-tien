import { BALANCE } from '../content';
import { makeCharacter, type Character } from './character';
import { newRng, type Rng } from './rng';

export const SAVE_KEY = 'vgtt.save';
export const SAVE_VERSION = 1;

export interface GameState {
  version: number;
  rng: Rng;
  player: Character;
  tienNo: Character[]; // owned Tien No, empty at start
  linhLuc: { cur: number; max: number };
  currency: { LINH_THACH: number; TIEN_NGOC: number; XU: number };
}

export function newGame(seed = Date.now()): GameState {
  const s = BALANCE.start;
  return {
    version: SAVE_VERSION,
    rng: newRng(seed),
    player: makeCharacter({ id: 'CHAR.PLAYER.MAIN', name: s.playerName, title: 'Tán tu', element: 'NONE', rarity: 'N' }, s.level),
    tienNo: [],
    linhLuc: { cur: s.linhLuc, max: s.linhLuc },
    currency: { LINH_THACH: s.linhThach, TIEN_NGOC: s.tienNgoc, XU: s.xu },
  };
}

// Frame for future version bumps: upgrade `raw` step by step until it reaches SAVE_VERSION.
export function migrate(raw: { version: number }): GameState | null {
  return raw.version === SAVE_VERSION ? (raw as GameState) : null;
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;
const looksValid = (s: unknown): s is GameState =>
  isObj(s) && isObj(s.rng) && typeof s.rng.state === 'number' && isObj(s.player) && typeof s.player.level === 'number'
  && Array.isArray(s.tienNo) && isObj(s.linhLuc) && isObj(s.currency);

export const serialize = (s: GameState): string => JSON.stringify(s);

export function parseSave(text: string | null): { state: GameState; warning?: string } {
  if (text === null) return { state: newGame() };
  try {
    const raw = JSON.parse(text);
    const migrated = isObj(raw) && typeof raw.version === 'number' ? migrate(raw as { version: number }) : null;
    if (migrated && looksValid(migrated)) return { state: migrated };
  } catch { /* fall through */ }
  return { state: newGame(), warning: 'Save hỏng hoặc khác phiên bản, bắt đầu game mới.' };
}

export function loadGame(storage: Pick<Storage, 'getItem'> = localStorage): { state: GameState; warning?: string } {
  try { return parseSave(storage.getItem(SAVE_KEY)); }
  catch { return { state: newGame(), warning: 'Không đọc được localStorage, bắt đầu game mới.' }; }
}

export function saveGame(s: GameState, storage: Pick<Storage, 'setItem'> = localStorage): boolean {
  try { storage.setItem(SAVE_KEY, serialize(s)); return true; } catch { return false; }
}
