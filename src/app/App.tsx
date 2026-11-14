import { useEffect, useState } from 'react';
import type { ScreenId } from '../ui_ids';
import { viewOf } from '../core/player';
import { useGame } from './useGame';
import { Cultivation } from './Cultivate';
import { Lobby } from './Lobby';
import { Guide, guideSeen } from './Guide';
import { Journal } from './Journal';
import { Party } from './Party';
import { Roster } from './Roster';
import { Screen } from './Screen';
import { Settings } from './Settings';
import { Trial } from './Trial';

const W = 1600, H = 900; // design resolution; the stage is scaled to fit the window
// Phone landscape: no scaled stage, the screens re-flow at 1:1 so text stays >= 13 px (styles in compact*.css, scoped to .compact).
const COMPACT = '(max-height: 480px) and (orientation: landscape)';

export function App() {
  const game = useGame();
  const [screen, setScreen] = useState<ScreenId | null>(null);
  const [scale, setScale] = useState(1);
  const [compact, setCompact] = useState(() => matchMedia(COMPACT).matches);
  const [guide, setGuide] = useState(() => !guideSeen());
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    const mq = matchMedia(COMPACT), onMq = () => setCompact(mq.matches);
    fit();
    window.addEventListener('resize', fit);
    mq.addEventListener('change', onMq);
    return () => { window.removeEventListener('resize', fit); mq.removeEventListener('change', onMq); };
  }, []);
  return (
    <div className="viewport">
      <div className={compact ? 'stage compact' : 'stage'} style={compact ? undefined : { width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}>
        {screen === 'screen.trial'
          ? <Trial back={() => setScreen(null)} />
          : screen === 'screen.tien_no' || screen === 'screen.gacha'
          ? <Roster back={() => setScreen(null)} />
          : screen === 'screen.cultivation'
          ? <Cultivation back={() => setScreen(null)} />
          : screen === 'screen.team'
          ? <Party back={() => setScreen(null)} />
          : screen === 'screen.settings'
          ? <Settings back={() => setScreen(null)} guide={() => setGuide(true)} />
          : screen === 'screen.journal'
          ? <Journal back={() => setScreen(null)} />
          : screen
          ? <Screen id={screen} back={() => setScreen(null)} />
          : <Lobby player={viewOf(game)} go={setScreen} />}
        {guide && <Guide close={() => setGuide(false)} />}
      </div>
    </div>
  );
}
