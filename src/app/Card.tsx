import { TIEN_NO } from '../content';
import { Art } from '../ui/Art';

// Tien No card: rarity frame, element icon, name, title. Portrait is a colour block per element until the art exists.
export function Card({ id, copies, selected, onClick, fresh }: { id: string; copies?: number; selected?: boolean; fresh?: boolean; onClick?: () => void }) {
  const t = TIEN_NO.find(x => x.id === id)!;
  return (
    <button className={`tcard${selected ? ' sel' : ''}`} onClick={onClick} title={t.name}>
      <div className={`portrait el-${t.element}`}><span>Chân dung đang vẽ</span></div>
      <Art id={`UI.FRAME.CARD.${t.rarity}`} className="fill frame" />
      <Art id={`ICON.ELEM.${t.element}`} className="elem" />
      <span className="rar">{t.rarity}</span>
      {fresh && <span className="new">MỚI</span>}
      {!!copies && <span className="copies">+{copies}</span>}
      <span className="tname">{t.name}</span>
      <span className="ttitle">{t.title}</span>
    </button>
  );
}
