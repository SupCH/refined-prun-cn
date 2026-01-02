import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule(
    'MAT',
    `.${C.MaterialInformation.container} > .${C.FormComponent.containerPassive}:nth-child(2)`,
    css.hidden,
  );
  applyCssRule(
    'MAT',
    `.${C.MaterialInformation.container} > .${C.FormComponent.containerPassive}:nth-child(6)`,
    css.hidden,
  );
}
features.add(import.meta.url, init, 'MAT: Hides "Ticker" and "Natural resource" fields.');
