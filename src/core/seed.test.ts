import { describe, expect, it } from 'vitest';
import { seedFrom } from './seed';

describe('seedFrom', () => {
  it('reads ?seed=N only when allowed (dev/QA or VITE_ALLOW_SEED)', () => {
    expect(seedFrom('?seed=42', true)).toBe(42);
    expect(seedFrom('?seed=42', false)).toBeNull();
  });
  it('ignores missing or malformed seeds', () => {
    for (const q of ['', '?seed=', '?seed=-1', '?seed=abc', '?seed=1.5']) expect(seedFrom(q, true)).toBeNull();
  });
});
