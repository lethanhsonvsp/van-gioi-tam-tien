import { useMemo } from 'react';
import { summarize, type UnitStats } from '../battle/summary';
import type { BattleEvent } from '../battle/types';
import './report.css';

const top = (label: string, u: UnitStats | undefined, v: number | undefined) => (u ? `${label}: ${u.name} ${v}` : null);

// Collapsed: one summary line (top damage, top heal, most kills). Open: per-unit table, scrolling inside its frame. All numbers fold from the event log (battle/summary.ts).
export function ReportBar({ events, open, toggle }: { events: BattleEvent[]; open: boolean; toggle: () => void }) {
  const { top: t } = useMemo(() => summarize(events), [events]);
  const line = [top('Sát thương cao nhất', t.damage, t.damage?.damageDealt), top('Hồi nhiều nhất', t.heal, t.heal?.healed), top('Hạ gục nhiều nhất', t.kills, t.kills?.kills)].filter(Boolean).join(' · ');
  return (
    <div className="report-bar">
      <button className="back" aria-expanded={open} onClick={toggle}>Chiến báo {open ? '▴' : '▾'}</button>
      <span className="report-line" title={line}>{line || 'Không ai gây sát thương'}</span>
    </div>
  );
}

export function ReportTable({ events }: { events: BattleEvent[] }) {
  const { units } = useMemo(() => summarize(events), [events]);
  const row = (u: UnitStats) => (
    <tr key={u.uid} className={u.dead ? 'dead' : ''}>
      <th scope="row" title={u.name}>{u.name}{u.dead ? ' (gục)' : ''}</th>
      <td>{u.damageDealt}</td><td>{u.damageTaken}</td><td>{u.healed}</td><td>{u.absorbed}</td><td>{u.controls}</td><td>{u.kills}</td>
    </tr>
  );
  const group = (side: 'A' | 'B', title: string) => <>
    <tr className="grp"><th colSpan={7}>{title}</th></tr>{units.filter(u => u.side === side).map(row)}
  </>;
  return (
    <div className="report">
      <table>
        <thead><tr><th>Tên</th><th>Gây</th><th>Nhận</th><th>Hồi</th><th>Khiên đỡ</th><th>Khống chế</th><th>Hạ gục</th></tr></thead>
        <tbody>{group('A', 'Đội của bạn')}{group('B', 'Quái')}</tbody>
      </table>
    </div>
  );
}
