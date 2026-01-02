import _sfc_main$1 from './Active.vue.js';
import { sitesStore } from './sites.js';
import { getEntityNameFromAddress } from './addresses.js';
import SelectInput from './SelectInput.vue.js';
import _sfc_main$2 from './NumberInput.vue.js';
import { comparePlanets } from './util.js';
import _sfc_main$3 from './TextInput.vue.js';
import _sfc_main$4 from './RadioItem.vue.js';
import { materialsStore } from './materials.js';
import { configurableValue } from './shared-types.js';
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
    group: {},
  },
  setup(__props, { expose: __expose }) {
    const planets = computed(() => {
      const planets2 = (sitesStore.all.value ?? [])
        .map(x => getEntityNameFromAddress(x.address))
        .filter(x => x !== void 0)
        .sort(comparePlanets);
      planets2.unshift(configurableValue);
      return planets2;
    });
    const planet = ref(__props.group.planet ?? planets.value[0]);
    const planetError = ref(false);
    const days = ref(
      typeof __props.group.days === 'string'
        ? parseInt(__props.group.days || '10')
        : (__props.group.days ?? 10),
    );
    const daysError = ref(false);
    const exclusions = ref(__props.group.exclusions?.join(', ') ?? '');
    const useBaseInventory = ref(__props.group.useBaseInv ?? true);
    const workforceOnly = ref(__props.group.consumablesOnly ?? false);
    function validate() {
      let isValid = true;
      planetError.value = !planet.value;
      isValid &&= !planetError.value;
      daysError.value = days.value <= 0;
      isValid &&= !daysError.value;
      return isValid;
    }
    function save() {
      __props.group.planet = planet.value;
      __props.group.days = days.value;
      __props.group.exclusions = exclusions.value
        .split(',')
        .map(x => materialsStore.getByTicker(x.trim())?.ticker)
        .filter(x => x !== void 0);
      __props.group.useBaseInv = useBaseInventory.value;
      __props.group.consumablesOnly = workforceOnly.value;
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
              {
                label: 'Planet',
                error: unref(planetError),
              },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(planet),
                      'onUpdate:modelValue':
                        _cache[0] ||
                        (_cache[0] = $event => (isRef(planet) ? (planet.value = $event) : null)),
                      options: unref(planets),
                    },
                    null,
                    8,
                    ['modelValue', 'options'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['error'],
            ),
            createVNode(
              _sfc_main$1,
              {
                label: 'Days',
                tooltip: 'The number of days of supplies to refill the planet with.',
                error: unref(daysError),
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$2,
                    {
                      modelValue: unref(days),
                      'onUpdate:modelValue':
                        _cache[1] ||
                        (_cache[1] = $event => (isRef(days) ? (days.value = $event) : null)),
                    },
                    null,
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['error'],
            ),
            createVNode(
              _sfc_main$1,
              {
                label: 'Material Exclusions',
                tooltip:
                  'Materials to be excluded from the group. List material tickers separated by commas.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$3,
                    {
                      modelValue: unref(exclusions),
                      'onUpdate:modelValue':
                        _cache[2] ||
                        (_cache[2] = $event =>
                          isRef(exclusions) ? (exclusions.value = $event) : null),
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
              _sfc_main$1,
              {
                label: 'Use Base Inv',
                tooltip: 'Whether to count the materials currently in the base towards the totals.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      modelValue: unref(useBaseInventory),
                      'onUpdate:modelValue':
                        _cache[3] ||
                        (_cache[3] = $event =>
                          isRef(useBaseInventory) ? (useBaseInventory.value = $event) : null),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[5] || (_cache[5] = [createTextVNode('use base inv', -1)])),
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
            createVNode(
              _sfc_main$1,
              {
                label: 'Workforce Only',
                tooltip:
                  'Whether to limit the materials in the group to workforce consumables only.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      modelValue: unref(workforceOnly),
                      'onUpdate:modelValue':
                        _cache[4] ||
                        (_cache[4] = $event =>
                          isRef(workforceOnly) ? (workforceOnly.value = $event) : null),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[6] || (_cache[6] = [createTextVNode('workforce only', -1)])),
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
