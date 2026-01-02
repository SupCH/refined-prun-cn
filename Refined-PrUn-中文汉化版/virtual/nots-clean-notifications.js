import { subscribe } from './subscribe-async-generator.js';
import { $$, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { getPrunId } from './attributes.js';
import { alertsStore } from './alerts.js';
import { waitNotificationLoaded } from './notifications.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.AlertListItem.container), processNotification);
}
async function processNotification(container) {
  const content = await waitNotificationLoaded(container);
  const id = getPrunId(container);
  const alert = alertsStore.getById(id);
  if (!alert) {
    return;
  }
  const patch = patchMap.get(alert.type);
  if (!patch) {
    return;
  }
  const textSpan = _$$(content, 'span')[0];
  if (!textSpan?.textContent) {
    return;
  }
  for (const node of Array.from(textSpan.childNodes)) {
    if (node.nodeType !== Node.TEXT_NODE) {
      continue;
    }
    const nodeText = node.textContent;
    if (!nodeText) {
      continue;
    }
    const newText = patch.replace(nodeText);
    if (nodeText !== newText) {
      node.textContent = newText;
    }
  }
}
const patches = [
  {
    types: [
      'CONTRACT_CONDITION_FULFILLED',
      'CONTRACT_CONTRACT_BREACHED',
      'CONTRACT_CONTRACT_CANCELLED',
      'CONTRACT_CONTRACT_CLOSED',
      'CONTRACT_CONTRACT_EXTENDED',
      'CONTRACT_CONTRACT_RECEIVED',
      'CONTRACT_CONTRACT_REJECTED',
      'CONTRACT_CONTRACT_TERMINATED',
      'CONTRACT_CONTRACT_TERMINATION_REQUESTED',
      'CONTRACT_DEADLINE_EXCEEDED_WITH_CONTROL',
      'CONTRACT_DEADLINE_EXCEEDED_WITHOUT_CONTROL',
    ],
    replace(text) {
      return text.replace('fulfilled a contract condition for contract', 'fulfilled on');
    },
  },
  {
    types: ['COMEX_ORDER_FILLED', 'FOREX_ORDER_FILLED'],
    replace(text) {
      return text.replace(' Commodity Exchange', '').replace(' order', '');
    },
  },
  {
    types: ['COMEX_TRADE', 'FOREX_TRADE'],
    replace(text) {
      return text.replace(' Commodity Exchange', '').replace(' your', '').replace(' order', '');
    },
  },
  {
    types: ['PRODUCTION_ORDER_FINISHED'],
    replace(text) {
      return text
        .replace(' at your base', '')
        .replace('One', '1')
        .replace(' have been', '')
        .replace(/ units? of/, '')
        .replace(' produced', '');
    },
  },
  {
    types: ['COGC_PROGRAM_CHANGED', 'COGC_STATUS_CHANGED', 'COGC_UPKEEP_STARTED'],
    replace(text) {
      return text
        .replace('Chamber of Global Commerce', 'COGC')
        .replace(' a new economic program', '')
        .replace(' Advertising Campaign:', '');
    },
  },
  {
    types: ['SHIP_FLIGHT_ENDED'],
    replace(text) {
      return text.replace(' its destination', '');
    },
  },
  {
    types: ['LOCAL_MARKET_AD_ACCEPTED', 'LOCAL_MARKET_AD_EXPIRED'],
    replace(text) {
      return text.replace(' the', '').replace(' local market', '');
    },
  },
  {
    types: ['POPULATION_PROJECT_UPGRADED'],
    replace(text) {
      return text.replace('population infrastructure', 'POPI');
    },
  },
];
const patchMap = new Map(patches.flatMap(x => x.types.map(y => [y, x])));
function init() {
  tiles.observe('NOTS', onTileReady);
}
features.add(import.meta.url, init, 'NOTS: Hides redundant information from notifications.');
