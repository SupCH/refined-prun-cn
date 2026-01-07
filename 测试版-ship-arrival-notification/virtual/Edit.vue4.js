import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Edit',
  props: {
    action: {},
  },
  setup(__props) {
    const displayTickers = computed(() => (__props.action.tickers || []).join(', '));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(
              _sfc_main$2,
              { label: 'Exchange' },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$1,
                    {
                      modelValue: _ctx.action.exchange,
                      'onUpdate:modelValue':
                        _cache[0] || (_cache[0] = $event => (_ctx.action.exchange = $event)),
                      disabled: '',
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
              { label: 'Tickers' },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$1,
                    {
                      'model-value': unref(displayTickers),
                      disabled: '',
                    },
                    null,
                    8,
                    ['model-value'],
                  ),
                ]),
                _: 1,
              },
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdC52dWU0LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9hY3Rpb25zL2N4LWZldGNoL0VkaXQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgQWN0aXZlIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9BY3RpdmUudnVlJztcbmltcG9ydCBUZXh0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1RleHRJbnB1dC52dWUnO1xuXG5jb25zdCB7IGFjdGlvbiB9ID0gZGVmaW5lUHJvcHM8e1xuICBhY3Rpb246IFVzZXJEYXRhLkFjdGlvbkRhdGE7XG59PigpO1xuXG4vLyBSZWFkLW9ubHkgdmlldyBmb3Igbm93LCBhcyB0aGlzIGlzIGdlbmVyYXRlZCBwcm9ncmFtbWF0aWNhbGx5XG5jb25zdCBkaXNwbGF5VGlja2VycyA9IGNvbXB1dGVkKCgpID0+IChhY3Rpb24udGlja2VycyB8fCBbXSkuam9pbignLCAnKSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8QWN0aXZlIGxhYmVsPVwiRXhjaGFuZ2VcIj5cbiAgICA8VGV4dElucHV0IHYtbW9kZWw9XCJhY3Rpb24uZXhjaGFuZ2VcIiBkaXNhYmxlZCAvPlxuICA8L0FjdGl2ZT5cbiAgPEFjdGl2ZSBsYWJlbD1cIlRpY2tlcnNcIj5cbiAgICA8VGV4dElucHV0IDptb2RlbC12YWx1ZT1cImRpc3BsYXlUaWNrZXJzXCIgZGlzYWJsZWQgLz5cbiAgPC9BY3RpdmU+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl93aXRoQ3R4IiwiX2NyZWF0ZVZOb2RlIiwiVGV4dElucHV0IiwiX3VucmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBU0EsVUFBQSxpQkFBQSxTQUFBLE9BQUEsUUFBQSxPQUFBLFdBQUEsQ0FBQSxHQUFBLEtBQUEsSUFBQSxDQUFBOzs7O1VBSTBCLFNBQUFBLFFBQUEsTUFBQTtBQUFBLFlBQzBCQyxZQUFBQyxhQUFBO0FBQUEsY0FBQSxZQUFBLEtBQUEsT0FBQTtBQUFBLGNBQXJCLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQSxLQUFBLE9BQUEsV0FBQTtBQUFBLGNBQVEsVUFBQTtBQUFBLFlBQUUsR0FBQSxNQUFBLEdBQUEsQ0FBQSxZQUFBLENBQUE7QUFBQTs7OztVQUVoQixTQUFBRixRQUFBLE1BQUE7QUFBQSxZQUMrQkMsWUFBQUMsYUFBQTtBQUFBLGNBQUEsZUFBQUMsTUFBQSxjQUFBO0FBQUEsY0FBM0IsVUFBQTtBQUFBLFlBQWdCLEdBQUEsTUFBQSxHQUFBLENBQUEsYUFBQSxDQUFBO0FBQUE7Ozs7Ozs7In0=
