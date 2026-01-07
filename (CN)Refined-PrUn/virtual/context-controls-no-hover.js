import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule(`.${C.ContextControls.item}:hover .${C.ContextControls.label}`, css.hidden);
}
features.add(
  import.meta.url,
  init,
  'Prevents the context controls from displaying description while hovering over.',
);
