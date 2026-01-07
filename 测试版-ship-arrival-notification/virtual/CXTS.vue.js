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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ1hUUy52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQ1hUUy9DWFRTLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgY3hvc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2N4b3MnO1xuaW1wb3J0IERhdGVSb3cgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQ1hUUy9EYXRlUm93LnZ1ZSc7XG5pbXBvcnQgVHJhZGVSb3cgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQ1hUUy9UcmFkZVJvdy52dWUnO1xuaW1wb3J0IExvYWRpbmdTcGlubmVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9Mb2FkaW5nU3Bpbm5lci52dWUnO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ3RzLWV4dHJhcyc7XG5pbXBvcnQgeyBjbGFtcCB9IGZyb20gJ0BzcmMvdXRpbHMvY2xhbXAnO1xuXG5jb25zdCBvcmRlcnMgPSBjb21wdXRlZCgoKSA9PiBjeG9zU3RvcmUuYWxsLnZhbHVlKTtcblxuaW50ZXJmYWNlIE9yZGVyVHJhZGUge1xuICBvcmRlcjogUHJ1bkFwaS5DWE9yZGVyO1xuICB0cmFkZTogUHJ1bkFwaS5DWFRyYWRlO1xuICBkYXRlOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBEYXlUcmFkZXMge1xuICBkYXRlOiBudW1iZXI7XG4gIHRyYWRlczogT3JkZXJUcmFkZVtdO1xuICB0b3RhbHM6IHsgW2N1cnJlbmN5OiBzdHJpbmddOiB7IHB1cmNoYXNlczogbnVtYmVyOyBzYWxlczogbnVtYmVyIH0gfTtcbn1cblxuY29uc3QgZGF5cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgdHJhZGVzOiBPcmRlclRyYWRlW10gPSBbXTtcbiAgZm9yIChjb25zdCBvcmRlciBvZiBvcmRlcnMudmFsdWUhKSB7XG4gICAgZm9yIChjb25zdCB0cmFkZSBvZiBvcmRlci50cmFkZXMpIHtcbiAgICAgIHRyYWRlcy5wdXNoKHtcbiAgICAgICAgb3JkZXIsXG4gICAgICAgIHRyYWRlLFxuICAgICAgICBkYXRlOiB0cmFkZS50aW1lLnRpbWVzdGFtcCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICB0cmFkZXMuc29ydCgoYSwgYikgPT4gYi5kYXRlIC0gYS5kYXRlKTtcbiAgY29uc3QgZGF5czogRGF5VHJhZGVzW10gPSBbXTtcbiAgaWYgKGlzRW1wdHkodHJhZGVzKSkge1xuICAgIHJldHVybiBkYXlzO1xuICB9XG5cbiAgbGV0IGRheTogRGF5VHJhZGVzID0ge1xuICAgIGRhdGU6IGdldERhdGVDb21wb25lbnQodHJhZGVzWzBdLmRhdGUpLFxuICAgIHRyYWRlczogW10sXG4gICAgdG90YWxzOiB7fSxcbiAgfTtcbiAgZGF5cy5wdXNoKGRheSk7XG5cbiAgZm9yIChjb25zdCB0cmFkZSBvZiB0cmFkZXMpIHtcbiAgICBpZiAodHJhZGUuZGF0ZSA8IGRheS5kYXRlKSB7XG4gICAgICBkYXkgPSB7XG4gICAgICAgIGRhdGU6IGdldERhdGVDb21wb25lbnQodHJhZGUuZGF0ZSksXG4gICAgICAgIHRyYWRlczogW10sXG4gICAgICAgIHRvdGFsczoge30sXG4gICAgICB9O1xuICAgICAgZGF5cy5wdXNoKGRheSk7XG4gICAgfVxuXG4gICAgZGF5LnRyYWRlcy5wdXNoKHRyYWRlKTtcbiAgICBjb25zdCBjdXJyZW5jeSA9IHRyYWRlLnRyYWRlLnByaWNlLmN1cnJlbmN5O1xuICAgIGNvbnN0IHRvdGFsID0gdHJhZGUudHJhZGUucHJpY2UuYW1vdW50ICogdHJhZGUudHJhZGUuYW1vdW50O1xuICAgIGNvbnN0IHRvdGFscyA9IChkYXkudG90YWxzW2N1cnJlbmN5XSA/Pz0geyBwdXJjaGFzZXM6IDAsIHNhbGVzOiAwIH0pO1xuICAgIGlmICh0cmFkZS5vcmRlci50eXBlID09PSAnU0VMTElORycpIHtcbiAgICAgIHRvdGFscy5zYWxlcyArPSB0b3RhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdG90YWxzLnB1cmNoYXNlcyArPSB0b3RhbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRheXM7XG59KTtcblxuZnVuY3Rpb24gZ2V0RGF0ZUNvbXBvbmVudChkYXRlVGltZTogbnVtYmVyKSB7XG4gIHJldHVybiBuZXcgRGF0ZShuZXcgRGF0ZShkYXRlVGltZSkudG9EYXRlU3RyaW5nKCkpLmdldFRpbWUoKTtcbn1cblxuY29uc3QgZGF5c1RvUmVuZGVyID0gcmVmKDEpO1xubGV0IGlkID0gMDtcblxuZnVuY3Rpb24gc3RlcFJlbmRlcigpIHtcbiAgaWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcFJlbmRlcik7XG4gIGlmICghb3JkZXJzLnZhbHVlKSB7XG4gICAgZGF5c1RvUmVuZGVyLnZhbHVlID0gMTtcbiAgfSBlbHNlIHtcbiAgICBkYXlzVG9SZW5kZXIudmFsdWUgPSBjbGFtcChkYXlzVG9SZW5kZXIudmFsdWUgKyAxLCAwLCBkYXlzLnZhbHVlLmxlbmd0aCk7XG4gIH1cbn1cblxub25CZWZvcmVVbm1vdW50KCgpID0+IGNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKSk7XG5zdGVwUmVuZGVyKCk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8TG9hZGluZ1NwaW5uZXIgdi1pZj1cIm9yZGVycyA9PT0gdW5kZWZpbmVkXCIgLz5cbiAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICA8dGFibGU+XG4gICAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICA8dGg+VGltZTwvdGg+XG4gICAgICAgICAgPHRoPlR5cGU8L3RoPlxuICAgICAgICAgIDx0aD5UaWNrZXI8L3RoPlxuICAgICAgICAgIDx0aD5QYXJ0bmVyPC90aD5cbiAgICAgICAgICA8dGg+QW1vdW50PC90aD5cbiAgICAgICAgICA8dGg+UHJpY2U8L3RoPlxuICAgICAgICAgIDx0aD5Ub3RhbDwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5PlxuICAgICAgICA8dHIgdi1pZj1cImlzRW1wdHkoZGF5cylcIj5cbiAgICAgICAgICA8dGQgY29sU3Bhbj1cIjdcIj5ObyByZWNlbnQgdHJhZGVzPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1mb3I9XCJncm91cCBpbiBkYXlzVG9SZW5kZXJcIiA6a2V5PVwiZGF5c1tncm91cCAtIDFdLmRhdGVcIj5cbiAgICAgICAgICAgIDxEYXRlUm93XG4gICAgICAgICAgICAgIDpkYXRlPVwiZGF5c1tncm91cCAtIDFdLmRhdGVcIlxuICAgICAgICAgICAgICA6dG90YWxzPVwiZGF5c1tncm91cCAtIDFdLnRvdGFsc1wiXG4gICAgICAgICAgICAgIDpoaWRlLXRvdGFscz1cImRheXNbZ3JvdXAgLSAxXS50cmFkZXMubGVuZ3RoID09PSAxXCIgLz5cbiAgICAgICAgICAgIDxUcmFkZVJvd1xuICAgICAgICAgICAgICB2LWZvcj1cInRyYWRlIGluIGRheXNbZ3JvdXAgLSAxXS50cmFkZXNcIlxuICAgICAgICAgICAgICA6a2V5PVwidHJhZGUudHJhZGUuaWRcIlxuICAgICAgICAgICAgICA6ZGF0ZT1cInRyYWRlLmRhdGVcIlxuICAgICAgICAgICAgICA6b3JkZXI9XCJ0cmFkZS5vcmRlclwiXG4gICAgICAgICAgICAgIDp0cmFkZT1cInRyYWRlLnRyYWRlXCIgLz5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC90Ym9keT5cbiAgICA8L3RhYmxlPlxuICA8L3RlbXBsYXRlPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfdW5yZWYiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVFBLFVBQUEsU0FBQSxTQUFB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
