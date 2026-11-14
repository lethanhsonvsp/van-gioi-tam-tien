import { RARITIES, REWARDS, TRIAL, type Rarity } from '../content';
import { runBattle } from '../battle/engine';
import { floorMonsters } from '../battle/monsters';
import { playerTeam } from '../battle/team';
import { rarityMultiplier, type Character } from '../core/character';
import { pull } from '../core/gacha';
import { cultivate, cultivateBlock } from '../core/progress';
import { claimWin } from '../core/rewards';
import { newRng, nextInt } from '../core/rng';
import { emptyParty } from '../core/roster';
import type { GameState } from '../core/save';

// Sample player for balance checks (test-only): pull every ticket, best 5 Tien No in the party,
// spend linh thach levelling the lowest-level party member, fight the next floor; on a loss farm the highest
// cleared floor that still pays, else retry. Stuck = `stuckLosses` losses in a row on one floor with nothing left to farm.
export interface FloorStat { attempts: number; wins: number }
export interface ClimbResult { cleared: number; battles: number; stuckAt: number | null; floors: FloorStat[]; ticketsEarned: number; pulls: number; lsEarned: number; lsLeft: number; rarity: Record<Rarity, number>; levels: number[] }

const power = (c: Character) => rarityMultiplier(c.rarity) * c.level;

function pullAll(s: GameState): { s: GameState; n: number } {
  let n = 0;
  for (;;) {
    const r = pull(s, s.tickets >= 10 ? 10 : 1);
    if (!r) return { s, n };
    s = r.state; n += r.results.length;
  }
}

function bestParty(s: GameState): GameState {
  const top = [...s.tienNo].sort((a, b) => power(b) - power(a)).slice(0, 5).map(c => c.id);
  const party = emptyParty(s.player.id).map((x, i) => (i === 0 ? x : top[i - 1] ?? null));
  return { ...s, party };
}

function spend(s: GameState): GameState {
  for (;;) {
    const ids = s.party.filter((x): x is string => !!x);
    const level = (id: string) => (id === s.player.id ? s.player.level : s.tienNo.find(c => c.id === id)!.level);
    const next = ids.filter(id => !cultivateBlock(s, id)).sort((a, b) => level(a) - level(b))[0];
    if (!next) return s;
    s = cultivate(s, next)!;
  }
}

export function climb(start: GameState, seed: number, opts: { maxBattles?: number; stuckLosses?: number; gacha?: boolean } = {}): ClimbResult {
  const { maxBattles = 600, stuckLosses = 25, gacha = true } = opts;
  const rng = newRng(seed * 7919 + 1);
  const floors: FloorStat[] = Array.from({ length: TRIAL.floors }, () => ({ attempts: 0, wins: 0 }));
  let s = start, farmBelow = Infinity, battles = 0, streak = 0, ticketsEarned = 0, lsEarned = 0, pulls = 0, stuckAt: number | null = null;

  const fight = (floor: number): boolean => {
    battles++;
    const team = playerTeam(s);
    const won = runBattle(team, floorMonsters(floor), nextInt(rng, 2 ** 31)).winner === 'A';
    if (won) {
      const r = claimWin(s, floor, team.map(f => f.charId));
      s = r.state; ticketsEarned += r.reward.tickets; lsEarned += r.reward.linhThach;
    }
    return won;
  };

  while (s.trial.cleared < TRIAL.floors && battles < maxBattles) {
    if (gacha) { const p = pullAll(s); s = p.s; pulls += p.n; }
    s = spend(bestParty(s));
    const f = s.trial.cleared + 1;
    floors[f - 1].attempts++;
    if (fight(f)) { floors[f - 1].wins++; streak = 0; farmBelow = Infinity; continue; }
    streak++;
    // Farm the highest cleared floor that still pays; a farm loss moves down one floor (a real player would not retry a losing farm forever).
    const farm = Array.from({ length: s.trial.cleared }, (_, i) => s.trial.cleared - i).find(x => x < farmBelow && (s.trial.repeats[x] ?? 0) < REWARDS.repeat.cap);
    if (farm) { if (!fight(farm)) farmBelow = farm; continue; }
    if (streak >= stuckLosses) { stuckAt = f; break; }
  }
  if (stuckAt === null && s.trial.cleared < TRIAL.floors) stuckAt = s.trial.cleared + 1; // ran out of battles: count as stuck
  const rarity = Object.fromEntries(RARITIES.map(r => [r, s.tienNo.filter(c => c.rarity === r).length])) as Record<Rarity, number>;
  const levels = [s.player.level, ...s.party.slice(1).map(id => s.tienNo.find(c => c.id === id)?.level ?? 0)];
  return { cleared: s.trial.cleared, battles, stuckAt, floors, ticketsEarned, pulls, lsEarned, lsLeft: s.currency.LINH_THACH, rarity, levels };
}
