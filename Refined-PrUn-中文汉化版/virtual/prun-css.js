import { _$$, $$, registerClassName } from './select-dom.js';
import { subscribe } from './subscribe-async-generator.js';
import { watchUntil } from './watch.js';
import { reactive, ref } from './reactivity.esm-bundler.js';
const C = {};
const prunCssStylesheets = reactive(/* @__PURE__ */ new Set());
const appContainerFound = ref(false);
let mergedPrunStyles = '';
const prunStyleUpdated = ref(false);
async function loadPrunCss() {
  for (const style of _$$(document.head, 'style')) {
    processStylesheet(style);
  }
  subscribe($$(document.head, 'style'), processStylesheet);
  await watchUntil(() => appContainerFound.value);
}
function processStylesheet(style) {
  if (style.dataset.source !== 'prun' || prunCssStylesheets.has(style)) {
    return;
  }
  const classSet = /* @__PURE__ */ new Set();
  const cssRules = style.sheet.cssRules;
  for (let i = 0; i < cssRules.length; i++) {
    const rule = cssRules.item(i);
    const selector = rule?.selectorText;
    if (!selector?.includes('___')) {
      continue;
    }
    const matches = selector.match(/[\w-]+__[\w-]+___[\w-]+/g);
    for (const match of matches ?? []) {
      const className = match.replace('.', '');
      classSet.add(className);
    }
  }
  const classes = Array.from(classSet);
  classes.sort();
  for (const cssClass of classes) {
    const camelize = s => s.replace(/-./g, x => x[1].toUpperCase());
    const parts = cssClass.replace('__', '.').replace('___', '.').split('.');
    const parent = camelize(parts[0]);
    if (parent === '') {
      continue;
    }
    const child = camelize(parts[1]);
    let parentObject = C[parent];
    if (parentObject === void 0) {
      parentObject = {};
      C[parent] = parentObject;
    }
    if (parentObject[child] !== void 0) {
      continue;
    }
    parentObject[child] = cssClass;
    registerClassName(cssClass);
  }
  prunCssStylesheets.add(style);
  appContainerFound.value = C.App?.container !== void 0;
  mergedPrunStyles +=
    style.textContent
      .split('\n')
      .filter(x => !x.includes('sourceMappingURL'))
      .join('\n') + '\n';
}
export { C, loadPrunCss, mergedPrunStyles, prunCssStylesheets, prunStyleUpdated };
