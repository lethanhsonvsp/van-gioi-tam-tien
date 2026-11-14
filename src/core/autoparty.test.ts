import { describe, expect, it } from 'vitest';
import { pull } from './gacha';
import { autoJoin, emptyParty, PARTY_SIZE, validParty } from './roster';
import { newGame } from './save';

describe('autoJoin', () => {
  it('fills first empty slot, skips existing, never displaces when full', () => {
    const p = emptyParty('P');
    const a = autoJoin(p, 'A');
    expect(a).toEqual({ party: ['P', 'A', null, null, null, null], joined: true });
    expect(autoJoin(a.party, 'A')).toEqual({ party: a.party, joined: false });
    const full = ['P', 'A', 'B', 'C', 'D', 'E'];
    expect(autoJoin(full, 'F')).toEqual({ party: full, joined: false });
  });
  it('gaps are filled in order', () => {
    expect(autoJoin(['P', 'A', null, 'C', null, null], 'B').party).toEqual(['P', 'A', 'B', 'C', null, null]);
  });
});

describe('pull auto-party', () => {
  it('10 pulls: new Tien No join in order, no duplicates, joined flag matches', () => {
    const r = pull({ ...newGame(7), tickets: 10 }, 10)!, s = r.state;
    const order = r.results.filter(x => x.isNew).map(x => x.id);
    expect(r.results.filter(x => x.joined).map(x => x.id)).toEqual(order.slice(0, PARTY_SIZE - 1));
    expect(s.party.slice(1).filter(Boolean)).toEqual(order.slice(0, PARTY_SIZE - 1));
    expect(validParty(s.party, s.player.id, s.tienNo.map(c => c.id))).toBe(true);
  });
  it('full party: extra new Tien No stay out; repeats never join', () => {
    const s = { ...newGame(3), tickets: 100000 };
    const r = pull(s, 10)!, r2 = pull(r.state, 10)!, r3 = pull(r2.state, 10)!;
    expect(r3.state.party.filter(Boolean).length).toBe(PARTY_SIZE);
    expect(r3.results.every(x => !x.joined)).toBe(true);
    expect(validParty(r3.state.party, s.player.id, r3.state.tienNo.map(c => c.id))).toBe(true);
    const dupes = [...r.results, ...r2.results, ...r3.results].filter(x => !x.isNew);
    expect(dupes.every(x => !x.joined)).toBe(true);
  });
});
