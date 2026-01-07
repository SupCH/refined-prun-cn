import { t } from './index5.js';
import grip from './grip.module.css.js';
import fa from './font-awesome.module.css.js';
import { showTileOverlay, showConfirmationOverlay } from './tile-overlay.js';
import _sfc_main$1 from './PrunButton.vue.js';
import _sfc_main$2 from './ActionBar.vue.js';
import { showBuffer } from './buffers.js';
import { userData } from './user-data.js';
import { vDraggable as so } from './vue-draggable-plus.js';
import _sfc_main$3 from './CreateTaskList.vue.js';
import { createId } from './create-id.js';
import removeArrayElement from './remove-array-element.js';
import { sumBy } from './sum-by.js';
import PrunLink from './PrunLink.vue.js';
import { ddmmyyyy } from './format.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  withDirectives,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'TaskLists',
  setup(__props) {
    function createNewList(ev) {
      showTileOverlay(ev, _sfc_main$3, {
        onCreate: name => {
          const id = createId();
          userData.todo.push({ id, name, tasks: [] });
          showBuffer(`XIT TODO ${id.substring(0, 8)}`);
        },
      });
    }
    function confirmDelete(ev, list) {
      showConfirmationOverlay(ev, () => removeArrayElement(userData.todo, list), {
        message: t('todo.deleteListConfirm', list.name),
      });
    }
    function countCompletedTasks(list) {
      return sumBy(list.tasks, x => (x.completed ? 1 : 0));
    }
    function getDueDate(list) {
      const dates = [];
      const add = task => {
        if (task.dueDate !== void 0) {
          dates.push(task.dueDate);
        }
        for (const subtask of task.subtasks ?? []) {
          add(subtask);
        }
      };
      for (const task of list.tasks) {
        add(task);
      }
      if (dates.length === 0) {
        return void 0;
      }
      dates.sort();
      return ddmmyyyy(dates[0]);
    }
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
          Fragment,
          null,
          [
            createVNode(_sfc_main$2, null, {
              default: withCtx(() => [
                createVNode(
                  _sfc_main$1,
                  {
                    primary: '',
                    onClick: createNewList,
                  },
                  {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('todo.addList')),
                        1,
                      ),
                    ]),
                    _: 1,
                  },
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('table', null, [
              createBaseVNode('thead', null, [
                createBaseVNode('tr', null, [
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('todo.listName')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('todo.tasks')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('todo.dueDate')),
                    1,
                  ),
                  _cache[0] || (_cache[0] = createBaseVNode('th', null, null, -1)),
                ]),
              ]),
              withDirectives(
                (openBlock(),
                createElementBlock(
                  'tbody',
                  {
                    class: normalizeClass(unref(dragging) ? _ctx.$style.dragging : null),
                  },
                  [
                    (openBlock(true),
                    createElementBlock(
                      Fragment,
                      null,
                      renderList(unref(userData).todo, list => {
                        return (
                          openBlock(),
                          createElementBlock(
                            'tr',
                            {
                              key: list.id,
                            },
                            [
                              createBaseVNode('td', null, [
                                createBaseVNode(
                                  'span',
                                  {
                                    class: normalizeClass([
                                      unref(grip).grip,
                                      unref(fa).solid,
                                      _ctx.$style.grip,
                                    ]),
                                  },
                                  toDisplayString(''),
                                  2,
                                ),
                                createVNode(
                                  PrunLink,
                                  {
                                    inline: '',
                                    command: `XIT TODO ${list.id.substring(0, 8)}`,
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(list.name), 1),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['command'],
                                ),
                              ]),
                              createBaseVNode('td', null, [
                                createBaseVNode(
                                  'span',
                                  null,
                                  toDisplayString(countCompletedTasks(list)) +
                                    '/' +
                                    toDisplayString(list.tasks.length),
                                  1,
                                ),
                              ]),
                              createBaseVNode('td', null, [
                                createBaseVNode('span', null, toDisplayString(getDueDate(list)), 1),
                              ]),
                              createBaseVNode('td', null, [
                                createVNode(
                                  _sfc_main$1,
                                  {
                                    danger: '',
                                    onClick: $event => confirmDelete($event, list),
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(
                                          ('t' in _ctx ? _ctx.t : unref(t))('todo.deleteList'),
                                        ),
                                        1,
                                      ),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['onClick'],
                                ),
                              ]),
                            ],
                          )
                        );
                      }),
                      128,
                    )),
                  ],
                  2,
                )),
                [[unref(so), [unref(userData).todo, draggableOptions]]],
              ),
            ]),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
