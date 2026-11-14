import { BALANCE, type Skill } from '../content';
import { nextFloat, nextInt, type Rng } from '../core/rng';
import type { BattleEvent, Unit } from './types';

export interface Ctx { units: Unit[]; rng: Rng; t: number; events: BattleEvent[] }

const alive = (us: Unit[]) => us.filter(u => u.hp > 0);
const ratio = (u: Unit) => u.hp / u.hpMax;
const lowest = (us: Unit[]) => us.reduce((a, b) => (ratio(b) < ratio(a) ? b : a));

export function pickTargets(ctx: Ctx, self: Unit, target: Skill['target']): Unit[] {
  const enemies = alive(ctx.units.filter(u => u.side !== self.side));
  const allies = alive(ctx.units.filter(u => u.side === self.side));
  if (!enemies.length && !['lowestAlly', 'allAllies', 'self'].includes(target)) return [];
  switch (target) {
    case 'front': return [enemies[0]];
    case 'back': return [enemies[enemies.length - 1]];
    case 'lowest': return [lowest(enemies)];
    case 'random': return [enemies[nextInt(ctx.rng, enemies.length)]];
    case 'all': return enemies;
    case 'lowestAlly': return [lowest(allies)];
    case 'allAllies': return allies;
    case 'self': return [self];
  }
}

// Shield absorbs first; returns HP actually lost.
function hurt(ctx: Ctx, source: Unit, target: Unit, amount: number): number {
  const absorbed = Math.min(target.shield, amount);
  target.shield -= absorbed;
  const lost = Math.min(target.hp, amount - absorbed);
  target.hp -= lost;
  ctx.events.push({ t: ctx.t, type: 'damage', source: source.uid, target: target.uid, amount, absorbed, hp: target.hp });
  if (target.hp <= 0) ctx.events.push({ t: ctx.t, type: 'death', target: target.uid });
  return lost;
}

function heal(ctx: Ctx, source: Unit, target: Unit, amount: number): void {
  const gained = Math.min(amount, target.hpMax - target.hp);
  if (gained <= 0) return;
  target.hp += gained;
  ctx.events.push({ t: ctx.t, type: 'heal', source: source.uid, target: target.uid, amount: gained, hp: target.hp });
}

function damageRoll(ctx: Ctx, u: Unit, target: Unit, power: number): number {
  const b = BALANCE.battle;
  const roll = 1 + b.damageVariance * (2 * nextFloat(ctx.rng) - 1);
  // shortcut: element advantage is a flat alpha-temporary 1.0 for every pair; a real counter table comes with balance work.
  const raw = u.atk * power * b.elementAdvantage * roll;
  return Math.max(1, Math.round(raw * b.defenseK / (b.defenseK + target.def)));
}

export function useSkill(ctx: Ctx, u: Unit, s: Skill, uses: number): void {
  const targets = pickTargets(ctx, u, s.target);
  if (!targets.length) return;
  ctx.events.push({ t: ctx.t, type: 'action', actor: u.uid, skill: s.name, kind: s.kind, targets: targets.map(x => x.uid) });

  if (s.selfCost) { // blood sacrifice never kills the caster
    const cost = Math.min(u.hp - 1, Math.round(u.hpMax * s.selfCost));
    if (cost > 0) hurt(ctx, u, u, cost);
  }

  if (s.kind === 'support') {
    for (const x of targets) {
      if (s.heal) heal(ctx, u, x, Math.round(u.atk * s.heal));
      if (s.shield) {
        const amount = Math.round(u.atk * s.shield);
        x.shield = Math.min(x.hpMax, x.shield + amount);
        ctx.events.push({ t: ctx.t, type: 'shield', source: u.uid, target: x.uid, amount, shield: x.shield });
      }
      if (s.cleanse && Object.values(x.status).some(v => (v ?? 0) > 0)) {
        x.status = {};
        ctx.events.push({ t: ctx.t, type: 'control', source: u.uid, target: x.uid, status: 'cleanse', ticks: 0 });
      }
    }
    return;
  }

  const power = (s.power ?? 0) * (1 + (s.ramp ?? 0) * uses);
  let drained = 0;
  for (const x of targets) {
    if (power > 0) drained += hurt(ctx, u, x, damageRoll(ctx, u, x, power));
    if (s.kind === 'control' && s.status && x.hp > 0) {
      x.status[s.status] = Math.max(x.status[s.status] ?? 0, s.ticks ?? 0);
      ctx.events.push({ t: ctx.t, type: 'control', source: u.uid, target: x.uid, status: s.status, ticks: s.ticks ?? 0 });
    }
  }
  if (s.lifesteal && drained > 0) heal(ctx, u, u, Math.round(drained * s.lifesteal));
}
