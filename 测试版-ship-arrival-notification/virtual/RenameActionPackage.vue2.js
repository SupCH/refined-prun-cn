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
  __name: 'RenameActionPackage',
  props: {
    name: {},
    onRename: { type: Function },
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const newName = ref(__props.name);
    const nameError = ref(false);
    watch(newName, () => (nameError.value = !isValidPackageName(newName.value)));
    function onCreateClick() {
      if (newName.value.length === 0 || !isValidPackageName(newName.value)) {
        nameError.value = true;
        return;
      }
      __props.onRename(newName.value);
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
                createTextVNode(toDisplayString(unref(t)('act.renamePackage')), 1),
              ]),
              _: 1,
            }),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.description),
              },
              toDisplayString(unref(t)('act.renameWarning')),
              3,
            ),
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
                        modelValue: unref(newName),
                        'onUpdate:modelValue':
                          _cache[0] ||
                          (_cache[0] = $event =>
                            isRef(newName) ? (newName.value = $event) : null),
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
                        createTextVNode(toDisplayString(unref(t)('act.rename').toUpperCase()), 1),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuYW1lQWN0aW9uUGFja2FnZS52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9SZW5hbWVBY3Rpb25QYWNrYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IFBydW5CdXR0b24gZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5CdXR0b24udnVlJztcbmltcG9ydCBTZWN0aW9uSGVhZGVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9TZWN0aW9uSGVhZGVyLnZ1ZSc7XG5pbXBvcnQgQWN0aXZlIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9BY3RpdmUudnVlJztcbmltcG9ydCBUZXh0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1RleHRJbnB1dC52dWUnO1xuaW1wb3J0IENvbW1hbmRzIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9Db21tYW5kcy52dWUnO1xuaW1wb3J0IHsgaXNWYWxpZFBhY2thZ2VOYW1lIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL3V0aWxzJztcbmltcG9ydCB7IHQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL2kxOG4nO1xuXG5jb25zdCB7IG5hbWUsIG9uUmVuYW1lIH0gPSBkZWZpbmVQcm9wczx7IG5hbWU6IHN0cmluZzsgb25SZW5hbWU6IChuYW1lOiBzdHJpbmcpID0+IHZvaWQgfT4oKTtcblxuY29uc3QgZW1pdCA9IGRlZmluZUVtaXRzPHsgKGU6ICdjbG9zZScpOiB2b2lkIH0+KCk7XG5cbmNvbnN0IG5ld05hbWUgPSByZWYobmFtZSk7XG5jb25zdCBuYW1lRXJyb3IgPSByZWYoZmFsc2UpO1xud2F0Y2gobmV3TmFtZSwgKCkgPT4gKG5hbWVFcnJvci52YWx1ZSA9ICFpc1ZhbGlkUGFja2FnZU5hbWUobmV3TmFtZS52YWx1ZSkpKTtcblxuZnVuY3Rpb24gb25DcmVhdGVDbGljaygpIHtcbiAgaWYgKG5ld05hbWUudmFsdWUubGVuZ3RoID09PSAwIHx8ICFpc1ZhbGlkUGFja2FnZU5hbWUobmV3TmFtZS52YWx1ZSkpIHtcbiAgICBuYW1lRXJyb3IudmFsdWUgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuICBvblJlbmFtZShuZXdOYW1lLnZhbHVlKTtcbiAgZW1pdCgnY2xvc2UnKTtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiQy5EcmFmdENvbmRpdGlvbkVkaXRvci5mb3JtXCI+XG4gICAgPFNlY3Rpb25IZWFkZXI+e3sgdCgnYWN0LnJlbmFtZVBhY2thZ2UnKSB9fTwvU2VjdGlvbkhlYWRlcj5cbiAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5kZXNjcmlwdGlvblwiPlxuICAgICAge3sgdCgnYWN0LnJlbmFtZVdhcm5pbmcnKSB9fVxuICAgIDwvZGl2PlxuICAgIDxmb3JtPlxuICAgICAgPEFjdGl2ZSA6bGFiZWw9XCJ0KCdhY3QubmFtZScpXCIgOmVycm9yPVwibmFtZUVycm9yXCI+XG4gICAgICAgIDxUZXh0SW5wdXQgdi1tb2RlbD1cIm5ld05hbWVcIiAvPlxuICAgICAgPC9BY3RpdmU+XG4gICAgICA8Q29tbWFuZHM+XG4gICAgICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwib25DcmVhdGVDbGlja1wiPnt7IHQoJ2FjdC5yZW5hbWUnKS50b1VwcGVyQ2FzZSgpIH19PC9QcnVuQnV0dG9uPlxuICAgICAgPC9Db21tYW5kcz5cbiAgICA8L2Zvcm0+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5kZXNjcmlwdGlvbiB7XG4gIGxpbmUtaGVpZ2h0OiAxM3B4O1xuICBwYWRkaW5nOiAwIDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2MzUzZTtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX3dpdGhDdHgiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl91bnJlZiIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJBY3RpdmUiLCJUZXh0SW5wdXQiLCJfaXNSZWYiLCJQcnVuQnV0dG9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV0EsVUFBQSxPQUFBO0FBRUEsVUFBQSxVQUFBLElBQUEsUUFBQSxJQUFBO0FBQ0EsVUFBQSxZQUFBLElBQUEsS0FBQTtBQUNBLFVBQUEsU0FBQSxNQUFBLFVBQUEsUUFBQSxDQUFBLG1CQUFBLFFBQUEsS0FBQSxDQUFBO0FBRUEsYUFBQSxnQkFBQTtBQUNFLFVBQUEsUUFBQSxNQUFBLFdBQUEsS0FBQSxDQUFBLG1CQUFBLFFBQUEsS0FBQSxHQUFBO0FBQ0Usa0JBQUEsUUFBQTtBQUNBO0FBQUEsTUFBQTtBQUVGLGNBQUEsU0FBQSxRQUFBLEtBQUE7QUFDQSxXQUFBLE9BQUE7QUFBQSxJQUFZOzs7UUFrQk4sT0FBQUEsZ0JBYk9DLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLHFCQUFBQSxJQUFBQTtBQUFBQSxNQUEyQixHQUFBO0FBQUE7VUFDcUIsU0FBQUMsUUFBQSxNQUFBO0FBQUEsWUFBaEJDLGdCQUFBQyxnQkFBQUMsTUFBQSxDQUFBLEVBQUEsbUJBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxVQUF4QixDQUFBO0FBQUE7OztVQUdiLE9BQUFMLGVBQUEsS0FBQSxPQUFBLFdBQUE7QUFBQSxRQUZ5QixHQUFBSSxnQkFBQUMsTUFBQSxDQUFBLEVBQUEsbUJBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxRQUN6QkMsZ0JBQUEsUUFBQSxNQUFBO0FBQUEsVUFTQ0MsWUFBQUMsYUFBQTtBQUFBLFlBSkksT0FBQUgsTUFBQSxDQUFBLEVBQUEsVUFBQTtBQUFBLFlBRlEsT0FBQUEsTUFBQSxTQUFBO0FBQUEsVUFBc0IsR0FBQTtBQUFBO2NBQ05FLFlBQUFFLGFBQUE7QUFBQSxnQkFBQSxZQUFBSixNQUFBLE9BQUE7QUFBQSxnQkFBWCx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUFLLE1BQUEsT0FBQSxJQUFBLFFBQUEsUUFBQSxTQUFBO0FBQUEsY0FBTyxHQUFBLE1BQUEsR0FBQSxDQUFBLFlBQUEsQ0FBQTtBQUFBOzs7O1lBSWxCLFNBQUFSLFFBQUEsTUFBQTtBQUFBLGNBRGtGSyxZQUFBSSxhQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUEvRSxTQUFBO0FBQUEsY0FBZ0IsR0FBQTtBQUFBO2tCQUFrRFIsZ0JBQUFDLGdCQUFBQyxNQUFBLENBQUEsRUFBQSxZQUFBLEVBQUEsWUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBLGdCQUFMLENBQUE7QUFBQTs7Ozs7Ozs7OzsifQ==
