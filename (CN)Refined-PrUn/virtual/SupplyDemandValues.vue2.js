import { cxobStore } from './cxob.js';
import { fixed0 } from './format.js';
import { isFiniteOrder } from './orders.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  createCommentVNode,
  openBlock,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SupplyDemandValues',
  props: {
    ticker: {},
  },
  setup(__props) {
    const orderBook = computed(() => cxobStore.getByTicker(__props.ticker));
    const demand = computed(() => sumOrders(orderBook.value?.buyingOrders ?? []));
    const supply = computed(() => sumOrders(orderBook.value?.sellingOrders ?? []));
    function sumOrders(orders) {
      let sum = 0;
      for (const order of orders) {
        if (!isFiniteOrder(order)) {
          break;
        }
        sum += order.amount;
      }
      return sum;
    }
    return (_ctx, _cache) => {
      return unref(orderBook)
        ? (openBlock(),
          createElementBlock('div', _hoisted_1, [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.demand),
                'data-tooltip': 'Pre-MM Demand',
                'data-tooltip-position': 'right',
              },
              toDisplayString(unref(fixed0)(unref(demand))),
              3,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.supply),
                'data-tooltip': 'Pre-MM Supply',
                'data-tooltip-position': 'left',
              },
              toDisplayString(unref(fixed0)(unref(supply))),
              3,
            ),
          ]))
        : createCommentVNode('', true);
    };
  },
});
export { _sfc_main as default };
