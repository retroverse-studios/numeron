import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { TerminalCard } from '../components/TerminalCard';
import { VOICES, DEFAULT_AI_MODEL, aiReading } from '@numeron/core';

const inputClass = `w-full bg-transparent border border-[var(--border)] text-[var(--text-primary)]
  font-body px-3 py-2 min-h-[44px]
  focus:border-[var(--accent)] focus:outline-none transition-colors
  placeholder:text-[var(--text-secondary)] placeholder:opacity-40`;

export function Reading() {
  const { profiles, profileInput, activeSystem } = useStore();
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('numeron.aiKey') ?? '');
  const [model, setModel] = useState(DEFAULT_AI_MODEL);
  const [voice, setVoice] = useState('');
  const [customVoice, setCustomVoice] = useState('');
  const [emphasis, setEmphasis] = useState('');
  const [result, setResult] = useState<{ text: string; provenance: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (!profiles || !profileInput) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <p className="font-terminal text-sm text-[var(--text-secondary)]">
          {'> '}NO PROFILE LOADED
        </p>
        <Link
          to="/"
          className="inline-block font-terminal text-xs text-[var(--accent)] border border-[var(--accent)]
            px-4 py-2 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-colors"
        >
          [ ENTER DETAILS ]
        </Link>
      </div>
    );
  }

  const profile = profiles[activeSystem];

  const handleGenerate = () => {
    setBusy(true);
    setError('');
    const chosenVoice = voice === 'custom' ? customVoice || undefined : voice || undefined;
    aiReading(profile, {
      apiKey,
      model,
      voice: chosenVoice,
      emphasis: emphasis || undefined,
    })
      .then(setResult)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setBusy(false));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="font-terminal text-2xl text-[var(--accent)] text-glow">
        {'> '}AI READING
      </h1>

      <TerminalCard title="NETWORK NOTICE">
        <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
          This mode sends your profile numbers directly to Anthropic using your own
          API key — the <span className="text-[var(--accent)]">only</span> NUMERON
          feature that touches the network. The key is kept in this browser's local
          storage and goes nowhere else.
        </p>
      </TerminalCard>

      <TerminalCard title={`READING FOR ${profileInput.fullBirthName.toUpperCase()} // ${activeSystem.toUpperCase()}`}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="password"
              placeholder="sk-ant-… (your Anthropic API key)"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                localStorage.setItem('numeron.aiKey', e.target.value);
              }}
              className={inputClass}
            />
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              title="model id"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="block font-terminal text-xs tracking-widest text-[var(--text-secondary)]">
              VOICE
            </label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className={inputClass}
            >
              <option value="">house style (default)</option>
              {Object.entries(VOICES).map(([id, v]) => (
                <option key={id} value={id}>
                  {v.label}
                </option>
              ))}
              <option value="custom">✍️ custom…</option>
            </select>
            {voice === 'custom' && (
              <input
                placeholder='e.g. "a weary lighthouse keeper"'
                value={customVoice}
                onChange={(e) => setCustomVoice(e.target.value)}
                className={inputClass}
              />
            )}
          </div>

          <input
            placeholder='Optional emphasis, e.g. "focus on career" or "shorter"'
            value={emphasis}
            onChange={(e) => setEmphasis(e.target.value)}
            className={inputClass}
          />

          <button
            onClick={handleGenerate}
            disabled={busy || !apiKey}
            className="w-full border border-[var(--accent)] text-[var(--accent)] font-terminal
              text-sm tracking-widest py-3 min-h-[44px]
              hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-colors
              disabled:opacity-50 disabled:cursor-wait"
          >
            {busy ? '[ GENERATING... ]' : result ? '[ REGENERATE ]' : '[ GENERATE ]'}
          </button>

          {error && (
            <p className="font-terminal text-xs text-[var(--accent)]" role="alert">
              {'> '}{error}
            </p>
          )}
        </div>
      </TerminalCard>

      {result && (
        <TerminalCard title="THE READING">
          <div className="space-y-4">
            <div className="font-body text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
              {result.text}
            </div>
            <p className="text-xs italic text-[var(--text-secondary)] border border-[var(--border)] p-3">
              {result.provenance}
            </p>
          </div>
        </TerminalCard>
      )}
    </div>
  );
}
