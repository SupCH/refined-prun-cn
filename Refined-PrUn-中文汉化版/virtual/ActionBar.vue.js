import { C } from './prun-css.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  useSlots,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createBlock,
  resolveDynamicComponent,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ActionBar',
  setup(__props) {
    const slots = useSlots();
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ActionBar.container),
          },
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(slots.default(), slot => {
                return (
                  openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: unref(objectId)(slot),
                      class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ActionBar.element),
                    },
                    [(openBlock(), createBlock(resolveDynamicComponent(slot)))],
                    2,
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
