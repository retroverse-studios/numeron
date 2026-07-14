/**
 * The resonance scope — NUMERON's answer to ASTRON's synastry bouquet.
 * Two Life Paths become waveforms on a CRT oscilloscope; the bright trace
 * is their sum. Matching frequencies phase-lock into a clean wave, mismatched
 * ones beat against each other. Shared numbers appear as resonance markers,
 * traditional tension pairs as interference bursts. Fully deterministic:
 * the same two people always draw the same picture.
 *
 * The scope is a mood, not a measurement — no score is computed, on purpose.
 */

const W = 400;
const H = 170;
const MID = 92;
const AMP = 34;
const SAMPLES = 240;

/** Deterministic jitter in [0,1) — the picture must not change between renders. */
const jitter = (i: number, salt: number): number =>
  (((i + 1) * 7919 + salt * 104729) % 997) / 997;

/** Map a life path value (1–9, 11, 22, 33) to a cycle count that fits the screen. */
const cycles = (value: number): number => ((value - 1) % 9) + 1;

const fmt = (n: number): string => (Math.round(n * 100) / 100).toString();

function wavePoints(freq: number, amp: number, phase: number): string {
  const pts: string[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const x = (i / SAMPLES) * W;
    const y = MID - amp * Math.sin((2 * Math.PI * freq * i) / SAMPLES + phase);
    pts.push(`${fmt(x)},${fmt(y)}`);
  }
  return pts.join(' ');
}

function compositePoints(f1: number, f2: number): { points: string; yAt: (x: number) => number } {
  const yAt = (x: number): number => {
    const t = x / W;
    const s = (Math.sin(2 * Math.PI * f1 * t) + Math.sin(2 * Math.PI * f2 * t)) / 2;
    return MID - AMP * s;
  };
  const pts: string[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const x = (i / SAMPLES) * W;
    pts.push(`${fmt(x)},${fmt(yAt(x))}`);
  }
  return { points: pts.join(' '), yAt };
}

/** A jagged vertical static burst at x — interference from a tension pair. */
function glitchPath(x: number, seed: number): string {
  const parts: string[] = [`M ${fmt(x)} ${MID - AMP - 6}`];
  const steps = 7;
  for (let s = 1; s <= steps; s++) {
    const gx = x + (jitter(seed, s) - 0.5) * 14;
    const gy = MID - AMP - 6 + ((AMP * 2 + 12) * s) / steps;
    parts.push(`L ${fmt(gx)} ${fmt(gy)}`);
  }
  return parts.join(' ');
}

interface ResonanceScopeProps {
  lifePath1: number;
  lifePath2: number;
  sharedNumbers: number[];
  tensionNumbers: number[];
}

export function ResonanceScope({
  lifePath1,
  lifePath2,
  sharedNumbers,
  tensionNumbers,
}: ResonanceScopeProps) {
  const f1 = cycles(lifePath1);
  const f2 = cycles(lifePath2);
  const composite = compositePoints(f1, f2);
  const phaseLocked = f1 === f2;

  return (
    <div className="space-y-3">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Resonance scope: life paths ${lifePath1} and ${lifePath2} drawn as interfering waveforms`}
        className="w-full border border-[var(--border)]"
      >
        {/* scope graticule */}
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={((i + 1) * W) / 10}
            y1="0"
            x2={((i + 1) * W) / 10}
            y2={H}
            stroke="var(--border)"
            strokeWidth="0.5"
            opacity="0.4"
          />
        ))}
        {[MID - AMP, MID, MID + AMP].map((y) => (
          <line
            key={`h${y}`}
            x1="0"
            y1={y}
            x2={W}
            y2={y}
            stroke="var(--border)"
            strokeWidth="0.5"
            opacity="0.4"
          />
        ))}

        {/* channel labels */}
        <text x="8" y="16" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">
          CH1: LIFE PATH {lifePath1}
        </text>
        <text x="8" y="28" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">
          CH2: LIFE PATH {lifePath2}
        </text>
        <text
          x={W - 8}
          y="16"
          fontSize="9"
          fill="var(--accent-green)"
          fontFamily="monospace"
          textAnchor="end"
        >
          {phaseLocked ? 'PHASE LOCK' : 'BEAT PATTERN'}
        </text>

        {/* the two channels, faint */}
        <polyline
          points={wavePoints(f1, AMP * 0.55, 0)}
          fill="none"
          stroke="var(--accent-green)"
          strokeWidth="0.8"
          opacity="0.35"
        />
        <polyline
          points={wavePoints(f2, AMP * 0.55, Math.PI / 2)}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.8"
          opacity="0.35"
        />

        {/* composite trace with glow */}
        <polyline
          points={composite.points}
          fill="none"
          stroke="var(--accent-green)"
          strokeWidth="4"
          opacity="0.18"
        />
        <polyline
          points={composite.points}
          fill="none"
          stroke="var(--accent-green)"
          strokeWidth="1.4"
        />

        {/* interference bursts — traditional tension pairs */}
        {tensionNumbers.map((t) => (
          <g key={`t${t}`}>
            <path
              d={glitchPath((t * W) / 10, t)}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.2"
              opacity="0.85"
            />
            <text
              x={(t * W) / 10}
              y={MID + AMP + 20}
              fontSize="9"
              fill="var(--accent)"
              fontFamily="monospace"
              textAnchor="middle"
            >
              ✶{t}
            </text>
          </g>
        ))}

        {/* resonance markers — numbers both profiles share */}
        {sharedNumbers.map((n) => {
          const x = (n * W) / 10;
          const y = composite.yAt(x);
          return (
            <g key={`s${n}`}>
              <circle cx={x} cy={fmt(y)} r="7" fill="var(--accent-green)" opacity="0.2" />
              <rect
                x={x - 3}
                y={y - 3}
                width="6"
                height="6"
                transform={`rotate(45 ${x} ${fmt(y)})`}
                fill="var(--accent-green)"
              />
              <text
                x={x}
                y={MID + AMP + 20}
                fontSize="9"
                fill="var(--accent-green)"
                fontFamily="monospace"
                textAnchor="middle"
              >
                ◆{n}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="font-terminal text-xs text-[var(--text-secondary)] flex flex-wrap gap-x-6 gap-y-1">
        <span>
          <span className="text-[var(--accent-green)]">◆</span> resonance — a number both
          profiles share
        </span>
        <span>
          <span className="text-[var(--accent)]">✶</span> interference — a traditional
          tension pairing
        </span>
      </div>
      <p className="text-xs italic text-[var(--text-secondary)]">
        The scope is a mood, not a measurement. Matching frequencies lock; different ones
        just make a more interesting waveform.
      </p>
    </div>
  );
}
