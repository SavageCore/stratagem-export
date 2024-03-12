import { defineConfig } from 'vite';
import monkey, {cdn} from 'vite-plugin-monkey';

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
        version: '0.0.0',
        license: 'Unlicense',
        author: 'SavageCore',
      },
      build: {
        externalGlobals: {
            jszip: cdn.unpkg('JSZip', 'dist/jszip.min.js'),
        },
    },
  }),
  ],
});
