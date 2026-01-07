import { C } from './prun-css.js';
import _sfc_main$3 from './PrunButton.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import _sfc_main$4 from './Commands.vue.js';
import { isValidPackageName } from './utils8.js';
import { t } from './index5.js';
import {
  defineComponent,
  watch,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CreateActionPackage',
  props: {
    onCreate: { type: Function },
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const name = ref('');
    const nameError = ref(false);
    watch(name, () => (nameError.value = !isValidPackageName(name.value)));
    function onCreateClick() {
      if (name.value.length === 0 || !isValidPackageName(name.value)) {
        nameError.value = true;
        return;
      }
      __props.onCreate(name.value);
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
                createTextVNode(toDisplayString(unref(t)('act.createPackage')), 1),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                {
                  label: unref(t)('act.name'),
                  error: unref(nameError),
                },
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
                8,
                ['label', 'error'],
              ),
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$3,
                    {
                      primary: '',
                      onClick: onCreateClick,
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)('act.add').toUpperCase()), 1),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlQWN0aW9uUGFja2FnZS52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQUNUL0NyZWF0ZUFjdGlvblBhY2thZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IFNlY3Rpb25IZWFkZXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL1NlY3Rpb25IZWFkZXIudnVlJztcbmltcG9ydCBBY3RpdmUgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0FjdGl2ZS52dWUnO1xuaW1wb3J0IFRleHRJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvVGV4dElucHV0LnZ1ZSc7XG5pbXBvcnQgQ29tbWFuZHMgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0NvbW1hbmRzLnZ1ZSc7XG5pbXBvcnQgeyBpc1ZhbGlkUGFja2FnZU5hbWUgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvdXRpbHMnO1xuXG5pbXBvcnQgeyB0IH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9pMThuJztcblxuY29uc3QgeyBvbkNyZWF0ZSB9ID0gZGVmaW5lUHJvcHM8eyBvbkNyZWF0ZTogKG5hbWU6IHN0cmluZykgPT4gdm9pZCB9PigpO1xuXG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHM8eyAoZTogJ2Nsb3NlJyk6IHZvaWQgfT4oKTtcblxuY29uc3QgbmFtZSA9IHJlZignJyk7XG5jb25zdCBuYW1lRXJyb3IgPSByZWYoZmFsc2UpO1xud2F0Y2gobmFtZSwgKCkgPT4gKG5hbWVFcnJvci52YWx1ZSA9ICFpc1ZhbGlkUGFja2FnZU5hbWUobmFtZS52YWx1ZSkpKTtcblxuZnVuY3Rpb24gb25DcmVhdGVDbGljaygpIHtcbiAgaWYgKG5hbWUudmFsdWUubGVuZ3RoID09PSAwIHx8ICFpc1ZhbGlkUGFja2FnZU5hbWUobmFtZS52YWx1ZSkpIHtcbiAgICBuYW1lRXJyb3IudmFsdWUgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuICBvbkNyZWF0ZShuYW1lLnZhbHVlKTtcbiAgZW1pdCgnY2xvc2UnKTtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiQy5EcmFmdENvbmRpdGlvbkVkaXRvci5mb3JtXCI+XG4gICAgPFNlY3Rpb25IZWFkZXI+e3sgdCgnYWN0LmNyZWF0ZVBhY2thZ2UnKSB9fTwvU2VjdGlvbkhlYWRlcj5cbiAgICA8Zm9ybT5cbiAgICAgIDxBY3RpdmUgOmxhYmVsPVwidCgnYWN0Lm5hbWUnKVwiIDplcnJvcj1cIm5hbWVFcnJvclwiPlxuICAgICAgICA8VGV4dElucHV0IHYtbW9kZWw9XCJuYW1lXCIgLz5cbiAgICAgIDwvQWN0aXZlPlxuICAgICAgPENvbW1hbmRzPlxuICAgICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cIm9uQ3JlYXRlQ2xpY2tcIj57eyB0KCdhY3QuYWRkJykudG9VcHBlckNhc2UoKSB9fTwvUHJ1bkJ1dHRvbj5cbiAgICAgIDwvQ29tbWFuZHM+XG4gICAgPC9mb3JtPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiQyIsIl93aXRoQ3R4IiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfdW5yZWYiLCJfY3JlYXRlVk5vZGUiLCJBY3RpdmUiLCJUZXh0SW5wdXQiLCJfaXNSZWYiLCJQcnVuQnV0dG9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSxVQUFBLE9BQUE7QUFFQSxVQUFBLE9BQUEsSUFBQSxFQUFBO0FBQ0EsVUFBQSxZQUFBLElBQUEsS0FBQTtBQUNBLFVBQUEsTUFBQSxNQUFBLFVBQUEsUUFBQSxDQUFBLG1CQUFBLEtBQUEsS0FBQSxDQUFBO0FBRUEsYUFBQSxnQkFBQTtBQUNFLFVBQUEsS0FBQSxNQUFBLFdBQUEsS0FBQSxDQUFBLG1CQUFBLEtBQUEsS0FBQSxHQUFBO0FBQ0Usa0JBQUEsUUFBQTtBQUNBO0FBQUEsTUFBQTtBQUVGLGNBQUEsU0FBQSxLQUFBLEtBQUE7QUFDQSxXQUFBLE9BQUE7QUFBQSxJQUFZOzs7UUFlTixPQUFBQSxnQkFWT0MsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEscUJBQUFBLElBQUFBO0FBQUFBLE1BQTJCLEdBQUE7QUFBQTtVQUNxQixTQUFBQyxRQUFBLE1BQUE7QUFBQSxZQUFoQkMsZ0JBQUFDLGdCQUFBQyxNQUFBLENBQUEsRUFBQSxtQkFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBLFVBQXhCLENBQUE7QUFBQTs7O1VBUVpDLFlBQUFDLGFBQUE7QUFBQSxZQUpJLE9BQUFGLE1BQUEsQ0FBQSxFQUFBLFVBQUE7QUFBQSxZQUZRLE9BQUFBLE1BQUEsU0FBQTtBQUFBLFVBQXNCLEdBQUE7QUFBQTtjQUNUQyxZQUFBRSxhQUFBO0FBQUEsZ0JBQUEsWUFBQUgsTUFBQSxJQUFBO0FBQUEsZ0JBQVIsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBSSxNQUFBLElBQUEsSUFBQSxLQUFBLFFBQUEsU0FBQTtBQUFBLGNBQUksR0FBQSxNQUFBLEdBQUEsQ0FBQSxZQUFBLENBQUE7QUFBQTs7OztZQUlmLFNBQUFQLFFBQUEsTUFBQTtBQUFBLGNBRCtFSSxZQUFBSSxhQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUE1RSxTQUFBO0FBQUEsY0FBZ0IsR0FBQTtBQUFBO2tCQUErQ1AsZ0JBQUFDLGdCQUFBQyxNQUFBLENBQUEsRUFBQSxTQUFBLEVBQUEsWUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBLGdCQUFMLENBQUE7QUFBQTs7Ozs7Ozs7OzsifQ==
