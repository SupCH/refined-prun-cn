import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import fa from './font-awesome.module.css.js';
import $style from './input-math.module.css.js';
import { changeInputValue } from './util.js';
import Mexp from './index6.js';
import { materialsStore } from './materials.js';
const mexp = new Mexp();
function onKeyDown(input, e) {
  if (e.key !== 'Enter' && e.key !== 'Tab') {
    return;
  }
  if (!input.value) {
    return;
  }
  let expression = input.value.charAt(0) === '=' ? input.value.substring(1) : input.value;
  expression = replaceMaterialProperties(expression);
  expression = replaceKilo(expression);
  const result = parseFloat(mexp.eval(expression).toFixed(6));
  changeInputValue(input, result.toString());
}
function replaceMaterialProperties(expression) {
  const matches = expression.match(/\b([a-zA-Z0-9]{1,3})\.(?:w|t|v|m|m3|max)\b/gi) ?? [];
  for (const match of matches) {
    const parts = match.split('.');
    const material = materialsStore.getByTicker(parts[0]);
    if (material === void 0) {
      continue;
    }
    let property;
    switch (parts[1]) {
      case 'w':
      case 't':
        property = material.weight;
        break;
      case 'v':
      case 'm':
      case 'm3':
        property = material.volume;
        break;
      case 'max':
        property = Math.max(material.weight, material.volume);
        break;
    }
    if (property !== void 0) {
      expression = expression.replace(match, property.toFixed(3));
    }
  }
  return expression;
}
function replaceKilo(expression) {
  return expression.replace(/(\d+)k\b/gi, (_, num) => (parseFloat(num) * 1e3).toString());
}
function init() {
  applyCssRules();
  subscribe($$(document, 'input'), input => {
    if (input.inputMode !== 'numeric' && input.inputMode !== 'decimal') {
      return;
    }
    input.addEventListener('keydown', e => onKeyDown(input, e));
  });
}
function applyCssRules() {
  const inputSelector = `div:has(> input:is([inputmode='numeric'], [inputmode='decimal']):focus)`;
  const selector = `.FormComponent__input___f43wqaQ > ${inputSelector}`;
  applyCssRule(selector, $style.inputContainer);
  applyCssRule(`${selector}:before`, fa.solid);
  applyCssRule(`${selector}:before`, $style.functionIcon);
  const selectorDynamic = `.${C.DynamicInput.dynamic} > ${inputSelector}`;
  applyCssRule(selectorDynamic, $style.inputContainer);
  applyCssRule(`${selectorDynamic}:before`, fa.solid);
  applyCssRule(`${selectorDynamic}:before`, $style.functionIconDynamic);
}
features.add(
  import.meta.url,
  init,
  'Evaluates math expressions in numeric text fields on Enter or Tab.',
);
