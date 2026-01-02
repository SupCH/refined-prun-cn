import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule('SHPF', `.${C.InventorySortControls.controls}`, css.hidden);
}
features.add(import.meta.url, init, 'SHPF: Hides inventory sort options.');
