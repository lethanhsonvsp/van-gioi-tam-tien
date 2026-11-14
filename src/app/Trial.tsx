import { useEffect, useMemo, useState } from 'react';
import { TIEN_NO, TRIAL } from '../content';
import { runBattle } from '../battle/engine';
import { FLOOR_COUNT, floorMonsters } from '../battle/monsters';
import { frameAt, lastTick, type UnitView } from '../battle/replay';
import { playerTeam } from '../battle/team';
import type { BattleResult } from '../battle/types';
import { canEnter, claimWin, floorReward, goFloor, type Reward } from '../core/rewards';
import { setState } from '../core/store';
import { Art } from '../ui/Art';
import { Icon } from '../ui/Icon';
import { Home } from './Home';
import { TrialPreview } from './TrialPreview';
import { useGame } from './useGame';
import './trial.css';

const TICK_MS = 60;
const seedOf = (r: BattleResult) => (r.events[0].type === 'start' ? r.events[0].seed : 0);
const RESULT = { A: 'Thắng', B: 'Thua', draw: 'Hòa (hết giờ)' } as const;

function UnitCard({ u, floats }: { u: UnitView; floats: { key: number; text: string; kind: string }[] }) {
  return (
    <div className={`unit el-${u.element}${u.dead ? ' dead' : ''}${u.acting && !u.dead ? ' acting' : ''}`}>
      <Medal u={u} />
      <div className="unit-name" title={u.name}>{u.name}</div>
      <div className="hp"><div className="hp-fill" style={{ width: `${(u.hp / u.hpMax) * 100}%` }} /><span>{u.hp}/{u.hpMax}</span></div>
      <div className="shield">{u.shield > 0 && <div className="shield-fill" style={{ width: `${Math.min(1, u.shield / u.hpMax) * 100}%` }} />}</div>
      {floats.map(f => <div key={f.key} className={`float ${f.kind}`}>{f.text}</div>)}
    </div>
  );
}

// Medallion: gold-indigo rim, element icon (cultivation icon for the protagonist), outer ring by rarity, red ring for bosses, status rings.
function Medal({ u }: { u: UnitView }) {
  const ring = u.charId.endsWith('.BOSS') ? 'boss' : `r-${TIEN_NO.find(t => t.id === u.charId)?.rarity ?? 'N'}`;
  const icon = u.charId.startsWith('CHAR.PLAYER') ? 'ICON.FN.CULTIVATION' : `ICON.ELEM.${u.element}`;
  return (
    <div className={`medal ${ring}`}>
      <div className={`medal-core el-${u.element}`}><Icon id={icon} className="medal-icon" fill={0.86} /></div>
      {u.status.map(s => <span key={s} className={`st st-${s}`} />)}
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
  const [paused, setPaused] = useState(false);
  const end = result ? lastTick(result.events) : 0;

  useEffect(() => {
    if (!result || paused || tick >= end) return;
    const id = setTimeout(() => setTick(t => t + 1), fast ? TICK_MS / 4 : TICK_MS);
    return () => clearTimeout(id);
  }, [result, tick, end, fast, paused]);

  const frame = useMemo(() => (result ? frameAt(result.events, tick) : null), [result, tick]);
  // The reward is claimed (and saved) as soon as the battle is simulated, so leaving mid-replay loses nothing; it is shown when the replay ends.
  const start = () => {
    const team = playerTeam(game), r = runBattle(team, floorMonsters(floor), Date.now() >>> 0);
    let reward: Reward | null = null;
    if (r.winner === 'A') { const w = claimWin(game, floor, team.map(f => f.charId)); reward = w.reward; setState(w.state); }
    setFought({ floor, reward }); setResult(r); setTick(0); setPaused(false);
  };
  const go = (f: number) => { setState(goFloor(game, f)); setFought(null); setResult(null); setTick(0); };
  const [note, setNote] = useState('');
  const [tech, setTech] = useState(false);
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
        <div className="trial-sub">Đã qua tầng {game.trial.cleared} · Thưởng thắng: {preview.firstClear ? 'lần đầu' : preview.linhThach ? `lặp lại, còn ${preview.repeatsLeft + 1} lần có thưởng` : 'hết thưởng lặp lại'}</div>
      </header>
      {!result && <TrialPreview floor={floor} />}
      {result && <div className="arena">
        <div className="team team-a">{side('A')}</div>
        <div className="vs">{done ? <div className={`verdict w-${done.winner}`}>{RESULT[done.winner]}</div> : 'VS'}</div>
        <div className="team team-b">{side('B')}</div>
      </div>}
      <div className="result-bar">
        {result && !done && <>
          <button className="back ctl" onClick={() => setPaused(!paused)}>{paused ? 'Tiếp tục' : 'Tạm dừng'}</button>
          <input type="range" className="scrub" aria-label="Tua trận" min={0} max={end} value={tick} onChange={e => { setPaused(true); setTick(Number(e.currentTarget.value)); }} />
        </>}
        {!result && <span className="reward">{preview.firstClear ? 'Thắng lần đầu' : preview.linhThach ? `Thưởng lặp (còn ${preview.repeatsLeft + 1} lần)` : 'Hết thưởng lặp'}: +{preview.linhThach} linh thạch · +{preview.exp} EXP{preview.tickets ? ` · +${preview.tickets} thẻ triệu hồi` : ''}</span>}
        {done && <span className="reward">{rw
          ? <>Thưởng: +{rw.linhThach} linh thạch · +{rw.exp} EXP mỗi người{rw.tickets ? ` · +${rw.tickets} thẻ triệu hồi` : ''}{rw.firstClear ? (floor < FLOOR_COUNT ? ' · Mở tầng kế' : ' · Hoàn thành cả 20 tầng') : ''}</>
          : done.winner === 'A' ? 'Thắng' : 'Thua, không có thưởng. Tu Luyện hoặc đổi đội rồi thử lại.'}</span>}
        {done && <button className="back info" aria-label="Chi tiết kỹ thuật" title="Chi tiết kỹ thuật" onClick={() => setTech(!tech)}>i</button>}
        {done && tech && <span className="tech">Hạt giống trận: <code>{seedOf(result!)}</code> <button className="back small" onClick={copySeed}>Sao chép hạt giống</button> {note}</span>}
      </div>
      <nav className="trial-buttons">
        <button className="back" onClick={start} disabled={!!result && !done}>Bắt đầu</button>
        <button className="back" onClick={() => { setTick(0); setPaused(false); }} disabled={!done}>Phát lại</button>
        <button className="back" onClick={() => setFast(!fast)} disabled={!result || !!done}>{fast ? 'Tốc độ thường' : 'Tua nhanh'}</button>
        <button className="back" onClick={() => setTick(end)} disabled={!result || !!done}>Bỏ qua</button>
        <button className="back" onClick={() => go(floor - 1)} disabled={(!!result && !done) || !canEnter(game.trial, floor - 1)}>Tầng trước</button>
        <button className="back" onClick={() => go(floor + 1)} disabled={(!!result && !done) || !canEnter(game.trial, floor + 1)}>Tầng kế</button>
      </nav>
      <Home back={back} />
    </div>
  );
}
