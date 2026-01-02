import { sitesStore, getBuildingLastRepair } from './sites.js';
import { shipsStore, getShipLastRepair } from './ships.js';
import { getEntityNameFromAddress, getEntityNaturalIdFromAddress } from './addresses.js';
import { isRepairableBuilding, getBuildingBuildMaterials } from './buildings.js';
import { isEmpty } from './is-empty.js';
function getParameterSites(parameters) {
  let sites = [];
  if (isEmpty(parameters)) {
    if (sitesStore.all.value === void 0) {
      return void 0;
    }
    sites = sitesStore.all.value;
  }
  for (let i = 0; i < parameters.length; i++) {
    const site = sitesStore.getByPlanetNaturalIdOrName(parameters[i]);
    if (site) {
      sites.push(site);
    }
  }
  return sites;
}
function calculateBuildingEntries(sites) {
  if (!sites) {
    return void 0;
  }
  const entries = [];
  for (const site of sites) {
    const target = getEntityNameFromAddress(site.address);
    const naturalId = getEntityNaturalIdFromAddress(site.address);
    for (const building of site.platforms.filter(isRepairableBuilding)) {
      entries.push({
        ticker: building.module.reactorTicker,
        target,
        naturalId,
        lastRepair: getBuildingLastRepair(building),
        condition: building.condition,
        materials: building.repairMaterials,
        fullMaterials: getBuildingBuildMaterials(building, site),
      });
    }
  }
  entries.sort((a, b) => a.condition - b.condition);
  return entries;
}
function getParameterShips(parameters) {
  let ships = [];
  if (parameters.length === 0 || parameters.some(isShipParameter)) {
    if (shipsStore.all.value === void 0) {
      return void 0;
    }
    ships = shipsStore.all.value;
  }
  return ships;
}
function calculateShipEntries(ships) {
  if (!ships) {
    return void 0;
  }
  const entries = [];
  for (const ship of ships) {
    entries.push({
      ticker: ship.name,
      target: ship.name,
      naturalId: 'SHIP',
      lastRepair: getShipLastRepair(ship),
      condition: ship.condition,
      materials: ship.repairMaterials,
      fullMaterials: ship.repairMaterials,
    });
  }
  entries.sort((a, b) => a.condition - b.condition);
  return entries;
}
function isShipParameter(parameter) {
  const upper = parameter.toUpperCase();
  return upper === 'SHIP' || upper === 'SHIPS';
}
export { calculateBuildingEntries, calculateShipEntries, getParameterShips, getParameterSites };
