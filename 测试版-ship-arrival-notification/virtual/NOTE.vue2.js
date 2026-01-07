import NoteList from './NoteList.vue.js';
import NoteEditor from './NoteEditor.vue.js';
import { useXitParameters } from './use-xit-parameters.js';
import { userData } from './user-data.js';
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
  __name: 'NOTE',
  setup(__props) {
    const parameters = useXitParameters();
    const name = parameters.join(' ');
    const note = computed(() => {
      const byId = userData.notes.find(x => x.id.startsWith(parameters[0]));
      if (byId) {
        return byId;
      }
      return userData.notes.find(x => x.name === name);
    });
    function onCreateClick() {
      userData.notes.push({
        id: createId(),
        name,
        text: '',
      });
    }
    return (_ctx, _cache) => {
      return unref(isEmpty)(unref(parameters))
        ? (openBlock(), createBlock(NoteList, { key: 0 }))
        : unref(note)
          ? (openBlock(),
            createBlock(
              NoteEditor,
              {
                key: 1,
                note: unref(note),
              },
              null,
              8,
              ['note'],
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
                  'Note "' + toDisplayString(unref(name)) + '" not found.',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTk9URS52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL05PVEUvTk9URS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBOb3RlTGlzdCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9OT1RFL05vdGVMaXN0LnZ1ZSc7XG5pbXBvcnQgTm90ZUVkaXRvciBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9OT1RFL05vdGVFZGl0b3IudnVlJztcbmltcG9ydCB7IHVzZVhpdFBhcmFtZXRlcnMgfSBmcm9tICdAc3JjL2hvb2tzL3VzZS14aXQtcGFyYW1ldGVycyc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICd0cy1leHRyYXMnO1xuaW1wb3J0IFBydW5CdXR0b24gZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5CdXR0b24udnVlJztcbmltcG9ydCB7IGNyZWF0ZUlkIH0gZnJvbSAnQHNyYy9zdG9yZS9jcmVhdGUtaWQnO1xuXG5jb25zdCBwYXJhbWV0ZXJzID0gdXNlWGl0UGFyYW1ldGVycygpO1xuY29uc3QgbmFtZSA9IHBhcmFtZXRlcnMuam9pbignICcpO1xuY29uc3Qgbm90ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgYnlJZCA9IHVzZXJEYXRhLm5vdGVzLmZpbmQoeCA9PiB4LmlkLnN0YXJ0c1dpdGgocGFyYW1ldGVyc1swXSkpO1xuICBpZiAoYnlJZCkge1xuICAgIHJldHVybiBieUlkO1xuICB9XG4gIHJldHVybiB1c2VyRGF0YS5ub3Rlcy5maW5kKHggPT4geC5uYW1lID09PSBuYW1lKTtcbn0pO1xuXG5mdW5jdGlvbiBvbkNyZWF0ZUNsaWNrKCkge1xuICB1c2VyRGF0YS5ub3Rlcy5wdXNoKHtcbiAgICBpZDogY3JlYXRlSWQoKSxcbiAgICBuYW1lLFxuICAgIHRleHQ6ICcnLFxuICB9KTtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxOb3RlTGlzdCB2LWlmPVwiaXNFbXB0eShwYXJhbWV0ZXJzKVwiIC8+XG4gIDxOb3RlRWRpdG9yIHYtZWxzZS1pZj1cIm5vdGVcIiA6bm90ZT1cIm5vdGVcIiAvPlxuICA8ZGl2IHYtZWxzZSA6Y2xhc3M9XCIkc3R5bGUuY3JlYXRlXCI+XG4gICAgPHNwYW4+Tm90ZSBcInt7IG5hbWUgfX1cIiBub3QgZm91bmQuPC9zcGFuPlxuICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgOmNsYXNzPVwiJHN0eWxlLmJ1dHRvblwiIEBjbGljaz1cIm9uQ3JlYXRlQ2xpY2tcIj5DUkVBVEU8L1BydW5CdXR0b24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5jcmVhdGUge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmJ1dHRvbiB7XG4gIG1hcmdpbi10b3A6IDVweDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX3VucmVmIiwiX29wZW5CbG9jayIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlVk5vZGUiLCJQcnVuQnV0dG9uIiwiX25vcm1hbGl6ZUNsYXNzIiwiX2NyZWF0ZVRleHRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVNBLFVBQUEsYUFBQSxpQkFBQTtBQUNBLFVBQUEsT0FBQSxXQUFBLEtBQUEsR0FBQTtBQUNBLFVBQUEsT0FBQSxTQUFBLE1BQUE7QUFDRSxZQUFBLE9BQUEsU0FBQSxNQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsR0FBQSxXQUFBLFdBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxVQUFBLE1BQUE7QUFDRSxlQUFBO0FBQUEsTUFBTztBQUVULGFBQUEsU0FBQSxNQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsU0FBQSxJQUFBO0FBQUEsSUFBK0MsQ0FBQTtBQUdqRCxhQUFBLGdCQUFBO0FBQ0UsZUFBQSxNQUFBLEtBQUE7QUFBQSxRQUFvQixJQUFBLFNBQUE7QUFBQSxRQUNMO0FBQUEsUUFDYixNQUFBO0FBQUEsTUFDTSxDQUFBO0FBQUEsSUFDUDs7QUFLZSxhQUFBQSxNQUFBLE9BQUEsRUFBQUEsTUFBQSxVQUFBLENBQUEsS0FBQUMsVUFBQSxHQUFBQyxZQUFBLFVBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxLQUFBRixNQUFBLElBQUEsS0FBQUMsVUFBQSxHQUFBQyxZQUFBLFlBQUE7QUFBQSxRQUM0QixLQUFBO0FBQUE7TUFBUixHQUFBLE1BQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBRCxVQUFBLEdBQUFFLG1CQUFBLE9BQUE7QUFBQSxRQUk5QixLQUFBO0FBQUE7TUFIMkIsR0FBQTtBQUFBO1FBQ0dDLFlBQUFDLGFBQUE7QUFBQSxVQUNtRCxTQUFBO0FBQUEsVUFBekUsT0FBQUMsZUFBQSxLQUFBLE9BQUEsTUFBQTtBQUFBLFVBQTZCLFNBQUE7QUFBQSxRQUFVLEdBQUE7QUFBQTtZQUFxQkMsZ0JBQUEsVUFBQSxFQUFBO0FBQUEsVUFBQSxFQUFBLENBQUE7QUFBQTs7Ozs7OyJ9
