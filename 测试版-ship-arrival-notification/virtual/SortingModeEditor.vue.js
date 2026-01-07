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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ydGluZ01vZGVFZGl0b3IudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL1NPUlQvU29ydGluZ01vZGVFZGl0b3IudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgU2VjdGlvbkhlYWRlciBmcm9tICdAc3JjL2NvbXBvbmVudHMvU2VjdGlvbkhlYWRlci52dWUnO1xuaW1wb3J0IEFjdGl2ZSBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQWN0aXZlLnZ1ZSc7XG5pbXBvcnQgVGV4dElucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9UZXh0SW5wdXQudnVlJztcbmltcG9ydCBDb21tYW5kcyBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQ29tbWFuZHMudnVlJztcbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgUmFkaW9JdGVtIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9SYWRpb0l0ZW0udnVlJztcbmltcG9ydCB7IHN0b3JhZ2VzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc3RvcmFnZSc7XG5pbXBvcnQgeyBvYmplY3RJZCB9IGZyb20gJ0BzcmMvdXRpbHMvb2JqZWN0LWlkJztcblxuY29uc3QgeyBvblNhdmUsIHNvcnRpbmcsIHN0b3JlSWQgfSA9IGRlZmluZVByb3BzPHtcbiAgb25TYXZlOiAoc29ydGluZzogVXNlckRhdGEuU29ydGluZ01vZGUpID0+IHZvaWQ7XG4gIHNvcnRpbmc/OiBVc2VyRGF0YS5Tb3J0aW5nTW9kZTtcbiAgc3RvcmVJZDogc3RyaW5nO1xufT4oKTtcblxuY29uc3Qgc3RvcmFnZSA9IGNvbXB1dGVkKCgpID0+IHN0b3JhZ2VzU3RvcmUuZ2V0QnlJZChzdG9yZUlkKSk7XG5cbmNvbnN0IGxhYmVsID0gcmVmKHNvcnRpbmc/LmxhYmVsID8/ICcnKTtcbmNvbnN0IGNhdGVnb3JpZXMgPSByZWYoXG4gIHNvcnRpbmc/LmNhdGVnb3JpZXMubWFwKHggPT4gKHsgbmFtZTogeC5uYW1lLCBtYXRlcmlhbHM6IHgubWF0ZXJpYWxzLmpvaW4oJywgJykgfSkpID8/IFtcbiAgICBjcmVhdGVDYXRlZ29yeSgpLFxuICBdLFxuKTtcbmNvbnN0IGJ1cm4gPSByZWYoc29ydGluZz8uYnVybiA/PyBmYWxzZSk7XG5jb25zdCB6ZXJvID0gcmVmKHNvcnRpbmc/Lnplcm8gPz8gZmFsc2UpO1xuXG5jb25zdCBjYW5SZW1vdmVDYXRlZ29yeSA9IGNvbXB1dGVkKCgpID0+IGNhdGVnb3JpZXMudmFsdWUubGVuZ3RoID4gMSk7XG5cbmZ1bmN0aW9uIGFkZENhdGVnb3J5KCkge1xuICBjYXRlZ29yaWVzLnZhbHVlLnB1c2goY3JlYXRlQ2F0ZWdvcnkoKSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNhdGVnb3J5KCkge1xuICBpZiAoY2FuUmVtb3ZlQ2F0ZWdvcnkudmFsdWUpIHtcbiAgICBjYXRlZ29yaWVzLnZhbHVlLnBvcCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhdGVnb3J5KCkge1xuICByZXR1cm4geyBuYW1lOiAnJywgbWF0ZXJpYWxzOiAnJyB9O1xufVxuXG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHM8eyAoZTogJ2Nsb3NlJyk6IHZvaWQgfT4oKTtcblxuZnVuY3Rpb24gb25TYXZlQ2xpY2soKSB7XG4gIGlmICghbGFiZWwudmFsdWUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgb25TYXZlKHtcbiAgICBsYWJlbDogbGFiZWwudmFsdWUsXG4gICAgY2F0ZWdvcmllczogY2F0ZWdvcmllcy52YWx1ZS5tYXAoeCA9PiAoe1xuICAgICAgbmFtZTogeC5uYW1lLFxuICAgICAgbWF0ZXJpYWxzOiB4Lm1hdGVyaWFscy5yZXBsYWNlQWxsKCcgJywgJycpLnNwbGl0KCcsJyksXG4gICAgfSkpLFxuICAgIGJ1cm46IGJ1cm4udmFsdWUsXG4gICAgemVybzogemVyby52YWx1ZSxcbiAgfSk7XG4gIGVtaXQoJ2Nsb3NlJyk7XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IDpjbGFzcz1cIkMuRHJhZnRDb25kaXRpb25FZGl0b3IuZm9ybVwiPlxuICAgIDxTZWN0aW9uSGVhZGVyPlNvcnRpbmcgTW9kZTwvU2VjdGlvbkhlYWRlcj5cbiAgICA8Zm9ybT5cbiAgICAgIDxBY3RpdmVcbiAgICAgICAgbGFiZWw9XCJMYWJlbFwiXG4gICAgICAgIHRvb2x0aXA9XCJUaGUgbGFiZWwgc2hvd2luZyBhdCB0aGUgdG9wIG9mIHRoZSBpbnZlbnRvcnkgKEFCQywgQ0FULCBldGMuKS5cIj5cbiAgICAgICAgPFRleHRJbnB1dCB2LW1vZGVsPVwibGFiZWxcIiBzdHlsZT1cIndpZHRoOiA4MCVcIiAvPlxuICAgICAgPC9BY3RpdmU+XG4gICAgICA8QWN0aXZlIGxhYmVsPVwiQ2F0ZWdvcnkgMSBOYW1lXCIgdG9vbHRpcD1cIlRoZSBuYW1lIG9mIHRoZSBmaXJzdCBjYXRlZ29yeSBmb3IgbWF0ZXJpYWxzLlwiPlxuICAgICAgICA8VGV4dElucHV0IHYtbW9kZWw9XCJjYXRlZ29yaWVzWzBdLm5hbWVcIiBzdHlsZT1cIndpZHRoOiA4MCVcIiAvPlxuICAgICAgPC9BY3RpdmU+XG4gICAgICA8QWN0aXZlXG4gICAgICAgIGxhYmVsPVwiQ2F0ZWdvcnkgMSBNQVRzXCJcbiAgICAgICAgdG9vbHRpcD1cIkEgbGlzdCBvZiBtYXRlcmlhbHMgaW4gdGhlIGZpcnN0IGNhdGVnb3J5LiBTZXBhcmF0ZSB0aWNrZXJzIGJ5IGEgY29tbWEuIChSQVQsIERXLCBldGMuKS5cIj5cbiAgICAgICAgPFRleHRJbnB1dCB2LW1vZGVsPVwiY2F0ZWdvcmllc1swXS5tYXRlcmlhbHNcIiBzdHlsZT1cIndpZHRoOiA4MCVcIiAvPlxuICAgICAgPC9BY3RpdmU+XG4gICAgICA8dGVtcGxhdGUgdi1mb3I9XCIoY2F0ZWdvcnksIGkpIGluIGNhdGVnb3JpZXMuc2xpY2UoMSlcIiA6a2V5PVwib2JqZWN0SWQoY2F0ZWdvcnkpXCI+XG4gICAgICAgIDxBY3RpdmUgOmxhYmVsPVwiYENhdGVnb3J5ICR7aSArIDJ9IE5hbWVgXCI+XG4gICAgICAgICAgPFRleHRJbnB1dCB2LW1vZGVsPVwiY2F0ZWdvcnkubmFtZVwiIHN0eWxlPVwid2lkdGg6IDgwJVwiIC8+XG4gICAgICAgIDwvQWN0aXZlPlxuICAgICAgICA8QWN0aXZlIDpsYWJlbD1cImBDYXRlZ29yeSAke2kgKyAyfSBNQVRzYFwiPlxuICAgICAgICAgIDxUZXh0SW5wdXQgdi1tb2RlbD1cImNhdGVnb3J5Lm1hdGVyaWFsc1wiIHN0eWxlPVwid2lkdGg6IDgwJVwiIC8+XG4gICAgICAgIDwvQWN0aXZlPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDxBY3RpdmVcbiAgICAgICAgdi1pZj1cInN0b3JhZ2U/LnR5cGUgPT09ICdTVE9SRSdcIlxuICAgICAgICBsYWJlbD1cIkJ1cm4gU29ydGluZ1wiXG4gICAgICAgIHRvb2x0aXA9XCJBZGQgYnVybiBzb3J0aW5nIGFzIGEgc2Vjb25kYXJ5IHNvcnRpbmcgbWV0aG9kLiBCdXJuIGNhdGVnb3JpZXMgd2lsbCBzaG93IHVuZGVyIHRoZSBjYXRlZ29yaWVzIGRlZmluZWQgYWJvdmUuXCI+XG4gICAgICAgIDxSYWRpb0l0ZW0gdi1tb2RlbD1cImJ1cm5cIj5hZGQgYnVybjwvUmFkaW9JdGVtPlxuICAgICAgPC9BY3RpdmU+XG4gICAgICA8QWN0aXZlIGxhYmVsPVwiU2hvdyBaZXJvc1wiIHRvb2x0aXA9XCJTaG93IGl0ZW0gaWNvbnMgdGhhdCBoYXZlIHplcm8gcXVhbnRpdHkuXCI+XG4gICAgICAgIDxSYWRpb0l0ZW0gdi1tb2RlbD1cInplcm9cIj5zaG93IHplcm88L1JhZGlvSXRlbT5cbiAgICAgIDwvQWN0aXZlPlxuICAgICAgPENvbW1hbmRzPlxuICAgICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cImFkZENhdGVnb3J5XCI+QUREIENBVEVHT1JZPC9QcnVuQnV0dG9uPlxuICAgICAgICA8UHJ1bkJ1dHRvblxuICAgICAgICAgIDpwcmltYXJ5PVwiY2FuUmVtb3ZlQ2F0ZWdvcnlcIlxuICAgICAgICAgIDpkaXNhYmxlZD1cIiFjYW5SZW1vdmVDYXRlZ29yeVwiXG4gICAgICAgICAgQGNsaWNrPVwicmVtb3ZlQ2F0ZWdvcnlcIj5cbiAgICAgICAgICBSRU1PVkUgQ0FURUdPUllcbiAgICAgICAgPC9QcnVuQnV0dG9uPlxuICAgICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cIm9uU2F2ZUNsaWNrXCI+U0FWRTwvUHJ1bkJ1dHRvbj5cbiAgICAgIDwvQ29tbWFuZHM+XG4gICAgPC9mb3JtPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiQyIsIl93aXRoQ3R4IiwiX2NyZWF0ZVRleHRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIkFjdGl2ZSIsIlRleHRJbnB1dCIsIl91bnJlZiIsIl9pc1JlZiIsIlJhZGlvSXRlbSIsIlBydW5CdXR0b24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxVQUFBLFVBQUEsU0FBQSxNQUFBLGNBQUEsUUFBQSxRQUFBLE9BQUEsQ0FBQTtBQUVBLFVBQUEsUUFBQSxJQUFBLFFBQUEsU0FBQSxTQUFBLEVBQUE7QUFDQSxVQUFBLGFBQUE7QUFBQSxNQUFtQixRQUFBLFNBQUEsV0FBQSxJQUFBLENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLFdBQUEsRUFBQSxVQUFBLEtBQUEsSUFBQSxFQUFBLEVBQUEsS0FBQTtBQUFBLFFBQ3NFLGVBQUE7QUFBQSxNQUN0RTtBQUFBLElBQ2pCO0FBRUYsVUFBQSxPQUFBLElBQUEsUUFBQSxTQUFBLFFBQUEsS0FBQTtBQUNBLFVBQUEsT0FBQSxJQUFBLFFBQUEsU0FBQSxRQUFBLEtBQUE7QUFFQSxVQUFBLG9CQUFBLFNBQUEsTUFBQSxXQUFBLE1BQUEsU0FBQSxDQUFBO0FBRUEsYUFBQSxjQUFB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
