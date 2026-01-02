import { C } from './prun-css.js';
import _sfc_main$1 from './ContextControlsItem.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ContextControls',
  props: {
    items: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ContextControls.container),
          },
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(_ctx.items, item => {
                return (
                  openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: item.cmd,
                      cmd: item.cmd,
                      label: item.label,
                    },
                    null,
                    8,
                    ['cmd', 'label'],
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
