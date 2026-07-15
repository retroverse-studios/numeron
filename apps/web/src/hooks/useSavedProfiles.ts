import type { ProfileInput } from '@numeron/core';
import { useEffect, useState } from 'react';

export interface SavedProfile {
  id: string;
  /** Display label — defaults to "Name — DOB", editable on save and in the overlay. */
  label: string;
  input: ProfileInput;
}

const KEY = 'numeron-profiles';

/**
 * Identity of a saved chart: the full input, not the display label. Two people
 * with the same name but different birth dates (or one person with different
 * preferred name / address) produce different signatures and coexist.
 */
export function profileSignature(input: ProfileInput): string {
  return [
    input.fullBirthName.trim().toLowerCase(),
    input.dateOfBirth,
    (input.preferredName ?? '').trim().toLowerCase(),
    (input.address ?? '').trim().toLowerCase(),
  ].join('|');
}

/** Default label for a chart: "Full Name — YYYY-MM-DD". */
export function defaultLabel(input: ProfileInput): string {
  return `${input.fullBirthName} — ${input.dateOfBirth}`;
}

function load(): SavedProfile[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as SavedProfile[];
  } catch {
    return [];
  }
}

/** Saved profile inputs, kept in localStorage (works in browser and Tauri). */
export function useSavedProfiles() {
  const [profiles, setProfiles] = useState<SavedProfile[]>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(profiles));
  }, [profiles]);

  return {
    profiles,
    save(label: string, input: ProfileInput): SavedProfile {
      const sig = profileSignature(input);
      const existing = profiles.find((x) => profileSignature(x.input) === sig);
      const saved: SavedProfile = { id: existing?.id ?? crypto.randomUUID(), label, input };
      // Update the entry with the same input signature, otherwise append.
      // Distinct inputs (same name, different DOB) never clobber each other.
      setProfiles((p) => [...p.filter((x) => profileSignature(x.input) !== sig), saved]);
      return saved;
    },
    rename(id: string, label: string) {
      setProfiles((p) => p.map((x) => (x.id === id ? { ...x, label } : x)));
    },
    remove(id: string) {
      setProfiles((p) => p.filter((x) => x.id !== id));
    },
  };
}
