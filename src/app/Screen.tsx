import type { ScreenId } from '../ui_ids';
import { Art } from '../ui/Art';
import { Home } from './Home';
import { TITLES } from './menu';

// Stand-in for screens that are not built yet; every lobby button lands here with its real ScreenId.
export function Screen({ id, back }: { id: ScreenId; back: () => void }) {
  return (
    <div className="screen">
      <Art id="BG.LOBBY.NGUYET_DA" className="bg dim" />
      <div className="screen-panel">
        <h1>{TITLES[id] ?? 'Sắp mở'}</h1>
        <p>Sắp mở.</p>
      </div>
      <Home back={back} />
    </div>
  );
}
