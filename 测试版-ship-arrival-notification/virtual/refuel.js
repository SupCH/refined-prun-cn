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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmdWVsLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9hY3Rpb25zL3JlZnVlbC9yZWZ1ZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWN0IH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdC1yZWdpc3RyeSc7XG5pbXBvcnQgRWRpdCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy9yZWZ1ZWwvRWRpdC52dWUnO1xuaW1wb3J0IENvbmZpZ3VyZSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy9yZWZ1ZWwvQ29uZmlndXJlLnZ1ZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy9yZWZ1ZWwvY29uZmlnJztcbmltcG9ydCB7IENYUE9fQlVZIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdGlvbi1zdGVwcy9DWFBPX0JVWSc7XG5pbXBvcnQgeyBNVFJBX1RSQU5TRkVSIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdGlvbi1zdGVwcy9NVFJBX1RSQU5TRkVSJztcbmltcG9ydCB7IEFzc2VydEZuLCBjb25maWd1cmFibGVWYWx1ZSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgYXRTYW1lTG9jYXRpb24sIGRlc2VyaWFsaXplU3RvcmFnZSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9hY3Rpb25zL3V0aWxzJztcbmltcG9ydCB7IHN0b3JhZ2VzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc3RvcmFnZSc7XG5pbXBvcnQgeyBtYXRlcmlhbHNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9tYXRlcmlhbHMnO1xuaW1wb3J0IHsgZ2V0RW50aXR5TmF0dXJhbElkRnJvbUFkZHJlc3MgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYWRkcmVzc2VzJztcbmltcG9ydCB7IHdhcmVob3VzZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS93YXJlaG91c2VzJztcbmltcG9ydCB7IGV4Y2hhbmdlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2V4Y2hhbmdlcyc7XG5pbXBvcnQgeyBjbGFtcCB9IGZyb20gJ0BzcmMvdXRpbHMvY2xhbXAnO1xuXG5hY3QuYWRkQWN0aW9uPENvbmZpZz4oe1xuICB0eXBlOiAnUmVmdWVsJyxcbiAgZGVzY3JpcHRpb246IGFjdGlvbiA9PiB7XG4gICAgcmV0dXJuIGFjdGlvbi5vcmlnaW4gPyAnUmVmdWVsIGFsbCBzaGlwcyBuZWFyICcgKyBhY3Rpb24ub3JpZ2luIDogJy0tJztcbiAgfSxcbiAgZWRpdENvbXBvbmVudDogRWRpdCxcbiAgY29uZmlndXJlQ29tcG9uZW50OiBDb25maWd1cmUsXG4gIG5lZWRzQ29uZmlndXJlOiBkYXRhID0+IHtcbiAgICByZXR1cm4gZGF0YS5vcmlnaW4gPT09IGNvbmZpZ3VyYWJsZVZhbHVlO1xuICB9LFxuICBpc1ZhbGlkQ29uZmlnOiAoZGF0YSwgY29uZmlnKSA9PiB7XG4gICAgcmV0dXJuIGRhdGEub3JpZ2luICE9PSBjb25maWd1cmFibGVWYWx1ZSB8fCBjb25maWcub3JpZ2luICE9PSB1bmRlZmluZWQ7XG4gIH0sXG4gIGdlbmVyYXRlU3RlcHM6IGFzeW5jIGN0eCA9PiB7XG4gICAgY29uc3QgeyBkYXRhLCBjb25maWcsIGxvZywgZW1pdFN0ZXAgfSA9IGN0eDtcbiAgICBjb25zdCBhc3NlcnQ6IEFzc2VydEZuID0gY3R4LmFzc2VydDtcblxuICAgIGNvbnN0IHNlcmlhbGl6ZWRPcmlnaW4gPSBkYXRhLm9yaWdpbiA9PT0gY29uZmlndXJhYmxlVmFsdWUgPyBjb25maWc/Lm9yaWdpbiA6IGRhdGEub3JpZ2luO1xuICAgIGNvbnN0IG9yaWdpbiA9IGRlc2VyaWFsaXplU3RvcmFnZShzZXJpYWxpemVkT3JpZ2luKTtcbiAgICBhc3NlcnQob3JpZ2luLCAnSW52YWxpZCBvcmlnaW4nKTtcblxuICAgIGNvbnN0IGV4Y2hhbmdlQ29kZSA9IGdldEV4Y2hhbmdlQ29kZShvcmlnaW4pO1xuICAgIGNvbnN0IGlzQ1ggPSBleGNoYW5nZUNvZGUgIT09IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGRvY2tlZFN0bCA9IChzdG9yYWdlc1N0b3JlLmFsbC52YWx1ZSA/PyBbXSkuZmlsdGVyKFxuICAgICAgeCA9PiB4LnR5cGUgPT09ICdTVExfRlVFTF9TVE9SRScgJiYgYXRTYW1lTG9jYXRpb24oeCwgb3JpZ2luKSxcbiAgICApO1xuXG4gICAgY29uc3QgZG9ja2VkRnRsID0gKHN0b3JhZ2VzU3RvcmUuYWxsLnZhbHVlID8/IFtdKS5maWx0ZXIoXG4gICAgICB4ID0+IHgudHlwZSA9PT0gJ0ZUTF9GVUVMX1NUT1JFJyAmJiBhdFNhbWVMb2NhdGlvbih4LCBvcmlnaW4pLFxuICAgICk7XG5cbiAgICBpZiAoZG9ja2VkU3RsLmxlbmd0aCA9PT0gMCAmJiBkb2NrZWRGdGwubGVuZ3RoID09PSAwKSB7XG4gICAgICBsb2cud2FybmluZygnTm8gc2hpcHMgYXJlIGRvY2tlZCBuZWFyIHRoZSBvcmlnaW4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdGxNYXRlcmlhbCA9IG1hdGVyaWFsc1N0b3JlLmdldEJ5VGlja2VyKCdTRicpO1xuICAgIGFzc2VydChzdGxNYXRlcmlhbCwgJ1NGIG1hdGVyaWFsIG5vdCBmb3VuZCcpO1xuXG4gICAgY29uc3QgZnRsTWF0ZXJpYWwgPSBtYXRlcmlhbHNTdG9yZS5nZXRCeVRpY2tlcignRkYnKTtcbiAgICBhc3NlcnQoZnRsTWF0ZXJpYWwsICdGRiBtYXRlcmlhbCBub3QgZm91bmQnKTtcblxuICAgIGNvbnN0IHRvdGFsU3RsUmVmdWVsID0gZG9ja2VkU3RsLnJlZHVjZShcbiAgICAgIChhY2MsIHgpID0+IGFjYyArIGNhbGN1bGF0ZVJlZnVlbEFtb3VudCh4LCBzdGxNYXRlcmlhbCksXG4gICAgICAwLFxuICAgICk7XG5cbiAgICBjb25zdCB0b3RhbEZ0bFJlZnVlbCA9IGRvY2tlZEZ0bC5yZWR1Y2UoXG4gICAgICAoYWNjLCB4KSA9PiBhY2MgKyBjYWxjdWxhdGVSZWZ1ZWxBbW91bnQoeCwgZnRsTWF0ZXJpYWwpLFxuICAgICAgMCxcbiAgICApO1xuXG4gICAgaWYgKHRvdGFsRnRsUmVmdWVsID09PSAwICYmIHRvdGFsU3RsUmVmdWVsID09PSAwKSB7XG4gICAgICBsb2cuaW5mbygnTm8gc2hpcHMgbmVlZCByZWZ1ZWxpbmcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcHJlc2VudFN0bEZ1ZWwgPVxuICAgICAgb3JpZ2luLml0ZW1zLmZpbmQoeCA9PiB4LnF1YW50aXR5Py5tYXRlcmlhbC50aWNrZXIgPT09IHN0bE1hdGVyaWFsLnRpY2tlcik/LnF1YW50aXR5XG4gICAgICAgID8uYW1vdW50ID8/IDA7XG5cbiAgICBpZiAocHJlc2VudFN0bEZ1ZWwgPCB0b3RhbFN0bFJlZnVlbCkge1xuICAgICAgaWYgKGlzQ1ggJiYgZGF0YS5idXlNaXNzaW5nRnVlbCkge1xuICAgICAgICBlbWl0U3RlcChcbiAgICAgICAgICBDWFBPX0JVWSh7XG4gICAgICAgICAgICBleGNoYW5nZTogZXhjaGFuZ2VDb2RlLFxuICAgICAgICAgICAgdGlja2VyOiBzdGxNYXRlcmlhbC50aWNrZXIsXG4gICAgICAgICAgICBhbW91bnQ6IHRvdGFsU3RsUmVmdWVsIC0gcHJlc2VudFN0bEZ1ZWwsXG4gICAgICAgICAgICBwcmljZUxpbWl0OiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXG4gICAgICAgICAgICBidXlQYXJ0aWFsOiBmYWxzZSxcbiAgICAgICAgICAgIGFsbG93VW5maWxsZWQ6IGZhbHNlLFxuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgICBwcmVzZW50U3RsRnVlbCA9IHRvdGFsU3RsUmVmdWVsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nLndhcm5pbmcoJ05vdCBlbm91Z2ggU0YgYXQgdGhlIG9yaWdpbi4gU29tZSBzaGlwcyB3aWxsIG5vdCBiZSByZWZ1ZWxlZC4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcHJlc2VudEZ0bEZ1ZWwgPVxuICAgICAgb3JpZ2luLml0ZW1zLmZpbmQoeCA9PiB4LnF1YW50aXR5Py5tYXRlcmlhbC50aWNrZXIgPT09IGZ0bE1hdGVyaWFsLnRpY2tlcik/LnF1YW50aXR5XG4gICAgICAgID8uYW1vdW50ID8/IDA7XG5cbiAgICBpZiAocHJlc2VudEZ0bEZ1ZWwgPCB0b3RhbEZ0bFJlZnVlbCkge1xuICAgICAgaWYgKGlzQ1ggJiYgZGF0YS5idXlNaXNzaW5nRnVlbCkge1xuICAgICAgICBlbWl0U3RlcChcbiAgICAgICAgICBDWFBPX0JVWSh7XG4gICAgICAgICAgICBleGNoYW5nZTogZXhjaGFuZ2VDb2RlLFxuICAgICAgICAgICAgdGlja2VyOiBmdGxNYXRlcmlhbC50aWNrZXIsXG4gICAgICAgICAgICBhbW91bnQ6IHRvdGFsRnRsUmVmdWVsIC0gcHJlc2VudEZ0bEZ1ZWwsXG4gICAgICAgICAgICBwcmljZUxpbWl0OiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXG4gICAgICAgICAgICBidXlQYXJ0aWFsOiBmYWxzZSxcbiAgICAgICAgICAgIGFsbG93VW5maWxsZWQ6IGZhbHNlLFxuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgICBwcmVzZW50RnRsRnVlbCA9IHRvdGFsRnRsUmVmdWVsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nLndhcm5pbmcoJ05vdCBlbm91Z2ggRkYgYXQgdGhlIG9yaWdpbi4gU29tZSBzaGlwcyB3aWxsIG5vdCBiZSByZWZ1ZWxlZC4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHN0b3JlIG9mIGRvY2tlZFN0bCkge1xuICAgICAgY29uc3QgYW1vdW50ID0gY2xhbXAoY2FsY3VsYXRlUmVmdWVsQW1vdW50KHN0b3JlLCBzdGxNYXRlcmlhbCksIDAsIHByZXNlbnRTdGxGdWVsKTtcbiAgICAgIGlmIChhbW91bnQgPT09IDApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBlbWl0U3RlcChcbiAgICAgICAgTVRSQV9UUkFOU0ZFUih7XG4gICAgICAgICAgZnJvbTogb3JpZ2luLmlkLFxuICAgICAgICAgIHRvOiBzdG9yZS5pZCxcbiAgICAgICAgICB0aWNrZXI6IHN0bE1hdGVyaWFsLnRpY2tlcixcbiAgICAgICAgICBhbW91bnQsXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHByZXNlbnRTdGxGdWVsIC09IGFtb3VudDtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHN0b3JlIG9mIGRvY2tlZEZ0bCkge1xuICAgICAgY29uc3QgYW1vdW50ID0gY2xhbXAoY2FsY3VsYXRlUmVmdWVsQW1vdW50KHN0b3JlLCBmdGxNYXRlcmlhbCksIDAsIHByZXNlbnRGdGxGdWVsKTtcbiAgICAgIGlmIChhbW91bnQgPT09IDApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBlbWl0U3RlcChcbiAgICAgICAgTVRSQV9UUkFOU0ZFUih7XG4gICAgICAgICAgZnJvbTogb3JpZ2luLmlkLFxuICAgICAgICAgIHRvOiBzdG9yZS5pZCxcbiAgICAgICAgICB0aWNrZXI6IGZ0bE1hdGVyaWFsLnRpY2tlcixcbiAgICAgICAgICBhbW91bnQsXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHByZXNlbnRGdGxGdWVsIC09IGFtb3VudDtcbiAgICB9XG4gIH0sXG59KTtcblxuZnVuY3Rpb24gZ2V0RXhjaGFuZ2VDb2RlKHN0b3JlOiBQcnVuQXBpLlN0b3JlKSB7XG4gIGNvbnN0IHdhcmVob3VzZSA9IHdhcmVob3VzZXNTdG9yZS5nZXRCeUlkKHN0b3JlLmFkZHJlc3NhYmxlSWQpO1xuICBjb25zdCBvcmlnaW5OYXR1cmFsSWQgPSBnZXRFbnRpdHlOYXR1cmFsSWRGcm9tQWRkcmVzcyh3YXJlaG91c2U/LmFkZHJlc3MpO1xuICBjb25zdCBleGNoYW5nZSA9IGV4Y2hhbmdlc1N0b3JlLmdldEJ5TmF0dXJhbElkKG9yaWdpbk5hdHVyYWxJZCk7XG4gIHJldHVybiBleGNoYW5nZT8uY29kZTtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlUmVmdWVsQW1vdW50KHN0b3JlOiBQcnVuQXBpLlN0b3JlLCBtYXRlcmlhbDogUHJ1bkFwaS5NYXRlcmlhbCkge1xuICAvLyBGdWVsIHN0b3JlcyBoYXZlIHRoZSBzYW1lIHZvbHVtZS93ZWlnaHQgY2FwYWNpdHkgcmF0aW8gYXMgdGhlIG1hdGVyaWFsLFxuICAvLyBzbyB3ZSBjYW4gdXNlIGVpdGhlciBvbmUuXG4gIGNvbnN0IGZyZWVWb2x1bWUgPSBzdG9yZS52b2x1bWVDYXBhY2l0eSAtIHN0b3JlLnZvbHVtZUxvYWQ7XG4gIHJldHVybiBNYXRoLnJvdW5kKGZyZWVWb2x1bWUgLyBtYXRlcmlhbC52b2x1bWUpO1xufVxuIl0sIm5hbWVzIjpbIkVkaXQiLCJDb25maWd1cmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFlQSxJQUFJLFVBQWtCO0FBQUEsRUFDcEIsTUFBTTtBQUFBLEVBQ04sYUFBYSxDQUFBLFdBQVU7QUFDckIsV0FBTyxPQUFPLFNBQVMsMkJBQTJCLE9BQU8sU0FBUztBQUFBLEVBQ3BFO0FBQUEsRUFDQSxlQUFlQTtBQUFBQSxFQUNmLG9CQUFvQkM7QUFBQUEsRUFDcEIsZ0JBQWdCLENBQUEsU0FBUTtBQUN0QixXQUFPLEtBQUssV0FBVztBQUFBLEVBQ3pCO0FBQUEsRUFDQSxlQUFlLENBQUMsTUFBTSxXQUFXO0FBQy9CLFdBQU8sS0FBSyxXQUFXLHFCQUFxQixPQUFPLFdBQVc7QUFBQSxFQUNoRTtBQUFBLEVBQ0EsZUFBZSxPQUFNLFFBQU87QUFDMUIsVUFBTSxFQUFFLE1BQU0sUUFBUSxLQUFLLGFBQWE7QUFDeEMsVUFBTSxTQUFtQixJQUFJO0FBRTdCLFVBQU0sbUJBQW1CLEtBQUssV0FBVyxvQkFBb0IsUUFBUSxTQUFTLEtBQUs7QUFDbkYsVUFBTSxTQUFTLG1CQUFtQixnQkFBZ0I7QUFDbEQsV0FBTyxRQUFRLGdCQUFnQjtBQUUvQixVQUFNLGVBQWUsZ0JBQWdCLE1BQU07QUFDM0MsVUFBTSxPQUFPLGlCQUFpQjtBQUU5QixVQUFNLGFBQWEsY0FBYyxJQUFJLFNBQVMsQ0FBQSxHQUFJO0FBQUEsTUFDaEQsT0FBSyxFQUFFLFNBQVMsb0JBQW9CLGVBQWUsR0FBRyxNQUFNO0FBQUEsSUFBQTtBQUc5RCxVQUFNLGFBQWEsY0FBYyxJQUFJLFNBQVMsQ0FBQSxHQUFJO0FBQUEsTUFDaEQsT0FBSyxFQUFFLFNBQVMsb0JBQW9CLGVBQWUsR0FBRyxNQUFNO0FBQUEsSUFBQTtBQUc5RCxRQUFJLFVBQVUsV0FBVyxLQUFLLFVBQVUsV0FBVyxHQUFHO0FBQ3BELFVBQUksUUFBUSxxQ0FBcUM7QUFDakQ7QUFBQSxJQUNGO0FBRUEsVUFBTSxjQUFjLGVBQWUsWUFBWSxJQUFJO0FBQ25ELFdBQU8sYUFBYSx1QkFBdUI7QUFFM0MsVUFBTSxjQUFjLGVBQWUsWUFBWSxJQUFJO0FBQ25ELFdBQU8sYUFBYSx1QkFBdUI7QUFFM0MsVUFBTSxpQkFBaUIsVUFBVTtBQUFBLE1BQy9CLENBQUMsS0FBSyxNQUFNLE1BQU0sc0JBQXNCLEdBQUcsV0FBVztBQUFBLE1BQ3REO0FBQUEsSUFBQTtBQUdGLFVBQU0saUJBQWlCLFVBQVU7QUFBQSxNQUMvQixDQUFDLEtBQUssTUFBTSxNQUFNLHNCQUFzQixHQUFHLFdBQVc7QUFBQSxNQUN0RDtBQUFBLElBQUE7QUFHRixRQUFJLG1CQUFtQixLQUFLLG1CQUFtQixHQUFHO0FBQ2hELFVBQUksS0FBSyx5QkFBeUI7QUFDbEM7QUFBQSxJQUNGO0FBRUEsUUFBSSxpQkFDRixPQUFPLE1BQU0sS0FBSyxDQUFBLE1BQUssRUFBRSxVQUFVLFNBQVMsV0FBVyxZQUFZLE1BQU0sR0FBRyxVQUN4RSxVQUFVO0FBRWhCLFFBQUksaUJBQWlCLGdCQUFnQjtBQUNuQyxVQUFJLFFBQVEsS0FBSyxnQkFBZ0I7QUFDL0I7QUFBQSxVQUNFLFNBQVM7QUFBQSxZQUNQLFVBQVU7QUFBQSxZQUNWLFFBQVEsWUFBWTtBQUFBLFlBQ3BCLFFBQVEsaUJBQWlCO0FBQUEsWUFDekIsWUFBWSxPQUFPO0FBQUEsWUFDbkIsWUFBWTtBQUFBLFlBQ1osZUFBZTtBQUFBLFVBQUEsQ0FDaEI7QUFBQSxRQUFBO0FBRUgseUJBQWlCO0FBQUEsTUFDbkIsT0FBTztBQUNMLFlBQUksUUFBUSwrREFBK0Q7QUFBQSxNQUM3RTtBQUFBLElBQ0Y7QUFFQSxRQUFJLGlCQUNGLE9BQU8sTUFBTSxLQUFLLENBQUEsTUFBSyxFQUFFLFVBQVUsU0FBUyxXQUFXLFlBQVksTUFBTSxHQUFHLFVBQ3hFLFVBQVU7QUFFaEIsUUFBSSxpQkFBaUIsZ0JBQWdCO0FBQ25DLFVBQUksUUFBUSxLQUFLLGdCQUFnQjtBQUMvQjtBQUFBLFVBQ0UsU0FBUztBQUFBLFlBQ1AsVUFBVTtBQUFBLFlBQ1YsUUFBUSxZQUFZO0FBQUEsWUFDcEIsUUFBUSxpQkFBaUI7QUFBQSxZQUN6QixZQUFZLE9BQU87QUFBQSxZQUNuQixZQUFZO0FBQUEsWUFDWixlQUFlO0FBQUEsVUFBQSxDQUNoQjtBQUFBLFFBQUE7QUFFSCx5QkFBaUI7QUFBQSxNQUNuQixPQUFPO0FBQ0wsWUFBSSxRQUFRLCtEQUErRDtBQUFBLE1BQzdFO0FBQUEsSUFDRjtBQUVBLGVBQVcsU0FBUyxXQUFXO0FBQzdCLFlBQU0sU0FBUyxNQUFNLHNCQUFzQixPQUFPLFdBQVcsR0FBRyxHQUFHLGNBQWM7QUFDakYsVUFBSSxXQUFXLEdBQUc7QUFDaEI7QUFBQSxNQUNGO0FBQ0E7QUFBQSxRQUNFLGNBQWM7QUFBQSxVQUNaLE1BQU0sT0FBTztBQUFBLFVBQ2IsSUFBSSxNQUFNO0FBQUEsVUFDVixRQUFRLFlBQVk7QUFBQSxVQUNwQjtBQUFBLFFBQUEsQ0FDRDtBQUFBLE1BQUE7QUFFSCx3QkFBa0I7QUFBQSxJQUNwQjtBQUVBLGVBQVcsU0FBUyxXQUFXO0FBQzdCLFlBQU0sU0FBUyxNQUFNLHNCQUFzQixPQUFPLFdBQVcsR0FBRyxHQUFHLGNBQWM7QUFDakYsVUFBSSxXQUFXLEdBQUc7QUFDaEI7QUFBQSxNQUNGO0FBQ0E7QUFBQSxRQUNFLGNBQWM7QUFBQSxVQUNaLE1BQU0sT0FBTztBQUFBLFVBQ2IsSUFBSSxNQUFNO0FBQUEsVUFDVixRQUFRLFlBQVk7QUFBQSxVQUNwQjtBQUFBLFFBQUEsQ0FDRDtBQUFBLE1BQUE7QUFFSCx3QkFBa0I7QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsT0FBc0I7QUFDN0MsUUFBTSxZQUFZLGdCQUFnQixRQUFRLE1BQU0sYUFBYTtBQUM3RCxRQUFNLGtCQUFrQiw4QkFBOEIsV0FBVyxPQUFPO0FBQ3hFLFFBQU0sV0FBVyxlQUFlLGVBQWUsZUFBZTtBQUM5RCxTQUFPLFVBQVU7QUFDbkI7QUFFQSxTQUFTLHNCQUFzQixPQUFzQixVQUE0QjtBQUcvRSxRQUFNLGFBQWEsTUFBTSxpQkFBaUIsTUFBTTtBQUNoRCxTQUFPLEtBQUssTUFBTSxhQUFhLFNBQVMsTUFBTTtBQUNoRDsifQ==
