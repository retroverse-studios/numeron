import webConfig from '../web/tailwind.config.js';

// Same design tokens as the web app, but with content globs that cover the
// aliased web sources (@/ -> ../web/src) so the utilities actually generate
// when Vite builds from this directory.
export default {
  ...webConfig,
  content: ['./index.html', './src/**/*.{ts,tsx}', '../web/src/**/*.{ts,tsx}'],
};
