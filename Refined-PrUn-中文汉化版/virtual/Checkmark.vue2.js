import fa from './font-awesome.module.css.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Checkmark',
  props: {
    task: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.checkmark),
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass([unref(fa).regular, _ctx.$style.circle]),
              },
              toDisplayString(''),
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass([
                  _ctx.$style.mark,
                  _ctx.task.completed
                    ? [unref(fa).solid, _ctx.$style.markCompleted]
                    : unref(fa).regular,
                ]),
              },
              toDisplayString(_ctx.task.completed ? '' : _ctx.task.recurring ? '' : ''),
              3,
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
