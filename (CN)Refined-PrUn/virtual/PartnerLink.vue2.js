import PrunLink from './PrunLink.vue.js';
import { isFactionContract } from './utils5.js';
import fa from './font-awesome.module.css.js';
import coloredValue from './colored-value.module.css.js';
import {
  defineComponent,
  createBlock,
  createElementBlock,
  openBlock,
  withCtx,
  createElementVNode as createBaseVNode,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 4 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'PartnerLink',
  props: {
    contract: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return unref(isFactionContract)(_ctx.contract)
        ? (openBlock(),
          createBlock(
            PrunLink,
            {
              key: 0,
              command: `FA ${_ctx.contract.partner.countryCode}`,
            },
            {
              default: withCtx(() => [
                createBaseVNode(
                  'span',
                  {
                    class: normalizeClass([unref(fa).regular, unref(coloredValue).warning]),
                  },
                  toDisplayString(''),
                  2,
                ),
                createTextVNode(' ' + toDisplayString(_ctx.contract.partner.name), 1),
              ]),
              _: 1,
            },
            8,
            ['command'],
          ))
        : _ctx.contract.partner.name
          ? (openBlock(),
            createBlock(
              PrunLink,
              {
                key: 1,
                command: `CO ${_ctx.contract.partner.code}`,
              },
              {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.contract.partner.name), 1),
                ]),
                _: 1,
              },
              8,
              ['command'],
            ))
          : _ctx.contract.partner.code
            ? (openBlock(),
              createBlock(
                PrunLink,
                {
                  key: 2,
                  command: `CO ${_ctx.contract.partner.code}`,
                },
                null,
                8,
                ['command'],
              ))
            : _ctx.contract.partner.currency
              ? (openBlock(),
                createElementBlock(
                  'div',
                  {
                    key: 3,
                    'data-tooltip':
                      'Refined PrUn is unable to fetch government information. Check the contract info for more details.',
                    'data-tooltip-position': 'down',
                    class: normalizeClass(_ctx.$style.overrideTooltipStyle),
                  },
                  ' Planetary Government ',
                  2,
                ))
              : (openBlock(), createElementBlock('div', _hoisted_1, 'Unknown'));
    };
  },
});
export { _sfc_main as default };
