// Stable UI identifiers. Concept preview images are not production assets.
export const UI_ACTIONS = {
  "lobby.btn.cultivation": "screen.cultivation",
  "lobby.btn.breakthrough": "screen.breakthrough",
  "lobby.btn.tien_no": "screen.tien_no",
  "lobby.btn.equipment": "screen.equipment",
  "lobby.btn.gacha": "screen.gacha",
  "lobby.btn.trial": "screen.trial",
  "lobby.btn.secret_realm": "screen.secret_realm",
  "lobby.btn.team": "screen.team",
  "lobby.btn.inventory": "screen.inventory",
  "lobby.btn.shop": "screen.shop",
  "lobby.btn.guild": "screen.guild",
  "lobby.btn.ranking": "screen.ranking",
  "lobby.btn.mail": "screen.mail",
  "lobby.btn.notifications": "screen.notifications",
  "lobby.btn.journal": "screen.journal",
  "lobby.btn.quests": "screen.quests",
  "lobby.btn.events": "screen.events",
  "lobby.btn.benefits": "screen.benefits",
  "lobby.btn.daily_login": "screen.daily_login",
  "lobby.btn.settings": "screen.settings"
} as const;
export type UIActionId = keyof typeof UI_ACTIONS;
export type ScreenId = (typeof UI_ACTIONS)[UIActionId];
export interface UiAsset { path: string; kind: 'reference_crop' | 'production'; interactive: boolean; }
export function resolveAction(id: UIActionId): ScreenId { return UI_ACTIONS[id]; }
