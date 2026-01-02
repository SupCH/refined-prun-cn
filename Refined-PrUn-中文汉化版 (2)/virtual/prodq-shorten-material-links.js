import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { productionStore } from './production.js';
import PrunLink from './PrunLink.vue.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { refPrunId } from './attributes.js';
import { createVNode, isVNode } from './runtime-core.esm-bundler.js';
function _isSlot(s) {
  return (
    typeof s === 'function' ||
    (Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s))
  );
}
async function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ProductionQueue.table), table => {
    subscribe($$(table, 'tr'), order => {
      const prunId = refPrunId(order);
      watchEffectWhileNodeAlive(order, () => {
        const line = productionStore.getById(tile.parameter);
        const productionOrder = line?.orders.find(order2 => order2.id === prunId.value);
        if (productionOrder) {
          linkifyMaterialNames(order.children[3].children, productionOrder.inputs);
          linkifyMaterialNames(order.children[4].children, productionOrder.outputs);
        }
      });
    });
  });
}
function linkifyMaterialNames(elements, resources) {
  for (let i = 0; i < elements.length; i++) {
    const children = Array.from(elements[i].children);
    const materialName = children.length === 2 ? children[1] : children[0];
    materialName.innerText = '';
    const material = resources[i].material.ticker;
    createFragmentApp(() =>
      createVNode(
        PrunLink,
        {
          inline: true,
          command: `MAT ${material}`,
        },
        _isSlot(material)
          ? material
          : {
              default: () => [material],
            },
      ),
    ).appendTo(materialName);
  }
}
function init() {
  tiles.observe('PRODQ', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'PRODQ: Shortens material full names into their ticker with a link.',
);
