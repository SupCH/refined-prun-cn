import { useCssModule } from './runtime-dom.esm-bundler.js';
import fa from './font-awesome.module.css.js';
import { friendlyConditionText } from './utils4.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ConditionItem',
  props: {
    condition: {},
    contract: {},
  },
  setup(__props) {
    const $style = useCssModule();
    const iconClass = computed(() => {
      switch (__props.condition.status) {
        case 'PENDING': {
          for (const dependency of __props.condition.dependencies) {
            const match = __props.contract.conditions.find(x => x.id === dependency);
            if (!match || match.status !== 'FULFILLED') {
              return $style.unavailable;
            }
          }
          return $style.pending;
        }
        case 'IN_PROGRESS':
        case 'PARTLY_FULFILLED':
          return $style.pending;
        case 'FULFILLMENT_ATTEMPTED':
        case 'VIOLATED':
          return $style.failed;
        case 'FULFILLED':
          return $style.fulfilled;
      }
    });
    const icon = computed(() => (__props.condition.status === 'FULFILLED' ? '' : ''));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          createBaseVNode(
            'span',
            {
              class: normalizeClass(unref(iconClass)),
            },
            [
              createBaseVNode(
                'span',
                {
                  class: normalizeClass([unref(fa).solid]),
                },
                toDisplayString(unref(icon)),
                3,
              ),
              createTextVNode(
                ' ' + toDisplayString(unref(friendlyConditionText)(_ctx.condition.type)),
                1,
              ),
            ],
            2,
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZGl0aW9uSXRlbS52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0NPTlRTL0NvbmRpdGlvbkl0ZW0udnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgZmEgZnJvbSAnQHNyYy91dGlscy9mb250LWF3ZXNvbWUubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyBmcmllbmRseUNvbmRpdGlvblRleHQgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9DT05UUy91dGlscyc7XG5cbmNvbnN0IHsgY29uZGl0aW9uLCBjb250cmFjdCB9ID0gZGVmaW5lUHJvcHM8e1xuICBjb25kaXRpb246IFBydW5BcGkuQ29udHJhY3RDb25kaXRpb247XG4gIGNvbnRyYWN0OiBQcnVuQXBpLkNvbnRyYWN0O1xufT4oKTtcblxuY29uc3QgJHN0eWxlID0gdXNlQ3NzTW9kdWxlKCk7XG5cbmNvbnN0IGljb25DbGFzcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgc3dpdGNoIChjb25kaXRpb24uc3RhdHVzKSB7XG4gICAgY2FzZSAnUEVORElORyc6IHtcbiAgICAgIGZvciAoY29uc3QgZGVwZW5kZW5jeSBvZiBjb25kaXRpb24uZGVwZW5kZW5jaWVzKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gY29udHJhY3QuY29uZGl0aW9ucy5maW5kKHggPT4geC5pZCA9PT0gZGVwZW5kZW5jeSk7XG4gICAgICAgIGlmICghbWF0Y2ggfHwgbWF0Y2guc3RhdHVzICE9PSAnRlVMRklMTEVEJykge1xuICAgICAgICAgIHJldHVybiAkc3R5bGUudW5hdmFpbGFibGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAkc3R5bGUucGVuZGluZztcbiAgICB9XG4gICAgY2FzZSAnSU5fUFJPR1JFU1MnOlxuICAgIGNhc2UgJ1BBUlRMWV9GVUxGSUxMRUQnOlxuICAgICAgcmV0dXJuICRzdHlsZS5wZW5kaW5nO1xuICAgIGNhc2UgJ0ZVTEZJTExNRU5UX0FUVEVNUFRFRCc6XG4gICAgY2FzZSAnVklPTEFURUQnOlxuICAgICAgcmV0dXJuICRzdHlsZS5mYWlsZWQ7XG4gICAgY2FzZSAnRlVMRklMTEVEJzpcbiAgICAgIHJldHVybiAkc3R5bGUuZnVsZmlsbGVkO1xuICB9XG59KTtcbmNvbnN0IGljb24gPSBjb21wdXRlZCgoKSA9PiAoY29uZGl0aW9uLnN0YXR1cyA9PT0gJ0ZVTEZJTExFRCcgPyAnXFx1ZjAwYycgOiAnXFx1ZjAwZCcpKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHNwYW4gOmNsYXNzPVwiaWNvbkNsYXNzXCI+XG4gICAgICA8c3BhbiA6Y2xhc3M9XCJbZmEuc29saWRdXCI+e3sgaWNvbiB9fTwvc3BhblxuICAgICAgPiZuYnNwO3t7IGZyaWVuZGx5Q29uZGl0aW9uVGV4dChjb25kaXRpb24udHlwZSkgfX1cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5wZW5kaW5nIHtcbiAgY29sb3I6IHZhcigtLXJwLWNvbG9yLW9yYW5nZSk7XG59XG5cbi5mdWxmaWxsZWQge1xuICBjb2xvcjogdmFyKC0tcnAtY29sb3ItZ3JlZW4pO1xufVxuXG4uZmFpbGVkIHtcbiAgY29sb3I6IHZhcigtLXJwLWNvbG9yLXJlZCk7XG59XG5cbi51bmF2YWlsYWJsZSB7XG4gIGNvbG9yOiB2YXIoLS1ycC1jb2xvci10ZXh0KTtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9ub3JtYWxpemVDbGFzcyIsIl91bnJlZiIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlVGV4dFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBU0EsVUFBQSxTQUFBLGFBQUE7QUFFQSxVQUFBLFlBQUEsU0FBQSxNQUFBO0FBQ0UsY0FBQSxRQUFBLFVBQUEsUUFBQTtBQUFBLFFBQTBCLEtBQUEsV0FBQTtBQUV0QixxQkFBQSxjQUFBLFFBQUEsVUFBQSxjQUFBO0FBQ0Usa0JBQUEsUUFBQSxRQUFBLFNBQUEsV0FBQSxLQUFBLENBQUEsTUFBQSxFQUFBLE9BQUEsVUFBQTtBQUNBLGdCQUFBLENBQUEsU0FBQSxNQUFBLFdBQUEsYUFBQTtBQUNFLHFCQUFBLE9BQUE7QUFBQSxZQUFjO0FBQUEsVUFDaEI7QUFFRixpQkFBQSxPQUFBO0FBQUEsUUFBYztBQUFBLFFBQ2hCLEtBQUE7QUFBQSxRQUNLLEtBQUE7QUFFSCxpQkFBQSxPQUFBO0FBQUEsUUFBYyxLQUFBO0FBQUEsUUFDWCxLQUFBO0FBRUgsaUJBQUEsT0FBQTtBQUFBLFFBQWMsS0FBQTtBQUVkLGlCQUFBLE9BQUE7QUFBQSxNQUFjO0FBQUEsSUFDbEIsQ0FBQTtBQUVGLFVBQUEsT0FBQSxTQUFBLE1BQUEsUUFBQSxVQUFBLFdBQUEsY0FBQSxNQUFBLEdBQUE7OztRQVNRQSxnQkFBQSxRQUFBO0FBQUEsVUFERyxPQUFBQyxlQUFBQyxNQUFBLFNBQUEsQ0FBQTtBQUFBLFFBSGdCLEdBQUE7QUFBQTtZQUVwQixPQUFBRCxlQUFBLENBQUFDLE1BQUEsRUFBQSxFQUFBLEtBQUEsQ0FBQTtBQUFBLFVBRHNCLEdBQUFDLGdCQUFBRCxNQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxVQUFVRSxnQkFBQSxNQUFBRCxnQkFBQUQsTUFBQSxxQkFBQSxFQUFBLEtBQUEsVUFBQSxJQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsUUFDYSxHQUFBLENBQUE7QUFBQTs7OzsifQ==
