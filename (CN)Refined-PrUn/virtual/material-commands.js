import { materialsStore } from './materials.js';
const correctableCommands = /* @__PURE__ */ new Set(['CXM', 'CXOB', 'CXP', 'CXPC', 'CXPO', 'MAT']);
function correctMaterialCommand(parts) {
  if (!correctableCommands.has(parts[0].toUpperCase())) {
    return;
  }
  const material = materialsStore.getByTicker(parts[1]);
  if (material) {
    parts[1] = parts[1].toUpperCase();
  }
}
export { correctMaterialCommand };
