import { useState } from 'react';
import { Art } from '../ui/Art';
import { Home } from './Home';
import { RarityTab, SkillTab, TienNoTab } from './JournalTabs';
import './journal.css';

const TABS = [['Tiên Nô', TienNoTab], ['Chiêu thức', SkillTab], ['Độ hiếm', RarityTab]] as const;

// Sổ Tay: three tabs, each scrolls inside its own area; the page itself never scrolls.
export function Journal({ back }: { back: () => void }) {
  const [tab, setTab] = useState(0);
  const Body = TABS[tab][1];
  return (
    <div className="screen">
      <Art id="BG.LOBBY.NGUYET_DA" className="bg dim" />
      <div className="screen-panel journal">
        <div className="jhead">
          <h1>Sổ Tay</h1>
          <div className="jtabs" role="tablist">
            {TABS.map(([name], i) => <button key={name} role="tab" aria-selected={i === tab} className={i === tab ? 'back on' : 'back'} onClick={() => setTab(i)}>{name}</button>)}
          </div>
        </div>
        <div className="jbody" role="tabpanel"><Body /></div>
      </div>
      <Home back={back} />
    </div>
  );
}
