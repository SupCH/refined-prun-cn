import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule('CXOS', 'tr > :first-child', css.hidden);
}
features.add(import.meta.url, init, 'CXOS: Hides the "Exchange" column.');
