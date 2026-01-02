import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { getPrunId } from './attributes.js';
import { alertsStore } from './alerts.js';
import { showBuffer } from './buffers.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.AlertListItem.container), processNotification);
}
async function processNotification(container) {
  const id = getPrunId(container);
  const alert = alertsStore.getById(id);
  if (alert?.type !== 'SHIP_FLIGHT_ENDED') {
    return;
  }
  const registration = alert.data.find(x => x.key === 'registration')?.value;
  if (!registration) {
    return;
  }
  container.addEventListener('click', e => {
    showBuffer(`SHPI ${registration}`);
    e.preventDefault();
    e.stopPropagation();
  });
}
function init() {
  tiles.observe('NOTS', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'NOTS: Opens ship inventory on "ship arrived" notification click.',
);
