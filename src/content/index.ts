import tienNoJson from './tien_no.json';
import balanceJson from './balance.json';

export const RARITIES = ['N', 'R', 'SR', 'SSR', 'UR'] as const;
export type Rarity = (typeof RARITIES)[number];
export interface TienNo { id: string; name: string; element: string; rarity: Rarity; title: string; role: string }
export interface Balance {
  status: string;
  rarityStatMultiplier: Record<Rarity, number>;
  start: { level: number; linhThach: number; tienNgoc: number; xu: number; linhLuc: number; hpBase: number; playerName: string };
}

const isStr = (v: unknown): v is string => typeof v === 'string' && v.length > 0;

export function validateTienNo(data: unknown): TienNo[] {
  if (!Array.isArray(data) || data.length === 0) throw new Error('tien_no: expected a non-empty array');
  const ids = new Set<string>();
  data.forEach((c, i) => {
    const at = `tien_no[${i}]`;
    if (typeof c !== 'object' || c === null) throw new Error(`${at}: not an object`);
    for (const k of ['id', 'name', 'element', 'title', 'role']) if (!isStr((c as Record<string, unknown>)[k])) throw new Error(`${at}: missing or empty "${k}"`);
    if (!/^CHAR\.TIEN_NO\.[A-Z_]+$/.test(c.id)) throw new Error(`${at}: bad id "${c.id}"`);
    if (!(RARITIES as readonly string[]).includes(c.rarity)) throw new Error(`${at}: bad rarity "${c.rarity}"`);
    if (ids.has(c.id)) throw new Error(`${at}: duplicate id "${c.id}"`);
    ids.add(c.id);
  });
  return data as TienNo[];
}

export function validateBalance(data: unknown): Balance {
  const b = data as Balance;
  if (!b || typeof b !== 'object' || !isStr(b.status)) throw new Error('balance: missing "status"');
  for (const r of RARITIES) if (typeof b.rarityStatMultiplier?.[r] !== 'number' || !(b.rarityStatMultiplier[r] > 0)) throw new Error(`balance: bad multiplier for ${r}`);
  if (!b.start || typeof b.start.level !== 'number' || !isStr(b.start.playerName)) throw new Error('balance: bad "start"');
  return b;
}

export const TIEN_NO: TienNo[] = validateTienNo(tienNoJson);
export const BALANCE: Balance = validateBalance(balanceJson);
