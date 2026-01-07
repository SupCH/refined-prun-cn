import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './highlight-production-order-error.module.css.js';
function init() {
  applyCssRule(
    'PROD',
    `.${C.OrderSlot.container}:has(.${C.OrderStatus.error})`,
    $style.inputMissingContainer,
  );
  applyCssRule('PRODQ', `tr:has(.${C.OrderStatus.error})`, $style.orderRow);
  applyCssRule(
    'PRODCO',
    `.${C.InputsOutputsView.input}:has(.${C.InputsOutputsView.amountMissing})`,
    $style.inputMissingContainer,
  );
}
features.add(
  import.meta.url,
  init,
  'Highlights production orders with errors in PROD, PRODQ, and PRODCO.',
);
