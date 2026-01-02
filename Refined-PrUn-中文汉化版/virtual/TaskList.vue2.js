import grip from './grip.module.css.js';
import TaskItem from './TaskItem.vue.js';
import AddTaskItem from './AddTaskItem.vue.js';
import { vDraggable as so } from './vue-draggable-plus.js';
import Header from './Header.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  withDirectives,
  Fragment,
  renderList,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'TaskList',
  props: {
    list: {},
  },
  setup(__props) {
    const dragging = ref(false);
    const draggableOptions = {
      animation: 150,
      handle: `.${grip.grip}`,
      onStart: () => (dragging.value = true),
      onEnd: () => (dragging.value = false),
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.root),
          },
          [
            createVNode(
              Header,
              {
                modelValue: _ctx.list.name,
                'onUpdate:modelValue':
                  _cache[0] || (_cache[0] = $event => (_ctx.list.name = $event)),
                editable: '',
                class: normalizeClass(_ctx.$style.header),
              },
              null,
              8,
              ['modelValue', 'class'],
            ),
            withDirectives(
              (openBlock(),
              createElementBlock(
                'div',
                {
                  class: normalizeClass(_ctx.$style.list),
                },
                [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(_ctx.list.tasks, task => {
                      return (
                        openBlock(),
                        createBlock(
                          TaskItem,
                          {
                            key: task.id,
                            list: _ctx.list,
                            task,
                            dragging: unref(dragging),
                          },
                          null,
                          8,
                          ['list', 'task', 'dragging'],
                        )
                      );
                    }),
                    128,
                  )),
                ],
                2,
              )),
              [[unref(so), [_ctx.list.tasks, draggableOptions]]],
            ),
            createVNode(AddTaskItem, { list: _ctx.list }, null, 8, ['list']),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
