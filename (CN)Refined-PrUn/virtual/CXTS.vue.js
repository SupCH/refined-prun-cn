import { cxosStore } from './cxos.js';
import DateRow from './DateRow.vue.js';
import _sfc_main$1 from './TradeRow.vue.js';
import LoadingSpinner from './LoadingSpinner.vue.js';
import { clamp } from './clamp.js';
import { isEmpty } from './is-empty.js';
import {
  defineComponent,
  computed,
  onBeforeUnmount,
  createBlock,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _hoisted_2 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CXTS',
  setup(__props) {
    const orders = computed(() => cxosStore.all.value);
    const days = computed(() => {
      const trades = [];
      for (const order of orders.value) {
        for (const trade of order.trades) {
          trades.push({
            order,
            trade,
            date: trade.time.timestamp,
          });
        }
      }
      trades.sort((a, b) => b.date - a.date);
      const days2 = [];
      if (isEmpty(trades)) {
        return days2;
      }
      let day = {
        date: getDateComponent(trades[0].date),
        trades: [],
        totals: {},
      };
      days2.push(day);
      for (const trade of trades) {
        if (trade.date < day.date) {
          day = {
            date: getDateComponent(trade.date),
            trades: [],
            totals: {},
          };
          days2.push(day);
        }
        day.trades.push(trade);
        const currency = trade.trade.price.currency;
        const total = trade.trade.price.amount * trade.trade.amount;
        const totals = (day.totals[currency] ??= { purchases: 0, sales: 0 });
        if (trade.order.type === 'SELLING') {
          totals.sales += total;
        } else {
          totals.purchases += total;
        }
      }
      return days2;
    });
    function getDateComponent(dateTime) {
      return new Date(new Date(dateTime).toDateString()).getTime();
    }
    const daysToRender = ref(1);
    let id = 0;
    function stepRender() {
      id = requestAnimationFrame(stepRender);
      if (!orders.value) {
        daysToRender.value = 1;
      } else {
        daysToRender.value = clamp(daysToRender.value + 1, 0, days.value.length);
      }
    }
    onBeforeUnmount(() => cancelAnimationFrame(id));
    stepRender();
    return (_ctx, _cache) => {
      return unref(orders) === void 0
        ? (openBlock(), createBlock(LoadingSpinner, { key: 0 }))
        : (openBlock(),
          createElementBlock('table', _hoisted_1, [
            _cache[1] ||
              (_cache[1] = createBaseVNode(
                'thead',
                null,
                [
                  createBaseVNode('tr', null, [
                    createBaseVNode('th', null, 'Time'),
                    createBaseVNode('th', null, 'Type'),
                    createBaseVNode('th', null, 'Ticker'),
                    createBaseVNode('th', null, 'Partner'),
                    createBaseVNode('th', null, 'Amount'),
                    createBaseVNode('th', null, 'Price'),
                    createBaseVNode('th', null, 'Total'),
                  ]),
                ],
                -1,
              )),
            createBaseVNode('tbody', null, [
              unref(isEmpty)(unref(days))
                ? (openBlock(),
                  createElementBlock('tr', _hoisted_2, [
                    ...(_cache[0] ||
                      (_cache[0] = [
                        createBaseVNode('td', { colSpan: '7' }, 'No recent trades', -1),
                      ])),
                  ]))
                : (openBlock(true),
                  createElementBlock(
                    Fragment,
                    { key: 1 },
                    renderList(unref(daysToRender), group => {
                      return (
                        openBlock(),
                        createElementBlock(
                          Fragment,
                          {
                            key: unref(days)[group - 1].date,
                          },
                          [
                            createVNode(
                              DateRow,
                              {
                                date: unref(days)[group - 1].date,
                                totals: unref(days)[group - 1].totals,
                                'hide-totals': unref(days)[group - 1].trades.length === 1,
                              },
                              null,
                              8,
                              ['date', 'totals', 'hide-totals'],
                            ),
                            (openBlock(true),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(unref(days)[group - 1].trades, trade => {
                                return (
                                  openBlock(),
                                  createBlock(
                                    _sfc_main$1,
                                    {
                                      key: trade.trade.id,
                                      date: trade.date,
                                      order: trade.order,
                                      trade: trade.trade,
                                    },
                                    null,
                                    8,
                                    ['date', 'order', 'trade'],
                                  )
                                );
                              }),
                              128,
                            )),
                          ],
                          64,
                        )
                      );
                    }),
                    128,
                  )),
            ]),
          ]));
    };
  },
});
export { _sfc_main as default };
