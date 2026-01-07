import { C } from './prun-css.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { style: { display: 'block' } };
const _hoisted_2 = {
  'aria-hidden': 'true',
  width: '10',
  height: '10',
  role: 'img',
  fill: 'currentcolor',
  preserveAspectRatio: 'xMidYMid meet',
  viewBox: '0 0 24 24',
  style: { 'vertical-align': 'middle' },
};
const _hoisted_3 = {
  key: 0,
  d: 'M25.422964 22.120933l-12.13774-21.02318L.88681 22.11324z',
};
const _hoisted_4 = {
  key: 1,
  d: 'M.88681 1.097752l12.13774 21.02318L25.422964 1.105446z',
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SortingOrderIcon',
  props: {
    reverse: { type: Boolean },
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).InventorySortControls.order),
            style: { display: 'inline' },
          },
          [
            createBaseVNode('div', _hoisted_1, [
              (openBlock(),
              createElementBlock('svg', _hoisted_2, [
                createBaseVNode('g', null, [
                  _ctx.reverse
                    ? (openBlock(), createElementBlock('path', _hoisted_3))
                    : (openBlock(), createElementBlock('path', _hoisted_4)),
                ]),
              ])),
            ]),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ydGluZ09yZGVySWNvbi52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9pbnYtY3VzdG9tLWl0ZW0tc29ydGluZy9Tb3J0aW5nT3JkZXJJY29uLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuZGVmaW5lUHJvcHM8eyByZXZlcnNlPzogYm9vbGVhbiB9PigpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJDLkludmVudG9yeVNvcnRDb250cm9scy5vcmRlclwiIHN0eWxlPVwiZGlzcGxheTogaW5saW5lXCI+XG4gICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrXCI+XG4gICAgICA8c3ZnXG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgIHdpZHRoPVwiMTBcIlxuICAgICAgICBoZWlnaHQ9XCIxMFwiXG4gICAgICAgIHJvbGU9XCJpbWdcIlxuICAgICAgICBmaWxsPVwiY3VycmVudGNvbG9yXCJcbiAgICAgICAgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkIG1lZXRcIlxuICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgc3R5bGU9XCJ2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlXCI+XG4gICAgICAgIDxnPlxuICAgICAgICAgIDxwYXRoIHYtaWY9XCJyZXZlcnNlXCIgZD1cIk0yNS40MjI5NjQgMjIuMTIwOTMzbC0xMi4xMzc3NC0yMS4wMjMxOEwuODg2ODEgMjIuMTEzMjR6XCIgLz5cbiAgICAgICAgICA8cGF0aCB2LWVsc2UgZD1cIk0uODg2ODEgMS4wOTc3NTJsMTIuMTM3NzQgMjEuMDIzMThMMjUuNDIyOTY0IDEuMTA1NDQ2elwiIC8+XG4gICAgICAgIDwvZz5cbiAgICAgIDwvc3ZnPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiQyIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXNCUSxPQUFBQSxnQkFqQk9DLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLHNCQUFBQSxLQUFBQTtBQUFBQSxRQUE2QixPQUFBLEVBQUEsV0FBQSxTQUFBO0FBQUEsTUFBRSxHQUFBO0FBQUE7V0FnQnBDQyxhQUFBQyxtQkFBQSxPQUFBLFlBQUE7QUFBQSxZQURFQyxnQkFBQSxLQUFBLE1BQUE7QUFBQSxjQURBLEtBQUEsV0FBQUYsVUFBQSxHQUFBQyxtQkFBQSxRQUFBLFVBQUEsTUFBQUQsVUFBQSxHQUFBQyxtQkFBQSxRQUFBLFVBQUE7QUFBQSxZQUR3RSxDQUFBO0FBQUE7Ozs7OzsifQ==
