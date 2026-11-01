/**
 * Text normalization for Latin letter-table systems.
 *
 * Accented Latin letters (é, ñ, ü, ç) must map to their base letter rather
 * than vanish: without this, "José" would be scored as "Jos" in every
 * Latin-table system. Non-Latin scripts are left untouched (Abjad handles
 * Arabic natively; other scripts are skipped with a UI warning).
 */
export function toLatinUpper(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
}
