declare const GM_getValue: (key: string, defaultValue?: any) => any;
declare const GM_setValue: (key: string, value: any) => void;

import pkg from '../package.json';

// --- Mocks ---
if (typeof chrome === 'undefined' || !chrome.storage) {
  (window as any).chrome = {
    storage: {
      local: {
        get: async (keys: string | string[] | object) => {
          if (typeof keys === 'string') {
            const val = GM_getValue(keys);
            return { [keys]: val };
          }
          // Simple implementation for the projects needs
          const result = {};
          if (Array.isArray(keys)) {
            keys.forEach(k => (result[k] = GM_getValue(k)));
          }
          return result;
        },
        set: async (data: object) => {
          Object.entries(data).forEach(([k, v]) => GM_setValue(k, v));
        },
      },
    },
    runtime: {
      getURL: (path: string) => {
        // For userscript, we don't have a reliable getURL for internal assets
        // unless they are base64-ed. For now, we'll try to handle it.
        return path;
      },
      getManifest: () => ({ version: pkg.version }),
    },
  };
}

// --- Preparation (Logic from refined-prun-prepare.ts) ---
function prepare() {
  if (document.documentElement.classList.contains('refined-prun')) {
    return;
  }
  const serializeScripts = () => {
    for (const s of Array.from(document.head?.getElementsByTagName('script') ?? [])) {
      if (s.src.includes('apex.prosperousuniverse.com')) {
        s.textContent = s.src;
        s.src = '';
        observer.disconnect();
      }
    }
  };
  const observer = new MutationObserver(() => serializeScripts());
  observer.observe(document, { childList: true, subtree: true });
  serializeScripts();
}

prepare();

// --- Startup & Main Logic ---
import '@src/refined-prun.css';
import '@src/infrastructure/shell';
import '@src/utils/dayjs';
import '@src/utils/chartjs-dayjs';
import '@src/features/basic';
import '@src/features/advanced';
import '@src/features/XIT';

// We need to simulate the config injection that startup.ts does
const config: any = {
  userData: null, // Will be loaded in main
  version: pkg.version,
  url: {
    manifest: '',
    allplanets: '', // This might be an issue if it's needed
  },
};

// Inject config globally so config.ts can find it
// Original config.ts reads from a script tag. Let's provide it.
const dummyScript = document.createElement('script');
dummyScript.id = 'refined-prun-js';
dummyScript.textContent = JSON.stringify(config);
document.documentElement.appendChild(dummyScript);

import { initializeApi } from '@src/infrastructure/prun-api';
import { initializeUI } from '@src/infrastructure/prun-ui';
import { initializeUserData } from '@src/store';
import { initAudioInterceptor } from '@src/infrastructure/prun-ui/audio-interceptor';
import PmmgMigrationGuide from '@src/components/PmmgMigrationGuide.vue';

async function main() {
  // Load user data first
  const userData = await chrome.storage.local.get('rp-user-data');
  config.userData = userData['rp-user-data'];

  // Re-update the script tag for the config module to read
  dummyScript.textContent = JSON.stringify(config);

  initAudioInterceptor();
  await initializeApi();
  await initializeUI();

  if (window['PMMG_COLLECTOR_HAS_RUN']) {
    // Note: $ and C and createFragmentApp are expected to be available globally via unimport
    // But in tests/userscript we might need to ensure they are.
    // However vite-plugin-monkey with unimport should work.
    // createFragmentApp(PmmgMigrationGuide).before(await $(document, C.App.container));
    return;
  }

  console.log(`(zh-cn)refined-prun ${config.version} (Tampermonkey)`);
  initializeUserData();
  (features as any).init();
  (xit as any).init();
}

// Wait for document ready like startup.ts does
async function waitDocumentReady() {
  while (document.head === null || document.body === null) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }
}

waitDocumentReady().then(() => main());
