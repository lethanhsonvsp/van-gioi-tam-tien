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

export interface Stats { hp: number; atk: number; def: number; spd: number }

// Stats come from level, rarity multiplier and element bias (balance.json, alpha-temporary). Speed does not grow with level.
export function statsFor(rarity: Rarity, level: number, element: string): Stats {
  const b = BALANCE.battle, bias = b.elementBias[element] ?? {};
  const g = rarityMultiplier(rarity) * (1 + b.growthPerLevel * (level - 1));
  return {
    hp: Math.round(BALANCE.start.hpBase * g * (bias.hp ?? 1)),
    atk: Math.round(b.statBase.atk * g * (bias.atk ?? 1)),
    def: Math.round(b.statBase.def * g * (bias.def ?? 1)),
    spd: b.statBase.spd * (bias.spd ?? 1),
  };
}

export const hpMaxFor = (rarity: Rarity, level: number, element = 'NONE'): number => statsFor(rarity, level, element).hp;

export function makeCharacter(c: Pick<Character, 'id' | 'name' | 'title' | 'element' | 'rarity'>, level = 1): Character {
  const hpMax = hpMaxFor(c.rarity, level, c.element);
  return { ...c, level, exp: 0, hp: hpMax, hpMax };
}
