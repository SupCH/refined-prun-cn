import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule('CXOB', 'tbody:nth-child(2) > tr:first-child', css.hidden);
  applyCssRule('CXOB', 'tbody:nth-child(4) > tr:first-child', css.hidden);
}
features.add(import.meta.url, init, 'CXOB: Hides "Offers" and "Requests" headers.');
