import { defineConfig } from 'wxt';
import { config } from './src/config/config';

// See https://wxt.dev/api/config.html
export default defineConfig({
  runner: {
    startUrls: ['chrome://extensions'],
  },
  hooks: {
    'build:manifestGenerated': (wxt, manifest) => {
      manifest.content_scripts ??= [];
      manifest.content_scripts.push({
        css: ['content-scripts/custom.css'],
        matches: [config.CRM_TICKETS_PAGE, config.CRM_TICKET_PAGE + '*'],
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
