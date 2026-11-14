import { useState } from 'react';
import { GACHA, SKILLS, TIEN_NO } from '../content';
import { pull, toggleInParty, type PullResult } from '../core/gacha';
import { inParty } from '../core/roster';
import { setState } from '../core/store';
import { Art } from '../ui/Art';
import { Card } from './Card';
import { useGame } from './useGame';
import './roster.css';

function Profile({ id, close }: { id: string; close: () => void }) {
  const g = useGame();
  const t = TIEN_NO.find(x => x.id === id)!, own = g.tienNo.find(c => c.id === id)!;
  const kit = SKILLS.kits[id], inTeam = inParty(g.party, id);
  return (
    <div className="modal" onClick={close}>
      <div className="profile-card" onClick={e => e.stopPropagation()}>
        <div className={`portrait big el-${t.element}`}><span>Chân dung đang vẽ</span></div>
        <div className="info">
          <h2>{t.name}</h2>
          <div className="sub">{t.title}</div>
          <p>Hệ: {t.element} · Độ hiếm: {t.rarity} · Cấp {own.level} · Bản sao {own.copies}</p>
          {kit && <p><b>{kit.name}</b> ({kit.tag}): {kit.kind === 'damage' ? 'sát thương' : kit.kind === 'support' ? 'hỗ trợ' : 'khống chế'}, mỗi {kit.every} lượt.</p>}
          <button className="back" onClick={() => setState(toggleInParty(g, id))} disabled={!inTeam && !g.party.includes(null)}>
            {inTeam ? 'Rời đội' : g.party.includes(null) ? 'Vào đội' : 'Đội đã đầy'}
          </button>
          <button className="back" onClick={close}>Đóng</button>
        </div>
      </div>
    </div>
  );
}

export function Roster({ back }: { back: () => void }) {
  const g = useGame();
  const [results, setResults] = useState<PullResult[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [msg, setMsg] = useState('');
  const roll = (n: 1 | 10) => () => {
    const r = pull(g, n);
    if (!r) { setMsg(`Không đủ thẻ triệu hồi (cần ${GACHA.cost * n}).`); return; }
    setMsg(''); setResults(r.results); setState(r.state);
  };
  const toUR = GACHA.pity.urEvery - g.pity.sinceUR, toSR = GACHA.pity.srEvery - g.pity.sinceSR;
  return (
    <div className="screen roster">
      <Art id="BG.LOBBY.NGUYET_DA" className="bg dim" />
      <section className="summon">
        <h1>Tiên Nô · Triệu hồi</h1>
        <div className="tickets">Thẻ triệu hồi: <b>{g.tickets}</b> · Bảo đảm Tiên Nô SR+ sau {toSR} lần, UR sau {toUR} lần <code>tạm alpha</code></div>
        <div className="buttons">
          <button className="back" onClick={roll(1)}>Quay 1</button>
          <button className="back" onClick={roll(10)}>Quay 10</button>
          <button className="back" onClick={back}>Quay lại</button>
        </div>
        {msg && <div className="msg">{msg}</div>}
        <div className="results">{results.map((r, i) => <Card key={i} id={r.id} fresh={r.isNew} onClick={() => g.tienNo.some(c => c.id === r.id) && setOpen(r.id)} />)}</div>
      </section>
      <section className="owned">
        <h2>Tiên Nô đã có ({g.tienNo.length}/{TIEN_NO.length}) · Tổ đội {g.party.filter(Boolean).length}/{g.party.length}</h2>
        <div className="grid">
          {g.tienNo.length === 0 && <p>Chưa có Tiên Nô nào. Hãy triệu hồi.</p>}
          {g.tienNo.map(c => <Card key={c.id} id={c.id} copies={c.copies} selected={inParty(g.party, c.id)} onClick={() => setOpen(c.id)} />)}
        </div>
      </section>
      {open && <Profile id={open} close={() => setOpen(null)} />}
    </div>
  );
}
