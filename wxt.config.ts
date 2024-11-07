import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  hooks: {
    'build:manifestGenerated': (wxt, manifest) => {
      manifest.content_scripts ??= [];
      manifest.content_scripts.push({
        // Build extension once to see where your CSS get's written to
        css: ['content-scripts/custom.css'],
        matches: ['*://*/*'],
      });
    },
  },
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'CRM Tickets Management',
    short_name: 'CRM Tickets Management',
    description: 'Extension for Enacton CRM Tickets Management',
    permissions: ['storage', 'tabs'],
    action: {
      default_icon: 'icon/128.png',
    },
    web_accessible_resources: [
      { resources: ['icon/*.png', 'images/*.png'], matches: ['<all_urls>'] },
    ],
  },
  entrypointsDir: 'src',
  outDir: 'build',
});
