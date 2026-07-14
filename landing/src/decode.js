/**
 * Hero visual: a looping terminal "decode" animation. Types out a worked
 * numerology reduction, holds, wipes, moves to the next. Purely decorative
 * (aria-hidden container); renders a single static frame under
 * prefers-reduced-motion.
 */
const FRAMES = [
  [
    '> decode "ADA LOVELACE"',
    '',
    '  A=1 D=4 A=1 L=3 O=6 V=4',
    '  E=5 L=3 A=1 C=3 E=5',
    '',
    '  1+4+1+3+6+4+5+3+1+3+5 = 36',
    '  3+6 = 9',
    '',
    '  PYTHAGOREAN ......... 9',
    '  CHALDEAN ............ 5',
    '  systems disagree. noted.',
    '',
    '  [LIGHT]  completion',
    '  [TRUTH]  compassion',
    '  [SHADOW] martyrdom',
  ],
  [
    '> lifepath 1815-12-10',
    '',
    '  1+8+1+5 = 15',
    '  1+2 = 3',
    '  1+0 = 1',
    '',
    '  15+3+1 = 19 → 1+9 = 10 → 1',
    '',
    '  LIFE PATH ........... 1',
    '  master numbers: none kept',
    '',
    '  [LIGHT]  originator',
    '  [TRUTH]  independence',
    '  [SHADOW] tyranny',
  ],
  [
    '> compare P/C/K/L/A',
    '',
    '  PYTHAGOREAN ......... 7',
    '  CHALDEAN ............ 4',
    '  KABBALISTIC ......... 3',
    '  LO SHU .............. 7',
    '  ABJAD ............... 8',
    '',
    '  agreement: 2 of 5',
    '',
    '  five traditions.',
    '  three lenses.',
    '  zero predictions.',
  ],
];

const screen = document.getElementById('decodeScreen');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (screen) {
  if (reduceMotion) {
    screen.textContent = FRAMES[0].join('\n');
  } else {
    runLoop();
  }
}

async function runLoop() {
  let i = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await typeFrame(FRAMES[i % FRAMES.length]);
    await sleep(3800);
    await wipe();
    i += 1;
  }
}

async function typeFrame(lines) {
  const text = lines.join('\n');
  screen.textContent = '';
  screen.classList.add('typing');
  for (let c = 0; c < text.length; c += 1) {
    screen.textContent += text[c];
    // Newlines pause a beat, like a terminal thinking.
    await sleep(text[c] === '\n' ? 46 : 14);
  }
  screen.classList.remove('typing');
}

async function wipe() {
  const lines = screen.textContent.split('\n');
  while (lines.length > 0) {
    lines.shift();
    screen.textContent = lines.join('\n');
    await sleep(34);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
