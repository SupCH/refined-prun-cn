import { loadUserData } from './user-data-serializer.js';
import { initializeTileListener } from './user-data-tiles.js';
import { trackBalanceHistory } from './user-data-balance.js';
function initializeUserData() {
  loadUserData();
  initializeTileListener();
  trackBalanceHistory();
}
export { initializeUserData };
