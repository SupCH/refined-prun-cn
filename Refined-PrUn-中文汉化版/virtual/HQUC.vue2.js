import { calculateHQUpgradeMaterials } from './hq.js';
import { companyStore } from './company.js';
import MaterialPurchaseTable from './MaterialPurchaseTable.vue.js';
import { useTileState } from './user-data-tiles.js';
import _sfc_main$3 from './PrunButton.vue.js';
import _sfc_main$2 from './Active.vue.js';
import _sfc_main$4 from './Commands.vue.js';
import _sfc_main$1 from './NumberInput.vue.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  withCtx,
  createTextVNode,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { isRef, unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'HQUC',
  setup(__props) {
    const from = useTileState('from', companyStore.value?.headquarters.level ?? 1);
    const to = useTileState('to', from.value + 1);
    const materials = computed(() => calculateHQUpgradeMaterials(from.value, to.value));
    function reset() {
      from.value = companyStore.value?.headquarters.level ?? 1;
      to.value = from.value + 1;
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                { label: 'From' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        modelValue: unref(from),
                        'onUpdate:modelValue':
                          _cache[0] ||
                          (_cache[0] = $event => (isRef(from) ? (from.value = $event) : null)),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'To' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        modelValue: unref(to),
                        'onUpdate:modelValue':
                          _cache[1] ||
                          (_cache[1] = $event => (isRef(to) ? (to.value = $event) : null)),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$3,
                    {
                      primary: '',
                      onClick: reset,
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[2] || (_cache[2] = [createTextVNode('RESET', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              }),
            ]),
            createVNode(MaterialPurchaseTable, { materials: unref(materials) }, null, 8, [
              'materials',
            ]),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
