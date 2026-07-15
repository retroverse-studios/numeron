import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { TerminalCard } from '../components/TerminalCard';
import { NumberDisplay } from '../components/NumberDisplay';
import { SystemCompare } from '../components/SystemCompare';
import { EasterEggDisplay } from '../components/EasterEggDisplay';
import { SessionStatsDisplay } from '../components/SessionStats';
import { DidYouKnow } from '../components/DidYouKnow';
import { detectEasterEggs } from '../hooks/useEasterEggs';
import { useSavedProfiles, defaultLabel } from '../hooks/useSavedProfiles';
import { LoadProfileOverlay } from '../components/LoadProfileOverlay';
import { microDisclaimers, generateSessionStats } from '@numeron/core';

export function Profile() {
  const { profiles, activeSystem, setActiveSystem, profileInput } = useStore();
  const savedProfiles = useSavedProfiles();
  const [statusMsg, setStatusMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveLabel, setSaveLabel] = useState('');
  const [showLoad, setShowLoad] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);

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
  const systems = ['pythagorean', 'chaldean', 'kabbalistic', 'loshu', 'abjad'] as const;
  const systemLabels = {
    pythagorean: 'Pythagorean',
    chaldean: 'Chaldean',
    kabbalistic: 'Kabbalistic',
    loshu: 'Lo Shu',
    abjad: 'Abjad',
  };

  const easterEggs = detectEasterEggs(profileInput, profile);
  const sessionStats = generateSessionStats(profiles);

  const flashStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const startSave = () => {
    setSaveLabel(defaultLabel(profileInput));
    setSaving(true);
  };

  const commitSave = () => {
    const label = saveLabel.trim() || defaultLabel(profileInput);
    // De-duped by input signature: distinct name+DOB coexist, identical updates.
    savedProfiles.save(label, profileInput);
    setSaving(false);
    flashStatus('> SAVED');
  };

  const handlePdf = async () => {
    setPdfBusy(true);
    try {
      // Loaded on demand so the heavy PDF renderer stays out of the page bundle.
      const [{ pdf }, { NumeronReport }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@numeron/pdf'),
      ]);
      const today = new Date().toISOString().split('T')[0];
      const blob = await pdf(
        <NumeronReport input={profileInput} profiles={profiles} generatedDate={today} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NUMERON-${profileInput.fullBirthName.replace(/\s+/g, '-')}-${today}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation failed:', err);
      flashStatus('> PDF FAILED');
    } finally {
      setPdfBusy(false);
    }
  };

  const handleShare = () => {
    const encoded = btoa(JSON.stringify(profileInput));
    const url = new URL(
      `${import.meta.env.BASE_URL}share/${encoded}`,
      window.location.origin,
    ).toString();
    navigator.clipboard.writeText(url).then(() => {
      flashStatus('> SHARE URL COPIED');
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {showLoad && (
        <LoadProfileOverlay
          profiles={savedProfiles.profiles}
          onRename={savedProfiles.rename}
          onDelete={savedProfiles.remove}
          onClose={() => setShowLoad(false)}
        />
      )}

      {/* Easter eggs */}
      <EasterEggDisplay eggs={easterEggs} />

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-terminal text-2xl text-[var(--accent)] text-glow">
            {'> '}PROFILE: {profileInput.fullBirthName.toUpperCase()}
          </h1>
          <div className="flex flex-wrap gap-2 shrink-0 justify-end">
            {saving ? (
              <div className="flex gap-2 items-center">
                <input
                  autoFocus
                  value={saveLabel}
                  onChange={(e) => setSaveLabel(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitSave();
                    if (e.key === 'Escape') setSaving(false);
                  }}
                  maxLength={80}
                  aria-label="Label for the saved chart"
                  className="font-terminal text-xs bg-transparent border border-[var(--accent)]
                    text-[var(--text-primary)] px-2 py-1 min-h-[44px] w-48 focus:outline-none"
                />
                <button
                  onClick={commitSave}
                  className="font-terminal text-xs text-[var(--accent)] hover:text-glow
                    border border-[var(--border)] px-3 py-1 min-h-[44px] transition-colors"
                >
                  [ OK ]
                </button>
                <button
                  onClick={() => setSaving(false)}
                  aria-label="Cancel save"
                  className="font-terminal text-xs text-[var(--text-secondary)] hover:text-[var(--accent)]
                    border border-[var(--border)] px-3 py-1 min-h-[44px] transition-colors"
                >
                  [ ✕ ]
                </button>
              </div>
            ) : (
              <button
                onClick={startSave}
                className="font-terminal text-xs text-[var(--text-secondary)] hover:text-[var(--accent)]
                  border border-[var(--border)] px-3 py-1 min-h-[44px] transition-colors"
              >
                [ SAVE ]
              </button>
            )}
            <button
              onClick={() => setShowLoad(true)}
              className="font-terminal text-xs text-[var(--text-secondary)] hover:text-[var(--accent)]
                border border-[var(--border)] px-3 py-1 min-h-[44px] transition-colors"
            >
              [ LOAD ]
            </button>
            <button
              onClick={handleShare}
              className="font-terminal text-xs text-[var(--text-secondary)] hover:text-[var(--accent)]
                border border-[var(--border)] px-3 py-1 min-h-[44px] transition-colors"
            >
              [ SHARE ]
            </button>
            <button
              onClick={handlePdf}
              disabled={pdfBusy}
              className="font-terminal text-xs text-[var(--text-secondary)] hover:text-[var(--accent)]
                border border-[var(--border)] px-3 py-1 min-h-[44px] transition-colors disabled:opacity-50"
            >
              {pdfBusy ? '[ … ]' : '[ PDF ]'}
            </button>
          </div>
        </div>
        {statusMsg && (
          <p className="font-terminal text-xs text-[var(--accent-green)]">{statusMsg}</p>
        )}
        <p className="font-terminal text-xs text-[var(--text-secondary)]">
          DOB: {profileInput.dateOfBirth}
        </p>
      </div>

      {/* Session stats */}
      <SessionStatsDisplay stats={sessionStats} />

      {/* Did you know? — based on life path */}
      <DidYouKnow number={profile.lifePath.value} />

      {/* System selector */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Numerology system">
        {systems.map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={activeSystem === s}
            onClick={() => setActiveSystem(s)}
            className={`font-terminal text-xs px-3 py-1.5 min-h-[44px] border transition-colors ${
              activeSystem === s
                ? 'bg-[var(--accent)] text-[var(--bg-primary)] border-[var(--accent)]'
                : 'text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)]'
            }`}
          >
            {systemLabels[s]}
          </button>
        ))}
      </div>

      {/* Core numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TerminalCard title="LIFE PATH">
          <NumberDisplay
            label="Life Path"
            result={profile.lifePath}
            disclaimer={microDisclaimers.lifePath}
          />
        </TerminalCard>

        <TerminalCard title="EXPRESSION">
          <NumberDisplay label="Expression" result={profile.expression} />
        </TerminalCard>

        <TerminalCard title="SOUL URGE">
          <NumberDisplay label="Soul Urge" result={profile.soulUrge} />
        </TerminalCard>

        <TerminalCard title="PERSONALITY">
          <NumberDisplay label="Personality" result={profile.personality} />
        </TerminalCard>
      </div>

      {/* Secondary numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TerminalCard title="MATURITY">
          <NumberDisplay label="Maturity" result={profile.maturity} showInterpretation={false} />
        </TerminalCard>

        <TerminalCard title="BIRTHDAY">
          <NumberDisplay
            label="Birthday"
            result={profile.birthdayNumber}
            showInterpretation={false}
          />
        </TerminalCard>

        <TerminalCard title="PERSONAL YEAR">
          <NumberDisplay
            label="Personal Year"
            result={profile.personalYear}
            showInterpretation={false}
            disclaimer={microDisclaimers.personalTiming}
          />
        </TerminalCard>
      </div>

      {/* House number */}
      {profile.houseNumber && (
        <TerminalCard title="HOUSE NUMBER">
          <NumberDisplay label="House" result={profile.houseNumber} showInterpretation={false} />
        </TerminalCard>
      )}

      {/* Karma & Master */}
      {(profile.karmaDebt.length > 0 || profile.masterNumbers.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.masterNumbers.length > 0 && (
            <TerminalCard title="MASTER NUMBERS">
              <div className="font-terminal text-2xl text-[var(--accent-green)] text-glow-green space-x-4">
                {profile.masterNumbers.map((n) => (
                  <span key={n} className="master-glow">
                    {n}
                  </span>
                ))}
              </div>
              <p className="text-xs italic text-[var(--text-secondary)] mt-2">
                {microDisclaimers.masterNumber}
              </p>
            </TerminalCard>
          )}
          {profile.karmaDebt.length > 0 && (
            <TerminalCard title="KARMA DEBT">
              <div className="font-terminal text-2xl text-[var(--accent)] space-x-4">
                {profile.karmaDebt.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
              <p className="text-xs italic text-[var(--text-secondary)] mt-2">
                {microDisclaimers.karmaDebt}
              </p>
            </TerminalCard>
          )}
        </div>
      )}

      {/* System comparison */}
      <TerminalCard title="SYSTEM COMPARISON">
        <SystemCompare profiles={profiles} />
      </TerminalCard>
    </div>
  );
}
