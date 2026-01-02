import { planetsStore } from './planets.js';
import { starsStore, getStarNaturalId } from './stars.js';
function convertToPlanetNaturalId(naturalIdOrName, parts) {
  const planet = planetsStore.find(naturalIdOrName);
  if (planet) {
    return planet.naturalId;
  }
  parts ??= naturalIdOrName.split(' ');
  return getPlanetNaturalIdByStarName(parts);
}
function getPlanetNaturalIdByStarName(parts) {
  if (parts.length < 2) {
    return void 0;
  }
  const systemName = parts.slice(0, -1).join(' ');
  const star = starsStore.find(systemName);
  if (star) {
    return getStarNaturalId(star) + parts[parts.length - 1];
  }
  return void 0;
}
export { convertToPlanetNaturalId };
