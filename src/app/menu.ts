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
