import { useCssModule, withModifiers } from './runtime-dom.esm-bundler.js';
import { C } from './prun-css.js';
import { showBuffer } from './buffers.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  renderSlot,
  Fragment,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = ['href'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'PrunLink',
  props: {
    autoSubmit: { type: Boolean, default: true },
    command: {},
    href: {},
    inline: { type: Boolean },
  },
  setup(__props) {
    const $style = useCssModule();
    const classes = computed(() => ({
      [C.Link.link]: true,
      [$style.block]: !__props.inline,
      [$style.inline]: __props.inline,
    }));
    return (_ctx, _cache) => {
      return _ctx.href
        ? (openBlock(),
          createElementBlock(
            'a',
            {
              key: 0,
              href: _ctx.href,
              class: normalizeClass(unref(classes)),
              target: '_blank',
              rel: 'noreferrer',
            },
            [
              _ctx.$slots.default
                ? renderSlot(_ctx.$slots, 'default', { key: 0 })
                : (openBlock(),
                  createElementBlock(
                    Fragment,
                    { key: 1 },
                    [createTextVNode(toDisplayString(_ctx.href), 1)],
                    64,
                  )),
            ],
            10,
            _hoisted_1,
          ))
        : (openBlock(),
          createElementBlock(
            'div',
            {
              key: 1,
              class: normalizeClass(unref(classes)),
              onClick:
                _cache[0] ||
                (_cache[0] = withModifiers(
                  () => unref(showBuffer)(_ctx.command, { autoSubmit: _ctx.autoSubmit }),
                  ['stop'],
                )),
            },
            [
              _ctx.$slots.default
                ? renderSlot(_ctx.$slots, 'default', { key: 0 })
                : (openBlock(),
                  createElementBlock(
                    Fragment,
                    { key: 1 },
                    [createTextVNode(toDisplayString(_ctx.command), 1)],
                    64,
                  )),
            ],
            2,
          ));
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJ1bkxpbmsudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvUHJ1bkxpbmsudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuXG5jb25zdCB7IGlubGluZSwgYXV0b1N1Ym1pdCA9IHRydWUgfSA9IGRlZmluZVByb3BzPHtcbiAgYXV0b1N1Ym1pdD86IGJvb2xlYW47XG4gIGNvbW1hbmQ/OiBzdHJpbmc7XG4gIGhyZWY/OiBzdHJpbmc7XG4gIGlubGluZT86IGJvb2xlYW47XG59PigpO1xuXG5jb25zdCAkc3R5bGUgPSB1c2VDc3NNb2R1bGUoKTtcbmNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICBbQy5MaW5rLmxpbmtdOiB0cnVlLFxuICBbJHN0eWxlLmJsb2NrXTogIWlubGluZSxcbiAgWyRzdHlsZS5pbmxpbmVdOiBpbmxpbmUsXG59KSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YSB2LWlmPVwiaHJlZlwiIDpocmVmPVwiaHJlZlwiIDpjbGFzcz1cImNsYXNzZXNcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+XG4gICAgPHNsb3Qgdi1pZj1cIiRzbG90cy5kZWZhdWx0XCI+PC9zbG90PlxuICAgIDx0ZW1wbGF0ZSB2LWVsc2U+e3sgaHJlZiB9fTwvdGVtcGxhdGU+XG4gIDwvYT5cbiAgPGRpdiB2LWVsc2UgOmNsYXNzPVwiY2xhc3Nlc1wiIEBjbGljay5zdG9wPVwiKCkgPT4gc2hvd0J1ZmZlcihjb21tYW5kISwgeyBhdXRvU3VibWl0IH0pXCI+XG4gICAgPHNsb3Qgdi1pZj1cIiRzbG90cy5kZWZhdWx0XCI+PC9zbG90PlxuICAgIDx0ZW1wbGF0ZSB2LWVsc2U+e3sgY29tbWFuZCB9fTwvdGVtcGxhdGU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5ibG9jayB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uaW5saW5lIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJocmVmIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfd2l0aE1vZGlmaWVycyIsIl91bnJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQVVBLFVBQUEsU0FBQSxhQUFBO0FBQ0EsVUFBQSxVQUFBLFNBQUEsT0FBQTtBQUFBLE1BQWdDLENBQUEsRUFBQSxLQUFBLElBQUEsR0FBQTtBQUFBLE1BQ2YsQ0FBQSxPQUFBLEtBQUEsR0FBQSxDQUFBLFFBQUE7QUFBQSxNQUNFLENBQUEsT0FBQSxNQUFBLEdBQUEsUUFBQTtBQUFBLElBQ0EsRUFBQTs7O1FBUWIsS0FBQTtBQUFBO1FBSGtCQSxPQUFBQSxlQUFBQSxNQUFBQSxPQUFBQSxDQUFBQTtBQUFBQSxRQUFxQixRQUFBO0FBQUEsUUFBUyxLQUFBO0FBQUEsTUFBYSxHQUFBO0FBQUE7VUFFekJDLGdCQUFBQyxnQkFBQSxLQUFBLElBQUEsR0FBQSxDQUFBO0FBQUEsUUFBZCxHQUFBLEVBQUE7QUFBQTtRQUtwQixLQUFBO0FBQUE7UUFIcUIsU0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQUMsY0FBQSxNQUFBQyxNQUFBLFVBQUEsRUFBQSxLQUFBLFNBQUEsRUFBQSxZQUFBLEtBQUEsWUFBQSxHQUFBLENBQUEsTUFBQSxDQUFBO0FBQUEsTUFBc0QsR0FBQTtBQUFBO1VBRXRDSCxnQkFBQUMsZ0JBQUEsS0FBQSxPQUFBLEdBQUEsQ0FBQTtBQUFBLFFBQWQsR0FBQSxFQUFBO0FBQUE7Ozs7In0=
