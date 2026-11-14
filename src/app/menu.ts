import type { UIActionId } from '../ui_ids';

type Entry = [UIActionId, string];
const key = (a: UIActionId) => a.slice(a.lastIndexOf('.') + 1).toUpperCase();
export const iconId = (a: UIActionId) => `ICON.FN.${key(a)}`;
export const cardId = (a: UIActionId) => `UI.FEATURE_CARD.${key(a)}`;

// Lobby layout follows docs/reference/lobby_target.png.
export const FEATURES: Entry[] = [
  ['lobby.btn.cultivation', 'Tu Luyện'], ['lobby.btn.breakthrough', 'Đột Phá'],
  ['lobby.btn.tien_no', 'Tiên Nô'], ['lobby.btn.equipment', 'Trang Bị'],
  ['lobby.btn.gacha', 'Gacha'], ['lobby.btn.trial', 'Thí Luyện'],
  ['lobby.btn.secret_realm', 'Bí Cảnh'], ['lobby.btn.team', 'Tổ Đội'],
];
// Feature card art that already shows its own object; the others get the function icon on top (same look across both rows).
// Frame body (corner ornaments excluded) [x0, y0, x1, y1] in each 768x512 card PNG, measured from the alpha channel.
// SHEET.FEATURE_CARDS_2 (rows 3-4) draws it at other places and sizes than SHEET.FEATURE_CARDS, so each card maps its own body onto the button.
const BODY_1 = [103, 131, 663, 381];
export const CARD_BODY: Record<string, number[]> = {
  CULTIVATION: BODY_1, BREAKTHROUGH: BODY_1, TIEN_NO: BODY_1, EQUIPMENT: BODY_1,
  GACHA: [110, 151, 665, 414], TRIAL: [104, 151, 659, 414], SECRET_REALM: [110, 102, 665, 366], TEAM: [104, 102, 659, 366],
};
// Image box (in % of the button) that puts the card's frame body exactly on the button; the ornaments overhang into the gaps.
export const cardFit = (a: UIActionId) => {
  const [x0, y0, x1, y1] = CARD_BODY[key(a)], w = x1 - x0, h = y1 - y0, pc = (v: number) => `${v * 100}%`;
  return { left: pc(-x0 / w), top: pc(-y0 / h), width: pc(768 / w), height: pc(512 / h) };
};
export const CARD_HAS_ICON: UIActionId[] = ['lobby.btn.cultivation', 'lobby.btn.breakthrough', 'lobby.btn.tien_no', 'lobby.btn.equipment'];
export const SIDE: Entry[] = [
  ['lobby.btn.quests', 'Nhiệm Vụ'], ['lobby.btn.events', 'Sự Kiện'],
  ['lobby.btn.benefits', 'Phúc Lợi'], ['lobby.btn.daily_login', 'Đăng Nhập'],
];
export const BOTTOM: Entry[] = [
  ['lobby.btn.inventory', 'Túi Đồ'], ['lobby.btn.shop', 'Cửa Hàng'], ['lobby.btn.guild', 'Bang Hội'],
  ['lobby.btn.ranking', 'Bảng Xếp Hạng'], ['lobby.btn.mail', 'Thư Tín'], ['lobby.btn.journal', 'Sổ Tay'],
];
export const TOP: Entry[] = [
  ['lobby.btn.mail', 'Thư'], ['lobby.btn.notifications', 'Thông Báo'], ['lobby.btn.settings', 'Cài Đặt'],
];

export const TITLES: Record<string, string> = Object.fromEntries(
  [...TOP, ...FEATURES, ...SIDE, ...BOTTOM].map(([a, t]) => [a.replace('lobby.btn.', 'screen.'), t]),
);
