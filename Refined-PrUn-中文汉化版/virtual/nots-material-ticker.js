import { subscribe } from './subscribe-async-generator.js';
import { $$, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { getPrunId } from './attributes.js';
import { alertsStore } from './alerts.js';
import { materialsStore } from './materials.js';
import { getMaterialName } from './i18n.js';
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
  const textSpan = _$$(content, 'span')[0];
  const alertText = textSpan?.textContent;
  if (!alertText) {
    return;
  }
  let name = void 0;
  switch (alert.type) {
    case 'COMEX_ORDER_FILLED':
    case 'FOREX_ORDER_FILLED':
    case 'COMEX_TRADE':
    case 'FOREX_TRADE': {
      name = alert.data.find(x => x.key === 'commodity')?.value;
      break;
    }
    case 'PRODUCTION_ORDER_FINISHED': {
      name = alert.data.find(x => x.key === 'material')?.value;
      break;
    }
    default: {
      return;
    }
  }
  const material = materialsStore.getByName(name);
  const localizedName = getMaterialName(material);
  if (material && localizedName) {
    textSpan.textContent = alertText.replace(localizedName, material.ticker);
  }
}
function init() {
  tiles.observe('NOTS', onTileReady);
}
features.add(import.meta.url, init, 'NOTS: Replaces material name with material ticker.');
