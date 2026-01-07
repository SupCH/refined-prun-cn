import { C } from './prun-css.js';
import _sfc_main$1 from './Tooltip.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createBlock,
  createCommentVNode,
  renderSlot,
} from './runtime-core.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Passive',
  props: {
    label: {},
    tooltip: {},
    tooltipPosition: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.containerPassive,
              ('C' in _ctx ? _ctx.C : unref(C)).forms.passive,
              ('C' in _ctx ? _ctx.C : unref(C)).forms.formComponent,
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
                      ('C' in _ctx ? _ctx.C : unref(C)).StaticInput.static,
                      ('C' in _ctx ? _ctx.C : unref(C)).forms.static,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFzc2l2ZS52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Zvcm1zL1Bhc3NpdmUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgVG9vbHRpcCwgeyBUb29sdGlwUG9zaXRpb24gfSBmcm9tICdAc3JjL2NvbXBvbmVudHMvVG9vbHRpcC52dWUnO1xuXG5kZWZpbmVQcm9wczx7XG4gIGxhYmVsPzogc3RyaW5nO1xuICB0b29sdGlwPzogc3RyaW5nO1xuICB0b29sdGlwUG9zaXRpb24/OiBUb29sdGlwUG9zaXRpb247XG59PigpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJbQy5Gb3JtQ29tcG9uZW50LmNvbnRhaW5lclBhc3NpdmUsIEMuZm9ybXMucGFzc2l2ZSwgQy5mb3Jtcy5mb3JtQ29tcG9uZW50XVwiPlxuICAgIDxsYWJlbD5cbiAgICAgIDxzcGFuPnt7IGxhYmVsIH19PC9zcGFuPlxuICAgICAgPFRvb2x0aXAgdi1pZj1cInRvb2x0aXBcIiA6cG9zaXRpb249XCJ0b29sdGlwUG9zaXRpb25cIiA6dG9vbHRpcD1cInRvb2x0aXBcIiAvPlxuICAgIDwvbGFiZWw+XG4gICAgPGRpdiA6Y2xhc3M9XCJbQy5Gb3JtQ29tcG9uZW50LmlucHV0LCBDLmZvcm1zLmlucHV0XVwiPlxuICAgICAgPGRpdiA6Y2xhc3M9XCJbQy5TdGF0aWNJbnB1dC5zdGF0aWMsIEMuZm9ybXMuc3RhdGljXVwiPlxuICAgICAgICA8c2xvdCAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUJsb2NrIiwiVG9vbHRpcCIsInRvb2x0aXBQb3NpdGlvbiIsInRvb2x0aXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztRQXFCUSxPQUFBQSxlQUFBLEVBVlFDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLG9DQUFrQ0EsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsTUFBQUEsVUFBaUJBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO01BQXFCLEdBQUE7QUFBQTtVQUk1RUMsZ0JBQUEsUUFBQSxNQUFBQyxnQkFBQSxLQUFBLEtBQUEsR0FBQSxDQUFBO0FBQUEsVUFGUSxLQUFBLFdBQUFDLGFBQUFDLFlBQUFDLGFBQUE7QUFBQSxZQUMyRCxLQUFBO0FBQUE7WUFBdENDLFNBQUFBLEtBQUFBO0FBQUFBLFVBQTJCQyxHQUFBQSxNQUFBQSxHQUFBQSxDQUFBQSxZQUFBQSxTQUFBQSxDQUFBQSxLQUFBQSxtQkFBQUEsSUFBQUEsSUFBQUE7QUFBQUE7O1VBTTFELE9BQUFSLGVBQUEsRUFKUUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEseUJBQXVCQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxNQUFBQSxLQUFBQSxDQUFBQTtBQUFBQSxRQUFhLEdBQUE7QUFBQTtZQUcxQyxPQUFBRCxlQUFBLEVBRlFDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLHdCQUFzQkEsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsTUFBQUEsTUFBQUEsQ0FBQUE7QUFBQUEsVUFBYyxHQUFBO0FBQUE7VUFDeEMsR0FBQSxDQUFBO0FBQUE7Ozs7OyJ9
