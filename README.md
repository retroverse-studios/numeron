# NUMERON

> *The Ancient Science of Numbers, Decoded.*

NUMERON is a numerology exploration tool built for curiosity, entertainment, and a little self-reflection — wrapped in a retro-terminal / phosphor-CRT aesthetic. It is honest about what numerology is (a rich cultural and symbolic tradition, not a predictive science), shows where the different systems contradict each other, and explains the Barnum effect by name.

**Live app:** [numeron.retroverse.studio](https://numeron.retroverse.studio)

A [Retroverse Studios](https://retroverse.studio) project.

## What it does

- **Full numerology profile** — Life Path, Expression, Soul Urge, Personality, Maturity, Personal Year/Month/Day, house number, karma debt, and master numbers, each with every reduction step shown, not just the final number
- **Five systems side-by-side** — Pythagorean, Chaldean, Kabbalistic (Gematria), Lo Shu/Vedic, and Abjad, displayed together so their contradictions are visible (most apps pick one and hide the inconsistency)
- **Three-lens interpretations** — every number is read through LIGHT (strengths), TRUTH (neutral archetype), and SHADOW (blind spots) lenses, not just positive affirmations
- **Decode Mode** — paste any text and get its numerological fingerprint, word-by-word heatmap, and dominant numbers
- **Compatibility** — two profiles side-by-side (*please do not break up with anyone over this*)
- **Reverse lookup** — "what name would give me a Life Path 7?"
- **Personal calendar** — personal day numbers for the month, colour-coded
- **Constants & Patterns Explorer** — digit-sum reductions of scientific constants (with honestly-labelled cherry-picking), magic squares (Lo Shu, Dürer, Agrippa), the Fibonacci mod-9 clock, a sudoku "pure-9" analyser, Kaprekar's constant, and the 3-6-9 doubling cycles
- **PDF report** — a printable, vintage-broadsheet-style report with a plain-language disclaimer on every page
- **Easter eggs** — try address `42`, or the Konami code

### Intellectual honesty, as a feature

NUMERON never says "your destiny is…" — it says "in this tradition…". The About page explains what numerology is, why it isn't predictive, and how the Barnum effect makes vague positive statements feel personal. The maths is real; the meaning is ours. This framing is what makes the app fun rather than credulous.

## Structure

pnpm workspace monorepo:

```
numeron/
├── packages/
│   ├── core/       # Numerology engine — pure TypeScript, no UI deps, fully tested
│   └── pdf/        # PDF report templates (@react-pdf/renderer)
├── apps/
│   ├── web/        # React + Vite web app (Tailwind, Zustand, React Router)
│   └── desktop/    # Electron wrapper (electron-vite, auto-update via GitHub Releases)
└── landing/        # Static landing page (digit-rain hero, download links)
```

## Development

Prerequisites: Node.js ≥ 18, pnpm ≥ 9.

```bash
git clone https://github.com/retroverse-studios/numeron.git
cd numeron
pnpm install

# Web app
pnpm --filter @numeron/web dev

# Desktop app
pnpm --filter numeron-desktop dev

# Landing page
pnpm --filter @numeron/landing dev
```

Common tasks:

```bash
pnpm test        # run all tests (Vitest)
pnpm build       # build all packages and apps
pnpm lint        # ESLint
pnpm typecheck   # TypeScript, strict mode
pnpm format      # Prettier
```

Desktop builds and releases are automated via GitHub Actions (`.github/workflows/release.yml`) — push a version tag and `electron-builder` publishes Windows/macOS/Linux artefacts to GitHub Releases, which the app's auto-updater consumes.

## Privacy

No backend, no accounts, no data leaves the browser. Profiles are calculated client-side; sharing encodes the profile into the URL itself. The desktop app persists your profile locally, and the PDF is generated on your machine.

## Full specification

The complete product spec — engine design, cultural context content, disclaimer system, accessibility requirements, easter eggs — lives in [NUMERON_SPEC.md](NUMERON_SPEC.md).

## Disclaimer

NUMERON is for entertainment and cultural exploration only. Numerology has no scientific basis and no demonstrated predictive validity. Digit sums are fun. They are not destiny.

## License

MIT — see [LICENSE](LICENSE).
