import { t } from './index13.js';
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
