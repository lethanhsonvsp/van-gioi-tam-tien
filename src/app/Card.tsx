import { TIEN_NO } from '../content';
import { Icon } from '../ui/Icon';

// Tien No card: rarity frame, element icon, name, title. Portrait is a dark element-tinted backdrop with a faint element icon until the art exists.
export function Card({ id, copies, selected, onClick, fresh, joined }: { id: string; joined?: boolean; copies?: number; selected?: boolean; fresh?: boolean; onClick?: () => void }) {
  const t = TIEN_NO.find(x => x.id === id)!;
  return (
    <button className={`tcard${selected ? ' sel' : ''}`} onClick={onClick}>
      <div className={`portrait el-${t.element}`}><Icon id={`ICON.ELEM.${t.element}`} className="pic" fill={0.62} /></div>
      <Icon id={`UI.FRAME.CARD.${t.rarity}`} className="fill frame" stretch />
      <Icon id={`ICON.ELEM.${t.element}`} className="elem" />
      <span className="rar">{t.rarity}</span>
      <span className="badges">
        {fresh && <span className="new">MỚI</span>}
        {!!copies && <span className="copies">+{copies}</span>}
        {joined && <span className="joined">Đã vào đội</span>}
      </span>
      <span className="tinfo"><span className="tname">{t.name}</span><span className="ttitle">{t.title}</span></span>
    </button>
  );
}
