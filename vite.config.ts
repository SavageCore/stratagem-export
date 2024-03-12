import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';
import { version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'savagecore.uk',
        match: [
          'https://github.com/nvigneux/Helldivers-2-Stratagems-icons-svg',
          'https://steamcommunity.com/sharedfiles/filedetails/?id=3161075951'
        ],
        "run-at": "document-idle",
        version,
        license: 'Unlicense',
        author: 'SavageCore',
        description: 'Export Helldivers 2 Stratagem Icons and Sequences',
        updateURL: 'https://github.com/SavageCore/stratagem-export/releases/latest/download/stratagem-export.meta.js',
        downloadURL: 'https://github.com/SavageCore/stratagem-export/releases/latest/download/stratagem-export.user.js',
        supportURL: 'https://github.com/SavageCore/stratagem-export/issues',
        homepageURL: 'https://github.com/SavageCore/stratagem-export',
      },
      build: {
        externalGlobals: {
          jszip: cdn.unpkg('JSZip', 'dist/jszip.min.js'),
        },
        metaFileName: true,
      },
    }),
  ],
});
