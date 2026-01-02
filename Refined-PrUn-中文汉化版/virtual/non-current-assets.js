import {
  sumAccountsPayable,
  partnerNonCurrentConditions,
  sumLoanRepayments,
  sumShipmentDeliveries,
  sumMaterialsPickup,
  sumDeliveries,
  selfNonCurrentConditions,
} from './contract-conditions.js';
import { buildings, buildingsNetValueByLocation } from './buildings2.js';
import { sum } from './sum.js';
import { blueprintsStore } from './blueprints.js';
import { sumBy } from './sum-by.js';
import { shipsStore } from './ships.js';
import { sumMaterialAmountPrice } from './cx.js';
import { shipyardProjectsStore } from './shipyard-projects.js';
import { map } from './map-values.js';
import { companyStore } from './company.js';
import { calculateHQUpgradeMaterials } from './hq.js';
import { computed } from './runtime-core.esm-bundler.js';
const builtShips = computed(() => {
  blueprintsStore.request();
  return sumBy(shipsStore.all.value, calculateShipValue);
});
function calculateShipValue(ship) {
  const blueprint = blueprintsStore.getByNaturalId(ship.blueprintNaturalId);
  return sumMaterialAmountPrice(blueprint?.billOfMaterial.quantities);
}
const startedShips = computed(() =>
  sumBy(
    shipyardProjectsStore.all.value?.filter(x => x.status === 'STARTED'),
    x => sumMaterialAmountPrice(x.inventory.items),
  ),
);
const shipsMarketValue = computed(() => sum(builtShips.value, startedShips.value));
const shipsDepreciation = computed(() => {
  return sumBy(shipsStore.all.value, x => sumMaterialAmountPrice(x.repairMaterials));
});
const hqLevel = computed(() => map([companyStore.value], x => x.headquarters.level));
const hqBuiltLevels = computed(() =>
  map([hqLevel.value], x => sumMaterialAmountPrice(calculateHQUpgradeMaterials(0, x))),
);
const hqAssignedItems = computed(() =>
  map([companyStore.value], x => sumMaterialAmountPrice(x.headquarters.inventory.items)),
);
const hqUpgrades = computed(() => map([hqBuiltLevels.value, hqAssignedItems.value], sum));
const arc = computed(() => companyStore.value?.representation.contributedTotal.amount);
const accountsReceivable = computed(() => sumAccountsPayable(partnerNonCurrentConditions));
const longTermLoans = computed(() => sumLoanRepayments(partnerNonCurrentConditions));
const materialsInTransit = computed(() => sumShipmentDeliveries(partnerNonCurrentConditions));
const materialsReceivable = computed(() =>
  sum(sumDeliveries(partnerNonCurrentConditions), sumMaterialsPickup(selfNonCurrentConditions)),
);
const nonCurrentAssets = {
  buildings,
  buildingsNetValueByLocation,
  shipsMarketValue,
  shipsDepreciation,
  accountsReceivable,
  materialsInTransit,
  materialsReceivable,
  longTermLoans,
  hqUpgrades,
  arc,
};
export { nonCurrentAssets };
