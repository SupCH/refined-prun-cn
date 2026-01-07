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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VwcGx5RGVtYW5kVmFsdWVzLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9jeG9iLXN1cHBseS1kZW1hbmQtdmFsdWVzL1N1cHBseURlbWFuZFZhbHVlcy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IGN4b2JTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9jeG9iJztcbmltcG9ydCB7IGZpeGVkMCB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCB7IGlzRmluaXRlT3JkZXIgfSBmcm9tICdAc3JjL2NvcmUvb3JkZXJzJztcblxuY29uc3QgeyB0aWNrZXIgfSA9IGRlZmluZVByb3BzPHsgdGlja2VyPzogc3RyaW5nIH0+KCk7XG5cbmNvbnN0IG9yZGVyQm9vayA9IGNvbXB1dGVkKCgpID0+IGN4b2JTdG9yZS5nZXRCeVRpY2tlcih0aWNrZXIpKTtcblxuY29uc3QgZGVtYW5kID0gY29tcHV0ZWQoKCkgPT4gc3VtT3JkZXJzKG9yZGVyQm9vay52YWx1ZT8uYnV5aW5nT3JkZXJzID8/IFtdKSk7XG5jb25zdCBzdXBwbHkgPSBjb21wdXRlZCgoKSA9PiBzdW1PcmRlcnMob3JkZXJCb29rLnZhbHVlPy5zZWxsaW5nT3JkZXJzID8/IFtdKSk7XG5cbmZ1bmN0aW9uIHN1bU9yZGVycyhvcmRlcnM6IFBydW5BcGkuQ1hCcm9rZXJPcmRlcltdKSB7XG4gIGxldCBzdW0gPSAwO1xuICBmb3IgKGNvbnN0IG9yZGVyIG9mIG9yZGVycykge1xuICAgIGlmICghaXNGaW5pdGVPcmRlcihvcmRlcikpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBzdW0gKz0gb3JkZXIuYW1vdW50O1xuICB9XG4gIHJldHVybiBzdW07XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IHYtaWY9XCJvcmRlckJvb2tcIj5cbiAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5kZW1hbmRcIiBkYXRhLXRvb2x0aXA9XCJQcmUtTU0gRGVtYW5kXCIgZGF0YS10b29sdGlwLXBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgIHt7IGZpeGVkMChkZW1hbmQpIH19XG4gICAgPC9kaXY+XG4gICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuc3VwcGx5XCIgZGF0YS10b29sdGlwPVwiUHJlLU1NIFN1cHBseVwiIGRhdGEtdG9vbHRpcC1wb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgIHt7IGZpeGVkMChzdXBwbHkpIH19XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5kZW1hbmQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgcGFkZGluZzogMnB4IDhweCAwIDhweDtcbiAgY29sb3I6ICM1Y2I4NWM7XG59XG5cbi5zdXBwbHkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIHBhZGRpbmc6IDJweCA4cHggMCA4cHg7XG4gIGNvbG9yOiAjZDk1MzRmO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX25vcm1hbGl6ZUNsYXNzIiwiX3RvRGlzcGxheVN0cmluZyIsIl91bnJlZiIsIl9jcmVhdGVDb21tZW50Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFPQSxVQUFBLFlBQUEsU0FBQSxNQUFBLFVBQUEsWUFBQSxRQUFBLE1BQUEsQ0FBQTtBQUVBLFVBQUEsU0FBQSxTQUFBLE1BQUEsVUFBQSxVQUFBLE9BQUEsZ0JBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxVQUFBLFNBQUEsU0FBQSxNQUFBLFVBQUEsVUFBQSxPQUFBLGlCQUFBLENBQUEsQ0FBQSxDQUFBO0FBRUEsYUFBQSxVQUFBLFFBQUE7QUFDRSxVQUFBLE1BQUE7QUFDQSxpQkFBQSxTQUFBLFFBQUE7QUFDRSxZQUFBLENBQUEsY0FBQSxLQUFBLEdBQUE7QUFDRTtBQUFBLFFBQUE7QUFFRixlQUFBLE1BQUE7QUFBQSxNQUFhO0FBRWYsYUFBQTtBQUFBLElBQU87OztRQVlEQSxnQkFBQSxPQUFBO0FBQUEsVUFKRSxPQUFBQyxlQUFBLEtBQUEsT0FBQSxNQUFBO0FBQUEsVUFGb0IsZ0JBQUE7QUFBQSxVQUFlLHlCQUFBO0FBQUEsUUFBc0MsR0FBQUMsZ0JBQUFDLE1BQUEsTUFBQSxFQUFBQSxNQUFBLE1BQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBLFFBQzdESCxnQkFBQSxPQUFBO0FBQUEsVUFJWixPQUFBQyxlQUFBLEtBQUEsT0FBQSxNQUFBO0FBQUEsVUFGb0IsZ0JBQUE7QUFBQSxVQUFlLHlCQUFBO0FBQUEsUUFBc0MsR0FBQUMsZ0JBQUFDLE1BQUEsTUFBQSxFQUFBQSxNQUFBLE1BQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBLE1BQzdELENBQUEsS0FBQUMsbUJBQUEsSUFBQSxJQUFBO0FBQUE7OzsifQ==
