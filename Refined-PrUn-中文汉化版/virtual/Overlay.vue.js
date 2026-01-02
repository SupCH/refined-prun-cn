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
