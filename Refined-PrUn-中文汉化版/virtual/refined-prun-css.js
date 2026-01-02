import features from './feature-registry.js';
import { castArray } from './cast-array.js';
let rules = {};
function loadRefinedPrunCss() {
  const css = document.getElementById('refined-prun-css');
  rules = JSON.parse(css.textContent);
  css.textContent = null;
}
function applyCssRule(arg1, arg2, arg3) {
  if (!features.current) {
    throw new Error('Cannot apply css rules outside of feature init');
  }
  let commands;
  let selectors;
  let sourceClass;
  if (arguments.length === 2) {
    commands = [];
    selectors = castArray(arg1);
    sourceClass = arg2;
  } else {
    commands = castArray(arg1);
    selectors = castArray(arg2);
    sourceClass = arg3;
  }
  if (!sourceClass) {
    throw new Error('Source class is undefined');
  }
  const sourceSelector = '.' + sourceClass;
  const match = rules[sourceSelector];
  if (!match) {
    throw new Error(`Failed to find css selector ${sourceSelector}`);
  }
  if (commands.length > 0) {
    for (const selector of selectors) {
      for (const command of commands) {
        applyRawCssRule(match.replace(sourceSelector, `${selectCommand(command)} ${selector}`));
      }
    }
  } else {
    for (const selector of selectors) {
      applyRawCssRule(match.replace(sourceSelector, selector));
    }
  }
}
let currentSheet = {
  id: '',
  textContent: '',
};
const sheets = [];
function applyRawCssRule(rule) {
  if (currentSheet.id !== features.current) {
    queueSheetAppend();
    currentSheet = {
      id: features.current,
      textContent: '',
    };
    sheets.push(currentSheet);
  } else {
    currentSheet.textContent += '\n\n';
  }
  currentSheet.textContent += rule;
}
function queueSheetAppend() {
  if (sheets.length > 0) {
    return;
  }
  queueMicrotask(() => {
    for (const sheet of sheets) {
      const style = document.createElement('style');
      style.id = `rp-css-${sheet.id}`;
      style.textContent = `.refined-prun ${wrapInBrackets(sheet.textContent)}`;
      document.head.appendChild(style);
    }
  });
}
function wrapInBrackets(text) {
  return `{
  ${indent(text)}
}`;
}
function indent(text) {
  return text.replaceAll('\n', '\n  ');
}
function selectCommand(command) {
  return `.rp-command-${command}`;
}
export { applyCssRule, applyRawCssRule, loadRefinedPrunCss };
