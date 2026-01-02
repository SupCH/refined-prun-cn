import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule(
    'PRODQ',
    `.${C.ProductionQueue.table} tbody tr td:nth-child(3) .${C.Link.link}`,
    css.hidden,
  );
}
features.add(import.meta.url, init, 'PRODQ: Hides fee collector links.');
