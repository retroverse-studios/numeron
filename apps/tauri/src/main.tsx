/**
 * Tauri frontend entry point.
 * Re-uses the web app components via path alias (@/ -> apps/web/src/).
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from '@/App';
// Bundled fonts (the web app loads these from Google Fonts; the desktop app
// must work offline). Keep in sync with apps/web/index.html.
import '@fontsource/share-tech-mono';
import '@fontsource/courier-prime/400.css';
import '@fontsource/courier-prime/700.css';
import '@fontsource/courier-prime/400-italic.css';
import '@fontsource/cinzel/400.css';
import '@fontsource/cinzel/700.css';
import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import '@/index.css';

document.documentElement.setAttribute('data-theme', 'phosphor');

// Desktop uses HashRouter (no server for history mode)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
