import { act } from './act-registry.js';
import _sfc_main$1 from './Edit.vue3.js';
import _sfc_main from './Configure.vue2.js';
import { CXPO_BUY } from './CXPO_BUY.js';
import { MTRA_TRANSFER } from './MTRA_TRANSFER.js';
import { configurableValue } from './shared-types.js';
import { deserializeStorage, atSameLocation } from './utils3.js';
import { storagesStore } from './storage.js';
import { materialsStore } from './materials.js';
import { getEntityNaturalIdFromAddress } from './addresses.js';
import { warehousesStore } from './warehouses.js';
import { exchangesStore } from './exchanges.js';
import { clamp } from './clamp.js';
act.addAction({
  type: 'Refuel',
  description: action => {
    return action.origin ? 'Refuel all ships near ' + action.origin : '--';
  },
  editComponent: _sfc_main$1,
  configureComponent: _sfc_main,
  needsConfigure: data => {
    return data.origin === configurableValue;
  },
  isValidConfig: (data, config) => {
    return data.origin !== configurableValue || config.origin !== void 0;
  },
  generateSteps: async ctx => {
    const { data, config, log, emitStep } = ctx;
    const assert = ctx.assert;
    const serializedOrigin = data.origin === configurableValue ? config?.origin : data.origin;
    const origin = deserializeStorage(serializedOrigin);
    assert(origin, 'Invalid origin');
    const exchangeCode = getExchangeCode(origin);
    const isCX = exchangeCode !== void 0;
    const dockedStl = (storagesStore.all.value ?? []).filter(
      x => x.type === 'STL_FUEL_STORE' && atSameLocation(x, origin),
    );
    const dockedFtl = (storagesStore.all.value ?? []).filter(
      x => x.type === 'FTL_FUEL_STORE' && atSameLocation(x, origin),
    );
    if (dockedStl.length === 0 && dockedFtl.length === 0) {
      log.warning('No ships are docked near the origin');
      return;
    }
    const stlMaterial = materialsStore.getByTicker('SF');
    assert(stlMaterial, 'SF material not found');
    const ftlMaterial = materialsStore.getByTicker('FF');
    assert(ftlMaterial, 'FF material not found');
    const totalStlRefuel = dockedStl.reduce(
      (acc, x) => acc + calculateRefuelAmount(x, stlMaterial),
      0,
    );
    const totalFtlRefuel = dockedFtl.reduce(
      (acc, x) => acc + calculateRefuelAmount(x, ftlMaterial),
      0,
    );
    if (totalFtlRefuel === 0 && totalStlRefuel === 0) {
      log.info('No ships need refueling');
      return;
    }
    let presentStlFuel =
      origin.items.find(x => x.quantity?.material.ticker === stlMaterial.ticker)?.quantity
        ?.amount ?? 0;
    if (presentStlFuel < totalStlRefuel) {
      if (isCX && data.buyMissingFuel) {
        emitStep(
          CXPO_BUY({
            exchange: exchangeCode,
            ticker: stlMaterial.ticker,
            amount: totalStlRefuel - presentStlFuel,
            priceLimit: Number.POSITIVE_INFINITY,
            buyPartial: false,
            allowUnfilled: false,
          }),
        );
        presentStlFuel = totalStlRefuel;
      } else {
        log.warning('Not enough SF at the origin. Some ships will not be refueled.');
      }
    }
    let presentFtlFuel =
      origin.items.find(x => x.quantity?.material.ticker === ftlMaterial.ticker)?.quantity
        ?.amount ?? 0;
    if (presentFtlFuel < totalFtlRefuel) {
      if (isCX && data.buyMissingFuel) {
        emitStep(
          CXPO_BUY({
            exchange: exchangeCode,
            ticker: ftlMaterial.ticker,
            amount: totalFtlRefuel - presentFtlFuel,
            priceLimit: Number.POSITIVE_INFINITY,
            buyPartial: false,
            allowUnfilled: false,
          }),
        );
        presentFtlFuel = totalFtlRefuel;
      } else {
        log.warning('Not enough FF at the origin. Some ships will not be refueled.');
      }
    }
    for (const store of dockedStl) {
      const amount = clamp(calculateRefuelAmount(store, stlMaterial), 0, presentStlFuel);
      if (amount === 0) {
        continue;
      }
      emitStep(
        MTRA_TRANSFER({
          from: origin.id,
          to: store.id,
          ticker: stlMaterial.ticker,
          amount,
        }),
      );
      presentStlFuel -= amount;
    }
    for (const store of dockedFtl) {
      const amount = clamp(calculateRefuelAmount(store, ftlMaterial), 0, presentFtlFuel);
      if (amount === 0) {
        continue;
      }
      emitStep(
        MTRA_TRANSFER({
          from: origin.id,
          to: store.id,
          ticker: ftlMaterial.ticker,
          amount,
        }),
      );
      presentFtlFuel -= amount;
    }
  },
});
function getExchangeCode(store) {
  const warehouse = warehousesStore.getById(store.addressableId);
  const originNaturalId = getEntityNaturalIdFromAddress(warehouse?.address);
  const exchange = exchangesStore.getByNaturalId(originNaturalId);
  return exchange?.code;
}
function calculateRefuelAmount(store, material) {
  const freeVolume = store.volumeCapacity - store.volumeLoad;
  return Math.round(freeVolume / material.volume);
}
