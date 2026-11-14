import { GACHA, RARITIES, TIEN_NO, type Rarity, type TienNo } from '../content';
import { makeCharacter } from './character';
import { nextFloat, nextInt } from './rng';
import { autoJoin, toggleParty } from './roster';
import type { GameState } from './save';

export interface PullResult { id: string; rarity: Rarity; isNew: boolean; joined: boolean } // joined: a new Tien No was auto-placed in an empty party slot

const rank = (r: Rarity) => RARITIES.indexOf(r);
const TOP: Rarity[] = ['SR', 'SSR', 'UR'];

// Weighted pick among `from` by configured rate.
function pickRarity(rng: GameState['rng'], from: readonly Rarity[]): Rarity {
  const total = from.reduce((a, r) => a + GACHA.rates[r], 0);
  let x = nextFloat(rng) * total;
  for (const r of from) { x -= GACHA.rates[r]; if (x < 0) return r; }
  return from[from.length - 1];
}

// Choose a Tien No of rarity `r`; if nobody has it, step down to the next lower rarity (then up as a last resort).
function pickTienNo(rng: GameState['rng'], r: Rarity): TienNo {
  for (let i = rank(r); i >= 0; i--) {
    const pool = TIEN_NO.filter(t => t.rarity === RARITIES[i]);
    if (pool.length) return pool[nextInt(rng, pool.length)];
  }
  return TIEN_NO[nextInt(rng, TIEN_NO.length)];
}

// One pull on a working copy. Pity: srEvery-th pull without SR+ is forced SR+; urEvery-th without UR is forced UR (UR wins when both hit).
function pullOne(s: GameState): PullResult {
  const { pity } = s, p = GACHA.pity;
  let r: Rarity;
  if (pity.sinceUR + 1 >= p.urEvery) r = 'UR';
  else if (pity.sinceSR + 1 >= p.srEvery) r = pickRarity(s.rng, TOP);
  else r = pickRarity(s.rng, RARITIES);
  const t = pickTienNo(s.rng, r);
  s.pity = { sinceSR: rank(t.rarity) >= rank('SR') ? 0 : pity.sinceSR + 1, sinceUR: t.rarity === 'UR' ? 0 : pity.sinceUR + 1 };
  const own = s.tienNo.find(c => c.id === t.id);
  if (own) s.tienNo = s.tienNo.map(c => (c === own ? { ...c, copies: c.copies + 1 } : c));
  else s.tienNo = [...s.tienNo, { ...makeCharacter(t, s.player.level), copies: 0 }];
  const j = own ? { party: s.party, joined: false } : autoJoin(s.party, t.id);
  s.party = j.party;
  return { id: t.id, rarity: t.rarity, isNew: !own, joined: j.joined };
}

// Pure: returns the new state and results, or null (state untouched) when tickets are short. The caller's state is never mutated.
export function pull(state: GameState, count: 1 | 10): { state: GameState; results: PullResult[] } | null {
  const need = GACHA.cost * count;
  if (state.tickets < need) return null;
  const s: GameState = { ...state, rng: { ...state.rng }, tickets: state.tickets - need };
  const results = Array.from({ length: count }, () => pullOne(s));
  return { state: s, results };
}

export const toggleInParty = (s: GameState, id: string): GameState => {
  const party = toggleParty(s.party, id, s.tienNo.map(c => c.id));
  return party === s.party ? s : { ...s, party };
};
