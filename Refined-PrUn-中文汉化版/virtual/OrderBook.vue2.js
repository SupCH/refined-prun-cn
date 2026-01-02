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
