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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRklOLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvRklOL0ZJTi52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IGNhbGN1bGF0ZUxvY2F0aW9uQXNzZXRzIH0gZnJvbSAnQHNyYy9jb3JlL2ZpbmFuY2lhbHMnO1xuaW1wb3J0IEtleUZpZ3VyZXMgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvRklOL0tleUZpZ3VyZXMudnVlJztcbmltcG9ydCBGaW5IZWFkZXIgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvRklOL0ZpbkhlYWRlci52dWUnO1xuaW1wb3J0IHtcbiAgZml4ZWQwLFxuICBmaXhlZDEsXG4gIGZpeGVkMixcbiAgZm9ybWF0Q3VycmVuY3ksXG4gIHBlcmNlbnQwLFxuICBwZXJjZW50MSxcbiAgcGVyY2VudDIsXG59IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCB7IGxpdmVCYWxhbmNlU3VtbWFyeSB9IGZyb20gJ0BzcmMvY29yZS9iYWxhbmNlL2JhbGFuY2Utc2hlZXQtbGl2ZSc7XG5cbmNvbnN0IGxvY2F0aW9ucyA9IGNvbXB1dGVkKCgpID0+IGNhbGN1bGF0ZUxvY2F0aW9uQXNzZXRzKCkpO1xuXG5mdW5jdGlvbiBmb3JtYXRSYXRpbyhyYXRpbzogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gIGlmIChyYXRpbyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuICctLSc7XG4gIH1cbiAgaWYgKCFpc0Zpbml0ZShyYXRpbykpIHtcbiAgICByZXR1cm4gJ04vQSc7XG4gIH1cbiAgY29uc3QgYWJzUmF0aW8gPSBNYXRoLmFicyhyYXRpbyk7XG4gIGlmIChhYnNSYXRpbyA+IDEwMDApIHtcbiAgICByZXR1cm4gcmF0aW8gPiAwID8gJz4gMSwwMDAnIDogJzwgLTEsMDAwJztcbiAgfVxuICBpZiAoYWJzUmF0aW8gPiAxMDApIHtcbiAgICByZXR1cm4gZml4ZWQwKHJhdGlvKTtcbiAgfVxuICBpZiAoYWJzUmF0aW8gPiAxMCkge1xuICAgIHJldHVybiBmaXhlZDEocmF0aW8pO1xuICB9XG4gIHJldHVybiBmaXhlZDIocmF0aW8pO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRQZXJjZW50YWdlKHJhdGlvOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgaWYgKHJhdGlvID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gJy0tJztcbiAgfVxuICBpZiAoIWlzRmluaXRlKHJhdGlvKSkge1xuICAgIHJldHVybiAnTi9BJztcbiAgfVxuICBjb25zdCBhYnNSYXRpbyA9IE1hdGguYWJzKHJhdGlvKTtcbiAgaWYgKGFic1JhdGlvID4gMTApIHtcbiAgICByZXR1cm4gcmF0aW8gPiAwID8gJz4gMSwwMDAlJyA6ICc8IC0xLDAwMCUnO1xuICB9XG4gIGlmIChhYnNSYXRpbyA+IDEpIHtcbiAgICByZXR1cm4gcGVyY2VudDAocmF0aW8pO1xuICB9XG4gIGlmIChhYnNSYXRpbyA+IDAuMSkge1xuICAgIHJldHVybiBwZXJjZW50MShyYXRpbyk7XG4gIH1cbiAgcmV0dXJuIHBlcmNlbnQyKHJhdGlvKTtcbn1cblxuY29uc3QgZmlndXJlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBuYW1lOiB0KCdmaW4ucXVpY2tBc3NldHMnKSxcbiAgICAgIHZhbHVlOiBmb3JtYXRDdXJyZW5jeShsaXZlQmFsYW5jZVN1bW1hcnkucXVpY2tBc3NldHMpLFxuICAgICAgdG9vbHRpcDogdCgnZmluLnF1aWNrQXNzZXRzVG9vbHRpcCcpLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogdCgnZmluLmN1cnJlbnRBc3NldHMnKSxcbiAgICAgIHZhbHVlOiBmb3JtYXRDdXJyZW5jeShsaXZlQmFsYW5jZVN1bW1hcnkuY3VycmVudEFzc2V0cyksXG4gICAgfSxcbiAgICB7IG5hbWU6IHQoJ2Zpbi50b3RhbEFzc2V0cycpLCB2YWx1ZTogZm9ybWF0Q3VycmVuY3kobGl2ZUJhbGFuY2VTdW1tYXJ5LmFzc2V0cykgfSxcbiAgICB7IG5hbWU6IHQoJ2Zpbi5lcXVpdHknKSwgdmFsdWU6IGZvcm1hdEN1cnJlbmN5KGxpdmVCYWxhbmNlU3VtbWFyeS5lcXVpdHkpIH0sXG4gICAge1xuICAgICAgbmFtZTogdCgnZmluLnF1aWNrTGlhYmlsaXRpZXMnKSxcbiAgICAgIHZhbHVlOiBmb3JtYXRDdXJyZW5jeShsaXZlQmFsYW5jZVN1bW1hcnkucXVpY2tMaWFiaWxpdGllcyksXG4gICAgICB0b29sdGlwOiB0KCdmaW4ucXVpY2tMaWFiaWxpdGllc1Rvb2x0aXAnKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IHQoJ2Zpbi5jdXJyZW50TGlhYmlsaXRpZXMnKSxcbiAgICAgIHZhbHVlOiBmb3JtYXRDdXJyZW5jeShsaXZlQmFsYW5jZVN1bW1hcnkuY3VycmVudExpYWJpbGl0aWVzKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IHQoJ2Zpbi50b3RhbExpYWJpbGl0aWVzJyksXG4gICAgICB2YWx1ZTogZm9ybWF0Q3VycmVuY3kobGl2ZUJhbGFuY2VTdW1tYXJ5LmxpYWJpbGl0aWVzKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IHQoJ2Zpbi5saXF1aWRhdGlvblZhbHVlJyksXG4gICAgICB2YWx1ZTogZm9ybWF0Q3VycmVuY3kobGl2ZUJhbGFuY2VTdW1tYXJ5LmxpcXVpZGF0aW9uVmFsdWUpLFxuICAgICAgdG9vbHRpcDogdCgnZmluLmxpcXVpZGF0aW9uVmFsdWVUb29sdGlwJyksXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiB0KCdmaW4ucXVpY2tSYXRpbycpLFxuICAgICAgdmFsdWU6IGZvcm1hdFJhdGlvKGxpdmVCYWxhbmNlU3VtbWFyeS5hY2lkVGVzdFJhdGlvKSxcbiAgICAgIHRvb2x0aXA6IHQoJ2Zpbi5xdWlja1JhdGlvVG9vbHRpcCcpLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogdCgnZmluLmRlYnRSYXRpbycpLFxuICAgICAgdmFsdWU6IGZvcm1hdFBlcmNlbnRhZ2UobGl2ZUJhbGFuY2VTdW1tYXJ5LmRlYnRSYXRpbyksXG4gICAgICB0b29sdGlwOiB0KCdmaW4uZGVidFJhdGlvVG9vbHRpcCcpLFxuICAgIH0sXG4gIF07XG59KTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxGaW5IZWFkZXI+e3sgdCgnZmluLmtleUZpZ3VyZXMnKSB9fTwvRmluSGVhZGVyPlxuICA8S2V5RmlndXJlcyA6ZmlndXJlcz1cImZpZ3VyZXNcIiAvPlxuICA8RmluSGVhZGVyPnt7IHQoJ2Zpbi5pbnZlbnRvcnlCcmVha2Rvd24nKSB9fTwvRmluSGVhZGVyPlxuICA8dGFibGU+XG4gICAgPHRoZWFkPlxuICAgICAgPHRyPlxuICAgICAgICA8dGg+e3sgdCgnZmluLm5hbWUnKSB9fTwvdGg+XG4gICAgICAgIDx0aD57eyB0KCdmaW4ubm9uQ3VycmVudEFzc2V0cycpIH19PC90aD5cbiAgICAgICAgPHRoPnt7IHQoJ2Zpbi5jdXJyZW50QXNzZXRzJykgfX08L3RoPlxuICAgICAgICA8dGg+e3sgdCgnZmluLnRvdGFsQXNzZXRzVGFibGUnKSB9fTwvdGg+XG4gICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+XG4gICAgPHRib2R5PlxuICAgICAgPHRyIHYtZm9yPVwibG9jYXRpb24gaW4gbG9jYXRpb25zXCIgOmtleT1cImxvY2F0aW9uLm5hbWVcIj5cbiAgICAgICAgPHRkPnt7IGxvY2F0aW9uLm5hbWUgfX08L3RkPlxuICAgICAgICA8dGQ+e3sgZml4ZWQwKGxvY2F0aW9uLm5vbkN1cnJlbnQpIH19PC90ZD5cbiAgICAgICAgPHRkPnt7IGZpeGVkMChsb2NhdGlvbi5jdXJyZW50KSB9fTwvdGQ+XG4gICAgICAgIDx0ZD57eyBmaXhlZDAobG9jYXRpb24udG90YWwpIH19PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbiAgPC90YWJsZT5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG50YWJsZSB0ciA+IDpub3QoOmZpcnN0LWNoaWxkKSB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwidCIsIl9jcmVhdGVWTm9kZSIsIkZpbkhlYWRlciIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX3VucmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFlQSxVQUFBLFlBQUEsU0FBQSxNQUFBLHlCQUFBO0FBRUEsYUFBQSxZQUFBLE9BQUE7QUFDRSxVQUFBLFVBQUEsUUFBQTtBQUNFLGVBQUE7QUFBQSxNQUFPO0FBRVQsVUFBQSxDQUFBLFNBQUEsS0FBQSxHQUFBO0FBQ0UsZUFBQTtBQUFBLE1BQU87QUFFVCxZQUFBLFdBQUEsS0FBQSxJQUFBLEtBQUE7QUFDQSxVQUFBLFdBQUEsS0FBQTtBQUNFLGVBQUEsUUFBQSxJQUFBLFlBQUE7QUFBQSxNQUErQjtBQUVqQyxVQUFBLFdBQUEsS0FBQTtBQUNFLGVBQUEsT0FBQSxLQUFBO0FBQUEsTUFBbUI7QUFFckIsVUFBQSxXQUFBLElBQUE7QUFDRSxlQUFBLE9BQUEsS0FBQTtBQUFBLE1BQW1CO0FBRXJCLGFBQUEsT0FBQSxLQUFBO0FBQUEsSUFBbUI7QUFHckIsYUFBQSxpQkFBQSxPQUFBO0FBQ0UsVUFBQSxVQUFBLFFBQUE7QUFDRSxlQUFBO0FBQUEsTUFBTztBQUVULFVBQUEsQ0FBQSxTQUFBLEtBQUEsR0FBQTtBQUNFLGVBQUE7QUFBQSxNQUFPO0FBRVQsWUFBQSxXQUFBLEtBQUEsSUFBQSxLQUFBO0FBQ0EsVUFBQSxXQUFBLElBQUE7QUFDRSxlQUFBLFFBQUEsSUFBQSxhQUFBO0FBQUEsTUFBZ0M7QUFFbEMsVUFBQSxXQUFBLEdBQUE7QUFDRSxlQUFBLFNBQUEsS0FBQTtBQUFBLE1BQXFCO0FBRXZCLFVBQUEsV0FBQSxLQUFBO0FB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
