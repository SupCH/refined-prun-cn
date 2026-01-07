import { C } from './prun-css.js';
import _sfc_main$3 from './PrunButton.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$1 from './Active.vue.js';
import _sfc_main$2 from './TextInput.vue.js';
import _sfc_main$4 from './Commands.vue.js';
import SelectInput from './SelectInput.vue.js';
import { act } from './act-registry.js';
import { t } from './index5.js';
import {
  defineComponent,
  computed,
  useTemplateRef,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  createBlock,
  createCommentVNode,
  resolveDynamicComponent,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'EditMaterialGroup',
  props: {
    add: { type: Boolean },
    group: {},
    onSave: { type: Function },
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const name = ref(__props.group.name || '');
    const nameError = ref(false);
    const typeOptions = act.getMaterialGroupTypes();
    const type = ref(__props.group.type);
    const editFormComponent = computed(() => act.getMaterialGroupInfo(type.value)?.editComponent);
    const editForm = useTemplateRef('editForm');
    function onSaveClick() {
      let isValid = editForm.value.validate();
      nameError.value = name.value.length === 0;
      isValid &&= !nameError.value;
      if (!isValid) {
        return;
      }
      for (const key of Object.keys(__props.group)) {
        delete __props.group[key];
      }
      editForm.value.save();
      __props.group.name = name.value;
      __props.group.type = type.value;
      __props.onSave?.();
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
                createTextVNode(
                  toDisplayString(_ctx.add ? unref(t)('act.add') : unref(t)('act.edit')) +
                    ' ' +
                    toDisplayString(unref(t)('act.materialGroup')),
                  1,
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$1,
                {
                  label: unref(t)('act.typeLabel'),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      SelectInput,
                      {
                        modelValue: unref(type),
                        'onUpdate:modelValue':
                          _cache[0] ||
                          (_cache[0] = $event => (isRef(type) ? (type.value = $event) : null)),
                        options: unref(typeOptions),
                      },
                      null,
                      8,
                      ['modelValue', 'options'],
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['label'],
              ),
              createVNode(
                _sfc_main$1,
                {
                  label: unref(t)('act.name'),
                  error: unref(nameError),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$2,
                      {
                        modelValue: unref(name),
                        'onUpdate:modelValue':
                          _cache[1] ||
                          (_cache[1] = $event => (isRef(name) ? (name.value = $event) : null)),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['label', 'error'],
              ),
              unref(editFormComponent)
                ? (openBlock(),
                  createBlock(
                    resolveDynamicComponent(unref(editFormComponent)),
                    {
                      key: 0,
                      ref_key: 'editForm',
                      ref: editForm,
                      group: _ctx.group,
                    },
                    null,
                    8,
                    ['group'],
                  ))
                : createCommentVNode('', true),
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$3,
                    {
                      primary: '',
                      onClick: onSaveClick,
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(
                            _ctx.add
                              ? unref(t)('act.add').toUpperCase()
                              : unref(t)('act.save').toUpperCase(),
                          ),
                          1,
                        ),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdE1hdGVyaWFsR3JvdXAudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9FZGl0TWF0ZXJpYWxHcm91cC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgU2VjdGlvbkhlYWRlciBmcm9tICdAc3JjL2NvbXBvbmVudHMvU2VjdGlvbkhlYWRlci52dWUnO1xuaW1wb3J0IEFjdGl2ZSBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQWN0aXZlLnZ1ZSc7XG5pbXBvcnQgVGV4dElucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9UZXh0SW5wdXQudnVlJztcbmltcG9ydCBDb21tYW5kcyBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQ29tbWFuZHMudnVlJztcbmltcG9ydCBTZWxlY3RJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvU2VsZWN0SW5wdXQudnVlJztcbmltcG9ydCB7IGFjdCB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9hY3QtcmVnaXN0cnknO1xuaW1wb3J0IHsgdCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvaTE4bic7XG5cbmNvbnN0IHsgYWRkLCBncm91cCwgb25TYXZlIH0gPSBkZWZpbmVQcm9wczx7XG4gIGFkZD86IGJvb2xlYW47XG4gIGdyb3VwOiBVc2VyRGF0YS5NYXRlcmlhbEdyb3VwRGF0YTtcbiAgb25TYXZlPzogKCkgPT4gdm9pZDtcbn0+KCk7XG5cbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0czx7IChlOiAnY2xvc2UnKTogdm9pZCB9PigpO1xuXG5jb25zdCBuYW1lID0gcmVmKGdyb3VwLm5hbWUgfHwgJycpO1xuY29uc3QgbmFtZUVycm9yID0gcmVmKGZhbHNlKTtcblxuY29uc3QgdHlwZU9wdGlvbnMgPSBhY3QuZ2V0TWF0ZXJpYWxHcm91cFR5cGVzKCk7XG5jb25zdCB0eXBlID0gcmVmKGdyb3VwLnR5cGUpO1xuXG5jb25zdCBlZGl0Rm9ybUNvbXBvbmVudCA9IGNvbXB1dGVkKCgpID0+IGFjdC5nZXRNYXRlcmlhbEdyb3VwSW5mbyh0eXBlLnZhbHVlKT8uZWRpdENvbXBvbmVudCk7XG5jb25zdCBlZGl0Rm9ybSA9IHVzZVRlbXBsYXRlUmVmKCdlZGl0Rm9ybScpO1xuXG5mdW5jdGlvbiBvblNhdmVDbGljaygpIHtcbiAgbGV0IGlzVmFsaWQgPSBlZGl0Rm9ybS52YWx1ZS52YWxpZGF0ZSgpO1xuICBuYW1lRXJyb3IudmFsdWUgPSBuYW1lLnZhbHVlLmxlbmd0aCA9PT0gMDtcbiAgaXNWYWxpZCAmJj0gIW5hbWVFcnJvci52YWx1ZTtcbiAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGdyb3VwKSkge1xuICAgIGRlbGV0ZSBncm91cFtrZXldO1xuICB9XG4gIGVkaXRGb3JtLnZhbHVlLnNhdmUoKTtcbiAgZ3JvdXAubmFtZSA9IG5hbWUudmFsdWU7XG4gIGdyb3VwLnR5cGUgPSB0eXBlLnZhbHVlO1xuICBvblNhdmU/LigpO1xuICBlbWl0KCdjbG9zZScpO1xufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJDLkRyYWZ0Q29uZGl0aW9uRWRpdG9yLmZvcm1cIj5cbiAgICA8U2VjdGlvbkhlYWRlclxuICAgICAgPnt7IGFkZCA/IHQoJ2FjdC5hZGQnKSA6IHQoJ2FjdC5lZGl0JykgfX0ge3sgdCgnYWN0Lm1hdGVyaWFsR3JvdXAnKSB9fTwvU2VjdGlvbkhlYWRlclxuICAgID5cbiAgICA8Zm9ybT5cbiAgICAgIDxBY3RpdmUgOmxhYmVsPVwidCgnYWN0LnR5cGVMYWJlbCcpXCI+XG4gICAgICAgIDxTZWxlY3RJbnB1dCB2LW1vZGVsPVwidHlwZVwiIDpvcHRpb25zPVwidHlwZU9wdGlvbnNcIiAvPlxuICAgICAgPC9BY3RpdmU+XG4gICAgICA8QWN0aXZlIDpsYWJlbD1cInQoJ2FjdC5uYW1lJylcIiA6ZXJyb3I9XCJuYW1lRXJyb3JcIj5cbiAgICAgICAgPFRleHRJbnB1dCB2LW1vZGVsPVwibmFtZVwiIC8+XG4gICAgICA8L0FjdGl2ZT5cbiAgICAgIDxDb21wb25lbnQgOmlzPVwiZWRpdEZvcm1Db21wb25lbnRcIiB2LWlmPVwiZWRpdEZvcm1Db21wb25lbnRcIiByZWY9XCJlZGl0Rm9ybVwiIDpncm91cD1cImdyb3VwXCIgLz5cbiAgICAgIDxDb21tYW5kcz5cbiAgICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJvblNhdmVDbGlja1wiPnt7XG4gICAgICAgICAgYWRkID8gdCgnYWN0LmFkZCcpLnRvVXBwZXJDYXNlKCkgOiB0KCdhY3Quc2F2ZScpLnRvVXBwZXJDYXNlKClcbiAgICAgICAgfX08L1BydW5CdXR0b24+XG4gICAgICA8L0NvbW1hbmRzPlxuICAgIDwvZm9ybT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIkMiLCJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX3VucmVmIiwiX2NyZWF0ZVZOb2RlIiwiQWN0aXZlIiwiX2lzUmVmIiwiVGV4dElucHV0IiwiZ3JvdXAiLCJQcnVuQnV0dG9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsVUFBQSxPQUFBO0FBRUEsVUFBQSxPQUFBLElBQUEsUUFBQSxNQUFBLFFBQUEsRUFBQTtBQUNBLFVBQUEsWUFBQSxJQUFBLEtBQUE7QUFFQSxVQUFBLGNBQUEsSUFBQSxzQkFBQTtBQUNBLFVBQUEsT0FBQSxJQUFBLFFBQUEsTUFBQSxJQUFBO0FBRUEsVUFBQSxvQkFBQSxTQUFBLE1BQUEsSUFBQSxxQkFBQSxLQUFBLEtBQUEsR0FBQSxhQUFBO0FBQ0EsVUFBQSxXQUFBLGVBQUEsVUFB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
