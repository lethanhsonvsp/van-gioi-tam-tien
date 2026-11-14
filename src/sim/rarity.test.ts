import { describe, expect, it } from 'vitest';
import { TIEN_NO, type Rarity } from '../content';
import { runBattle } from '../battle/engine';
import { floorMonsters } from '../battle/monsters';
import { fighterOf } from '../battle/team';
import { makeCharacter, statsFor } from '../core/character';

// VS-11 (Chairman: "rarity tiers must differ in strength"): same level, only the rarity changes.
const TIERS: Rarity[] = ['R', 'SR', 'SSR', 'UR'];
const BATTLES = 200; // fixed seeds 1..200 per floor and tier
const LEVEL = 15; // about the sample player's party level on floors 10-20

// Effective power of one unit = hp x atk x spd (def left out: it already scales like hp and atk).
const power = (r: Rarity) => { const s = statsFor(r, LEVEL, 'NONE'); return s.hp * s.atk * s.spd; };

function winRate(r: Rarity, floor: number): number {
  const team = TIEN_NO.slice(0, 5).map(t => fighterOf(makeCharacter({ ...t, rarity: r }, LEVEL)));
  let wins = 0;
  for (let seed = 1; seed <= BATTLES; seed++) if (runBattle(team, floorMonsters(floor), seed).winner === 'A') wins++;
  return wins / BATTLES;
}

describe('rarity tiers differ in strength at the same level', () => {
  it('effective power: each tier at least ~1.15x the one below', () => {
    const p = TIERS.map(power);
    console.log('power ratio', TIERS.slice(1).map((r, i) => `${TIERS[i]}->${r} ${(p[i + 1] / p[i]).toFixed(2)}`).join(' · '));
    for (let i = 1; i < p.length; i++) expect(p[i] / p[i - 1]).toBeGreaterThanOrEqual(1.15);
  });

  it('5 same-tier Tien No on floors 10-20: R < SR < SSR < UR, >=8 points apart where the floor is contested', () => {
    const rows = Array.from({ length: 11 }, (_, i) => ({ floor: 10 + i, rates: TIERS.map(r => winRate(r, 10 + i)) }));
    console.log(['tầng | R | SR | SSR | UR', ...rows.map(r => `${r.floor} | ${r.rates.map(x => `${(x * 100).toFixed(0)}%`).join(' | ')}`)].join('\n'));
    for (const { floor, rates } of rows) for (let i = 1; i < rates.length; i++) {
      const lo = rates[i - 1], hi = rates[i];
      expect(hi, `floor ${floor} ${TIERS[i]}`).toBeGreaterThanOrEqual(lo); // monotone everywhere
      // contested pair: at least one side is neither near-certain win nor near-certain loss
      if ((lo > 0.1 && lo < 0.9) || (hi > 0.1 && hi < 0.9)) expect(hi - lo, `floor ${floor} ${TIERS[i - 1]}->${TIERS[i]}`).toBeGreaterThanOrEqual(0.08);
    }
  }, 120000);
});
