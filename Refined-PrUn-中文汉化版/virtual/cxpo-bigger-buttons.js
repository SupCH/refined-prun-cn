import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './cxpo-bigger-buttons.module.css.js';
function init() {
  applyCssRule(
    'CXPO',
    `.${C.FormComponent.containerCommand} .${C.FormComponent.input}`,
    $style.container,
  );
}
features.add(import.meta.url, init, 'CXPO: Makes "Buy" and "Sell" buttons bigger.');
