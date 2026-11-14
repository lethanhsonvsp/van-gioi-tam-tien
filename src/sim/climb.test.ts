import { describe, expect, it } from 'vitest';
import { RARITIES, TIEN_NO, TRIAL } from '../content';
import { makeCharacter } from '../core/character';
import { newGame, type GameState } from '../core/save';
import { climb, type ClimbResult } from './climb';

const SEEDS = 40;
const WIN_FLOOR = 0.15; // per-attempt win rate below this on a floor = "hard wall" flag (alpha)

function report(name: string, runs: ClimbResult[]) {
  const rows = Array.from({ length: TRIAL.floors }, (_, i) => {
    const a = runs.reduce((x, r) => x + r.floors[i].attempts, 0), w = runs.reduce((x, r) => x + r.floors[i].wins, 0);
    const stuck = runs.filter(r => r.stuckAt === i + 1).length;
    return { floor: i + 1, cleared: runs.filter(r => r.cleared > i).length, winRate: a ? w / a : 0, tries: w ? a / w : 0, stuck };
  });
  const lines = rows.map(r => `${String(r.floor).padStart(2)} | ${String(r.cleared).padStart(3)}/${runs.length} | ${(r.winRate * 100).toFixed(0).padStart(3)}% | ${r.tries.toFixed(1).padStart(5)} | ${r.stuck}${r.winRate < WIN_FLOOR && r.cleared < runs.length ? '  << kẹt' : ''}`);
  const avg = (f: (r: ClimbResult) => number) => (runs.reduce((x, r) => x + f(r), 0) / runs.length).toFixed(1);
  const rar = Object.fromEntries(RARITIES.map(k => [k, avg(r => r.rarity[k])]));
  console.log([`== ${name}: ${runs.length} hạt giống`, 'tầng | qua | thắng/lượt | lượt TB | kẹt', ...lines,
    `trận TB ${avg(r => r.battles)} · thẻ nhận TB ${avg(r => r.ticketsEarned)} · lượt quay TB ${avg(r => r.pulls)} · cấp cuối (chính) TB ${avg(r => r.levels[0])}`,
    `độ hiếm sở hữu TB ${JSON.stringify(rar)}`].join('\n'));
  return rows;
}

function allUR(seed: number): GameState {
  const s = newGame(seed);
  const tienNo = TIEN_NO.slice(0, 5).map(t => ({ ...makeCharacter({ ...t, rarity: 'UR' }), copies: 0 }));
  return { ...s, tickets: 0, tienNo, party: [s.player.id, ...tienNo.map(c => c.id)] };
}

describe('20-floor climb (alpha-temporary balance)', () => {
  it('sample player climbs: floors 1-2 easy, no wall before the floor-10 boss, most seeds reach the top', () => {
    const runs = Array.from({ length: SEEDS }, (_, i) => climb(newGame(i + 1), i + 1));
    const rows = report('người chơi mẫu', runs);
    expect(rows[0].winRate).toBeGreaterThan(0.9);
    expect(rows[1].winRate).toBeGreaterThan(0.7);
    for (const r of rows.slice(0, 9)) expect(r.stuck, `floor ${r.floor}`).toBe(0);
    expect(rows.reduce((a, r) => a + r.stuck, 0)).toBeLessThanOrEqual(SEEDS * 0.1);
    expect(runs.filter(r => r.cleared === TRIAL.floors).length).toBeGreaterThanOrEqual(SEEDS * 0.8);
  });

  // Known (alpha): an all-UR team clears every floor first try; the rarity multipliers (VS-L3) decide how much UR should matter.
  it('all-UR team climbs all 20 floors without breaking the sim', () => {
    const runs = Array.from({ length: 20 }, (_, i) => climb(allUR(i + 1), i + 1, { gacha: false }));
    const rows = report('đội toàn UR', runs);
    expect(rows[TRIAL.floors - 1].cleared).toBe(runs.length);
    expect(runs.every(r => r.stuckAt === null)).toBe(true);
  }, 60000);
});
