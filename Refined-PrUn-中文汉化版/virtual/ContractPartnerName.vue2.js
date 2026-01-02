import { contractsStore } from './contracts.js';
import PrunLink from './PrunLink.vue.js';
import { isFactionContract } from './utils4.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  createBlock,
  openBlock,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ContractPartnerName',
  props: {
    contractLocalId: {},
  },
  setup(__props) {
    const contract = computed(() => contractsStore.getByLocalId(__props.contractLocalId));
    return (_ctx, _cache) => {
      return !unref(contract)
        ? (openBlock(),
          createElementBlock(
            'div',
            {
              key: 0,
              class: normalizeClass(_ctx.$style.label),
            },
            'Unknown',
            2,
          ))
        : unref(isFactionContract)(unref(contract))
          ? (openBlock(),
            createBlock(
              PrunLink,
              {
                key: 1,
                command: `FA ${unref(contract).partner.countryCode}`,
                class: normalizeClass(_ctx.$style.label),
              },
              {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(contract).partner.name), 1),
                ]),
                _: 1,
              },
              8,
              ['command', 'class'],
            ))
          : unref(contract).partner.name
            ? (openBlock(),
              createBlock(
                PrunLink,
                {
                  key: 2,
                  command: `CO ${unref(contract).partner.code}`,
                  class: normalizeClass(_ctx.$style.label),
                },
                {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(contract).partner.name), 1),
                  ]),
                  _: 1,
                },
                8,
                ['command', 'class'],
              ))
            : unref(contract).partner.code
              ? (openBlock(),
                createBlock(
                  PrunLink,
                  {
                    key: 3,
                    command: `CO ${unref(contract).partner.code}`,
                    class: normalizeClass(_ctx.$style.label),
                  },
                  null,
                  8,
                  ['command', 'class'],
                ))
              : unref(contract).partner.currency
                ? (openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: 4,
                      class: normalizeClass(_ctx.$style.label),
                    },
                    'Planetary Government',
                    2,
                  ))
                : (openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: 5,
                      class: normalizeClass(_ctx.$style.label),
                    },
                    'Unknown',
                    2,
                  ));
    };
  },
});
export { _sfc_main as default };
