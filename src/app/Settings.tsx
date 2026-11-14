import { useState } from 'react';
import { newGame, serialize } from '../core/save';
import { setState } from '../core/store';
import { Art } from '../ui/Art';
import { useGame } from './useGame';
import './roster.css';

export function Settings({ back, guide }: { back: () => void; guide: () => void }) {
  const g = useGame();
  const [dump, setDump] = useState<string | null>(null);
  const [armed, setArmed] = useState(false);
  return (
    <div className="screen">
      <Art id="BG.LOBBY.NGUYET_DA" className="bg dim" />
      <div className="screen-panel">
        <h1>Cài Đặt</h1>
        <p>Phiên bản save: <b>v{g.version}</b></p>
        <div className="buttons">
          <button className="back" onClick={guide}>Hướng dẫn</button>
          <button className="back" onClick={() => setDump(dump === null ? serialize(g) : null)}>{dump === null ? 'Xuất save' : 'Ẩn save'}</button>
          <button className="back" onClick={() => { if (armed) { setState(newGame()); setArmed(false); } else setArmed(true); }}>
            {armed ? 'Bấm lần nữa để xóa' : 'Xóa save và chơi lại'}
          </button>
        </div>
        {dump !== null && <textarea className="dump" readOnly value={dump} onFocus={e => e.currentTarget.select()} />}
        <button className="back" onClick={back}>Quay lại</button>
      </div>
    </div>
  );
}
