import _sfc_main$1 from './SortCriteria.vue.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  Fragment,
  renderList,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'InventorySortControls',
  props: {
    activeSort: {},
    onAddClick: { type: Function },
    onModeClick: { type: Function },
    reverse: { type: Boolean },
    sorting: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(_ctx.sorting, mode => {
                return (
                  openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: unref(objectId)(mode),
                      label: mode.label,
                      active: mode.label === _ctx.activeSort,
                      reverse: _ctx.reverse,
                      onClick: $event => _ctx.onModeClick(mode.label),
                    },
                    null,
                    8,
                    ['label', 'active', 'reverse', 'onClick'],
                  )
                );
              }),
              128,
            )),
            createVNode(
              _sfc_main$1,
              {
                label: '+',
                onClick: _ctx.onAddClick,
              },
              null,
              8,
              ['onClick'],
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52ZW50b3J5U29ydENvbnRyb2xzLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2ludi1jdXN0b20taXRlbS1zb3J0aW5nL0ludmVudG9yeVNvcnRDb250cm9scy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBTb3J0Q3JpdGVyaWEgZnJvbSAnLi9Tb3J0Q3JpdGVyaWEudnVlJztcbmltcG9ydCB7IG9iamVjdElkIH0gZnJvbSAnQHNyYy91dGlscy9vYmplY3QtaWQnO1xuXG5kZWZpbmVQcm9wczx7XG4gIGFjdGl2ZVNvcnQ/OiBzdHJpbmc7XG4gIG9uQWRkQ2xpY2s6ICgpID0+IHZvaWQ7XG4gIG9uTW9kZUNsaWNrOiAoc29ydGluZzogc3RyaW5nKSA9PiB2b2lkO1xuICByZXZlcnNlPzogYm9vbGVhbjtcbiAgc29ydGluZzogVXNlckRhdGEuU29ydGluZ01vZGVbXTtcbn0+KCk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8U29ydENyaXRlcmlhXG4gICAgdi1mb3I9XCJtb2RlIGluIHNvcnRpbmdcIlxuICAgIDprZXk9XCJvYmplY3RJZChtb2RlKVwiXG4gICAgOmxhYmVsPVwibW9kZS5sYWJlbFwiXG4gICAgOmFjdGl2ZT1cIm1vZGUubGFiZWwgPT09IGFjdGl2ZVNvcnRcIlxuICAgIDpyZXZlcnNlPVwicmV2ZXJzZVwiXG4gICAgQGNsaWNrPVwib25Nb2RlQ2xpY2sobW9kZS5sYWJlbClcIiAvPlxuICA8U29ydENyaXRlcmlhIGxhYmVsPVwiK1wiIEBjbGljaz1cIm9uQWRkQ2xpY2tcIiAvPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJzb3J0aW5nIiwiX2NyZWF0ZUJsb2NrIiwiU29ydENyaXRlcmlhIiwiX3VucmVmIiwiYWN0aXZlU29ydCIsInJldmVyc2UiLCJvbk1vZGVDbGljayIsIl9jcmVhdGVWTm9kZSIsIm9uQWRkQ2xpY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBY0VBLG1CQU1xQ0MsVUFBQSxNQUFBQyxXQUxwQkMsS0FBQUEsU0FBTyxDQUFmLFNBQUk7OEJBRGJDLFlBTXFDQyxhQUFBO0FBQUEsWUFKbEMsS0FBS0MsTUFBQSxRQUFBLEVBQVMsSUFBSTtBQUFBLFlBQ2xCLE9BQU8sS0FBSztBQUFBLFlBQ1osUUFBUSxLQUFLLFVBQVVDLEtBQUFBO0FBQUFBLFlBQ3ZCLFNBQVNDLEtBQUFBO0FBQUFBLFlBQ1QsU0FBSyxDQUFBLFdBQUVDLEtBQUFBLFlBQVksS0FBSyxLQUFLO0FBQUEsVUFBQTs7UUFDaENDLFlBQThDTCxhQUFBO0FBQUEsVUFBaEMsT0FBTTtBQUFBLFVBQUssU0FBT00sS0FBQUE7QUFBQUEsUUFBQUE7Ozs7OyJ9
