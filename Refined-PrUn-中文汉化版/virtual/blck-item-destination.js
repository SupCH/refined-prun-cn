import { subscribe } from './subscribe-async-generator.js';
import { $, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import features from './feature-registry.js';
import { contractsStore } from './contracts.js';
import { getDestinationFullName } from './addresses.js';
import { refPrunId } from './attributes.js';
import { watchUntil } from './watch.js';
import { createVNode } from './runtime-core.esm-bundler.js';
function init() {
  subscribe($$(document, C.ColoredIcon.container), async container => {
    const label = await $(container, C.ColoredIcon.label);
    if (label.textContent !== 'BLCK') {
      return;
    }
    const id = refPrunId(container);
    await watchUntil(() => !!id.value);
    const destination = contractsStore.getDestinationByShipmentId(id.value);
    const name = getDestinationFullName(destination);
    if (name) {
      createFragmentApp(() =>
        createVNode(
          'span',
          {
            class: [C.ColoredIcon.subLabel, C.type.typeVerySmall],
          },
          [name],
        ),
      ).after(label);
    }
  });
}
features.add(import.meta.url, init, 'Adds a destination address to BLCK items.');
