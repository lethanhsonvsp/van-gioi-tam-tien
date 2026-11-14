import { TRIAL } from '../content';
import { FLOOR_COUNT, floorMonsters } from '../battle/monsters';
import { playerTeam } from '../battle/team';
import type { Fighter } from '../battle/types';
import { floorReward } from '../core/rewards';
import { useGame } from './useGame';

const Row = ({ f, boss }: { f: Fighter; boss?: boolean }) => (
  <div className="pv-row">
    <b className={boss ? 'boss' : ''}>{f.name}{boss ? ' (Thủ lĩnh)' : ''}</b><span>HP {f.hpMax}</span>
    <small>Hệ {f.element} · Cấp {f.level} · Độ hiếm {f.rarity}</small>
  </div>
);

// Pre-battle view of the chosen floor: reuses playerTeam / floorMonsters / floorReward, no battle rules of its own.
export function TrialPreview({ floor }: { floor: number }) {
  const g = useGame();
  const team = playerTeam(g), mons = floorMonsters(floor), r = floorReward(g.trial, floor);
  const label = g.tienNo.length === 0 ? 'Đội mẫu' : team.length <= 1 ? 'Chỉ nhân vật chính' : '';
  const bossAt = floor % TRIAL.monster.bossEvery === 0 ? mons.length - 1 : -1;
  return (
    <div className="preview">
      <section><h3>Đội của bạn ({team.length}){label && <span className="tag">{label}</span>}</h3>{team.map(f => <Row key={f.charId} f={f} />)}</section>
      <section><h3>Tầng {floor}/{FLOOR_COUNT} · Quái ({mons.length})</h3>{mons.map((f, i) => <Row key={i} f={f} boss={i === bossAt} />)}</section>
      <div className="pv-reward">{r.firstClear ? 'Thắng lần đầu' : r.linhThach ? `Thưởng lặp (còn ${r.repeatsLeft + 1} lần)` : 'Hết thưởng lặp'}: +{r.linhThach} linh thạch · +{r.exp} EXP{r.tickets ? ` · +${r.tickets} thẻ triệu hồi` : ''}</div>
    </div>
  );
}
