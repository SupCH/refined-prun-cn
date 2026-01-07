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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdFRhc2sudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL1RPRE8vRWRpdFRhc2sudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgU2VjdGlvbkhlYWRlciBmcm9tICdAc3JjL2NvbXBvbmVudHMvU2VjdGlvbkhlYWRlci52dWUnO1xuaW1wb3J0IEFjdGl2ZSBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQWN0aXZlLnZ1ZSc7XG5pbXBvcnQgVGV4dElucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9UZXh0SW5wdXQudnVlJztcbmltcG9ydCBTZWxlY3RJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvU2VsZWN0SW5wdXQudnVlJztcbmltcG9ydCBOdW1iZXJJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvTnVtYmVySW5wdXQudnVlJztcbmltcG9ydCBDb21tYW5kcyBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQ29tbWFuZHMudnVlJztcbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgRGF0ZUlucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9EYXRlSW5wdXQudnVlJztcbmltcG9ydCB7IGdldEJ1aWxkaW5nTGFzdFJlcGFpciwgc2l0ZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zaXRlcyc7XG5pbXBvcnQge1xuICBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3MsXG4gIGdldEVudGl0eU5hdHVyYWxJZEZyb21BZGRyZXNzLFxufSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYWRkcmVzc2VzJztcbmltcG9ydCB7IGdldFBsYW5ldEJ1cm4gfSBmcm9tICdAc3JjL2NvcmUvYnVybic7XG5pbXBvcnQgeyBjcmVhdGVJZCB9IGZyb20gJ0BzcmMvc3RvcmUvY3JlYXRlLWlkJztcbmltcG9ydCB7IGZpeGVkMCB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCB7IGlzUmVwYWlyYWJsZUJ1aWxkaW5nIH0gZnJvbSAnQHNyYy9jb3JlL2J1aWxkaW5ncyc7XG5pbXBvcnQgeyBtZXJnZU1hdGVyaWFsQW1vdW50cywgc29ydE1hdGVyaWFsQW1vdW50cyB9IGZyb20gJ0BzcmMvY29yZS9zb3J0LW1hdGVyaWFscyc7XG5cbmNvbnN0IHsgb25EZWxldGUsIG9uU2F2ZSwgdGFzayB9ID0gZGVmaW5lUHJvcHM8e1xuICBvbkRlbGV0ZT86ICgpID0+IHZvaWQ7XG4gIG9uU2F2ZT86ICgpID0+IHZvaWQ7XG4gIHRhc2s6IFVzZXJEYXRhLlRhc2s7XG59PigpO1xuXG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHM8eyAoZTogJ2Nsb3NlJyk6IHZvaWQgfT4oKTtcblxuY29uc3QgdHlwZXM6IFVzZXJEYXRhLlRhc2tUeXBlW10gPSBbJ1RleHQnLCAnUmVzdXBwbHknLCAnUmVwYWlyJ107XG5jb25zdCB0eXBlID0gcmVmKHRhc2sudHlwZSk7XG5cbmNvbnN0IHRleHQgPSByZWYodGFzay50ZXh0KTtcbmNvbnN0IGR1ZURhdGUgPSByZWYoZm9ybWF0RGF0ZUZvcklucHV0KHRhc2suZHVlRGF0ZSkpO1xuY29uc3QgcmVjdXJyaW5nID0gcmVmKHRhc2sucmVjdXJyaW5nKTtcbmNvbnN0IGRheXMgPSByZWYodGFzay5kYXlzKTtcbmNvbnN0IGJ1aWxkaW5nQWdlID0gcmVmKHRhc2suYnVpbGRpbmdBZ2UpO1xuXG5mdW5jdGlvbiBmb3JtYXREYXRlRm9ySW5wdXQoZGF0ZTogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gIGlmIChkYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IGxvY2FsRGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICBjb25zdCB5ZWFyID0gbG9jYWxEYXRlLmdldEZ1bGxZZWFyKCk7XG4gIC8vIE1vbnRoIGlzIDAtYmFzZWRcbiAgY29uc3QgbW9udGggPSBTdHJpbmcobG9jYWxEYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpO1xuICBjb25zdCBkYXkgPSBTdHJpbmcobG9jYWxEYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcblxuICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcbn1cblxuY29uc3QgcGxhbmV0cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIChzaXRlc1N0b3JlLmFsbC52YWx1ZSA/PyBbXSkubWFwKHggPT4gKHtcbiAgICBsYWJlbDogZ2V0RW50aXR5TmFtZUZyb21BZGRyZXNzKHguYWRkcmVzcyksXG4gICAgdmFsdWU6IGdldEVudGl0eU5hdHVyYWxJZEZyb21BZGRyZXNzKHguYWRkcmVzcyksXG4gIH0pKTtcbn0pO1xuXG5jb25zdCBwbGFuZXQgPSByZWYoXG4gIHBsYW5ldHMudmFsdWUuZmluZCh4ID0+IHgudmFsdWUgPT09IHRhc2sucGxhbmV0KT8udmFsdWUgPz8gcGxhbmV0cy52YWx1ZVswXT8udmFsdWUsXG4pO1xuXG53YXRjaEVmZmVjdCgoKSA9PiB7XG4gIC8vIFByZWxvYWQgcmVzdXBwbHlcbiAgY29uc3Qgc2l0ZSA9IHNpdGVzU3RvcmUuZ2V0QnlQbGFuZXROYXR1cmFsSWQocGxhbmV0LnZhbHVlKTtcbiAgZ2V0UGxhbmV0QnVybihzaXRlKTtcbn0pO1xuXG5mdW5jdGlvbiBvblNhdmVDbGljaygpIHtcbiAgdGFzay50eXBlID0gdHlwZS52YWx1ZTtcbiAgaWYgKGR1ZURhdGUudmFsdWUpIHtcbiAgICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSBkdWVEYXRlLnZhbHVlLnNwbGl0KCctJykubWFwKHggPT4gcGFyc2VJbnQoeCwgMTApKTtcbiAgICAvLyBNb250aCBpcyAwLWJhc2VkXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbiAgICB0YXNrLmR1ZURhdGUgPSBkYXRlLmdldFRpbWUoKTtcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgdGFzay5kdWVEYXRlO1xuICB9XG4gIHRhc2sucmVjdXJyaW5nID0gcmVjdXJyaW5nLnZhbHVlO1xuICBkZWxldGUgdGFzay50ZXh0O1xuICBkZWxldGUgdGFzay5wbGFuZXQ7XG4gIGRlbGV0ZSB0YXNrLmRheXM7XG4gIGRlbGV0ZSB0YXNrLmJ1aWxkaW5nQWdlO1xuICBkZWxldGUgdGFzay5zdWJ0YXNrcztcbiAgaWYgKHR5cGUudmFsdWUgPT09ICdUZXh0Jykge1xuICAgIHRhc2sudGV4dCA9IHRleHQudmFsdWU7XG4gIH1cbiAgaWYgKHR5cGUudmFsdWUgPT09ICdSZXN1cHBseScpIHtcbiAgICB0YXNrLnBsYW5ldCA9IHBsYW5ldC52YWx1ZTtcbiAgICB0YXNrLmRheXMgPSBkYXlzLnZhbHVlID8/IDc7XG4gICAgY29uc3Qgc2l0ZSA9IHNpdGVzU3RvcmUuZ2V0QnlQbGFuZXROYXR1cmFsSWQodGFzay5wbGFuZXQpITtcbiAgICB0YXNrLnRleHQgPVxuICAgICAgYFN1cHBseSBbW3A6JHtnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3Moc2l0ZS5hZGRyZXNzKX1dXSB3aXRoIGAgK1xuICAgICAgYCR7dGFzay5kYXlzfSAke3Rhc2suZGF5cyA9PT0gMSA/ICdkYXknIDogJ2RheXMnfSBvZiBjb25zdW1hYmxlcy5gO1xuXG4gICAgY29uc3QgYnVybiA9IGdldFBsYW5ldEJ1cm4oc2l0ZSk/LmJ1cm47XG4gICAgaWYgKGJ1cm4pIHtcbiAgICAgIHRhc2suc3VidGFza3MgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgbWF0IG9mIE9iamVjdC5rZXlzKGJ1cm4pKSB7XG4gICAgICAgIGNvbnN0IGRhaWx5ID0gYnVyblttYXRdLmRhaWx5QW1vdW50O1xuICAgICAgICBpZiAoZGFpbHkgPCAwKSB7XG4gICAgICAgICAgdGFzay5zdWJ0YXNrcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBjcmVhdGVJZCgpLFxuICAgICAgICAgICAgdHlwZTogJ1RleHQnLFxuICAgICAgICAgICAgdGV4dDogYCR7Zml4ZWQwKC1kYWlseSAqIHRhc2suZGF5cyl9IFtbbToke21hdH1dXWAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHR5cGUudmFsdWUgPT09ICdSZXBhaXInKSB7XG4gICAgdGFzay5wbGFuZXQgPSBwbGFuZXQudmFsdWU7XG4gICAgdGFzay5idWlsZGluZ0FnZSA9IGJ1aWxkaW5nQWdlLnZhbHVlID8/IDUwO1xuICAgIGNvbnN0IHNpdGUgPSBzaXRlc1N0b3JlLmdldEJ5UGxhbmV0TmF0dXJhbElkKHRhc2sucGxhbmV0KSE7XG4gICAgdGFzay50ZXh0ID1cbiAgICAgIGBSZXBhaXIgYnVpbGRpbmdzIG9uIFtbcDoke2dldEVudGl0eU5hbWVGcm9tQWRkcmVzcyhzaXRlLmFkZHJlc3MpfV1dIGAgK1xuICAgICAgYG9sZGVyIHRoYW4gJHt0YXNrLmJ1aWxkaW5nQWdlfSAke3Rhc2suZGF5cyA9PT0gMSA/ICdkYXknIDogJ2RheXMnfWA7XG5cbiAgICBsZXQgbWF0ZXJpYWxzOiBQcnVuQXBpLk1hdGVyaWFsQW1vdW50W10gPSBbXTtcblxuICAgIHRhc2suc3VidGFza3MgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGJ1aWxkaW5nIG9mIHNpdGUucGxhdGZvcm1zKSB7XG4gICAgICBjb25zdCBzaG91bGRSZXBhaXIgPVxuICAgICAgICBpc1JlcGFpcmFibGVCdWlsZGluZyhidWlsZGluZykgJiZcbiAgICAgICAgRGF0ZS5ub3coKSAtIGdldEJ1aWxkaW5nTGFzdFJlcGFpcihidWlsZGluZykgPiB0YXNrLmJ1aWxkaW5nQWdlICogODY0MDAwMDA7XG4gICAgICBpZiAoIXNob3VsZFJlcGFpcikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIG1hdGVyaWFscy5wdXNoKC4uLmJ1aWxkaW5nLnJlcGFpck1hdGVyaWFscyk7XG4gICAgfVxuXG4gICAgbWF0ZXJpYWxzID0gc29ydE1hdGVyaWFsQW1vdW50cyhtZXJnZU1hdGVyaWFsQW1vdW50cyhtYXRlcmlhbHMpKTtcbiAgICBmb3IgKGxldCBhbW91bnQgb2YgbWF0ZXJpYWxzKSB7XG4gICAgICB0YXNrLnN1YnRhc2tzLnB1c2goe1xuICAgICAgICBpZDogY3JlYXRlSWQoKSxcbiAgICAgICAgdHlwZTogJ1RleHQnLFxuICAgICAgICB0ZXh0OiBgJHtmaXhlZDAoYW1vdW50LmFtb3VudCl9IFtbbToke2Ftb3VudC5tYXRlcmlhbC50aWNrZXJ9XV1gLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIG9uU2F2ZT8uKCk7XG4gIGVtaXQoJ2Nsb3NlJyk7XG59XG5cbmZ1bmN0aW9uIG9uRGVsZXRlQ2xpY2soKSB7XG4gIG9uRGVsZXRlPy4oKTtcbiAgZW1pdCgnY2xvc2UnKTtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiQy5EcmFmdENvbmRpdGlvbkVkaXRvci5mb3JtXCI+XG4gICAgPFNlY3Rpb25IZWFkZXI+RWRpdCB0YXNrPC9TZWN0aW9uSGVhZGVyPlxuICAgIDxmb3JtPlxuICAgICAgPEFjdGl2ZSBsYWJlbD1cIlR5cGVcIj5cbiAgICAgICAgPFNlbGVjdElucHV0IHYtbW9kZWw9XCJ0eXBlXCIgOm9wdGlvbnM9XCJ0eXBlc1wiIC8+XG4gICAgICA8L0FjdGl2ZT5cbiAgICAgIDxBY3RpdmUgbGFiZWw9XCJEdWUgRGF0ZVwiPlxuICAgICAgICA8RGF0ZUlucHV0IHYtbW9kZWw9XCJkdWVEYXRlXCIgLz5cbiAgICAgIDwvQWN0aXZlPlxuICAgICAgPEFjdGl2ZVxuICAgICAgICBsYWJlbD1cIlJlY3VycmluZyBwZXJpb2RcIlxuICAgICAgICB0b29sdGlwPVwiQW4gYW1vdW50IG9mIGRheXMgdGhlIGR1ZSBkYXRlIHdpbGwgYWR2YW5jZSBvbiB0YXNrIGNvbXBsZXRpb24uXCI+XG4gICAgICAgIDxOdW1iZXJJbnB1dCB2LW1vZGVsPVwicmVjdXJyaW5nXCIgLz5cbiAgICAgIDwvQWN0aXZlPlxuICAgICAgPHRlbXBsYXRlIHYtaWY9XCJ0eXBlID09PSAnVGV4dCdcIj5cbiAgICAgICAgPEFjdGl2ZSBsYWJlbD1cIlRleHRcIj5cbiAgICAgICAgICA8VGV4dElucHV0IHYtbW9kZWw9XCJ0ZXh0XCIgLz5cbiAgICAgICAgPC9BY3RpdmU+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtaWY9XCJ0eXBlID09PSAnUmVzdXBwbHknXCI+XG4gICAgICAgIDxBY3RpdmUgbGFiZWw9XCJQbGFuZXRcIj5cbiAgICAgICAgICA8U2VsZWN0SW5wdXQgdi1tb2RlbD1cInBsYW5ldFwiIDpvcHRpb25zPVwicGxhbmV0c1wiIC8+XG4gICAgICAgIDwvQWN0aXZlPlxuICAgICAgICA8QWN0aXZlIGxhYmVsPVwiRGF5c1wiIHRvb2x0aXA9XCJUaGUgbnVtYmVyIG9mIGRheXMgb2Ygc3VwcGxpZXMuXCI+XG4gICAgICAgICAgPE51bWJlcklucHV0IHYtbW9kZWw9XCJkYXlzXCIgLz5cbiAgICAgICAgPC9BY3RpdmU+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtaWY9XCJ0eXBlID09PSAnUmVwYWlyJ1wiPlxuICAgICAgICA8QWN0aXZlIGxhYmVsPVwiUGxhbmV0XCI+XG4gICAgICAgICAgPFNlbGVjdElucHV0IHYtbW9kZWw9XCJwbGFuZXRcIiA6b3B0aW9ucz1cInBsYW5ldHNcIiAvPlxuICAgICAgICA8L0FjdGl2ZT5cbiAgICAgICAgPEFjdGl2ZSBsYWJlbD1cIkJ1aWxkaW5nIGFnZVwiIHRvb2x0aXA9XCJUaGUgbWluaW11bSBidWlsZGluZyBhZ2UgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGxpc3QuXCI+XG4gICAgICAgICAgPE51bWJlcklucHV0IHYtbW9kZWw9XCJidWlsZGluZ0FnZVwiIC8+XG4gICAgICAgIDwvQWN0aXZlPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDxDb21tYW5kcz5cbiAgICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJvblNhdmVDbGlja1wiPlNBVkU8L1BydW5CdXR0b24+XG4gICAgICAgIDxQcnVuQnV0dG9uIHYtaWY9XCJvbkRlbGV0ZVwiIGRhbmdlciBAY2xpY2s9XCJvbkRlbGV0ZUNsaWNrXCI+REVMRVRFPC9QcnVuQnV0dG9uPlxuICAgICAgPC9Db21tYW5kcz5cbiAgICA8L2Zvcm0+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX3dpdGhDdHgiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX2NyZWF0ZVZOb2RlIiwiQWN0aXZlIiwiX3VucmVmIiwiX2lzUmVmIiwiRGF0ZUlucHV0IiwiTnVtYmVySW5wdXQiLCJUZXh0SW5wdXQiLCJQcnVuQnV0dG9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLFVBQUEsT0FBQTtBQUVBLFVBQUEsUUFBQSxDQUFBLFFBQUEsWUFBQSxRQUFBO0FBQ0EsVUFBQSxPQUFBLElBQUEsUUFBQSxLQUFBLElBQUE7QUFFQSxVQUFBLE9BQUEsSUFBQSxRQUFBLEtBQUEsSUFBQTtBQUNBLFVBQUEsVUFBQSxJQUFBLG1CQUFBLFFBQUEsS0FBQSxPQUFBLENBQUE7QUFDQSxVQUFBLFlBQUEsSUFBQSxRQUFBLEtBQUEsU0FBQTtBQUNBLFVBQUEsT0FBQSxJQUFBLFFBQUEsS0FBQSxJQUFBO0FBQ0EsVUFBQSxjQUFBLElBQUEsUUFBQSxLQUFBLFdBQUE7QUFFQSxhQUFBLG1CQUFBLE1BQUE7QUFDRSxVQUFBLFNBQUEsUUFBQTtBQUNFLGVBQUE7QUFBQSxNQUFPO0FBRVQsWUFBQSxZQUFBLElBQUEsS0FBQSxJQUFBO0FBQ0EsWUFBQSxPQUFBLFVBQUEsWUFBQTtBQUVBLFlBQUEsUUFBQSxPQUFBLFVBQUEsU0FBQSxJQUFBLENBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUNBLFlBQUEsTUFBQSxPQUFBLFVBQUEsUUFBQSxDQUFBLEVB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
