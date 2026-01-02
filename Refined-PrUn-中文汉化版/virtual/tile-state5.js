import { createTileStateHook } from './user-data-tiles.js';
const useTileState = createTileStateHook({
  red: true,
  yellow: true,
  green: true,
  inf: true,
  expand: [],
});
export { useTileState };
