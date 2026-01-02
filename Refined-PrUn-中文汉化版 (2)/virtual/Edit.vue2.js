import _sfc_main$1 from './Active.vue.js';
import SelectInput from './SelectInput.vue.js';
import { storagesStore } from './storage.js';
import { storageSort, serializeStorage } from './utils3.js';
import { configurableValue } from './shared-types.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
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
    const materialGroups = computed(() => __props.pkg.groups.map(x => x.name).filter(x => x));
    const materialGroup = ref(__props.action.group ?? materialGroups.value[0]);
    const storages = computed(() => {
      const storages2 = [...(storagesStore.all.value ?? [])]
        .filter(x => x.type !== 'STL_FUEL_STORE' && x.type !== 'FTL_FUEL_STORE')
        .sort(storageSort)
        .map(serializeStorage);
      storages2.unshift(configurableValue);
      return storages2;
    });
    const origin = ref(__props.action.origin ?? storages.value[0]);
    const destination = ref(__props.action.dest ?? storages.value[0]);
    function validate() {
      return true;
    }
    function save() {
      __props.action.group = materialGroup.value;
      __props.action.origin = origin.value;
      __props.action.dest = destination.value;
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
              { label: 'Material Group' },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(materialGroup),
                      'onUpdate:modelValue':
                        _cache[0] ||
                        (_cache[0] = $event =>
                          isRef(materialGroup) ? (materialGroup.value = $event) : null),
                      options: unref(materialGroups),
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
              { label: 'Origin' },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(origin),
                      'onUpdate:modelValue':
                        _cache[1] ||
                        (_cache[1] = $event => (isRef(origin) ? (origin.value = $event) : null)),
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
              { label: 'Destination' },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(destination),
                      'onUpdate:modelValue':
                        _cache[2] ||
                        (_cache[2] = $event =>
                          isRef(destination) ? (destination.value = $event) : null),
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
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
