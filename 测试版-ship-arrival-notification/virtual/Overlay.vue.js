import { C } from './prun-css.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createBlock,
  mergeProps,
  resolveDynamicComponent,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Overlay',
  props: {
    child: {},
    onClose: { type: Function },
    props: { default: () => ({}) },
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Overlay.overlay),
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Overlay.close),
                onClick:
                  _cache[0] ||
                  (_cache[0] = //@ts-ignore
                    (...args) => _ctx.onClose && _ctx.onClose(...args)),
              },
              null,
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Overlay.children),
              },
              [
                (openBlock(),
                createBlock(
                  resolveDynamicComponent(_ctx.child),
                  mergeProps(_ctx.props, { onClose: _ctx.onClose }),
                  null,
                  16,
                  ['onClose'],
                )),
              ],
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Overlay.close),
                onClick:
                  _cache[1] ||
                  (_cache[1] = //@ts-ignore
                    (...args) => _ctx.onClose && _ctx.onClose(...args)),
              },
              null,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3ZlcmxheS52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL092ZXJsYXkudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5jb25zdCB7IHByb3BzID0ge30gfSA9IGRlZmluZVByb3BzPHtcbiAgY2hpbGQ6IENvbXBvbmVudDtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgcHJvcHM/OiBvYmplY3QgfCBudWxsO1xufT4oKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiQy5PdmVybGF5Lm92ZXJsYXlcIj5cbiAgICA8ZGl2IDpjbGFzcz1cIkMuT3ZlcmxheS5jbG9zZVwiIEBjbGljaz1cIm9uQ2xvc2VcIiAvPlxuICAgIDxkaXYgOmNsYXNzPVwiQy5PdmVybGF5LmNoaWxkcmVuXCI+XG4gICAgICA8Q29tcG9uZW50IDppcz1cImNoaWxkXCIgdi1iaW5kPVwicHJvcHNcIiBAY2xvc2U9XCJvbkNsb3NlXCIgLz5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IDpjbGFzcz1cIkMuT3ZlcmxheS5jbG9zZVwiIEBjbGljaz1cIm9uQ2xvc2VcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiQyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7UUFlUSxPQUFBQSxnQkFOT0MsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsUUFBQUEsT0FBQUE7QUFBQUEsTUFBaUIsR0FBQTtBQUFBO1VBQ3FCLE9BQUFELGdCQUFwQ0MsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsUUFBQUEsS0FBQUE7QUFBQUEsVUFBZSxTQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQTtBQUFBLFVBQVEsSUFBQSxTQUFBLEtBQUEsV0FBQSxLQUFBLFFBQUEsR0FBQSxJQUFBO0FBQUEsUUFBRSxHQUFBLE1BQUEsQ0FBQTtBQUFBO1VBR2hDLE9BQUFELGdCQUZPQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxRQUFBQSxRQUFBQTtBQUFBQSxRQUFrQixHQUFBO0FBQUE7UUFDd0IsR0FBQSxDQUFBO0FBQUE7VUFFTixPQUFBRCxnQkFBcENDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLFFBQUFBLEtBQUFBO0FBQUFBLFVBQWUsU0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUE7QUFBQSxVQUFRLElBQUEsU0FBQSxLQUFBLFdBQUEsS0FBQSxRQUFBLEdBQUEsSUFBQTtBQUFBLFFBQUUsR0FBQSxNQUFBLENBQUE7QUFBQTs7OzsifQ==
