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
