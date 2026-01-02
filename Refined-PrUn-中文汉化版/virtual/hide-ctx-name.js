import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule(`.ContextControls__container___pADKUO4 > .${C.HeadItem.container}`, css.hidden);
}
features.add(import.meta.url, init, 'Hides the current context name label (CTX).');
