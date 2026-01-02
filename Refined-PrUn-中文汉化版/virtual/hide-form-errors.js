import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
import $style from './hide-form-errors.module.css.js';
function init() {
  applyCssRule('.FormComponent__containerError___pN__L1Q', $style.containerError);
  applyCssRule('.FormComponent__containerError___jKoukmU', $style.containerError);
  applyCssRule('.FormComponent__errorMessage___mBdvpz5', css.hidden);
  applyCssRule('.FormComponent__errorMessage___R2eGj1h', css.hidden);
}
features.add(import.meta.url, init, 'Hides error labels from form fields with incorrect input.');
