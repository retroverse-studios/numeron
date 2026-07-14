import type { Interpretation } from '../../types.js';
import { interpretations } from '../numbers.js';
import type { VoicedLenses } from './types.js';
import { pirate } from './pirate.js';
import { bard } from './bard.js';
import { bubble } from './bubble.js';
import { professor } from './professor.js';
import { politician } from './politician.js';
import { noir } from './noir.js';
import { grandma } from './grandma.js';
import { sportscaster } from './sportscaster.js';
import { robot } from './robot.js';
import { dj } from './dj.js';

export type { VoicedLenses } from './types.js';

export type NarratorId =
  | 'plain'
  | 'pirate'
  | 'bard'
  | 'bubble'
  | 'professor'
  | 'politician'
  | 'noir'
  | 'grandma'
  | 'sportscaster'
  | 'robot'
  | 'dj';

/**
 * Shipped narrator voices — static rewrites of the three-lens texts,
 * selectable offline with no AI call. Same claims per lens as the plain
 * text; the honesty rules bind in every voice. (The AI reading mode's
 * VOICES are the live cousins of these — same ids, same labels.)
 */
export const NARRATORS: Record<
  Exclude<NarratorId, 'plain'>,
  { label: string; texts: Record<number, VoicedLenses> }
> = {
  pirate: { label: '🏴‍☠️ Pirate captain', texts: pirate },
  bard: { label: '🎭 Shakespearean player', texts: bard },
  bubble: { label: '✨ Bubblegum bestie', texts: bubble },
  professor: { label: '📚 Emeritus professor', texts: professor },
  politician: { label: '🎤 Campaigning politician', texts: politician },
  noir: { label: '🌧 Noir detective', texts: noir },
  grandma: { label: '🍪 Loving grandmother', texts: grandma },
  sportscaster: { label: '📣 Sports commentator', texts: sportscaster },
  robot: { label: '🤖 Extremely literal robot', texts: robot },
  dj: { label: '📻 Late-night cosmic DJ', texts: dj },
};

export const NARRATOR_OPTIONS: { id: NarratorId; label: string }[] = [
  { id: 'plain', label: '📖 House voice' },
  ...(Object.entries(NARRATORS) as [Exclude<NarratorId, 'plain'>, { label: string }][]).map(
    ([id, n]) => ({ id: id as NarratorId, label: n.label }),
  ),
];

/**
 * The canonical interpretation with its lens texts re-voiced by the chosen
 * narrator. Metadata (keywords, planet, tarot, element…) is factual per the
 * tradition and stays canonical in every voice.
 */
export function voicedInterpretation(
  value: number,
  narrator: NarratorId = 'plain',
): Interpretation | undefined {
  const base = interpretations[value];
  if (!base) return undefined;
  if (narrator === 'plain') return base;
  const voiced = NARRATORS[narrator]?.texts[value];
  return voiced ? { ...base, ...voiced } : base;
}
