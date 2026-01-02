import { getTileState as getTileState$1 } from './user-data-tiles.js';
import { computed } from './runtime-core.esm-bundler.js';
function getTileState(tile) {
  return computed(() => getTileState$1(tile));
}
export { getTileState };
