import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
import $style from './hide-item-names.module.css.js';
function init() {
  applyCssRule(`.${C.GridItemView.name}`, css.hidden);
  applyCssRule(`.${C.GridItemView.container}`, $style.gridItem);
}
features.add(
  import.meta.url,
  init,
  'Hides item names and removes item grid gaps in all inventories.',
);
