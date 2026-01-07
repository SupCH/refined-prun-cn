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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFza0xpc3QudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9UT0RPL1Rhc2tMaXN0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IGdyaXAgZnJvbSAnQHNyYy91dGlscy9ncmlwLm1vZHVsZS5jc3MnO1xuaW1wb3J0IFRhc2tJdGVtIGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL1RPRE8vVGFza0l0ZW0udnVlJztcbmltcG9ydCBBZGRUYXNrSXRlbSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9UT0RPL0FkZFRhc2tJdGVtLnZ1ZSc7XG5pbXBvcnQgeyB2RHJhZ2dhYmxlIH0gZnJvbSAndnVlLWRyYWdnYWJsZS1wbHVzJztcbmltcG9ydCBIZWFkZXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL0hlYWRlci52dWUnO1xuXG5kZWZpbmVQcm9wczx7IGxpc3Q6IFVzZXJEYXRhLlRhc2tMaXN0IH0+KCk7XG5cbmNvbnN0IGRyYWdnaW5nID0gcmVmKGZhbHNlKTtcblxuY29uc3QgZHJhZ2dhYmxlT3B0aW9ucyA9IHtcbiAgYW5pbWF0aW9uOiAxNTAsXG4gIGhhbmRsZTogYC4ke2dyaXAuZ3JpcH1gLFxuICBvblN0YXJ0OiAoKSA9PiAoZHJhZ2dpbmcudmFsdWUgPSB0cnVlKSxcbiAgb25FbmQ6ICgpID0+IChkcmFnZ2luZy52YWx1ZSA9IGZhbHNlKSxcbn07XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5yb290XCI+XG4gICAgPEhlYWRlciB2LW1vZGVsPVwibGlzdC5uYW1lXCIgZWRpdGFibGUgOmNsYXNzPVwiJHN0eWxlLmhlYWRlclwiIC8+XG4gICAgPGRpdiB2LWRyYWdnYWJsZT1cIltsaXN0LnRhc2tzLCBkcmFnZ2FibGVPcHRpb25zXVwiIDpjbGFzcz1cIiRzdHlsZS5saXN0XCI+XG4gICAgICA8VGFza0l0ZW1cbiAgICAgICAgdi1mb3I9XCJ0YXNrIGluIGxpc3QudGFza3NcIlxuICAgICAgICA6a2V5PVwidGFzay5pZFwiXG4gICAgICAgIDpsaXN0PVwibGlzdFwiXG4gICAgICAgIDp0YXNrPVwidGFza1wiXG4gICAgICAgIDpkcmFnZ2luZz1cImRyYWdnaW5nXCIgLz5cbiAgICA8L2Rpdj5cbiAgICA8QWRkVGFza0l0ZW0gOmxpc3Q9XCJsaXN0XCIgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLnJvb3Qge1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xufVxuXG4uaGVhZGVyIHtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG59XG5cbi5saXN0IHtcbiAgcGFkZGluZy10b3A6IDVweDtcbiAgcGFkZGluZy1yaWdodDogM3B4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJsaXN0IiwiX3VucmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVNBLFVBQUEsV0FBQSxJQUFBLEtBQUE7QUFFQSxVQUFBLG1CQUFBO0FBQUEsTUFBeUIsV0FBQTtBQUFBLE1BQ1osUUFBQSxJQUFBLEtBQUEsSUFBQTtBQUFBLE1BQ1UsU0FBQSxNQUFBLFNBQUEsUUFBQTtBQUFBLE1BQ1ksT0FBQSxNQUFBLFNBQUEsUUFBQTtBQUFBLElBQ0Y7OztRQWdCekIsT0FBQUEsZUFBQSxLQUFBLE9BQUEsSUFBQTtBQUFBLE1BWGtCLEdBQUE7QUFBQTtVQUN3QyxZQUFBLEtBQUEsS0FBQTtBQUFBLFVBQXhDLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQSxLQUFBLEtBQUEsT0FBQTtBQUFBLFVBQUksVUFBQTtBQUFBLFVBQUUsT0FBQUEsZUFBQSxLQUFBLE9BQUEsTUFBQTtBQUFBLFFBQThCLEdBQUEsTUFBQSxHQUFBLENBQUEsY0FBQSxPQUFBLENBQUE7QUFBQTtVQVFwRCxPQUFBQSxlQUFBLEtBQUEsT0FBQSxJQUFBO0FBQUEsUUFQK0QsR0FBQTtBQUFBOztjQU0xQyxLQUFBLEtBQUE7QUFBQSxjQUhaLE1BQUEsS0FBQTtBQUFBLGNBQ0pDO0FBQUFBLGNBQ04sVUFBQUMsTUFBQSxRQUFBO0FBQUEsWUFDVSxHQUFBLE1BQUEsR0FBQSxDQUFBLFFBQUEsUUFBQSxVQUFBLENBQUE7QUFBQTs7O1FBTmdDLENBQUE7QUFBQTtNQVF2QixHQUFBLENBQUE7QUFBQTs7OyJ9
