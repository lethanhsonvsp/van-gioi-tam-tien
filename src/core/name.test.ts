import { describe, expect, it } from 'vitest';
import { validateName } from './name';

describe('validateName', () => {
  it('trims, strips control chars and tags, caps at 16, rejects empty', () => {
    expect(validateName('  Tử Vi  ')).toBe('Tử Vi');
    expect(validateName('A\u0007B\nC')).toBe('ABC');
    expect(validateName('<b>Long</b>')).toBe('Long');
    expect(validateName('<script')).toBeNull();
    expect(validateName('x'.repeat(40))).toBe('x'.repeat(16));
    expect(validateName('   ')).toBeNull();
    expect(validateName('')).toBeNull();
  });
});
