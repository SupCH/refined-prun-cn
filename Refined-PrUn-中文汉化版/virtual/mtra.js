import { act } from './act-registry.js';
import _sfc_main$1 from './Edit.vue2.js';
import _sfc_main from './Configure.vue.js';
import { MTRA_TRANSFER } from './MTRA_TRANSFER.js';
import { deserializeStorage, atSameLocation } from './utils3.js';
import { configurableValue } from './shared-types.js';
act.addAction({
  type: 'MTRA',
  description: (action, config) => {
    if (!action.group || !action.origin || !action.dest) {
      return '--';
    }
    const origin =
      action.origin == configurableValue
        ? (config?.origin ?? 'configured location')
        : action.origin;
    const dest =
      action.dest == configurableValue
        ? (config?.destination ?? 'configured location')
        : action.dest;
    return `Transfer group [${action.group}] from ${origin} to ${dest}`;
  },
  editComponent: _sfc_main$1,
  configureComponent: _sfc_main,
  needsConfigure: data => {
    return data.origin === configurableValue || data.dest === configurableValue;
  },
  isValidConfig: (data, config) => {
    return (
      (data.origin !== configurableValue || config.origin !== void 0) &&
      (data.dest !== configurableValue || config.destination !== void 0)
    );
  },
  generateSteps: async ctx => {
    const { data, config, getMaterialGroup, emitStep } = ctx;
    const assert = ctx.assert;
    const materials = await getMaterialGroup(data.group);
    assert(materials, 'Invalid material group');
    const serializedOrigin = data.origin === configurableValue ? config?.origin : data.origin;
    const origin = deserializeStorage(serializedOrigin);
    assert(origin, 'Invalid origin');
    const serializedDest = data.dest === configurableValue ? config?.destination : data.dest;
    const dest = deserializeStorage(serializedDest);
    assert(dest, 'Invalid destination');
    const isSameLocation = atSameLocation(origin, dest);
    assert(isSameLocation, 'Origin and destination are not at the same location');
    for (const ticker of Object.keys(materials)) {
      emitStep(
        MTRA_TRANSFER({
          from: origin.id,
          to: dest.id,
          ticker,
          amount: materials[ticker],
        }),
      );
    }
  },
});
