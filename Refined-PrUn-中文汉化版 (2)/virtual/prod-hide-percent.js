import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule('PROD', `.${C.OrderStatus.inProgress}`, css.hidden);
}
features.add(import.meta.url, init, 'PROD: Hides percent value in the order list.');
