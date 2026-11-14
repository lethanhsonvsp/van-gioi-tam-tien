import tienNoJson from './tien_no.json';
import balanceJson from './balance.json';
import skillsJson from './skills.json';
import trialJson from './trial.json';
import gachaJson from './gacha.json';
import rewardsJson from './rewards.json';

export const RARITIES = ['N', 'R', 'SR', 'SSR', 'UR'] as const;
export type Rarity = (typeof RARITIES)[number];
export interface TienNo { id: string; name: string; element: string; rarity: Rarity; title: string; role: string }
export interface Balance {
  status: string;
  rarityStatMultiplier: Record<Rarity, number>;
  start: { level: number; linhThach: number; tienNgoc: number; xu: number; linhLuc: number; hpBase: number; playerName: string };
  battle: {
    status: string;
    statBase: { atk: number; def: number; spd: number };
    growthPerLevel: number;
    elementBias: Record<string, Partial<Record<'hp' | 'atk' | 'def' | 'spd', number>>>;
    elementAdvantage: number;
    actGauge: number;
    maxTicks: number;
    damageVariance: number;
    defenseK: number;
  };
  progression: {
    status: string; maxLevel: number; realmSize: number; realms: string[];
    expToNext: { base: number; pow: number }; cultivateCost: { base: number; pow: number }; capBonus: Record<Rarity, number>;
  };
}

// One skill = one of 3 templates plus parameters; the per-character "tag" is only these numbers.
export type SkillTarget = 'front' | 'back' | 'lowest' | 'random' | 'all' | 'lowestAlly' | 'allAllies' | 'self';
export type StatusId = 'stun' | 'freeze' | 'slow';
export interface Skill {
  name: string; kind: 'damage' | 'support' | 'control'; target: SkillTarget; every: number; tag?: string;
  power?: number; selfCost?: number; lifesteal?: number; ramp?: number; // damage
  heal?: number; shield?: number; cleanse?: boolean; // support
  status?: StatusId; ticks?: number; // control
}
export interface Skills { status: string; basic: Skill; kits: Record<string, Skill> }
export interface Trial {
  status: string; floors: number; team: string[];
  monster: { levelPerFloor: number; statMult: Record<'hp' | 'atk' | 'def' | 'spd', number>; countBase: number; countPerFloor: number; countMax: number; bossEvery: number; bossMult: number };
  elements: string[]; names: Record<string, string>;
}

// Trial win rewards (alpha-temporary). First clear pays full; repeats pay mult*decay^k and stop after `cap` repeats per floor.
export interface Rewards {
  status: string; linhThach: { base: number; perFloor: number }; exp: { base: number; perFloor: number };
  firstClearTickets: { every: number; amount: number; boss: number }; repeat: { mult: number; decay: number; cap: number };
}

export interface Gacha { status: string; cost: number; startTickets: number; rates: Record<Rarity, number>; pity: { srEvery: number; urEvery: number } }

const isStr = (v: unknown): v is string => typeof v === 'string' && v.length > 0;

export function validateTienNo(data: unknown): TienNo[] {
  if (!Array.isArray(data) || data.length === 0) throw new Error('tien_no: expected a non-empty array');
  const ids = new Set<string>();
  data.forEach((c, i) => {
    const at = `tien_no[${i}]`;
    if (typeof c !== 'object' || c === null) throw new Error(`${at}: not an object`);
    for (const k of ['id', 'name', 'element', 'title', 'role']) if (!isStr((c as Record<string, unknown>)[k])) throw new Error(`${at}: missing or empty "${k}"`);
    if (!/^CHAR\.TIEN_NO\.[A-Z_]+$/.test(c.id)) throw new Error(`${at}: bad id "${c.id}"`);
    if (!(RARITIES as readonly string[]).includes(c.rarity)) throw new Error(`${at}: bad rarity "${c.rarity}"`);
    if (ids.has(c.id)) throw new Error(`${at}: duplicate id "${c.id}"`);
    ids.add(c.id);
  });
  return data as TienNo[];
}

export function validateBalance(data: unknown): Balance {
  const b = data as Balance;
  if (!b || typeof b !== 'object' || !isStr(b.status)) throw new Error('balance: missing "status"');
  for (const r of RARITIES) if (typeof b.rarityStatMultiplier?.[r] !== 'number' || !(b.rarityStatMultiplier[r] > 0)) throw new Error(`balance: bad multiplier for ${r}`);
  if (!b.start || typeof b.start.level !== 'number' || !isStr(b.start.playerName)) throw new Error('balance: bad "start"');
  const bt = b.battle;
  if (!bt || !(bt.actGauge > 0) || !(bt.maxTicks > 0) || !(bt.statBase?.spd > 0)) throw new Error('balance: bad "battle"');
  const p = b.progression;
  if (!p || !(p.maxLevel >= 1) || !(p.realmSize >= 1) || !p.realms?.length || !(p.expToNext?.base > 0) || !(p.cultivateCost?.base > 0)) throw new Error('balance: bad "progression"');
  for (const r of RARITIES) if (!(p.capBonus?.[r] >= 0)) throw new Error(`balance: bad capBonus for ${r}`);
  return b;
}

const KINDS = ['damage', 'support', 'control'];
export function validateSkills(data: unknown): Skills {
  const s = data as Skills;
  if (!s || !isStr(s.status) || !s.kits) throw new Error('skills: missing "status" or "kits"');
  for (const [id, k] of Object.entries({ basic: s.basic, ...s.kits })) {
    if (!k || !isStr(k.name) || !KINDS.includes(k.kind) || !isStr(k.target) || !(k.every >= 1)) throw new Error(`skills.${id}: bad skill`);
    if (k.kind === 'control' && !(isStr(k.status) && (k.ticks ?? 0) > 0)) throw new Error(`skills.${id}: control needs status and ticks`);
  }
  return s;
}

export function validateTrial(data: unknown, tienNo: TienNo[]): Trial {
  const t = data as Trial;
  if (!t || !isStr(t.status) || !(t.floors >= 1) || !t.monster) throw new Error('trial: bad data');
  for (const id of t.team) if (!tienNo.some(c => c.id === id)) throw new Error(`trial: unknown team member "${id}"`);
  for (const e of t.elements) if (!isStr(t.names[e])) throw new Error(`trial: no monster name for ${e}`);
  return t;
}

export function validateGacha(data: unknown): Gacha {
  const g = data as Gacha;
  if (!g || !isStr(g.status) || !(g.cost >= 1) || !(g.startTickets >= 0)) throw new Error('gacha: bad data');
  for (const r of RARITIES) if (!(g.rates?.[r] >= 0)) throw new Error(`gacha: bad rate for ${r}`);
  if (!RARITIES.some(r => g.rates[r] > 0) || !(g.pity?.srEvery >= 1) || !(g.pity?.urEvery >= g.pity.srEvery)) throw new Error('gacha: bad pity');
  return g;
}

export function validateRewards(data: unknown): Rewards {
  const r = data as Rewards;
  if (!r || !isStr(r.status) || !(r.linhThach?.base >= 0) || !(r.exp?.base >= 0) || !(r.firstClearTickets?.every >= 1)) throw new Error('rewards: bad data');
  if (!(r.repeat?.mult >= 0 && r.repeat.mult <= 1 && r.repeat.decay >= 0 && r.repeat.decay < 1 && r.repeat.cap >= 0)) throw new Error('rewards: repeat must shrink and be capped');
  return r;
}

export const TIEN_NO: TienNo[] = validateTienNo(tienNoJson);
export const BALANCE: Balance = validateBalance(balanceJson);
export const SKILLS: Skills = validateSkills(skillsJson);
export const TRIAL: Trial = validateTrial(trialJson, TIEN_NO);
export const GACHA: Gacha = validateGacha(gachaJson);
export const REWARDS: Rewards = validateRewards(rewardsJson);
