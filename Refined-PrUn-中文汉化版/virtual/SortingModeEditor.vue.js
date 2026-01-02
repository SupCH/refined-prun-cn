import { C } from './prun-css.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import _sfc_main$5 from './Commands.vue.js';
import _sfc_main$4 from './PrunButton.vue.js';
import _sfc_main$3 from './RadioItem.vue.js';
import { storagesStore } from './storage.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  createBlock,
  createCommentVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { ref, isRef, unref } from './reactivity.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SortingModeEditor',
  props: {
    onSave: { type: Function },
    sorting: {},
    storeId: {},
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const storage = computed(() => storagesStore.getById(__props.storeId));
    const label = ref(__props.sorting?.label ?? '');
    const categories = ref(
      __props.sorting?.categories.map(x => ({
        name: x.name,
        materials: x.materials.join(', '),
      })) ?? [createCategory()],
    );
    const burn = ref(__props.sorting?.burn ?? false);
    const zero = ref(__props.sorting?.zero ?? false);
    const canRemoveCategory = computed(() => categories.value.length > 1);
    function addCategory() {
      categories.value.push(createCategory());
    }
    function removeCategory() {
      if (canRemoveCategory.value) {
        categories.value.pop();
      }
    }
    function createCategory() {
      return { name: '', materials: '' };
    }
    const emit = __emit;
    function onSaveClick() {
      if (!label.value) {
        return;
      }
      __props.onSave({
        label: label.value,
        categories: categories.value.map(x => ({
          name: x.name,
          materials: x.materials.replaceAll(' ', '').split(','),
        })),
        burn: burn.value,
        zero: zero.value,
      });
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
                ...(_cache[5] || (_cache[5] = [createTextVNode('Sorting Mode', -1)])),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                {
                  label: 'Label',
                  tooltip: 'The label showing at the top of the inventory (ABC, CAT, etc.).',
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        modelValue: unref(label),
                        'onUpdate:modelValue':
                          _cache[0] ||
                          (_cache[0] = $event => (isRef(label) ? (label.value = $event) : null)),
                        style: { width: '80%' },
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
                {
                  label: 'Category 1 Name',
                  tooltip: 'The name of the first category for materials.',
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        modelValue: unref(categories)[0].name,
                        'onUpdate:modelValue':
                          _cache[1] || (_cache[1] = $event => (unref(categories)[0].name = $event)),
                        style: { width: '80%' },
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
                {
                  label: 'Category 1 MATs',
                  tooltip:
                    'A list of materials in the first category. Separate tickers by a comma. (RAT, DW, etc.).',
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        modelValue: unref(categories)[0].materials,
                        'onUpdate:modelValue':
                          _cache[2] ||
                          (_cache[2] = $event => (unref(categories)[0].materials = $event)),
                        style: { width: '80%' },
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(unref(categories).slice(1), (category, i) => {
                  return (
                    openBlock(),
                    createElementBlock(
                      Fragment,
                      {
                        key: unref(objectId)(category),
                      },
                      [
                        createVNode(
                          _sfc_main$2,
                          {
                            label: `Category ${i + 2} Name`,
                          },
                          {
                            default: withCtx(() => [
                              createVNode(
                                _sfc_main$1,
                                {
                                  modelValue: category.name,
                                  'onUpdate:modelValue': $event => (category.name = $event),
                                  style: { width: '80%' },
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
                            label: `Category ${i + 2} MATs`,
                          },
                          {
                            default: withCtx(() => [
                              createVNode(
                                _sfc_main$1,
                                {
                                  modelValue: category.materials,
                                  'onUpdate:modelValue': $event => (category.materials = $event),
                                  style: { width: '80%' },
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
              unref(storage)?.type === 'STORE'
                ? (openBlock(),
                  createBlock(
                    _sfc_main$2,
                    {
                      key: 0,
                      label: 'Burn Sorting',
                      tooltip:
                        'Add burn sorting as a secondary sorting method. Burn categories will show under the categories defined above.',
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _sfc_main$3,
                          {
                            modelValue: unref(burn),
                            'onUpdate:modelValue':
                              _cache[3] ||
                              (_cache[3] = $event => (isRef(burn) ? (burn.value = $event) : null)),
                          },
                          {
                            default: withCtx(() => [
                              ...(_cache[6] || (_cache[6] = [createTextVNode('add burn', -1)])),
                            ]),
                            _: 1,
                          },
                          8,
                          ['modelValue'],
                        ),
                      ]),
                      _: 1,
                    },
                  ))
                : createCommentVNode('', true),
              createVNode(
                _sfc_main$2,
                {
                  label: 'Show Zeros',
                  tooltip: 'Show item icons that have zero quantity.',
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$3,
                      {
                        modelValue: unref(zero),
                        'onUpdate:modelValue':
                          _cache[4] ||
                          (_cache[4] = $event => (isRef(zero) ? (zero.value = $event) : null)),
                      },
                      {
                        default: withCtx(() => [
                          ...(_cache[7] || (_cache[7] = [createTextVNode('show zero', -1)])),
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
              createVNode(_sfc_main$5, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      primary: '',
                      onClick: addCategory,
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[8] || (_cache[8] = [createTextVNode('ADD CATEGORY', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                  createVNode(
                    _sfc_main$4,
                    {
                      primary: unref(canRemoveCategory),
                      disabled: !unref(canRemoveCategory),
                      onClick: removeCategory,
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[9] || (_cache[9] = [createTextVNode(' REMOVE CATEGORY ', -1)])),
                      ]),
                      _: 1,
                    },
                    8,
                    ['primary', 'disabled'],
                  ),
                  createVNode(
                    _sfc_main$4,
                    {
                      primary: '',
                      onClick: onSaveClick,
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[10] || (_cache[10] = [createTextVNode('SAVE', -1)])),
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
