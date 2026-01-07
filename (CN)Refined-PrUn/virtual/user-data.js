import { deepFreeze } from './deep-freeze.js';
import { reactive, shallowReactive } from './reactivity.esm-bundler.js';
const initialUserData = deepFreeze({
  firstLoad: Date.now(),
  tileState: {},
  settings: {
    mode: void 0,
    disabled: [],
    time: 'DEFAULT',
    defaultChartType: 'SMOOTH',
    currency: {
      preset: 'DEFAULT',
      custom: '$',
      position: 'BEFORE',
      spacing: 'NO_SPACE',
    },
    financial: {
      mmMaterials: 'IDC,EDC',
      ignoredMaterials: 'HEX,JUI',
    },
    pricing: {
      exchange: 'UNIVERSE',
      method: 'DEFAULT',
    },
    burn: {
      red: 3,
      yellow: 7,
      resupply: 16,
    },
    repair: {
      threshold: 60,
      offset: 10,
    },
    language: void 0,
    sidebar: [
      ['BS', 'BS'],
      ['CONT', 'XIT CONTS'],
      ['COM', 'COM'],
      ['CORP', 'CORP'],
      ['CXL', 'CXL'],
      ['FIN', 'XIT FIN'],
      ['FLT', 'FLT'],
      ['INV', 'INV'],
      ['MAP', 'MU'],
      ['PROD', 'PROD'],
      ['LEAD', 'LEAD'],
      ['CMDS', 'CMDS'],
      ['ACT', 'XIT ACT'],
      ['BURN', 'XIT BURN'],
      ['REP', 'XIT REP'],
      ['SET', 'XIT SET'],
      ['HELP', 'XIT HELP'],
    ],
    buffers: [],
    audioVolume: 0.4,
  },
  sorting: {},
  balanceHistory: {
    v1: [],
    v2: [],
  },
  notes: [],
  actionPackages: [],
  systemMessages: [],
  todo: [],
  tabs: {
    order: [],
    hidden: [],
    locked: [],
  },
  commandLists: [],
  // Used in user-data-migrations.ts
  migrations: void 0,
});
const userData = reactive({});
function applyUserData(newData) {
  newData.balanceHistory.v1 = shallowReactive(newData.balanceHistory.v1);
  newData.balanceHistory.v2 = shallowReactive(newData.balanceHistory.v2);
  Object.assign(userData, newData);
}
function applyInitialUserData() {
  applyUserData(structuredClone(initialUserData));
}
applyInitialUserData();
function clearBalanceHistory() {
  userData.balanceHistory.v1.length = 0;
  userData.balanceHistory.v2.length = 0;
}
export { applyInitialUserData, applyUserData, clearBalanceHistory, initialUserData, userData };
