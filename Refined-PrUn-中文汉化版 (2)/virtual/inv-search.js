import { subscribe } from './subscribe-async-generator.js';
import { $, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import $style from './inv-search.module.css.js';
import css from './css-utils.module.css.js';
import { createVNode } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  if (tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.InventoriesListContainer.filter), async inventoryFilters => {
    const tableBody = await $(tile.anchor, 'tbody');
    const onInput = e => {
      const input = e.target;
      for (let i = 0; i < tableBody.children.length; i++) {
        const row = tableBody.children[i];
        if (filterRow(row, input.value)) {
          row.classList.remove(css.hidden);
        } else {
          row.classList.add(css.hidden);
        }
      }
    };
    createFragmentApp(() =>
      createVNode('div', null, [
        createVNode(
          'input',
          {
            class: $style.inputText,
            placeholder: 'Enter location',
            onInput: onInput,
          },
          null,
        ),
      ]),
    ).after(inventoryFilters);
  });
}
function filterRow(row, search) {
  if (!search || search === '') {
    return true;
  }
  const location = row.children[1].textContent.toLowerCase();
  if (location !== '--') {
    if (location.includes(search.toLowerCase())) {
      return true;
    }
  }
  const name = row.children[2].textContent.toLowerCase();
  if (name !== '') {
    if (name.includes(search.toLowerCase())) {
      return true;
    }
  }
  return false;
}
function init() {
  tiles.observe(['INV', 'SHPI'], onTileReady);
}
features.add(import.meta.url, init, 'INV/SHPI: Adds a search bar to the main INV buffer.');
