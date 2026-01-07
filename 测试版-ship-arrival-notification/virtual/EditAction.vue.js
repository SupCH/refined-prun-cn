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
  __name: 'EditAction',
  props: {
    add: { type: Boolean },
    action: {},
    onSave: { type: Function },
    pkg: {},
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const name = ref(__props.action.name || '');
    const nameError = ref(false);
    const typeOptions = act.getActionTypes();
    const type = ref(__props.action.type);
    const editFormComponent = computed(() => act.getActionInfo(type.value)?.editComponent);
    const editForm = useTemplateRef('editForm');
    function onSaveClick() {
      let isValid = editForm.value.validate();
      nameError.value = name.value.length === 0;
      isValid &&= !nameError.value;
      if (!isValid) {
        return;
      }
      for (const key of Object.keys(__props.action)) {
        delete __props.action[key];
      }
      editForm.value.save();
      __props.action.name = name.value;
      __props.action.type = type.value;
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
                  toDisplayString(
                    _ctx.add ? unref(t)('act.addAction') : unref(t)('act.editAction'),
                  ),
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
                      action: _ctx.action,
                      pkg: _ctx.pkg,
                    },
                    null,
                    8,
                    ['action', 'pkg'],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdEFjdGlvbi52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQUNUL0VkaXRBY3Rpb24udnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IFNlY3Rpb25IZWFkZXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL1NlY3Rpb25IZWFkZXIudnVlJztcbmltcG9ydCBBY3RpdmUgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0FjdGl2ZS52dWUnO1xuaW1wb3J0IFRleHRJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvVGV4dElucHV0LnZ1ZSc7XG5pbXBvcnQgQ29tbWFuZHMgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0NvbW1hbmRzLnZ1ZSc7XG5pbXBvcnQgU2VsZWN0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1NlbGVjdElucHV0LnZ1ZSc7XG5pbXBvcnQgeyBhY3QgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0LXJlZ2lzdHJ5JztcblxuaW1wb3J0IHsgdCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvaTE4bic7XG5cbmNvbnN0IHsgYWRkLCBhY3Rpb24sIG9uU2F2ZSwgcGtnIH0gPSBkZWZpbmVQcm9wczx7XG4gIGFkZD86IGJvb2xlYW47XG4gIGFjdGlvbjogVXNlckRhdGEuQWN0aW9uRGF0YTtcbiAgb25TYXZlPzogKCkgPT4gdm9pZDtcbiAgcGtnOiBVc2VyRGF0YS5BY3Rpb25QYWNrYWdlRGF0YTtcbn0+KCk7XG5cbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0czx7IChlOiAnY2xvc2UnKTogdm9pZCB9PigpO1xuXG5jb25zdCBuYW1lID0gcmVmKGFjdGlvbi5uYW1lIHx8ICcnKTtcbmNvbnN0IG5hbWVFcnJvciA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IHR5cGVPcHRpb25zID0gYWN0LmdldEFjdGlvblR5cGVzKCk7XG5jb25zdCB0eXBlID0gcmVmKGFjdGlvbi50eXBlKTtcblxuY29uc3QgZWRpdEZvcm1Db21wb25lbnQgPSBjb21wdXRlZCgoKSA9PiBhY3QuZ2V0QWN0aW9uSW5mbyh0eXBlLnZhbHVlKT8uZWRpdENvbXBvbmVudCk7XG5jb25zdCBlZGl0Rm9ybSA9IHVzZVRlbXBsYXRlUmVmKCdlZGl0Rm9ybScpO1xuXG5mdW5jdGlvbiBvblNhdmVDbGljaygpIHtcbiAgbGV0IGlzVmFsaWQgPSBlZGl0Rm9ybS52YWx1ZS52YWxpZGF0ZSgpO1xuICBuYW1lRXJyb3IudmFsdWUgPSBuYW1lLnZhbHVlLmxlbmd0aCA9PT0gMDtcbiAgaXNWYWxpZCAmJj0gIW5hbWVFcnJvci52YWx1ZTtcbiAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGFjdGlvbikpIHtcbiAgICBkZWxldGUgYWN0aW9uW2tleV07XG4gIH1cbiAgZWRpdEZvcm0udmFsdWUuc2F2ZSgpO1xuICBhY3Rpb24ubmFtZSA9IG5hbWUudmFsdWU7XG4gIGFjdGlvbi50eXBlID0gdHlwZS52YWx1ZTtcbiAgb25TYXZlPy4oKTtcbiAgZW1pdCgnY2xvc2UnKTtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiQy5EcmFmdENvbmRpdGlvbkVkaXRvci5mb3JtXCI+XG4gICAgPFNlY3Rpb25IZWFkZXI+e3sgYWRkID8gdCgnYWN0LmFkZEFjdGlvbicpIDogdCgnYWN0LmVkaXRBY3Rpb24nKSB9fTwvU2VjdGlvbkhlYWRlcj5cbiAgICA8Zm9ybT5cbiAgICAgIDxBY3RpdmUgOmxhYmVsPVwidCgnYWN0LnR5cGVMYWJlbCcpXCI+XG4gICAgICAgIDxTZWxlY3RJbnB1dCB2LW1vZGVsPVwidHlwZVwiIDpvcHRpb25zPVwidHlwZU9wdGlvbnNcIiAvPlxuICAgICAgPC9BY3RpdmU+XG4gICAgICA8QWN0aXZlIDpsYWJlbD1cInQoJ2FjdC5uYW1lJylcIiA6ZXJyb3I9XCJuYW1lRXJyb3JcIj5cbiAgICAgICAgPFRleHRJbnB1dCB2LW1vZGVsPVwibmFtZVwiIC8+XG4gICAgICA8L0FjdGl2ZT5cbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgOmlzPVwiZWRpdEZvcm1Db21wb25lbnRcIlxuICAgICAgICB2LWlmPVwiZWRpdEZvcm1Db21wb25lbnRcIlxuICAgICAgICByZWY9XCJlZGl0Rm9ybVwiXG4gICAgICAgIDphY3Rpb249XCJhY3Rpb25cIlxuICAgICAgICA6cGtnPVwicGtnXCIgLz5cbiAgICAgIDxDb21tYW5kcz5cbiAgICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJvblNhdmVDbGlja1wiPnt7XG4gICAgICAgICAgYWRkID8gdCgnYWN0LmFkZCcpLnRvVXBwZXJDYXNlKCkgOiB0KCdhY3Quc2F2ZScpLnRvVXBwZXJDYXNlKClcbiAgICAgICAgfX08L1BydW5CdXR0b24+XG4gICAgICA8L0NvbW1hbmRzPlxuICAgIDwvZm9ybT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIkMiLCJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX3VucmVmIiwiX2NyZWF0ZVZOb2RlIiwiQWN0aXZlIiwiX2lzUmVmIiwiVGV4dElucHV0IiwiYWN0aW9uIiwicGtnIiwiUHJ1bkJ1dHRvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxVQUFBLE9BQUE7QUFFQSxVQUFBLE9BQUEsSUFBQSxRQUFBLE9BQUEsUUFBQSxFQUFBO0FBQ0EsVUFBQSxZQUFBLElBQUEsS0FBQTtBQUVBLFVBQUEsY0FBQSxJQUFBLGVBQUE7QUFDQSxVQUFBLE9BQUEsSUFBQSxRQUFBLE9BQUEsSUFBQTtBQUVBLFVBQUEsb0JBQUEsU0FBQSxNQUFBLElB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
