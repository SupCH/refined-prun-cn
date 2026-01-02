import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './bigger-item-count-font.module.css.js';
function init() {
  applyCssRule(`.${C.MaterialIcon.typeVerySmall}`, $style.indicator);
}
features.add(import.meta.url, init, 'Makes the item count label font bigger.');
