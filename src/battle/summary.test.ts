import { describe, expect, it } from 'vitest';
import { newGame } from '../core/save';
import { runBattle } from './engine';
import { floorMonsters } from './monsters';
import { sampleTeam } from './team';
import { summarize } from './summary';
import type { BattleEvent } from './types';

const run = (floor: number, seed: number) => runBattle(sampleTeam(newGame(1).player), floorMonsters(floor), seed);
const sum = (r: number[]) => r.reduce((a, b) => a + b, 0);

describe('summarize', () => {
  it('totals match the log: damage dealt = damage taken = sum of damage events; heal, shield, control counts too', () => {
    for (const [floor, seed] of [[1, 1], [3, 7], [5, 3]]) {
      const ev = run(floor, seed).events, s = summarize(ev).units;
      const dmg = sum(ev.flatMap(e => (e.type === 'damage' ? [e.amount] : [])));
      expect(sum(s.map(u => u.damageDealt))).toBe(dmg);
      expect(sum(s.map(u => u.damageTaken))).toBe(dmg);
      expect(sum(s.map(u => u.absorbed))).toBe(sum(ev.flatMap(e => (e.type === 'damage' ? [e.absorbed] : []))));
      expect(sum(s.map(u => u.healed))).toBe(sum(ev.flatMap(e => (e.type === 'heal' ? [e.amount] : []))));
      expect(sum(s.map(u => u.shielded))).toBe(sum(ev.flatMap(e => (e.type === 'shield' ? [e.amount] : []))));
      expect(sum(s.map(u => u.controls))).toBe(ev.filter(e => e.type === 'control' && e.status !== 'cleanse').length);
    }
  });

  it('covers every unit of both sides; deaths and kills agree with the log', () => {
    const r = run(3, 7), s = summarize(r.events);
    expect(s.units.filter(u => u.side === 'A')).toHaveLength(4);
    expect(s.units.filter(u => u.side === 'B')).toHaveLength(floorMonsters(3).length);
    expect(s.units.filter(u => u.dead)).toHaveLength(r.events.filter(e => e.type === 'death').length);
    expect(s.units.filter(u => !u.dead).map(u => u.uid).sort()).toEqual(r.survivors.map(u => u.uid).sort());
    expect(sum(s.units.map(u => u.kills))).toBeLessThanOrEqual(s.units.filter(u => u.dead).length);
    expect(sum(s.units.filter(u => u.side === 'A').map(u => u.kills))).toBe(s.units.filter(u => u.side === 'B' && u.dead).length);
  });

  it('hand-made log: kill goes to the finishing hit, shield absorb and cleanse are counted right', () => {
    const units = ['A0', 'B0'].map(uid => ({ uid, side: uid[0] as 'A' | 'B', charId: uid, name: uid, element: 'FIRE', hp: 10, hpMax: 10 }));
    const ev: BattleEvent[] = [
      { t: 0, type: 'start', seed: 1, units },
      { t: 1, type: 'shield', source: 'B0', target: 'B0', amount: 4, shield: 4 },
      { t: 2, type: 'damage', source: 'A0', target: 'B0', amount: 6, absorbed: 4, hp: 8 },
      { t: 2, type: 'control', source: 'A0', target: 'B0', status: 'stun', ticks: 2 },
      { t: 3, type: 'control', source: 'B0', target: 'B0', status: 'cleanse', ticks: 0 },
      { t: 4, type: 'damage', source: 'A0', target: 'B0', amount: 8, absorbed: 0, hp: 0 },
      { t: 4, type: 'death', target: 'B0' },
      { t: 4, type: 'end', winner: 'A', ticks: 4 },
    ];
    const s = summarize(ev);
    expect(s.units[0]).toMatchObject({ damageDealt: 14, kills: 1, controls: 1, dead: false });
    expect(s.units[1]).toMatchObject({ damageTaken: 14, absorbed: 4, shielded: 4, dead: true });
    expect(s.top.damage?.uid).toBe('A0'); expect(s.top.heal).toBeUndefined();
  });
});
