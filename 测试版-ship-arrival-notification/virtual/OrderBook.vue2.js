import { C } from './prun-css.js';
import { cxobStore } from './cxob.js';
import OrderRow from './OrderRow.vue.js';
import { fixed2 } from './format.js';
import { isFiniteOrder } from './orders.js';
import { isEmpty } from './is-empty.js';
import {
  defineComponent,
  computed,
  useTemplateRef,
  watchEffect,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
  createBlock,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { shallowRef, unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _hoisted_2 = { style: { color: '#eee' } };
const _hoisted_3 = { key: 1 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'OrderBook',
  props: {
    ticker: {},
    onOrderClick: { type: Function },
  },
  setup(__props) {
    const orderBook = computed(() => cxobStore.getByTicker(__props.ticker));
    const offers = computed(() => orderBook.value?.sellingOrders.toReversed() ?? []);
    const requests = computed(() => orderBook.value?.buyingOrders ?? []);
    const spread = computed(() => {
      const ask = orderBook.value?.ask?.price.amount;
      const bid = orderBook.value?.bid?.price.amount;
      return ask !== void 0 && bid !== void 0 ? fixed2(ask - bid) : '--';
    });
    const scrollElement = useTemplateRef('order-book');
    const spreadElement = useTemplateRef('spread');
    watchEffect(() => {
      if (!scrollElement.value || !spreadElement.value) {
        return;
      }
      const spreadRect = spreadElement.value.getBoundingClientRect();
      scrollElement.value.scrollTop = Math.max(
        spreadElement.value.offsetTop -
          scrollElement.value.clientHeight / 2 +
          spreadRect.height / 2,
        0,
      );
    });
    const hoverData = shallowRef(null);
    function onHover(data) {
      hoverData.value = data;
    }
    function onClick(data) {
      if (!orderBook.value) {
        return;
      }
      const order = data.order;
      if (!data.cumulative) {
        __props.onOrderClick(order.limit.amount);
        return;
      }
      const orders = getCumulativeOrders(order);
      const quantity = orders.map(x => x.amount).reduce((a, b) => a + b, 0);
      __props.onOrderClick(orders.at(-1)?.limit.amount ?? 0, quantity);
    }
    const cumulativeOrders = computed(() => {
      if (!hoverData.value || !hoverData.value.cumulative) {
        return [];
      }
      return getCumulativeOrders(hoverData.value.order);
    });
    const highlightedAmounts = computed(() => new Set(cumulativeOrders.value));
    function isAmountHighlighted(order) {
      return highlightedAmounts.value.has(order);
    }
    const highlightedPrice = computed(() => {
      if (!hoverData.value) {
        return void 0;
      }
      if (!hoverData.value.cumulative) {
        return hoverData.value.order;
      }
      return cumulativeOrders.value.at(-1);
    });
    function isPriceHighlighted(order) {
      return highlightedPrice.value?.id === order.id;
    }
    function getCumulativeOrders(targetOrder) {
      if (!orderBook.value) {
        return [];
      }
      const orders = orderBook.value.sellingOrders.includes(targetOrder)
        ? orderBook.value.sellingOrders
        : orderBook.value.buyingOrders;
      let cumulativeOrders2 = [];
      for (const order of orders) {
        cumulativeOrders2.push(order);
        if (order.id === targetOrder.id || !isFiniteOrder(order)) {
          break;
        }
      }
      return cumulativeOrders2;
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            ref: 'order-book',
            class: normalizeClass(_ctx.$style.container),
          },
          [
            createBaseVNode('table', null, [
              _cache[1] ||
                (_cache[1] = createBaseVNode(
                  'thead',
                  null,
                  [
                    createBaseVNode('tr', null, [
                      createBaseVNode('th', null, 'Amt.'),
                      createBaseVNode('th', null, 'Price'),
                    ]),
                  ],
                  -1,
                )),
              createBaseVNode('tbody', null, [
                !unref(isEmpty)(unref(offers))
                  ? (openBlock(true),
                    createElementBlock(
                      Fragment,
                      { key: 0 },
                      renderList(unref(offers), order => {
                        return (
                          openBlock(),
                          createBlock(
                            OrderRow,
                            {
                              key: order.id,
                              order,
                              'highlight-amount': isAmountHighlighted(order),
                              'highlight-price': isPriceHighlighted(order),
                              'on-hover': onHover,
                              'on-click': onClick,
                            },
                            null,
                            8,
                            ['order', 'highlight-amount', 'highlight-price'],
                          )
                        );
                      }),
                      128,
                    ))
                  : (openBlock(),
                    createElementBlock('tr', _hoisted_1, [
                      createBaseVNode(
                        'td',
                        {
                          class: normalizeClass(
                            ('C' in _ctx ? _ctx.C : unref(C)).ComExOrderBookPanel.empty,
                          ),
                          colSpan: '2',
                        },
                        'No offers.',
                        2,
                      ),
                    ])),
              ]),
              createBaseVNode(
                'tbody',
                {
                  ref_key: 'spread',
                  ref: spread,
                },
                [
                  createBaseVNode('tr', null, [
                    createBaseVNode(
                      'td',
                      {
                        colSpan: '2',
                        class: normalizeClass([
                          ('C' in _ctx ? _ctx.C : unref(C)).ComExOrderBookPanel.spread,
                          _ctx.$style.spread,
                        ]),
                      },
                      [
                        _cache[0] || (_cache[0] = createTextVNode(' Spread: ', -1)),
                        createBaseVNode('span', _hoisted_2, toDisplayString(unref(spread)), 1),
                      ],
                      2,
                    ),
                  ]),
                ],
                512,
              ),
              createBaseVNode('tbody', null, [
                !unref(isEmpty)(unref(requests))
                  ? (openBlock(true),
                    createElementBlock(
                      Fragment,
                      { key: 0 },
                      renderList(unref(requests), order => {
                        return (
                          openBlock(),
                          createBlock(
                            OrderRow,
                            {
                              key: order.id,
                              request: '',
                              order,
                              'highlight-amount': isAmountHighlighted(order),
                              'highlight-price': isPriceHighlighted(order),
                              'on-hover': onHover,
                              'on-click': onClick,
                            },
                            null,
                            8,
                            ['order', 'highlight-amount', 'highlight-price'],
                          )
                        );
                      }),
                      128,
                    ))
                  : (openBlock(),
                    createElementBlock('tr', _hoisted_3, [
                      createBaseVNode(
                        'td',
                        {
                          class: normalizeClass(
                            ('C' in _ctx ? _ctx.C : unref(C)).ComExOrderBookPanel.empty,
                          ),
                          colSpan: '2',
                        },
                        'No requests.',
                        2,
                      ),
                    ])),
              ]),
            ]),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJCb29rLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9jeHBvLW9yZGVyLWJvb2svT3JkZXJCb29rLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgY3hvYlN0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2N4b2InO1xuaW1wb3J0IE9yZGVyUm93IGZyb20gJy4vT3JkZXJSb3cudnVlJztcbmltcG9ydCB7IGZpeGVkMiB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICd0cy1leHRyYXMnO1xuaW1wb3J0IHsgT3JkZXJIb3ZlckRhdGEgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL2Jhc2ljL2N4cG8tb3JkZXItYm9vay9vcmRlci1ob3Zlci1kYXRhJztcbmltcG9ydCB7IGlzRmluaXRlT3JkZXIgfSBmcm9tICdAc3JjL2NvcmUvb3JkZXJzJztcblxuY29uc3QgeyB0aWNrZXIsIG9uT3JkZXJDbGljayB9ID0gZGVmaW5lUHJvcHM8e1xuICB0aWNrZXI/OiBzdHJpbmc7XG4gIG9uT3JkZXJDbGljazogKHByaWNlOiBudW1iZXIsIHF1YW50aXR5PzogbnVtYmVyKSA9PiB2b2lkO1xufT4oKTtcblxuY29uc3Qgb3JkZXJCb29rID0gY29tcHV0ZWQoKCkgPT4gY3hvYlN0b3JlLmdldEJ5VGlja2VyKHRpY2tlcikpO1xuXG5jb25zdCBvZmZlcnMgPSBjb21wdXRlZCgoKSA9PiBvcmRlckJvb2sudmFsdWU/LnNlbGxpbmdPcmRlcnMudG9SZXZlcnNlZCgpID8/IFtdKTtcbmNvbnN0IHJlcXVlc3RzID0gY29tcHV0ZWQoKCkgPT4gb3JkZXJCb29rLnZhbHVlPy5idXlpbmdPcmRlcnMgPz8gW10pO1xuY29uc3Qgc3ByZWFkID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCBhc2sgPSBvcmRlckJvb2sudmFsdWU/LmFzaz8ucHJpY2UuYW1vdW50O1xuICBjb25zdCBiaWQgPSBvcmRlckJvb2sudmFsdWU/LmJpZD8ucHJpY2UuYW1vdW50O1xuICByZXR1cm4gYXNrICE9PSB1bmRlZmluZWQgJiYgYmlkICE9PSB1bmRlZmluZWQgPyBmaXhlZDIoYXNrIC0gYmlkKSA6ICctLSc7XG59KTtcblxuY29uc3Qgc2Nyb2xsRWxlbWVudCA9IHVzZVRlbXBsYXRlUmVmPEhUTUxFbGVtZW50Pignb3JkZXItYm9vaycpO1xuY29uc3Qgc3ByZWFkRWxlbWVudCA9IHVzZVRlbXBsYXRlUmVmPEhUTUxFbGVtZW50Pignc3ByZWFkJyk7XG53YXRjaEVmZmVjdCgoKSA9PiB7XG4gIGlmICghc2Nyb2xsRWxlbWVudC52YWx1ZSB8fCAhc3ByZWFkRWxlbWVudC52YWx1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHNwcmVhZFJlY3QgPSBzcHJlYWRFbGVtZW50LnZhbHVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBzY3JvbGxFbGVtZW50LnZhbHVlLnNjcm9sbFRvcCA9IE1hdGgubWF4KFxuICAgIHNwcmVhZEVsZW1lbnQudmFsdWUub2Zmc2V0VG9wIC0gc2Nyb2xsRWxlbWVudC52YWx1ZS5jbGllbnRIZWlnaHQgLyAyICsgc3ByZWFkUmVjdC5oZWlnaHQgLyAyLFxuICAgIDAsXG4gICk7XG59KTtcblxuY29uc3QgaG92ZXJEYXRhID0gc2hhbGxvd1JlZjxPcmRlckhvdmVyRGF0YSB8IG51bGw+KG51bGwpO1xuXG5mdW5jdGlvbiBvbkhvdmVyKGRhdGE6IE9yZGVySG92ZXJEYXRhIHwgbnVsbCkge1xuICBob3ZlckRhdGEudmFsdWUgPSBkYXRhO1xufVxuXG5mdW5jdGlvbiBvbkNsaWNrKGRhdGE6IE9yZGVySG92ZXJEYXRhKSB7XG4gIGlmICghb3JkZXJCb29rLnZhbHVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgb3JkZXIgPSBkYXRhLm9yZGVyO1xuICBpZiAoIWRhdGEuY3VtdWxhdGl2ZSkge1xuICAgIG9uT3JkZXJDbGljayhvcmRlci5saW1pdC5hbW91bnQpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBvcmRlcnMgPSBnZXRDdW11bGF0aXZlT3JkZXJzKG9yZGVyKTtcbiAgY29uc3QgcXVhbnRpdHkgPSBvcmRlcnMubWFwKHggPT4geC5hbW91bnQgYXMgbnVtYmVyKS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbiAgb25PcmRlckNsaWNrKG9yZGVycy5hdCgtMSk/LmxpbWl0LmFtb3VudCA/PyAwLCBxdWFudGl0eSk7XG59XG5cbmNvbnN0IGN1bXVsYXRpdmVPcmRlcnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghaG92ZXJEYXRhLnZhbHVlIHx8ICFob3ZlckRhdGEudmFsdWUuY3VtdWxhdGl2ZSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiBnZXRDdW11bGF0aXZlT3JkZXJzKGhvdmVyRGF0YS52YWx1ZS5vcmRlcik7XG59KTtcblxuY29uc3QgaGlnaGxpZ2h0ZWRBbW91bnRzID0gY29tcHV0ZWQoKCkgPT4gbmV3IFNldChjdW11bGF0aXZlT3JkZXJzLnZhbHVlKSk7XG5cbmZ1bmN0aW9uIGlzQW1vdW50SGlnaGxpZ2h0ZWQob3JkZXI6IFBydW5BcGkuQ1hCcm9rZXJPcmRlcikge1xuICByZXR1cm4gaGlnaGxpZ2h0ZWRBbW91bnRzLnZhbHVlLmhhcyhvcmRlcik7XG59XG5cbmNvbnN0IGhpZ2hsaWdodGVkUHJpY2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghaG92ZXJEYXRhLnZhbHVlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBpZiAoIWhvdmVyRGF0YS52YWx1ZS5jdW11bGF0aXZlKSB7XG4gICAgcmV0dXJuIGhvdmVyRGF0YS52YWx1ZS5vcmRlcjtcbiAgfVxuICByZXR1cm4gY3VtdWxhdGl2ZU9yZGVycy52YWx1ZS5hdCgtMSk7XG59KTtcblxuZnVuY3Rpb24gaXNQcmljZUhpZ2hsaWdodGVkKG9yZGVyOiBQcnVuQXBpLkNYQnJva2VyT3JkZXIpIHtcbiAgcmV0dXJuIGhpZ2hsaWdodGVkUHJpY2UudmFsdWU/LmlkID09PSBvcmRlci5pZDtcbn1cblxuZnVuY3Rpb24gZ2V0Q3VtdWxhdGl2ZU9yZGVycyh0YXJnZXRPcmRlcjogUHJ1bkFwaS5DWEJyb2tlck9yZGVyKSB7XG4gIGlmICghb3JkZXJCb29rLnZhbHVlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3Qgb3JkZXJzID0gb3JkZXJCb29rLnZhbHVlLnNlbGxpbmdPcmRlcnMuaW5jbHVkZXModGFyZ2V0T3JkZXIpXG4gICAgPyBvcmRlckJvb2sudmFsdWUuc2VsbGluZ09yZGVyc1xuICAgIDogb3JkZXJCb29rLnZhbHVlLmJ1eWluZ09yZGVycztcbiAgbGV0IGN1bXVsYXRpdmVPcmRlcnMgPSBbXSBhcyBQcnVuQXBpLkNYQnJva2VyT3JkZXJbXTtcbiAgZm9yIChjb25zdCBvcmRlciBvZiBvcmRlcnMpIHtcbiAgICBjdW11bGF0aXZlT3JkZXJzLnB1c2gob3JkZXIpO1xuICAgIGlmIChvcmRlci5pZCA9PT0gdGFyZ2V0T3JkZXIuaWQgfHwgIWlzRmluaXRlT3JkZXIob3JkZXIpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGN1bXVsYXRpdmVPcmRlcnM7XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IHJlZj1cIm9yZGVyLWJvb2tcIiA6Y2xhc3M9XCIkc3R5bGUuY29udGFpbmVyXCI+XG4gICAgPHRhYmxlPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPkFtdC48L3RoPlxuICAgICAgICAgIDx0aD5QcmljZTwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5PlxuICAgICAgICA8dGVtcGxhdGUgdi1pZj1cIiFpc0VtcHR5KG9mZmVycylcIj5cbiAgICAgICAgICA8T3JkZXJSb3dcbiAgICAgICAgICAgIHYtZm9yPVwib3JkZXIgaW4gb2ZmZXJzXCJcbiAgICAgICAgICAgIDprZXk9XCJvcmRlci5pZFwiXG4gICAgICAgICAgICA6b3JkZXI9XCJvcmRlclwiXG4gICAgICAgICAgICA6aGlnaGxpZ2h0LWFtb3VudD1cImlzQW1vdW50SGlnaGxpZ2h0ZWQob3JkZXIpXCJcbiAgICAgICAgICAgIDpoaWdobGlnaHQtcHJpY2U9XCJpc1ByaWNlSGlnaGxpZ2h0ZWQob3JkZXIpXCJcbiAgICAgICAgICAgIDpvbi1ob3Zlcj1cIm9uSG92ZXJcIlxuICAgICAgICAgICAgOm9uLWNsaWNrPVwib25DbGlja1wiIC8+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDx0ciB2LWVsc2U+XG4gICAgICAgICAgPHRkIDpjbGFzcz1cIkMuQ29tRXhPcmRlckJvb2tQYW5lbC5lbXB0eVwiIGNvbFNwYW49XCIyXCI+Tm8gb2ZmZXJzLjwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3Rib2R5PlxuICAgICAgPHRib2R5IHJlZj1cInNwcmVhZFwiPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRkIGNvbFNwYW49XCIyXCIgOmNsYXNzPVwiW0MuQ29tRXhPcmRlckJvb2tQYW5lbC5zcHJlYWQsICRzdHlsZS5zcHJlYWRdXCI+XG4gICAgICAgICAgICBTcHJlYWQ6IDxzcGFuIDpzdHlsZT1cInsgY29sb3I6ICcjZWVlJyB9XCI+e3sgc3ByZWFkIH19PC9zcGFuPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3Rib2R5PlxuICAgICAgPHRib2R5PlxuICAgICAgICA8dGVtcGxhdGUgdi1pZj1cIiFpc0VtcHR5KHJlcXVlc3RzKVwiPlxuICAgICAgICAgIDxPcmRlclJvd1xuICAgICAgICAgICAgdi1mb3I9XCJvcmRlciBpbiByZXF1ZXN0c1wiXG4gICAgICAgICAgICA6a2V5PVwib3JkZXIuaWRcIlxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgOm9yZGVyPVwib3JkZXJcIlxuICAgICAgICAgICAgOmhpZ2hsaWdodC1hbW91bnQ9XCJpc0Ftb3VudEhpZ2hsaWdodGVkKG9yZGVyKVwiXG4gICAgICAgICAgICA6aGlnaGxpZ2h0LXByaWNlPVwiaXNQcmljZUhpZ2hsaWdodGVkKG9yZGVyKVwiXG4gICAgICAgICAgICA6b24taG92ZXI9XCJvbkhvdmVyXCJcbiAgICAgICAgICAgIDpvbi1jbGljaz1cIm9uQ2xpY2tcIiAvPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8dHIgdi1lbHNlPlxuICAgICAgICAgIDx0ZCA6Y2xhc3M9XCJDLkNvbUV4T3JkZXJCb29rUGFuZWwuZW1wdHlcIiBjb2xTcGFuPVwiMlwiPk5vIHJlcXVlc3RzLjwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5jb250YWluZXIge1xuICB3aWR0aDogMTYwcHg7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xufVxuXG4uc3ByZWFkIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3VucmVmIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIkMiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsVUFBQSxZQUFBLFNBQUEsTUFBQSxVQUFBLFlBQUEsUUFBQSxNQUFBLENBQUE7QUFFQSxVQUFBLFNBQUEsU0FBQSxNQUFBLFVBQUEsT0FBQSxjQUFBLFdBQUEsS0FBQSxFQUFBO0FBQ0EsVUFBQSxXQUFBLFNBQUEsTUFBQSxVQUFBLE9BQUEsZ0JBQUEsRUFBQTtBQUNBLFVBQUEsU0FBQSxTQUFBLE1BQUE7QUFDRSxZQUFB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
