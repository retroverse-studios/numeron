import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NARRATOR_OPTIONS, type NarratorId } from '@numeron/core';
import { useStore } from '../store';

const navLinks = [
  { to: '/', label: 'HOME' },
  { to: '/profile', label: 'PROFILE' },
  { to: '/systems', label: 'SYSTEMS' },
  { to: '/decode', label: 'DECODE' },
  { to: '/explore', label: 'EXPLORE' },
  { to: '/calendar', label: 'CALENDAR' },
  { to: '/compare', label: 'COMPARE' },
  { to: '/reverse', label: 'REVERSE' },
  { to: '/reading', label: 'READING' },
  { to: '/about', label: 'ABOUT' },
];

export function Nav() {
  const location = useLocation();
  const { theme, setTheme, narrator, setNarrator } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const narratorSelect = (
    <select
      value={narrator}
      onChange={(e) => setNarrator(e.target.value as NarratorId)}
      aria-label="Narrator voice for interpretation texts"
      className="font-terminal text-xs bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] px-2 py-1 min-h-[44px] cursor-pointer"
      title="Narrator voice — same claims, different diction"
    >
      {NARRATOR_OPTIONS.map((n) => (
        <option key={n.id} value={n.id}>
          {n.label}
        </option>
      ))}
    </select>
  );

  return (
    <nav
      className="border-b border-[var(--border)] bg-[var(--bg-primary)]"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link
          to="/"
          className="font-terminal text-lg tracking-widest text-[var(--accent)] text-glow"
        >
          NUMERON
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-terminal text-xs tracking-wider transition-colors ${
                location.pathname === link.to
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--accent)]'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Narrator voice */}
          {narratorSelect}

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'phosphor' ? 'arcane' : 'phosphor')}
            className="font-terminal text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors min-h-[44px] px-2"
            aria-label={`Switch to ${theme === 'phosphor' ? 'arcane' : 'phosphor'} theme`}
          >
            [{theme === 'phosphor' ? 'ARCANE' : 'PHOSPHOR'}]
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden font-terminal text-sm text-[var(--accent)] min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? '[CLOSE]' : '[MENU]'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block font-terminal text-sm py-2 min-h-[44px] flex items-center ${
                location.pathname === link.to
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              {'> '}
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setTheme(theme === 'phosphor' ? 'arcane' : 'phosphor');
              setMenuOpen(false);
            }}
            className="block font-terminal text-sm text-[var(--text-secondary)] py-2 min-h-[44px]"
          >
            {'> '}[{theme === 'phosphor' ? 'ARCANE' : 'PHOSPHOR'}]
          </button>
          <div className="py-2 flex items-center gap-2">
            <span className="font-terminal text-sm text-[var(--text-secondary)]">{'> '}VOICE</span>
            {narratorSelect}
          </div>
        </div>
      )}
    </nav>
  );
}
