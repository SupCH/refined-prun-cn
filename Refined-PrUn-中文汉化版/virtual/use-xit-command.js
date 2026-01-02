import { inject } from './runtime-core.esm-bundler.js';
function useXitCommand() {
  return inject(xitCommandKey) ?? '';
}
const xitCommandKey = Symbol();
export { useXitCommand, xitCommandKey };
