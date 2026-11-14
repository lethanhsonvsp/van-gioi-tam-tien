import { TIEN_NO } from '../content';
import { dupCapBonus } from '../core/progress';
import { Icon } from '../ui/Icon';

// Element emblem on a dark element-tinted gradient: stands in for the portrait until the art exists. `icon` overrides the element icon.
export function Emblem({ element, icon, className = '', caption }: { element: string; icon?: string; className?: string; caption?: string }) {
  return (
    <div className={`portrait el-${element} ${className}`}>
      <Icon id={icon ?? `ICON.ELEM.${element}`} className="pic" fill={0.92} />
      {caption && <span className="caption">{caption}</span>}
    </div>
  );
}

// Title "Sect · Role": sect on one line, role on the next (the dot is dropped, the line break separates them).
const Info = ({ name, title }: { name: string; title: string }) => (
  <span className="tinfo"><span className="tname">{name}</span><span className="ttitle">{title.replace(' · ', '\n')}</span></span>
);

// Copies as shown everywhere: total owned (first copy counts as 1), extra copies raise the level cap.
export const copiesText = (copies: number) => `Số bản đã có: ${copies + 1}`;

// Tien No card: rarity frame, element badge (MỚI beside it), one badge row above the emblem, name (max 2 lines) and title in a band inside the frame window (`.win`, insets per rarity in roster.css).
export function Card({ id, copies, selected, onClick, fresh, tag }: { id: string; tag?: string; copies?: number; selected?: boolean; fresh?: boolean; onClick?: () => void }) {
  const t = TIEN_NO.find(x => x.id === id)!;
  return (
    <button className={`tcard r-${t.rarity}${selected ? ' sel' : ''}`} onClick={onClick}>
      <Emblem element={t.element} />
      <Icon id={`UI.FRAME.CARD.${t.rarity}`} className="fill frame" stretch />
      <span className="win" />
      <Icon id={`ICON.ELEM.${t.element}`} className="elem" />
      <span className="rar">{t.rarity}</span>
      {fresh && <span className="new">MỚI</span>}
      <span className="badges">
        {!!copies && <span className="copies">{copies + 1} bản · trần +{dupCapBonus(copies)}</span>}
        {tag && <span className="joined">{tag}</span>}
      </span>
      <Info name={t.name} title={t.title} />
    </button>
  );
}

// The protagonist's fixed party slot: gold frame, cultivation emblem.
export function HeroCard({ name, level }: { name: string; level: number }) {
  return (
    <div className="tcard hero">
      <Emblem element="NONE" icon="ICON.FN.CULTIVATION" />
      <span className="win" />
      <span className="rar">Chính</span>
      <Info name={name} title={`Nhân vật chính · Cấp ${level}`} />
    </div>
  );
}
