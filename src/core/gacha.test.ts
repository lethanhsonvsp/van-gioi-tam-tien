import { describe, expect, it } from 'vitest';
import { GACHA, RARITIES, TIEN_NO } from '../content';
import { pull } from './gacha';
import { newGame, migrate, parseSave, SAVE_VERSION, type GameState } from './save';
import { PARTY_SIZE, toggleParty, validParty } from './roster';
import { toggleInParty } from './gacha';
import { hpMaxFor } from './character';
import { MAX_LEVEL } from './progress';
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
  it('pity thresholds: forced SR+ at srEvery (10), forced UR at urEvery (50)', () => {
    expect(GACHA.pity).toEqual({ srEvery: 10, urEvery: 50 });
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
  it('Tien No are R-UR only; N is the protagonist tier', () => {
    expect(GACHA.rates.N).toBe(0);
    expect(TIEN_NO.every(t => t.rarity !== 'N')).toBe(true);
    expect(newGame(1).player.rarity).toBe('N');
  });
  it('10000 pulls: rarity distribution near config (R 58, SR 30, SSR 10, UR 2), equal odds inside a tier', () => {
    let s = rich(2024, 20000); const n: Record<string, number> = {}, byId: Record<string, number> = {}; let total = 0;
    for (let i = 0; i < 1000; i++) {
      const p = pull(s, 10)!; s = p.state;
      for (const r of p.results) { n[r.rarity] = (n[r.rarity] ?? 0) + 1; byId[r.id] = (byId[r.id] ?? 0) + 1; total++; }
    }
    const pct = Object.fromEntries(RARITIES.map(r => [r, +((n[r] ?? 0) / total * 100).toFixed(2)]));
    console.log('distribution over 10000 pulls (%):', JSON.stringify(pct), 'config:', JSON.stringify(GACHA.rates));
    // pity pushes SR+ a bit above config, R a bit below
    expect(pct.N).toBe(0);
    expect(pct.R).toBeGreaterThan(52); expect(pct.R).toBeLessThan(59);
    expect(pct.SR).toBeGreaterThan(28); expect(pct.SR).toBeLessThan(34);
    expect(pct.SSR).toBeGreaterThan(8.5); expect(pct.SSR).toBeLessThan(12);
    expect(pct.UR).toBeGreaterThan(1.5); expect(pct.UR).toBeLessThan(4);
    for (const r of RARITIES) {
      const pool = TIEN_NO.filter(t => t.rarity === r);
      for (const t of pool) expect(byId[t.id] / (n[r] / pool.length), t.id).toBeGreaterThan(0.85);
      for (const t of pool) expect(byId[t.id] / (n[r] / pool.length), t.id).toBeLessThan(1.15);
    }
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
  it('v3 -> v4: Tien No rarity from content by id, levels capped at maxLevel, rest kept', () => {
    const g = newGame(7);
    const tan = { ...g.player, id: 'CHAR.TIEN_NO.TAN_NGUYET_DAO', name: 'Tần Nguyệt Dao', element: 'AM', rarity: 'N', level: 12, exp: 33, copies: 2 };
    const ur = { ...g.player, id: 'CHAR.TIEN_NO.CO_U_LAN', name: 'Cổ U Lan', element: 'THO', rarity: 'UR', level: 38, exp: 5, copies: 0 };
    const v3 = { ...g, version: 3, player: { ...g.player, level: 35, exp: 9 }, tienNo: [tan, ur], tickets: 7, currency: { LINH_THACH: 1234, TIEN_NGOC: 0, XU: 0 } };
    const s = parseSave(JSON.stringify(v3));
    expect(s.warning).toBeUndefined();
    const m = s.state;
    expect(m.version).toBe(4);
    expect(m.player.rarity).toBe('N'); expect(m.player.level).toBe(MAX_LEVEL); expect(m.player.exp).toBe(9);
    expect(m.player.hpMax).toBe(hpMaxFor('N', MAX_LEVEL, m.player.element));
    expect(m.tienNo[0]).toMatchObject({ rarity: 'R', level: 12, exp: 33, copies: 2, hpMax: hpMaxFor('R', 12, 'AM') });
    expect(m.tienNo[1]).toMatchObject({ rarity: 'UR', level: MAX_LEVEL, copies: 0 });
    expect(m.tickets).toBe(7); expect(m.currency.LINH_THACH).toBe(1234); expect(m.trial).toEqual(g.trial); expect(m.party).toEqual(g.party);
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
