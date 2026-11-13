import { useEffect, useState } from 'react';
import type { ScreenId } from '../ui_ids';
import { DEMO_PLAYER } from '../core/player';
import { Lobby } from './Lobby';
import { Screen } from './Screen';

const W = 1600, H = 900; // design resolution; the stage is scaled to fit the window

export function App() {
  const [screen, setScreen] = useState<ScreenId | null>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return (
    <div className="viewport">
      <div className="stage" style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}>
        {screen
          ? <Screen id={screen} back={() => setScreen(null)} />
          : <Lobby player={DEMO_PLAYER} go={setScreen} />}
      </div>
    </div>
  );
}
