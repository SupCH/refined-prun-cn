import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './always-visible-tile-controls.module.css.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule(`.${C.TileControls.container} > .${C.TileControls.icon}`, css.hidden);
  applyCssRule(`.${C.TileControls.container} > .${C.TileControls.controls}`, $style.show);
}
features.add(import.meta.url, init, 'Makes top-right tile controls always visible.');
