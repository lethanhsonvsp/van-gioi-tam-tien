import { BALANCE, RARITIES, SKILLS, TIEN_NO, type Rarity, type Skill, type StatusId, type TienNo } from '../content';
import type { GameState } from './save';

// Sổ Tay data: pure views over content and the save. Seen = owned (the roster is the only record of who the player has met).
export interface CodexEntry { tienNo: TienNo; seen: boolean; level: number; copies: number }

export function codexEntries(g: Pick<GameState, 'tienNo'>): CodexEntry[] {
  return TIEN_NO.map(t => {
    const own = g.tienNo.find(c => c.id === t.id);
    return { tienNo: t, seen: !!own, level: own?.level ?? 0, copies: own ? own.copies + 1 : 0 };
  });
}
export const seenCount = (g: Pick<GameState, 'tienNo'>): number => codexEntries(g).filter(e => e.seen).length;

export interface RarityRow { rarity: Rarity; multiplier: number; perLevelPct: number; capBonus: number }
// Stats = base * multiplier * (1 + growthPerLevel * (level - 1)), so one level adds multiplier * growthPerLevel of the base.
export const rarityRows = (): RarityRow[] => RARITIES.map(rarity => ({
  rarity, multiplier: BALANCE.rarityStatMultiplier[rarity],
  perLevelPct: Math.round(BALANCE.rarityStatMultiplier[rarity] * BALANCE.battle.growthPerLevel * 1000) / 10,
  capBonus: BALANCE.progression.capBonus[rarity],
}));

export interface KindGuide { kind: Skill['kind']; count: number; every: [number, number]; strength: string }
const span = (v: number[]): [number, number] => [Math.min(...v), Math.max(...v)];
const range = (v: number[]) => { const [a, b] = span(v); return a === b ? `${a}` : `${a}–${b}`; };

// Per template: how many characters use it, how often it fires, and the strength range read from the skill data.
export function kindGuides(): KindGuide[] {
  const kits = Object.values(SKILLS.kits);
  const of = (kind: Skill['kind']) => kits.filter(k => k.kind === kind);
  const dmg = of('damage'), sup = of('support'), ctl = of('control');
  const strength: Record<Skill['kind'], string> = {
    damage: `sát thương ${range(dmg.map(k => k.power ?? 0))}× công`,
    support: `hồi ${range(sup.filter(k => k.heal).map(k => k.heal!))}× công, khiên ${range(sup.filter(k => k.shield).map(k => k.shield!))}× công`,
    control: `sát thương ${range(ctl.map(k => k.power ?? 0))}× công kèm trạng thái`,
  };
  return (['damage', 'support', 'control'] as const).map(kind => {
    const ks = of(kind);
    return { kind, count: ks.length, every: span(ks.map(k => k.every)), strength: strength[kind] };
  });
}

// Duration (ticks) of each control status, from the skills that apply it.
export const statusTicks = (s: StatusId): number[] =>
  Object.values(SKILLS.kits).filter(k => k.status === s).map(k => k.ticks ?? 0);
export const basicPower = (): number => SKILLS.basic.power ?? 1;
// Control duration in action turns: a unit acts every actGauge / spd ticks (balance.json).
export const statusTurns = (s: StatusId): number[] =>
  statusTicks(s).map(t => Math.round(t / (BALANCE.battle.actGauge / BALANCE.battle.statBase.spd)));
