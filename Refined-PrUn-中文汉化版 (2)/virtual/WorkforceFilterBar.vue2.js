import _sfc_main$1 from './RadioItem.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createBlock,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'WorkforceFilterBar',
  props: {
    filters: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.bar),
          },
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(_ctx.filters, filter => {
                return (
                  openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: filter.workforce,
                      modelValue: filter.value,
                      'onUpdate:modelValue': $event => (filter.value = $event),
                      horizontal: '',
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(filter.workforce.substring(0, 3)), 1),
                      ]),
                      _: 2,
                    },
                    1032,
                    ['modelValue', 'onUpdate:modelValue'],
                  )
                );
              }),
              128,
            )),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
