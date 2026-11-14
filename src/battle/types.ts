import type { Rarity, Skill, StatusId } from '../content';

export type Side = 'A' | 'B'; // A = player team, B = monsters

// What a fighter brings into a battle: identity, element and level-derived stats. Pure data.
export interface Fighter {
  charId: string;
  name: string;
  element: string;
  rarity: Rarity;
  level: number;
  hp: number; // current HP carried in (lets Bí Cảnh keep per-character HP later)
  hpMax: number;
  atk: number;
  def: number;
  spd: number;
  skill: Skill;
}

export interface Unit extends Fighter {
  uid: string; // side + slot, e.g. "A0"
  side: Side;
  shield: number;
  gauge: number;
  actions: number;
  status: Partial<Record<StatusId, number>>; // ticks left
}

export interface UnitInfo { uid: string; side: Side; charId: string; name: string; element: string; hp: number; hpMax: number }

// Battle log: the only thing the renderer reads.
export type BattleEvent =
  | { t: number; type: 'start'; seed: number; units: UnitInfo[] }
  | { t: number; type: 'action'; actor: string; skill: string; kind: Skill['kind']; targets: string[] }
  | { t: number; type: 'damage'; source: string; target: string; amount: number; absorbed: number; hp: number }
  | { t: number; type: 'heal'; source: string; target: string; amount: number; hp: number }
  | { t: number; type: 'shield'; source: string; target: string; amount: number; shield: number }
  | { t: number; type: 'control'; source: string; target: string; status: StatusId | 'cleanse'; ticks: number }
  | { t: number; type: 'death'; target: string }
  | { t: number; type: 'end'; winner: Side | 'draw'; ticks: number };

export interface BattleResult { winner: Side | 'draw'; ticks: number; events: BattleEvent[]; survivors: Unit[] }
