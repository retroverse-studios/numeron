import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import type { SavedProfile } from '../hooks/useSavedProfiles';

interface LoadProfileOverlayProps {
  profiles: SavedProfile[];
  onRename: (id: string, label: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

/**
 * Modal listing the charts saved in localStorage. Selecting one generates its
 * profile and jumps to /profile; each row can be renamed or deleted. Uses a
 * React overlay (never a native dialog, which would block the Tauri webview).
 *
 * Data and mutations come from the parent's single useSavedProfiles instance so
 * the caller's own view (e.g. the Dashboard's saved-count) stays in sync.
 */
export function LoadProfileOverlay({
  profiles,
  onRename,
  onDelete,
  onClose,
}: LoadProfileOverlayProps) {
  const navigate = useNavigate();
  const { generateProfiles } = useStore();
  const [editing, setEditing] = useState<string | null>(null);
  const [draftLabel, setDraftLabel] = useState('');

  const openProfile = (p: SavedProfile) => {
    generateProfiles(p.input);
    onClose();
    navigate('/profile');
  };

  const startRename = (p: SavedProfile) => {
    setEditing(p.id);
    setDraftLabel(p.label);
  };

  const commitRename = (id: string) => {
    const trimmed = draftLabel.trim();
    if (trimmed) onRename(id, trimmed);
    setEditing(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Load a saved chart"
      onClick={onClose}
    >
      <div
        className="border border-[var(--accent)] bg-[var(--bg-primary)] p-6 max-w-lg w-full
          font-terminal text-sm space-y-4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="text-[var(--accent)] text-glow">{'> '}LOAD SAVED CHART</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] min-h-[44px] px-2"
          >
            [ ✕ ]
          </button>
        </div>

        {profiles.length === 0 ? (
          <p className="text-[var(--text-secondary)] py-4">
            {'> '}No saved charts yet. Generate a chart, then press [ SAVE ].
          </p>
        ) : (
          <ul className="space-y-2">
            {profiles.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-2 border border-[var(--border)] px-3 py-2"
              >
                {editing === p.id ? (
                  <>
                    <input
                      autoFocus
                      value={draftLabel}
                      onChange={(e) => setDraftLabel(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') commitRename(p.id);
                        if (e.key === 'Escape') setEditing(null);
                      }}
                      maxLength={80}
                      className="flex-1 min-w-0 bg-transparent border border-[var(--border)]
                        text-[var(--text-primary)] px-2 py-1 min-h-[36px]
                        focus:border-[var(--accent)] focus:outline-none"
                    />
                    <button
                      onClick={() => commitRename(p.id)}
                      className="text-[var(--accent)] hover:text-glow min-h-[36px] px-2 shrink-0"
                    >
                      [ OK ]
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => openProfile(p)}
                      className="flex-1 min-w-0 text-left text-[var(--text-primary)]
                        hover:text-[var(--accent)] min-h-[36px] truncate"
                      title={`Load ${p.label}`}
                    >
                      {p.label}
                    </button>
                    <button
                      onClick={() => startRename(p)}
                      aria-label={`Rename ${p.label}`}
                      className="text-[var(--text-secondary)] hover:text-[var(--accent)] min-h-[36px] px-2 shrink-0"
                    >
                      rename
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      aria-label={`Delete ${p.label}`}
                      className="text-[var(--text-secondary)] hover:text-[var(--danger,#e57373)] min-h-[36px] px-2 shrink-0"
                    >
                      ✕
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
