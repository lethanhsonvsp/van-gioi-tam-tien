import { TIEN_NO } from '../content';
import { clearSlot } from '../core/roster';
import { toggleInParty } from '../core/gacha';
import { setState } from '../core/store';
import { Art } from '../ui/Art';
import { Card } from './Card';
import { useGame } from './useGame';
import './roster.css';

// Party screen: slot 1 is the protagonist (fixed); tap a filled slot to remove, tap a Tien No below to add.
export function Party({ back }: { back: () => void }) {
  const g = useGame();
  return (
    <div className="screen roster">
      <Art id="BG.LOBBY.NGUYET_DA" className="bg dim" />
      <section className="summon">
        <h1>Tổ Đội ({g.party.filter(Boolean).length}/{g.party.length})</h1>
        <div className="results">
          {g.party.map((id, i) => i === 0
            ? <div key={i} className="slot main"><span>{g.player.name}</span><small>Nhân vật chính</small></div>
            : id
            ? <Card key={i} id={id} onClick={() => setState({ ...g, party: clearSlot(g.party, i) })} />
            : <div key={i} className="slot">Ô trống</div>)}
        </div>
        <div className="buttons"><button className="back" onClick={back}>Quay lại</button></div>
      </section>
      <section className="owned">
        <h2>Tiên Nô có thể xếp vào đội</h2>
        <div className="grid">
          {g.tienNo.length === 0 && <p>Chưa có Tiên Nô. Vào màn Tiên Nô để triệu hồi.</p>}
          {g.tienNo.map(c => <Card key={c.id} id={c.id} selected={g.party.includes(c.id)} onClick={() => setState(toggleInParty(g, c.id))} />)}
        </div>
      </section>
    </div>
  );
}
