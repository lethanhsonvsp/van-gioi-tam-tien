// mulberry32: tiny seeded PRNG. State is one uint32, so it can live in the save file.
export interface Rng { state: number }
export const newRng = (seed: number): Rng => ({ state: seed >>> 0 });
export function nextFloat(r: Rng): number {
  r.state = (r.state + 0x6d2b79f5) >>> 0;
  let t = r.state;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
export const nextInt = (r: Rng, n: number): number => Math.floor(nextFloat(r) * n);
