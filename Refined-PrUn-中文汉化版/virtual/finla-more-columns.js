import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { createFragmentApp } from './vue-fragment-app.js';
import { C } from './prun-css.js';
import { applyCssRule } from './refined-prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import $style from './finla-more-columns.module.css.js';
import css from './css-utils.module.css.js';
import { refTextContent } from './reactive-dom.js';
import { fixed0 } from './format.js';
import { currentAssets } from './current-assets.js';
import { createVNode, createTextVNode, computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, 'thead'), onTableHeadReady);
  subscribe($$(tile.anchor, 'tbody'), onTableBodyReady);
}
function onTableHeadReady(thead) {
  subscribe($$(thead, 'tr'), row => {
    createFragmentApp(() =>
      createVNode(
        'th',
        {
          class: [C.LiquidAssetsPanel.number, hiddenIfZero(currentAssets.cxDepositsTotal)],
        },
        [createTextVNode('CX Deposits')],
      ),
    ).appendTo(row);
    createFragmentApp(() =>
      createVNode(
        'th',
        {
          class: [C.LiquidAssetsPanel.number, hiddenIfZero(currentAssets.fxDepositsTotal)],
        },
        [createTextVNode('FX Deposits')],
      ),
    ).appendTo(row);
    createFragmentApp(() =>
      createVNode(
        'th',
        {
          class: [
            C.LiquidAssetsPanel.number,
            hiddenIfZero(currentAssets.inventory.mmMaterialsTotal),
          ],
        },
        [createTextVNode('MM Materials')],
      ),
    ).appendTo(row);
  });
}
function onTableBodyReady(tbody) {
  subscribe($$(tbody, 'tr'), row => {
    const currencyCell = row.children[0];
    if (currencyCell === void 0) {
      return;
    }
    const currency = refTextContent(currencyCell);
    createFragmentApp(() =>
      createVNode(
        'td',
        {
          class: [C.LiquidAssetsPanel.number, hiddenIfZero(currentAssets.cxDepositsTotal)],
        },
        [fixed0(currency.value ? (currentAssets.cxDeposits.value?.get(currency.value) ?? 0) : 0)],
      ),
    ).appendTo(row);
    createFragmentApp(() =>
      createVNode(
        'td',
        {
          class: [C.LiquidAssetsPanel.number, hiddenIfZero(currentAssets.fxDepositsTotal)],
        },
        [fixed0(currency.value ? (currentAssets.fxDeposits.value?.get(currency.value) ?? 0) : 0)],
      ),
    ).appendTo(row);
    const mmMaterials = computed(() => {
      return currency.value
        ? (currentAssets.inventory.cxInventory.value?.mmMaterialsTotal.get(currency.value) ?? 0)
        : 0;
    });
    createFragmentApp(() =>
      createVNode(
        'td',
        {
          class: [
            C.LiquidAssetsPanel.number,
            hiddenIfZero(currentAssets.inventory.mmMaterialsTotal),
          ],
        },
        [fixed0(mmMaterials.value)],
      ),
    ).appendTo(row);
  });
}
function hiddenIfZero(total) {
  return (total.value ?? 0) === 0 ? css.hidden : void 0;
}
function init() {
  applyCssRule(`.${C.LiquidAssetsPanel.row}`, $style.row);
  tiles.observe('FINLA', onTileReady);
}
features.add(import.meta.url, init, 'FINLA: Adds columns for additional liquid asset types.');
