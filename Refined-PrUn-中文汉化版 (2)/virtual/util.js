import { materialsStore } from './materials.js';
import { planetsStore } from './planets.js';
import { starsStore, getStarNaturalId } from './stars.js';
import { stationsStore } from './stations.js';
import { getMaterialName } from './i18n.js';
import { sleep } from './sleep.js';
function downloadFile(fileData, fileName, isJSON = true) {
  const blob = new Blob([isJSON ? JSON.stringify(fileData) : fileData], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const urlElement = document.createElement('a');
  urlElement.setAttribute('download', fileName);
  urlElement.href = url;
  urlElement.setAttribute('target', '_blank');
  urlElement.click();
  URL.revokeObjectURL(url);
  return;
}
function changeInputValue(input, value) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
  setter.set.call(input, value);
  const event = new InputEvent('input', { bubbles: true, cancelable: true });
  input.dispatchEvent(event);
  const changeEvent = new Event('change', { bubbles: true, cancelable: true });
  input.dispatchEvent(changeEvent);
}
function focusElement(input) {
  const event = new FocusEvent('focusin', { bubbles: true, cancelable: false });
  input.dispatchEvent(event);
}
function comparePlanets(idOrNameA, idOrNameB) {
  const planetA = planetsStore.find(idOrNameA);
  const planetB = planetsStore.find(idOrNameB);
  if (planetA === planetB) {
    return 0;
  }
  if (!planetA) {
    return 1;
  }
  if (!planetB) {
    return -1;
  }
  const systemA = starsStore.getByPlanetNaturalId(planetA.naturalId);
  const systemB = starsStore.getByPlanetNaturalId(planetB.naturalId);
  if (!systemA) {
    return 1;
  }
  if (!systemB) {
    return -1;
  }
  if (systemA !== systemB) {
    const naturalIdA = getStarNaturalId(systemA);
    const naturalIdB = getStarNaturalId(systemB);
    const isSystemANamed = systemA.name !== naturalIdA;
    const isSystemBNamed = systemB.name !== naturalIdB;
    if (isSystemANamed && !isSystemBNamed) {
      return -1;
    }
    if (isSystemBNamed && !isSystemANamed) {
      return 1;
    }
    if (isSystemANamed && isSystemBNamed) {
      return systemA.name > systemB.name ? 1 : -1;
    }
    return naturalIdA > naturalIdB ? 1 : -1;
  }
  const isPlanetANamed = planetA.name !== planetA.naturalId;
  const isPlanetBNamed = planetB.name !== planetB.naturalId;
  if (isPlanetANamed && !isPlanetBNamed) {
    return -1;
  }
  if (isPlanetANamed && !isPlanetBNamed) {
    return 1;
  }
  return isPlanetANamed && isPlanetBNamed
    ? planetA.name > planetB.name
      ? 1
      : -1
    : planetA.naturalId > planetB.naturalId
      ? 1
      : -1;
}
function extractPlanetName(text) {
  if (!text) {
    return text;
  }
  text = text
    .replace(/\s*\([^)]*\)/, '')
    .replace(/(\d)\s+(?=[a-zA-Z])/, '$1')
    .replace(/.*\s-\s/, '');
  return stationsStore.getNaturalIdFromName(text) ?? text;
}
function getMaterialNameByTicker(ticker) {
  const material = materialsStore.getByTicker(ticker);
  return getMaterialName(material);
}
async function clickElement(element) {
  if (!element) {
    return;
  }
  element.dispatchEvent(
    new PointerEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  );
  element.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  );
  await sleep(0);
  element.dispatchEvent(
    new PointerEvent('pointerup', {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  );
  element.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  );
  element.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  );
}
export {
  changeInputValue,
  clickElement,
  comparePlanets,
  downloadFile,
  extractPlanetName,
  focusElement,
  getMaterialNameByTicker,
};
