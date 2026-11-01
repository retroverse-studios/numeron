# NUMERON — Full Code Audit

Date: 2026-11-01 · Scope: `packages/core`, `packages/pdf`, `apps/web`,
`apps/tauri`, `apps/desktop` (Electron), `landing/`, workflows.
Baseline: core tests 176/176 pass; typecheck clean for core/pdf/web;
**root `pnpm build` and `pnpm typecheck` fail on the Electron app**;
`pnpm lint` fails (231 prettier/style problems); `pnpm audit --prod` reports
22 vulnerabilities (12 high). Live site 200; latest release v0.1.6 (Tauri).

Severity: **High** = broken/misleading core behaviour or real exposure ·
**Medium** = wrong results, divergence, missing wiring ·
**Low** = dead code, polish, defence-in-depth.

---

## High

### H1. The Electron app (`apps/desktop`) is abandoned and breaks every root command
The shipped desktop app is Tauri (`apps/tauri`, v0.1.6, signed updater), but
the Electron wrapper remains in the workspace: its build fails (Rollup
resolution), its typecheck fails (`ElectronStore` has no `get`/`set` against
the installed typings), so root `pnpm build`, `pnpm typecheck`, and
`pnpm test` all fail. It also drags electron-builder's dependency tree
(`fast-uri`, `js-yaml`, `builder-util-runtime` — most of the 12 high-severity
audit findings) into the repo. README and `NUMERON_SPEC.md` still describe
Electron/electron-updater as the desktop story. Fix (decision): delete
`apps/desktop` and correct the docs, or explicitly resurrect it. Deleting is
recommended — Tauri releases are what's published.

### H2. Share links are fragile: raw `btoa(JSON)` in a URL path
`Profile.tsx` builds share URLs as `btoa(JSON.stringify(profileInput))`
embedded in `/share/:encoded`:
- Base64 output can contain `/`, which splits the route segment — such links
  404 for some names/dates (content-dependent, looks random to users).
- `btoa` throws `InvalidCharacterError` on any character outside Latin-1
  (curly apostrophes, CJK, emoji in names) — the SHARE button silently does
  nothing (no try/catch).
Fix: add `encodeSharePayload` in core (UTF-8-safe, base64url), make
`parseSharePayload` accept base64url + UTF-8 while still accepting legacy
links, and use it from the Profile page.

### H3. Lo Shu and Abjad profiles display "Soul Urge 0 / Personality 0"
Those systems don't define soul-urge/personality calculations, so
`generateProfile` fills `reduceNumber(0, system)`. The Profile page renders
full SOUL URGE and PERSONALITY cards showing a glowing `0` with reduction
steps `["0"]` and no explanation — presenting a non-number as a result. The
AI payload also includes these as `undefined`-interpretation entries. Fix:
model them as optional in `NumerologyProfile` (or keep the fields and have
the UI/PDF hide cards when the system doesn't define them, with a one-line
"not part of this tradition" note).

## Medium

### M1. Accented letters are silently dropped from every name calculation
Pythagorean/Chaldean/Kabbalistic letter loops test `/[A-Z]/` after
`toUpperCase()`, so `É`, `Ñ`, `Ü`, `Ç` vanish entirely: "José" scores as
"Jos", "Zoë" loses its final vowel (including from Soul Urge). The edge-case
warning only says "unsupported characters are skipped" for non-Latin scripts;
accented Latin is the common case for real names. Fix: NFD-normalize and
strip combining marks before mapping (é→E, ñ→N) in all Latin-table systems,
and adjust the warning copy.

### M2. Karma-debt detection string-matches reduction steps (false positives)
`detectKarmaDebt` scans step text for `= 13` etc. A name sum of `131` renders
as `... = 131`, which *contains* `= 13` — a spurious karma-debt 13 (same for
140–149→14, 160–169→16, 19x→19). Long names (>~15 letters) hit this range
easily. Fix: anchor the match (`/= (13|14|16|19)(?!\d)/` or compare parsed
trailing numbers); add a regression test with a name summing to 131.

### M3. No CI gate: the Pages workflow never runs tests or typechecks
`.github/workflows/pages.yml` builds core (tsc), web (vite only — no `tsc`),
and landing, then deploys. The 176 core tests and web typecheck never run in
CI, so a broken engine or type error ships silently. There is no PR workflow
at all. Fix: add a `ci.yml` (typecheck + test + build on push/PR, excluding
or including the desktop app per H1) and gate Pages on it.

### M4. Anthropic API key is written to `localStorage` on every keystroke
`Reading.tsx` persists the key immediately and permanently, with no
"remember" choice and no way to clear it except deleting the text (which
stores `''`). ASTRON's audit adopted session-only by default with opt-in
remember; apply the same pattern here for consistency. Fix (decision):
session-only by default + opt-in remember checkbox + forget button.

### M5. No CSP on web; `csp: null` on Tauri
The web app has no Content-Security-Policy anywhere; the Tauri config
explicitly disables it. The app renders user-supplied names/text and an
LLM response (all through React escaping today, but CSP is the safety net —
and the API key sits in storage where any future XSS could read it). Fix:
build-injected CSP for web (needs `connect-src https://api.anthropic.com`)
and a matching Tauri CSP.

### M6. Unvalidated saved-profiles storage can crash the Dashboard/Profile
`useSavedProfiles.load()` casts `JSON.parse(localStorage)` straight to
`SavedProfile[]`. A malformed entry (older schema, hand-edited) makes
`profileSignature` throw on `input.fullBirthName.trim()` during render.
Fix: validate entries on load with the existing sanitizers, drop invalid.

### M7. Reverse Lookup "how to reach 11/22/33" lists mostly wrong sums
For master-number targets it lists `target, target+9, target+18…`, but e.g.
20, 101, 110 reduce to 2 — only sums whose reduction *passes through* the
master number (29→11, 38→11, 119→11) actually yield 11. For single-digit
targets the +9 ladder is correct (digital root). Fix: compute the list by
actually running `reduceNumber` over candidate sums.

## Low

### L1. Lint/format gate is red repo-wide (231 problems)
Almost all `prettier/prettier` formatting errors — the codebase was never
run through `pnpm format`. Fix: one `eslint --fix` + `prettier --write`
pass, then let M3's CI keep it green (or drop prettier from ESLint and rely
on `format:check`; currently both exist and neither is enforced).

### L2. Web loads Google Fonts despite the "no data leaves the browser" claim
Desktop bundles `@fontsource` fonts; web uses `fonts.googleapis.com`.
Font requests disclose IP/UA to Google. Fix: move the fontsource imports
into the web entry (deps already in the repo) and drop the `<link>` tags.

### L3. Stale docs and version strings
- README: "Desktop app — Electron wrapper (electron-vite, auto-update…)";
  structure tree has no `apps/tauri`.
- `NUMERON_SPEC.md` §14 references `electron-updater`.
- Web footer hardcodes `NUMERON v0.1.0` (current release v0.1.6).
Fix alongside H1.

### L4. Clipboard calls are unguarded
`navigator.clipboard.writeText(...).then(...)` in `Profile.tsx` (share) and
`NumberDisplay.tsx` (copy) has no `.catch`; on insecure contexts
`navigator.clipboard` is `undefined` and the click throws. Fix: optional
chaining + catch with status feedback.

### L5. Theme & accessibility preferences reset on every load
`narrator` and disclaimer persist to `localStorage`, but `theme`,
`reduceMotion`, and `readableFont` in the Zustand store do not — the very
users who need reduced motion/readable font must re-enable them each visit.
(The OS `prefers-reduced-motion` is also not consulted for the default.)
Fix: persist all four; seed `reduceMotion` from `matchMedia`.

### L6. No catch-all route
Unknown paths render an empty `<main>` (Nav + footer, blank body). Add a
`path="*"` route in the same "NO PROFILE LOADED" style.

### L7. Personal timing uses the UTC date
`generateProfile` defaults `today` via `toISOString()` (UTC), so Personal
Day flips at UTC midnight, not local midnight — wrong for most users for a
few hours a day. Calendar page already works in local dates. Fix: derive
today from local Y/M/D.

### L8. Landing download note uses `innerHTML` with API data
`landing/src/downloads.js` interpolates the GitHub release `tag_name` into
`innerHTML`. Own-repo data, but the pattern is one crafted tag away from
script injection on the marketing page. Fix: build the nodes with
`textContent`/DOM APIs.

### L9. Reverse Lookup match border uses the wrong result in date mode
The result card's green border keys off `isMatch`, computed from an
*expression* calculation run on the date string, while the text uses the
real Life Path match. Compute one result value per mode and use it for both.

### L10. PDF always reports the Pythagorean profile, unlabelled
`Report`/PDF use `profiles.pythagorean` regardless of the active system tab.
Reasonable (spec puts other systems in a comparison table), but the Report
page doesn't say so. Add one line of copy.

### L11. Audit noise beyond Electron
`react-router`/`@remix-run/router` moderate advisories — `pnpm update`
within range once H1 lands; re-run `pnpm audit` to confirm what remains.

---

## Verified good (checked, no action)
- No `dangerouslySetInnerHTML`; user text renders escaped; share payloads
  and form inputs pass through engine-boundary sanitizers incl. strict date
  validation (leap-year-safe component comparison).
- AI mode: BYO key straight to Anthropic, `buildReadingPrompt` exported for
  transparency, payload contains numbers only (no name/DOB sent), honest
  network notice in UI.
- Engine core math spot-checked vs tests: 176 passing, incl. master-number
  and karma-debt suites (M2 is an uncovered range, not a wrong rule).
- Life Path component reduction, personal year/month/day chaining, and
  master-stop behaviour match NUMERON_SPEC §15's stated rules.
- Tauri updater: signed (minisign pubkey), GitHub `latest.json` endpoint,
  consent dialog, offline-tolerant; release workflow publishes draft-first.
- Desktop shares web source via alias (no forked copy); PWA precache builds.
- Saved-profile identity is input-signature based (same-name different-DOB
  profiles coexist) with a single hook instance per page.
- Live site and `/app/` 200; v0.1.6 release + Pages runs green.

## Suggested fix order
H1 decision → H2 share encoding → M1 diacritics → M2 karma regex → H3
optional soul/personality → M6 storage validation → M5 CSP (web+Tauri) →
M4 key storage → M7 reverse-lookup sums → M3 CI → L-sweep (format pass,
fonts, docs, guards, persistence, 404, UTC date, landing DOM).

---

## Resolution (2026-11-01)

Fixed in this pass (user approved: everything incl. Low; delete Electron;
session-only API key with opt-in remember):

- **H1** `apps/desktop` (Electron) deleted; README corrected; NUMERON_SPEC
  gained a supersession note. Root build/typecheck/test green again.
- **H2** `encodeSharePayload` in core (UTF-8 + base64url); decoder accepts
  legacy links; Profile uses it; regression tests incl. a 200-payload sweep.
- **H3** `soulUrge`/`personality` are now optional in `NumerologyProfile`;
  Lo Shu/Abjad omit them; Profile shows a "not part of this tradition" card;
  compare tables already rendered `—`.
- **M1** `toLatinUpper` (NFD + diacritic strip) applied in Pythagorean,
  Chaldean, Kabbalistic, Lo Shu name paths; tests for José/Zoë/Ñoño/Renée.
- **M2** Karma detection anchored (`= 13(?!\d)`); 131-sum regression test.
- **M3** New `ci.yml` (lint + typecheck + test + builds incl. Tauri
  frontend). Correction to the finding: the web build script is
  `tsc && vite build`, so Pages did typecheck the web app — but the test
  suite never ran in CI; it does now.
- **M4** API key session-only by default, opt-in "remember on this device",
  forget button; copy updated.
- **M5** Build-injected CSP for web and Tauri frontends (Anthropic
  `connect-src` allowed), matching Tauri `tauri.conf.json` CSP.
- **M6** Saved profiles validated on load; malformed entries dropped.
- **M7 + L9** Reverse Lookup sums computed with the real reducer; one
  candidate result per mode drives both text and match styling.
- **L1** `eslint --fix` pass (231 → 0); landing browser globals and `._*`
  ignores added to the flat config so it stays green.
- **L2** Web fonts bundled via `@fontsource` (same set as desktop);
  Google Fonts links removed.
- **L3** README/spec/footer updated (footer version string dropped).
- **L4** Clipboard guarded with fallback status text.
- **L5** Theme/reduce-motion/readable-font persist; reduced motion seeded
  from the OS preference; store applies the saved theme on load.
- **L6** Catch-all 404 route.
- **L7** Personal timing defaults to the local calendar date.
- **L8** Landing hero note built with DOM APIs.
- **L10** Report page states detailed readings are Pythagorean.
- **L11** `react-router-dom` upgraded 6 → 7.18; `pnpm audit --prod` clean
  (was 22 findings / 12 high).
- Bonus: PWA no longer precaches the 1.6 MB PDF chunk (runtime-cached on
  first use); vitest excludes exFAT `._*` sidecars.

Verification: `pnpm -r typecheck` clean · core tests 184/184 (8 new) ·
`pnpm lint` clean · web/landing/Tauri-frontend builds clean with CSP meta
in output and zero Google Fonts references · `cargo check` clean.
