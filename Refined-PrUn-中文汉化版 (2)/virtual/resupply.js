import './config.js';
import { act } from './act-registry.js';
import _sfc_main$1 from './Edit.vue5.js';
import _sfc_main from './Configure.vue4.js';
import { sitesStore } from './sites.js';
import { workforcesStore } from './workforces.js';
import { productionStore } from './production.js';
import { storagesStore } from './storage.js';
import { configurableValue } from './shared-types.js';
import { calculatePlanetBurn } from './burn2.js';
import { watchWhile } from './watch.js';
import { getEntityNameFromAddress, getEntityNaturalIdFromAddress } from './addresses.js';
import { computed } from './runtime-core.esm-bundler.js';
import { toRef } from './reactivity.esm-bundler.js';
act.addMaterialGroup({
  type: 'Resupply',
  description: data => {
    if (!data.planet || data.days === void 0) {
      return '--';
    }
    return `Resupply ${data.planet} with ${data.days} day${data.days == 1 ? '' : 's'} of supplies`;
  },
  editComponent: _sfc_main$1,
  configureComponent: _sfc_main,
  needsConfigure: data => data.planet === configurableValue,
  isValidConfig: (data, config) => data.planet !== configurableValue || config.planet !== void 0,
  generateMaterialBill: async ({ data, config, log, setStatus }) => {
    if (!data.planet) {
      log.error('Missing resupply planet');
    }
    if (data.days === void 0) {
      log.error('Missing resupply days');
    }
    const exclusions = data.exclusions ?? [];
    const planet = data.planet === configurableValue ? config.planet : data.planet;
    const site = sitesStore.getByPlanetNaturalIdOrName(planet);
    if (!site) {
      log.error(`Base is not present on ${data.planet}`);
    }
    if (!site || data.days === void 0) {
      return void 0;
    }
    const workforce = computed(() => workforcesStore.getById(site?.siteId)?.workforces);
    const production = computed(() => productionStore.getBySiteId(site.siteId));
    if (workforce.value === void 0 || production.value === void 0) {
      const name =
        getEntityNameFromAddress(site.address) ?? getEntityNaturalIdFromAddress(site.address);
      setStatus(`Loading ${name} burn data...`);
      await watchWhile(toRef(() => workforce.value === void 0 || production.value === void 0));
    }
    const stores = storagesStore.getByAddressableId(site.siteId);
    const planetBurn = calculatePlanetBurn(
      data.consumablesOnly ? void 0 : production.value,
      workforce.value,
      (data.useBaseInv ?? true) ? stores : void 0,
    );
    const parsedGroup = {};
    for (const ticker of Object.keys(planetBurn)) {
      if (exclusions.includes(ticker)) {
        continue;
      }
      const matBurn = planetBurn[ticker];
      if (matBurn.dailyAmount >= 0) {
        continue;
      }
      const days = typeof data.days === 'number' ? data.days : parseFloat(data.days);
      const need = Math.ceil((matBurn.daysLeft - days) * matBurn.dailyAmount);
      if (need > 0) {
        parsedGroup[ticker] = need;
      }
    }
    return parsedGroup;
  },
});
