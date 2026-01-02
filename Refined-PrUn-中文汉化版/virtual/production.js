import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createMapGetter, createGroupMapGetter } from './create-map-getter.js';
import { request } from './request-hooks2.js';
import { reactive, ref } from './reactivity.esm-bundler.js';
const store = createEntityStore();
const state = store.state;
const fetchedSites = reactive(/* @__PURE__ */ new Set());
const fetchedAll = ref(false);
onApiMessage({
  CLIENT_CONNECTION_OPENED() {
    fetchedSites.clear();
    fetchedAll.value = false;
  },
  PRODUCTION_PRODUCTION_LINES(data) {
    store.setAll(data.productionLines);
    fetchedAll.value = true;
    store.setFetched();
  },
  PRODUCTION_SITE_PRODUCTION_LINES(data) {
    store.setMany(data.productionLines);
    fetchedSites.add(data.siteId);
    store.setFetched();
  },
  PRODUCTION_PRODUCTION_LINE(data) {
    store.setOne(data);
    store.setFetched();
  },
  PRODUCTION_PRODUCTION_LINE_ADDED(data) {
    store.addOne(data);
    store.setFetched();
  },
  PRODUCTION_PRODUCTION_LINE_UPDATED(data) {
    store.updateOne(data);
  },
  PRODUCTION_PRODUCTION_LINE_REMOVED(data) {
    store.removeOne(data.productionLineId);
  },
  PRODUCTION_ORDER_ADDED(data) {
    const line = state.getById(data.productionLineId);
    if (line !== void 0 && !line.orders.some(x => x.id === data.id)) {
      store.setOne({
        ...line,
        orders: [...line.orders, data],
      });
    }
  },
  PRODUCTION_ORDER_UPDATED(data) {
    const line = state.getById(data.productionLineId);
    if (line !== void 0) {
      store.setOne({
        ...line,
        orders: line.orders.map(x => (x.id === data.id ? { ...x, ...data } : x)),
      });
    }
  },
  PRODUCTION_ORDER_REMOVED(data) {
    const line = state.getById(data.productionLineId);
    if (line !== void 0) {
      store.setOne({
        ...line,
        orders: line.orders.filter(x => x.id !== data.orderId),
      });
    }
  },
});
const getByShortId = createMapGetter(state.all, x => x.id.substring(0, 8));
const getById = value => state.getById(value) ?? getByShortId(value);
const getByShortSiteId = createGroupMapGetter(state.all, x => x.siteId.substring(0, 8));
const getByFullSiteId = createGroupMapGetter(state.all, x => x.siteId);
const getBySiteId = value => {
  const result = getByFullSiteId(value) ?? getByShortSiteId(value);
  if (result) {
    return result;
  }
  if (!value) {
    return void 0;
  }
  if (fetchedAll.value || fetchedSites.has(value)) {
    return [];
  } else {
    request.production(value);
  }
  return void 0;
};
const productionStore = {
  ...state,
  getById,
  getBySiteId,
};
export { productionStore };
