import { withModifiers } from './runtime-dom.esm-bundler.js';
import fa from './font-awesome.module.css.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeStyle, normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'IconMarker',
  props: {
    color: {},
    marker: {},
    onNext: { type: Function },
    onPrevious: { type: Function },
  },
  setup(__props) {
    const boxStyle = computed(() => ({
      display: __props.marker !== void 0 ? 'block' : void 0,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.container),
            onClick:
              _cache[0] ||
              (_cache[0] = withModifiers(
                //@ts-ignore
                (...args) => _ctx.onNext && _ctx.onNext(...args),
                ['left', 'prevent', 'stop'],
              )),
            onContextmenu:
              _cache[1] ||
              (_cache[1] = withModifiers(
                //@ts-ignore
                (...args) => _ctx.onPrevious && _ctx.onPrevious(...args),
                ['right', 'prevent', 'stop'],
              )),
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.box),
                style: normalizeStyle(unref(boxStyle)),
              },
              [
                _ctx.marker
                  ? (openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: normalizeClass([unref(fa).solid, _ctx.$style.icon]),
                        style: normalizeStyle({ color: _ctx.color }),
                      },
                      toDisplayString(_ctx.marker),
                      7,
                    ))
                  : createCommentVNode('', true),
              ],
              6,
            ),
          ],
          34,
        )
      );
    };
  },
});
export { _sfc_main as default };
