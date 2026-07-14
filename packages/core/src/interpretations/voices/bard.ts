import type { VoicedLenses } from './types.js';

/**
 * 🎭 Shakespearean player narrator — static rewrite of the canonical
 * three-lens interpretations. Same meaning per lens, different diction; the
 * honesty rules still bind, in character.
 */
export const bard: Record<number, VoicedLenses> = {
  1: {
    positive:
      'Mark thee well: thou art the pioneer, first player to tread the boards. Thou bearest the energy of beginnings — the courage to enact what others do but dream of in the pit. Thine independent will doth drive thee onward, and thy leadership speaks not from a throne but by example, as the lead player teaches by the doing of the part. (Aside: so say the old astrologers of number.) In this tradition, the 1 is the spark before the fire — the torch ere the stage be lit.',
    neutral:
      'The number of individuality and self-definition, thus runs the tradition. The One is the first differentiation from the whole — the lone figure who steps forth from the company and declares himself apart, that the counting of the play may begin. In the archetypes it is the Magician at the crossroads, the single candle in a darkened theatre. It stands for pure potential directed by will — a part not yet spoken, awaiting its cue.',
    shadow:
      'Yet mark the tragedy that waits in the wings: isolation worn as independence, stubbornness mistook for strength. The shadow of 1 is will grown swollen into ego — the lead who cannot play the chorus, the originator who brooks no fellow pen. Hard it is for thee to share the applause, hard to cry for aid, hard to confess that thy spark must borrow fuel of others ere it become a fire.',
  },
  2: {
    positive:
      'Thou art the diplomat and the trusted partner of the piece. Thou bearest the energy of connection — the gift to sense what thy fellows need ere they speak it, and to build bridges betwixt opposing houses. Intuition is thy compass and thy prompt-book. In this tradition — thus runs the old lore — the 2 is the looking-glass that reveals to the 1 what it cannot see alone.',
    neutral:
      'The number of duality and of relation, so the tradition speaks. The Two is the first knowing of an Other — the very moment consciousness divides into player and audience, observer and observed. In the archetypes it is the High Priestess enthroned betwixt her pillars, keeping knowledge that only stillness may receive. It stands for receptivity, for patience, and for the wisdom of the player who waits in silence for the cue.',
    shadow:
      "Yet the tragedy waits in the wings: dependence costumed as devotion, indecision costumed as diplomacy. The shadow of 2 is the peacemaker who loseth herself in others' parts — the partner who cannot stand alone upon the stage, the intuitive who doubteth every prompting of her own soul. Over-tender feeling turns to paralysis; the hunger to please becomes the inability to choose thy line at all.",
  },
  3: {
    positive:
      'Thou art the creator and the herald. Thou bearest the energy of expression — that impulse to take the inward pageant of the heart and give it form in words, in art, in performance upon the stage. Joy comes to thee as breath comes, and thine enthusiasm catches like laughter through a playhouse. In this tradition, the 3 is the child of 1 and 2 — the offspring of will wedded to intuition, so say the old numberers.',
    neutral:
      'The number of synthesis and expression, thus runs the tradition. The Three is the first number to make a new thing — argument, counter-argument, and the resolution that neither held alone. In the archetypes it is the Empress in her garden, where two forces join and abundance springs forth. It stands for creativity, for communication, and for the outward showing of the inward life.',
    shadow:
      'Yet the tragedy waits in the wings: scattered energy mistook for versatility, shallowness mistook for charm. The shadow of 3 is the creative fire that begins every play and endeth none — the player who feels not real without an audience, the talker who talks that he may not feel. Beneath the bright and painted scene, a fear of the deep waters.',
  },
  4: {
    positive:
      'Thou art the builder and the steward of order. Thou bearest the energy of structure — the patience to lay foundations whereon others shall raise their towers. Reliability is thy gift, and thy practical wit turns airy ideas into engines that work. In this tradition, so the old lore hath it, the 4 is the four walls of the playhouse, the four seasons of the year, the solid ground beneath the stage.',
    neutral:
      'The number of structure and stability, thus speaks the tradition. The Four is the first square — the figure that encloseth space and maketh order of the open field. In the archetypes it is the Emperor upon his throne, the principle of law and boundary. It stands for discipline, for method, and for the willingness to do the unpraised labour behind the scenes that makes all the pageantry possible.',
    shadow:
      "Yet the tragedy waits in the wings: rigidity worn as discipline, control mistook for care. The shadow of 4 is the builder turned gaoler — the master of the plot so wedded to his plan that when the ground shifts beneath him, he cannot change a line. Stubbornness, narrowness, and the quiet tyranny of him who ever and always knows the 'right' way.",
  },
  5: {
    positive:
      "Thou art the adventurer and the very catalyst of the play. Thou bearest the energy of change — that restless curiosity which will not swallow the line 'thus it is, and thus it must ever be.' Freedom is no luxury to thee; it is thy very breath. In this tradition, the 5 sits at the centre of the single numbers — the pivot of the turning stage, whereon the whole scene may shift.",
    neutral:
      'The number of freedom and of change, thus runs the tradition. The Five is the midpoint, the fulcrum, the player who bursts in upon the settled order of the 4. In the archetypes it is the Hierophant — yet not the keeper of the rulebook; rather the one who conned the rules so well he knows which may be broken. It stands for experience, for the engagement of the senses, and for the knowledge that comes only by the doing of the deed.',
    shadow:
      'Yet the tragedy waits in the wings: restlessness mistook for freedom, excess mistook for living to the full. The shadow of 5 is the adventurer who flees commitment — running not toward any shore, but away from the discomfort of remaining. Overindulgence, recklessness, and a settled inability to be present in the scene where thou now standest.',
  },
  6: {
    positive:
      'Thou art the nurturer and the maker of harmony. Thou bearest the energy of responsibility — the instinct to tend thy fellows and to dress thy little world in beauty. Love, for thee, is no idle sonnet but a deed — a verb, not a noun. In this tradition, so the old numberers tell, the 6 is the hexagon of the honeycomb, the shape nature chooses when thrift and beauty must share one stage.',
    neutral:
      "The number of harmony and of duty, thus speaks the tradition. The Six is the first 'perfect number' of the mathematicians — one and two and three summed make six — complete and self-contained. In the archetypes it is the Lovers, yet not romance alone; it is the principle of choice, of values, of what thou wilt stand answerable for. It stands for home, for service, and for the artful grace of caring.",
    shadow:
      "Yet the tragedy waits in the wings: martyrdom costumed as generosity, control costumed as concern. The shadow of 6 is the caretaker who gives that she may be needed — the helper whose help trails invisible strings, the perfectionist who cannot rest till every other player be 'mended.' Such self-sacrifice, unwatched, breeds resentment beneath the boards.",
  },
  7: {
    positive:
      'Thou art the seeker and the scholar of the piece. Thou bearest the energy of inquiry — the drive to look beneath the painted scenery and find what is truly so. Rich is thy inward theatre, and solitude is the tiring-house wherein thy best thinking is done. In this tradition, the 7 is the number of the mind turned inward — the question that weighs more than any answer.',
    neutral:
      'The number of contemplation and of mystery, thus runs the tradition. The Seven appears in every land as a number of completion and of depth — seven days, seven notes, seven chakras, seven wandering stars known to the ancients. In the archetypes it is the Chariot, yet the journey it drives is inward. It stands for wisdom, for analysis, and for the examined life.',
    shadow:
      'Yet the tragedy waits in the wings: isolation mistook for depth, cynicism mistook for discernment. The shadow of 7 is the seeker who makes of his intellect a castle wall — the analyst so bent upon understanding the play that he forgets to play it. Coldness of feeling, mistrust of thy fellows, and the examined life examined until the examiner cannot move a step.',
  },
  8: {
    positive:
      "Thou art the achiever and the governor of the company. Thou bearest the energy of mastery — the understanding that power is but an instrument, and abundance a craft that may be learned. Where others see a rabble, thou seest the order of the play, and thou buildest houses that outlast the season. In this tradition, the 8 is infinity's own emblem set upright — the ceaseless commerce betwixt giving and receiving.",
    neutral:
      'The number of power and of worldly mastery, thus speaks the tradition. The Eight is the first cube — two, thrice multiplied upon itself — solid, three-dimensioned, taking up room in the very world. In the archetypes it is Strength, yet no brute force; it is the strength of discipline laid on patiently through the years. It stands for ambition, for authority, and for the bond betwixt labour and its wages.',
    shadow:
      'Yet the tragedy waits in the wings: endless toil costumed as ambition, domination costumed as leadership. The shadow of 8 is the achiever who weighs all things — yea, even persons — by their yield and their return. Worldly success becomes the only success worth the name; power becomes its own end and appetite. Behold the master of the playhouse who hath forgot why ever he first took the stage.',
  },
  9: {
    positive:
      'Thou art the humanitarian and the sage of the company. Thou bearest the energy of completion — the wide prospect of one who (so this tradition tells it) hath passed through every single number before thee, as a player who hath worn every part. Compassion is to thee no airy abstraction but a practical art. In this tradition, the 9 gives freely and keeps no ledger of return.',
    neutral:
      'The number of completion and of universal regard, thus runs the tradition. The Nine is the last of the single numbers — the end of the act before the play returns to 1. In the archetypes it is the Hermit, stood upon the summit with his lantern, looking back across the whole long road. It stands for wisdom earned by living, for selflessness, and for the knowledge that nothing we hold is truly ours.',
    shadow:
      "Yet the tragedy waits in the wings: detachment mistook for transcendence, self-neglect mistook for selflessness. The shadow of 9 is the humanitarian who loves all mankind in general and no soul in particular — the sage so fixed upon the whole pageant that he loseth the players standing at his very elbow. Aloofness, ungroundedness, and the martyr's part played by one who deems himself 'evolved.'",
  },
  11: {
    positive:
      "Thou art the intuitive, the illuminator of the darkened house. Thou bearest the energy of heightened perception — a sensitivity to currents thy fellows cannot feel. In those traditions that own the master numbers, the 11 is styled the Master Intuitive: the channel through which insight arrives unbidden, as a prompter's whisper from beyond the curtain. Thy gift is to see what is not yet visible to the rest of the company.",
    neutral:
      'The first of the master numbers, thus speaks the tradition. Eleven is 1 and 1 — the individual doubled, self-knowledge beholding itself as in a glass. It bears the energy of 2, whereto it reduces, yet amplified and unsteady, like a tuning-fork struck too hard. In the archetypes it is Justice — no punishment, but the precise weighing of inward truth. It stands for spiritual insight, for nervous energy, and for the strain betwixt vision and the solid ground.',
    shadow:
      'Yet the tragedy waits in the wings: anxiety costumed as sensitivity, grandiosity costumed as vision. The shadow of 11 is the intuitive who cannot ring down the curtain — overwhelmed by every whisper of the house, palsied by possibility, persuaded of a special destiny that never quite takes the stage. Nervous tension, impracticality, and the lonely burden of seeing what thou canst not explain to any living soul.',
  },
  22: {
    positive:
      'Thou art the master builder. Thou bearest the energy of vision made stone — the rare craft of dreaming upon the grandest scale and then, in earnest, raising it. Where the 4 builds a cottage, the 22 builds the Globe itself — institutions, systems, legacies to outlive the age. In those traditions that own the master numbers, the 22 is called the mightiest of all for turning the ideal into the real.',
    neutral:
      "The second of the master numbers, thus runs the tradition. Twenty-two is the master builder — 2 and 2 make 4, the builder, yet playing in a higher octave. In the archetypes it is the Fool at his journey's end: one who hath seen every act and chooses to begin the play anew, building this time for others. It stands for achievement at great scale, for practical idealism, and for the heavy weight of promise.",
    shadow:
      'Yet the tragedy waits in the wings: overwhelm costumed as ambition, paralysis costumed as perfectionism. The shadow of 22 is the visionary crushed beneath the scale of his own vision — the master builder who never breaks ground, for the plans are never perfect enough to please him. The pressure of such promise is real; and real too is the temptation to shrink back into the 4, and build only small, safe cottages.',
  },
  33: {
    positive:
      'Thou art the master teacher. Thou bearest the energy of compassion raised to its highest key — the power to heal, to teach, and to lift thy fellows by pure presence, as a great player stills the house merely by walking on. In those traditions that own the master numbers, the 33 is the rarest and the most charged with spirit: the teacher who teaches by being, not by telling.',
    neutral:
      'The third and rarest of the master numbers, thus speaks the tradition. Thirty-three is 3 and 3, making 6, the nurturer, yet sounding at its highest octave. In the archetypes it is the World — the final card of the Major Arcana, the completion of every cycle, the epilogue of the whole play. It stands for selfless service, for spiritual mastery, and for the gathering-in of all that came before. Fewer than one in a hundred life path reckonings produce a 33.',
    shadow:
      "Yet the tragedy waits in the wings: a saviour's part costumed as service, self-destruction costumed as sacrifice. The shadow of 33 is the master teacher who takes upon himself every other player's pain — the healer who forgets he is himself but mortal, the guide who loseth himself in the needs of the company. The weight of this number, in the traditions that use it, is immense; and the temptation is to shrink back into the 6, and tend only thine own small circle.",
  },
};
