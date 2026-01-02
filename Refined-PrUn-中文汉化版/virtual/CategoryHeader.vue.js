import SectionHeader from './SectionHeader.vue.js';
import {
  defineComponent,
  createBlock,
  openBlock,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CategoryHeader',
  props: {
    label: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          SectionHeader,
          { style: { width: '100%' } },
          {
            default: withCtx(() => [createTextVNode(toDisplayString(_ctx.label), 1)]),
            _: 1,
          },
        )
      );
    };
  },
});
export { _sfc_main as default };
