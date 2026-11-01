import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Tauri frontend build. Re-uses the web app source via the same `@` alias the
// the web app uses, but with a relative base (the web app itself builds
// with base /app/ for GitHub Pages) and no PWA service worker.

const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  // 'unsafe-inline' is required for React inline style props
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "worker-src 'self'",
  "manifest-src 'self'",
  // The BYO-key AI reading is the only outbound call
  "connect-src 'self' https://api.anthropic.com",
].join('; ');

// Build-only: the dev server needs inline scripts for HMR, which this CSP forbids
function injectCsp() {
  return {
    name: 'inject-csp',
    apply: 'build' as const,
    transformIndexHtml: () => [
      {
        tag: 'meta',
        attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP },
        injectTo: 'head-prepend' as const,
      },
    ],
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), injectCsp()],
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
