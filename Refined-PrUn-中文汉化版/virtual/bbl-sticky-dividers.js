import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './bbl-sticky-dividers.module.css.js';
function init() {
  applyCssRule('BBL', `.${C.SectionList.divider}`, $style.divider);
}
features.add(import.meta.url, init, 'BBL: Makes building category dividers sticky.');
