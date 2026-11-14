import { describe, expect, it } from 'vitest';
import { BALANCE, SKILLS, TIEN_NO, TRIAL } from '../content';
import { newGame } from '../core/save';
import { runBattle } from './engine';
import { FLOOR_COUNT, floorMonsters } from './monsters';
import { frameAt, lastTick } from './replay';
import { sampleTeam } from './team';

const team = () => sampleTeam(newGame(1).player);
const winRate = (floor: number, n = 200) => {
  let wins = 0;
  for (let seed = 1; seed <= n; seed++) if (runBattle(team(), floorMonsters(floor), seed).winner === 'A') wins++;
  return wins / n;
};

describe('battle', () => {
  it('same seed, same log; different seed, different log', () => {
    const a = runBattle(team(), floorMonsters(2), 123), b = runBattle(team(), floorMonsters(2), 123);
    expect(b.events).toEqual(a.events);
    expect(runBattle(team(), floorMonsters(2), 124).events).not.toEqual(a.events);
  });

  it('log starts with start and ends with end within max ticks', () => {
    for (let f = 1; f <= FLOOR_COUNT; f++) {
      const r = runBattle(team(), floorMonsters(f), f);
      expect(r.events[0].type).toBe('start');
      expect(r.events.at(-1)).toMatchObject({ type: 'end', winner: r.winner });
      expect(r.ticks).toBeLessThanOrEqual(BALANCE.battle.maxTicks);
    }
    expect(runBattle(team(), floorMonsters(1), 1, 3).winner).toBe('draw');
  });

  it('sample team: protagonist + 3 Tien No incl. a healer, wins floor 1', () => {
    const t = team();
    expect(t).toHaveLength(4);
    expect(t[0].charId).toBe('CHAR.PLAYER.MAIN');
    expect(t.some(f => f.skill.kind === 'support' && f.skill.heal)).toBe(true);
    expect(runBattle(t, floorMonsters(1), 1).winner).toBe('A');
  });

  it('every Tien No has a kit tag built from the 3 templates', () => {
    for (const c of TIEN_NO) expect(SKILLS.kits[c.id]?.tag, c.id).toBeTruthy();
    expect(TRIAL.status).toBe('alpha-temporary');
    expect(BALANCE.battle.elementAdvantage).toBe(1);
  });

  it('all 3 templates fire, HP never leaves [0, hpMax]', () => {
    const r = runBattle(team(), floorMonsters(3), 7);
    const types = new Set(r.events.map(e => e.type));
    for (const t of ['action', 'damage', 'heal', 'control', 'death', 'end']) expect(types, t).toContain(t);
    const max = new Map(r.events[0].type === 'start' ? r.events[0].units.map(u => [u.uid, u.hpMax]) : []);
    for (const e of r.events) if (e.type === 'damage' || e.type === 'heal') expect(e.hp).toBeGreaterThanOrEqual(0), expect(e.hp).toBeLessThanOrEqual(max.get(e.target)!);
  });

  it('replay frame matches the final battle state', () => {
    const r = runBattle(team(), floorMonsters(2), 9);
    const f = frameAt(r.events, lastTick(r.events));
    expect(f.end?.winner).toBe(r.winner);
    for (const u of r.survivors) expect(f.units.find(v => v.uid === u.uid)?.hp).toBe(u.hp);
    expect(f.units.filter(u => !u.dead)).toHaveLength(r.survivors.length);
  });

  it('win rate over 200 seeds, floors 1-3 (alpha-temporary numbers)', () => {
    const rates = Array.from({ length: FLOOR_COUNT }, (_, i) => winRate(i + 1));
    console.log('win rates floor 1..3:', rates.map(r => `${(r * 100).toFixed(1)}%`).join(', '));
    expect(rates[0]).toBeGreaterThanOrEqual(0.95);
    expect(rates[FLOOR_COUNT - 1]).toBeGreaterThan(0.05);
    expect(rates[FLOOR_COUNT - 1]).toBeLessThan(1);
  });
});
