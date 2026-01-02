import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './tile-controls-background.module.css.js';
function init() {
  applyCssRule(`.${C.TileFrame.controls}`, $style.controls);
}
features.add(
  import.meta.url,
  init,
  'Adds a solid color background to the top-right tile controls.',
);
