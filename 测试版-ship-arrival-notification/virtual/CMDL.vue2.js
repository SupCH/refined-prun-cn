import { useXitParameters } from './use-xit-parameters.js';
import { userData } from './user-data.js';
import _sfc_main$1 from './PrunButton.vue.js';
import { createId } from './create-id.js';
import CommandLists from './CommandLists.vue.js';
import CommandList from './CommandList.vue.js';
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
  __name: 'CMDL',
  setup(__props) {
    const parameters = useXitParameters();
    const name = parameters.join(' ');
    const list = computed(() => {
      const byId = userData.commandLists.find(x => x.id.startsWith(parameters[0]));
      if (byId) {
        return byId;
      }
      return userData.commandLists.find(x => x.name === name);
    });
    function onCreateClick() {
      userData.commandLists.push({
        id: createId(),
        name,
        commands: [],
      });
    }
    return (_ctx, _cache) => {
      return unref(isEmpty)(unref(parameters))
        ? (openBlock(), createBlock(CommandLists, { key: 0 }))
        : unref(list)
          ? (openBlock(),
            createBlock(
              CommandList,
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
                  'Command List "' + toDisplayString(unref(name)) + '" not found.',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ01ETC52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0NNREwvQ01ETC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHVzZVhpdFBhcmFtZXRlcnMgfSBmcm9tICdAc3JjL2hvb2tzL3VzZS14aXQtcGFyYW1ldGVycyc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICd0cy1leHRyYXMnO1xuaW1wb3J0IFBydW5CdXR0b24gZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5CdXR0b24udnVlJztcbmltcG9ydCB7IGNyZWF0ZUlkIH0gZnJvbSAnQHNyYy9zdG9yZS9jcmVhdGUtaWQnO1xuaW1wb3J0IENvbW1hbmRMaXN0cyBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9DTURML0NvbW1hbmRMaXN0cy52dWUnO1xuaW1wb3J0IENvbW1hbmRMaXN0IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0NNREwvQ29tbWFuZExpc3QudnVlJztcblxuY29uc3QgcGFyYW1ldGVycyA9IHVzZVhpdFBhcmFtZXRlcnMoKTtcbmNvbnN0IG5hbWUgPSBwYXJhbWV0ZXJzLmpvaW4oJyAnKTtcbmNvbnN0IGxpc3QgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IGJ5SWQgPSB1c2VyRGF0YS5jb21tYW5kTGlzdHMuZmluZCh4ID0+IHguaWQuc3RhcnRzV2l0aChwYXJhbWV0ZXJzWzBdKSk7XG4gIGlmIChieUlkKSB7XG4gICAgcmV0dXJuIGJ5SWQ7XG4gIH1cbiAgcmV0dXJuIHVzZXJEYXRhLmNvbW1hbmRMaXN0cy5maW5kKHggPT4geC5uYW1lID09PSBuYW1lKTtcbn0pO1xuXG5mdW5jdGlvbiBvbkNyZWF0ZUNsaWNrKCkge1xuICB1c2VyRGF0YS5jb21tYW5kTGlzdHMucHVzaCh7XG4gICAgaWQ6IGNyZWF0ZUlkKCksXG4gICAgbmFtZSxcbiAgICBjb21tYW5kczogW10sXG4gIH0pO1xufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPENvbW1hbmRMaXN0cyB2LWlmPVwiaXNFbXB0eShwYXJhbWV0ZXJzKVwiIC8+XG4gIDxDb21tYW5kTGlzdCB2LWVsc2UtaWY9XCJsaXN0XCIgOmxpc3Q9XCJsaXN0XCIgLz5cbiAgPGRpdiB2LWVsc2UgOmNsYXNzPVwiJHN0eWxlLmNyZWF0ZVwiPlxuICAgIDxzcGFuPkNvbW1hbmQgTGlzdCBcInt7IG5hbWUgfX1cIiBub3QgZm91bmQuPC9zcGFuPlxuICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgOmNsYXNzPVwiJHN0eWxlLmJ1dHRvblwiIEBjbGljaz1cIm9uQ3JlYXRlQ2xpY2tcIj5DUkVBVEU8L1BydW5CdXR0b24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5jcmVhdGUge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmJ1dHRvbiB7XG4gIG1hcmdpbi10b3A6IDVweDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX3VucmVmIiwiX29wZW5CbG9jayIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlVk5vZGUiLCJQcnVuQnV0dG9uIiwiX25vcm1hbGl6ZUNsYXNzIiwiX2NyZWF0ZVRleHRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVNBLFVBQUEsYUFBQSxpQkFBQTtBQUNBLFVBQUEsT0FBQSxXQUFBLEtBQUEsR0FBQTtBQUNBLFVBQUEsT0FBQSxTQUFBLE1BQUE7QUFDRSxZQUFBLE9BQUEsU0FBQSxhQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsR0FBQSxXQUFBLFdBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxVQUFBLE1BQUE7QUFDRSxlQUFBO0FBQUEsTUFBTztBQUVULGFBQUEsU0FBQSxhQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsU0FBQSxJQUFBO0FBQUEsSUFBc0QsQ0FBQTtBQUd4RCxhQUFBLGdCQUFBO0FBQ0UsZUFBQSxhQUFBLEtBQUE7QUFBQSxRQUEyQixJQUFBLFNBQUE7QUFBQSxRQUNaO0FBQUEsUUFDYixVQUFBLENBQUE7QUFBQSxNQUNXLENBQUE7QUFBQSxJQUNaOztBQUttQixhQUFBQSxNQUFBLE9BQUEsRUFBQUEsTUFBQSxVQUFBLENBQUEsS0FBQUMsVUFBQSxHQUFBQyxZQUFBLGNBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxLQUFBRixNQUFBLElBQUEsS0FBQUMsVUFBQSxHQUFBQyxZQUFBLGFBQUE7QUFBQSxRQUN5QixLQUFBO0FBQUE7TUFBUixHQUFBLE1BQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBRCxVQUFBLEdBQUFFLG1CQUFBLE9BQUE7QUFBQSxRQUkvQixLQUFBO0FBQUE7TUFIMkIsR0FBQTtBQUFBO1FBQ1dDLFlBQUFDLGFBQUE7QUFBQSxVQUMyQyxTQUFBO0FBQUEsVUFBekUsT0FBQUMsZUFBQSxLQUFBLE9BQUEsTUFBQTtBQUFBLFVBQTZCLFNBQUE7QUFBQSxRQUFVLEdBQUE7QUFBQTtZQUFxQkMsZ0JBQUEsVUFBQSxFQUFBO0FBQUEsVUFBQSxFQUFBLENBQUE7QUFBQTs7Ozs7OyJ9
