import { BALANCE, SKILLS } from '../content';
import { newRng } from '../core/rng';
import { useSkill, type Ctx } from './skills';
import type { BattleResult, Fighter, Side, Unit } from './types';

const toUnit = (f: Fighter, side: Side, i: number): Unit =>
  ({ ...f, uid: `${side}${i}`, side, shield: 0, gauge: 0, actions: 0, status: {} });

function winnerOf(units: Unit[]): Side | null {
  const up = (s: Side) => units.some(u => u.side === s && u.hp > 0);
  if (!up('B')) return 'A';
  if (!up('A')) return 'B';
  return null;
}

// Deterministic tick simulation: same fighters + same seed = same event log.
// Each tick every unit gains `spd` gauge (half when slowed, none when stunned/frozen); at actGauge it acts.
// A unit's kit skill fires on every `every`-th action, otherwise it uses the basic attack.
export function runBattle(teamA: Fighter[], teamB: Fighter[], seed: number, maxTicks = BALANCE.battle.maxTicks): BattleResult {
  const units = [...teamA.map((f, i) => toUnit(f, 'A', i)), ...teamB.map((f, i) => toUnit(f, 'B', i))];
  const ctx: Ctx = { units, rng: newRng(seed), t: 0, events: [] };
  ctx.events.push({ t: 0, type: 'start', seed, units: units.map(({ uid, side, charId, name, element, hp, hpMax }) => ({ uid, side, charId, name, element, hp, hpMax })) });
  const gaugeMax = BALANCE.battle.actGauge;
  let winner = winnerOf(units);

  while (!winner && ctx.t < maxTicks) {
    ctx.t++;
    for (const u of units) {
      if (u.hp <= 0) continue;
      const held = (u.status.stun ?? 0) > 0 || (u.status.freeze ?? 0) > 0;
      if (!held) u.gauge += u.spd * ((u.status.slow ?? 0) > 0 ? 0.5 : 1);
      for (const k of Object.keys(u.status) as (keyof Unit['status'])[]) u.status[k] = Math.max(0, (u.status[k] ?? 0) - 1);
    }
    // Fullest gauge acts first; ties keep slot order (stable sort).
    const ready = units.filter(u => u.hp > 0 && u.gauge >= gaugeMax).sort((a, b) => b.gauge - a.gauge);
    for (const u of ready) {
      if (u.hp <= 0) continue; // died earlier this tick
      u.gauge -= gaugeMax;
      u.actions++;
      const kit = u.actions % u.skill.every === 0;
      useSkill(ctx, u, kit ? u.skill : SKILLS.basic, kit ? u.actions / u.skill.every - 1 : 0);
      if ((winner = winnerOf(units))) break;
    }
  }

  const result = winner ?? 'draw';
  ctx.events.push({ t: ctx.t, type: 'end', winner: result, ticks: ctx.t });
  return { winner: result, ticks: ctx.t, events: ctx.events, survivors: units.filter(u => u.hp > 0) };
}
