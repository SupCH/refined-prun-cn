import { t } from './index5.js';
import LoadingSpinner from './LoadingSpinner.vue.js';
import { contractsStore } from './contracts.js';
import _sfc_main$1 from './ContractRow.vue.js';
import { canAcceptContract } from './utils4.js';
import { isEmpty } from './is-empty.js';
import {
  defineComponent,
  computed,
  createBlock,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { colspan: '4' };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CONTS',
  setup(__props) {
    const filtered = computed(() =>
      contractsStore.all.value.filter(shouldShowContract).sort(compareContracts),
    );
    function shouldShowContract(contract) {
      switch (contract.status) {
        case 'OPEN':
        case 'CLOSED':
        case 'PARTIALLY_FULFILLED':
        case 'DEADLINE_EXCEEDED': {
          return true;
        }
        default: {
          return false;
        }
      }
    }
    function compareContracts(a, b) {
      if (canAcceptContract(a) && !canAcceptContract(b)) {
        return -1;
      }
      if (canAcceptContract(b) && !canAcceptContract(a)) {
        return 1;
      }
      return (b.date?.timestamp ?? 0) - (a.date?.timestamp ?? 0);
    }
    return (_ctx, _cache) => {
      return !unref(contractsStore).fetched
        ? (openBlock(), createBlock(LoadingSpinner, { key: 0 }))
        : (openBlock(),
          createElementBlock('table', _hoisted_1, [
            createBaseVNode('thead', null, [
              createBaseVNode('tr', null, [
                createBaseVNode(
                  'th',
                  null,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('conts.contract')),
                  1,
                ),
                createBaseVNode(
                  'th',
                  null,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('conts.item')),
                  1,
                ),
                createBaseVNode(
                  'th',
                  null,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('conts.partner')),
                  1,
                ),
                createBaseVNode(
                  'th',
                  null,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('conts.self')),
                  1,
                ),
              ]),
            ]),
            createBaseVNode('tbody', null, [
              unref(isEmpty)(unref(filtered))
                ? (openBlock(),
                  createElementBlock('tr', _hoisted_2, [
                    createBaseVNode(
                      'td',
                      _hoisted_3,
                      toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('conts.noActive')),
                      1,
                    ),
                  ]))
                : (openBlock(true),
                  createElementBlock(
                    Fragment,
                    { key: 1 },
                    renderList(unref(filtered), contract => {
                      return (
                        openBlock(),
                        createBlock(
                          _sfc_main$1,
                          {
                            key: contract.id,
                            contract,
                          },
                          null,
                          8,
                          ['contract'],
                        )
                      );
                    }),
                    128,
                  )),
            ]),
          ]));
    };
  },
});
export { _sfc_main as default };
