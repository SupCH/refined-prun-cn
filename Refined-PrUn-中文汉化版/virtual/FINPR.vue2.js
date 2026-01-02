import { C } from './prun-css.js';
import { sitesStore } from './sites.js';
import _sfc_main$1 from './FinHeader.vue.js';
import KeyFigures from './KeyFigures.vue.js';
import { calculateSiteProfitability } from './profitability.js';
import { sumBy } from './sum-by.js';
import { formatCurrency, percent2, fixed0 } from './format.js';
import { map } from './map-values.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'FINPR',
  setup(__props) {
    const entries = computed(() => {
      return (
        sitesStore.all.value
          ?.map(x => calculateSiteProfitability(x))
          .filter(x => x !== void 0)
          .sort((a, b) => b.profit - a.profit) ?? []
      );
    });
    const dailyCost = computed(() => sumBy(entries.value, x => x.cost));
    const dailyRepairs = computed(() => sumBy(entries.value, x => x.repairs));
    const dailyRevenue = computed(() => sumBy(entries.value, x => x.revenue));
    const dailyProfit = computed(() => sumBy(entries.value, x => x.profit));
    const dailyMargin = computed(() => {
      return map([dailyRevenue.value, dailyProfit.value], (revenue, profit) =>
        revenue !== 0 ? profit / revenue : 0,
      );
    });
    const figures = computed(() => {
      return [
        { name: 'Daily Cost', value: formatCurrency(dailyCost.value) },
        { name: 'Daily Repairs', value: formatCurrency(dailyRepairs.value) },
        { name: 'Daily Revenue', value: formatCurrency(dailyRevenue.value) },
        { name: 'Daily Profit', value: formatCurrency(dailyProfit.value) },
        {
          name: 'Daily Margin',
          value: dailyMargin.value !== void 0 ? percent2(dailyMargin.value) : '--',
        },
      ];
    });
    function profitClass(value) {
      return {
        [C.ColoredValue.positive]: value > 0,
        [C.ColoredValue.negative]: value < 0,
      };
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          createVNode(_sfc_main$1, null, {
            default: withCtx(() => [
              ...(_cache[0] || (_cache[0] = [createTextVNode('Production Overview', -1)])),
            ]),
            _: 1,
          }),
          createVNode(KeyFigures, { figures: unref(figures) }, null, 8, ['figures']),
          createVNode(_sfc_main$1, null, {
            default: withCtx(() => [
              ...(_cache[1] || (_cache[1] = [createTextVNode('Breakdown by Planet', -1)])),
            ]),
            _: 1,
          }),
          createBaseVNode('table', null, [
            _cache[2] ||
              (_cache[2] = createBaseVNode(
                'colgroup',
                {
                  span: '6',
                  style: { width: 'calc(100% / 6)' },
                },
                null,
                -1,
              )),
            _cache[3] ||
              (_cache[3] = createBaseVNode(
                'thead',
                null,
                [
                  createBaseVNode('tr', null, [
                    createBaseVNode('th', null, 'Name'),
                    createBaseVNode('th', null, 'Cost'),
                    createBaseVNode('th', null, 'Repairs'),
                    createBaseVNode('th', null, 'Revenue'),
                    createBaseVNode('th', null, 'Profit'),
                    createBaseVNode('th', null, 'Margin'),
                  ]),
                ],
                -1,
              )),
            createBaseVNode('tbody', null, [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(unref(entries), entry => {
                  return (
                    openBlock(),
                    createElementBlock(
                      'tr',
                      {
                        key: entry.name,
                      },
                      [
                        createBaseVNode('td', null, toDisplayString(entry.name), 1),
                        createBaseVNode('td', null, toDisplayString(unref(fixed0)(entry.cost)), 1),
                        createBaseVNode(
                          'td',
                          null,
                          toDisplayString(unref(fixed0)(entry.repairs)),
                          1,
                        ),
                        createBaseVNode(
                          'td',
                          null,
                          toDisplayString(unref(fixed0)(entry.revenue)),
                          1,
                        ),
                        createBaseVNode(
                          'td',
                          null,
                          toDisplayString(unref(fixed0)(entry.profit)),
                          1,
                        ),
                        createBaseVNode(
                          'td',
                          {
                            class: normalizeClass(profitClass(entry.margin)),
                          },
                          toDisplayString(unref(percent2)(entry.margin)),
                          3,
                        ),
                      ],
                    )
                  );
                }),
                128,
              )),
            ]),
          ]),
        ])
      );
    };
  },
});
export { _sfc_main as default };
