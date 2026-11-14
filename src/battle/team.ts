import { SKILLS, TIEN_NO, TRIAL } from '../content';
import { makeCharacter, statsFor, type Character } from '../core/character';
import type { Fighter } from './types';

// Battle view of the shared Character model: stats derive from rarity, level and element.
export function fighterOf(c: Character): Fighter {
  const s = statsFor(c.rarity, c.level, c.element);
  const skill = SKILLS.kits[c.id] ?? SKILLS.basic;
  return { charId: c.id, name: c.name, element: c.element, rarity: c.rarity, level: c.level, hp: Math.min(c.hp, s.hp), hpMax: s.hp, atk: s.atk, def: s.def, spd: s.spd, skill };
}

// shortcut: fixed test team (protagonist + 3 Tien No from trial.json, same level as the player, full HP); VS-3 replaces it with the player's own 6-slot team.
export function sampleTeam(player: Character): Fighter[] {
  const members = TRIAL.team.map(id => makeCharacter(TIEN_NO.find(t => t.id === id)!, player.level));
  return [{ ...fighterOf(player), hp: statsFor(player.rarity, player.level, player.element).hp }, ...members.map(fighterOf)];
}
