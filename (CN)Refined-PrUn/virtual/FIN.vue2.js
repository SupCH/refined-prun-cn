import { t } from './index5.js';
import { calculateLocationAssets } from './financials.js';
import KeyFigures from './KeyFigures.vue.js';
import _sfc_main$1 from './FinHeader.vue.js';
import { formatCurrency, fixed0, fixed1, fixed2, percent0, percent1, percent2 } from './format.js';
import { liveBalanceSummary } from './balance-sheet-live.js';
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
import { toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'FIN',
  setup(__props) {
    const locations = computed(() => calculateLocationAssets());
    function formatRatio(ratio) {
      if (ratio === void 0) {
        return '--';
      }
      if (!isFinite(ratio)) {
        return 'N/A';
      }
      const absRatio = Math.abs(ratio);
      if (absRatio > 1e3) {
        return ratio > 0 ? '> 1,000' : '< -1,000';
      }
      if (absRatio > 100) {
        return fixed0(ratio);
      }
      if (absRatio > 10) {
        return fixed1(ratio);
      }
      return fixed2(ratio);
    }
    function formatPercentage(ratio) {
      if (ratio === void 0) {
        return '--';
      }
      if (!isFinite(ratio)) {
        return 'N/A';
      }
      const absRatio = Math.abs(ratio);
      if (absRatio > 10) {
        return ratio > 0 ? '> 1,000%' : '< -1,000%';
      }
      if (absRatio > 1) {
        return percent0(ratio);
      }
      if (absRatio > 0.1) {
        return percent1(ratio);
      }
      return percent2(ratio);
    }
    const figures = computed(() => {
      return [
        {
          name: t('fin.quickAssets'),
          value: formatCurrency(liveBalanceSummary.quickAssets),
          tooltip: t('fin.quickAssetsTooltip'),
        },
        {
          name: t('fin.currentAssets'),
          value: formatCurrency(liveBalanceSummary.currentAssets),
        },
        { name: t('fin.totalAssets'), value: formatCurrency(liveBalanceSummary.assets) },
        { name: t('fin.equity'), value: formatCurrency(liveBalanceSummary.equity) },
        {
          name: t('fin.quickLiabilities'),
          value: formatCurrency(liveBalanceSummary.quickLiabilities),
          tooltip: t('fin.quickLiabilitiesTooltip'),
        },
        {
          name: t('fin.currentLiabilities'),
          value: formatCurrency(liveBalanceSummary.currentLiabilities),
        },
        {
          name: t('fin.totalLiabilities'),
          value: formatCurrency(liveBalanceSummary.liabilities),
        },
        {
          name: t('fin.liquidationValue'),
          value: formatCurrency(liveBalanceSummary.liquidationValue),
          tooltip: t('fin.liquidationValueTooltip'),
        },
        {
          name: t('fin.quickRatio'),
          value: formatRatio(liveBalanceSummary.acidTestRatio),
          tooltip: t('fin.quickRatioTooltip'),
        },
        {
          name: t('fin.debtRatio'),
          value: formatPercentage(liveBalanceSummary.debtRatio),
          tooltip: t('fin.debtRatioTooltip'),
        },
      ];
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(_sfc_main$1, null, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('fin.keyFigures')),
                  1,
                ),
              ]),
              _: 1,
            }),
            createVNode(KeyFigures, { figures: unref(figures) }, null, 8, ['figures']),
            createVNode(_sfc_main$1, null, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('fin.inventoryBreakdown')),
                  1,
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('table', null, [
              createBaseVNode('thead', null, [
                createBaseVNode('tr', null, [
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('fin.name')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('fin.nonCurrentAssets')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('fin.currentAssets')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('fin.totalAssetsTable')),
                    1,
                  ),
                ]),
              ]),
              createBaseVNode('tbody', null, [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(unref(locations), location => {
                    return (
                      openBlock(),
                      createElementBlock(
                        'tr',
                        {
                          key: location.name,
                        },
                        [
                          createBaseVNode('td', null, toDisplayString(location.name), 1),
                          createBaseVNode(
                            'td',
                            null,
                            toDisplayString(unref(fixed0)(location.nonCurrent)),
                            1,
                          ),
                          createBaseVNode(
                            'td',
                            null,
                            toDisplayString(unref(fixed0)(location.current)),
                            1,
                          ),
                          createBaseVNode(
                            'td',
                            null,
                            toDisplayString(unref(fixed0)(location.total)),
                            1,
                          ),
                        ],
                      )
                    );
                  }),
                  128,
                )),
              ]),
            ]),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
