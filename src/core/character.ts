import type { Rarity } from '../content';
import { BALANCE } from '../content';

// Shared model for the protagonist and Tien No. Each character keeps its own HP (Bi Canh later).
export interface Character {
  id: string; // DOMAIN.TYPE.NAME
  name: string;
  title: string;
  element: string;
  rarity: Rarity;
  level: number;
  exp: number;
  hp: number;
  hpMax: number;
}

export const rarityMultiplier = (r: Rarity): number => BALANCE.rarityStatMultiplier[r];

// shortcut: HP-only stat growth (base * mult^(level-1)); real stats come with the battle core (VS-2).
export const hpMaxFor = (rarity: Rarity, level: number): number =>
  Math.round(BALANCE.start.hpBase * rarityMultiplier(rarity) ** (level - 1));

export function makeCharacter(c: Pick<Character, 'id' | 'name' | 'title' | 'element' | 'rarity'>, level = 1): Character {
  const hpMax = hpMaxFor(c.rarity, level);
  return { ...c, level, exp: 0, hp: hpMax, hpMax };
}
