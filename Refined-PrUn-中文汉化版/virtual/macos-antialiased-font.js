import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import $style from './macos-antialiased-font.module.css.js';
function init() {
  applyCssRule('body', $style.body);
}
features.add(import.meta.url, init, 'Applies antialiased smoothing to all fonts on macOS.');
