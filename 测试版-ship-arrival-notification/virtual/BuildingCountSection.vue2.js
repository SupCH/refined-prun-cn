import { C } from './prun-css.js';
import { sitesStore } from './sites.js';
import BuildingIcon from './BuildingIcon.vue.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'BuildingCountSection',
  props: {
    naturalId: {},
  },
  setup(__props) {
    const buildings = computed(() => {
      const totals = /* @__PURE__ */ new Map();
      const buildings2 = sitesStore.getByPlanetNaturalId(__props.naturalId)?.platforms ?? [];
      for (const building of buildings2) {
        const ticker = building.module.reactorTicker;
        totals.set(ticker, (totals.get(ticker) ?? 0) + 1);
      }
      const keys = [...totals.keys()];
      keys.sort();
      return keys.map(x => [x, totals.get(x)]);
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode(
              'h2',
              {
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).Site.header,
                  ('C' in _ctx ? _ctx.C : unref(C)).ui.header2,
                  ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                ]),
              },
              'Buildings',
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.list),
              },
              [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(unref(buildings), building => {
                    return (
                      openBlock(),
                      createBlock(
                        BuildingIcon,
                        {
                          key: building[0],
                          ticker: building[0],
                          amount: building[1],
                        },
                        null,
                        8,
                        ['ticker', 'amount'],
                      )
                    );
                  }),
                  128,
                )),
              ],
              2,
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVpbGRpbmdDb3VudFNlY3Rpb24udnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2JzLWJ1aWxkaW5nLWxpc3QvQnVpbGRpbmdDb3VudFNlY3Rpb24udnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBzaXRlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NpdGVzJztcbmltcG9ydCBCdWlsZGluZ0ljb24gZnJvbSAnQHNyYy9jb21wb25lbnRzL0J1aWxkaW5nSWNvbi52dWUnO1xuXG5jb25zdCB7IG5hdHVyYWxJZCB9ID0gZGVmaW5lUHJvcHM8eyBuYXR1cmFsSWQ6IHN0cmluZyB9PigpO1xuXG5jb25zdCBidWlsZGluZ3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHRvdGFscyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gIGNvbnN0IGJ1aWxkaW5ncyA9IHNpdGVzU3RvcmUuZ2V0QnlQbGFuZXROYXR1cmFsSWQobmF0dXJhbElkKT8ucGxhdGZvcm1zID8/IFtdO1xuICBmb3IgKGNvbnN0IGJ1aWxkaW5nIG9mIGJ1aWxkaW5ncykge1xuICAgIGNvbnN0IHRpY2tlciA9IGJ1aWxkaW5nLm1vZHVsZS5yZWFjdG9yVGlja2VyO1xuICAgIHRvdGFscy5zZXQodGlja2VyLCAodG90YWxzLmdldCh0aWNrZXIpID8/IDApICsgMSk7XG4gIH1cbiAgY29uc3Qga2V5cyA9IFsuLi50b3RhbHMua2V5cygpXTtcbiAga2V5cy5zb3J0KCk7XG4gIHJldHVybiBrZXlzLm1hcCh4ID0+IFt4LCB0b3RhbHMuZ2V0KHgpIV0gYXMgW3N0cmluZywgbnVtYmVyXSk7XG59KTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxoMiA6Y2xhc3M9XCJbQy5TaXRlLmhlYWRlciwgQy51aS5oZWFkZXIyLCBDLmZvbnRzLmZvbnRSZWd1bGFyXVwiPkJ1aWxkaW5nczwvaDI+XG4gIDxkaXYgOmNsYXNzPVwiJHN0eWxlLmxpc3RcIj5cbiAgICA8QnVpbGRpbmdJY29uXG4gICAgICB2LWZvcj1cImJ1aWxkaW5nIGluIGJ1aWxkaW5nc1wiXG4gICAgICA6a2V5PVwiYnVpbGRpbmdbMF1cIlxuICAgICAgOnRpY2tlcj1cImJ1aWxkaW5nWzBdXCJcbiAgICAgIDphbW91bnQ9XCJidWlsZGluZ1sxXVwiIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5saXN0IHtcbiAgcGFkZGluZzogNXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogNXB4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBTUEsVUFBQSxZQUFBLFNBQUEsTUFBQTtBQUNFLFlBQUEsU0FBQSxvQkFBQSxJQUFBO0FBQ0EsWUFBQSxhQUFBLFdBQUEscUJBQUEsUUFBQSxTQUFBLEdBQUEsYUFBQSxDQUFBO0FBQ0EsaUJBQUEsWUFBQSxZQUFBO0FBQ0UsY0FBQSxTQUFBLFNBQUEsT0FBQTtBQUNBLGVBQUEsSUFBQSxTQUFBLE9BQUEsSUFBQSxNQUFBLEtBQUEsS0FBQSxDQUFBO0FBQUEsTUFBZ0Q7QUFFbEQsWUFBQSxPQUFBLENBQUEsR0FBQSxPQUFBLEtBQUEsQ0FBQTtBQUNBLFdBQUEsS0FBQTtBQUNBLGFBQUEsS0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsT0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsSUFBNEQsQ0FBQTs7OztVQUtrQixPQUFBQSxlQUFBLEVBQWpFQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxpQkFBZUEsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsR0FBQUEsVUFBY0EsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7UUFBbUIsR0FBQSxhQUFBLENBQUE7QUFBQSxRQUFZQyxnQkFBQSxPQUFBO0FBQUEsVUFPbkUsT0FBQUYsZUFBQSxLQUFBLE9BQUEsSUFBQTtBQUFBLFFBTmtCLEdBQUE7QUFBQTs7Y0FLSSxLQUFBLFNBQUEsQ0FBQTtBQUFBLGNBRlYsUUFBQSxTQUFBLENBQUE7QUFBQSxjQUNHLFFBQUEsU0FBQSxDQUFBO0FBQUEsWUFDQSxHQUFBLE1BQUEsR0FBQSxDQUFBLFVBQUEsUUFBQSxDQUFBO0FBQUE7Ozs7OzsifQ==
