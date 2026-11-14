import { useEffect, useState } from 'react';
import type { ScreenId } from '../ui_ids';
import { viewOf } from '../core/player';
import { useGame } from './useGame';
import { Cultivation } from './Cultivate';
import { Lobby } from './Lobby';
import { Party } from './Party';
import { Roster } from './Roster';
import { Screen } from './Screen';
import { Trial } from './Trial';

const W = 1600, H = 900; // design resolution; the stage is scaled to fit the window

export function App() {
  const game = useGame();
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
        {screen === 'screen.trial'
          ? <Trial back={() => setScreen(null)} />
          : screen === 'screen.tien_no' || screen === 'screen.gacha'
          ? <Roster back={() => setScreen(null)} />
          : screen === 'screen.cultivation'
          ? <Cultivation back={() => setScreen(null)} />
          : screen === 'screen.team'
          ? <Party back={() => setScreen(null)} />
          : screen
          ? <Screen id={screen} back={() => setScreen(null)} />
          : <Lobby player={viewOf(game)} go={setScreen} />}
      </div>
    </div>
  );
}
