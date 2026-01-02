import { watchEffectWhileNodeAlive } from './watch.js';
function createReactiveSpan(owner, text) {
  const element = document.createElement('span');
  watchEffectWhileNodeAlive(owner, () => {
    element.style.display = text.value === void 0 ? 'none' : '';
    element.textContent = text.value ?? null;
  });
  return element;
}
function createReactiveDiv(owner, text) {
  const element = document.createElement('div');
  watchEffectWhileNodeAlive(owner, () => {
    element.style.display = text.value === void 0 ? 'none' : '';
    element.textContent = text.value ?? null;
  });
  return element;
}
export { createReactiveDiv, createReactiveSpan };
