import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import { objectId } from './object-id.js';
import _sfc_main$5 from './Commands.vue.js';
import _sfc_main$4 from './PrunButton.vue.js';
import _sfc_main$3 from './NumberInput.vue.js';
import { materialsStore } from './materials.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  Fragment,
  renderList,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Edit',
  props: {
    group: {},
  },
  setup(__props, { expose: __expose }) {
    const materials = ref(getMaterials());
    function getMaterials() {
      const materials2 = __props.group.materials ?? {};
      return Object.keys(materials2).map(x => [x, materials2[x]]);
    }
    function onAddClick() {
      materials.value.push(['', 0]);
    }
    function validate() {
      return true;
    }
    function save() {
      __props.group.materials = {};
      for (let [ticker, amount] of materials.value) {
        const material = materialsStore.getByTicker(ticker);
        if (!material || amount === 0 || !isFinite(amount)) {
          continue;
        }
        __props.group.materials[material.ticker] = amount;
      }
    }
    __expose({ validate, save });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(unref(materials), (pair, i) => {
                return (
                  openBlock(),
                  createElementBlock(
                    Fragment,
                    {
                      key: unref(objectId)(pair),
                    },
                    [
                      createVNode(
                        _sfc_main$2,
                        {
                          label: `Material Ticker #${i + 1}`,
                        },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _sfc_main$1,
                              {
                                modelValue: pair[0],
                                'onUpdate:modelValue': $event => (pair[0] = $event),
                              },
                              null,
                              8,
                              ['modelValue', 'onUpdate:modelValue'],
                            ),
                          ]),
                          _: 2,
                        },
                        1032,
                        ['label'],
                      ),
                      createVNode(
                        _sfc_main$2,
                        {
                          label: `Material Amount #${i + 1}`,
                        },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _sfc_main$3,
                              {
                                modelValue: pair[1],
                                'onUpdate:modelValue': $event => (pair[1] = $event),
                              },
                              null,
                              8,
                              ['modelValue', 'onUpdate:modelValue'],
                            ),
                          ]),
                          _: 2,
                        },
                        1032,
                        ['label'],
                      ),
                    ],
                    64,
                  )
                );
              }),
              128,
            )),
            createVNode(_sfc_main$5, null, {
              default: withCtx(() => [
                createVNode(
                  _sfc_main$4,
                  {
                    primary: '',
                    onClick: onAddClick,
                  },
                  {
                    default: withCtx(() => [
                      ...(_cache[0] || (_cache[0] = [createTextVNode('ADD MATERIAL', -1)])),
                    ]),
                    _: 1,
                  },
                ),
              ]),
              _: 1,
            }),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
