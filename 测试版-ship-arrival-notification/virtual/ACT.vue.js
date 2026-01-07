import { useXitParameters } from './use-xit-parameters.js';
import ActionPackageList from './ActionPackageList.vue.js';
import ActionPackageEditor from './EditActionPackage.vue.js';
import { userData } from './user-data.js';
import ExecuteActionPackage from './ExecuteActionPackage.vue.js';
import {
  defineComponent,
  computed,
  createBlock,
  createElementBlock,
  openBlock,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ACT',
  setup(__props) {
    const parameters = useXitParameters();
    parameters.unshift('ACT');
    let pkgName = void 0;
    const edit = parameters[1]?.toLowerCase() === 'gen' || parameters[1]?.toLowerCase() === 'edit';
    if (edit) {
      pkgName = parameters.slice(2).join(' ');
    }
    const run = parameters[1] !== void 0 && !edit;
    if (run) {
      pkgName = parameters.slice(1).join(' ');
    }
    const pkg = computed(() => {
      if (!pkgName) return void 0;
      return (
        userData.actionPackages.find(x => x.global.name === pkgName) ||
        userData.actionPackages.find(x => x.global.name === pkgName.split(' ').join('_'))
      );
    });
    return (_ctx, _cache) => {
      return unref(parameters).length === 1
        ? (openBlock(), createBlock(ActionPackageList, { key: 0 }))
        : !unref(pkg)
          ? (openBlock(),
            createElementBlock(
              'div',
              _hoisted_1,
              'Action package "' + toDisplayString(unref(pkgName)) + '" not found.',
              1,
            ))
          : unref(edit)
            ? (openBlock(),
              createBlock(
                ActionPackageEditor,
                {
                  key: 2,
                  pkg: unref(pkg),
                },
                null,
                8,
                ['pkg'],
              ))
            : (openBlock(),
              createBlock(
                ExecuteActionPackage,
                {
                  key: 3,
                  pkg: unref(pkg),
                },
                null,
                8,
                ['pkg'],
              ));
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUNULnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvQUNULnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgdXNlWGl0UGFyYW1ldGVycyB9IGZyb20gJ0BzcmMvaG9va3MvdXNlLXhpdC1wYXJhbWV0ZXJzJztcbmltcG9ydCBBY3Rpb25QYWNrYWdlTGlzdCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvQWN0aW9uUGFja2FnZUxpc3QudnVlJztcbmltcG9ydCBBY3Rpb25QYWNrYWdlRWRpdG9yIGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9FZGl0QWN0aW9uUGFja2FnZS52dWUnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YSc7XG5pbXBvcnQgRXhlY3V0ZUFjdGlvblBhY2thZ2UgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL0V4ZWN1dGVBY3Rpb25QYWNrYWdlLnZ1ZSc7XG5cbmNvbnN0IHBhcmFtZXRlcnMgPSB1c2VYaXRQYXJhbWV0ZXJzKCk7XG5wYXJhbWV0ZXJzLnVuc2hpZnQoJ0FDVCcpO1xuXG5sZXQgcGtnTmFtZSA9IHVuZGVmaW5lZCBhcyBzdHJpbmcgfCB1bmRlZmluZWQ7XG5jb25zdCBlZGl0ID0gcGFyYW1ldGVyc1sxXT8udG9Mb3dlckNhc2UoKSA9PT0gJ2dlbicgfHwgcGFyYW1ldGVyc1sxXT8udG9Mb3dlckNhc2UoKSA9PT0gJ2VkaXQnO1xuaWYgKGVkaXQpIHtcbiAgcGtnTmFtZSA9IHBhcmFtZXRlcnMuc2xpY2UoMikuam9pbignICcpO1xufVxuY29uc3QgcnVuID0gcGFyYW1ldGVyc1sxXSAhPT0gdW5kZWZpbmVkICYmICFlZGl0O1xuaWYgKHJ1bikge1xuICBwa2dOYW1lID0gcGFyYW1ldGVycy5zbGljZSgxKS5qb2luKCcgJyk7XG59XG5cbmNvbnN0IHBrZyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKCFwa2dOYW1lKSByZXR1cm4gdW5kZWZpbmVkO1xuICByZXR1cm4gKFxuICAgIHVzZXJEYXRhLmFjdGlvblBhY2thZ2VzLmZpbmQoeCA9PiB4Lmdsb2JhbC5uYW1lID09PSBwa2dOYW1lKSB8fFxuICAgIHVzZXJEYXRhLmFjdGlvblBhY2thZ2VzLmZpbmQoeCA9PiB4Lmdsb2JhbC5uYW1lID09PSBwa2dOYW1lLnNwbGl0KCcgJykuam9pbignXycpKVxuICApO1xufSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8QWN0aW9uUGFja2FnZUxpc3Qgdi1pZj1cInBhcmFtZXRlcnMubGVuZ3RoID09PSAxXCIgLz5cbiAgPGRpdiB2LWVsc2UtaWY9XCIhcGtnXCI+QWN0aW9uIHBhY2thZ2UgXCJ7eyBwa2dOYW1lIH19XCIgbm90IGZvdW5kLjwvZGl2PlxuICA8QWN0aW9uUGFja2FnZUVkaXRvciB2LWVsc2UtaWY9XCJlZGl0XCIgOnBrZz1cInBrZ1wiIC8+XG4gIDxFeGVjdXRlQWN0aW9uUGFja2FnZSB2LWVsc2UgOnBrZz1cInBrZ1wiIC8+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl91bnJlZiIsIl9vcGVuQmxvY2siLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX3RvRGlzcGxheVN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBT0EsVUFBQSxhQUFBLGlCQUFBO0FBQ0EsZUFBQSxRQUFBLEtBQUE7QUFFQSxRQUFBLFVBQUE7QUFDQSxVQUFBLE9BQUEsV0FBQSxDQUFBLEdBQUEsWUFBQSxNQUFBLFNBQUEsV0FBQSxDQUFBLEdBQUEsWUFBQSxNQUFBO0FBQ0EsUUFBQSxNQUFBO0FBQ0UsZ0JBQUEsV0FBQSxNQUFBLENBQUEsRUFBQSxLQUFBLEdBQUE7QUFBQSxJQUFzQztBQUV4QyxVQUFBLE1BQUEsV0FBQSxDQUFBLE1BQUEsVUFBQSxDQUFBO0FBQ0EsUUFBQSxLQUFBO0FBQ0UsZ0JBQUEsV0FBQSxNQUFBLENBQUEsRUFBQSxLQUFBLEdBQUE7QUFBQSxJQUFzQztBQUd4QyxVQUFBLE1BQUEsU0FBQSxNQUFBO0FBQ0UsVUFBQSxDQUFBLFFBQUEsUUFBQTtBQUNBLGFBQUEsU0FBQSxlQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsT0FBQSxTQUFBLE9BQUEsS0FBQSxTQUFBLGVBQUEsS0FBQSxDQUFBLE1BQUEsRUFBQSxPQUFBLFNBQUEsUUFBQSxNQUFBLEdBQUEsRUFBQSxLQUFBLEdBQUEsQ0FBQTtBQUFBLElBRWtGLENBQUE7O0FBTXpELGFBQUFBLE1BQUEsVUFBQSxFQUFBLFdBQUEsS0FBQUMsVUFBQSxHQUFBQyxZQUFBLG1CQUFBLEVBQUEsS0FBQSxFQUFBLENBQUEsS0FBQSxDQUFBRixNQUFBLEdBQUEsS0FBQUMsVUFBQSxHQUFBRSxtQkFBQSxPQUFBLFlBQUEscUJBQUFDLGdCQUFBSixNQUFBLE9BQUEsQ0FBQSxJQUFBLGdCQUFBLENBQUEsS0FBQUEsTUFBQSxJQUFBLEtBQUFDLFVBQUEsR0FBQUMsWUFBQSxxQkFBQTtBQUFBLFFBRTBCLEtBQUE7QUFBQTtNQUFQLEdBQUEsTUFBQSxHQUFBLENBQUEsS0FBQSxDQUFBLE1BQUFELFVBQUEsR0FBQUMsWUFBQSxzQkFBQTtBQUFBLFFBQ0YsS0FBQTtBQUFBO01BQVAsR0FBQSxNQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUE7QUFBQTs7OyJ9
