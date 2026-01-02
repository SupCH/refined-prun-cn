import PrunLink from './PrunLink.vue.js';
import { isFactionContract } from './utils4.js';
import {
  defineComponent,
  computed,
  createBlock,
  openBlock,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeStyle, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ContractLink',
  props: {
    contract: {},
  },
  setup(__props) {
    const linkStyle = computed(() => ({
      display: isFactionContract(__props.contract) ? 'inline' : 'block',
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          PrunLink,
          {
            command: `CONT ${_ctx.contract.localId}`,
            style: normalizeStyle(unref(linkStyle)),
          },
          {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.contract.name || _ctx.contract.localId), 1),
            ]),
            _: 1,
          },
          8,
          ['command', 'style'],
        )
      );
    };
  },
});
export { _sfc_main as default };
