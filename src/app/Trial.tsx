import { useEffect, useMemo, useState } from 'react';
import { runBattle } from '../battle/engine';
import { FLOOR_COUNT, floorMonsters } from '../battle/monsters';
import { frameAt, lastTick, type UnitView } from '../battle/replay';
import { sampleTeam } from '../battle/team';
import type { BattleResult } from '../battle/types';
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
  const { player } = useGame();
  const [floor, setFloor] = useState(1);
  const [result, setResult] = useState<BattleResult | null>(null);
  const [tick, setTick] = useState(0);
  const end = result ? lastTick(result.events) : 0;

  useEffect(() => {
    if (!result || tick >= end) return;
    const id = setTimeout(() => setTick(t => t + 1), TICK_MS);
    return () => clearTimeout(id);
  }, [result, tick, end]);

  const frame = useMemo(() => (result ? frameAt(result.events, tick) : null), [result, tick]);
  const start = () => { setResult(runBattle(sampleTeam(player), floorMonsters(floor), Date.now() >>> 0)); setTick(0); };
  const next = () => { setFloor(f => f + 1); setResult(null); setTick(0); };
  const done = frame?.end;
  const side = (s: 'A' | 'B') => frame?.units.filter(u => u.side === s).map(u =>
    <UnitCard key={u.uid} u={u} floats={frame.floats.filter(f => f.target === u.uid)} />);

  return (
    <div className="screen trial">
      <Art id="BG.LOBBY.NGUYET_DA" className="bg dim" />
      <header className="trial-head">
        <h1>Thí Luyện · Tầng {floor}/{FLOOR_COUNT}</h1>
        {result && <code>hạt giống {result.events[0].type === 'start' ? result.events[0].seed : ''} · tick {tick}/{end}</code>}
      </header>
      <div className="arena">
        <div className="team team-a">{side('A')}</div>
        <div className="vs">{done ? <div className={`verdict w-${done.winner}`}>{RESULT[done.winner]}</div> : 'VS'}</div>
        <div className="team team-b">{side('B')}</div>
        {!result && <p className="hint">Đội thử: nhân vật chính + 3 Tiên Nô. Bấm "Bắt đầu".</p>}
      </div>
      <nav className="trial-buttons">
        <button className="back" onClick={back}>Quay lại</button>
        <button className="back" onClick={start} disabled={!!result && !done}>Bắt đầu</button>
        <button className="back" onClick={() => setTick(0)} disabled={!done}>Phát lại</button>
        <button className="back" onClick={next} disabled={done?.winner !== 'A' || floor >= FLOOR_COUNT}>Tầng kế</button>
      </nav>
    </div>
  );
}
