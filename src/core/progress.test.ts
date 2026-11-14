import { describe, expect, it } from 'vitest';
import { BALANCE, REWARDS, TIEN_NO, TRIAL } from '../content';
import { makeCharacter } from './character';
import { viewOf } from './player';
import { addExp, cultivate, cultivateBlock, cultivateCost, expToNext, levelCap, MAX_LEVEL, realmLabel } from './progress';
import { canEnter, claimWin, floorReward, goFloor, newTrial } from './rewards';
import { migrate, newGame, parseSave, SAVE_VERSION, type GameState } from './save';

const P = BALANCE.progression;
const withTienNo = (s: GameState, rarity: 'N' | 'UR', level = 1): GameState => {
  const t = { ...makeCharacter({ ...TIEN_NO[0], rarity }, level), copies: 0 };
  return { ...s, tienNo: [t], party: [s.player.id, t.id, null, null, null, null] };
};

describe('levels', () => {
  it('addExp: multi-level, pure, stops at cap and keeps at most one level of overflow', () => {
    const c = makeCharacter(TIEN_NO[0]);
    const up = addExp(c, expToNext(1) + expToNext(2) + 1, 10);
    expect([up.level, up.exp, up.hp]).toEqual([3, 1, up.hpMax]);
    expect(up.hpMax).toBeGreaterThan(c.hpMax);
    expect(c.level).toBe(1);
    const capped = addExp(c, 1e9, 2);
    expect(capped.level).toBe(2);
    expect(capped.exp).toBe(expToNext(2));
    expect(addExp(capped, 0, 3).level).toBe(3); // stored overflow levels once the cap rises
    expect(addExp(c, 0, 10)).toBe(c);
  });
  it('Tien No cap = player level + rarity bonus; protagonist cap = max', () => {
    expect(P.capBonus).toEqual({ N: 0, R: 2, SR: 2, SSR: 4, UR: 6 });
    const t = makeCharacter({ ...TIEN_NO[0], rarity: 'UR' });
    expect(levelCap(t, 5, false)).toBe(11);
    expect(levelCap(t, MAX_LEVEL, false)).toBe(MAX_LEVEL);
    expect(levelCap(t, 5, true)).toBe(MAX_LEVEL);
  });
  it('realm labels change every 10 levels', () => {
    expect([1, 10, 11, 25, 30].map(realmLabel)).toEqual(['Luyện Khí 1', 'Luyện Khí 10', 'Trúc Cơ 1', 'Kim Đan 5', 'Kim Đan 10']);
    expect(viewOf({ ...newGame(1), player: { ...newGame(1).player, level: 12 } }).realm).toBe('Trúc Cơ 2');
  });
  it('cultivate spends linh thach; blocked when poor or at the cap', () => {
    let s = withTienNo({ ...newGame(1), currency: { ...newGame(1).currency, LINH_THACH: 10000 } }, 'N');
    const tid = s.tienNo[0].id;
    expect(cultivateBlock(s, tid)).toMatch(/trần/); // N: cap = player level
    const before = s.currency.LINH_THACH;
    s = cultivate(s, s.player.id)!;
    expect(s.player.level).toBe(2);
    expect(s.currency.LINH_THACH).toBe(before - cultivateCost(1));
    s = cultivate(s, tid)!;
    expect(s.tienNo[0].level).toBe(2);
    expect(s.tienNo[0].copies).toBe(0);
    const poor = { ...s, currency: { ...s.currency, LINH_THACH: 0 } };
    expect(cultivate(poor, s.player.id)).toBeNull();
    expect(cultivateBlock(poor, s.player.id)).toMatch(/linh thạch/);
  });
});

describe('trial rewards', () => {
  it('first clear pays tickets on every 3rd floor and boss floors; repeats shrink then stop', () => {
    const t = newTrial();
    expect(floorReward(t, 1)).toMatchObject({ firstClear: true, tickets: 0 });
    expect(floorReward(t, 3).tickets).toBe(REWARDS.firstClearTickets.amount);
    expect(floorReward(t, 5).tickets).toBe(REWARDS.firstClearTickets.boss);
    expect(floorReward(t, 15).tickets).toBe(REWARDS.firstClearTickets.amount + REWARDS.firstClearTickets.boss);
    const cleared = { ...t, cleared: 5 };
    let prev = floorReward(t, 5).linhThach, total = 0;
    for (let k = 0; k <= REWARDS.repeat.cap; k++) {
      const r = floorReward({ ...cleared, repeats: { 5: k } }, 5);
      expect(r.tickets).toBe(0);
      expect(r.linhThach).toBeLessThan(prev);
      prev = r.linhThach; total += r.linhThach;
    }
    expect(prev).toBe(0); // after the cap
    expect(total).toBeLessThan(floorReward(t, 5).linhThach * 2); // finite repeat budget per floor
  });
  it('claimWin: currency, tickets, EXP to the whole party, floor unlock; repeat counted', () => {
    let s = withTienNo(newGame(1), 'UR');
    const r = claimWin(s, 3, [s.player.id, s.tienNo[0].id]);
    expect(r.state.trial).toMatchObject({ cleared: 3, floor: 4 });
    expect(r.state.tickets).toBe(s.tickets + r.reward.tickets);
    expect(r.state.currency.LINH_THACH).toBe(s.currency.LINH_THACH + r.reward.linhThach);
    expect(r.state.player.exp + r.state.player.level).toBeGreaterThan(1);
    expect(r.state.tienNo[0].level).toBeGreaterThanOrEqual(r.state.player.level);
    s = claimWin(r.state, 2, [s.player.id]).state;
    expect(s.trial.cleared).toBe(3);
    expect(s.trial.repeats[2]).toBe(1);
    expect(s.tienNo[0]).toEqual(r.state.tienNo[0]); // not in the fight, no EXP
    expect(claimWin(s, TRIAL.floors, []).state.trial.floor).toBe(TRIAL.floors);
  });
  it('floor selection stays within cleared + 1', () => {
    const s = { ...newGame(1), trial: { ...newTrial(), cleared: 4, floor: 5 } };
    expect(canEnter(s.trial, 5)).toBe(true);
    expect(canEnter(s.trial, 6)).toBe(false);
    expect(goFloor(s, 2).trial.floor).toBe(2);
    expect(goFloor(s, 9)).toBe(s);
  });
});

describe('save v3', () => {
  it('v2 save migrates with empty trial progress; trial survives a round trip', () => {
    const { trial: _, ...v2 } = { ...newGame(4), version: 2 };
    const m = migrate(v2)!;
    expect(m.version).toBe(SAVE_VERSION);
    expect(m.trial).toEqual(newTrial());
    const s = { ...newGame(4), trial: { cleared: 7, floor: 3, repeats: { 2: 1 } } };
    expect(parseSave(JSON.stringify(s)).state.trial).toEqual({ cleared: 7, floor: 3, repeats: { 2: 1 } });
    expect(parseSave(JSON.stringify({ ...s, trial: null })).warning).toBeTruthy();
  });
});
