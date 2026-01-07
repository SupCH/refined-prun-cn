import { t } from './index5.js';
import { useXitParameters } from './use-xit-parameters.js';
import _sfc_main$1 from './Tabs.vue.js';
import GAME from './GAME.vue.js';
import FEAT from './FEAT.vue.js';
import FIN from './FIN.vue4.js';
import BFR from './BFR.vue.js';
import { defineComponent, createBlock, openBlock } from './runtime-core.esm-bundler.js';
import { shallowRef, isRef, unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SET',
  setup(__props) {
    const tabs = [
      {
        id: 'GAME',
        label: t('settings.tabs.gameplay'),
        component: GAME,
      },
      {
        id: 'FEAT',
        label: t('settings.tabs.features'),
        component: FEAT,
      },
      {
        id: 'FIN',
        label: t('settings.tabs.financial'),
        component: FIN,
      },
      {
        id: 'BFR',
        label: t('settings.tabs.buffers'),
        component: BFR,
      },
    ];
    const parameters = useXitParameters();
    const parameter = parameters[0];
    const activeTab = shallowRef(tabs.find(x => x.id === parameter?.toUpperCase()) ?? tabs[0]);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$1,
          {
            modelValue: unref(activeTab),
            'onUpdate:modelValue':
              _cache[0] ||
              (_cache[0] = $event => (isRef(activeTab) ? (activeTab.value = $event) : null)),
            tabs,
          },
          null,
          8,
          ['modelValue'],
        )
      );
    };
  },
});
export { _sfc_main as default };
