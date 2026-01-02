import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './item-ticker-shadow.module.css.js';
function init() {
  applyCssRule(`.${C.ColoredIcon.label}`, $style.shadow);
  applyCssRule(`.${C.BuildingIcon.ticker}`, $style.shadow);
}
features.add(import.meta.url, init, 'Adds a shadow to item tickers.');
