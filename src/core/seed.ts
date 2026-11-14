// Test-only fixed seed: `?seed=N` in the URL (used by scripts/qa.mjs so runs repeat). Without it nothing changes: callers fall back to Date.now().
export const testSeed = (): number | null => {
  try {
    const s = new URLSearchParams(location.search).get('seed');
    return s !== null && /^\d+$/.test(s) ? Number(s) >>> 0 : null;
  } catch { return null; }
};
