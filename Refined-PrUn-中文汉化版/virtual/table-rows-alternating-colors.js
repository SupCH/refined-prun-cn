import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import tableAlternatingColors from './table-rows-alternating-colors.module.css.js';
function init() {
  applyCssRule('table', tableAlternatingColors.table);
}
features.add(import.meta.url, init, 'Colors even rows in lighter color in all tables.');
