import { planetsStore } from './planets.js';
import { stationsStore } from './stations.js';
import { convertToPlanetNaturalId } from './planet-natural-id.js';
const correctableCommands = /* @__PURE__ */ new Set([
  'ADM',
  'BBC',
  'BRA',
  'BS',
  'BSC',
  'COGC',
  'COGCPEX',
  'COGCU',
  'FLTP',
  'GOV',
  'INV',
  'LM',
  'LMP',
  'LR',
  'PLI',
  'POPI',
  'POPR',
  'PPS',
  'SHY',
  'WAR',
]);
const stationCommands = /* @__PURE__ */ new Set(['INV', 'LM', 'LMP', 'WAR']);
function correctPlanetCommand(parts) {
  const command = parts[0].toUpperCase();
  if (!correctableCommands.has(command)) {
    return;
  }
  const args = parts.slice(1);
  if (args.length === 1) {
    if (planetsStore.getByNaturalId(args[0])) {
      return;
    }
    if (stationCommands.has(command) && stationsStore.getByNaturalId(args[0])) {
      return;
    }
  }
  const joinedArgs = args.join(' ');
  const naturalId = convertToPlanetNaturalId(joinedArgs, args);
  if (naturalId && joinedArgs !== naturalId) {
    parts.splice(1);
    parts.push(naturalId);
  }
}
export { correctPlanetCommand };
