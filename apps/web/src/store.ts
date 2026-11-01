import { create } from 'zustand';
import type { ProfileInput, NumerologyProfile, NumerologySystem, NarratorId } from '@numeron/core';
import { generateAllSystemProfiles, NARRATORS } from '@numeron/core';

type Theme = 'phosphor' | 'arcane' | 'high-contrast';

interface NumeronState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Narrator voice for the static interpretation texts
  narrator: NarratorId;
  setNarrator: (narrator: NarratorId) => void;

  // Accessibility
  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
  readableFont: boolean;
  setReadableFont: (v: boolean) => void;

  // Disclaimer
  disclaimerAcknowledged: boolean;
  acknowledgeDisclaimer: () => void;

  // Chaos mode (Konami code)
  chaosMode: boolean;
  activateChaosMode: () => void;

  // Profile
  profileInput: ProfileInput | null;
  profiles: Record<NumerologySystem, NumerologyProfile> | null;
  activeSystem: NumerologySystem;
  setActiveSystem: (s: NumerologySystem) => void;
  generateProfiles: (input: ProfileInput) => void;
  clearProfile: () => void;
}

const THEMES: Theme[] = ['phosphor', 'arcane', 'high-contrast'];

function storedTheme(): Theme {
  const s = localStorage.getItem('numeron-theme') as Theme | null;
  return s && THEMES.includes(s) ? s : 'phosphor';
}

function storedBool(key: string, fallback: boolean): boolean {
  const s = localStorage.getItem(key);
  return s === null ? fallback : s === 'true';
}

function applyPrefs(reduceMotion: boolean, readableFont: boolean) {
  document.documentElement.classList.toggle('reduce-motion', reduceMotion);
  document.documentElement.classList.toggle('font-readable', readableFont);
}

const initialTheme = storedTheme();
const initialReduceMotion = storedBool(
  'numeron-reduce-motion',
  typeof window !== 'undefined' &&
    (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false),
);
const initialReadableFont = storedBool('numeron-readable-font', false);
document.documentElement.setAttribute('data-theme', initialTheme);
applyPrefs(initialReduceMotion, initialReadableFont);

export const useStore = create<NumeronState>((set) => ({
  theme: initialTheme,
  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('numeron-theme', theme);
    set({ theme });
  },

  narrator: (() => {
    const stored = localStorage.getItem('numeron-narrator') as NarratorId | null;
    return stored && (stored === 'plain' || stored in NARRATORS) ? stored : 'plain';
  })(),
  setNarrator: (narrator) => {
    localStorage.setItem('numeron-narrator', narrator);
    set({ narrator });
  },

  reduceMotion: initialReduceMotion,
  setReduceMotion: (v) => {
    document.documentElement.classList.toggle('reduce-motion', v);
    localStorage.setItem('numeron-reduce-motion', String(v));
    set({ reduceMotion: v });
  },

  readableFont: initialReadableFont,
  setReadableFont: (v) => {
    document.documentElement.classList.toggle('font-readable', v);
    localStorage.setItem('numeron-readable-font', String(v));
    set({ readableFont: v });
  },

  chaosMode: false,
  activateChaosMode: () => set({ chaosMode: true }),

  disclaimerAcknowledged: localStorage.getItem('numeron-disclaimer') === 'true',
  acknowledgeDisclaimer: () => {
    localStorage.setItem('numeron-disclaimer', 'true');
    set({ disclaimerAcknowledged: true });
  },

  profileInput: null,
  profiles: null,
  activeSystem: 'pythagorean',
  setActiveSystem: (s) => set({ activeSystem: s }),

  generateProfiles: (input) => {
    const profiles = generateAllSystemProfiles(input);
    set({ profileInput: input, profiles });
  },

  clearProfile: () => set({ profileInput: null, profiles: null }),
}));
