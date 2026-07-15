import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TerminalCard } from '../components/TerminalCard';
import { useStore } from '../store';
import { sanitizeName, sanitizeDate, sanitizeAddress } from '@numeron/core';
import { detectEdgeCases } from '../hooks/useEdgeCases';
import { useSavedProfiles, type SavedProfile } from '../hooks/useSavedProfiles';

const inputClass = `w-full bg-transparent border border-[var(--border)] text-[var(--text-primary)]
  font-body px-3 py-2 min-h-[44px]
  focus:border-[var(--accent)] focus:outline-none transition-colors
  placeholder:text-[var(--text-secondary)] placeholder:opacity-40`;

export function Dashboard() {
  const navigate = useNavigate();
  const { generateProfiles } = useStore();
  const savedProfiles = useSavedProfiles();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [address, setAddress] = useState('');
  const [showOptional, setShowOptional] = useState(false);
  const [saveLabel, setSaveLabel] = useState('');
  const [error, setError] = useState('');

  /** Read the form, validating name and date. Returns null (and sets error) on failure. */
  const readInput = () => {
    setError('');

    const cleanName = sanitizeName(name);
    if (!cleanName) {
      setError('> NAME REQUIRED');
      return null;
    }

    // Check symbols-only
    if (!/[a-zA-Z0-9]/.test(cleanName)) {
      setError('> No valid letters detected. Nothing to calculate.');
      return null;
    }

    const cleanDate = sanitizeDate(dob);
    if (!cleanDate) {
      setError('> VALID DATE REQUIRED (YYYY-MM-DD)');
      return null;
    }

    return {
      fullBirthName: cleanName,
      dateOfBirth: cleanDate,
      preferredName: preferredName ? sanitizeName(preferredName) : undefined,
      address: address ? sanitizeAddress(address) : undefined,
    };
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const input = readInput();
    if (!input) return;
    generateProfiles(input);
    navigate('/profile');
  };

  const handleSave = () => {
    const input = readInput();
    if (!input) return;
    const trimmed = saveLabel.trim();
    savedProfiles.save(trimmed || input.fullBirthName, input);
    setSaveLabel('');
  };

  const loadProfile = (p: SavedProfile) => {
    setError('');
    setName(p.input.fullBirthName);
    setDob(p.input.dateOfBirth);
    setPreferredName(p.input.preferredName ?? '');
    setAddress(p.input.address ?? '');
    if (p.input.preferredName || p.input.address) setShowOptional(true);
  };

  // Live edge case warnings
  const liveInput = {
    fullBirthName: name,
    dateOfBirth: dob || '2000-01-01',
    preferredName: preferredName || undefined,
    address: address || undefined,
  };
  const warnings = name.length > 2 || dob ? detectEdgeCases(liveInput) : [];

  return (
    <div className="crt-flicker max-w-2xl mx-auto space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4 py-8 sm:py-12">
        <h1 className="font-terminal text-4xl sm:text-6xl text-[var(--accent)] text-glow tracking-wider">
          NUMERON
        </h1>
        <p className="font-body text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          The Ancient Science of Numbers, Decoded.
        </p>
        <p className="font-body text-xs text-[var(--text-secondary)] opacity-60">
          Five traditions. Three lenses. Zero predictions.
        </p>
      </div>

      {/* Profile form */}
      <TerminalCard title="BEGIN READING">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Load a saved profile */}
          {savedProfiles.profiles.length > 0 && (
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-4">
              <label htmlFor="load-profile" className="font-terminal text-xs text-[var(--text-secondary)]">
                {'> '}LOAD
              </label>
              <select
                id="load-profile"
                value=""
                onChange={(e) => {
                  const p = savedProfiles.profiles.find((x) => x.id === e.target.value);
                  if (p) loadProfile(p);
                }}
                className={inputClass + ' flex-1 min-h-[36px] py-1'}
              >
                <option value="">saved profiles…</option>
                {savedProfiles.profiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
              <select
                value=""
                aria-label="Delete a saved profile"
                title="Delete a saved profile"
                onChange={(e) => {
                  if (e.target.value) savedProfiles.remove(e.target.value);
                }}
                className={inputClass + ' w-16 min-h-[36px] py-1'}
              >
                <option value="">✕</option>
                {savedProfiles.profiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    delete {p.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Full birth name */}
          <div>
            <label
              htmlFor="name"
              className="block font-terminal text-xs text-[var(--text-secondary)] mb-1"
            >
              {'> '}FULL BIRTH NAME
              <span className="animate-cursor-blink ml-1">_</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="As on birth certificate. Works for pets too."
              className={inputClass}
              autoComplete="name"
              maxLength={200}
            />
          </div>

          {/* Date of birth */}
          <div>
            <label
              htmlFor="dob"
              className="block font-terminal text-xs text-[var(--text-secondary)] mb-1"
            >
              {'> '}DATE OF BIRTH
            </label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Optional fields toggle */}
          <button
            type="button"
            onClick={() => setShowOptional(!showOptional)}
            className="font-terminal text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            {'> '}{showOptional ? 'HIDE' : 'SHOW'} OPTIONAL FIELDS
          </button>

          {showOptional && (
            <>
              {/* Preferred name */}
              <div>
                <label
                  htmlFor="preferredName"
                  className="block font-terminal text-xs text-[var(--text-secondary)] mb-1"
                >
                  {'> '}PREFERRED NAME / NICKNAME
                </label>
                <input
                  id="preferredName"
                  type="text"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                  placeholder="What people call you"
                  className={inputClass}
                  maxLength={200}
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block font-terminal text-xs text-[var(--text-secondary)] mb-1"
                >
                  {'> '}STREET ADDRESS
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street number needed for house calculation"
                  className={inputClass}
                  maxLength={300}
                />
              </div>
            </>
          )}

          {/* Edge case warnings */}
          {warnings.length > 0 && (
            <div className="space-y-1">
              {warnings.map((w, i) => (
                <p key={i} className="font-terminal text-xs text-[var(--text-secondary)] italic">
                  {w.message}
                </p>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="font-terminal text-xs text-[var(--accent)]" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full border border-[var(--accent)] text-[var(--accent)] font-terminal
              text-sm tracking-widest py-3 min-h-[44px]
              hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-colors"
          >
            [ CALCULATE ]
          </button>

          {/* Save this profile for next time */}
          <div className="flex gap-2 pt-2 border-t border-[var(--border)]">
            <input
              type="text"
              value={saveLabel}
              onChange={(e) => setSaveLabel(e.target.value)}
              placeholder="label to save as (defaults to the name)"
              className={inputClass + ' text-sm'}
              maxLength={80}
            />
            <button
              type="button"
              onClick={handleSave}
              className="border border-[var(--border)] text-[var(--text-secondary)] font-terminal
                text-xs tracking-widest px-4 min-h-[44px] whitespace-nowrap
                hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              [ SAVE ]
            </button>
          </div>
        </form>
      </TerminalCard>

      {/* Feature hints */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            title: 'FIVE SYSTEMS',
            desc: 'Pythagorean, Chaldean, Kabbalistic, Lo Shu, Abjad — shown together',
          },
          { title: 'THREE LENSES', desc: 'Light, Truth, Shadow — not just the positive spin' },
          { title: 'HONEST FRAMING', desc: 'We explain the Barnum effect. By name.' },
        ].map((f) => (
          <TerminalCard key={f.title} title={f.title} glowOnHover={false}>
            <p className="font-body text-xs text-[var(--text-secondary)]">{f.desc}</p>
          </TerminalCard>
        ))}
      </div>
    </div>
  );
}
