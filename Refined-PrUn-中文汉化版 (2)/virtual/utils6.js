import { storagesStore } from './storage.js';
function getRefuelOrigins() {
  return (storagesStore.all.value ?? []).filter(
    x => x.type !== 'FTL_FUEL_STORE' && x.type !== 'STL_FUEL_STORE',
  );
}
export { getRefuelOrigins };
