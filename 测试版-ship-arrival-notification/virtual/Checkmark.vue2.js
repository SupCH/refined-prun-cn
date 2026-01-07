import fa from './font-awesome.module.css.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Checkmark',
  props: {
    task: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.checkmark),
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass([unref(fa).regular, _ctx.$style.circle]),
              },
              toDisplayString(''),
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass([
                  _ctx.$style.mark,
                  _ctx.task.completed
                    ? [unref(fa).solid, _ctx.$style.markCompleted]
                    : unref(fa).regular,
                ]),
              },
              toDisplayString(_ctx.task.completed ? '' : _ctx.task.recurring ? '' : ''),
              3,
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2ttYXJrLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvVE9ETy9DaGVja21hcmsudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgZmEgZnJvbSAnQHNyYy91dGlscy9mb250LWF3ZXNvbWUubW9kdWxlLmNzcyc7XG5cbmRlZmluZVByb3BzPHsgdGFzazogVXNlckRhdGEuVGFzayB9PigpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuY2hlY2ttYXJrXCI+XG4gICAgPGRpdiA6Y2xhc3M9XCJbZmEucmVndWxhciwgJHN0eWxlLmNpcmNsZV1cIj5cbiAgICAgIHt7ICdcXHVmMTExJyB9fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgOmNsYXNzPVwiWyRzdHlsZS5tYXJrLCB0YXNrLmNvbXBsZXRlZCA/IFtmYS5zb2xpZCwgJHN0eWxlLm1hcmtDb21wbGV0ZWRdIDogZmEucmVndWxhcl1cIj5cbiAgICAgIHt7IHRhc2suY29tcGxldGVkID8gJ1xcdWYwNTgnIDogdGFzay5yZWN1cnJpbmcgPyAnXFx1ZjE5MicgOiAnXFx1ZjA1OCcgfX1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLmNoZWNrbWFyayB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZy10b3A6IDVweDtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4uY2lyY2xlIHtcbiAgZ3JpZC1hcmVhOiAxIC8gMTtcbn1cblxuLm1hcmsge1xuICBncmlkLWFyZWE6IDEgLyAxO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgZWFzZS1pbi1vdXQ7XG4gIG9wYWNpdHk6IDA7XG59XG5cbi5jaGVja21hcms6aG92ZXIgLm1hcmsge1xuICBvcGFjaXR5OiAxO1xufVxuXG4ubWFya0NvbXBsZXRlZCB7XG4gIG9wYWNpdHk6IDE7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfbm9ybWFsaXplQ2xhc3MiLCIkc3R5bGUiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3VucmVmIiwidGFzayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7MEJBT0VBLG1CQU9NLE9BQUE7QUFBQSxRQVBBLE9BQUtDLGVBQUVDLEtBQUFBLE9BQU8sU0FBUztBQUFBLE1BQUE7UUFDM0JDLGdCQUVNLE9BQUE7QUFBQSxVQUZBLHVCQUFRQyxNQUFBLEVBQUEsRUFBRyxTQUFTRixLQUFBQSxPQUFPLE1BQU0sQ0FBQTtBQUFBLFFBQUEsbUJBQ2xDLEdBQVEsR0FBQSxDQUFBO0FBQUEsUUFFYkMsZ0JBRU0sT0FBQTtBQUFBLFVBRkEsdUJBQVFELEtBQUFBLE9BQU8sTUFBTUcsS0FBQUEsS0FBSyxZQUFTLENBQUlELFVBQUcsT0FBT0YsS0FBQUEsT0FBTyxhQUFhLElBQUlFLE1BQUEsRUFBQSxFQUFHLE9BQU8sQ0FBQTtBQUFBLFFBQUEsR0FDcEZDLGdCQUFBQSxLQUFBQSxLQUFLLFlBQVMsTUFBY0EsS0FBQUEsS0FBSyxZQUFTLE1BQUEsR0FBQSxHQUFBLENBQUE7QUFBQSxNQUFBOzs7OyJ9
