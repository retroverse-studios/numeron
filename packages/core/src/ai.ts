import type { NumerologyProfile, NumberResult } from './types.js';
import { interpretations } from './interpretations/index.js';

export interface AiOptions {
  /** The user's own Anthropic API key — never stored or proxied by NUMERON. */
  apiKey: string;
  model?: string;
  /** Optional extra instruction, e.g. "focus on career" or "shorter". */
  emphasis?: string;
  /** A VOICES preset id, or free-text like "write as a weary lighthouse keeper". */
  voice?: string;
}

/**
 * Fun voice presets for the live-AI mode. A voice changes diction only —
 * the honesty rules (all three lenses, no predictions, "in this tradition")
 * still bind, which is half the comedy. Shared with ASTRON, retuned for
 * numbers instead of charts.
 */
export const VOICES: Record<string, { label: string; instruction: string }> = {
  pirate: {
    label: '🏴‍☠️ Pirate captain',
    instruction:
      "a good-natured pirate captain — nautical metaphors, 'arr' and 'ye', the numbers read as coordinates on a treasure map, shadows as reefs to steer round",
  },
  bard: {
    label: '🎭 Shakespearean player',
    instruction:
      'a Shakespearean player — thee and thou, theatrical asides, rich Elizabethan imagery, and end the reading with a rhyming couplet',
  },
  bubble: {
    label: '✨ Bubblegum bestie',
    instruction:
      'a relentlessly bright, bubbly best friend — sparkle, superlatives, exclamation marks!! — who still names every shadow, just adorably',
  },
  professor: {
    label: '📚 Emeritus professor',
    instruction:
      'a dry emeritus professor of comparative symbology — precise, faintly weary, with parenthetical asides and the occasional sigh at the state of the field',
  },
  politician: {
    label: '🎤 Campaigning politician',
    instruction:
      'a campaigning politician — promises the strengths to every demographic, tries to pivot away from the shadows, and is nonetheless made to answer for each one',
  },
  noir: {
    label: '🌧 Noir detective',
    instruction:
      'a hardboiled noir detective — rain on the window, the profile spread out like a case file, every number a suspect with a motive',
  },
  grandma: {
    label: '🍪 Loving grandmother',
    instruction:
      'a loving grandmother — tea and biscuits, gentle scolding for the shadows, unshakeable faith in the reader, everything ends with being fed',
  },
  sportscaster: {
    label: '📣 Sports commentator',
    instruction:
      'a breathless play-by-play sports commentator — the reading called like a live match, core numbers as players, the reductions as passages of play',
  },
  robot: {
    label: '🤖 Extremely literal robot',
    instruction:
      'an extremely literal robot — deadpan compliance, numbered observations, accidental profundity, occasional reports on its own emotional subroutines',
  },
  dj: {
    label: '📻 Late-night cosmic DJ',
    instruction:
      'a velvet-voiced late-night radio DJ — the digits as tonight’s setlist, each core number a dedication going out to the listener, slow-jam pacing',
  },
};

export const DEFAULT_AI_MODEL = 'claude-haiku-4-5-20251001';

export function aiProvenance(model: string): string {
  return (
    `This reading was generated just now by ${model}, called directly with ` +
    'your own API key. This is the one NUMERON mode where your data leaves ' +
    'your machine — it went to Anthropic and nowhere else. AI prose can be ' +
    'fluent and wrong in the same sentence: the numbers above it are the ' +
    'arithmetic; this is an interpretation of an interpretation.'
  );
}

const SYSTEM_PROMPT = `You write numerology readings for NUMERON, software whose defining value is honesty about what numerology is: a rich cross-cultural symbolic tradition with a genuinely fascinating mathematical structure — not a predictive science. House style, non-negotiable:
- Address the reader as "you". Warm, literate, specific; no mysticism-as-authority.
- Every number gets light AND shadow — never flattery-only. No predictions, no medical/financial/legal advice, no "the universe wants".
- Say "in this tradition" or equivalent at least once; digit sums supply symbols, not verdicts. Different numerology systems disagree about the same name — you may nod to that.
- 350–550 words of flowing prose (no headers, no bullet lists), weaving the numbers into a portrait rather than listing them.
- End with one sentence reminding the reader that the digit sum of their name does not determine their future — they do.`;

const num = (r: NumberResult) => ({
  value: r.value,
  master: r.masterNumber || undefined,
  reduction: r.reductionSteps,
  lenses: interpretations[r.value]
    ? {
        light: interpretations[r.value].positive,
        truth: interpretations[r.value].neutral,
        shadow: interpretations[r.value].shadow,
        keywords: interpretations[r.value].keywords,
        correspondences: {
          planet: interpretations[r.value].planet,
          tarot: interpretations[r.value].tarotCard,
          element: interpretations[r.value].element,
        },
      }
    : undefined,
});

/** Build the exact prompt NUMERON sends — exported so it can be shown to the user. */
export function buildReadingPrompt(
  profile: NumerologyProfile,
  emphasis?: string,
  voice?: string,
): { system: string; user: string } {
  const voiceInstruction = voice ? (VOICES[voice]?.instruction ?? voice) : undefined;
  const system = voiceInstruction
    ? `${SYSTEM_PROMPT}\n\nVOICE OVERLAY: write in the voice of ${voiceInstruction}. The voice changes diction and imagery only — every honesty rule above still binds, in character.`
    : SYSTEM_PROMPT;
  const payload = {
    system: profile.lifePath.system,
    coreNumbers: {
      lifePath: num(profile.lifePath),
      expression: num(profile.expression),
      soulUrge: num(profile.soulUrge),
      personality: num(profile.personality),
      maturity: num(profile.maturity),
      birthday: num(profile.birthdayNumber),
    },
    hiddenPassion: profile.hiddenPassion.map((r) => r.value),
    karmaDebt: profile.karmaDebt,
    masterNumbers: profile.masterNumbers,
    personalTiming: {
      year: profile.personalYear.value,
      month: profile.personalMonth.value,
      day: profile.personalDay.value,
    },
  };
  return {
    system,
    user:
      `Write the reading for this numerology profile.${emphasis ? ` Emphasis requested by the reader: ${emphasis}.` : ''}\n\n` +
      JSON.stringify(payload, null, 1),
  };
}

/**
 * Generate a fluent reading with the user's own key, straight to Anthropic
 * (no NUMERON server exists to proxy it). Works in browsers and Node.
 */
export async function aiReading(
  profile: NumerologyProfile,
  options: AiOptions,
): Promise<{ text: string; provenance: string; model: string }> {
  const model = options.model ?? DEFAULT_AI_MODEL;
  const prompt = buildReadingPrompt(profile, options.emphasis, options.voice);
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': options.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model,
      max_tokens: 1500,
      system: prompt.system,
      messages: [{ role: 'user', content: prompt.user }],
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Anthropic API ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = (await res.json()) as { content: { type: string; text?: string }[] };
  const text = data.content
    .filter((b) => b.type === 'text' && b.text)
    .map((b) => b.text)
    .join('\n')
    .trim();
  if (!text) throw new Error('Anthropic API returned no text');
  return { text, provenance: aiProvenance(model), model };
}
