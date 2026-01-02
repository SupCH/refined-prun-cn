import { subscribe } from './subscribe-async-generator.js';
import { $, _$$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import MinimizeRow from './MinimizeRow.vue.js';
import { streamHtmlCollection } from './stream-html-collection.js';
import { computedTileState } from './user-data-tiles.js';
import { getTileState } from './tile-state.js';
import { reactive } from './reactivity.esm-bundler.js';
function onTileReady(tile) {
  const isMinimized = computedTileState(getTileState(tile), 'minimizeHeader', true);
  subscribe(streamHtmlCollection(tile.anchor, tile.anchor.children), async child => {
    const header = await $(child, C.FormComponent.containerPassive);
    setHeaders(tile, isMinimized.value);
    createFragmentApp(
      MinimizeRow,
      reactive({
        isMinimized,
        onClick: () => {
          isMinimized.value = !isMinimized.value;
          setHeaders(tile, isMinimized.value);
        },
      }),
    ).before(header);
  });
}
function setHeaders(tile, isMinimized) {
  for (const header of _$$(tile.anchor, C.FormComponent.containerPassive)) {
    const label = _$(header, C.FormComponent.label);
    if (label?.textContent === 'Minimize') {
      continue;
    }
    if (label?.textContent === 'Termination request') {
      const value = _$(header, C.FormComponent.input);
      if (value?.textContent !== '--') {
        continue;
      }
    }
    header.style.display = isMinimized ? 'none' : 'flex';
  }
}
function init() {
  tiles.observe(['CX', 'CONT', 'LM', 'SYSI'], onTileReady);
}
features.add(import.meta.url, init, 'Minimizes headers in CX, CONT, LM, and SYSI.');
