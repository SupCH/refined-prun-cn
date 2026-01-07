import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import features from './feature-registry.js';
import $style from './clickable-apex-logo.module.css.js';
import { companyStore } from './company.js';
import { showBuffer } from './buffers.js';
function init() {
  applyCssRule(`.${C.Frame.logo}`, $style.logo);
  subscribe($$(document, C.Frame.logo), logo => {
    logo.addEventListener('click', () => showBuffer(`CO ${companyStore.value?.code}`));
  });
}
features.add(
  import.meta.url,
  init,
  'Makes the APEX logo clickable and leading to the user company info screen.',
);
