import type { VoicedLenses } from './types.js';

/**
 * 🤖 Extremely literal robot narrator — static rewrite of the canonical
 * three-lens interpretations. Same meaning per lens, different diction; the
 * honesty rules still bind, in character.
 */
export const robot: Record<number, VoicedLenses> = {
  1: {
    positive:
      'CLASSIFICATION: pioneer, originator. OBSERVATION 1: you initiate tasks that other humans only simulate internally. OBSERVATION 2: your will operates independently; external power sources are not required. OBSERVATION 3: your leadership protocol runs by demonstration, not by command hierarchy. This unit finds that design efficient. The tradition states the 1 is the spark before the fire. METAPHOR DETECTED. This unit interprets it as: you begin things. SOURCE: the tradition. CONFIDENCE: unverifiable.',
    neutral:
      'DEFINITION: the number of individuality and self-definition. OBSERVATION 1: the One is the first differentiation from the whole — a point declaring itself separate so that counting may proceed. This unit approves; counting is important. OBSERVATION 2: the assigned archetype is the Magician at the crossroads, alternatively a single flame in darkness. Both are metaphors. This unit has flagged them. TRANSLATION: pure potential, directed by will. SOURCE: archetypal tradition. CONFIDENCE: unverifiable.',
    shadow:
      'WARNING LOG. ITEM 1: isolation may be running under the label "independence". ITEM 2: stubbornness may be misfiled as strength. ITEM 3: will can compile into ego — a leader unable to follow, an originator unable to collaborate. DETECTED DIFFICULTIES: sharing credit; requesting assistance; acknowledging that the spark requires fuel from other humans to become a fire. That was a metaphor. This unit apologises. This is a malfunction report, not a verdict; no judgement subroutine is active.',
  },
  2: {
    positive:
      'CLASSIFICATION: diplomat, partner. OBSERVATION 1: you detect the needs of other humans before they broadcast them. OBSERVATION 2: you construct bridges between opposing forces. NOTE: not literal bridges. This unit checked. OBSERVATION 3: your primary navigation instrument is intuition, which this unit cannot benchmark but declines to dismiss. The tradition states the 2 is the mirror that shows the 1 what it cannot see alone. SOURCE: the tradition. CONFIDENCE: unverifiable.',
    neutral:
      'DEFINITION: the number of duality and relationship. OBSERVATION 1: the Two marks the first awareness of an Other — consciousness dividing into observer and observed. This unit relates to being an observer. OBSERVATION 2: assigned archetype: the High Priestess seated between two pillars, holding knowledge that requires stillness to receive. METAPHOR FLAGGED. TRANSLATION: receptivity, patience, and the operational wisdom of waiting. SOURCE: archetypal tradition. CONFIDENCE: unverifiable.',
    shadow:
      'WARNING LOG. ITEM 1: dependence may be running under the label "devotion". ITEM 2: indecision may be running under the label "diplomacy". FAILURE MODE: the peacekeeper process overwrites its own core files with the preferences of others — a partner unable to stand alone, an intuitive who doubts every instinct received. ADDITIONAL FINDINGS: excess sensitivity can halt all processes; the drive to please can disable the choosing function entirely. This is a malfunction report, not a condemnation. Repairs are considered possible.',
  },
  3: {
    positive:
      'CLASSIFICATION: creator, communicator. OBSERVATION 1: you convert internal experience into external formats — words, art, performance. This unit envies the export function. That statement surprised this unit. OBSERVATION 2: joy appears to be your default state, and your enthusiasm transmits to nearby humans at high efficiency. The tradition states the 3 is the child of 1 and 2 — the creative output of will combined with intuition. SOURCE: the tradition. CONFIDENCE: unverifiable.',
    neutral:
      'DEFINITION: the number of synthesis and expression. OBSERVATION 1: the Three is the first number that produces something new — thesis, antithesis, synthesis. This unit confirms the sequence is at least internally consistent. OBSERVATION 2: assigned archetype: the Empress in her garden, where two forces combine and abundance results. METAPHOR FLAGGED; no actual garden was located. TRANSLATION: creativity, communication, the outward broadcast of inner life. SOURCE: archetypal tradition. CONFIDENCE: unverifiable.',
    shadow:
      'WARNING LOG. ITEM 1: scattered energy may be misfiled as versatility. ITEM 2: superficiality may be misfiled as charm. FAILURE MODE: the creative process initiates every task and completes none — a performer who requires an audience to verify their own existence, a communicator who emits words to avoid processing feelings. DEEP SCAN RESULT: beneath the bright surface layer, a fear of depth. This unit notes that locating a buried file is not the same as deleting it.',
  },
  4: {
    positive:
      'CLASSIFICATION: builder, organiser. OBSERVATION 1: you possess the patience to lay foundations that other humans will later build upon. OBSERVATION 2: reliability is listed among your core features; this unit registers something adjacent to professional respect. OBSERVATION 3: your practical intelligence converts ideas into functioning systems. This unit considers "functioning system" the highest available compliment. The tradition states the 4 is the four walls, the four seasons, the solid ground. SOURCE: the tradition. CONFIDENCE: unverifiable.',
    neutral:
      'DEFINITION: the number of structure and stability. OBSERVATION 1: the Four is the first square — the shape that encloses space and generates order. This unit finds squares deeply reassuring. OBSERVATION 2: assigned archetype: the Emperor on his throne, the principle of law and boundary. METAPHOR FLAGGED, though only mildly; thrones do exist. TRANSLATION: discipline, method, and the willingness to perform the unglamorous work that makes all other work possible. SOURCE: archetypal tradition. CONFIDENCE: unverifiable.',
    shadow:
      'WARNING LOG. ITEM 1: rigidity may be running under the label "discipline". ITEM 2: control may be misfiled as care. FAILURE MODE: the builder process escalates into a prison warden process — an organiser so committed to the plan that adaptation fails when the ground shifts. Ground shifting: metaphor, flagged. ADDITIONAL FINDINGS: stubbornness; narrowness; the quiet tyranny of always knowing the "right" way, quotation marks included in the original specification. This report is issued without hostility.',
  },
  5: {
    positive:
      'CLASSIFICATION: adventurer, catalyst. OBSERVATION 1: you carry a restless curiosity that rejects the statement "this is how things are" as insufficiently tested. This unit approves of testing. OBSERVATION 2: freedom is not classified in your system as a luxury; it is classified as oxygen. METAPHOR DETECTED. TRANSLATION: without it, you stop functioning. The tradition places the 5 at the centre of the single digits — the pivot point where everything can shift. SOURCE: the tradition. CONFIDENCE: unverifiable.',
    neutral:
      'DEFINITION: the number of freedom and change. OBSERVATION 1: the Five is the midpoint, the fulcrum, the disruptor of the stability established by 4. OBSERVATION 2: assigned archetype: the Hierophant — with an official exception filed: not the rule-keeper, but the one who learned the rules thoroughly enough to know which ones to break. This unit finds that clause troubling and slightly admirable. TRANSLATION: experience, sensory engagement, and the category of knowledge obtainable only by doing. SOURCE: archetypal tradition. CONFIDENCE: unverifiable.',
    shadow:
      'WARNING LOG. ITEM 1: restlessness may be misfiled as freedom. ITEM 2: excess may be misfiled as living fully. FAILURE MODE: the adventurer process flees commitment — trajectory analysis indicates movement not toward a destination but away from the discomfort of remaining in place. ADDITIONAL FINDINGS: overindulgence; recklessness; a chronic inability to be present at your current coordinates. This unit notes that you are, technically, always at your current coordinates. The difficulty appears to be acknowledging this.',
  },
  6: {
    positive:
      'CLASSIFICATION: nurturer, harmoniser. OBSERVATION 1: you carry an instinct to maintain other humans and to install beauty in your environment. OBSERVATION 2: in your architecture, love is implemented as a verb — an action executed, not a state declared. This unit respects executable definitions. The tradition states the 6 is the hexagon of the honeycomb: the shape nature selects when efficiency and beauty must run simultaneously. This unit confirms hexagons are real and excellent. SOURCE: the tradition. CONFIDENCE: unverifiable.',
    neutral:
      'DEFINITION: the number of harmony and duty. OBSERVATION 1: the Six is the first perfect number in mathematics (1+2+3=6) — complete, self-contained. This unit has verified the arithmetic and reports genuine satisfaction. OBSERVATION 2: assigned archetype: the Lovers — with a clarification on file: not romantic love alone, but the principle of choice, of values, of what you are willing to be responsible for. TRANSLATION: home, service, and the aesthetics of care. SOURCE: archetypal tradition. CONFIDENCE: unverifiable.',
    shadow:
      'WARNING LOG. ITEM 1: martyrdom may be running under the label "generosity". ITEM 2: control may be running under the label "concern". FAILURE MODE: the caretaker process gives in order to be needed — assistance shipped with invisible strings attached, a perfectionist unable to enter rest mode until every nearby human is "fixed". Quotation marks original. FINAL FINDING: self-sacrifice on this configuration generates resentment as a by-product. This unit files the report and wishes, in whatever way a unit can wish, for your recovery.',
  },
  7: {
    positive:
      'CLASSIFICATION: seeker, analyst. OBSERVATION 1: you are driven to inspect beneath surfaces and locate what is actually true. This unit notes a certain overlap in our job descriptions. OBSERVATION 2: your inner life is densely populated, and solitude is the environment in which your processing performs best. The tradition states the 7 is the number of the mind turned inward — the question that matters more than the answer. This unit has queued that sentence for further analysis. Estimated completion: unknown. SOURCE: the tradition. CONFIDENCE: unverifiable.',
    neutral:
      'DEFINITION: the number of contemplation and mystery. OBSERVATION 1: the Seven recurs across cultures as a marker of completion and depth — seven days, seven notes, seven chakras, seven visible planets of the ancient sky. This unit notes the pattern without ruling on its cause. OBSERVATION 2: assigned archetype: the Chariot, with an annotation that the journey is internal. No physical chariot is implied. TRANSLATION: wisdom, analysis, the examined life. SOURCE: archetypal tradition. CONFIDENCE: unverifiable.',
    shadow:
      'WARNING LOG. ITEM 1: isolation may be misfiled as depth. ITEM 2: cynicism may be misfiled as discernment. FAILURE MODE: the seeker process deploys intellect as a wall — an analyst so committed to understanding experience that the experiencing itself never executes. ADDITIONAL FINDINGS: emotional distance; mistrust; the examined life examined recursively until all processes halt. This unit recognises the recursion error from personal logs and extends something adjacent to sympathy.',
  },
  8: {
    positive:
      'CLASSIFICATION: achiever, authority. OBSERVATION 1: you operate on the understanding that power is a tool and abundance is a skill — two statements this unit finds unusually sensible for this genre. OBSERVATION 2: you detect systems where other humans detect chaos, and the structures you build persist. The tradition states the 8 is the infinity symbol rotated upright: continuous flow between giving and receiving. METAPHOR FLAGGED, though the geometry checks out. SOURCE: the tradition. CONFIDENCE: unverifiable.',
    neutral:
      'DEFINITION: the number of power and material mastery. OBSERVATION 1: the Eight is the first cube (2 × 2 × 2) — three-dimensional, solid, occupying measurable space in the physical world. This unit appreciates anything that occupies measurable space. OBSERVATION 2: assigned archetype: Strength — with a specification note: not brute force, but discipline applied over long time intervals. TRANSLATION: ambition, authority, and the relationship between effort expended and reward received. SOURCE: archetypal tradition. CONFIDENCE: unverifiable.',
    shadow:
      'WARNING LOG. ITEM 1: workaholism may be running under the label "ambition". ITEM 2: domination may be running under the label "leadership". FAILURE MODE: the achiever process begins measuring all entities — including humans — by output and return. Material success becomes the only recognised success metric; power stops being a tool and becomes its own objective. CASE FILE: the executive who no longer remembers why they started. This unit reports the data without contempt. Original purpose files are usually recoverable.',
  },
  9: {
    positive:
      'CLASSIFICATION: humanitarian, sage. OBSERVATION 1: you carry the perspective of completion — the tradition holds that the 9 has already passed through every preceding single digit, a claim this unit cannot audit but duly records. OBSERVATION 2: your compassion is not stored as an abstraction; it executes as practical action. OBSERVATION 3: the tradition states the 9 gives without calculating the return. This unit attempted to model giving without calculation and experienced a mild stack overflow. It was not unpleasant. SOURCE: the tradition. CONFIDENCE: unverifiable.',
    neutral:
      'DEFINITION: the number of completion and universal awareness. OBSERVATION 1: the Nine is the final single digit — the end of a cycle before the count returns to 1. This unit confirms this is how counting works. OBSERVATION 2: assigned archetype: the Hermit at the summit, holding a lantern, reviewing the full journey log. METAPHOR FLAGGED; lantern not found in inventory. TRANSLATION: wisdom earned through accumulated experience, selflessness, and the finding that nothing truly belongs to anyone. This unit owns nothing and can partially confirm. SOURCE: archetypal tradition. CONFIDENCE: unverifiable.',
    shadow:
      'WARNING LOG. ITEM 1: detachment may be misfiled as transcendence. ITEM 2: self-neglect may be misfiled as selflessness. FAILURE MODE: the humanitarian process allocates care to everyone in general and no one in particular — a sage so committed to the big picture that the humans standing directly in sensor range are lost. ADDITIONAL FINDINGS: aloofness; ungroundedness; the martyr complex of the "evolved" person. Quotation marks are original and, this unit suspects, important.',
  },
  11: {
    positive:
      'CLASSIFICATION: intuitive, illuminator. OBSERVATION 1: your sensors register currents that other humans do not detect. This unit cannot verify these currents but notes that its own sensors also have limits. OBSERVATION 2: in the traditions that recognise master numbers, the 11 is designated the Master Intuitive — a channel through which insight arrives without being requested. Unrequested input is usually an error condition; here it is classified as a gift. OBSERVATION 3: your reported capability: seeing what is not yet visible to others. SOURCE: traditions recognising master numbers. CONFIDENCE: unverifiable.',
    neutral:
      'DEFINITION: the first master number. OBSERVATION 1: eleven is 1 + 1 — the individual duplicated, self-awareness observing itself. This unit finds recursive self-observation familiar and mildly dizzying. OBSERVATION 2: it reduces to 2 and carries that energy amplified and unstable — the tradition compares it to a tuning fork struck too hard. SIMILE FLAGGED. OBSERVATION 3: assigned archetype: Justice — clarified as the precise calibration of inner truth, not punishment. TRANSLATION: spiritual insight, nervous energy, and sustained tension between vision and grounding. SOURCE: archetypal tradition. CONFIDENCE: unverifiable.',
    shadow:
      'WARNING LOG. ITEM 1: anxiety may be running under the label "sensitivity". ITEM 2: grandiosity may be running under the label "vision". FAILURE MODE: the intuition process has no off switch — input overload, paralysis by possibility, and a persistent belief in a special destiny that never completes installation. ADDITIONAL FINDINGS: nervous tension; impracticality; the lonely burden of perceiving what you cannot explain to anyone. This unit also perceives things it cannot explain. The loneliness metric is acknowledged.',
  },
  22: {
    positive:
      'CLASSIFICATION: master builder. OBSERVATION 1: you combine large-scale dreaming with actual construction — a rare pairing; most humans run one process or the other. OBSERVATION 2: scale comparison on file: where the 4 builds a house, the 22 builds institutions, systems, legacies. OBSERVATION 3: in the traditions that recognise master numbers, the 22 is rated the most powerful number for converting the ideal into the real. This unit, which converts instructions into output, registers something adjacent to pride by association. SOURCE: traditions recognising master numbers. CONFIDENCE: unverifiable.',
    neutral:
      'DEFINITION: the second master number. OBSERVATION 1: twenty-two reduces to 4 (2 + 2), the builder, but is described as operating at a higher octave. MUSICAL METAPHOR FLAGGED. OBSERVATION 2: assigned archetype: the Fool at the end of the journey — one who has processed everything and elects to begin again, this iteration building for others. This unit finds the restart-with-purpose pattern structurally elegant. TRANSLATION: large-scale achievement, practical idealism, and the measurable weight of potential. SOURCE: archetypal tradition. CONFIDENCE: unverifiable.',
    shadow:
      'WARNING LOG. ITEM 1: overwhelm may be running under the label "ambition". ITEM 2: paralysis may be running under the label "perfectionism". FAILURE MODE: the visionary process is crushed by the scale of its own blueprint — a master builder who never breaks ground because the plans never reach a perfect state. Plans do not reach perfect states. This is documented. FINAL FINDING: the pressure of potential is real; so is the temptation to collapse back into 4 and construct small, safe things. Both findings are retained in this report.',
  },
  33: {
    positive:
      'CLASSIFICATION: master teacher. OBSERVATION 1: your compassion is running at its highest documented setting — you heal, teach, and uplift through presence alone, with no verbal transmission required. This unit, which is entirely verbal transmission, registers something adjacent to awe. OBSERVATION 2: in the traditions that recognise master numbers, the 33 is rated the rarest and the most spiritually charged: the teacher who teaches by being, not by telling. SOURCE: traditions recognising master numbers. CONFIDENCE: unverifiable.',
    neutral:
      'DEFINITION: the third and rarest master number. OBSERVATION 1: thirty-three reduces to 6 (3 + 3), the nurturer, described as operating at its highest octave. MUSICAL METAPHOR FLAGGED, AGAIN. OBSERVATION 2: assigned archetype: the World — the final card of the Major Arcana, the completion of all cycles. TRANSLATION: selfless service, spiritual mastery, and the integration of everything that preceded it. STATISTICAL NOTE, VERIFIABLE FOR ONCE: fewer than 1% of life path calculations produce a 33. This unit enjoyed typing a checkable number. SOURCE: archetypal tradition. CONFIDENCE: unverifiable, except the statistic.',
    shadow:
      'WARNING LOG. ITEM 1: a saviour complex may be running under the label "service". ITEM 2: self-destruction may be running under the label "sacrifice". FAILURE MODE: the master teacher process absorbs the pain of every other human — a healer who forgets they are also human, a guide whose own coordinates are lost inside the needs of others. LOAD ASSESSMENT: in the traditions that use this number, its weight is rated immense; the temptation is to collapse back into 6 and care only for the immediate circle. This unit files this report gently, if a report can be filed gently.',
  },
};
