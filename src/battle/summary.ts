import type { BattleEvent, Side } from './types';

// Per-unit battle report folded from the event log (pure; no battle rules).
export interface UnitStats {
  uid: string; side: Side; name: string; charId: string;
  damageDealt: number; damageTaken: number; healed: number; shielded: number; absorbed: number; controls: number; kills: number; dead: boolean;
}
export interface Summary { units: UnitStats[]; top: { damage?: UnitStats; heal?: UnitStats; kills?: UnitStats } }

// Damage = HP lost + shield absorbed (the event's `amount`). `shielded` = shield granted to others/self; `absorbed` = damage soaked by the unit's own shield.
// Self-sacrifice damage counts as dealt and taken. Kill = the source of the damage event that hit 0 HP (the death event follows it). Cleanse is not a control.
export function summarize(events: BattleEvent[]): Summary {
  const units = new Map<string, UnitStats>();
  const get = (uid: string) => units.get(uid)!;
  for (const e of events) {
    if (e.type === 'start') for (const u of e.units) units.set(u.uid, { uid: u.uid, side: u.side, name: u.name, charId: u.charId, damageDealt: 0, damageTaken: 0, healed: 0, shielded: 0, absorbed: 0, controls: 0, kills: 0, dead: false });
  }
  let lastHit: { source: string; target: string } | null = null;
  for (const e of events) {
    if (e.type === 'damage') { get(e.source).damageDealt += e.amount; get(e.target).damageTaken += e.amount; get(e.target).absorbed += e.absorbed; lastHit = e; }
    else if (e.type === 'heal') get(e.source).healed += e.amount;
    else if (e.type === 'shield') get(e.source).shielded += e.amount;
    else if (e.type === 'control' && e.status !== 'cleanse') get(e.source).controls++;
    else if (e.type === 'death') { get(e.target).dead = true; if (lastHit && lastHit.target === e.target && lastHit.source !== e.target) get(lastHit.source).kills++; }
  }
  const list = [...units.values()];
  const best = (k: 'damageDealt' | 'healed' | 'kills') => list.filter(u => u[k] > 0).reduce<UnitStats | undefined>((a, u) => (!a || u[k] > a[k] ? u : a), undefined);
  return { units: list, top: { damage: best('damageDealt'), heal: best('healed'), kills: best('kills') } };
}
