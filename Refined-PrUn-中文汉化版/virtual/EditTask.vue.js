import { C } from './prun-css.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$1 from './Active.vue.js';
import _sfc_main$4 from './TextInput.vue.js';
import SelectInput from './SelectInput.vue.js';
import _sfc_main$3 from './NumberInput.vue.js';
import _sfc_main$6 from './Commands.vue.js';
import _sfc_main$5 from './PrunButton.vue.js';
import _sfc_main$2 from './DateInput.vue.js';
import { sitesStore, getBuildingLastRepair } from './sites.js';
import { getEntityNaturalIdFromAddress, getEntityNameFromAddress } from './addresses.js';
import { getPlanetBurn } from './burn2.js';
import { createId } from './create-id.js';
import { fixed0 } from './format.js';
import { isRepairableBuilding } from './buildings.js';
import { sortMaterialAmounts, mergeMaterialAmounts } from './sort-materials.js';
import {
  defineComponent,
  computed,
  watchEffect,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  createBlock,
  createCommentVNode,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { ref, isRef, unref } from './reactivity.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'EditTask',
  props: {
    onDelete: { type: Function },
    onSave: { type: Function },
    task: {},
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const types = ['Text', 'Resupply', 'Repair'];
    const type = ref(__props.task.type);
    const text = ref(__props.task.text);
    const dueDate = ref(formatDateForInput(__props.task.dueDate));
    const recurring = ref(__props.task.recurring);
    const days = ref(__props.task.days);
    const buildingAge = ref(__props.task.buildingAge);
    function formatDateForInput(date) {
      if (date === void 0) {
        return void 0;
      }
      const localDate = new Date(date);
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, '0');
      const day = String(localDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    const planets = computed(() => {
      return (sitesStore.all.value ?? []).map(x => ({
        label: getEntityNameFromAddress(x.address),
        value: getEntityNaturalIdFromAddress(x.address),
      }));
    });
    const planet = ref(
      planets.value.find(x => x.value === __props.task.planet)?.value ?? planets.value[0]?.value,
    );
    watchEffect(() => {
      const site = sitesStore.getByPlanetNaturalId(planet.value);
      getPlanetBurn(site);
    });
    function onSaveClick() {
      __props.task.type = type.value;
      if (dueDate.value) {
        const [year, month, day] = dueDate.value.split('-').map(x => parseInt(x, 10));
        const date = new Date(year, month - 1, day);
        __props.task.dueDate = date.getTime();
      } else {
        delete __props.task.dueDate;
      }
      __props.task.recurring = recurring.value;
      delete __props.task.text;
      delete __props.task.planet;
      delete __props.task.days;
      delete __props.task.buildingAge;
      delete __props.task.subtasks;
      if (type.value === 'Text') {
        __props.task.text = text.value;
      }
      if (type.value === 'Resupply') {
        __props.task.planet = planet.value;
        __props.task.days = days.value ?? 7;
        const site = sitesStore.getByPlanetNaturalId(__props.task.planet);
        __props.task.text = `Supply [[p:${getEntityNameFromAddress(site.address)}]] with ${__props.task.days} ${__props.task.days === 1 ? 'day' : 'days'} of consumables.`;
        const burn = getPlanetBurn(site)?.burn;
        if (burn) {
          __props.task.subtasks = [];
          for (const mat of Object.keys(burn)) {
            const daily = burn[mat].dailyAmount;
            if (daily < 0) {
              __props.task.subtasks.push({
                id: createId(),
                type: 'Text',
                text: `${fixed0(-daily * __props.task.days)} [[m:${mat}]]`,
              });
            }
          }
        }
      }
      if (type.value === 'Repair') {
        __props.task.planet = planet.value;
        __props.task.buildingAge = buildingAge.value ?? 50;
        const site = sitesStore.getByPlanetNaturalId(__props.task.planet);
        __props.task.text = `Repair buildings on [[p:${getEntityNameFromAddress(site.address)}]] older than ${__props.task.buildingAge} ${__props.task.days === 1 ? 'day' : 'days'}`;
        let materials = [];
        __props.task.subtasks = [];
        for (const building of site.platforms) {
          const shouldRepair =
            isRepairableBuilding(building) &&
            Date.now() - getBuildingLastRepair(building) > __props.task.buildingAge * 864e5;
          if (!shouldRepair) {
            continue;
          }
          materials.push(...building.repairMaterials);
        }
        materials = sortMaterialAmounts(mergeMaterialAmounts(materials));
        for (let amount of materials) {
          __props.task.subtasks.push({
            id: createId(),
            type: 'Text',
            text: `${fixed0(amount.amount)} [[m:${amount.material.ticker}]]`,
          });
        }
      }
      __props.onSave?.();
      emit('close');
    }
    function onDeleteClick() {
      __props.onDelete?.();
      emit('close');
    }
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
                ...(_cache[8] || (_cache[8] = [createTextVNode('Edit task', -1)])),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$1,
                { label: 'Type' },
                {
                  default: withCtx(() => [
                    createVNode(
                      SelectInput,
                      {
                        modelValue: unref(type),
                        'onUpdate:modelValue':
                          _cache[0] ||
                          (_cache[0] = $event => (isRef(type) ? (type.value = $event) : null)),
                        options: types,
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
                { label: 'Due Date' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$2,
                      {
                        modelValue: unref(dueDate),
                        'onUpdate:modelValue':
                          _cache[1] ||
                          (_cache[1] = $event =>
                            isRef(dueDate) ? (dueDate.value = $event) : null),
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
                  label: 'Recurring period',
                  tooltip: 'An amount of days the due date will advance on task completion.',
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$3,
                      {
                        modelValue: unref(recurring),
                        'onUpdate:modelValue':
                          _cache[2] ||
                          (_cache[2] = $event =>
                            isRef(recurring) ? (recurring.value = $event) : null),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              unref(type) === 'Text'
                ? (openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: 0,
                      label: 'Text',
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _sfc_main$4,
                          {
                            modelValue: unref(text),
                            'onUpdate:modelValue':
                              _cache[3] ||
                              (_cache[3] = $event => (isRef(text) ? (text.value = $event) : null)),
                          },
                          null,
                          8,
                          ['modelValue'],
                        ),
                      ]),
                      _: 1,
                    },
                  ))
                : createCommentVNode('', true),
              unref(type) === 'Resupply'
                ? (openBlock(),
                  createElementBlock(
                    Fragment,
                    { key: 1 },
                    [
                      createVNode(
                        _sfc_main$1,
                        { label: 'Planet' },
                        {
                          default: withCtx(() => [
                            createVNode(
                              SelectInput,
                              {
                                modelValue: unref(planet),
                                'onUpdate:modelValue':
                                  _cache[4] ||
                                  (_cache[4] = $event =>
                                    isRef(planet) ? (planet.value = $event) : null),
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
                        _sfc_main$1,
                        {
                          label: 'Days',
                          tooltip: 'The number of days of supplies.',
                        },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _sfc_main$3,
                              {
                                modelValue: unref(days),
                                'onUpdate:modelValue':
                                  _cache[5] ||
                                  (_cache[5] = $event =>
                                    isRef(days) ? (days.value = $event) : null),
                              },
                              null,
                              8,
                              ['modelValue'],
                            ),
                          ]),
                          _: 1,
                        },
                      ),
                    ],
                    64,
                  ))
                : createCommentVNode('', true),
              unref(type) === 'Repair'
                ? (openBlock(),
                  createElementBlock(
                    Fragment,
                    { key: 2 },
                    [
                      createVNode(
                        _sfc_main$1,
                        { label: 'Planet' },
                        {
                          default: withCtx(() => [
                            createVNode(
                              SelectInput,
                              {
                                modelValue: unref(planet),
                                'onUpdate:modelValue':
                                  _cache[6] ||
                                  (_cache[6] = $event =>
                                    isRef(planet) ? (planet.value = $event) : null),
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
                        _sfc_main$1,
                        {
                          label: 'Building age',
                          tooltip: 'The minimum building age to be included in the list.',
                        },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _sfc_main$3,
                              {
                                modelValue: unref(buildingAge),
                                'onUpdate:modelValue':
                                  _cache[7] ||
                                  (_cache[7] = $event =>
                                    isRef(buildingAge) ? (buildingAge.value = $event) : null),
                              },
                              null,
                              8,
                              ['modelValue'],
                            ),
                          ]),
                          _: 1,
                        },
                      ),
                    ],
                    64,
                  ))
                : createCommentVNode('', true),
              createVNode(_sfc_main$6, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$5,
                    {
                      primary: '',
                      onClick: onSaveClick,
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[9] || (_cache[9] = [createTextVNode('SAVE', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                  _ctx.onDelete
                    ? (openBlock(),
                      createBlock(
                        _sfc_main$5,
                        {
                          key: 0,
                          danger: '',
                          onClick: onDeleteClick,
                        },
                        {
                          default: withCtx(() => [
                            ...(_cache[10] || (_cache[10] = [createTextVNode('DELETE', -1)])),
                          ]),
                          _: 1,
                        },
                      ))
                    : createCommentVNode('', true),
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
