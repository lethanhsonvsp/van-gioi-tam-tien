import { BALANCE } from '../content';
import { hpMaxFor, type Character } from './character';
import type { GameState } from './save';

const P = BALANCE.progression;
export const MAX_LEVEL = P.maxLevel;

// EXP needed to go from `level` to `level + 1` (alpha-temporary formula in balance.json).
export const expToNext = (level: number): number => Math.round(P.expToNext.base * level ** P.expToNext.pow);
// Linh thach to cultivate one level directly from `level` (the main linh thach sink).
export const cultivateCost = (level: number): number => Math.round(P.cultivateCost.base * level ** P.cultivateCost.pow);

// Realm label by 10-level band: "Luyện Khí 3", "Trúc Cơ 1"...
export function realmLabel(level: number): string {
  const i = Math.min(P.realms.length - 1, Math.floor((level - 1) / P.realmSize));
  return `${P.realms[i]} ${level - i * P.realmSize}`;
}

// Protagonist: global max. Tien No: player level + rarity bonus (alpha-temporary), never above the global max.
export const levelCap = (c: Character, playerLevel: number, isPlayer: boolean): number =>
  isPlayer ? MAX_LEVEL : Math.min(MAX_LEVEL, playerLevel + P.capBonus[c.rarity]);

const atLevel = <C extends Character>(c: C, level: number, exp: number): C => {
  const hpMax = hpMaxFor(c.rarity, level, c.element);
  return { ...c, level, exp, hp: hpMax, hpMax };
};

// Pure. EXP beyond the cap is kept only up to one level's worth, so raising the cap later lets it level.
export function addExp<C extends Character>(c: C, amount: number, cap: number): C {
  let level = c.level, exp = c.exp + Math.max(0, amount);
  while (level < cap && exp >= expToNext(level)) { exp -= expToNext(level); level++; }
  if (level >= cap) exp = Math.min(exp, expToNext(level));
  return level === c.level && exp === c.exp ? c : atLevel(c, level, exp);
}

const isPlayerId = (s: GameState, id: string) => id === s.player.id;
const find = (s: GameState, id: string): Character | undefined => (isPlayerId(s, id) ? s.player : s.tienNo.find(c => c.id === id));

export function capOf(s: GameState, id: string): number {
  const c = find(s, id);
  return c ? levelCap(c, s.player.level, isPlayerId(s, id)) : 0;
}

// Why cultivation is blocked, or null when it is allowed.
export function cultivateBlock(s: GameState, id: string): string | null {
  const c = find(s, id);
  if (!c) return 'Không có nhân vật này.';
  if (c.level >= capOf(s, id)) return c.level >= MAX_LEVEL ? 'Đã đạt cấp tối đa.' : 'Đã chạm trần cấp (theo cấp nhân vật chính và độ hiếm).';
  if (s.currency.LINH_THACH < cultivateCost(c.level)) return `Không đủ linh thạch (cần ${cultivateCost(c.level)}).`;
  return null;
}

// Pure: spend linh thach to raise one level (EXP progress kept). Returns null when blocked.
export function cultivate(s: GameState, id: string): GameState | null {
  if (cultivateBlock(s, id)) return null;
  const c = find(s, id)!;
  const currency = { ...s.currency, LINH_THACH: s.currency.LINH_THACH - cultivateCost(c.level) };
  const up = atLevel(c, c.level + 1, Math.min(c.exp, expToNext(c.level + 1)));
  return isPlayerId(s, id)
    ? { ...s, currency, player: up }
    : { ...s, currency, tienNo: s.tienNo.map(t => (t.id === id ? { ...up, copies: t.copies } : t)) };
}
