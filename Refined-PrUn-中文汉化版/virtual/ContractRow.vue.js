import _sfc_main$1 from './ContractLink.vue.js';
import _sfc_main$2 from './MaterialList.vue.js';
import PartnerLink from './PartnerLink.vue.js';
import _sfc_main$3 from './ConditionList.vue.js';
import { isSelfCondition, isPartnerCondition } from './utils4.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { style: { width: '32px', paddingLeft: '10px' } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ContractRow',
  props: {
    contract: {},
  },
  setup(__props) {
    const self = computed(() =>
      __props.contract.conditions.filter(x => isSelfCondition(__props.contract, x)),
    );
    const partner = computed(() =>
      __props.contract.conditions.filter(x => isPartnerCondition(__props.contract, x)),
    );
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('tr', null, [
          createBaseVNode('td', null, [
            createVNode(_sfc_main$1, { contract: _ctx.contract }, null, 8, ['contract']),
          ]),
          createBaseVNode('td', _hoisted_1, [
            createVNode(_sfc_main$2, { contract: _ctx.contract }, null, 8, ['contract']),
          ]),
          createBaseVNode('td', null, [
            createVNode(PartnerLink, { contract: _ctx.contract }, null, 8, ['contract']),
            createVNode(
              _sfc_main$3,
              {
                conditions: unref(partner),
                contract: _ctx.contract,
              },
              null,
              8,
              ['conditions', 'contract'],
            ),
          ]),
          createBaseVNode('td', null, [
            createVNode(
              _sfc_main$3,
              {
                conditions: unref(self),
                contract: _ctx.contract,
              },
              null,
              8,
              ['conditions', 'contract'],
            ),
          ]),
        ])
      );
    };
  },
});
export { _sfc_main as default };
