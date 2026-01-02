import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule('CXOS', `.${C.Button.btn} + .${C.ActionBar.container}`, css.hidden);
}
features.add(
  import.meta.url,
  init,
  'CXOS: Hides the "Delete Filled" button when filters are hidden.',
);
