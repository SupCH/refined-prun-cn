import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule(`.${C.StoreView.name}`, css.hidden);
}
features.add(import.meta.url, init, 'Hides "Weight" and "Volume" labels in all inventories.');
