export type CurrencyId = 'LINH_THACH' | 'TIEN_NGOC' | 'XU';

export interface PlayerView {
  name: string;
  realm: string;
  level: number;
  linhLuc: { cur: number; max: number };
  currency: Record<CurrencyId, number>;
}

// shortcut: demo values for the UI frame only, replace when the player model and save system exist.
export const DEMO_PLAYER: PlayerView = {
  name: 'Đạo Hữu',
  realm: 'Luyện Khí 1',
  level: 1,
  linhLuc: { cur: 100, max: 100 },
  currency: { LINH_THACH: 0, TIEN_NGOC: 0, XU: 0 },
};
