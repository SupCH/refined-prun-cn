import _sfc_main$1 from './PieChart.vue.js';
import { liveBalanceSummary } from './balance-sheet-live.js';
import { defineComponent, createBlock, openBlock } from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'AssetPieChart',
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$1,
          {
            'label-data': ['Current', 'Non-Current'],
            'numerical-data': [
              unref(liveBalanceSummary).currentAssets ?? 0,
              unref(liveBalanceSummary).nonCurrentAssets ?? 0,
            ],
          },
          null,
          8,
          ['numerical-data'],
        )
      );
    };
  },
});
export { _sfc_main as default };
