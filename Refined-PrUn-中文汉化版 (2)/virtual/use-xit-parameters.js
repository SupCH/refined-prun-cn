import { inject } from './runtime-core.esm-bundler.js';
function useXitParameters() {
  return inject(xitParametersKey) ?? [];
}
const xitParametersKey = Symbol();
export { useXitParameters, xitParametersKey };
