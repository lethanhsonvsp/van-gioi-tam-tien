import { resolveAction, type ScreenId, type UIActionId } from '../ui_ids';
import type { CurrencyId, PlayerView } from '../core/player';
import { Art } from '../ui/Art';
import { Icon } from '../ui/Icon';
import { BOTTOM, CARD_HAS_ICON, FEATURES, SIDE, TOP, cardFit, cardId, iconId } from './menu';

const CURRENCIES: CurrencyId[] = ['LINH_THACH', 'TIEN_NGOC', 'XU'];
// Player-facing names: the currency IDs read aloud (linh thạch is the name used in rewards and Tu Luyện).
const CURRENCY_VI: Record<CurrencyId, string> = { LINH_THACH: 'Linh Thạch', TIEN_NGOC: 'Tiên Ngọc', XU: 'Xu' };

export function Lobby({ player, go }: { player: PlayerView; go: (s: ScreenId) => void }) {
  const open = (a: UIActionId) => () => go(resolveAction(a));
  const fill = Math.max(0, Math.min(1, player.linhLuc.cur / player.linhLuc.max));
  return (
    <div className="lobby">
      <Art id="BG.LOBBY.NGUYET_DA" className="bg" />
      <div className="shade" />

      <header className="profile">
        <Icon id="UI.PANEL.PROFILE" className="profile-panel" stretch />
        <div className="avatar"><Icon id="UI.FRAME.AVATAR" className="fill" /></div>
        <div className="level"><Art id="UI.BADGE.LEVEL" className="fill" /><span>Lv.{player.level}</span></div>
        <div className="who">
          <div className="game">Vạn Giới Tầm Tiên</div>
          <div className="name">{player.name}</div>
          <div className="realm">{player.realm}</div>
          <div className="bar">
            <span className="bar-text">Linh Lực {player.linhLuc.cur}/{player.linhLuc.max}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${fill * 100}%` }}><Icon id="UI.BAR.FILL.LINH_LUC" className="fill" stretch /></div>
            </div>
          </div>
        </div>
      </header>

      <div className="currencies">
        {CURRENCIES.map(c => (
          <div className="pill" key={c} title={CURRENCY_VI[c]}>
            <Icon id="UI.PILL.CURRENCY" className="fill" stretch />
            <Icon id={`ICON.RES.${c}`} className="pill-icon" fill={0.9} />
            <span className="pill-text"><small>{CURRENCY_VI[c]}</small><b>{player.currency[c].toLocaleString('vi-VN')}</b></span>
            <button className="plus" aria-label={`Nạp ${CURRENCY_VI[c]}`} onClick={open('lobby.btn.shop')}><Icon id="UI.BTN.PLUS" className="fill" /></button>
          </div>
        ))}
      </div>

      <nav className="top-buttons">
        {TOP.map(([a, label]) => (
          <button key={a} className="round" title={label} aria-label={label} onClick={open(a)}>
            <Icon id="UI.BTN.ROUND" className="fill" /><Icon id={iconId(a)} className="round-icon" fill={0.7} />
          </button>
        ))}
      </nav>

      <nav className="side">
        {SIDE.map(([a, label]) => (
          <button key={a} className="side-item" onClick={open(a)}>
            <span className="round"><Icon id="UI.BTN.ROUND" className="fill" /><Icon id={iconId(a)} className="round-icon" fill={0.7} /></span>
            <span className="label">{label}</span>
          </button>
        ))}
      </nav>

      <nav className="features">
        {FEATURES.map(([a, label]) => (
          <button key={a} className="feature" onClick={open(a)}>
            <Art id={cardId(a)} className="fill card-art" style={cardFit(a)} />
            {!CARD_HAS_ICON.includes(a) && <Icon id={iconId(a)} className="feature-icon" fill={0.92} />}
            <span className="label">{label}</span>
          </button>
        ))}
      </nav>

      <nav className="bottom">
        <Icon id="UI.NAV.BOTTOM_BAR" className="fill bottom-bar" stretch />
        {BOTTOM.map(([a, label]) => (
          <button key={a} className="bottom-item" onClick={open(a)}>
            <Icon id={iconId(a)} className="bottom-icon" fill={0.96} />
            <span className="label">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
