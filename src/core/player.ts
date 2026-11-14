import type { GameState } from './save';

export type CurrencyId = 'LINH_THACH' | 'TIEN_NGOC' | 'XU';

export interface PlayerView {
  name: string;
  realm: string;
  level: number;
  linhLuc: { cur: number; max: number };
  currency: Record<CurrencyId, number>;
}

// shortcut: realm label is just a function of level until the realm table is designed.
export const viewOf = (s: GameState): PlayerView => ({
  name: s.player.name,
  realm: `Luyện Khí ${s.player.level}`,
  level: s.player.level,
  linhLuc: s.linhLuc,
  currency: s.currency,
});
