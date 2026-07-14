import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Tauri frontend build. Re-uses the web app source via the same `@` alias the
// Electron renderer uses, but with a relative base (the web app itself builds
// with base /app/ for GitHub Pages) and no PWA service worker.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../web/src'),
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5177,
    strictPort: true,
  },
  // Tauri CLI sets TAURI_* env vars the frontend may want at build time
  envPrefix: ['VITE_', 'TAURI_'],
  clearScreen: false,
});
