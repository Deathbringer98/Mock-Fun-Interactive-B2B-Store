import { defineConfig } from 'vite';

// Relative base ('./') so the built site works both at a custom-domain
// root (https://yourdomain.com/) and at the GitHub project subpath
// (https://deathbringer98.github.io/Mock-Fun-Interactive-B2B-Store/).
export default defineConfig({
  base: './',
});
