import { SKILLS, TRIAL } from '../content';
import { statsFor } from '../core/character';
import type { Fighter } from './types';

export const FLOOR_COUNT = TRIAL.floors;

// Monsters per floor come from a formula (trial.json, alpha-temporary), so more floors only need a bigger `floors`.
export function floorMonsters(floor: number): Fighter[] {
  const m = TRIAL.monster;
  const level = Math.max(1, floor * m.levelPerFloor);
  const count = Math.min(m.countMax, m.countBase + Math.floor((floor - 1) * m.countPerFloor));
  return Array.from({ length: count }, (_, i) => {
    const element = TRIAL.elements[(floor * 3 + i) % TRIAL.elements.length];
    const boss = floor % m.bossEvery === 0 && i === count - 1;
    const mult = boss ? m.bossMult : 1;
    const s = statsFor('N', level, element);
    const hp = Math.round(s.hp * m.statMult.hp * mult);
    return {
      charId: `MON.${element}${boss ? '.BOSS' : ''}`,
      name: `${boss ? 'Thủ Lĩnh ' : ''}${TRIAL.names[element]}`,
      element, rarity: 'N', level, hp, hpMax: hp,
      atk: Math.round(s.atk * m.statMult.atk * mult), def: Math.round(s.def * m.statMult.def), spd: s.spd * m.statMult.spd,
      skill: SKILLS.basic,
    };
  });
}
