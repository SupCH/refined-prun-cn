import { subscribe } from './subscribe-async-generator.js';
import { $, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { PrunI18N } from './i18n.js';
import _sfc_main from './Passive.vue.js';
import { createVNode } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const basesText = PrunI18N['CompanyPanel.data.bases']?.[0]?.value;
  subscribe($$(tile.anchor, C.FormComponent.containerPassive), async container => {
    const label = await $(container, 'label');
    if (label.textContent !== basesText) {
      return;
    }
    const bases = await $(container, C.StaticInput.static);
    createFragmentApp(() =>
      createVNode(
        _sfc_main,
        {
          label: 'Base Count',
        },
        {
          default: () => [createVNode('span', null, [bases.childElementCount])],
        },
      ),
    ).before(container);
  });
}
function init() {
  tiles.observe('CO', onTileReady);
}
features.add(import.meta.url, init, 'CO: Adds a "Base Count" row.');
