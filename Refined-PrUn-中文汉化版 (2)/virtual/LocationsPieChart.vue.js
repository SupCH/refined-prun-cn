import _sfc_main$1 from './PieChart.vue.js';
import { calculateLocationAssets } from './financials.js';
import { defineComponent, computed, createBlock, openBlock } from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'LocationsPieChart',
  setup(__props) {
    const locations = computed(() => calculateLocationAssets() ?? []);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$1,
          {
            'label-data': unref(locations).map(x => x.name),
            'numerical-data': unref(locations).map(x => x.total),
          },
          null,
          8,
          ['label-data', 'numerical-data'],
        )
      );
    };
  },
});
export { _sfc_main as default };
