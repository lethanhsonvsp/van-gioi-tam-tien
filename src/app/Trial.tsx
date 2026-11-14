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
import { TrialPreview } from './TrialPreview';
import { useGame } from './useGame';
import './trial.css';

const TICK_MS = 60;
const seedOf = (r: BattleResult) => (r.events[0].type === 'start' ? r.events[0].seed : 0);
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
  const [fast, setFast] = useState(false);
  const end = result ? lastTick(result.events) : 0;

  useEffect(() => {
    if (!result || tick >= end) return;
    const id = setTimeout(() => setTick(t => t + 1), fast ? TICK_MS / 4 : TICK_MS);
    return () => clearTimeout(id);
  }, [result, tick, end, fast]);

  const frame = useMemo(() => (result ? frameAt(result.events, tick) : null), [result, tick]);
  // The reward is claimed (and saved) as soon as the battle is simulated, so leaving mid-replay loses nothing; it is shown when the replay ends.
  const start = () => {
    const team = playerTeam(game), r = runBattle(team, floorMonsters(floor), Date.now() >>> 0);
    let reward: Reward | null = null;
    if (r.winner === 'A') { const w = claimWin(game, floor, team.map(f => f.charId)); reward = w.reward; setState(w.state); }
    setFought({ floor, reward }); setResult(r); setTick(0);
  };
  const go = (f: number) => { setState(goFloor(game, f)); setFought(null); setResult(null); setTick(0); };
  const [note, setNote] = useState('');
  const copySeed = async () => {
    try { await navigator.clipboard.writeText(String(seedOf(result!))); setNote('Đã sao chép'); } catch { setNote('Không sao chép được, hãy chép tay'); }
    setTimeout(() => setNote(''), 2000);
  };
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
        {result && <code>tick {tick}/{end}</code>}
      </header>
      {!result && <TrialPreview floor={floor} />}
      {result && <div className="arena">
        <div className="team team-a">{side('A')}</div>
        <div className="vs">{done ? <div className={`verdict w-${done.winner}`}>{RESULT[done.winner]}</div> : 'VS'}</div>
        <div className="team team-b">{side('B')}</div>
        {done && <div className="reward">{rw
          ? <>Thưởng: +{rw.linhThach} linh thạch · +{rw.exp} EXP mỗi người trong đội{rw.tickets ? ` · +${rw.tickets} thẻ triệu hồi` : ''}{rw.firstClear ? (floor < FLOOR_COUNT ? ' · Mở tầng kế' : ' · Hoàn thành cả 20 tầng Thí Luyện') : ''}</>
          : done.winner === 'A' ? 'Thắng' : 'Không có thưởng khi thua. Tu Luyện hoặc đổi đội rồi thử lại.'}</div>}
      </div>}
      {done && <div className="seedbar">Hạt giống trận: <code>{seedOf(result!)}</code> <button className="back small" onClick={copySeed}>Sao chép hạt giống</button> {note && <span>{note}</span>}</div>}
      <nav className="trial-buttons">
        <button className="back" onClick={back}>Quay lại</button>
        <button className="back" onClick={start} disabled={!!result && !done}>Bắt đầu</button>
        <button className="back" onClick={() => setTick(0)} disabled={!done}>Phát lại</button>
        <button className="back" onClick={() => setFast(!fast)} disabled={!result || !!done}>{fast ? 'Tốc độ thường' : 'Tua nhanh'}</button>
        <button className="back" onClick={() => setTick(end)} disabled={!result || !!done}>Bỏ qua</button>
        <button className="back" onClick={() => go(floor - 1)} disabled={(!!result && !done) || !canEnter(game.trial, floor - 1)}>Tầng trước</button>
        <button className="back" onClick={() => go(floor + 1)} disabled={(!!result && !done) || !canEnter(game.trial, floor + 1)}>Tầng kế</button>
      </nav>
    </div>
  );
}
