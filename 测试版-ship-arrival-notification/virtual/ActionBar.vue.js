import { C } from './prun-css.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  useSlots,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createBlock,
  resolveDynamicComponent,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ActionBar',
  setup(__props) {
    const slots = useSlots();
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ActionBar.container),
          },
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(slots.default(), slot => {
                return (
                  openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: unref(objectId)(slot),
                      class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ActionBar.element),
                    },
                    [(openBlock(), createBlock(resolveDynamicComponent(slot)))],
                    2,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uQmFyLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQWN0aW9uQmFyLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgb2JqZWN0SWQgfSBmcm9tICdAc3JjL3V0aWxzL29iamVjdC1pZCc7XG5cbmNvbnN0IHNsb3RzID0gZGVmaW5lU2xvdHM8e1xuICBkZWZhdWx0KCk6IFZOb2RlW107XG59PigpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJDLkFjdGlvbkJhci5jb250YWluZXJcIj5cbiAgICA8ZGl2IHYtZm9yPVwic2xvdCBpbiBzbG90cy5kZWZhdWx0KClcIiA6a2V5PVwib2JqZWN0SWQoc2xvdClcIiA6Y2xhc3M9XCJDLkFjdGlvbkJhci5lbGVtZW50XCI+XG4gICAgICA8Y29tcG9uZW50IDppcz1cInNsb3RcIiAvPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX3VzZVNsb3RzIiwiX25vcm1hbGl6ZUNsYXNzIiwiQyIsIl91bnJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQSxVQUFBLFFBQUFBLFNBQUE7OztRQVVRLE9BQUFDLGdCQUpPQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxVQUFBQSxTQUFBQTtBQUFBQSxNQUFxQixHQUFBO0FBQUE7O1lBRzFCLEtBQUFDLE1BQUEsUUFBQSxFQUFBLElBQUE7QUFBQSxZQUZrRCxPQUFBRixnQkFBV0MsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsVUFBQUEsT0FBQUE7QUFBQUEsVUFBbUIsR0FBQTtBQUFBO1VBQ2hFLEdBQUEsQ0FBQTtBQUFBOzs7OzsifQ==
