import { inject } from './runtime-core.esm-bundler.js';
function useTile() {
  return inject(tileKey);
}
const tileKey = Symbol();
export { tileKey, useTile };
