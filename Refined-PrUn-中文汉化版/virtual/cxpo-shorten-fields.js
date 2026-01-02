import { subscribe } from './subscribe-async-generator.js';
import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ComExPlaceOrderForm.form), form => {
    const parts = tile.parameter.split('.');
    void replaceRowValue(form.children[0], parts[1]);
    void replaceRowValue(form.children[1], parts[0]);
  });
}
async function replaceRowValue(row, value) {
  const label = await $(row, C.StaticInput.static);
  label.textContent = value;
}
function init() {
  tiles.observe('CXPO', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'CXPO: Replaces values of "Exchange" and "Material" fields with corresponding tickers.',
);
