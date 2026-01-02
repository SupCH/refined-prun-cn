import { mergeMaterialAmounts } from './sort-materials.js';
import { sumMaterialAmountPrice } from './cx.js';
function calcBuildingCondition(age) {
  return age > 180 ? 0 : 1 - age / 180;
}
function isRepairableBuilding(building) {
  return building.module.type === 'RESOURCES' || building.module.type === 'PRODUCTION';
}
function getBuildingBuildMaterials(building, site) {
  const buildOption = site.buildOptions.options.find(
    x => x.ticker === building.module.reactorTicker,
  );
  if (buildOption) {
    return buildOption.materials.quantities;
  }
  const materials = building.reclaimableMaterials.concat(building.repairMaterials);
  return mergeMaterialAmounts(materials);
}
function calcBuildingMarketValue(building, site) {
  return sumMaterialAmountPrice(getBuildingBuildMaterials(building, site));
}
export {
  calcBuildingCondition,
  calcBuildingMarketValue,
  getBuildingBuildMaterials,
  isRepairableBuilding,
};
