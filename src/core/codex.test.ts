import { describe, expect, it } from 'vitest';
import { BALANCE, RARITIES, SKILLS, TIEN_NO } from '../content';
import { makeCharacter } from './character';
import { codexEntries, kindGuides, rarityRows, seenCount, statusTicks } from './codex';
import { newGame } from './save';

describe('sổ tay', () => {
  it('lists all Tien No, unseen at the start', () => {
    const e = codexEntries(newGame(1));
    expect(e).toHaveLength(TIEN_NO.length);
    expect(e.every(x => !x.seen && x.copies === 0)).toBe(true);
    expect(seenCount(newGame(1))).toBe(0);
  });
  it('marks owned ones with level and copy count', () => {
    const g = { ...newGame(1), tienNo: [{ ...makeCharacter(TIEN_NO[2], 5), copies: 1 }] };
    const e = codexEntries(g);
    expect(seenCount(g)).toBe(1);
    expect(e[2]).toMatchObject({ seen: true, level: 5, copies: 2 });
    expect(e[0].seen).toBe(false);
  });
  it('reads rarity numbers from balance.json', () => {
    const rows = rarityRows();
    expect(rows.map(r => r.rarity)).toEqual([...RARITIES]);
    for (const r of rows) {
      expect(r.multiplier).toBe(BALANCE.rarityStatMultiplier[r.rarity]);
      expect(r.capBonus).toBe(BALANCE.progression.capBonus[r.rarity]);
    }
    expect(rows.find(r => r.rarity === 'UR')!.perLevelPct).toBeCloseTo(18.6, 5);
  });
  it('covers every skill in the 3 templates and 3 statuses', () => {
    expect(kindGuides().map(k => k.kind)).toEqual(['damage', 'support', 'control']);
    expect(kindGuides().reduce((a, k) => a + k.count, 0)).toBe(Object.keys(SKILLS.kits).length);
    for (const s of ['stun', 'freeze', 'slow'] as const) expect(statusTicks(s).length).toBeGreaterThan(0);
  });
});
