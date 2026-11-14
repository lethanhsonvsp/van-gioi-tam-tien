import { describe, expect, it } from 'vitest';
import { newRng, nextFloat, nextInt } from './rng';
import { newGame, parseSave, loadGame, saveGame, serialize, SAVE_KEY } from './save';
import { hpMaxFor, rarityMultiplier } from './character';
import { validateTienNo, TIEN_NO, BALANCE } from '../content';

describe('rng', () => {
  it('is deterministic per seed and resumable from saved state', () => {
    const a = newRng(42), b = newRng(42);
    const seq = Array.from({ length: 5 }, () => nextFloat(a));
    expect(Array.from({ length: 5 }, () => nextFloat(b))).toEqual(seq);
    const c = { ...a }; // state is a plain number
    expect(nextInt(c, 1000)).toBe(nextInt(a, 1000));
    expect(newRng(43).state).not.toBe(newRng(42).state);
  });
});

describe('save', () => {
  const mem = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) }; };
  it('round-trips', () => {
    const s = newGame(7), st = mem();
    expect(saveGame(s, st)).toBe(true);
    expect(loadGame(st).state).toEqual(s);
  });
  it('new game: level 1, no Tien No', () => {
    const s = newGame(1);
    expect(s.player.level).toBe(1);
    expect(s.player.name).toBe('Đạo hữu');
    expect(s.tienNo).toHaveLength(0);
  });
  it('corrupt, wrong version or throwing storage does not throw', () => {
    expect(parseSave('{not json').warning).toBeTruthy();
    expect(parseSave(JSON.stringify({ ...newGame(1), version: 999 })).warning).toBeTruthy();
    expect(parseSave(JSON.stringify({ version: 1 })).warning).toBeTruthy();
    const bad = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('denied'); } };
    expect(loadGame(bad).warning).toBeTruthy();
    expect(saveGame(newGame(1), bad)).toBe(false);
    expect(serialize(newGame(1))).toContain('"version":1');
    expect(SAVE_KEY).toBe('vgtt.save');
  });
});

describe('content', () => {
  it('has 10 valid Tien No', () => expect(TIEN_NO).toHaveLength(10));
  it('rejects bad data with a clear error', () => {
    const ok = TIEN_NO[0];
    expect(() => validateTienNo([{ ...ok, rarity: 'X' }])).toThrow(/rarity/);
    expect(() => validateTienNo([{ ...ok, name: '' }])).toThrow(/name/);
    expect(() => validateTienNo([ok, ok])).toThrow(/duplicate/);
    expect(() => validateTienNo([])).toThrow();
  });
  it('rarity multipliers', () => {
    expect(BALANCE.status).toBe('alpha-temporary');
    expect(['N', 'R', 'SR', 'SSR', 'UR'].map(r => rarityMultiplier(r as 'N'))).toEqual([1, 1.15, 1.3, 1.5, 1.75]);
    expect(hpMaxFor('UR', 3)).toBeGreaterThan(hpMaxFor('N', 3));
  });
});
