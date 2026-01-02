import { starsStore, getStarNaturalId } from './stars.js';
import { convertToPlanetNaturalId } from './planet-natural-id.js';
import { exchangesStore } from './exchanges.js';
import { getSystemLineFromAddress } from './addresses.js';
const correctableCommands = /* @__PURE__ */ new Set(['FLTS', 'INF', 'MS', 'SYSI']);
function correctSystemCommand(parts) {
  if (!correctableCommands.has(parts[0].toUpperCase())) {
    return;
  }
  const args = parts.slice(1);
  const argsJoined = args.join(' ');
  let star = starsStore.getByName(argsJoined);
  if (!star) {
    const planetNaturalId = convertToPlanetNaturalId(argsJoined, args);
    star = starsStore.getByPlanetNaturalId(planetNaturalId);
  }
  if (!star) {
    const exchange = exchangesStore.getByNaturalId(argsJoined);
    const systemLine = getSystemLineFromAddress(exchange?.address);
    star = starsStore.getByNaturalId(systemLine?.entity.naturalId);
  }
  if (!star) {
    return;
  }
  const naturalId = getStarNaturalId(star);
  if (argsJoined !== naturalId) {
    parts.splice(1);
    parts.push(naturalId);
  }
}
export { correctSystemCommand };
