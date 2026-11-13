import { resolveAction, type ScreenId, type UIActionId } from '../ui_ids';
import type { CurrencyId, PlayerView } from '../core/player';
import { Art } from '../ui/Art';
import { assetUrl } from '../ui/assets';
import { BOTTOM, FEATURES, SIDE, TOP, cardId, iconId } from './menu';

const CURRENCIES: CurrencyId[] = ['LINH_THACH', 'TIEN_NGOC', 'XU'];

export function Lobby({ player, go }: { player: PlayerView; go: (s: ScreenId) => void }) {
  const open = (a: UIActionId) => () => go(resolveAction(a));
  const fill = Math.max(0, Math.min(1, player.linhLuc.cur / player.linhLuc.max));
  return (
    <div className="lobby">
      <Art id="BG.LOBBY.NGUYET_DA" className="bg" />
      <div className="shade" />

      <header className="profile">
        <Art id="UI.PANEL.PROFILE" className="profile-panel" />
        <div className="avatar"><Art id="UI.FRAME.AVATAR" className="fill" /></div>
        <div className="level"><Art id="UI.BADGE.LEVEL" className="fill" /><span>Lv.{player.level}</span></div>
        <div className="who">
          <div className="game">Vạn Giới Tầm Tiên</div>
          <div className="name">{player.name}</div>
          <div className="realm">{player.realm}</div>
          <div className="bar">
            <Art id="UI.BAR.FRAME" className="fill bar-frame" />
            <div className="bar-fill" style={{ width: `${fill * 100}%` }}><Art id="UI.BAR.FILL.LINH_LUC" className="fill" /></div>
            <span>Linh Lực {player.linhLuc.cur}/{player.linhLuc.max}</span>
          </div>
        </div>
      </header>

      <div className="currencies">
        {CURRENCIES.map(c => (
          <div className="pill" key={c}>
            <Art id="UI.PILL.CURRENCY" className="fill" />
            <Art id={`ICON.RES.${c}`} className="pill-icon" />
            <span>{player.currency[c].toLocaleString('vi-VN')}</span>
            <button className="plus" aria-label="Nạp" onClick={open('lobby.btn.shop')}><Art id="UI.BTN.PLUS" className="fill" /></button>
          </div>
        ))}
      </div>

      <nav className="top-buttons">
        {TOP.map(([a, label]) => (
          <button key={a} className="round" title={label} aria-label={label} onClick={open(a)}>
            <Art id="UI.BTN.ROUND" className="fill" /><Art id={iconId(a)} className="round-icon" />
          </button>
        ))}
      </nav>

      <nav className="side">
        {SIDE.map(([a, label]) => (
          <button key={a} className="side-item" onClick={open(a)}>
            <span className="round"><Art id="UI.BTN.ROUND" className="fill" /><Art id={iconId(a)} className="round-icon" /></span>
            <span className="label">{label}</span>
          </button>
        ))}
      </nav>

      <nav className="features">
        {FEATURES.map(([a, label]) => (
          <button key={a} className="feature" onClick={open(a)}>
            <Art id={cardId(a)} className="fill card-art" />
            {!assetUrl(cardId(a)) && <Art id={iconId(a)} className="feature-icon" />}
            <span className="label">{label}</span>
          </button>
        ))}
      </nav>

      <nav className="bottom">
        <Art id="UI.NAV.BOTTOM_BAR" className="fill bottom-bar" />
        {BOTTOM.map(([a, label]) => (
          <button key={a} className="bottom-item" onClick={open(a)}>
            <Art id={iconId(a)} className="bottom-icon" />
            <span className="label">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
