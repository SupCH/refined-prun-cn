import { C } from './prun-css.js';
import _sfc_main$1 from './ContextControlsItem.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ContextControls',
  props: {
    items: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ContextControls.container),
          },
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(_ctx.items, item => {
                return (
                  openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: item.cmd,
                      cmd: item.cmd,
                      label: item.label,
                    },
                    null,
                    8,
                    ['cmd', 'label'],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dENvbnRyb2xzLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQ29udGV4dENvbnRyb2xzLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IENvbnRleHRDb250cm9sc0l0ZW0gZnJvbSAnQHNyYy9jb21wb25lbnRzL0NvbnRleHRDb250cm9sc0l0ZW0udnVlJztcblxuaW50ZXJmYWNlIEl0ZW0ge1xuICBjbWQ6IHN0cmluZztcbiAgbGFiZWw/OiBzdHJpbmc7XG59XG5cbmRlZmluZVByb3BzPHsgaXRlbXM6IEl0ZW1bXSB9PigpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJDLkNvbnRleHRDb250cm9scy5jb250YWluZXJcIj5cbiAgICA8Q29udGV4dENvbnRyb2xzSXRlbVxuICAgICAgdi1mb3I9XCJpdGVtIGluIGl0ZW1zXCJcbiAgICAgIDprZXk9XCJpdGVtLmNtZFwiXG4gICAgICA6Y21kPVwiaXRlbS5jbWRcIlxuICAgICAgOmxhYmVsPVwiaXRlbS5sYWJlbFwiIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJDIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBa0JRLE9BQUFBLGdCQU5PQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxnQkFBQUEsU0FBQUE7QUFBQUEsTUFBMkIsR0FBQTtBQUFBOztZQUtkLEtBQUEsS0FBQTtBQUFBLFlBRlgsS0FBQSxLQUFBO0FBQUEsWUFDQSxPQUFBLEtBQUE7QUFBQSxVQUNFLEdBQUEsTUFBQSxHQUFBLENBQUEsT0FBQSxPQUFBLENBQUE7QUFBQTs7Ozs7In0=
