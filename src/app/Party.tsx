import { clearSlot } from '../core/roster';
import { toggleInParty } from '../core/gacha';
import { setState } from '../core/store';
import { Art } from '../ui/Art';
import { Card, HeroCard } from './Card';
import { Home } from './Home';
import { useGame } from './useGame';
import './roster.css';

// Party screen: slot 1 is the protagonist (fixed); tap a filled slot to remove, tap a Tien No below to add or remove.
export function Party({ back }: { back: () => void }) {
  const g = useGame();
  return (
    <div className="screen roster">
      <Art id="BG.LOBBY.NGUYET_DA" className="bg dim" />
      <section className="summon party-row">
        <h1>Tổ Đội ({g.party.filter(Boolean).length}/{g.party.length})</h1>
        <div className="results">
          {g.party.map((id, i) => i === 0
            ? <HeroCard key={i} name={g.player.name} level={g.player.level} />
            : id
            ? <Card key={i} id={id} onClick={() => setState({ ...g, party: clearSlot(g.party, i) })} />
            : <div key={i} className="slot">Ô trống</div>)}
        </div>
      </section>
      <section className="owned pool">
        <h2>Tiên Nô có thể xếp vào đội · chạm để thêm hoặc bỏ{g.tienNo.length > 6 && <span className="hint">(cuộn để xem thêm)</span>}</h2>
        <div className="grid">
          {g.tienNo.length === 0 && <p>Chưa có Tiên Nô. Vào màn Tiên Nô để triệu hồi.</p>}
          {g.tienNo.map(c => { const on = g.party.includes(c.id); return <Card key={c.id} id={c.id} selected={on} tag={on ? 'Trong đội' : undefined} onClick={() => setState(toggleInParty(g, c.id))} />; })}
        </div>
      </section>
      <Home back={back} />
    </div>
  );
}
