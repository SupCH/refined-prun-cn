import { C } from './prun-css.js';
import _sfc_main$3 from './PrunButton.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import _sfc_main$4 from './Commands.vue.js';
import {
  defineComponent,
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
  __name: 'CreateCommandListOverlay',
  props: {
    onCreate: { type: Function },
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const name = ref('');
    function onCreateClick() {
      if (name.value.length === 0) {
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
                ...(_cache[1] || (_cache[1] = [createTextVNode('New Command List', -1)])),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                { label: 'List Name' },
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
                        ...(_cache[2] || (_cache[2] = [createTextVNode('CREATE', -1)])),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlQ29tbWFuZExpc3RPdmVybGF5LnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9DTURML0NyZWF0ZUNvbW1hbmRMaXN0T3ZlcmxheS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgU2VjdGlvbkhlYWRlciBmcm9tICdAc3JjL2NvbXBvbmVudHMvU2VjdGlvbkhlYWRlci52dWUnO1xuaW1wb3J0IEFjdGl2ZSBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQWN0aXZlLnZ1ZSc7XG5pbXBvcnQgVGV4dElucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9UZXh0SW5wdXQudnVlJztcbmltcG9ydCBDb21tYW5kcyBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQ29tbWFuZHMudnVlJztcblxuY29uc3QgeyBvbkNyZWF0ZSB9ID0gZGVmaW5lUHJvcHM8eyBvbkNyZWF0ZTogKG5hbWU6IHN0cmluZykgPT4gdm9pZCB9PigpO1xuXG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHM8eyAoZTogJ2Nsb3NlJyk6IHZvaWQgfT4oKTtcblxuY29uc3QgbmFtZSA9IHJlZignJyk7XG5cbmZ1bmN0aW9uIG9uQ3JlYXRlQ2xpY2soKSB7XG4gIGlmIChuYW1lLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICBvbkNyZWF0ZShuYW1lLnZhbHVlKTtcbiAgZW1pdCgnY2xvc2UnKTtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiQy5EcmFmdENvbmRpdGlvbkVkaXRvci5mb3JtXCI+XG4gICAgPFNlY3Rpb25IZWFkZXI+TmV3IENvbW1hbmQgTGlzdDwvU2VjdGlvbkhlYWRlcj5cbiAgICA8Zm9ybT5cbiAgICAgIDxBY3RpdmUgbGFiZWw9XCJMaXN0IE5hbWVcIj5cbiAgICAgICAgPFRleHRJbnB1dCB2LW1vZGVsPVwibmFtZVwiIC8+XG4gICAgICA8L0FjdGl2ZT5cbiAgICAgIDxDb21tYW5kcz5cbiAgICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJvbkNyZWF0ZUNsaWNrXCI+Q1JFQVRFPC9QcnVuQnV0dG9uPlxuICAgICAgPC9Db21tYW5kcz5cbiAgICA8L2Zvcm0+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX3dpdGhDdHgiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX2NyZWF0ZVZOb2RlIiwiQWN0aXZlIiwiVGV4dElucHV0IiwiX3VucmVmIiwiX2lzUmVmIiwiUHJ1bkJ1dHRvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQVNBLFVBQUEsT0FBQTtBQUVBLFVBQUEsT0FBQSxJQUFBLEVBQUE7QUFFQSxhQUFBLGdCQUFBO0FBQ0UsVUFBQSxLQUFBLE1BQUEsV0FBQSxHQUFBO0FBQ0U7QUFBQSxNQUFBO0FBRUYsY0FBQSxTQUFBLEtBQUEsS0FBQTtBQUNBLFdBQUEsT0FBQTtBQUFBLElBQVk7OztRQWVOLE9BQUFBLGdCQVZPQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxxQkFBQUEsSUFBQUE7QUFBQUEsTUFBMkIsR0FBQTtBQUFBO1VBQ1MsU0FBQUMsUUFBQSxNQUFBLENBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQTtBQUFBLFlBQWhCQyxnQkFBQSxvQkFBQSxFQUFBO0FBQUEsVUFBQSxFQUFBLENBQUE7QUFBQTs7O1VBUXhCQyxZQUFBQyxhQUFBLEVBQUEsT0FBQSxZQUFBLEdBQUE7QUFBQSxZQU5vQixTQUFBSCxRQUFBLE1BQUE7QUFBQSxjQUNLRSxZQUFBRSxhQUFBO0FBQUEsZ0JBQUEsWUFBQUMsTUFBQSxJQUFBO0FBQUEsZ0JBQVIsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBQyxNQUFBLElBQUEsSUFBQSxLQUFBLFFBQUEsU0FBQTtBQUFBLGNBQUksR0FBQSxNQUFBLEdBQUEsQ0FBQSxZQUFBLENBQUE7QUFBQTs7OztZQUlmLFNBQUFOLFFBQUEsTUFBQTtBQUFBLGNBRHFERSxZQUFBSyxhQUFBO0FBQUEsZ0JBQUEsU0FBQTtBQUFBLGdCQUFsRCxTQUFBO0FBQUEsY0FBZ0IsR0FBQTtBQUFBO2tCQUFxQk4sZ0JBQUEsVUFBQSxFQUFBO0FBQUEsZ0JBQUEsRUFBQSxDQUFBO0FBQUE7Ozs7Ozs7Ozs7In0=
