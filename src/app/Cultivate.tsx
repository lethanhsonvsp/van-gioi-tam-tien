import { capOf, cultivate, cultivateBlock, cultivateCost, expToNext, realmLabel } from '../core/progress';
import { setState } from '../core/store';
import { Art } from '../ui/Art';
import { useGame } from './useGame';
import './roster.css';

// Level panel + "Tu Luyện" button (spend linh thach for one level). Used by the protagonist screen and Tien No profiles.
export function CultivatePanel({ id }: { id: string }) {
  const g = useGame();
  const c = id === g.player.id ? g.player : g.tienNo.find(t => t.id === id);
  if (!c) return null;
  const block = cultivateBlock(g, id);
  return (
    <div className="cultivate">
      <p>{realmLabel(c.level)} · Cấp {c.level}/{capOf(g, id)} · EXP {c.exp}/{expToNext(c.level)} · Linh thạch {g.currency.LINH_THACH}</p>
      <button className="back" disabled={!!block} onClick={() => { const s = cultivate(g, id); if (s) setState(s); }}>
        Tu Luyện (−{cultivateCost(c.level)} linh thạch)
      </button>
      {block && <small className="block"> {block}</small>}
    </div>
  );
}

// Protagonist screen from the lobby "Tu Luyện" button.
export function Cultivation({ back }: { back: () => void }) {
  const g = useGame();
  return (
    <div className="screen">
      <Art id="BG.LOBBY.NGUYET_DA" className="bg dim" />
      <div className="screen-panel">
        <h1>Tu Luyện · {g.player.name}</h1>
        <p>Nhân vật chính. Cấp càng cao thì trần cấp Tiên Nô càng cao. <code>tạm alpha</code></p>
        <CultivatePanel id={g.player.id} />
        <button className="back" onClick={back}>Quay lại</button>
      </div>
    </div>
  );
}
