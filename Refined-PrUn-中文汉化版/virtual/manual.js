import { act } from './act-registry.js';
import { fixed0 } from './format.js';
import _sfc_main from './Edit.vue7.js';
import { deepToRaw } from './deep-to-raw.js';
act.addMaterialGroup({
  type: 'Manual',
  description: data => {
    const materials = data.materials;
    if (!materials || Object.keys(materials).length == 0) {
      return '--';
    }
    return Object.keys(materials)
      .map(ticker => `${fixed0(materials[ticker])} ${ticker}`)
      .join(', ');
  },
  editComponent: _sfc_main,
  generateMaterialBill: async ({ data, log }) => {
    if (!data.materials || Object.keys(data.materials).length == 0) {
      log.error('Missing materials.');
      return void 0;
    }
    return structuredClone(deepToRaw(data.materials));
  },
});
