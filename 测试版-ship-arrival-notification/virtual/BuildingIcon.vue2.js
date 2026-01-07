import { C } from './prun-css.js';
import { showBuffer } from './buffers.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = ['title'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'BuildingIcon',
  props: {
    amount: {},
    ticker: {},
  },
  setup(__props) {
    const amountClasses = [
      C.MaterialIcon.indicator,
      C.MaterialIcon.neutral,
      C.MaterialIcon.typeVerySmall,
    ];
    function onClick() {
      showBuffer(`BUI ${__props.ticker}`);
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).BuildingIcon.container,
              _ctx.$style.container,
            ]),
            title: _ctx.ticker,
            onClick,
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(
                  ('C' in _ctx ? _ctx.C : unref(C)).BuildingIcon.tickerContainer,
                ),
              },
              [
                createBaseVNode(
                  'span',
                  {
                    class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).BuildingIcon.ticker),
                  },
                  toDisplayString(_ctx.ticker),
                  3,
                ),
              ],
              2,
            ),
            _ctx.amount
              ? (openBlock(),
                createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: normalizeClass([
                      ('C' in _ctx ? _ctx.C : unref(C)).MaterialIcon.indicatorContainer,
                    ]),
                  },
                  [
                    createBaseVNode(
                      'div',
                      {
                        class: normalizeClass(amountClasses),
                      },
                      toDisplayString(_ctx.amount),
                      1,
                    ),
                  ],
                  2,
                ))
              : createCommentVNode('', true),
          ],
          10,
          _hoisted_1,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVpbGRpbmdJY29uLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0J1aWxkaW5nSWNvbi52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHNob3dCdWZmZXIgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYnVmZmVycyc7XG5cbmNvbnN0IHsgdGlja2VyIH0gPSBkZWZpbmVQcm9wczx7XG4gIGFtb3VudD86IG51bWJlcjtcbiAgdGlja2VyOiBzdHJpbmc7XG59PigpO1xuXG5jb25zdCBhbW91bnRDbGFzc2VzID0gW1xuICBDLk1hdGVyaWFsSWNvbi5pbmRpY2F0b3IsXG4gIEMuTWF0ZXJpYWxJY29uLm5ldXRyYWwsXG4gIEMuTWF0ZXJpYWxJY29uLnR5cGVWZXJ5U21hbGwsXG5dO1xuXG5mdW5jdGlvbiBvbkNsaWNrKCk6IHZvaWQge1xuICBzaG93QnVmZmVyKGBCVUkgJHt0aWNrZXJ9YCk7XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IDpjbGFzcz1cIltDLkJ1aWxkaW5nSWNvbi5jb250YWluZXIsICRzdHlsZS5jb250YWluZXJdXCIgOnRpdGxlPVwidGlja2VyXCIgQGNsaWNrPVwib25DbGlja1wiPlxuICAgIDxkaXYgOmNsYXNzPVwiQy5CdWlsZGluZ0ljb24udGlja2VyQ29udGFpbmVyXCI+XG4gICAgICA8c3BhbiA6Y2xhc3M9XCJDLkJ1aWxkaW5nSWNvbi50aWNrZXJcIj57eyB0aWNrZXIgfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiB2LWlmPVwiYW1vdW50XCIgOmNsYXNzPVwiW0MuTWF0ZXJpYWxJY29uLmluZGljYXRvckNvbnRhaW5lcl1cIj5cbiAgICAgIDxkaXYgOmNsYXNzPVwiYW1vdW50Q2xhc3Nlc1wiPnt7IGFtb3VudCB9fTwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uY29udGFpbmVyIHtcbiAgaGVpZ2h0OiAzNHB4O1xuICB3aWR0aDogMzRweDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgcmdiKDUyLCAxNDAsIDE2MCksIHJnYig3NywgMTY1LCAxODUpKTtcbiAgY29sb3I6IHJnYigxNzksIDI1NSwgMjU1KTtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiQyIsInRpY2tlciIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlQ29tbWVudFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBUUEsVUFBQSxnQkFBQTtBQUFBLE1BQXNCLEVBQUEsYUFBQTtBQUFBLE1BQ0wsRUFBQSxhQUFBO0FBQUEsTUFDQSxFQUFBLGFBQUE7QUFBQSxJQUNBO0FBR2pCLGFBQUEsVUFBQTtBQUNFLGlCQUFBLE9BQUEsUUFBQSxNQUFBLEVBQUE7QUFBQSxJQUEwQjs7O1FBWXBCLE9BQUFBLGVBQUEsRUFQUUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7UUFBMEMsT0FBQSxLQUFBO0FBQUEsUUFBV0M7QUFBQUEsTUFBUyxHQUFBO0FBQUE7VUFHcEUsT0FBQUYsZ0JBRk9DLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLGFBQUFBLGVBQUFBO0FBQUFBLFFBQThCLEdBQUE7QUFBQTtZQUNlLE9BQUFELGdCQUExQ0MsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsYUFBQUEsTUFBQUE7QUFBQUEsVUFBcUIsR0FBQUUsZ0JBQUEsS0FBQSxNQUFBLEdBQUEsQ0FBQTtBQUFBLFFBQVcsR0FBQSxDQUFBO0FBQUE7VUFJMUMsS0FBQTtBQUFBLGtDQUZzQkYsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsYUFBQUEsa0JBQUFBLENBQUFBO0FBQUFBLFFBQWlDLEdBQUE7QUFBQTtZQUNiLE9BQUFELGVBQUEsYUFBQTtBQUFBLFVBQXBCLEdBQUFHLGdCQUFBLEtBQUEsTUFBQSxHQUFBLENBQUE7QUFBQSxRQUFXLEdBQUEsQ0FBQSxLQUFBQyxtQkFBQSxJQUFBLElBQUE7QUFBQTs7OzsifQ==
