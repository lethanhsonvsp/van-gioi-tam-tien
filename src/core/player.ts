import { realmLabel } from './progress';
import type { GameState } from './save';

export type CurrencyId = 'LINH_THACH' | 'TIEN_NGOC' | 'XU';

export interface PlayerView {
  name: string;
  realm: string;
  level: number;
  linhLuc: { cur: number; max: number };
  currency: Record<CurrencyId, number>;
}

// Realm is a label by 10-level band (names in balance.json, alpha-temporary); no breakthrough yet.
export const viewOf = (s: GameState): PlayerView => ({
  name: s.player.name,
  realm: realmLabel(s.player.level),
  level: s.player.level,
  linhLuc: s.linhLuc,
  currency: s.currency,
});
