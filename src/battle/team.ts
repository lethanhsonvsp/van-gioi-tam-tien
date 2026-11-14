import { SKILLS, TIEN_NO, TRIAL } from '../content';
import { makeCharacter, statsFor, type Character } from '../core/character';
import type { GameState } from '../core/save';
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

// The player's own party (protagonist + Tien No in slots 1-5, full HP; Thi Luyen does not persist HP).
// Default (reversible): a player who owns no Tien No yet gets the sample team so the slice stays playable; once they own any, the party is used even if only the protagonist.
export function playerTeam(s: GameState): Fighter[] {
  if (s.tienNo.length === 0) return sampleTeam(s.player);
  const byId = new Map<string, Character>([[s.player.id, s.player], ...s.tienNo.map(c => [c.id, c] as [string, Character])]);
  return s.party.flatMap(id => { const c = id && byId.get(id); if (!c) return []; const f = fighterOf(c); return [{ ...f, hp: f.hpMax }]; });
}
