import { useXitParameters } from './use-xit-parameters.js';
import { userData } from './user-data.js';
import TaskList from './TaskList.vue.js';
import TaskLists from './TaskLists.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import { createId } from './create-id.js';
import { isEmpty } from './is-empty.js';
import {
  defineComponent,
  computed,
  createBlock,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'TODO',
  setup(__props) {
    const parameters = useXitParameters();
    const name = parameters.join(' ');
    const list = computed(() => {
      const byId = userData.todo.find(x =>
        x.id.toUpperCase().startsWith(parameters[0].toUpperCase()),
      );
      if (byId) {
        return byId;
      }
      return userData.todo.find(x => x.name === name);
    });
    function onCreateClick() {
      userData.todo.push({
        id: createId(),
        name,
        tasks: [],
      });
    }
    return (_ctx, _cache) => {
      return unref(isEmpty)(unref(parameters))
        ? (openBlock(), createBlock(TaskLists, { key: 0 }))
        : unref(list)
          ? (openBlock(),
            createBlock(
              TaskList,
              {
                key: 1,
                list: unref(list),
              },
              null,
              8,
              ['list'],
            ))
          : (openBlock(),
            createElementBlock(
              'div',
              {
                key: 2,
                class: normalizeClass(_ctx.$style.create),
              },
              [
                createBaseVNode(
                  'span',
                  null,
                  'Task list "' + toDisplayString(unref(name)) + '" not found.',
                  1,
                ),
                createVNode(
                  _sfc_main$1,
                  {
                    primary: '',
                    class: normalizeClass(_ctx.$style.button),
                    onClick: onCreateClick,
                  },
                  {
                    default: withCtx(() => [
                      ...(_cache[0] || (_cache[0] = [createTextVNode('CREATE', -1)])),
                    ]),
                    _: 1,
                  },
                  8,
                  ['class'],
                ),
              ],
              2,
            ));
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVE9ETy52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL1RPRE8vVE9ETy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHVzZVhpdFBhcmFtZXRlcnMgfSBmcm9tICdAc3JjL2hvb2tzL3VzZS14aXQtcGFyYW1ldGVycyc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICd0cy1leHRyYXMnO1xuaW1wb3J0IFRhc2tMaXN0IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL1RPRE8vVGFza0xpc3QudnVlJztcbmltcG9ydCBUYXNrTGlzdHMgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvVE9ETy9UYXNrTGlzdHMudnVlJztcbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgeyBjcmVhdGVJZCB9IGZyb20gJ0BzcmMvc3RvcmUvY3JlYXRlLWlkJztcblxuY29uc3QgcGFyYW1ldGVycyA9IHVzZVhpdFBhcmFtZXRlcnMoKTtcbmNvbnN0IG5hbWUgPSBwYXJhbWV0ZXJzLmpvaW4oJyAnKTtcbmNvbnN0IGxpc3QgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IGJ5SWQgPSB1c2VyRGF0YS50b2RvLmZpbmQoeCA9PiB4LmlkLnRvVXBwZXJDYXNlKCkuc3RhcnRzV2l0aChwYXJhbWV0ZXJzWzBdLnRvVXBwZXJDYXNlKCkpKTtcbiAgaWYgKGJ5SWQpIHtcbiAgICByZXR1cm4gYnlJZDtcbiAgfVxuICByZXR1cm4gdXNlckRhdGEudG9kby5maW5kKHggPT4geC5uYW1lID09PSBuYW1lKTtcbn0pO1xuXG5mdW5jdGlvbiBvbkNyZWF0ZUNsaWNrKCkge1xuICB1c2VyRGF0YS50b2RvLnB1c2goe1xuICAgIGlkOiBjcmVhdGVJZCgpLFxuICAgIG5hbWUsXG4gICAgdGFza3M6IFtdLFxuICB9KTtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxUYXNrTGlzdHMgdi1pZj1cImlzRW1wdHkocGFyYW1ldGVycylcIiAvPlxuICA8VGFza0xpc3Qgdi1lbHNlLWlmPVwibGlzdFwiIDpsaXN0PVwibGlzdFwiIC8+XG4gIDxkaXYgdi1lbHNlIDpjbGFzcz1cIiRzdHlsZS5jcmVhdGVcIj5cbiAgICA8c3Bhbj5UYXNrIGxpc3QgXCJ7eyBuYW1lIH19XCIgbm90IGZvdW5kLjwvc3Bhbj5cbiAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IDpjbGFzcz1cIiRzdHlsZS5idXR0b25cIiBAY2xpY2s9XCJvbkNyZWF0ZUNsaWNrXCI+Q1JFQVRFPC9QcnVuQnV0dG9uPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uY3JlYXRlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5idXR0b24ge1xuICBtYXJnaW4tdG9wOiA1cHg7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl91bnJlZiIsIl9vcGVuQmxvY2siLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2NyZWF0ZVZOb2RlIiwiUHJ1bkJ1dHRvbiIsIl9ub3JtYWxpemVDbGFzcyIsIl9jcmVhdGVUZXh0Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFTQSxVQUFBLGFBQUEsaUJBQUE7QUFDQSxVQUFBLE9BQUEsV0FBQSxLQUFBLEdBQUE7QUFDQSxVQUFBLE9BQUEsU0FBQSxNQUFBO0FBQ0UsWUFBQSxPQUFBLFNBQUEsS0FBQSxLQUFBLENBQUEsTUFBQSxFQUFBLEdBQUEsWUFBQSxFQUFBLFdBQUEsV0FBQSxDQUFBLEVBQUEsWUFBQSxDQUFBLENBQUE7QUFDQSxVQUFBLE1BQUE7QUFDRSxlQUFBO0FBQUEsTUFBTztBQUVULGFBQUEsU0FBQSxLQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsU0FBQSxJQUFBO0FBQUEsSUFBOEMsQ0FBQTtBQUdoRCxhQUFBLGdCQUFBO0FBQ0UsZUFBQSxLQUFBLEtBQUE7QUFBQSxRQUFtQixJQUFBLFNBQUE7QUFBQSxRQUNKO0FBQUEsUUFDYixPQUFBLENBQUE7QUFBQSxNQUNRLENBQUE7QUFBQSxJQUNUOztBQUtnQixhQUFBQSxNQUFBLE9BQUEsRUFBQUEsTUFBQSxVQUFBLENBQUEsS0FBQUMsVUFBQSxHQUFBQyxZQUFBLFdBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxLQUFBRixNQUFBLElBQUEsS0FBQUMsVUFBQSxHQUFBQyxZQUFBLFVBQUE7QUFBQSxRQUN5QixLQUFBO0FBQUE7TUFBUixHQUFBLE1BQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBRCxVQUFBLEdBQUFFLG1CQUFBLE9BQUE7QUFBQSxRQUk1QixLQUFBO0FBQUE7TUFIMkIsR0FBQTtBQUFBO1FBQ1FDLFlBQUFDLGFBQUE7QUFBQSxVQUM4QyxTQUFBO0FBQUEsVUFBekUsT0FBQUMsZUFBQSxLQUFBLE9BQUEsTUFBQTtBQUFBLFVBQTZCLFNBQUE7QUFBQSxRQUFVLEdBQUE7QUFBQTtZQUFxQkMsZ0JBQUEsVUFBQSxFQUFBO0FBQUEsVUFBQSxFQUFBLENBQUE7QUFBQTs7Ozs7OyJ9
