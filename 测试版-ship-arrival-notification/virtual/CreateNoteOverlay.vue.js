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
  __name: 'CreateNoteOverlay',
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
                ...(_cache[1] || (_cache[1] = [createTextVNode('New Note', -1)])),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                { label: 'Note Name' },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlTm90ZU92ZXJsYXkudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL05PVEUvQ3JlYXRlTm90ZU92ZXJsYXkudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IFNlY3Rpb25IZWFkZXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL1NlY3Rpb25IZWFkZXIudnVlJztcbmltcG9ydCBBY3RpdmUgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0FjdGl2ZS52dWUnO1xuaW1wb3J0IFRleHRJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvVGV4dElucHV0LnZ1ZSc7XG5pbXBvcnQgQ29tbWFuZHMgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0NvbW1hbmRzLnZ1ZSc7XG5cbmNvbnN0IHsgb25DcmVhdGUgfSA9IGRlZmluZVByb3BzPHsgb25DcmVhdGU6IChuYW1lOiBzdHJpbmcpID0+IHZvaWQgfT4oKTtcblxuY29uc3QgZW1pdCA9IGRlZmluZUVtaXRzPHsgKGU6ICdjbG9zZScpOiB2b2lkIH0+KCk7XG5cbmNvbnN0IG5hbWUgPSByZWYoJycpO1xuXG5mdW5jdGlvbiBvbkNyZWF0ZUNsaWNrKCkge1xuICBpZiAobmFtZS52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgb25DcmVhdGUobmFtZS52YWx1ZSk7XG4gIGVtaXQoJ2Nsb3NlJyk7XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IDpjbGFzcz1cIkMuRHJhZnRDb25kaXRpb25FZGl0b3IuZm9ybVwiPlxuICAgIDxTZWN0aW9uSGVhZGVyPk5ldyBOb3RlPC9TZWN0aW9uSGVhZGVyPlxuICAgIDxmb3JtPlxuICAgICAgPEFjdGl2ZSBsYWJlbD1cIk5vdGUgTmFtZVwiPlxuICAgICAgICA8VGV4dElucHV0IHYtbW9kZWw9XCJuYW1lXCIgLz5cbiAgICAgIDwvQWN0aXZlPlxuICAgICAgPENvbW1hbmRzPlxuICAgICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cIm9uQ3JlYXRlQ2xpY2tcIj5DUkVBVEU8L1BydW5CdXR0b24+XG4gICAgICA8L0NvbW1hbmRzPlxuICAgIDwvZm9ybT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIkMiLCJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJBY3RpdmUiLCJUZXh0SW5wdXQiLCJfdW5yZWYiLCJfaXNSZWYiLCJQcnVuQnV0dG9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBU0EsVUFBQSxPQUFBO0FBRUEsVUFBQSxPQUFBLElBQUEsRUFBQTtBQUVBLGFBQUEsZ0JBQUE7QUFDRSxVQUFBLEtBQUEsTUFBQSxXQUFBLEdBQUE7QUFDRTtBQUFBLE1BQUE7QUFFRixjQUFBLFNBQUEsS0FBQSxLQUFBO0FBQ0EsV0FBQSxPQUFBO0FBQUEsSUFBWTs7O1FBZU4sT0FBQUEsZ0JBVk9DLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLHFCQUFBQSxJQUFBQTtBQUFBQSxNQUEyQixHQUFBO0FBQUE7VUFDQyxTQUFBQyxRQUFBLE1BQUEsQ0FBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBO0FBQUEsWUFBaEJDLGdCQUFBLFlBQUEsRUFBQTtBQUFBLFVBQUEsRUFBQSxDQUFBO0FBQUE7OztVQVFoQkMsWUFBQUMsYUFBQSxFQUFBLE9BQUEsWUFBQSxHQUFBO0FBQUEsWUFOb0IsU0FBQUgsUUFBQSxNQUFBO0FBQUEsY0FDS0UsWUFBQUUsYUFBQTtBQUFBLGdCQUFBLFlBQUFDLE1BQUEsSUFBQTtBQUFBLGdCQUFSLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQUMsTUFBQSxJQUFBLElBQUEsS0FBQSxRQUFBLFNBQUE7QUFBQSxjQUFJLEdBQUEsTUFBQSxHQUFBLENBQUEsWUFBQSxDQUFBO0FBQUE7Ozs7WUFJZixTQUFBTixRQUFBLE1BQUE7QUFBQSxjQURxREUsWUFBQUssYUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBbEQsU0FBQTtBQUFBLGNBQWdCLEdBQUE7QUFBQTtrQkFBcUJOLGdCQUFBLFVBQUEsRUFBQTtBQUFBLGdCQUFBLEVBQUEsQ0FBQTtBQUFBOzs7Ozs7Ozs7OyJ9
