import { nonCurrentAssets } from './non-current-assets.js';
import { inventory } from './inventory.js';
import { workInProgressByLocation } from './orders2.js';
function calculateLocationAssets() {
  const locations = [];
  function getLocation(name) {
    let location = locations.find(x => x.name === name);
    if (!location) {
      location = {
        name,
        current: 0,
        nonCurrent: 0,
        total: 0,
      };
      locations.push(location);
    }
    return location;
  }
  if (!inventory.byLocation.value) {
    return void 0;
  }
  for (const [name, value] of inventory.byLocation.value) {
    const location = getLocation(name);
    location.current += value;
    location.total += value;
  }
  if (!workInProgressByLocation.value) {
    return void 0;
  }
  for (const [name, value] of workInProgressByLocation.value) {
    const location = getLocation(name);
    location.current += value;
    location.total += value;
  }
  if (!nonCurrentAssets.buildingsNetValueByLocation.value) {
    return void 0;
  }
  for (const [name, value] of nonCurrentAssets.buildingsNetValueByLocation.value) {
    const location = getLocation(name);
    location.nonCurrent += value;
    location.total += value;
  }
  locations.sort((a, b) => b.total - a.total);
  return locations;
}
export { calculateLocationAssets };
