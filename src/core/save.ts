import { BALANCE, GACHA, TIEN_NO } from '../content';
import { hpMaxFor, makeCharacter, type Character } from './character';
import { emptyParty, PARTY_SIZE, type OwnedTienNo, type Pity } from './roster';
import { newRng, type Rng } from './rng';
import { newTrial, type TrialProgress } from './rewards';
import { testSeed } from './seed';

export const SAVE_KEY = 'vgtt.save';
export const SAVE_VERSION = 4;

export interface GameState {
  version: number;
  rng: Rng;
  player: Character;
  tienNo: OwnedTienNo[]; // owned Tien No, empty at start
  tickets: number; // summon tickets (alpha-temporary start amount in gacha.json)
  pity: Pity;
  party: (string | null)[]; // 6 slots; slot 0 is always the protagonist
  trial: TrialProgress; // Thi Luyen floors cleared, current floor, paid repeats
  linhLuc: { cur: number; max: number };
  currency: { LINH_THACH: number; TIEN_NGOC: number; XU: number };
}

export function newGame(seed = testSeed() ?? Date.now()): GameState {
  const s = BALANCE.start;
  return {
    version: SAVE_VERSION,
    rng: newRng(seed),
    player: makeCharacter({ id: 'CHAR.PLAYER.MAIN', name: s.playerName, title: 'Tán tu', element: 'NONE', rarity: 'N' }, s.level),
    tienNo: [],
    tickets: GACHA.startTickets,
    pity: { sinceSR: 0, sinceUR: 0 },
    party: emptyParty('CHAR.PLAYER.MAIN'),
    trial: newTrial(),
    linhLuc: { cur: s.linhLuc, max: s.linhLuc },
    currency: { LINH_THACH: s.linhThach, TIEN_NGOC: s.tienNgoc, XU: s.xu },
  };
}

// Upgrade `raw` step by step until it reaches SAVE_VERSION. Unknown or newer versions return null.
const STEPS: Record<number, (s: Record<string, unknown>) => Record<string, unknown>> = {
  1: s => ({
    ...s, version: 2,
    tienNo: (Array.isArray(s.tienNo) ? s.tienNo : []).map((t: object) => ({ copies: 0, ...t })),
    tickets: GACHA.startTickets,
    pity: { sinceSR: 0, sinceUR: 0 },
    party: emptyParty('CHAR.PLAYER.MAIN'),
  }),
  2: s => ({ ...s, version: 3, trial: newTrial() }),
  // VS-11: Tien No rarity follows content by id (Tan Nguyet Dao N -> R); levels above the new maxLevel drop to it. Protagonist stays N.
  3: s => {
    const max = BALANCE.progression.maxLevel;
    const fix = <C extends Character>(c: C, rarity = c.rarity): C => {
      const level = Math.min(c.level, max), hpMax = hpMaxFor(rarity, level, c.element);
      return { ...c, rarity, level, hpMax, hp: Math.min(c.hp, hpMax) };
    };
    const tienNo = (s.tienNo as Character[]).map(c => fix(c, TIEN_NO.find(t => t.id === c.id)?.rarity ?? c.rarity));
    return { ...s, version: 4, player: fix(s.player as Character), tienNo };
  },
};
export function migrate(raw: { version: number }): GameState | null {
  let s = raw as Record<string, unknown>;
  while (typeof s.version === 'number' && s.version < SAVE_VERSION) {
    const step = STEPS[s.version];
    if (!step) return null;
    s = step(s);
  }
  return s.version === SAVE_VERSION ? (s as unknown as GameState) : null;
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;
const looksValid = (s: unknown): s is GameState =>
  isObj(s) && isObj(s.rng) && typeof s.rng.state === 'number' && isObj(s.player) && typeof s.player.level === 'number'
  && Array.isArray(s.tienNo) && typeof s.tickets === 'number' && isObj(s.pity) && Array.isArray(s.party) && s.party.length === PARTY_SIZE
  && isObj(s.trial) && typeof s.trial.cleared === 'number' && typeof s.trial.floor === 'number' && isObj(s.trial.repeats) && isObj(s.linhLuc) && isObj(s.currency);

export const serialize = (s: GameState): string => JSON.stringify(s);

export function parseSave(text: string | null): { state: GameState; warning?: string } {
  if (text === null) return { state: newGame() };
  try {
    const raw = JSON.parse(text);
    const migrated = isObj(raw) && typeof raw.version === 'number' ? migrate(raw as { version: number }) : null;
    if (migrated && looksValid(migrated)) return { state: migrated };
  } catch { /* fall through */ }
  return { state: newGame(), warning: 'Save hỏng hoặc khác phiên bản, bắt đầu game mới.' };
}

export function loadGame(storage: Pick<Storage, 'getItem'> = localStorage): { state: GameState; warning?: string } {
  try { return parseSave(storage.getItem(SAVE_KEY)); }
  catch { return { state: newGame(), warning: 'Không đọc được localStorage, bắt đầu game mới.' }; }
}

export function saveGame(s: GameState, storage: Pick<Storage, 'setItem'> = localStorage): boolean {
  try { storage.setItem(SAVE_KEY, serialize(s)); return true; } catch { return false; }
}
