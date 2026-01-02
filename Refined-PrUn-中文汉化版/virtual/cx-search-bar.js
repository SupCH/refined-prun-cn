import { subscribe } from './subscribe-async-generator.js';
import { $$, $, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { getMaterialName } from './i18n.js';
import $style from './cx-search-bar.module.css.js';
import { materialsStore } from './materials.js';
import css from './css-utils.module.css.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import _sfc_main from './TextInput.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import fa from './font-awesome.module.css.js';
import { refValue } from './reactive-dom.js';
import { ref, triggerRef } from './reactivity.esm-bundler.js';
import { watch, createVNode, createTextVNode } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ComExPanel.input), onComExPanelReady);
}
async function onComExPanelReady(comExPanel) {
  const actionBar = await $(comExPanel, C.ActionBar.container);
  const select = await $(actionBar, 'select');
  const selectValue = refValue(select);
  const searchText = ref('');
  const categoryOptions = /* @__PURE__ */ new Map();
  for (const option of Array.from(select.options)) {
    categoryOptions.set(option.value, option);
  }
  const materialRows = /* @__PURE__ */ new Map();
  async function loadMaterialRows() {
    const tbody = await $(comExPanel, 'tbody');
    for (const row of _$$(tbody, 'tr')) {
      const labelText = await $(row, C.ColoredIcon.label);
      materialRows.set(labelText.innerText, row);
    }
    triggerRef(searchText);
  }
  subscribe($$(comExPanel, 'tbody'), loadMaterialRows);
  watch(selectValue, loadMaterialRows);
  const resetMatches = value => {
    if (value.isConnected) {
      value.classList.toggle(css.hidden, searchText.value.length !== 0);
    }
  };
  watchEffectWhileNodeAlive(comExPanel, () => {
    const searchTerm = searchText.value.toUpperCase();
    categoryOptions.forEach(resetMatches);
    materialRows.forEach(resetMatches);
    const materials = materialsStore.all.value;
    if (searchTerm.length === 0 || !materials) {
      return;
    }
    for (const material of materials) {
      if (
        material.ticker.includes(searchTerm) ||
        getMaterialName(material)?.toUpperCase().includes(searchTerm)
      ) {
        const optionElement = categoryOptions.get(material.category);
        if (optionElement) {
          optionElement.classList.remove(css.hidden);
        }
        const rowElement = materialRows.get(material.ticker);
        if (rowElement?.isConnected) {
          rowElement.classList.remove(css.hidden);
        }
      }
    }
  });
  createFragmentApp(() =>
    createVNode(
      'div',
      {
        class: [C.ActionBar.element, $style.container],
      },
      [
        createTextVNode('Search: '),
        createVNode(
          _sfc_main,
          {
            modelValue: searchText.value,
            'onUpdate:modelValue': $event => (searchText.value = $event),
          },
          null,
        ),
        createVNode(
          _sfc_main$1,
          {
            dark: true,
            class: [$style.button, fa.solid],
            onClick: () => (searchText.value = ''),
          },
          {
            default: () => [''],
          },
        ),
      ],
    ),
  ).prependTo(actionBar);
}
function init() {
  tiles.observe('CX', onTileReady);
}
features.add(import.meta.url, init, 'CX: Adds a search bar for materials.');
