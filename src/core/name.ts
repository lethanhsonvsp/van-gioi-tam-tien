export const NAME_MAX = 16;

// Strip control characters and HTML tags/brackets, trim, cap at 16 code points. Returns null if nothing is left.
export function validateName(raw: string): string | null {
  const s = [...raw.replace(/[\u0000-\u001f\u007f-\u009f]/g, '').replace(/<[^>]*>?/g, '').replace(/[<>]/g, '').trim()].slice(0, NAME_MAX).join('').trim();
  return s || null;
}
