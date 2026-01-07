import { t } from './index5.js';
import BalanceSheetSection from './BalanceSheetSection.vue.js';
import {
  calcTotalDeposits,
  calcTotalCashAndCashEquivalents,
  calcTotalLoansReceivable,
  calcTotalBaseInventory,
  calcTotalInventory,
  calcTotalCurrentAssets,
  calcTotalBuildingsMarketValue,
  calcTotalBuildings,
  calcTotalShips,
  calcTotalLongTermReceivables,
  calcTotalIntangibleAssets,
  calcTotalNonCurrentAssets,
  calcTotalLoansPayable,
  calcTotalCurrentLiabilities,
  calcTotalLongTermPayables,
  calcTotalNonCurrentLiabilities,
  calcTotalAssets,
  calcTotalLiabilities,
  calcEquity,
} from './balance-sheet-summary.js';
import { liveBalanceSheet } from './balance-sheet-live.js';
import { ddmmyyyy } from './format.js';
import { lastBalance, previousBalance } from './user-data-balance.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  createTextVNode,
  renderList,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'FINBS',
  setup(__props) {
    const currentAssets = computed(() => ({
      name: t('finbs.currentAssets'),
      total: calcTotalCurrentAssets,
      children: [
        {
          name: t('finbs.cashAndCashEquivalents'),
          value: calcTotalCashAndCashEquivalents,
          children: [
            {
              name: t('finbs.cash'),
              value: x => x.assets?.current?.cashAndCashEquivalents?.cash,
            },
            {
              name: t('finbs.deposits'),
              value: calcTotalDeposits,
              children: [
                {
                  name: t('finbs.cx'),
                  value: x => x.assets?.current?.cashAndCashEquivalents?.deposits?.cx,
                },
                {
                  name: t('finbs.fx'),
                  value: x => x.assets?.current?.cashAndCashEquivalents?.deposits?.fx,
                },
              ],
            },
            {
              name: t('finbs.mmMaterials'),
              tooltip: t('finbs.mmMaterialsTooltip'),
              value: x => x.assets?.current?.cashAndCashEquivalents?.mmMaterials,
            },
          ],
        },
        {
          name: t('finbs.accountsReceivable'),
          value: x => x.assets?.current?.accountsReceivable,
        },
        {
          name: t('finbs.loansReceivable'),
          value: calcTotalLoansReceivable,
          children: [
            {
              name: t('finbs.principal'),
              value: x => x.assets?.current?.loansReceivable?.principal,
            },
            {
              name: t('finbs.interest'),
              value: x => x.assets?.current?.loansReceivable?.interest,
            },
          ],
        },
        {
          name: t('finbs.inventory'),
          value: calcTotalInventory,
          children: [
            {
              name: t('finbs.cxListedMaterials'),
              value: x => x.assets?.current?.inventory?.cxListedMaterials,
            },
            {
              name: t('finbs.cxInventory'),
              value: x => x.assets?.current?.inventory?.cxInventory,
            },
            {
              name: t('finbs.materialsInTransit'),
              value: x => x.assets?.current?.inventory?.materialsInTransit,
            },
            {
              name: t('finbs.baseInventory'),
              value: calcTotalBaseInventory,
              children: [
                {
                  name: t('finbs.finishedGoods'),
                  value: x => x.assets?.current?.inventory?.baseInventory?.finishedGoods,
                },
                {
                  name: t('finbs.wip'),
                  value: x => x.assets?.current?.inventory?.baseInventory?.workInProgress,
                },
                {
                  name: t('finbs.rawMaterials'),
                  value: x => x.assets?.current?.inventory?.baseInventory?.rawMaterials,
                },
                {
                  name: t('finbs.workforceConsumables'),
                  value: x => x.assets?.current?.inventory?.baseInventory?.workforceConsumables,
                },
                {
                  name: t('finbs.otherItems'),
                  value: x => x.assets?.current?.inventory?.baseInventory?.otherItems,
                },
              ],
            },
            {
              name: t('finbs.fuelTanks'),
              value: x => x.assets?.current?.inventory?.fuelTanks,
            },
            {
              name: t('finbs.materialsReceivable'),
              value: x => x.assets?.current?.inventory?.materialsReceivable,
            },
          ],
        },
      ],
    }));
    const nonCurrentAssets = computed(() => ({
      name: t('finbs.nonCurrentAssets'),
      total: calcTotalNonCurrentAssets,
      children: [
        {
          name: t('finbs.buildingsNet'),
          value: calcTotalBuildings,
          children: [
            {
              name: t('finbs.marketValue'),
              value: calcTotalBuildingsMarketValue,
              children: [
                {
                  name: t('finbs.infrastructure'),
                  value: x => x.assets?.nonCurrent?.buildings?.marketValue?.infrastructure,
                },
                {
                  name: t('finbs.resourceExtraction'),
                  value: x => x.assets?.nonCurrent?.buildings?.marketValue?.resourceExtraction,
                },
                {
                  name: t('finbs.production'),
                  value: x => x.assets?.nonCurrent?.buildings?.marketValue?.production,
                },
              ],
            },
            {
              name: t('finbs.accDepreciation'),
              less: true,
              value: x => x.assets?.nonCurrent?.buildings?.accumulatedDepreciation,
            },
          ],
        },
        {
          name: t('finbs.shipsNet'),
          value: calcTotalShips,
          children: [
            {
              name: t('finbs.marketValue'),
              value: x => x.assets?.nonCurrent?.ships?.marketValue,
            },
            {
              name: t('finbs.accDepreciation'),
              less: true,
              value: x => x.assets?.nonCurrent?.ships?.accumulatedDepreciation,
            },
          ],
        },
        {
          name: t('finbs.longTermReceivables'),
          value: calcTotalLongTermReceivables,
          children: [
            {
              name: t('finbs.accountsReceivable'),
              value: x => x.assets?.nonCurrent?.longTermReceivables?.accountsReceivable,
            },
            {
              name: t('finbs.materialsInTransit'),
              value: x => x.assets?.nonCurrent?.longTermReceivables?.materialsInTransit,
            },
            {
              name: t('finbs.materialsReceivable'),
              value: x => x.assets?.nonCurrent?.longTermReceivables?.materialsReceivable,
            },
            {
              name: t('finbs.loansPrincipal'),
              value: x => x.assets?.nonCurrent?.longTermReceivables?.loansPrincipal,
            },
          ],
        },
        {
          name: t('finbs.intangibleAssets'),
          value: calcTotalIntangibleAssets,
          children: [
            {
              name: t('finbs.hqUpgrades'),
              value: x => x.assets?.nonCurrent?.intangibleAssets?.hqUpgrades,
            },
            {
              name: t('finbs.arc'),
              value: x => x.assets?.nonCurrent?.intangibleAssets?.arc,
            },
          ],
        },
      ],
    }));
    const currentLiabilities = computed(() => ({
      name: t('finbs.currentLiabilities'),
      total: calcTotalCurrentLiabilities,
      children: [
        {
          name: t('finbs.accountsPayable'),
          value: x => x.liabilities?.current?.accountsPayable,
        },
        {
          name: t('finbs.materialsPayable'),
          value: x => x.liabilities?.current?.materialsPayable,
        },
        {
          name: t('finbs.loansPayable'),
          value: calcTotalLoansPayable,
          children: [
            {
              name: t('finbs.principal'),
              value: x => x.liabilities?.current?.loansPayable?.principal,
            },
            {
              name: t('finbs.interest'),
              value: x => x.liabilities?.current?.loansPayable?.interest,
            },
          ],
        },
      ],
    }));
    const nonCurrentLiabilities = computed(() => ({
      name: t('finbs.nonCurrentLiabilities'),
      total: calcTotalNonCurrentLiabilities,
      children: [
        {
          name: t('finbs.longTermPayables'),
          value: calcTotalLongTermPayables,
          children: [
            {
              name: t('finbs.accountsPayable'),
              value: x => x.liabilities?.nonCurrent?.longTermPayables?.accountsPayable,
            },
            {
              name: t('finbs.materialsPayable'),
              value: x => x.liabilities?.nonCurrent?.longTermPayables?.materialsPayable,
            },
            {
              name: t('finbs.loansPrincipal'),
              value: x => x.liabilities?.nonCurrent?.longTermPayables?.loansPrincipal,
            },
          ],
        },
      ],
    }));
    const equity = computed(() => ({
      name: t('finbs.equity'),
      coloredTotal: true,
      total: calcEquity,
      children: [
        {
          name: t('finbs.totalAssets'),
          value: calcTotalAssets,
        },
        {
          name: t('finbs.totalLiabilities'),
          less: true,
          value: calcTotalLiabilities,
        },
      ],
    }));
    const sections = [
      currentAssets,
      nonCurrentAssets,
      currentLiabilities,
      nonCurrentLiabilities,
      equity,
    ];
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('table', null, [
          createBaseVNode('thead', null, [
            createBaseVNode('tr', null, [
              _cache[0] || (_cache[0] = createBaseVNode('th', null, ' ', -1)),
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('finbs.currentPeriod')),
                1,
              ),
              createBaseVNode('th', null, [
                unref(lastBalance)
                  ? (openBlock(),
                    createElementBlock(
                      Fragment,
                      { key: 0 },
                      [
                        createTextVNode(
                          toDisplayString(unref(ddmmyyyy)(unref(lastBalance).timestamp)),
                          1,
                        ),
                      ],
                      64,
                    ))
                  : (openBlock(),
                    createElementBlock(
                      Fragment,
                      { key: 1 },
                      [
                        createTextVNode(
                          toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('finbs.lastPeriod')),
                          1,
                        ),
                      ],
                      64,
                    )),
              ]),
              createBaseVNode('th', null, [
                unref(previousBalance)
                  ? (openBlock(),
                    createElementBlock(
                      Fragment,
                      { key: 0 },
                      [
                        createTextVNode(
                          toDisplayString(unref(ddmmyyyy)(unref(previousBalance).timestamp)),
                          1,
                        ),
                      ],
                      64,
                    ))
                  : (openBlock(),
                    createElementBlock(
                      Fragment,
                      { key: 1 },
                      [
                        createTextVNode(
                          toDisplayString(
                            ('t' in _ctx ? _ctx.t : unref(t))('finbs.previousPeriod'),
                          ),
                          1,
                        ),
                      ],
                      64,
                    )),
              ]),
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('finbs.change')),
                1,
              ),
            ]),
          ]),
          (openBlock(),
          createElementBlock(
            Fragment,
            null,
            renderList(sections, section => {
              return createVNode(
                BalanceSheetSection,
                {
                  key: section.value.name,
                  current: unref(liveBalanceSheet),
                  last: unref(lastBalance),
                  previous: unref(previousBalance),
                  section: section.value,
                },
                null,
                8,
                ['current', 'last', 'previous', 'section'],
              );
            }),
            64,
          )),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRklOQlMudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9GSU5CUy9GSU5CUy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBCYWxhbmNlU2hlZXRTZWN0aW9uIGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0ZJTkJTL0JhbGFuY2VTaGVldFNlY3Rpb24udnVlJztcbmltcG9ydCAqIGFzIHN1bW1hcnkgZnJvbSAnQHNyYy9jb3JlL2JhbGFuY2UvYmFsYW5jZS1zaGVldC1zdW1tYXJ5JztcbmltcG9ydCB7IFNlY3Rpb25EYXRhIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvRklOQlMvYmFsYW5jZS1zZWN0aW9uJztcbmltcG9ydCB7IGxpdmVCYWxhbmNlU2hlZXQgfSBmcm9tICdAc3JjL2NvcmUvYmFsYW5jZS9iYWxhbmNlLXNoZWV0LWxpdmUnO1xuaW1wb3J0IHsgZGRtbXl5eXkgfSBmcm9tICdAc3JjL3V0aWxzL2Zvcm1hdCc7XG5pbXBvcnQgeyBsYXN0QmFsYW5jZSwgcHJldmlvdXNCYWxhbmNlIH0gZnJvbSAnQHNyYy9zdG9yZS91c2VyLWRhdGEtYmFsYW5jZSc7XG5cbmNvbnN0IGN1cnJlbnRBc3NldHMgPSBjb21wdXRlZDxTZWN0aW9uRGF0YT4oKCkgPT4gKHtcbiAgbmFtZTogdCgnZmluYnMuY3VycmVudEFzc2V0cycpLFxuICB0b3RhbDogc3VtbWFyeS5jYWxjVG90YWxDdXJyZW50QXNzZXRzLFxuICBjaGlsZHJlbjogW1xuICAgIHtcbiAgICAgIG5hbWU6IHQoJ2ZpbmJzLmNhc2hBbmRDYXNoRXF1aXZhbGVudHMnKSxcbiAgICAgIHZhbHVlOiBzdW1tYXJ5LmNhbGNUb3RhbENhc2hBbmRDYXNoRXF1aXZhbGVudHMsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogdCgnZmluYnMuY2FzaCcpLFxuICAgICAgICAgIHZhbHVlOiB4ID0+IHguYXNzZXRzPy5jdXJyZW50Py5jYXNoQW5kQ2FzaEVxdWl2YWxlbnRzPy5jYXNoLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogdCgnZmluYnMuZGVwb3NpdHMnKSxcbiAgICAgICAgICB2YWx1ZTogc3VtbWFyeS5jYWxjVG90YWxEZXBvc2l0cyxcbiAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiB0KCdmaW5icy5jeCcpLFxuICAgICAgICAgICAgICB2YWx1ZTogeCA9PiB4LmFzc2V0cz8uY3VycmVudD8uY2FzaEFuZENhc2hFcXVpdmFsZW50cz8uZGVwb3NpdHM/LmN4LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogdCgnZmluYnMuZngnKSxcbiAgICAgICAgICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/LmN1cnJlbnQ/LmNhc2hBbmRDYXNoRXF1aXZhbGVudHM/LmRlcG9zaXRzPy5meCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IHQoJ2ZpbmJzLm1tTWF0ZXJpYWxzJyksXG4gICAgICAgICAgdG9vbHRpcDogdCgnZmluYnMubW1NYXRlcmlhbHNUb29sdGlwJyksXG4gICAgICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/LmN1cnJlbnQ/LmNhc2hBbmRDYXNoRXF1aXZhbGVudHM/Lm1tTWF0ZXJpYWxzLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IHQoJ2ZpbmJzLmFjY291bnRzUmVjZWl2YWJsZScpLFxuICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/LmN1cnJlbnQ/LmFjY291bnRzUmVjZWl2YWJsZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IHQoJ2ZpbmJzLmxvYW5zUmVjZWl2YWJsZScpLFxuICAgICAgdmFsdWU6IHN1bW1hcnkuY2FsY1RvdGFsTG9hbnNSZWNlaXZhYmxlLFxuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IHQoJ2ZpbmJzLnByaW5jaXBhbCcpLFxuICAgICAgICAgIHZhbHVlOiB4ID0+IHguYXNzZXRzPy5jdXJyZW50Py5sb2Fuc1JlY2VpdmFibGU/LnByaW5jaXBhbCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IHQoJ2ZpbmJzLmludGVyZXN0JyksXG4gICAgICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/LmN1cnJlbnQ/LmxvYW5zUmVjZWl2YWJsZT8uaW50ZXJlc3QsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogdCgnZmluYnMuaW52ZW50b3J5JyksXG4gICAgICB2YWx1ZTogc3VtbWFyeS5jYWxjVG90YWxJbnZlbnRvcnksXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogdCgnZmluYnMuY3hMaXN0ZWRNYXRlcmlhbHMnKSxcbiAgICAgICAgICB2YWx1ZTogeCA9PiB4LmFzc2V0cz8uY3VycmVudD8uaW52ZW50b3J5Py5jeExpc3RlZE1hdGVyaWFscyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IHQoJ2ZpbmJzLmN4SW52ZW50b3J5JyksXG4gICAgICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/LmN1cnJlbnQ/LmludmVudG9yeT8uY3hJbnZlbnRvcnksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiB0KCdmaW5icy5tYXRlcmlhbHNJblRyYW5zaXQnKSxcbiAgICAgICAgICB2YWx1ZTogeCA9PiB4LmFzc2V0cz8uY3VycmVudD8uaW52ZW50b3J5Py5tYXRlcmlhbHNJblRyYW5zaXQsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiB0KCdmaW5icy5iYXNlSW52ZW50b3J5JyksXG4gICAgICAgICAgdmFsdWU6IHN1bW1hcnkuY2FsY1RvdGFsQmFzZUludmVudG9yeSxcbiAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiB0KCdmaW5icy5maW5pc2hlZEdvb2RzJyksXG4gICAgICAgICAgICAgIHZhbHVlOiB4ID0+IHguYXNzZXRzPy5jdXJyZW50Py5pbnZlbnRvcnk/LmJhc2VJbnZlbnRvcnk/LmZpbmlzaGVkR29vZHMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiB0KCdmaW5icy53aXAnKSxcbiAgICAgICAgICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/LmN1cnJlbnQ/LmludmVudG9yeT8uYmFzZUludmVudG9yeT8ud29ya0luUHJvZ3Jlc3MsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiB0KCdmaW5icy5yYXdNYXRlcmlhbHMnKSxcbiAgICAgICAgICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/LmN1cnJlbnQ/LmludmVudG9yeT8uYmFzZUludmVudG9yeT8ucmF3TWF0ZXJpYWxzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogdCgnZmluYnMud29ya2ZvcmNlQ29uc3VtYWJsZXMnKSxcbiAgICAgICAgICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/LmN1cnJlbnQ/LmludmVudG9yeT8uYmFzZUludmVudG9yeT8ud29ya2ZvcmNlQ29uc3VtYWJsZXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiB0KCdmaW5icy5vdGhlckl0ZW1zJyksXG4gICAgICAgICAgICAgIHZhbHVlOiB4ID0+IHguYXNzZXRzPy5jdXJyZW50Py5pbnZlbnRvcnk/LmJhc2VJbnZlbnRvcnk/Lm90aGVySXRlbXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiB0KCdmaW5icy5mdWVsVGFua3MnKSxcbiAgICAgICAgICB2YWx1ZTogeCA9PiB4LmFzc2V0cz8uY3VycmVudD8uaW52ZW50b3J5Py5mdWVsVGFua3MsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiB0KCdmaW5icy5tYXRlcmlhbHNSZWNlaXZhYmxlJyksXG4gICAgICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/LmN1cnJlbnQ/LmludmVudG9yeT8ubWF0ZXJpYWxzUmVjZWl2YWJsZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXSxcbn0pKTtcblxuY29uc3Qgbm9uQ3VycmVudEFzc2V0cyA9IGNvbXB1dGVkPFNlY3Rpb25EYXRhPigoKSA9PiAoe1xuICBuYW1lOiB0KCdmaW5icy5ub25DdXJyZW50QXNzZXRzJyksXG4gIHRvdGFsOiBzdW1tYXJ5LmNhbGNUb3RhbE5vbkN1cnJlbnRBc3NldHMsXG4gIGNoaWxkcmVuOiBbXG4gICAge1xuICAgICAgbmFtZTogdCgnZmluYnMuYnVpbGRpbmdzTmV0JyksXG4gICAgICB2YWx1ZTogc3VtbWFyeS5jYWxjVG90YWxCdWlsZGluZ3MsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogdCgnZmluYnMubWFya2V0VmFsdWUnKSxcbiAgICAgICAgICB2YWx1ZTogc3VtbWFyeS5jYWxjVG90YWxCdWlsZGluZ3NNYXJrZXRWYWx1ZSxcbiAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiB0KCdmaW5icy5pbmZyYXN0cnVjdHVyZScpLFxuICAgICAgICAgICAgICB2YWx1ZTogeCA9PiB4LmFzc2V0cz8ubm9uQ3VycmVudD8uYnVpbGRpbmdzPy5tYXJrZXRWYWx1ZT8uaW5mcmFzdHJ1Y3R1cmUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiB0KCdmaW5icy5yZXNvdXJjZUV4dHJhY3Rpb24nKSxcbiAgICAgICAgICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/Lm5vbkN1cnJlbnQ/LmJ1aWxkaW5ncz8ubWFya2V0VmFsdWU/LnJlc291cmNlRXh0cmFjdGlvbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IHQoJ2ZpbmJzLnByb2R1Y3Rpb24nKSxcbiAgICAgICAgICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/Lm5vbkN1cnJlbnQ/LmJ1aWxkaW5ncz8ubWFya2V0VmFsdWU/LnByb2R1Y3Rpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiB0KCdmaW5icy5hY2NEZXByZWNpYXRpb24nKSxcbiAgICAgICAgICBsZXNzOiB0cnVlLFxuICAgICAgICAgIHZhbHVlOiB4ID0+IHguYXNzZXRzPy5ub25DdXJyZW50Py5idWlsZGluZ3M/LmFjY3VtdWxhdGVkRGVwcmVjaWF0aW9uLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IHQoJ2ZpbmJzLnNoaXBzTmV0JyksXG4gICAgICB2YWx1ZTogc3VtbWFyeS5jYWxjVG90YWxTaGlwcyxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiB0KCdmaW5icy5tYXJrZXRWYWx1ZScpLFxuICAgICAgICAgIHZhbHVlOiB4ID0+IHguYXNzZXRzPy5ub25DdXJyZW50Py5zaGlwcz8ubWFya2V0VmFsdWUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiB0KCdmaW5icy5hY2NEZXByZWNpYXRpb24nKSxcbiAgICAgICAgICBsZXNzOiB0cnVlLFxuICAgICAgICAgIHZhbHVlOiB4ID0+IHguYXNzZXRzPy5ub25DdXJyZW50Py5zaGlwcz8uYWNjdW11bGF0ZWREZXByZWNpYXRpb24sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogdCgnZmluYnMubG9uZ1Rlcm1SZWNlaXZhYmxlcycpLFxuICAgICAgdmFsdWU6IHN1bW1hcnkuY2FsY1RvdGFsTG9uZ1Rlcm1SZWNlaXZhYmxlcyxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiB0KCdmaW5icy5hY2NvdW50c1JlY2VpdmFibGUnKSxcbiAgICAgICAgICB2YWx1ZTogeCA9PiB4LmFzc2V0cz8ubm9uQ3VycmVudD8ubG9uZ1Rlcm1SZWNlaXZhYmxlcz8uYWNjb3VudHNSZWNlaXZhYmxlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogdCgnZmluYnMubWF0ZXJpYWxzSW5UcmFuc2l0JyksXG4gICAgICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/Lm5vbkN1cnJlbnQ/LmxvbmdUZXJtUmVjZWl2YWJsZXM/Lm1hdGVyaWFsc0luVHJhbnNpdCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IHQoJ2ZpbmJzLm1hdGVyaWFsc1JlY2VpdmFibGUnKSxcbiAgICAgICAgICB2YWx1ZTogeCA9PiB4LmFzc2V0cz8ubm9uQ3VycmVudD8ubG9uZ1Rlcm1SZWNlaXZhYmxlcz8ubWF0ZXJpYWxzUmVjZWl2YWJsZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IHQoJ2ZpbmJzLmxvYW5zUHJpbmNpcGFsJyksXG4gICAgICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/Lm5vbkN1cnJlbnQ/LmxvbmdUZXJtUmVjZWl2YWJsZXM/LmxvYW5zUHJpbmNpcGFsLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IHQoJ2ZpbmJzLmludGFuZ2libGVBc3NldHMnKSxcbiAgICAgIHZhbHVlOiBzdW1tYXJ5LmNhbGNUb3RhbEludGFuZ2libGVBc3NldHMsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogdCgnZmluYnMuaHFVcGdyYWRlcycpLFxuICAgICAgICAgIHZhbHVlOiB4ID0+IHguYXNzZXRzPy5ub25DdXJyZW50Py5pbnRhbmdpYmxlQXNzZXRzPy5ocVVwZ3JhZGVzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogdCgnZmluYnMuYXJjJyksXG4gICAgICAgICAgdmFsdWU6IHggPT4geC5hc3NldHM/Lm5vbkN1cnJlbnQ/LmludGFuZ2libGVBc3NldHM/LmFyYyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXSxcbn0pKTtcblxuY29uc3QgY3VycmVudExpYWJpbGl0aWVzID0gY29tcHV0ZWQ8U2VjdGlvbkRhdGE+KCgpID0+ICh7XG4gIG5hbWU6IHQoJ2ZpbmJzLmN1cnJlbnRMaWFiaWxpdGllcycpLFxuICB0b3RhbDogc3VtbWFyeS5jYWxjVG90YWxDdXJyZW50TGlhYmlsaXRpZXMsXG4gIGNoaWxkcmVuOiBbXG4gICAge1xuICAgICAgbmFtZTogdCgnZmluYnMuYWNjb3VudHNQYXlhYmxlJyksXG4gICAgICB2YWx1ZTogeCA9PiB4LmxpYWJpbGl0aWVzPy5jdXJyZW50Py5hY2NvdW50c1BheWFibGUsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiB0KCdmaW5icy5tYXRlcmlhbHNQYXlhYmxlJyksXG4gICAgICB2YWx1ZTogeCA9PiB4LmxpYWJpbGl0aWVzPy5jdXJyZW50Py5tYXRlcmlhbHNQYXlhYmxlLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogdCgnZmluYnMubG9hbnNQYXlhYmxlJyksXG4gICAgICB2YWx1ZTogc3VtbWFyeS5jYWxjVG90YWxMb2Fuc1BheWFibGUsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogdCgnZmluYnMucHJpbmNpcGFsJyksXG4gICAgICAgICAgdmFsdWU6IHggPT4geC5saWFiaWxpdGllcz8uY3VycmVudD8ubG9hbnNQYXlhYmxlPy5wcmluY2lwYWwsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiB0KCdmaW5icy5pbnRlcmVzdCcpLFxuICAgICAgICAgIHZhbHVlOiB4ID0+IHgubGlhYmlsaXRpZXM/LmN1cnJlbnQ/LmxvYW5zUGF5YWJsZT8uaW50ZXJlc3QsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF0sXG59KSk7XG5cbmNvbnN0IG5vbkN1cnJlbnRMaWFiaWxpdGllcyA9IGNvbXB1dGVkPFNlY3Rpb25EYXRhPigoKSA9PiAoe1xuICBuYW1lOiB0KCdmaW5icy5ub25DdXJyZW50TGlhYmlsaXRpZXMnKSxcbiAgdG90YWw6IHN1bW1hcnkuY2FsY1RvdGFsTm9uQ3VycmVudExpYWJpbGl0aWVzLFxuICBjaGlsZHJlbjogW1xuICAgIHtcbiAgICAgIG5hbWU6IHQoJ2ZpbmJzLmxvbmdUZXJtUGF5YWJsZXMnKSxcbiAgICAgIHZhbHVlOiBzdW1tYXJ5LmNhbGNUb3RhbExvbmdUZXJtUGF5YWJsZXMsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogdCgnZmluYnMuYWNjb3VudHNQYXlhYmxlJyksXG4gICAgICAgICAgdmFsdWU6IHggPT4geC5saWFiaWxpdGllcz8ubm9uQ3VycmVudD8ubG9uZ1Rlcm1QYXlhYmxlcz8uYWNjb3VudHNQYXlhYmxlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogdCgnZmluYnMubWF0ZXJpYWxzUGF5YWJsZScpLFxuICAgICAgICAgIHZhbHVlOiB4ID0+IHgubGlhYmlsaXRpZXM/Lm5vbkN1cnJlbnQ/LmxvbmdUZXJtUGF5YWJsZXM/Lm1hdGVyaWFsc1BheWFibGUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiB0KCdmaW5icy5sb2Fuc1ByaW5jaXBhbCcpLFxuICAgICAgICAgIHZhbHVlOiB4ID0+IHgubGlhYmlsaXRpZXM/Lm5vbkN1cnJlbnQ/LmxvbmdUZXJtUGF5YWJsZXM/LmxvYW5zUHJpbmNpcGFsLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxufSkpO1xuXG5jb25zdCBlcXVpdHkgPSBjb21wdXRlZDxTZWN0aW9uRGF0YT4oKCkgPT4gKHtcbiAgbmFtZTogdCgnZmluYnMuZXF1aXR5JyksXG4gIGNvbG9yZWRUb3RhbDogdHJ1ZSxcbiAgdG90YWw6IHN1bW1hcnkuY2FsY0VxdWl0eSxcbiAgY2hpbGRyZW46IFtcbiAgICB7XG4gICAgICBuYW1lOiB0KCdmaW5icy50b3RhbEFzc2V0cycpLFxuICAgICAgdmFsdWU6IHN1bW1hcnkuY2FsY1RvdGFsQXNzZXRzLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogdCgnZmluYnMudG90YWxMaWFiaWxpdGllcycpLFxuICAgICAgbGVzczogdHJ1ZSxcbiAgICAgIHZhbHVlOiBzdW1tYXJ5LmNhbGNUb3RhbExpYWJpbGl0aWVzLFxuICAgIH0sXG4gIF0sXG59KSk7XG5cbmNvbnN0IHNlY3Rpb25zID0gW1xuICBjdXJyZW50QXNzZXRzLFxuICBub25DdXJyZW50QXNzZXRzLFxuICBjdXJyZW50TGlhYmlsaXRpZXMsXG4gIG5vbkN1cnJlbnRMaWFiaWxpdGllcyxcbiAgZXF1aXR5LFxuXTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx0YWJsZT5cbiAgICA8dGhlYWQ+XG4gICAgICA8dHI+XG4gICAgICAgIDx0aD4mbmJzcDs8L3RoPlxuICAgICAgICA8dGg+e3sgdCgnZmluYnMuY3VycmVudFBlcmlvZCcpIH19PC90aD5cbiAgICAgICAgPHRoPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwibGFzdEJhbGFuY2VcIj57eyBkZG1teXl5eShsYXN0QmFsYW5jZS50aW1lc3RhbXApIH19PC90ZW1wbGF0ZT5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPnt7IHQoJ2ZpbmJzLmxhc3RQZXJpb2QnKSB9fTwvdGVtcGxhdGU+XG4gICAgICAgIDwvdGg+XG4gICAgICAgIDx0aD5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cInByZXZpb3VzQmFsYW5jZVwiPnt7IGRkbW15eXl5KHByZXZpb3VzQmFsYW5jZS50aW1lc3RhbXApIH19PC90ZW1wbGF0ZT5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPnt7IHQoJ2ZpbmJzLnByZXZpb3VzUGVyaW9kJykgfX08L3RlbXBsYXRlPlxuICAgICAgICA8L3RoPlxuICAgICAgICA8dGg+e3sgdCgnZmluYnMuY2hhbmdlJykgfX08L3RoPlxuICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDxCYWxhbmNlU2hlZXRTZWN0aW9uXG4gICAgICB2LWZvcj1cInNlY3Rpb24gaW4gc2VjdGlvbnNcIlxuICAgICAgOmtleT1cInNlY3Rpb24udmFsdWUubmFtZVwiXG4gICAgICA6Y3VycmVudD1cImxpdmVCYWxhbmNlU2hlZXRcIlxuICAgICAgOmxhc3Q9XCJsYXN0QmFsYW5jZVwiXG4gICAgICA6cHJldmlvdXM9XCJwcmV2aW91c0JhbGFuY2VcIlxuICAgICAgOnNlY3Rpb249XCJzZWN0aW9uLnZhbHVlXCIgLz5cbiAgPC90YWJsZT5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG50YWJsZSB0ciA+IDpub3QoOmZpcnN0LWNoaWxkKSB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJzdW1tYXJ5LmNhbGNUb3RhbEN1cnJlbnRBc3NldHMiLCJzdW1tYXJ5LmNhbGNUb3RhbENhc2hBbmRDYXNoRXF1aXZhbGVudHMiLCJzdW1tYXJ5LmNhbGNUb3RhbERlcG9zaXRzIiwic3VtbWFyeS5jYWxjVG90YWxMb2Fuc1JlY2VpdmFibGUiLCJzdW1tYXJ5LmNhbGNUb3RhbEludmVudG9yeSIsInN1bW1hcnkuY2FsY1RvdGFsQmFzZUludmVudG9yeSIsInN1bW1hcnkuY2FsY1RvdGFsTm9uQ3VycmVudEFzc2V0cyIsInN1bW1hcnkuY2FsY1RvdGFsQnVpbGRpbmdzIiwic3VtbWFyeS5jYWxjVG90YWxCdWlsZGluZ3NNYXJrZXRWYWx1ZSIsInN1bW1hcnkuY2FsY1RvdGFsU2hpcHMiLCJzdW1tYXJ5LmNhbGNUb3RhbExvbmdUZXJtUmVjZWl2YWJsZXMiLCJzdW1tYXJ5LmNhbGNUb3RhbEludGFuZ2libGVBc3NldHMiLCJzdW1tYXJ5LmNhbGNUb3RhbEN1cnJlbnRMaWFiaWxpdGllcyIsInN1bW1hcnkuY2FsY1RvdGFsTG9hbnNQYXlhYmxlIiwic3VtbWFyeS5jYWxjVG90YWxOb25DdXJyZW50TGlhYmlsaXRpZXMiLCJzdW1tYXJ5LmNhbGNUb3RhbExvbmdUZXJtUGF5YWJsZXMiLCJzdW1tYXJ5LmNhbGNFcXVpdHkiLCJzdW1tYXJ5LmNhbGNUb3RhbEFzc2V0cyIsInN1bW1hcnkuY2FsY1RvdGFsTGlhYmlsaXRpZXMiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsInQiLCJfdW5yZWYiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9jcmVhdGVUZXh0Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLFVBQUEsZ0JBQUEsU0FBQSxPQUFBO0FBQUEsTUFBbUQsTUFBQSxFQUFBLHFCQUFBO0FBQUEsTUFDcEIsT0FBQUE7QUFBQUEsTUFDZCxVQUFBO0FBQUEsUUFDTDtBQUFBLFVBQ1IsTUFBQSxFQUFBLDhCQUFBO0FBQUEsVUFDd0MsT0FBQUM7QUFBQUEsVUFDdkIsVUFBQTtBQUFBLFlBQ0w7QUFBQSxjQUNSLE1BQUEsRUFBQSxZQUFBO0FBQUEsY0FDc0IsT0FBQSxDQUFBLE1BQUEsRUFBQSxRQUFBLFNBQUEsd0JBQUE7QUFBQSxZQUNtQztBQUFBLFlBQ3pEO0FBQUEsY0FDQSxNQUFBLEVBQUEsZ0JBQUE7QUFBQSxjQUMwQixPQUFBQztBQUFBQSxjQUNULFVBQUE7QUFBQSxnQkFDTDtBQUFBLGtCQUNSLE1BQUEsRUFBQSxVQUFBO0FBQUEsa0JBQ29CLE9BQUEsQ0FBQSxNQUFBLEVBQUEsUUFBQSxTQUFBLHdCQUFBLFVBQUE7QUFBQSxnQkFDK0M7QUFBQSxnQkFDbkU7QUFBQSxrQkFDQSxNQUFBLEVBQUEsVUFBQTtBQUFBLGtCQUNvQixPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsU0FBQSx3QkFBQSxVQUFBO0FBQUEsZ0JBQytDO0FBQUEsY0FDbkU7QUFBQSxZQUNGO0FBQUEsWUFDRjtBQUFBLGNBQ0EsTUFBQSxFQUFBLG1CQUFBO0FBQUEsY0FDNkIsU0FBQSxFQUFBLDBCQUFBO0FBQUEsY0FDVSxPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsU0FBQSx3QkFBQTtBQUFBLFlBQ2tCO0FBQUEsVUFDekQ7QUFBQSxRQUNGO0FBQUEsUUFDRjtBQUFBLFVBQ0EsTUFBQSxFQUFBLDBCQUFBO0FBQUEsVUFDb0MsT0FBQSxDQUFBLE1BQUEsRUFBQSxRQUFBLFNBQUE7QUFBQSxRQUNIO0FBQUEsUUFDakM7QUFBQSxVQUNBLE1BQUEsRUFBQSx1QkFBQTtBQUFBLFVBQ2lDLE9BQUFDO0FBQUFBLFVBQ2hCLFVBQUE7QUFBQSxZQUNMO0FBQUEsY0FDUixNQUFBLEVBQUEsaUJBQUE7QUFBQSxjQUMyQixPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsU0FBQSxpQkFBQTtBQUFBLFlBQ3VCO0FBQUEsWUFDbEQ7QUFBQSxjQUNBLE1BQUEsRUFBQSxnQkFBQTtBQUFBLGNBQzBCLE9BQUEsQ0FBQSxNQUFBLEVBQUEsUUFBQSxTQUFBLGlCQUFBO0FBQUEsWUFDd0I7QUFBQSxVQUNsRDtBQUFBLFFBQ0Y7QUFBQSxRQUNGO0FBQUEsVUFDQSxNQUFBLEVBQUEsaUJBQUE7QUFBQSxVQUMyQixPQUFBQztBQUFBQSxVQUNWLFVBQUE7QUFBQSxZQUNMO0FBQUEsY0FDUixNQUFBLEVBQUEseUJBQUE7QUFBQSxjQUNtQyxPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsU0FBQSxXQUFBO0FBQUEsWUFDUztBQUFBLFlBQzVDO0FBQUEsY0FDQSxNQUFBLEVBQUEsbUJBQUE7QUFBQSxjQUM2QixPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsU0FBQSxXQUFBO0FBQUEsWUFDZTtBQUFBLFlBQzVDO0FBQUEsY0FDQSxNQUFBLEVBQUEsMEJBQUE7QUFBQSxjQUNvQyxPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsU0FBQSxXQUFBO0FBQUEsWUFDUTtBQUFBLFlBQzVDO0FBQUEsY0FDQSxNQUFBLEVBQUEscUJBQUE7QUFBQSxjQUMrQixPQUFBQztBQUFBQSxjQUNkLFVBQUE7QUFBQSxnQkFDTDtBQUFBLGtCQUNSLE1BQUEsRUFBQSxxQkFBQTtBQUFBLGtCQUMrQixPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsU0FBQSxXQUFBLGVBQUE7QUFBQSxnQkFDNEI7QUFBQSxnQkFDM0Q7QUFBQSxrQkFDQSxNQUFBLEVBQUEsV0FBQTtBQUFBLGtCQUNxQixPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsU0FBQSxXQUFBLGVBQUE7QUFBQSxnQkFDc0M7QUFBQSxnQkFDM0Q7QUFBQSxrQkFDQSxNQUFBLEVBQUEsb0JBQUE7QUFBQSxrQkFDOEIsT0FBQSxDQUFBLE1BQUEsRUFBQSxRQUFBLFNBQUEsV0FBQSxlQUFBO0FBQUEsZ0JBQzZCO0FBQUEsZ0JBQzNEO0FBQUEsa0JBQ0EsTUFBQSxFQUFBLDRCQUFBO0FBQUEsa0JBQ3NDLE9BQUEsQ0FBQSxNQUFBLEVBQUEsUUFBQSxTQUFBLFdBQUEsZUFBQTtBQUFBLGdCQUNxQjtBQUFBLGdCQUMzRDtBQUFBLGtCQUNBLE1BQUEsRUFBQSxrQkFBQTtBQUFBLGtCQUM0QixPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsU0FBQSxXQUFBLGVBQUE7QUFBQSxnQkFDK0I7QUFBQSxjQUMzRDtBQUFBLFlBQ0Y7QUFBQSxZQUNGO0FBQUEsY0FDQSxNQUFBLEVBQUEsaUJBQUE7QUFBQSxjQUMyQixPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsU0FBQSxXQUFBO0FBQUEsWUFDaUI7QUFBQSxZQUM1QztBQUFBLGNBQ0EsTUFBQSxFQUFBLDJCQUFBO0FBQUEsY0FDcUMsT0FBQSxDQUFBLE1BQUEsRUFBQSxRQUFBLFNBQUEsV0FBQTtBQUFBLFlBQ087QUFBQSxVQUM1QztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixFQUFBO0FBR0YsVUFBQSxtQkFBQSxTQUFBLE9BQUE7QUFBQSxNQUFzRCxNQUFBLEVBQUEsd0JBQUE7QUFBQSxNQUNwQixPQUFBQztBQUFBQSxNQUNqQixVQUFBO0FBQUEsUUFDTDtBQUFBLFVBQ1IsTUFBQSxFQUFBLG9CQUFBO0FBQUEsVUFDOEIsT0FBQUM7QUFBQUEsVUFDYixVQUFBO0FBQUEsWUFDTDtBQUFBLGNBQ1IsTUFBQSxFQUFBLG1CQUFBO0FBQUEsY0FDNkIsT0FBQUM7QUFBQUEsY0FDWixVQUFBO0FBQUEsZ0JBQ0w7QUFBQSxrQkFDUixNQUFBLEVBQUEsc0JBQUE7QUFBQSxrQkFDZ0MsT0FBQSxDQUFBLE1BQUEsRUFBQSxRQUFBLFlBQUEsV0FBQSxhQUFBO0FBQUEsZ0JBQzRCO0FBQUEsZ0JBQzVEO0FBQUEsa0JBQ0EsTUFBQSxFQUFBLDBCQUFBO0FBQUEsa0JBQ29DLE9BQUEsQ0FBQSxNQUFBLEVBQUEsUUFBQSxZQUFBLFdBQUEsYUFBQTtBQUFBLGdCQUN3QjtBQUFBLGdCQUM1RDtBQUFBLGtCQUNBLE1BQUEsRUFBQSxrQkFBQTtBQUFBLGtCQUM0QixPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsWUFBQSxXQUFBLGFBQUE7QUFBQSxnQkFDZ0M7QUFBQSxjQUM1RDtBQUFBLFlBQ0Y7QUFBQSxZQUNGO0FBQUEsY0FDQSxNQUFBLEVBQUEsdUJBQUE7QUFBQSxjQUNpQyxNQUFBO0FBQUEsY0FDekIsT0FBQSxDQUFBLE1BQUEsRUFBQSxRQUFBLFlBQUEsV0FBQTtBQUFBLFlBQ3VDO0FBQUEsVUFDL0M7QUFBQSxRQUNGO0FBQUEsUUFDRjtBQUFBLFVBQ0EsTUFBQSxFQUFBLGdCQUFBO0FBQUEsVUFDMEIsT0FBQUM7QUFBQUEsVUFDVCxVQUFBO0FBQUEsWUFDTDtBQUFBLGNBQ1IsTUFBQSxFQUFBLG1CQUFBO0FBQUEsY0FDNkIsT0FBQSxDQUFBLE1BQUEsRUFBQSxRQUFBLFlBQUEsT0FBQTtBQUFBLFlBQ2M7QUFBQSxZQUMzQztBQUFBLGNBQ0EsTUFBQSxFQUFBLHVCQUFBO0FBQUEsY0FDaUMsTUFBQTtBQUFBLGNBQ3pCLE9BQUEsQ0FBQSxNQUFBLEVBQUEsUUFBQSxZQUFBLE9BQUE7QUFBQSxZQUNtQztBQUFBLFVBQzNDO0FBQUEsUUFDRjtBQUFBLFFBQ0Y7QUFBQSxVQUNBLE1BQUEsRUFBQSwyQkFBQTtBQUFBLFVBQ3FDLE9BQUFDO0FBQUFBLFVBQ3BCLFVBQUE7QUFBQSxZQUNMO0FBQUEsY0FDUixNQUFBLEVBQUEsMEJBQUE7QUFBQSxjQUNvQyxPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsWUFBQSxxQkFBQTtBQUFBLFlBQ3FCO0FBQUEsWUFDekQ7QUFBQSxjQUNBLE1BQUEsRUFBQSwwQkFBQTtBQUFBLGNBQ29DLE9BQUEsQ0FBQSxNQUFBLEVBQUEsUUFBQSxZQUFBLHFCQUFBO0FBQUEsWUFDcUI7QUFBQSxZQUN6RDtBQUFBLGNBQ0EsTUFBQSxFQUFBLDJCQUFBO0FBQUEsY0FDcUMsT0FBQSxDQUFBLE1BQUEsRUFBQSxRQUFBLFlBQUEscUJBQUE7QUFBQSxZQUNvQjtBQUFBLFlBQ3pEO0FBQUEsY0FDQSxNQUFBLEVBQUEsc0JBQUE7QUFBQSxjQUNnQyxPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsWUFBQSxxQkFBQTtBQUFBLFlBQ3lCO0FBQUEsVUFDekQ7QUFBQSxRQUNGO0FBQUEsUUFDRjtBQUFBLFVBQ0EsTUFBQSxFQUFBLHdCQUFBO0FBQUEsVUFDa0MsT0FBQUM7QUFBQUEsVUFDakIsVUFBQTtBQUFBLFlBQ0w7QUFBQSxjQUNSLE1BQUEsRUFBQSxrQkFBQTtBQUFBLGNBQzRCLE9BQUEsQ0FBQSxNQUFBLEVBQUEsUUFBQSxZQUFBLGtCQUFBO0FBQUEsWUFDMEI7QUFBQSxZQUN0RDtBQUFBLGNBQ0EsTUFBQSxFQUFBLFdBQUE7QUFBQSxjQUNxQixPQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsWUFBQSxrQkFBQTtBQUFBLFlBQ2lDO0FBQUEsVUFDdEQ7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsRUFBQTtBQUdGLFVBQUEscUJBQUEsU0FBQSxPQUFBO0FBQUEsTUFBd0QsTUFBQSxFQUFBLDBCQUFBO0FBQUEsTUFDcEIsT0FBQUM7QUFBQUEsTUFDbkIsVUFBQTtBQUFBLFFBQ0w7QUFBQSxVQUNSLE1BQUEsRUFBQSx1QkFBQTtBQUFBLFVBQ2lDLE9BQUEsQ0FBQSxNQUFBLEVBQUEsYUFBQSxTQUFBO0FBQUEsUUFDSztBQUFBLFFBQ3RDO0FBQUEsVUFDQSxNQUFBLEVBQUEsd0JBQUE7QUFBQSxVQUNrQyxPQUFBLENBQUEsTUFBQSxFQUFBLGFBQUEsU0FBQTtBQUFBLFFBQ0k7QUFBQSxRQUN0QztBQUFBLFVBQ0EsTUFBQSxFQUFBLG9CQUFBO0FBQUEsVUFDOEIsT0FBQUM7QUFBQUEsVUFDYixVQUFBO0FBQUEsWUFDTDtBQUFBLGNBQ1IsTUFBQSxFQUFBLGlCQUFBO0FBQUEsY0FDMkIsT0FBQSxDQUFBLE1BQUEsRUFBQSxhQUFBLFNBQUEsY0FBQTtBQUFBLFlBQ3lCO0FBQUEsWUFDcEQ7QUFBQSxjQUNBLE1BQUEsRUFBQSxnQkFBQTtBQUFBLGNBQzBCLE9BQUEsQ0FBQSxNQUFBLEVBQUEsYUFBQSxTQUFBLGNBQUE7QUFBQSxZQUMwQjtBQUFBLFVBQ3BEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLEVBQUE7QUFHRixVQUFBLHdCQUFBLFNBQUEsT0FBQTtBQUFBLE1BQTJELE1BQUEsRUFBQSw2QkFBQTtBQUFBLE1BQ3BCLE9BQUFDO0FBQUFBLE1BQ3RCLFVBQUE7QUFBQSxRQUNMO0FBQUEsVUFDUixNQUFBLEVBQUEsd0JBQUE7QUFBQSxVQUNrQyxPQUFBQztBQUFBQSxVQUNqQixVQUFBO0FBQUEsWUFDTDtBQUFBLGNBQ1IsTUFBQSxFQUFBLHVCQUFBO0FBQUEsY0FDaUMsT0FBQSxDQUFBLE1BQUEsRUFBQSxhQUFBLFlBQUEsa0JBQUE7QUFBQSxZQUMwQjtBQUFBLFlBQzNEO0FBQUEsY0FDQSxNQUFBLEVBQUEsd0JBQUE7QUFBQSxjQUNrQyxPQUFBLENBQUEsTUFBQSxFQUFBLGFBQUEsWUFBQSxrQkFBQTtBQUFBLFlBQ3lCO0FBQUEsWUFDM0Q7QUFBQSxjQUNBLE1BQUEsRUFBQSxzQkFBQTtBQUFBLGNBQ2dDLE9BQUEsQ0FBQSxNQUFBLEVBQUEsYUFBQSxZQUFBLGtCQUFBO0FBQUEsWUFDMkI7QUFBQSxVQUMzRDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixFQUFBO0FBR0YsVUFBQSxTQUFBLFNBQUEsT0FBQTtBQUFBLE1BQTRDLE1BQUEsRUFBQSxjQUFBO0FBQUEsTUFDcEIsY0FBQTtBQUFBLE1BQ1IsT0FBQUM7QUFBQUEsTUFDQyxVQUFBO0FBQUEsUUFDTDtBQUFBLFVBQ1IsTUFBQSxFQUFBLG1CQUFBO0FBQUEsVUFDNkIsT0FBQUM7QUFBQUEsUUFDWjtBQUFBLFFBQ2pCO0FBQUEsVUFDQSxNQUFBLEVBQUEsd0JBQUE7QUFBQSxVQUNrQyxNQUFBO0FBQUEsVUFDMUIsT0FBQUM7QUFBQUEsUUFDUztBQUFBLE1BQ2pCO0FBQUEsSUFDRixFQUFBO0FBR0YsVUFBQSxXQUFBO0FBQUEsTUFBaUI7QUFBQSxNQUNmO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDQTs7O1FBNEJRQyxnQkFBQSxTQUFBLE1BQUE7QUFBQSxVQVJFQSxnQkFBQSxNQUFBLE1BQUE7QUFBQSxZQURELE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBQSxnQkFBQSxNQUFBLE1BQUEsS0FBQSxFQUFBO0FBQUEsWUFYT0EsZ0JBQUEsTUFBQSxNQUFBQyxpQkFDSEMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEscUJBQUFBLENBQUFBLEdBQUFBLENBQUFBO0FBQUFBLFlBQUNGLGdCQUFBLE1BQUEsTUFBQTtBQUFBLGNBSUhHLE1BQUEsV0FBQSxLQUFBQyxVQUFBLEdBQUFDLG1CQUFBQyxVQUFBLEVBQUEsS0FBQSxLQUFBO0FBQUEsZ0JBRjBFQyxnQkFBQU4sZ0JBQUFFLE1BQUEsUUFBQSxFQUFBQSxNQUFBLFdBQUEsRUFBQSxTQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsY0FBZixHQUFBLEVBQUEsTUFBQUMsYUFBQUMsbUJBQUFDLFVBQUEsRUFBQSxLQUFBLEtBQUE7QUFBQSxnQkFDUEMsZ0JBQUFOLGlCQUFuQ0MsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7Y0FBQyxHQUFBLEVBQUE7QUFBQTs7Y0FLbEJDLE1BQUEsZUFBQSxLQUFBQyxVQUFBLEdBQUFDLG1CQUFBQyxVQUFBLEVBQUEsS0FBQSxLQUFBO0FBQUEsZ0JBRmtGQyxnQkFBQU4sZ0JBQUFFLE1BQUEsUUFBQSxFQUFBQSxNQUFBLGVBQUEsRUFBQSxTQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsY0FBZixHQUFBLEVBQUEsTUFBQUMsYUFBQUMsbUJBQUFDLFVBQUEsRUFBQSxLQUFBLEtBQUE7QUFBQSxnQkFDWEMsZ0JBQUFOLGlCQUF2Q0MsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7Y0FBQyxHQUFBLEVBQUE7QUFBQTt5REFFaEJBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLGNBQUFBLENBQUFBLEdBQUFBLENBQUFBO0FBQUFBLFVBQUMsQ0FBQTtBQUFBOzs7WUFTaUIsS0FBQSxRQUFBLE1BQUE7QUFBQSxZQUpQLFNBQUFDLE1BQUEsZ0JBQUE7QUFBQSxZQUNWLE1BQUFBLE1BQUEsV0FBQTtBQUFBLFlBQ0gsVUFBQUEsTUFBQSxlQUFBO0FBQUEsWUFDSSxTQUFBLFFBQUE7QUFBQSxVQUNPLEdBQUEsTUFBQSxHQUFBLENBQUEsV0FBQSxRQUFBLFlBQUEsU0FBQSxDQUFBO0FBQUE7Ozs7OyJ9
