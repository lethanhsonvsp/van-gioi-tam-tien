import { assetUrl } from './assets';

// Shows the asset for `id`; until that art exists, a CSS stand-in with the same box (class `missing`).
export function Art({ id, className = '' }: { id: string; className?: string }) {
  const url = assetUrl(id);
  return url
    ? <img src={url} className={className} alt="" draggable={false} />
    : <div className={`${className} missing`} data-id={id} />;
}
