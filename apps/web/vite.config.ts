import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

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
  // Deployed under /app/ on numeron.retroverse.studio (landing page owns the root)
  base: '/app/',
  plugins: [
    react(),
    injectCsp(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'NUMERON — The Ancient Science of Numbers, Decoded',
        short_name: 'NUMERON',
        description: 'Explore numerology across five ancient traditions.',
        theme_color: '#0a0a08',
        background_color: '#0a0a08',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2}'],
        // The lazy PDF renderer is ~1.6 MB; don't precache it for every
        // first visit — runtime-cache it on first use instead
        globIgnores: ['**/react-pdf*.js'],
        runtimeCaching: [
          {
            urlPattern: /\/assets\/react-pdf.*\.js$/,
            handler: 'CacheFirst',
            options: { cacheName: 'numeron-pdf' },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
