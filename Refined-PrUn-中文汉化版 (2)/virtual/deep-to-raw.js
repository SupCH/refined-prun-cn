import { isRef, isReactive, isProxy, toRaw } from './reactivity.esm-bundler.js';
function deepToRaw(sourceObj) {
  const objectIterator = input => {
    if (Array.isArray(input)) {
      return input.map(item => objectIterator(item));
    }
    if (isRef(input) || isReactive(input) || isProxy(input)) {
      return objectIterator(toRaw(input));
    }
    if (input && typeof input === 'object') {
      return Object.keys(input).reduce((acc, key) => {
        acc[key] = objectIterator(input[key]);
        return acc;
      }, {});
    }
    return input;
  };
  return objectIterator(sourceObj);
}
export { deepToRaw };
