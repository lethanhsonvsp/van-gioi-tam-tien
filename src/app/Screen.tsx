import type { ScreenId } from '../ui_ids';
import { Art } from '../ui/Art';
import { TITLES } from './menu';

// Stand-in for screens that are not built yet; every lobby button lands here with its real ScreenId.
export function Screen({ id, back }: { id: ScreenId; back: () => void }) {
  return (
    <div className="screen">
      <Art id="BG.LOBBY.NGUYET_DA" className="bg dim" />
      <div className="screen-panel">
        <h1>{TITLES[id] ?? id}</h1>
        <p>Màn hình này chưa làm.</p>
        <code>{id}</code>
        <button className="back" onClick={back}>Quay lại</button>
      </div>
    </div>
  );
}
