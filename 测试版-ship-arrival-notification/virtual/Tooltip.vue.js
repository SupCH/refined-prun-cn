import { C } from './prun-css.js';
import { defineComponent, createElementBlock, openBlock } from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = ['data-tooltip', 'data-tooltip-position'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Tooltip',
  props: {
    position: { default: 'right' },
    tooltip: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'span',
          {
            'data-tooltip': _ctx.tooltip,
            'data-tooltip-position': _ctx.position,
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Tooltip.container),
          },
          'ⓘ',
          10,
          _hoisted_1,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcC52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1Rvb2x0aXAudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5leHBvcnQgdHlwZSBUb29sdGlwUG9zaXRpb24gPSAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcCcgfCAnYm90dG9tJztcblxuY29uc3QgeyBwb3NpdGlvbiA9ICdyaWdodCcgfSA9IGRlZmluZVByb3BzPHsgcG9zaXRpb24/OiBUb29sdGlwUG9zaXRpb247IHRvb2x0aXA6IHN0cmluZyB9PigpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHNwYW4gOmRhdGEtdG9vbHRpcD1cInRvb2x0aXBcIiA6ZGF0YS10b29sdGlwLXBvc2l0aW9uPVwicG9zaXRpb25cIiA6Y2xhc3M9XCJDLlRvb2x0aXAuY29udGFpbmVyXCJcbiAgICA+4pOYPC9zcGFuXG4gID5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsidG9vbHRpcCIsInBvc2l0aW9uIiwiQyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7UUFTRyxnQkFBQSxLQUFBO0FBQUEsUUFGb0JBLHlCQUFBQSxLQUFBQTtBQUFBQSxRQUFpQ0MsT0FBQUEsZ0JBQWtCQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxRQUFBQSxTQUFBQTtBQUFBQSxNQUFtQixHQUFBLEtBQUEsSUFBQSxVQUFBO0FBQUEsSUFDdkY7QUFBQTs7In0=
