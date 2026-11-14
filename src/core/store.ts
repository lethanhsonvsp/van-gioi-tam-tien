import { loadGame, saveGame, type GameState } from './save';

// Minimal external store: plain TS, consumed by React through useSyncExternalStore.
const loaded = loadGame();
let state: GameState = loaded.state;
export const loadWarning = loaded.warning;
const listeners = new Set<() => void>();

export const getState = (): GameState => state;
export const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };
// Returns false when the browser refused the write (full or blocked); the in-memory state is still updated.
export function setState(next: GameState): boolean {
  state = next;
  const saved = saveGame(state);
  listeners.forEach(l => l());
  return saved;
}
