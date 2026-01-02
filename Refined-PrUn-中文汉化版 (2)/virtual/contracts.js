import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createMapGetter } from './create-map-getter.js';
import { computed } from './runtime-core.esm-bundler.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  CONTRACTS_CONTRACTS(data) {
    store.setAll(data.contracts);
    store.setFetched();
  },
  CONTRACTS_CONTRACT(data) {
    store.setOne(data);
  },
});
const getByLocalId = createMapGetter(state.all, x => x.localId);
function getByShipmentId(id) {
  if (!id) {
    return void 0;
  }
  const all = state.all.value;
  if (all === void 0) {
    return void 0;
  }
  for (const contract of all) {
    const condition = contract.conditions.find(
      x => x.type === 'DELIVERY_SHIPMENT' && x.shipmentItemId?.startsWith(id),
    );
    if (condition) {
      return contract;
    }
  }
  return void 0;
}
function getDestinationByShipmentId(id) {
  return getDeliveryConditionByShipmentId(id)?.destination;
}
function getDeliveryConditionByShipmentId(id) {
  if (!id) {
    return void 0;
  }
  const all = state.all.value;
  if (all === void 0) {
    return void 0;
  }
  for (const contract of all) {
    for (const condition of contract.conditions) {
      if (
        condition.type === 'PROVISION_SHIPMENT' &&
        condition.blockId?.toLowerCase().startsWith(id.toLowerCase())
      ) {
        const delivery = contract.conditions.find(x => x.type === 'DELIVERY_SHIPMENT');
        if (delivery) {
          return delivery;
        }
      }
      if (
        condition.type === 'DELIVERY_SHIPMENT' &&
        condition.shipmentItemId?.toLowerCase().startsWith(id.toLowerCase())
      ) {
        return condition;
      }
    }
  }
  return void 0;
}
const active = computed(() =>
  state.all.value?.filter(
    x =>
      x.status === 'CLOSED' ||
      x.status === 'PARTIALLY_FULFILLED' ||
      x.status === 'DEADLINE_EXCEEDED',
  ),
);
const contractsStore = {
  ...state,
  active,
  getByLocalId,
  getByShipmentId,
  getDestinationByShipmentId,
};
function isFactionContract(contract) {
  return contract.partner.countryCode !== void 0;
}
export { active, contractsStore, isFactionContract };
