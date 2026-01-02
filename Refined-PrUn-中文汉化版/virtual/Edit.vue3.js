import _sfc_main$1 from './Active.vue.js';
import SelectInput from './SelectInput.vue.js';
import { storageSort, serializeStorage } from './utils3.js';
import { configurableValue } from './shared-types.js';
import _sfc_main$2 from './RadioItem.vue.js';
import { getRefuelOrigins } from './utils6.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
  createTextVNode,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Edit',
  props: {
    action: {},
    pkg: {},
  },
  setup(__props, { expose: __expose }) {
    const storages = computed(() => {
      const storages2 = getRefuelOrigins().sort(storageSort).map(serializeStorage);
      storages2.unshift(configurableValue);
      return storages2;
    });
    const origin = ref(__props.action.origin ?? storages.value[0]);
    const buyMissingFuel = ref(__props.action.buyMissingFuel ?? true);
    function validate() {
      return true;
    }
    function save() {
      __props.action.origin = origin.value;
      __props.action.buyMissingFuel = buyMissingFuel.value;
    }
    __expose({ validate, save });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(
              _sfc_main$1,
              { label: 'Origin' },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(origin),
                      'onUpdate:modelValue':
                        _cache[0] ||
                        (_cache[0] = $event => (isRef(origin) ? (origin.value = $event) : null)),
                      options: unref(storages),
                    },
                    null,
                    8,
                    ['modelValue', 'options'],
                  ),
                ]),
                _: 1,
              },
            ),
            createVNode(
              _sfc_main$1,
              {
                label: 'Buy Missing Fuel',
                tooltip:
                  'Whether the fuel will be bought if there is not enough stock (CX warehouse only).',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$2,
                    {
                      modelValue: unref(buyMissingFuel),
                      'onUpdate:modelValue':
                        _cache[1] ||
                        (_cache[1] = $event =>
                          isRef(buyMissingFuel) ? (buyMissingFuel.value = $event) : null),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[2] || (_cache[2] = [createTextVNode('buy fuel', -1)])),
                      ]),
                      _: 1,
                    },
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
