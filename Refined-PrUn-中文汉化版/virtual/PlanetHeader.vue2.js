import _sfc_main$1 from './DaysCell.vue.js';
import { showBuffer } from './buffers.js';
import _sfc_main$2 from './PrunButton.vue.js';
import { countDays } from './utils5.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  createCommentVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'PlanetHeader',
  props: {
    burn: {},
    hasMinimize: { type: Boolean },
    minimized: { type: Boolean },
    onClick: { type: Function },
  },
  setup(__props) {
    const days = computed(() => countDays(__props.burn.burn));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'tr',
          {
            class: normalizeClass(_ctx.$style.row),
          },
          [
            createBaseVNode(
              'td',
              {
                colspan: '4',
                class: normalizeClass(_ctx.$style.cell),
                onClick:
                  _cache[0] ||
                  (_cache[0] = //@ts-ignore
                    (...args) => _ctx.onClick && _ctx.onClick(...args)),
              },
              [
                _ctx.hasMinimize
                  ? (openBlock(),
                    createElementBlock(
                      'span',
                      {
                        key: 0,
                        class: normalizeClass(_ctx.$style.minimize),
                      },
                      toDisplayString(_ctx.minimized ? '+' : '-'),
                      3,
                    ))
                  : createCommentVNode('', true),
                createBaseVNode('span', null, toDisplayString(_ctx.burn.planetName), 1),
              ],
              2,
            ),
            createVNode(_sfc_main$1, { days: unref(days) }, null, 8, ['days']),
            createBaseVNode('td', null, [
              createBaseVNode(
                'div',
                {
                  class: normalizeClass(_ctx.$style.buttons),
                },
                [
                  createVNode(
                    _sfc_main$2,
                    {
                      dark: '',
                      inline: '',
                      onClick:
                        _cache[1] ||
                        (_cache[1] = $event => unref(showBuffer)(`BS ${_ctx.burn.naturalId}`)),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[3] || (_cache[3] = [createTextVNode('BS', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                  createVNode(
                    _sfc_main$2,
                    {
                      dark: '',
                      inline: '',
                      onClick:
                        _cache[2] ||
                        (_cache[2] = $event =>
                          unref(showBuffer)(`INV ${_ctx.burn.storeId.substring(0, 8)}`)),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[4] || (_cache[4] = [createTextVNode(' INV ', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ],
                2,
              ),
            ]),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
