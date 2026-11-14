import { describe, expect, it } from 'vitest';
import { GACHA, RARITIES, TIEN_NO } from '../content';
import { pull } from './gacha';
import { newGame, migrate, parseSave, SAVE_VERSION, type GameState } from './save';
import { PARTY_SIZE, toggleParty, validParty } from './roster';
import { toggleInParty } from './gacha';
import { playerTeam } from '../battle/team';

const rich = (seed: number, tickets = 100000): GameState => ({ ...newGame(seed), tickets });
const rank = (r: string) => RARITIES.indexOf(r as 'N');

describe('gacha', () => {
  it('same seed same results; input state not mutated', () => {
    const a = newGame(5), snap = JSON.stringify(a);
    const r1 = pull(a, 10)!, r2 = pull(newGame(5), 10)!;
    expect(r1.results).toEqual(r2.results);
    expect(JSON.stringify(a)).toBe(snap);
    expect(r1.state.rng.state).not.toBe(a.rng.state);
  });
  it('costs 1 ticket per pull; short on tickets changes nothing', () => {
    expect(newGame(1).tickets).toBe(GACHA.startTickets);
    expect(pull(newGame(1), 1)!.state.tickets).toBe(GACHA.startTickets - 1);
    const s = { ...newGame(1), tickets: 9 };
    expect(pull(s, 10)).toBeNull();
    expect(pull({ ...s, tickets: 0 }, 1)).toBeNull();
  });
  it('every 10 pulls has an SR+ (any seed, any pity start)', () => {
    for (let seed = 1; seed <= 300; seed++) {
      const s = { ...rich(seed), pity: { sinceSR: seed % 10, sinceUR: 0 } };
      expect(pull(s, 10)!.results.some(r => rank(r.rarity) >= rank('SR'))).toBe(true);
    }
  });
  it('pity thresholds: forced SR+ at srEvery, forced UR at urEvery', () => {
    const sr = pull({ ...rich(3), pity: { sinceSR: GACHA.pity.srEvery - 1, sinceUR: 0 } }, 1)!;
    expect(rank(sr.results[0].rarity)).toBeGreaterThanOrEqual(rank('SR'));
    const ur = pull({ ...rich(3), pity: { sinceSR: 0, sinceUR: GACHA.pity.urEvery - 1 } }, 1)!;
    expect(ur.results[0].rarity).toBe('UR');
    expect(ur.state.pity).toEqual({ sinceSR: 0, sinceUR: 0 });
    let s = rich(11); let since = 0;
    for (let i = 0; i < 2000; i++) { const p = pull(s, 1)!; s = p.state; since = p.results[0].rarity === 'UR' ? 0 : since + 1; expect(since).toBeLessThan(GACHA.pity.urEvery); }
  });
  it('duplicates raise copies, not level', () => {
    let s = rich(2); for (let i = 0; i < 300; i++) s = pull(s, 10)!.state;
    expect(s.tienNo).toHaveLength(TIEN_NO.length);
    expect(s.tienNo.reduce((a, c) => a + c.copies, 0)).toBe(3000 - TIEN_NO.length);
    expect(s.tienNo.every(c => c.level === s.player.level)).toBe(true);
  });
  it('10000 pulls: rarity distribution near config', () => {
    let s = rich(2024, 20000); const n: Record<string, number> = {}; let total = 0;
    for (let i = 0; i < 1000; i++) { const p = pull(s, 10)!; s = p.state; for (const r of p.results) { n[r.rarity] = (n[r.rarity] ?? 0) + 1; total++; } }
    const pct = Object.fromEntries(RARITIES.map(r => [r, +((n[r] ?? 0) / total * 100).toFixed(2)]));
    console.log('distribution over 10000 pulls (%):', JSON.stringify(pct), 'config:', JSON.stringify(GACHA.rates));
    // pity pushes SR+ a bit above config; N/R below
    expect(pct.N).toBeGreaterThan(30); expect(pct.N).toBeLessThan(42);
    expect(pct.SR).toBeGreaterThan(18); expect(pct.UR).toBeGreaterThan(1.5); expect(pct.UR).toBeLessThan(4);
  });
});

describe('save migrate', () => {
  const v1 = { version: 1, rng: { state: 9 }, player: { ...newGame(1).player, level: 4 }, tienNo: [], linhLuc: { cur: 50, max: 100 }, currency: { LINH_THACH: 77, TIEN_NGOC: 0, XU: 0 } };
  it('v1 -> current keeps data, adds defaults', () => {
    const s = migrate(v1)!;
    expect(s.version).toBe(SAVE_VERSION);
    expect(s.player.level).toBe(4); expect(s.currency.LINH_THACH).toBe(77); expect(s.rng.state).toBe(9);
    expect(s.tickets).toBe(GACHA.startTickets); expect(s.pity).toEqual({ sinceSR: 0, sinceUR: 0 });
    expect(s.party).toEqual([s.player.id, null, null, null, null, null]);
    expect(parseSave(JSON.stringify(v1)).warning).toBeUndefined();
  });
  it('v1 Tien No gain copies 0; unknown versions rejected', () => {
    expect(migrate({ ...v1, tienNo: [{ id: 'CHAR.TIEN_NO.X' }] } as never)!.tienNo[0].copies).toBe(0);
    expect(migrate({ version: 0 })).toBeNull();
    expect(migrate({ version: 99 })).toBeNull();
  });
});

describe('party', () => {
  const pid = 'CHAR.PLAYER.MAIN', own = ['A', 'B', 'C', 'D', 'E', 'F'];
  it('6 slots, slot 0 main, no duplicates', () => {
    let p: (string | null)[] = [pid, null, null, null, null, null];
    for (const id of own) p = toggleParty(p, id, own);
    expect(p).toEqual([pid, 'A', 'B', 'C', 'D', 'E']); // F rejected: full
    expect(p).toHaveLength(PARTY_SIZE);
    expect(toggleParty(p, pid, own)).toBe(p);
    expect(toggleParty(p, 'Z', own)).toBe(p);
    expect(toggleParty(p, 'B', own)[2]).toBeNull();
    expect(validParty(p, pid, own)).toBe(true);
    expect(validParty([pid, 'A', 'A', null, null, null], pid, own)).toBe(false);
    expect(validParty(['A', pid, null, null, null, null], pid, own)).toBe(false);
  });
  it('trial team: sample until a Tien No is owned, then the party', () => {
    const s0 = newGame(1);
    expect(playerTeam(s0).length).toBeGreaterThan(1);
    let s = { ...rich(1) }; s = pull(s, 10)!.state;
    expect(playerTeam(s)).toHaveLength(1); // owns some, party only main
    s = toggleInParty(s, s.tienNo[0].id);
    expect(playerTeam(s).map(f => f.charId)).toEqual([s.player.id, s.tienNo[0].id]);
  });
});
