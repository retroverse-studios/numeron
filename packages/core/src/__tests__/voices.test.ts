import { describe, expect, it } from 'vitest';
import { interpretations } from '../interpretations/numbers.js';
import { NARRATORS, voicedInterpretation } from '../interpretations/voices/index.js';

const NUMBERS = Object.keys(interpretations).map(Number);
const LENSES = ['positive', 'neutral', 'shadow'] as const;

describe('narrator voice packs', () => {
  it('cover every canonical number with all three lenses, non-empty', () => {
    for (const [id, narrator] of Object.entries(NARRATORS)) {
      for (const n of NUMBERS) {
        const voiced = narrator.texts[n];
        expect(voiced, `${id} is missing number ${n}`).toBeDefined();
        for (const lens of LENSES) {
          expect(
            voiced![lens].trim().length,
            `${id} ${n}.${lens} is empty`,
          ).toBeGreaterThan(40);
        }
      }
    }
  });

  it('actually re-voice the text (not copies of the plain set)', () => {
    for (const [id, narrator] of Object.entries(NARRATORS)) {
      for (const n of NUMBERS) {
        for (const lens of LENSES) {
          expect(
            narrator.texts[n]![lens],
            `${id} ${n}.${lens} is identical to the plain text`,
          ).not.toBe(interpretations[n]![lens]);
        }
      }
    }
  });

  it('voicedInterpretation keeps canonical metadata and swaps lens text', () => {
    const plain = voicedInterpretation(7, 'plain');
    const voiced = voicedInterpretation(7, 'pirate');
    expect(plain).toBe(interpretations[7]);
    expect(voiced!.keywords).toEqual(interpretations[7]!.keywords);
    expect(voiced!.planet).toBe(interpretations[7]!.planet);
    expect(voiced!.positive).not.toBe(interpretations[7]!.positive);
  });

  it('falls back to the plain text for unknown numbers', () => {
    expect(voicedInterpretation(99, 'pirate')).toBeUndefined();
    expect(voicedInterpretation(11, 'plain')).toBe(interpretations[11]);
  });
});
