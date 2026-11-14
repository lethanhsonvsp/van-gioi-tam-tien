import { describe, expect, it } from 'vitest';
import { IMPORT_MAX_CHARS, importSave } from './importSave';
import { newGame, serialize, SAVE_VERSION, type GameState } from './save';
import { TIEN_NO } from '../content';

const withTn = (): GameState => {
  const g = newGame(7), d = TIEN_NO[0];
  const base = { ...g.player, id: d.id, name: d.name, rarity: d.rarity, element: d.element };
  return { ...g, tienNo: [{ ...base, copies: 1 }], party: [g.player.id, d.id, null, null, null, null] };
};
const text = (o: unknown) => JSON.stringify(o);
const err = (o: unknown) => { const r = importSave(typeof o === 'string' ? o : text(o)); return r.ok ? 'OK' : r.error; };

describe('importSave', () => {
  it('accepts a current save and re-exports identically', () => {
    const g = withTn(), r = importSave(serialize(g));
    expect(r.ok && serialize(r.state)).toBe(serialize(g));
    if (r.ok) expect(r.summary).toMatchObject({ name: g.player.name, level: g.player.level, tienNo: 1, version: SAVE_VERSION, floor: 1 });
  });
  it('migrates old versions v1..v3 to the current one', () => {
    const g = withTn(), { tickets: _t, pity: _p, party: _pa, trial: _tr, ...v1 } = g;
    const v1Save = { ...v1, version: 1, tienNo: g.tienNo.map(({ copies: _c, ...t }) => t) };
    const v2 = { ...g, version: 2, trial: undefined }, v3 = { ...g, version: 3 };
    for (const old of [v1Save, v2, v3]) {
      const r = importSave(text(old));
      expect(r.ok, text(r)).toBe(true);
      if (r.ok) { expect(r.state.version).toBe(SAVE_VERSION); expect(r.summary.version).toBe(old.version); }
    }
  });
  it('rejects broken input with a clear message', () => {
    const g = withTn();
    expect(err('{khong phai json')).toMatch(/JSON/);
    expect(err('[1]')).toMatch(/đối tượng/);
    expect(err({})).toMatch(/version/);
    expect(err({ ...g, version: 99 })).toMatch(/không hỗ trợ/);
    expect(err({ ...g, version: 0 })).toMatch(/không hỗ trợ/);
    expect(err({ ...g, tickets: undefined })).toMatch(/tickets/);
    expect(err({ ...g, tickets: 'nhieu' })).toMatch(/tickets/);
    expect(err({ ...g, player: 5 })).toMatch(/player/);
    expect(err({ ...g, version: 3, tienNo: [null] })).toMatch(/sai kiểu/);
  });
  it('rejects out-of-range values', () => {
    const g = withTn();
    expect(err({ ...g, player: { ...g.player, level: -1 } })).toMatch(/cấp/);
    expect(err({ ...g, player: { ...g.player, level: 999 } })).toMatch(/cấp/);
    expect(err({ ...g, currency: { ...g.currency, LINH_THACH: -5 } })).toMatch(/LINH_THACH/);
    expect(err({ ...g, tickets: 1.5 })).toMatch(/thẻ/);
    expect(err({ ...g, player: { ...g.player, name: '<b>x</b>' } })).toMatch(/tên/);
    expect(err({ ...g, trial: { ...g.trial, cleared: 3, floor: 9 } })).toMatch(/Thí Luyện/);
  });
  it('rejects duplicate, unknown and wrong-rarity Tien No and bad party', () => {
    const g = withTn(), t = g.tienNo[0];
    expect(err({ ...g, tienNo: [t, t] })).toMatch(/trùng/);
    expect(err({ ...g, tienNo: [{ ...t, id: 'CHAR.TIENNO.KHONG_CO' }] })).toMatch(/không có trong nội dung/);
    expect(err({ ...g, tienNo: [{ ...t, rarity: t.rarity === 'UR' ? 'N' : 'UR' }] })).toMatch(/độ hiếm/);
    expect(err({ ...g, tienNo: [{ ...t, rarity: 'XX' }] })).toMatch(/độ hiếm/);
    expect(err({ ...g, party: [g.player.id, 'CHAR.TIENNO.LA', null, null, null, null] })).toMatch(/Tổ đội/);
  });
  it('rejects oversized input without parsing it', () => {
    expect(err(' '.repeat(IMPORT_MAX_CHARS + 1))).toMatch(/quá dài/);
  });
});
