import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
import $style from './lm-hide-rating.module.css.js';
function init() {
  applyCssRule('LM', `.${C.RatingIcon.container}`, css.hidden);
  applyCssRule('LM', `.${C.CommodityAd.text}`, $style.text);
}
features.add(import.meta.url, init, 'LM: Hides rating icon from ads.');
