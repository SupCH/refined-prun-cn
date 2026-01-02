import fa from './font-awesome.module.css.js';
import { showTileOverlay } from './tile-overlay.js';
import _sfc_main$1 from './EditTask.vue.js';
import { createId } from './create-id.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'AddTaskItem',
  props: {
    list: {},
  },
  setup(__props) {
    function onAddClick(ev) {
      const task = {
        id: createId(),
        type: 'Text',
      };
      showTileOverlay(ev, _sfc_main$1, {
        task,
        onSave: () => __props.list.tasks.push(task),
      });
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.item),
            onClick: onAddClick,
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass([unref(fa).solid, _ctx.$style.checkmark]),
              },
              [
                createBaseVNode(
                  'div',
                  {
                    class: normalizeClass(_ctx.$style.plus),
                  },
                  '+',
                  2,
                ),
                createBaseVNode(
                  'div',
                  {
                    class: normalizeClass(_ctx.$style.plusHover),
                  },
                  toDisplayString(''),
                  2,
                ),
              ],
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass([_ctx.$style.content]),
              },
              'Add task',
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
