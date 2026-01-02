import { C } from './prun-css.js';
import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  const selector = `.${C.Tile.tile} .${C.TileControls.splitControls} + .${C.TileControls.control}`;
  applyCssRule(`.${C.MainState.tileContainer} > ${selector}`, css.hidden);
  applyCssRule(`.${C.Window.body} > ${selector}`, css.hidden);
}
features.add(
  import.meta.url,
  init,
  'Hides the close button on single tile windows where it does nothing.',
);
