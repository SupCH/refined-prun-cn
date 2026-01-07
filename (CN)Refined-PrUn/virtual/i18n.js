import { materialsStore } from './materials.js';
let PrunI18N = {};
const materialsByName = /* @__PURE__ */ new Map();
function loadPrunI18N() {
  PrunI18N = window['PrUn_i18n'];
  for (const material of materialsStore.all.value) {
    const name = getMaterialName(material);
    if (name) {
      materialsByName.set(name, material);
    }
  }
}
function getMaterialName(material) {
  return material ? PrunI18N[`Material.${material?.name}.name`]?.[0]?.value : void 0;
}
function getMaterialByName(name) {
  return name ? materialsByName.get(name) : void 0;
}
export { PrunI18N, getMaterialByName, getMaterialName, loadPrunI18N };
