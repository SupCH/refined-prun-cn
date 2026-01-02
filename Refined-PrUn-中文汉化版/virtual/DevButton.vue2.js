import _sfc_main$1 from './PrunButton.vue.js';
import {
  defineComponent,
  createBlock,
  openBlock,
  withCtx,
  renderSlot,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'DevButton',
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$1,
          {
            primary: '',
            class: normalizeClass(_ctx.$style.button),
          },
          {
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
          },
          8,
          ['class'],
        )
      );
    };
  },
});
export { _sfc_main as default };
