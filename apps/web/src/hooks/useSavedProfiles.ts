import type { ProfileInput } from '@numeron/core';
import { useEffect, useState } from 'react';

export interface SavedProfile {
  id: string;
  /** Display label — defaults to the birth name, editable on save. */
  label: string;
  input: ProfileInput;
}

const KEY = 'numeron-profiles';

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
      const saved = { id: crypto.randomUUID(), label, input };
      // Replace any existing entry under the same label, like ASTRON's people list.
      setProfiles((p) => [...p.filter((x) => x.label !== label), saved]);
      return saved;
    },
    remove(id: string) {
      setProfiles((p) => p.filter((x) => x.id !== id));
    },
  };
}
