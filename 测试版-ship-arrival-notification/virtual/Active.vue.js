import { C } from './prun-css.js';
import _sfc_main$1 from './Tooltip.vue.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createBlock,
  createCommentVNode,
  renderSlot,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Active',
  props: {
    error: { type: Boolean },
    label: {},
    tooltip: {},
    tooltipPosition: {},
  },
  setup(__props) {
    const errorClasses = computed(() =>
      __props.error ? [C.FormComponent.containerError, C.forms.error] : [],
    );
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.containerActive,
              ('C' in _ctx ? _ctx.C : unref(C)).forms.active,
              ('C' in _ctx ? _ctx.C : unref(C)).forms.formComponent,
              unref(errorClasses),
            ]),
          },
          [
            createBaseVNode('label', null, [
              createBaseVNode('span', null, toDisplayString(_ctx.label), 1),
              _ctx.tooltip
                ? (openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: 0,
                      position: _ctx.tooltipPosition,
                      tooltip: _ctx.tooltip,
                    },
                    null,
                    8,
                    ['position', 'tooltip'],
                  ))
                : createCommentVNode('', true),
            ]),
            createBaseVNode(
              'div',
              {
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.input,
                  ('C' in _ctx ? _ctx.C : unref(C)).forms.input,
                ]),
              },
              [
                createBaseVNode(
                  'div',
                  {
                    class: normalizeClass([
                      ('C' in _ctx ? _ctx.C : unref(C)).DynamicInput.dynamic,
                      ('C' in _ctx ? _ctx.C : unref(C)).forms.dynamic,
                    ]),
                  },
                  [renderSlot(_ctx.$slots, 'default')],
                  2,
                ),
              ],
              2,
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aXZlLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZm9ybXMvQWN0aXZlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IFRvb2x0aXAsIHsgVG9vbHRpcFBvc2l0aW9uIH0gZnJvbSAnQHNyYy9jb21wb25lbnRzL1Rvb2x0aXAudnVlJztcblxuY29uc3QgeyBlcnJvciB9ID0gZGVmaW5lUHJvcHM8e1xuICBlcnJvcj86IGJvb2xlYW47XG4gIGxhYmVsPzogc3RyaW5nO1xuICB0b29sdGlwPzogc3RyaW5nO1xuICB0b29sdGlwUG9zaXRpb24/OiBUb29sdGlwUG9zaXRpb247XG59PigpO1xuXG5jb25zdCBlcnJvckNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiAoZXJyb3IgPyBbQy5Gb3JtQ29tcG9uZW50LmNvbnRhaW5lckVycm9yLCBDLmZvcm1zLmVycm9yXSA6IFtdKSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2XG4gICAgOmNsYXNzPVwiW0MuRm9ybUNvbXBvbmVudC5jb250YWluZXJBY3RpdmUsIEMuZm9ybXMuYWN0aXZlLCBDLmZvcm1zLmZvcm1Db21wb25lbnQsIGVycm9yQ2xhc3Nlc11cIj5cbiAgICA8bGFiZWw+XG4gICAgICA8c3Bhbj57eyBsYWJlbCB9fTwvc3Bhbj5cbiAgICAgIDxUb29sdGlwIHYtaWY9XCJ0b29sdGlwXCIgOnBvc2l0aW9uPVwidG9vbHRpcFBvc2l0aW9uXCIgOnRvb2x0aXA9XCJ0b29sdGlwXCIgLz5cbiAgICA8L2xhYmVsPlxuICAgIDxkaXYgOmNsYXNzPVwiW0MuRm9ybUNvbXBvbmVudC5pbnB1dCwgQy5mb3Jtcy5pbnB1dF1cIj5cbiAgICAgIDxkaXYgOmNsYXNzPVwiW0MuRHluYW1pY0lucHV0LmR5bmFtaWMsIEMuZm9ybXMuZHluYW1pY11cIj5cbiAgICAgICAgPHNsb3QgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiQyIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX29wZW5CbG9jayIsIl9jcmVhdGVCbG9jayIsIlRvb2x0aXAiLCJ0b29sdGlwUG9zaXRpb24iLCJ0b29sdGlwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVVBLFVBQUEsZUFBQSxTQUFBLE1BQUEsUUFBQSxRQUFBLENBQUEsRUFBQSxjQUFBLGdCQUFBLEVBQUEsTUFBQSxLQUFBLElBQUEsQ0FBQSxDQUFBOzs7UUFlUSxPQUFBQSxlQUFBLEVBVktDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLGNBQUFBLGtCQUFpQ0EsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsTUFBQUEsU0FBZ0JBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLE1BQUFBLGVBQUFBLE1BQUFBLFlBQUFBLENBQUFBLENBQUFBO0FBQUFBLE1BQW1DLEdBQUE7QUFBQTtVQUlyRkMsZ0JBQUEsUUFBQSxNQUFBQyxnQkFBQSxLQUFBLEtBQUEsR0FBQSxDQUFBO0FBQUEsVUFGUSxLQUFBLFdBQUFDLGFBQUFDLFlBQUFDLGFBQUE7QUFBQSxZQUMyRCxLQUFBO0FBQUE7WUFBdENDLFNBQUFBLEtBQUFBO0FBQUFBLFVBQTJCQyxHQUFBQSxNQUFBQSxHQUFBQSxDQUFBQSxZQUFBQSxTQUFBQSxDQUFBQSxLQUFBQSxtQkFBQUEsSUFBQUEsSUFBQUE7QUFBQUE7O1VBTTFELE9BQUFSLGVBQUEsRUFKUUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEseUJBQXVCQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxNQUFBQSxLQUFBQSxDQUFBQTtBQUFBQSxRQUFhLEdBQUE7QUFBQTtZQUcxQyxPQUFBRCxlQUFBLEVBRlFDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLDBCQUF3QkEsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsTUFBQUEsT0FBQUEsQ0FBQUE7QUFBQUEsVUFBZSxHQUFBO0FBQUE7VUFDM0MsR0FBQSxDQUFBO0FBQUE7Ozs7OyJ9
