import type { BattleEvent, UnitInfo } from './types';

export interface UnitView extends UnitInfo { shield: number; dead: boolean; status: string[]; acting: boolean }
export interface Float { key: number; target: string; text: string; kind: 'damage' | 'heal' | 'shield' }
export interface Frame { units: UnitView[]; floats: Float[]; end?: Extract<BattleEvent, { type: 'end' }> }

// Read-only fold of the battle log up to `tick`: the renderer draws this and never runs battle rules.
export function frameAt(events: BattleEvent[], tick: number, floatTicks = 12): Frame {
  const start = events[0];
  if (start?.type !== 'start') return { units: [], floats: [] };
  const units = new Map(start.units.map(u => [u.uid, { ...u, shield: 0, dead: false, status: [] as string[], acting: false }]));
  const until = new Map<string, Record<string, number>>();
  const floats: Float[] = [];
  let end: Frame['end'];
  events.forEach((e, key) => {
    if (e.t > tick) return;
    switch (e.type) {
      case 'action': { const a = units.get(e.actor)!; a.acting = e.t === tick; break; }
      case 'damage': {
        const u = units.get(e.target)!;
        u.hp = e.hp; u.shield = Math.max(0, u.shield - e.absorbed);
        if (tick - e.t < floatTicks) floats.push({ key, target: e.target, text: `-${e.amount}`, kind: 'damage' });
        break;
      }
      case 'heal':
        units.get(e.target)!.hp = e.hp;
        if (tick - e.t < floatTicks) floats.push({ key, target: e.target, text: `+${e.amount}`, kind: 'heal' });
        break;
      case 'shield':
        units.get(e.target)!.shield = e.shield;
        if (tick - e.t < floatTicks) floats.push({ key, target: e.target, text: `+${e.amount} khiên`, kind: 'shield' });
        break;
      case 'control':
        if (e.status === 'cleanse') until.set(e.target, {});
        else until.set(e.target, { ...until.get(e.target), [e.status]: e.t + e.ticks });
        break;
      case 'death': units.get(e.target)!.dead = true; break;
      case 'end': end = e; break;
    }
  });
  for (const u of units.values()) u.status = Object.entries(until.get(u.uid) ?? {}).filter(([, t]) => t > tick).map(([s]) => s);
  return { units: [...units.values()], floats, end };
}

export const lastTick = (events: BattleEvent[]): number => events[events.length - 1]?.t ?? 0;
