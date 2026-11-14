import { REWARDS, TRIAL } from '../content';
import { addExp, levelCap } from './progress';
import type { GameState } from './save';

export interface TrialProgress {
  cleared: number; // highest floor ever won (0 = none)
  floor: number; // floor the player is standing on (1..cleared+1)
  repeats: Record<string, number>; // paid repeat wins per floor; rewards stop at REWARDS.repeat.cap
}

export const newTrial = (): TrialProgress => ({ cleared: 0, floor: 1, repeats: {} });

export interface Reward { firstClear: boolean; linhThach: number; exp: number; tickets: number; repeatsLeft: number }

const isBoss = (floor: number) => floor % TRIAL.monster.bossEvery === 0;

// Economy (conservation): only first clears give summon tickets; a repeat pays mult*decay^k of the base and nothing after `cap` repeats,
// so every floor has a finite total payout and nothing can be farmed forever. Losses pay nothing.
export function floorReward(t: TrialProgress, floor: number): Reward {
  const r = REWARDS, first = floor > t.cleared, k = t.repeats[floor] ?? 0;
  const mult = first ? 1 : k >= r.repeat.cap ? 0 : r.repeat.mult * r.repeat.decay ** k;
  const ft = r.firstClearTickets;
  const tickets = first ? (floor % ft.every === 0 ? ft.amount : 0) + (isBoss(floor) ? ft.boss : 0) : 0;
  return {
    firstClear: first,
    linhThach: Math.floor((r.linhThach.base + r.linhThach.perFloor * floor) * mult),
    exp: Math.floor((r.exp.base + r.exp.perFloor * floor) * mult),
    tickets,
    repeatsLeft: first ? r.repeat.cap : Math.max(0, r.repeat.cap - k - 1),
  };
}

// Pure: apply a win on `floor`. EXP goes to the whole party that fought (dead or alive). Tien No EXP respects the level cap
// computed after the protagonist's own gain. Ids that are not owned (sample team) get nothing.
export function claimWin(s: GameState, floor: number, fighters: string[]): { state: GameState; reward: Reward } {
  const reward = floorReward(s.trial, floor);
  const player = fighters.includes(s.player.id) ? addExp(s.player, reward.exp, levelCap(s.player, 0, true)) : s.player;
  const tienNo = s.tienNo.map(c => (fighters.includes(c.id) ? addExp(c, reward.exp, levelCap(c, player.level, false)) : c));
  const trial: TrialProgress = reward.firstClear
    ? { ...s.trial, cleared: floor, floor: Math.min(TRIAL.floors, floor + 1) }
    : { ...s.trial, repeats: { ...s.trial.repeats, [floor]: (s.trial.repeats[floor] ?? 0) + 1 } };
  const state: GameState = {
    ...s, player, tienNo, trial,
    tickets: s.tickets + reward.tickets,
    currency: { ...s.currency, LINH_THACH: s.currency.LINH_THACH + reward.linhThach },
  };
  return { state, reward };
}

// Floors the player may pick: any cleared floor or the next one.
export const canEnter = (t: TrialProgress, floor: number): boolean => floor >= 1 && floor <= Math.min(TRIAL.floors, t.cleared + 1);
export const goFloor = (s: GameState, floor: number): GameState => (canEnter(s.trial, floor) ? { ...s, trial: { ...s.trial, floor } } : s);
