import type { Character } from './character';

export const PARTY_SIZE = 6; // slot 0 = protagonist, slots 1-5 = Tien No or empty

export interface OwnedTienNo extends Character { copies: number } // copies: duplicate pulls; no direct power (later: converts to cap-raising items)
export interface Pity { sinceSR: number; sinceUR: number } // pulls since the last SR+ / UR

export const emptyParty = (playerId: string): (string | null)[] => [playerId, ...Array<null>(PARTY_SIZE - 1).fill(null)];

// Party rules: 6 slots, slot 0 is the protagonist, no duplicates, only owned Tien No.
export function validParty(party: (string | null)[], playerId: string, owned: string[]): boolean {
  if (party.length !== PARTY_SIZE || party[0] !== playerId) return false;
  const ids = party.slice(1).filter((x): x is string => x !== null);
  return new Set(ids).size === ids.length && ids.every(id => owned.includes(id));
}

export const inParty = (party: (string | null)[], id: string): boolean => party.includes(id);

// Toggle a Tien No in the party: leaves if present, otherwise takes the first empty slot. Returns the same array when nothing changes.
export function toggleParty(party: (string | null)[], id: string, owned: string[]): (string | null)[] {
  const i = party.indexOf(id);
  if (i > 0) return party.map((x, k) => (k === i ? null : x));
  const free = party.indexOf(null, 1);
  if (i === 0 || free < 0 || !owned.includes(id)) return party;
  return party.map((x, k) => (k === free ? id : x));
}

export const clearSlot = (party: (string | null)[], slot: number): (string | null)[] =>
  slot > 0 && party[slot] !== null ? party.map((x, k) => (k === slot ? null : x)) : party;
