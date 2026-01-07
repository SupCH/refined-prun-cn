import { C } from './prun-css.js';
import fa from './font-awesome.module.css.js';
import { toDisplayString, normalizeStyle, normalizeClass } from './shared.esm-bundler.js';
import { defineComponent, createElementBlock, openBlock } from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'TileControlsButton',
  props: {
    icon: {},
    marginTop: { default: 3 },
    onClick: { type: Function, default: () => {} },
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'button',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).TileControls.control,
              unref(fa).solid,
              _ctx.$style.button,
            ]),
            style: normalizeStyle({ marginTop: _ctx.marginTop + 'px' }),
            onClick:
              _cache[0] ||
              (_cache[0] = //@ts-ignore
                (...args) => _ctx.onClick && _ctx.onClick(...args)),
          },
          toDisplayString(_ctx.icon),
          7,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGlsZUNvbnRyb2xzQnV0dG9uLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1RpbGVDb250cm9sc0J1dHRvbi52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBmYSBmcm9tICdAc3JjL3V0aWxzL2ZvbnQtYXdlc29tZS5tb2R1bGUuY3NzJztcblxuY29uc3QgeyBvbkNsaWNrID0gKCkgPT4ge30sIG1hcmdpblRvcCA9IDMgfSA9IGRlZmluZVByb3BzPHtcbiAgaWNvbjogc3RyaW5nO1xuICBtYXJnaW5Ub3A/OiBudW1iZXI7XG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xufT4oKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b25cbiAgICA6Y2xhc3M9XCJbQy5UaWxlQ29udHJvbHMuY29udHJvbCwgZmEuc29saWQsICRzdHlsZS5idXR0b25dXCJcbiAgICA6c3R5bGU9XCJ7IG1hcmdpblRvcDogbWFyZ2luVG9wICsgJ3B4JyB9XCJcbiAgICBAY2xpY2s9XCJvbkNsaWNrXCI+XG4gICAge3sgaWNvbiB9fVxuICA8L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uYnV0dG9uIHtcbiAgbWFyZ2luLXRvcDogM3B4O1xuICBwYWRkaW5nOiAzcHg7XG4gIHdpZHRoOiAxOHB4O1xuICBoZWlnaHQ6IDE4cHg7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX25vcm1hbGl6ZVN0eWxlIiwiX3RvRGlzcGxheVN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztRQWdCVyxPQUFBQSxlQUFBLEVBSkVDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO1FBQStDLE9BQUFDLGVBQUEsRUFBQSxXQUFBLEtBQUEsWUFBQSxNQUFBO0FBQUEsUUFDMUIsU0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUE7QUFBQSxRQUN4QixJQUFBLFNBQUEsS0FBQSxXQUFBLEtBQUEsUUFBQSxHQUFBLElBQUE7QUFBQSxNQUFFLEdBQUFDLGdCQUFBLEtBQUEsSUFBQSxHQUFBLENBQUE7QUFBQSxJQUNEO0FBQUE7OyJ9
