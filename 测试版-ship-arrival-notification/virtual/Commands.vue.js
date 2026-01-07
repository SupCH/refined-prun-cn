import { C } from './prun-css.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  renderSlot,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Commands',
  props: {
    label: { default: 'CMD' },
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.containerCommand,
              ('C' in _ctx ? _ctx.C : unref(C)).forms.cmd,
              ('C' in _ctx ? _ctx.C : unref(C)).forms.formComponent,
            ]),
          },
          [
            createBaseVNode(
              'label',
              {
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.label,
                  ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                  ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
                ]),
              },
              [createBaseVNode('span', null, toDisplayString(_ctx.label), 1)],
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.input,
                  ('C' in _ctx ? _ctx.C : unref(C)).forms.input,
                ]),
              },
              [renderSlot(_ctx.$slots, 'default')],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZHMudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9mb3Jtcy9Db21tYW5kcy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmNvbnN0IHsgbGFiZWwgPSAnQ01EJyB9ID0gZGVmaW5lUHJvcHM8eyBsYWJlbD86IHN0cmluZyB9PigpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJbQy5Gb3JtQ29tcG9uZW50LmNvbnRhaW5lckNvbW1hbmQsIEMuZm9ybXMuY21kLCBDLmZvcm1zLmZvcm1Db21wb25lbnRdXCI+XG4gICAgPGxhYmVsIDpjbGFzcz1cIltDLkZvcm1Db21wb25lbnQubGFiZWwsIEMuZm9udHMuZm9udFJlZ3VsYXIsIEMudHlwZS50eXBlUmVndWxhcl1cIj5cbiAgICAgIDxzcGFuPnt7IGxhYmVsIH19PC9zcGFuPlxuICAgIDwvbGFiZWw+XG4gICAgPGRpdiA6Y2xhc3M9XCJbQy5Gb3JtQ29tcG9uZW50LmlucHV0LCBDLmZvcm1zLmlucHV0XVwiPlxuICAgICAgPHNsb3QgLz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIkMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztRQVlRLE9BQUFBLGVBQUEsRUFQUUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsb0NBQWtDQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxNQUFBQSxNQUFhQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtNQUFxQixHQUFBO0FBQUE7VUFHeEUsT0FBQUQsZUFBQSxFQUZRQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSx5QkFBdUJBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLE1BQUFBLGNBQXFCQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtRQUFrQixHQUFBO0FBQUE7UUFDOUQsR0FBQSxDQUFBO0FBQUE7VUFJVixPQUFBRCxlQUFBLEVBRlFDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLHlCQUF1QkEsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsTUFBQUEsS0FBQUEsQ0FBQUE7QUFBQUEsUUFBYSxHQUFBO0FBQUE7UUFDeEMsR0FBQSxDQUFBO0FBQUE7Ozs7In0=
