import { useEffect, useMemo, useState } from 'react';
import { TRIAL } from '../content';
import { runBattle } from '../battle/engine';
import { FLOOR_COUNT, floorMonsters } from '../battle/monsters';
import { frameAt, lastTick, type UnitView } from '../battle/replay';
import { playerTeam } from '../battle/team';
import type { BattleResult } from '../battle/types';
import { canEnter, claimWin, floorReward, goFloor, type Reward } from '../core/rewards';
import { setState } from '../core/store';
import { Art } from '../ui/Art';
import { useGame } from './useGame';
import './trial.css';

const TICK_MS = 60;
const RESULT = { A: 'Thắng', B: 'Thua', draw: 'Hòa (hết giờ)' } as const;

function UnitCard({ u, floats }: { u: UnitView; floats: { key: number; text: string; kind: string }[] }) {
  return (
    <div className={`unit${u.dead ? ' dead' : ''}${u.acting ? ' acting' : ''}`}>
      <div className={`orb el-${u.element}`}>{u.status.map(s => <span key={s} className={`st st-${s}`} />)}</div>
      <div className="unit-name">{u.name}</div>
      <div className="hp"><div className="hp-fill" style={{ width: `${(u.hp / u.hpMax) * 100}%` }} />
        {u.shield > 0 && <div className="hp-shield" style={{ width: `${Math.min(1, u.shield / u.hpMax) * 100}%` }} />}
        <span>{u.hp}/{u.hpMax}</span></div>
      {floats.map(f => <div key={f.key} className={`float ${f.kind}`}>{f.text}</div>)}
    </div>
  );
}

// Replay only: the battle is simulated once on "Bắt đầu"; the view folds the event log up to the current tick.
export function Trial({ back }: { back: () => void }) {
  const game = useGame();
  const [fought, setFought] = useState<{ floor: number; reward: Reward | null } | null>(null);
  const floor = fought?.floor ?? game.trial.floor;
  const [result, setResult] = useState<BattleResult | null>(null);
  const [tick, setTick] = useState(0);
  const end = result ? lastTick(result.events) : 0;

  useEffect(() => {
    if (!result || tick >= end) return;
    const id = setTimeout(() => setTick(t => t + 1), TICK_MS);
    return () => clearTimeout(id);
  }, [result, tick, end]);

  const frame = useMemo(() => (result ? frameAt(result.events, tick) : null), [result, tick]);
  // The reward is claimed (and saved) as soon as the battle is simulated, so leaving mid-replay loses nothing; it is shown when the replay ends.
  const start = () => {
    const team = playerTeam(game), r = runBattle(team, floorMonsters(floor), Date.now() >>> 0);
    let reward: Reward | null = null;
    if (r.winner === 'A') { const w = claimWin(game, floor, team.map(f => f.charId)); reward = w.reward; setState(w.state); }
    setFought({ floor, reward }); setResult(r); setTick(0);
  };
  const go = (f: number) => { setState(goFloor(game, f)); setFought(null); setResult(null); setTick(0); };
  const done = frame?.end;
  const preview = floorReward(game.trial, floor);
  const rw = fought?.reward;
  const side = (s: 'A' | 'B') => frame?.units.filter(u => u.side === s).map(u =>
    <UnitCard key={u.uid} u={u} floats={frame.floats.filter(f => f.target === u.uid)} />);

  return (
    <div className="screen trial">
      <Art id="BG.LOBBY.NGUYET_DA" className="bg dim" />
      <header className="trial-head">
        <h1>Thí Luyện · Tầng {floor}/{FLOOR_COUNT}{floor % TRIAL.monster.bossEvery === 0 ? ' · Thủ Lĩnh' : ''}</h1>
        <div className="trial-sub">Đã qua tầng {game.trial.cleared} · Thưởng thắng: {preview.firstClear ? 'lần đầu' : preview.linhThach ? `lặp lại, còn ${preview.repeatsLeft + 1} lần có thưởng` : 'hết thưởng lặp lại'} <code>tạm alpha</code></div>
        {result && <code>hạt giống {result.events[0].type === 'start' ? result.events[0].seed : ''} · tick {tick}/{end}</code>}
      </header>
      <div className="arena">
        <div className="team team-a">{side('A')}</div>
        <div className="vs">{done ? <div className={`verdict w-${done.winner}`}>{RESULT[done.winner]}</div> : 'VS'}</div>
        <div className="team team-b">{side('B')}</div>
        {done && <div className="reward">{rw
          ? <>Thưởng: +{rw.linhThach} linh thạch · +{rw.exp} EXP mỗi người trong đội{rw.tickets ? ` · +${rw.tickets} thẻ triệu hồi` : ''}{rw.firstClear ? ' · Mở tầng kế' : ''}</>
          : done.winner === 'A' ? 'Thắng' : 'Không có thưởng khi thua. Tu Luyện hoặc đổi đội rồi thử lại.'}</div>}
        {!result && <p className="hint">Đội của bạn (chưa có Tiên Nô thì dùng đội mẫu). Bấm "Bắt đầu".</p>}
      </div>
      <nav className="trial-buttons">
        <button className="back" onClick={back}>Quay lại</button>
        <button className="back" onClick={start} disabled={!!result && !done}>Bắt đầu</button>
        <button className="back" onClick={() => setTick(0)} disabled={!done}>Phát lại</button>
        <button className="back" onClick={() => go(floor - 1)} disabled={(!!result && !done) || !canEnter(game.trial, floor - 1)}>Tầng trước</button>
        <button className="back" onClick={() => go(floor + 1)} disabled={(!!result && !done) || !canEnter(game.trial, floor + 1)}>Tầng kế</button>
      </nav>
    </div>
  );
}
