import type { CSSProperties } from 'react';
import { assetUrl } from './assets';

// Shows the asset for `id`; until that art exists, a CSS stand-in with the same box (class `missing`).
export function Art({ id, className = '', style }: { id: string; className?: string; style?: CSSProperties }) {
  const url = assetUrl(id);
  return url
    ? <img src={url} className={className} style={style} alt="" draggable={false} />
    : <div className={`${className} missing`} data-id={id} />;
}
