import { subscribe } from './subscribe-async-generator.js';
import { $, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import { contractsStore } from './contracts.js';
import { getDestinationName } from './addresses.js';
import { watchUntil } from './watch.js';
function init() {
  subscribe($$(document, C.ColoredIcon.container), async container => {
    const label = await $(container, C.ColoredIcon.label);
    const subLabel = await $(container, C.ColoredIcon.subLabel);
    if (label.textContent !== 'SHPT' && label.textContent !== 'BLCK') {
      return;
    }
    const id = refPrunId(container);
    await watchUntil(() => !!id.value);
    const destination = contractsStore.getDestinationByShipmentId(id.value);
    const name = getDestinationName(destination);
    if (!name) {
      return;
    }
    subLabel.textContent = name;
  });
}
features.add(import.meta.url, init, 'Shortens addresses in SHPT and BLCK items.');
