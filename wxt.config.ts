import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
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
