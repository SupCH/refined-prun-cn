import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './funny-rations.module.css.js';
import css from './css-utils.module.css.js';
function applyFunny() {
  const today = /* @__PURE__ */ new Date();
  if (today.getDate() === 1 && today.getMonth() === 3) {
    document.body.classList.add($style.funny);
  } else {
    document.body.classList.remove($style.funny);
  }
}
function init() {
  setInterval(applyFunny, 6e4);
  applyCssRule(`.${$style.funny} .rp-ticker-RAT.${C.ColoredIcon.container}:before`, css.hidden);
  applyCssRule(`.${$style.funny} .rp-ticker-RAT .${C.ColoredIcon.label}`, css.hidden);
  applyCssRule(
    `.${$style.funny} .rp-ticker-RAT .${C.ColoredIcon.labelContainer}:after`,
    $style.rat,
  );
}
features.add(import.meta.url, init, "I've heard a squeak.");
