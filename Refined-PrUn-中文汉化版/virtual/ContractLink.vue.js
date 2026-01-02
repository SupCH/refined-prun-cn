import PrunLink from './PrunLink.vue.js';
import { canAcceptContract, canPartnerAcceptContract, isFactionContract } from './utils4.js';
import fa from './font-awesome.module.css.js';
import coloredValue from './colored-value.module.css.js';
import {
  defineComponent,
  computed,
  createBlock,
  openBlock,
  withCtx,
  createTextVNode,
  createElementBlock,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeStyle, toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ContractLink',
  props: {
    contract: {},
  },
  setup(__props) {
    const canAccept = computed(() => canAcceptContract(__props.contract));
    const canPartnerAccept = computed(() => canPartnerAcceptContract(__props.contract));
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
              createTextVNode(
                toDisplayString(_ctx.contract.name || _ctx.contract.localId) + ' ',
                1,
              ),
              unref(canAccept)
                ? (openBlock(),
                  createElementBlock(
                    'span',
                    {
                      key: 0,
                      class: normalizeClass([unref(fa).solid, unref(coloredValue).warning]),
                    },
                    toDisplayString(''),
                    2,
                  ))
                : createCommentVNode('', true),
              unref(canPartnerAccept)
                ? (openBlock(),
                  createElementBlock(
                    'span',
                    {
                      key: 1,
                      class: normalizeClass([unref(fa).solid, unref(coloredValue).warning]),
                    },
                    toDisplayString(''),
                    2,
                  ))
                : createCommentVNode('', true),
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
