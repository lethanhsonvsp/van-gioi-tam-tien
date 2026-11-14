// Player-facing names of element codes (the codes stay internal). Unknown or NONE reads "Vô hệ".
export const ELEMENT_VI: Record<string, string> = {
  NONE: 'Vô hệ', MOC: 'Mộc', BANG: 'Băng', HOA: 'Hỏa', HUYEN: 'Huyễn', AM: 'Ám', THUY: 'Thủy', LOI: 'Lôi', THO: 'Thổ',
};
export const elementVi = (e: string): string => ELEMENT_VI[e] ?? ELEMENT_VI.NONE;
