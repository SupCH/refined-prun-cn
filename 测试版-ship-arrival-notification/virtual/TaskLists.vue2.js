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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFza0xpc3RzLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvVE9ETy9UYXNrTGlzdHMudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgZ3JpcCBmcm9tICdAc3JjL3V0aWxzL2dyaXAubW9kdWxlLmNzcyc7XG5pbXBvcnQgZmEgZnJvbSAnQHNyYy91dGlscy9mb250LWF3ZXNvbWUubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyBzaG93VGlsZU92ZXJsYXksIHNob3dDb25maXJtYXRpb25PdmVybGF5IH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL3RpbGUtb3ZlcmxheSc7XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IEFjdGlvbkJhciBmcm9tICdAc3JjL2NvbXBvbmVudHMvQWN0aW9uQmFyLnZ1ZSc7XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YSc7XG5pbXBvcnQgeyB2RHJhZ2dhYmxlIH0gZnJvbSAndnVlLWRyYWdnYWJsZS1wbHVzJztcbmltcG9ydCBDcmVhdGVUYXNrTGlzdCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9UT0RPL0NyZWF0ZVRhc2tMaXN0LnZ1ZSc7XG5pbXBvcnQgeyBjcmVhdGVJZCB9IGZyb20gJ0BzcmMvc3RvcmUvY3JlYXRlLWlkJztcbmltcG9ydCByZW1vdmVBcnJheUVsZW1lbnQgZnJvbSAnQHNyYy91dGlscy9yZW1vdmUtYXJyYXktZWxlbWVudCc7XG5pbXBvcnQgeyBzdW1CeSB9IGZyb20gJ0BzcmMvdXRpbHMvc3VtLWJ5JztcbmltcG9ydCBQcnVuTGluayBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkxpbmsudnVlJztcbmltcG9ydCB7IGRkbW15eXl5IH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuXG5mdW5jdGlvbiBjcmVhdGVOZXdMaXN0KGV2OiBFdmVudCkge1xuICBzaG93VGlsZU92ZXJsYXkoZXYsIENyZWF0ZVRhc2tMaXN0LCB7XG4gICAgb25DcmVhdGU6IG5hbWUgPT4ge1xuICAgICAgY29uc3QgaWQgPSBjcmVhdGVJZCgpO1xuICAgICAgdXNlckRhdGEudG9kby5wdXNoKHsgaWQsIG5hbWUsIHRhc2tzOiBbXSB9KTtcbiAgICAgIHNob3dCdWZmZXIoYFhJVCBUT0RPICR7aWQuc3Vic3RyaW5nKDAsIDgpfWApO1xuICAgIH0sXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjb25maXJtRGVsZXRlKGV2OiBFdmVudCwgbGlzdDogVXNlckRhdGEuVGFza0xpc3QpIHtcbiAgc2hvd0NvbmZpcm1hdGlvbk92ZXJsYXkoZXYsICgpID0+IHJlbW92ZUFycmF5RWxlbWVudCh1c2VyRGF0YS50b2RvLCBsaXN0KSwge1xuICAgIG1lc3NhZ2U6IHQoJ3RvZG8uZGVsZXRlTGlzdENvbmZpcm0nLCBsaXN0Lm5hbWUpLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gY291bnRDb21wbGV0ZWRUYXNrcyhsaXN0OiBVc2VyRGF0YS5UYXNrTGlzdCkge1xuICByZXR1cm4gc3VtQnkobGlzdC50YXNrcywgeCA9PiAoeC5jb21wbGV0ZWQgPyAxIDogMCkpO1xufVxuXG5mdW5jdGlvbiBnZXREdWVEYXRlKGxpc3Q6IFVzZXJEYXRhLlRhc2tMaXN0KSB7XG4gIGNvbnN0IGRhdGVzOiBudW1iZXJbXSA9IFtdO1xuICBjb25zdCBhZGQgPSAodGFzazogVXNlckRhdGEuVGFzaykgPT4ge1xuICAgIGlmICh0YXNrLmR1ZURhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGF0ZXMucHVzaCh0YXNrLmR1ZURhdGUpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHN1YnRhc2sgb2YgdGFzay5zdWJ0YXNrcyA/PyBbXSkge1xuICAgICAgYWRkKHN1YnRhc2spO1xuICAgIH1cbiAgfTtcbiAgZm9yIChjb25zdCB0YXNrIG9mIGxpc3QudGFza3MpIHtcbiAgICBhZGQodGFzayk7XG4gIH1cbiAgaWYgKGRhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgZGF0ZXMuc29ydCgpO1xuICByZXR1cm4gZGRtbXl5eXkoZGF0ZXNbMF0pO1xufVxuXG5jb25zdCBkcmFnZ2luZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IGRyYWdnYWJsZU9wdGlvbnMgPSB7XG4gIGFuaW1hdGlvbjogMTUwLFxuICBoYW5kbGU6IGAuJHtncmlwLmdyaXB9YCxcbiAgb25TdGFydDogKCkgPT4gKGRyYWdnaW5nLnZhbHVlID0gdHJ1ZSksXG4gIG9uRW5kOiAoKSA9PiAoZHJhZ2dpbmcudmFsdWUgPSBmYWxzZSksXG59O1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEFjdGlvbkJhcj5cbiAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cImNyZWF0ZU5ld0xpc3RcIj57eyB0KCd0b2RvLmFkZExpc3QnKSB9fTwvUHJ1bkJ1dHRvbj5cbiAgPC9BY3Rpb25CYXI+XG4gIDx0YWJsZT5cbiAgICA8dGhlYWQ+XG4gICAgICA8dHI+XG4gICAgICAgIDx0aD57eyB0KCd0b2RvLmxpc3ROYW1lJykgfX08L3RoPlxuICAgICAgICA8dGg+e3sgdCgndG9kby50YXNrcycpIH19PC90aD5cbiAgICAgICAgPHRoPnt7IHQoJ3RvZG8uZHVlRGF0ZScpIH19PC90aD5cbiAgICAgICAgPHRoIC8+XG4gICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+XG4gICAgPHRib2R5XG4gICAgICB2LWRyYWdnYWJsZT1cIlt1c2VyRGF0YS50b2RvLCBkcmFnZ2FibGVPcHRpb25zXVwiXG4gICAgICA6Y2xhc3M9XCJkcmFnZ2luZyA/ICRzdHlsZS5kcmFnZ2luZyA6IG51bGxcIj5cbiAgICAgIDx0ciB2LWZvcj1cImxpc3QgaW4gdXNlckRhdGEudG9kb1wiIDprZXk9XCJsaXN0LmlkXCI+XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8c3BhbiA6Y2xhc3M9XCJbZ3JpcC5ncmlwLCBmYS5zb2xpZCwgJHN0eWxlLmdyaXBdXCI+XG4gICAgICAgICAgICB7eyAnXFx1ZjU4ZScgfX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPFBydW5MaW5rIGlubGluZSA6Y29tbWFuZD1cImBYSVQgVE9ETyAke2xpc3QuaWQuc3Vic3RyaW5nKDAsIDgpfWBcIj5cbiAgICAgICAgICAgIHt7IGxpc3QubmFtZSB9fVxuICAgICAgICAgIDwvUHJ1bkxpbms+XG4gICAgICAgIDwvdGQ+XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8c3Bhbj57eyBjb3VudENvbXBsZXRlZFRhc2tzKGxpc3QpIH19L3t7IGxpc3QudGFza3MubGVuZ3RoIH19PC9zcGFuPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPHNwYW4+e3sgZ2V0RHVlRGF0ZShsaXN0KSB9fTwvc3Bhbj5cbiAgICAgICAgPC90ZD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxQcnVuQnV0dG9uIGRhbmdlciBAY2xpY2s9XCJjb25maXJtRGVsZXRlKCRldmVudCwgbGlzdClcIj57e1xuICAgICAgICAgICAgdCgndG9kby5kZWxldGVMaXN0JylcbiAgICAgICAgICB9fTwvUHJ1bkJ1dHRvbj5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbiAgPC90YWJsZT5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uZ3JpcCB7XG4gIGN1cnNvcjogbW92ZTtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2UtaW4tb3V0O1xuICBvcGFjaXR5OiAwO1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxudHI6aG92ZXIgLmdyaXAge1xuICBvcGFjaXR5OiAxO1xufVxuXG4uZHJhZ2dpbmcgdGQgLmdyaXAge1xuICBvcGFjaXR5OiAwO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJDcmVhdGVUYXNrTGlzdCIsIl93aXRoQ3R4IiwiX2NyZWF0ZVZOb2RlIiwiUHJ1bkJ1dHRvbiIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwidCIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfbm9ybWFsaXplQ2xhc3MiLCJfdW5yZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxhQUFBLGNBQUEsSUFBQTtBQUNFLHNCQUFBLElBQUFBLGFBQUE7QUFBQSxRQUFvQyxVQUFBLENBQUEsU0FBQTtBQUVoQyxnQkFBQSxLQUFBLFNBQUE7QUFDQSxtQkFBQSxLQUFBLEtBQUEsRUFBQSxJQUFBLE1BQUEsT0FBQSxDQUFBLEdBQUE7QUFDQSxxQkFBQSxZQUFBLEdBQUEsVUFBQSxHQUFBLENBQUEsQ0FBQSxFQUFBO0FBQUEsUUFBMkM7QUFBQSxNQUM3QyxDQUFBO0FBQUEsSUFDRDtBQUdILGFBQUEsY0FBQSxJQUFBLE1BQUE7QUFDRSw4QkFBQSxJQUFBLE1BQUEsbUJBQUEsU0FBQSxNQUFBLElBQUEsR0FBQTtBQUFBLFFBQTJFLFNBQUEsRUFBQSwwQkFBQSxLQUFBLElBQUE7QUFBQSxNQUMzQixDQUFBO0FBQUEsSUFDL0M7QUFHSCxhQUFBLG9CQUFBLE1BQUE7QUFDRSxhQUFBLE1BQUEsS0FBQSxPQUFBLENBQUEsTUFBQSxFQUFBLFlBQUEsSUFBQSxDQUFBO0FBQUEsSUFBbUQ7QUFHckQsYUFBQSxXQUFBLE1BQUE7QUFDRSxZQUFBLFFBQUEsQ0FBQTtBQUNBLFlBQUEsTUFBQSxDQUFBLFNBQUE7QUFDRSxZQUFBLEtBQUEsWUFBQSxRQUFBO0FBQ0UsZ0JBQUEsS0FBQSxLQUFBLE9BQUE7QUFBQSxRQUF1QjtBQUV6QixtQkFBQSxXQUFBLEtBQUEsWUFBQSxDQUFBLEdBQUE7QUFDRSxjQUFBLE9BQUE7QUFBQSxRQUFXO0FBQUEsTUFDYjtBQUVGLGlCQUFBLFFBQUEsS0FBQSxPQUFBO0FBQ0UsWUFBQSxJQUFBO0FB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
