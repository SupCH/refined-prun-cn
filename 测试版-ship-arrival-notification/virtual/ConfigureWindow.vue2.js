import SectionHeader from './SectionHeader.vue.js';
import { act } from './act-registry.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createVNode,
  createBlock,
  withCtx,
  createTextVNode,
  resolveDynamicComponent,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ConfigureWindow',
  props: {
    pkg: {},
    config: {},
  },
  setup(__props) {
    const blocks = computed(() => {
      const blocks2 = [];
      for (const group of __props.pkg.groups) {
        const info = act.getMaterialGroupInfo(group.type);
        if (!info || !info.configureComponent || !info.needsConfigure?.(group)) {
          continue;
        }
        const name = group.name;
        let groupConfig = __props.config.materialGroups[name];
        if (!groupConfig) {
          continue;
        }
        blocks2.push({
          name: `[${name}]: ${info.type} Material Group`,
          component: info.configureComponent,
          data: group,
          config: groupConfig,
        });
      }
      for (const action of __props.pkg.actions) {
        const info = act.getActionInfo(action.type);
        if (!info || !info.configureComponent || !info.needsConfigure?.(action)) {
          continue;
        }
        const name = action.name;
        let actionConfig = __props.config.actions[name];
        if (!actionConfig) {
          continue;
        }
        blocks2.push({
          name: `[${name}]: ${info.type} Action`,
          component: info.configureComponent,
          data: action,
          config: actionConfig,
        });
      }
      return blocks2;
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.config),
          },
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(unref(blocks), block => {
                return (
                  openBlock(),
                  createElementBlock(
                    Fragment,
                    {
                      key: block.name,
                    },
                    [
                      createVNode(
                        SectionHeader,
                        {
                          class: normalizeClass(_ctx.$style.sectionHeader),
                        },
                        {
                          default: withCtx(() => [createTextVNode(toDisplayString(block.name), 1)]),
                          _: 2,
                        },
                        1032,
                        ['class'],
                      ),
                      (openBlock(),
                      createBlock(
                        resolveDynamicComponent(block.component),
                        {
                          data: block.data,
                          config: block.config,
                        },
                        null,
                        8,
                        ['data', 'config'],
                      )),
                    ],
                    64,
                  )
                );
              }),
              128,
            )),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJlV2luZG93LnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQUNUL0NvbmZpZ3VyZVdpbmRvdy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IEFjdGlvblBhY2thZ2VDb25maWcgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1Qvc2hhcmVkLXR5cGVzJztcbmltcG9ydCBTZWN0aW9uSGVhZGVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9TZWN0aW9uSGVhZGVyLnZ1ZSc7XG5pbXBvcnQgeyBhY3QgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0LXJlZ2lzdHJ5JztcblxuY29uc3QgeyBwa2csIGNvbmZpZyB9ID0gZGVmaW5lUHJvcHM8e1xuICBwa2c6IFVzZXJEYXRhLkFjdGlvblBhY2thZ2VEYXRhO1xuICBjb25maWc6IEFjdGlvblBhY2thZ2VDb25maWc7XG59PigpO1xuXG5pbnRlcmZhY2UgQmxvY2sge1xuICBuYW1lOiBzdHJpbmc7XG4gIGNvbXBvbmVudDogQ29tcG9uZW50O1xuICBkYXRhOiB1bmtub3duO1xuICBjb25maWc6IHVua25vd247XG59XG5cbmNvbnN0IGJsb2NrcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgYmxvY2tzID0gW10gYXMgQmxvY2tbXTtcbiAgZm9yIChjb25zdCBncm91cCBvZiBwa2cuZ3JvdXBzKSB7XG4gICAgY29uc3QgaW5mbyA9IGFjdC5nZXRNYXRlcmlhbEdyb3VwSW5mbyhncm91cC50eXBlKTtcbiAgICBpZiAoIWluZm8gfHwgIWluZm8uY29uZmlndXJlQ29tcG9uZW50IHx8ICFpbmZvLm5lZWRzQ29uZmlndXJlPy4oZ3JvdXApKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgbmFtZSA9IGdyb3VwLm5hbWUhO1xuICAgIGxldCBncm91cENvbmZpZyA9IGNvbmZpZy5tYXRlcmlhbEdyb3Vwc1tuYW1lXTtcbiAgICBpZiAoIWdyb3VwQ29uZmlnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgYmxvY2tzLnB1c2goe1xuICAgICAgbmFtZTogYFske25hbWV9XTogJHtpbmZvLnR5cGV9IE1hdGVyaWFsIEdyb3VwYCxcbiAgICAgIGNvbXBvbmVudDogaW5mby5jb25maWd1cmVDb21wb25lbnQsXG4gICAgICBkYXRhOiBncm91cCxcbiAgICAgIGNvbmZpZzogZ3JvdXBDb25maWcsXG4gICAgfSk7XG4gIH1cbiAgZm9yIChjb25zdCBhY3Rpb24gb2YgcGtnLmFjdGlvbnMpIHtcbiAgICBjb25zdCBpbmZvID0gYWN0LmdldEFjdGlvbkluZm8oYWN0aW9uLnR5cGUpO1xuICAgIGlmICghaW5mbyB8fCAhaW5mby5jb25maWd1cmVDb21wb25lbnQgfHwgIWluZm8ubmVlZHNDb25maWd1cmU/LihhY3Rpb24pKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgbmFtZSA9IGFjdGlvbi5uYW1lITtcbiAgICBsZXQgYWN0aW9uQ29uZmlnID0gY29uZmlnLmFjdGlvbnNbbmFtZV07XG4gICAgaWYgKCFhY3Rpb25Db25maWcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBibG9ja3MucHVzaCh7XG4gICAgICBuYW1lOiBgWyR7bmFtZX1dOiAke2luZm8udHlwZX0gQWN0aW9uYCxcbiAgICAgIGNvbXBvbmVudDogaW5mby5jb25maWd1cmVDb21wb25lbnQsXG4gICAgICBkYXRhOiBhY3Rpb24sXG4gICAgICBjb25maWc6IGFjdGlvbkNvbmZpZyxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gYmxvY2tzO1xufSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5jb25maWdcIj5cbiAgICA8dGVtcGxhdGUgdi1mb3I9XCJibG9jayBpbiBibG9ja3NcIiA6a2V5PVwiYmxvY2submFtZVwiPlxuICAgICAgPFNlY3Rpb25IZWFkZXIgOmNsYXNzPVwiJHN0eWxlLnNlY3Rpb25IZWFkZXJcIj57eyBibG9jay5uYW1lIH19PC9TZWN0aW9uSGVhZGVyPlxuICAgICAgPGNvbXBvbmVudCA6aXM9XCJibG9jay5jb21wb25lbnRcIiA6ZGF0YT1cImJsb2NrLmRhdGFcIiA6Y29uZmlnPVwiYmxvY2suY29uZmlnXCIgLz5cbiAgICA8L3RlbXBsYXRlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uY29uZmlnIHtcbiAgbWFyZ2luLXRvcDogNXB4O1xuICBtYXJnaW4tbGVmdDogNHB4O1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMzI4MmI7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMyYjQ4NWE7XG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbn1cblxuLnNlY3Rpb25IZWFkZXIge1xuICBtYXJnaW4tdG9wOiAycHg7XG4gIG1hcmdpbi1ib3R0b206IDJweDtcbiAgbWFyZ2luLXJpZ2h0OiA0cHg7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFpQkEsVUFBQSxTQUFBLFNBQUEsTUFBQTtBQUNFLFlBQUEsVUFBQSxDQUFBO0FBQ0EsaUJBQUEsU0FBQSxRQUFBLElBQUEsUUFBQTtBQUNFLGNBQUEsT0FBQSxJQUFBLHFCQUFBLE1BQUEsSUFBQTtBQUNBLFlBQUEsQ0FBQSxRQUFBLENBQUEsS0FBQSxzQkFBQSxDQUFBLEtBQUEsaUJBQUEsS0FBQSxHQUFBO0FBQ0U7QUFBQSxRQUFBO0FBRUYsY0FBQSxPQUFBLE1BQUE7QUFDQSxZQUFBLGNBQUEsUUFBQSxPQUFBLGVBQUEsSUFBQTtBQUNBLFlBQUEsQ0FBQSxhQUFBO0FBQ0U7QUFBQSxRQUFBO0FBRUYsZ0JBQUEsS0FBQTtBQUFBLFVBQVksTUFBQSxJQUFBLElBQUEsTUFBQSxLQUFBLElBQUE7QUFBQSxVQUNtQixXQUFBLEtBQUE7QUFBQSxVQUNiLE1BQUE7QUFBQSxVQUNWLFFBQUE7QUFBQSxRQUNFLENBQUE7QUFBQSxNQUNUO0FBRUgsaUJBQUEsVUFBQSxRQUFBLElBQUEsU0FBQTtBQUNFLGNBQUEsT0FBQSxJQUFBLGNBQUEsT0FBQSxJQUFBO0FBQ0EsWUFBQSxDQUFBLFFBQUEsQ0FBQSxLQUFBLHNCQUFBLENBQUEsS0FBQSxpQkFBQSxNQUFBLEdBQUE7QUFDRTtBQUFBLFFBQUE7QUFFRixjQUFBLE9BQUEsT0FBQTtBQUNBLFlBQUEsZUFBQSxRQUFBLE9BQUEsUUFBQSxJQUFBO0FBQ0EsWUFBQSxDQUFBLGNBQUE7QUFDRTtBQUFBLFFBQUE7QUFFRixnQkFBQSxLQUFBO0FBQUEsVUFBWSxNQUFBLElBQUEsSUFBQSxNQUFBLEtBQUEsSUFBQTtBQUFBLFVBQ21CLFdBQUEsS0FBQTtBQUFBLFVBQ2IsTUFBQTtBQUFBLFVBQ1YsUUFBQTtBQUFBLFFBQ0UsQ0FBQTtBQUFBLE1BQ1Q7QUFFSCxhQUFBO0FBQUEsSUFBTyxDQUFBOzs7UUFVRCxPQUFBQSxlQUFBLEtBQUEsT0FBQSxNQUFBO0FBQUEsTUFMb0IsR0FBQTtBQUFBOzs7VUFDc0IsR0FBQTtBQUFBO2NBQ2lDLE9BQUFBLGVBQUEsS0FBQSxPQUFBLGFBQUE7QUFBQSxZQUFsQyxHQUFBO0FBQUE7Z0JBQWtCQyxnQkFBQUMsZ0JBQUEsTUFBQSxJQUFBLEdBQUEsQ0FBQTtBQUFBLGNBQUgsQ0FBQTtBQUFBOzs7Y0FDM0IsTUFBQSxNQUFBO0FBQUEsY0FBZSxRQUFBLE1BQUE7QUFBQSxZQUFxQixHQUFBLE1BQUEsR0FBQSxDQUFBLFFBQUEsUUFBQSxDQUFBO0FBQUE7Ozs7OzsifQ==
