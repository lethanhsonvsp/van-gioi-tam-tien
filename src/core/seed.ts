// Test-only fixed seed: `?seed=N` in the URL (used by scripts/qa.mjs so runs repeat). Honoured only in dev/QA (Vite dev server) or a build
// made with VITE_ALLOW_SEED=1; a normal production build ignores it. Without it nothing changes: callers fall back to Date.now().
export const seedFrom = (search: string, allowed: boolean): number | null => {
  if (!allowed) return null;
  const s = new URLSearchParams(search).get('seed');
  return s !== null && /^\d+$/.test(s) ? Number(s) >>> 0 : null;
};
export const testSeed = (): number | null => {
  try { return seedFrom(location.search, import.meta.env.DEV || Boolean(import.meta.env.VITE_ALLOW_SEED)); } catch { return null; }
};
