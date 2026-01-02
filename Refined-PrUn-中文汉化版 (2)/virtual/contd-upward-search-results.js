import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './contd-upward-search-results.module.css.js';
function init() {
  applyCssRule('CONTD', `.${C.UserSelector.suggestionsContainer}`, $style.suggestions);
}
features.add(import.meta.url, init, 'CONTD: Moves the search bar results above the search bar.');
