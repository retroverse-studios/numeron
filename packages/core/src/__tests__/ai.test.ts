import { describe, it, expect } from 'vitest';
import { buildReadingPrompt, VOICES } from '../ai.js';
import { generateProfile } from '../profile.js';

const profile = generateProfile(
  { fullBirthName: 'Ada Lovelace', dateOfBirth: '1815-12-10' },
  'pythagorean',
);

describe('buildReadingPrompt', () => {
  it('grounds the prompt in the profile numbers and three-lens content', () => {
    const { system, user } = buildReadingPrompt(profile);
    expect(system).toContain('light AND shadow');
    const payload = JSON.parse(user.slice(user.indexOf('{')));
    expect(payload.coreNumbers.lifePath.value).toBe(profile.lifePath.value);
    expect(payload.coreNumbers.expression.lenses.shadow).toBeTruthy();
    expect(payload.personalTiming.year).toBe(profile.personalYear.value);
  });

  it('applies a preset voice as an overlay that keeps the honesty rules', () => {
    const { system } = buildReadingPrompt(profile, undefined, 'pirate');
    expect(system).toContain('VOICE OVERLAY');
    expect(system).toContain(VOICES.pirate.instruction);
    expect(system).toContain('light AND shadow');
  });

  it('passes free-text voices through verbatim', () => {
    const { system } = buildReadingPrompt(profile, undefined, 'a weary lighthouse keeper');
    expect(system).toContain('a weary lighthouse keeper');
  });

  it('omits the overlay when no voice is chosen', () => {
    const { system } = buildReadingPrompt(profile);
    expect(system).not.toContain('VOICE OVERLAY');
  });

  it('includes the reader emphasis when given', () => {
    const { user } = buildReadingPrompt(profile, 'focus on career');
    expect(user).toContain('focus on career');
  });
});
