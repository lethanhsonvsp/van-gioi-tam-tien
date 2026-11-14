import { Art } from './Art';
import { assetUrl } from './assets';
import { ICON_BOX } from './iconBox';

const pc = (v: number) => `${v * 100}%`;

// Box (size set by className) showing only the drawn part of the PNG, not its transparent padding.
// Default: the drawn part is centred and its longer side fills `fill` of the box. `stretch`: it fills the whole box (for bars and panels).
export function Icon({ id, className = '', fill = 1, stretch = false }: { id: string; className?: string; fill?: number; stretch?: boolean }) {
  const url = assetUrl(id), b = ICON_BOX[id];
  if (!url || !b) return <Art id={id} className={`${className} ico`} />;
  const [w, h, x0, y0, x1, y1] = b, bw = x1 - x0, bh = y1 - y0;
  const sx = stretch ? 1 / bw : fill / Math.max(bw, bh), sy = stretch ? 1 / bh : sx;
  const ox = stretch ? 0 : 0.5 - ((x0 + x1) / 2) * sx, oy = stretch ? 0 : 0.5 - ((y0 + y1) / 2) * sy;
  const style = { width: pc(w * sx), height: pc(h * sy), left: pc(ox - (stretch ? x0 * sx : 0)), top: pc(oy - (stretch ? y0 * sy : 0)) };
  return <div className={`${className} ico`}><img src={url} alt="" draggable={false} style={style} /></div>;
}
