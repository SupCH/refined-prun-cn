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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRklOUFIudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9GSU4vRklOUFIudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBzaXRlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NpdGVzJztcbmltcG9ydCBGaW5IZWFkZXIgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvRklOL0ZpbkhlYWRlci52dWUnO1xuaW1wb3J0IEtleUZpZ3VyZXMgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvRklOL0tleUZpZ3VyZXMudnVlJztcbmltcG9ydCB7IGNhbGN1bGF0ZVNpdGVQcm9maXRhYmlsaXR5IH0gZnJvbSAnQHNyYy9jb3JlL3Byb2ZpdGFiaWxpdHknO1xuaW1wb3J0IHsgc3VtQnkgfSBmcm9tICdAc3JjL3V0aWxzL3N1bS1ieSc7XG5pbXBvcnQgeyBmaXhlZDAsIGZvcm1hdEN1cnJlbmN5LCBwZXJjZW50MiB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ0BzcmMvdXRpbHMvbWFwLXZhbHVlcyc7XG5cbmNvbnN0IGVudHJpZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgc2l0ZXNTdG9yZS5hbGwudmFsdWVcbiAgICAgID8ubWFwKHggPT4gY2FsY3VsYXRlU2l0ZVByb2ZpdGFiaWxpdHkoeCkpXG4gICAgICAuZmlsdGVyKHggPT4geCAhPT0gdW5kZWZpbmVkKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGIucHJvZml0IC0gYS5wcm9maXQpID8/IFtdXG4gICk7XG59KTtcblxuY29uc3QgZGFpbHlDb3N0ID0gY29tcHV0ZWQoKCkgPT4gc3VtQnkoZW50cmllcy52YWx1ZSwgeCA9PiB4LmNvc3QpKTtcbmNvbnN0IGRhaWx5UmVwYWlycyA9IGNvbXB1dGVkKCgpID0+IHN1bUJ5KGVudHJpZXMudmFsdWUsIHggPT4geC5yZXBhaXJzKSk7XG5jb25zdCBkYWlseVJldmVudWUgPSBjb21wdXRlZCgoKSA9PiBzdW1CeShlbnRyaWVzLnZhbHVlLCB4ID0+IHgucmV2ZW51ZSkpO1xuY29uc3QgZGFpbHlQcm9maXQgPSBjb21wdXRlZCgoKSA9PiBzdW1CeShlbnRyaWVzLnZhbHVlLCB4ID0+IHgucHJvZml0KSk7XG5jb25zdCBkYWlseU1hcmdpbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIG1hcChbZGFpbHlSZXZlbnVlLnZhbHVlLCBkYWlseVByb2ZpdC52YWx1ZV0sIChyZXZlbnVlLCBwcm9maXQpID0+XG4gICAgcmV2ZW51ZSAhPT0gMCA/IHByb2ZpdCAvIHJldmVudWUgOiAwLFxuICApO1xufSk7XG5cbmNvbnN0IGZpZ3VyZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBbXG4gICAgeyBuYW1lOiAnRGFpbHkgQ29zdCcsIHZhbHVlOiBmb3JtYXRDdXJyZW5jeShkYWlseUNvc3QudmFsdWUpIH0sXG4gICAgeyBuYW1lOiAnRGFpbHkgUmVwYWlycycsIHZhbHVlOiBmb3JtYXRDdXJyZW5jeShkYWlseVJlcGFpcnMudmFsdWUpIH0sXG4gICAgeyBuYW1lOiAnRGFpbHkgUmV2ZW51ZScsIHZhbHVlOiBmb3JtYXRDdXJyZW5jeShkYWlseVJldmVudWUudmFsdWUpIH0sXG4gICAgeyBuYW1lOiAnRGFpbHkgUHJvZml0JywgdmFsdWU6IGZvcm1hdEN1cnJlbmN5KGRhaWx5UHJvZml0LnZhbHVlKSB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdEYWlseSBNYXJnaW4nLFxuICAgICAgdmFsdWU6IGRhaWx5TWFyZ2luLnZhbHVlICE9PSB1bmRlZmluZWQgPyBwZXJjZW50MihkYWlseU1hcmdpbi52YWx1ZSkgOiAnLS0nLFxuICAgIH0sXG4gIF07XG59KTtcblxuZnVuY3Rpb24gcHJvZml0Q2xhc3ModmFsdWU6IG51bWJlcikge1xuICByZXR1cm4ge1xuICAgIFtDLkNvbG9yZWRWYWx1ZS5wb3NpdGl2ZV06IHZhbHVlID4gMCxcbiAgICBbQy5Db2xvcmVkVmFsdWUubmVnYXRpdmVdOiB2YWx1ZSA8IDAsXG4gIH07XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxGaW5IZWFkZXI+UHJvZHVjdGlvbiBPdmVydmlldzwvRmluSGVhZGVyPlxuICAgIDxLZXlGaWd1cmVzIDpmaWd1cmVzPVwiZmlndXJlc1wiIC8+XG4gICAgPEZpbkhlYWRlcj5CcmVha2Rvd24gYnkgUGxhbmV0PC9GaW5IZWFkZXI+XG4gICAgPHRhYmxlPlxuICAgICAgPGNvbGdyb3VwIHNwYW49XCI2XCIgc3R5bGU9XCJ3aWR0aDogY2FsYygxMDAlIC8gNilcIj48L2NvbGdyb3VwPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPk5hbWU8L3RoPlxuICAgICAgICAgIDx0aD5Db3N0PC90aD5cbiAgICAgICAgICA8dGg+UmVwYWlyczwvdGg+XG4gICAgICAgICAgPHRoPlJldmVudWU8L3RoPlxuICAgICAgICAgIDx0aD5Qcm9maXQ8L3RoPlxuICAgICAgICAgIDx0aD5NYXJnaW48L3RoPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAgPHRyIHYtZm9yPVwiZW50cnkgaW4gZW50cmllc1wiIDprZXk9XCJlbnRyeS5uYW1lXCI+XG4gICAgICAgICAgPHRkPnt7IGVudHJ5Lm5hbWUgfX08L3RkPlxuICAgICAgICAgIDx0ZD57eyBmaXhlZDAoZW50cnkuY29zdCkgfX08L3RkPlxuICAgICAgICAgIDx0ZD57eyBmaXhlZDAoZW50cnkucmVwYWlycykgfX08L3RkPlxuICAgICAgICAgIDx0ZD57eyBmaXhlZDAoZW50cnkucmV2ZW51ZSkgfX08L3RkPlxuICAgICAgICAgIDx0ZD57eyBmaXhlZDAoZW50cnkucHJvZml0KSB9fTwvdGQ+XG4gICAgICAgICAgPHRkIDpjbGFzcz1cInByb2ZpdENsYXNzKGVudHJ5Lm1hcmdpbilcIj57eyBwZXJjZW50MihlbnRyeS5tYXJnaW4pIH19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGJvZHk+XG4gICAgPC90YWJsZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkPlxudGFibGUgdHIgPiA6bm90KDpmaXJzdC1jaGlsZCkge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX2NyZWF0ZVZOb2RlIiwiRmluSGVhZGVyIiwiX3dpdGhDdHgiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfdW5yZWYiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX25vcm1hbGl6ZUNsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVNBLFVBQUEsVUFBQSxTQUFBLE1BQUE7QUFDRSxhQUFBLFdBQUEsSUFBQSxPQUFBLElBQUEsQ0FBQSxNQUFBLDJCQUFBLENBQUEsQ0FBQSxFQUFBLE9BQUEsQ0FBQSxNQUFBLE1BQUEsTUFBQSxFQUFBLEtBQUEsQ0FBQSxHQUFBLE1BQUEsRUFBQSxTQUFBLEVBQUEsTUFBQSxLQUFBLENBQUE7QUFBQSxJQUk2QyxDQUFBO0FBSS9DLFVBQUEsWUFBQSxTQUFBLE1BQUEsTUFBQSxRQUFBLE9BQUEsQ0FBQSxNQUFBLEVBQUEsSUFBQSxDQUFBO0FBQ0EsVUFBQSxlQUFBLFNBQUEsTUFBQSxNQUFBLFFBQUEsT0FBQSxDQUFBLE1BQUEsRUFBQSxPQUFBLENBQUE7QUFDQSxVQUFBLGVBQUEsU0FBQSxNQUFBLE1BQUEsUUFBQSxPQUFBLENBQUEsTUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUNBLFVBQUEsY0FBQSxTQUFBLE1BQUEsTUFBQSxRQUFBLE9BQUEsQ0FBQSxNQUFBLEVBQUEsTUFBQSxDQUFBO0FBQ0EsVUFBQSxjQUFBLFNBQUEsTUFBQTtBQUNFLGFBQUE7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
