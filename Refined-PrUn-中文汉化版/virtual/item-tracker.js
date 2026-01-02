import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tinycolor from './tinycolor.js';
import { refTextContent } from './reactive-dom.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { materialsStore } from './materials.js';
import { materialCategoriesStore } from './material-categories.js';
import { objectKeys } from './object-keys.js';
function trackItemTickers() {
  appendStylesheet();
  subscribe($$(document, C.ColoredIcon.label), label => {
    const container = label.closest(`.${C.ColoredIcon.container}`);
    if (!container) {
      return;
    }
    const currentClasses = [];
    const ticker = refTextContent(label);
    watchEffectWhileNodeAlive(label, () => {
      for (const className of currentClasses) {
        container.classList.remove(className);
      }
      currentClasses.length = 0;
      if (!ticker.value) {
        return;
      }
      currentClasses.push('rp-ticker-' + ticker.value);
      const material = materialsStore.getByTicker(ticker.value);
      const category = materialCategoriesStore.getById(material?.category);
      if (category) {
        currentClasses.push('rp-category-' + sanitizeCategoryName(category.name));
      }
      for (const className of currentClasses) {
        container.classList.add(className);
      }
    });
  });
}
function appendStylesheet() {
  const style = document.createElement('style');
  style.id = 'rp-css-icon-colors';
  const defaultColor = tinycolor('black');
  const gradientStart = defaultColor.darken(20).toHexString();
  const gradientEnd = defaultColor.brighten(10).toHexString();
  const fontColor = defaultColor.brighten(40).toHexString();
  const defaultStyle = `.${C.ColoredIcon.container} {
  background: linear-gradient(135deg, ${gradientStart}, ${gradientEnd});
  color: ${fontColor};
}

`;
  style.textContent = defaultStyle + objectKeys(categoryColors).map(createCssRule).join('\n\n');
  document.head.appendChild(style);
}
function createCssRule(category) {
  const color = tinycolor(categoryColors[category].color);
  const gradientStart = color.darken(20).toHexString();
  const gradientEnd = color.brighten(10).toHexString();
  const fontColor = color.brighten(40).toHexString();
  return `.rp-category-${sanitizeCategoryName(category)} {
  background: linear-gradient(135deg, ${gradientStart}, ${gradientEnd});
  color: ${fontColor};
}`;
}
function sanitizeCategoryName(name) {
  return name.replaceAll(' ', '-').replaceAll('(', '').replaceAll(')', '');
}
const categoryColors = {
  'agricultural products': {
    color: 'b22222',
  },
  alloys: {
    color: 'cd7f32',
  },
  chemicals: {
    color: 'db7093',
  },
  'construction materials': {
    color: '6495ed',
  },
  'construction parts': {
    color: '4682b4',
  },
  'construction prefabs': {
    color: '1c39bb',
  },
  'consumable bundles': {
    color: '971728',
  },
  'consumables (basic)': {
    color: 'cd5c5c',
  },
  'consumables (luxury)': {
    color: 'da2c43',
  },
  drones: {
    color: 'e25822',
  },
  'electronic devices': {
    color: '8a2be2',
  },
  'electronic parts': {
    color: '9370db',
  },
  'electronic pieces': {
    color: 'b19cd9',
  },
  'electronic systems': {
    color: '663399',
  },
  elements: {
    color: '806043',
  },
  'energy systems': {
    color: '2e8b57',
  },
  fuels: {
    color: '32cd32',
  },
  gases: {
    color: '00ced1',
  },
  infrastructure: {
    color: '1e1e8c',
  },
  liquids: {
    color: 'bcd4e6',
  },
  'medical equipment': {
    color: '99cc99',
  },
  metals: {
    color: '696969',
  },
  minerals: {
    color: 'C4A484',
  },
  ores: {
    color: '838996',
  },
  plastics: {
    color: 'cb3365',
  },
  'ship engines': {
    color: 'ff4500',
  },
  'ship kits': {
    color: 'ff8c00',
  },
  'ship parts': {
    color: 'ffa500',
  },
  'ship shields': {
    color: 'ffb347',
  },
  'software components': {
    color: 'c5b358',
  },
  'software systems': {
    color: '9b870c',
  },
  'software tools': {
    color: 'daa520',
  },
  textiles: {
    color: '96a53c',
  },
  'unit prefabs': {
    color: '534b4f',
  },
  utility: {
    color: 'CEC7C1',
  },
};
export { sanitizeCategoryName, trackItemTickers };
