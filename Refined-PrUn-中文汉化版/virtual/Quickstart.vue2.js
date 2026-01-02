import { C } from './prun-css.js';
import _sfc_main$4 from './PrunButton.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import _sfc_main$5 from './Commands.vue.js';
import { userData } from './user-data.js';
import { showBuffer } from './buffers.js';
import _sfc_main$3 from './NumberInput.vue.js';
import { sitesStore } from './sites.js';
import {
  getEntityNameFromAddress,
  getLocationLineFromAddress,
  getEntityNaturalIdFromAddress,
} from './addresses.js';
import { comparePlanets } from './util.js';
import SelectInput from './SelectInput.vue.js';
import { warehousesStore } from './warehouses.js';
import { configurableValue } from './shared-types.js';
import { storagesStore } from './storage.js';
import { serializeStorage } from './utils3.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { ref, isRef, unref } from './reactivity.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Quickstart',
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const days = ref(userData.settings.burn.resupply);
    const name = ref(`Base Resupply ${days.value}d`);
    const planets = computed(() =>
      (sitesStore.all.value ?? [])
        .map(x => getEntityNameFromAddress(x.address))
        .filter(x => x !== void 0)
        .sort(comparePlanets),
    );
    const planet = ref(planets.value[0]);
    const cxes = computed(
      () =>
        warehousesStore.all.value
          ?.filter(x => getLocationLineFromAddress(x.address)?.type === 'STATION')
          .map(x => ({
            label: getEntityNameFromAddress(x.address),
            value: getEntityNaturalIdFromAddress(x.address),
          }))
          .sort((a, b) => a.label.localeCompare(b.label)) ?? [],
    );
    const cx = ref(cxes.value[0].value);
    function onCreateClick() {
      if (name.value.length === 0) {
        return;
      }
      const warehouse = warehousesStore.getByEntityNaturalId(cx.value);
      const storage = storagesStore.getById(warehouse.storeId);
      const cxTicker = ExchangeTickers[cx.value];
      userData.actionPackages.push({
        global: { name: name.value },
        groups: [
          {
            name: 'Resupply',
            type: 'Resupply',
            planet: planet.value,
            days: days.value,
            useBaseInv: true,
          },
        ],
        actions: [
          {
            name: 'Buy Missing Materials',
            type: 'CX Buy',
            group: 'Resupply',
            exchange: cxTicker,
            useCXInv: true,
          },
          {
            name: 'Select your ship in the "To" field ↓',
            type: 'MTRA',
            group: 'Resupply',
            origin: serializeStorage(storage),
            dest: configurableValue,
          },
        ],
      });
      showBuffer('XIT ACT_' + name.value.split(' ').join('_'));
      emit('close');
    }
    const ExchangeTickers = {
      ANT: 'AI1',
      BEN: 'CI1',
      MOR: 'NC1',
      HRT: 'IC1',
      HUB: 'NC2',
      ARC: 'CI2',
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).DraftConditionEditor.form),
          },
          [
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                ...(_cache[4] || (_cache[4] = [createTextVNode('Quickstart', -1)])),
              ]),
              _: 1,
            }),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.description),
              },
              [
                ...(_cache[5] ||
                  (_cache[5] = [
                    createTextVNode(
                      ' This prefilled action package will resupply your base with materials for a given number of days. ',
                      -1,
                    ),
                    createBaseVNode('br', null, null, -1),
                    createTextVNode(
                      ' The created action package will have two actions: buy missing materials from the CX, then transfer them to the configured (next step) ship. ',
                      -1,
                    ),
                    createBaseVNode('br', null, null, -1),
                    createTextVNode(
                      ' After clicking "Create", you will be taken to the action package runner. Once there, first configure the target ship, then press "Execute" and press "Act" until the package is done. ',
                      -1,
                    ),
                    createBaseVNode('br', null, null, -1),
                    createBaseVNode(
                      'mark',
                      null,
                      'Note: You need a ship parked at the selected CX for this to work.',
                      -1,
                    ),
                  ])),
              ],
              2,
            ),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                { label: 'Name' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        modelValue: unref(name),
                        'onUpdate:modelValue':
                          _cache[0] ||
                          (_cache[0] = $event => (isRef(name) ? (name.value = $event) : null)),
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
                { label: 'CX to Resupply From' },
                {
                  default: withCtx(() => [
                    createVNode(
                      SelectInput,
                      {
                        modelValue: unref(cx),
                        'onUpdate:modelValue':
                          _cache[1] ||
                          (_cache[1] = $event => (isRef(cx) ? (cx.value = $event) : null)),
                        options: unref(cxes),
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
                _sfc_main$2,
                { label: 'Planet to Resupply' },
                {
                  default: withCtx(() => [
                    createVNode(
                      SelectInput,
                      {
                        modelValue: unref(planet),
                        'onUpdate:modelValue':
                          _cache[2] ||
                          (_cache[2] = $event => (isRef(planet) ? (planet.value = $event) : null)),
                        options: unref(planets),
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
                _sfc_main$2,
                { label: 'Resupply Days' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$3,
                      {
                        modelValue: unref(days),
                        'onUpdate:modelValue':
                          _cache[3] ||
                          (_cache[3] = $event => (isRef(days) ? (days.value = $event) : null)),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(_sfc_main$5, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      primary: '',
                      onClick: onCreateClick,
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[6] || (_cache[6] = [createTextVNode('CREATE', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              }),
            ]),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
