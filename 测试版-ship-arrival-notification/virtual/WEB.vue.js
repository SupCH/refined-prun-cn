import { useXitParameters } from './use-xit-parameters.js';
import { prunAtob } from './base64.js';
import { isValidUrl } from './is-valid-url.js';
import { shortcuts } from './shortcuts.js';
import LoadingSpinner from './LoadingSpinner.vue.js';
import { useXitCommand } from './use-xit-command.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createBlock,
  createCommentVNode,
  createElementVNode as createBaseVNode,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = ['src'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'WEB',
  setup(__props) {
    const command = useXitCommand();
    const parameters = useXitParameters();
    const url = getUrl();
    function getUrl() {
      const applyShortcut = shortcuts.get(command.toUpperCase());
      if (applyShortcut) {
        return applyShortcut(parameters);
      }
      let url2 = parameters[1];
      if (isValidUrl(url2)) {
        return url2;
      }
      try {
        return prunAtob(parameters.join(''));
      } catch {
        return void 0;
      }
    }
    const loading = ref(true);
    return (_ctx, _cache) => {
      return !unref(url)
        ? (openBlock(), createElementBlock('div', _hoisted_1, 'Invalid parameters!'))
        : !unref(isValidUrl)(unref(url))
          ? (openBlock(),
            createElementBlock(
              'div',
              _hoisted_2,
              'Url ' + toDisplayString(unref(url)) + ' is invalid!',
              1,
            ))
          : (openBlock(),
            createElementBlock(
              Fragment,
              { key: 2 },
              [
                unref(loading)
                  ? (openBlock(), createBlock(LoadingSpinner, { key: 0 }))
                  : createCommentVNode('', true),
                createBaseVNode(
                  'iframe',
                  {
                    src: unref(url),
                    allow: 'clipboard-write',
                    width: '100%',
                    height: '99.65%',
                    style: { 'border-width': '0' },
                    onLoad: _cache[0] || (_cache[0] = $event => (loading.value = false)),
                  },
                  null,
                  40,
                  _hoisted_3,
                ),
              ],
              64,
            ));
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV0VCLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9XRUIvV0VCLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgdXNlWGl0UGFyYW1ldGVycyB9IGZyb20gJ0BzcmMvaG9va3MvdXNlLXhpdC1wYXJhbWV0ZXJzJztcbmltcG9ydCB7IHBydW5BdG9iIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2Jhc2U2NCc7XG5pbXBvcnQgeyBpc1ZhbGlkVXJsIH0gZnJvbSAnQHNyYy91dGlscy9pcy12YWxpZC11cmwnO1xuaW1wb3J0IHsgc2hvcnRjdXRzIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvV0VCL3Nob3J0Y3V0cyc7XG5pbXBvcnQgTG9hZGluZ1NwaW5uZXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL0xvYWRpbmdTcGlubmVyLnZ1ZSc7XG5pbXBvcnQgeyB1c2VYaXRDb21tYW5kIH0gZnJvbSAnQHNyYy9ob29rcy91c2UteGl0LWNvbW1hbmQnO1xuXG5jb25zdCBjb21tYW5kID0gdXNlWGl0Q29tbWFuZCgpO1xuY29uc3QgcGFyYW1ldGVycyA9IHVzZVhpdFBhcmFtZXRlcnMoKTtcbmNvbnN0IHVybCA9IGdldFVybCgpO1xuXG5mdW5jdGlvbiBnZXRVcmwoKSB7XG4gIGNvbnN0IGFwcGx5U2hvcnRjdXQgPSBzaG9ydGN1dHMuZ2V0KGNvbW1hbmQudG9VcHBlckNhc2UoKSk7XG4gIGlmIChhcHBseVNob3J0Y3V0KSB7XG4gICAgcmV0dXJuIGFwcGx5U2hvcnRjdXQocGFyYW1ldGVycyk7XG4gIH1cbiAgbGV0IHVybCA9IHBhcmFtZXRlcnNbMV07XG4gIGlmIChpc1ZhbGlkVXJsKHVybCkpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHRyeSB7XG4gICAgcmV0dXJuIHBydW5BdG9iKHBhcmFtZXRlcnMuam9pbignJykpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmNvbnN0IGxvYWRpbmcgPSByZWYodHJ1ZSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IHYtaWY9XCIhdXJsXCI+SW52YWxpZCBwYXJhbWV0ZXJzITwvZGl2PlxuICA8ZGl2IHYtZWxzZS1pZj1cIiFpc1ZhbGlkVXJsKHVybClcIj5Vcmwge3sgdXJsIH19IGlzIGludmFsaWQhPC9kaXY+XG4gIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgPExvYWRpbmdTcGlubmVyIHYtaWY9XCJsb2FkaW5nXCIgLz5cbiAgICA8aWZyYW1lXG4gICAgICA6c3JjPVwidXJsXCJcbiAgICAgIGFsbG93PVwiY2xpcGJvYXJkLXdyaXRlXCJcbiAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICBoZWlnaHQ9XCI5OS42NSVcIlxuICAgICAgc3R5bGU9XCJib3JkZXItd2lkdGg6IDBcIlxuICAgICAgQGxvYWQ9XCJsb2FkaW5nID0gZmFsc2VcIiAvPlxuICA8L3RlbXBsYXRlPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfdW5yZWYiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZUNvbW1lbnRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBUUEsVUFBQSxVQUFBLGNBQUE7QUFDQSxVQUFBLGFBQUEsaUJBQUE7QUFDQSxVQUFBLE1BQUEsT0FBQTtBQUVBLGFBQUEsU0FBQTtBQUNFLFlBQUEsZ0JBQUEsVUFBQSxJQUFBLFFBQUEsWUFBQSxDQUFBO0FBQ0EsVUFBQSxlQUFBO0FBQ0UsZUFBQSxjQUFBLFVBQUE7QUFBQSxNQUErQjtBQUVqQyxVQUFBLE9BQUEsV0FBQSxDQUFBO0FBQ0EsVUFBQSxXQUFBLElBQUEsR0FBQTtBQUNFLGVBQUE7QUFBQSxNQUFPO0FBRVQsVUFBQTtBQUNFLGVBQUEsU0FBQSxXQUFBLEtBQUEsRUFBQSxDQUFBO0FBQUEsTUFBbUMsUUFBQTtBQUVuQyxlQUFBO0FBQUEsTUFBTztBQUFBLElBQ1Q7QUFHRixVQUFBLFVBQUEsSUFBQSxJQUFBOzs7UUFlYUEsTUFBQSxPQUFBLEtBQUFDLFVBQUEsR0FBQUMsWUFBQSxnQkFBQSxFQUFBLEtBQUEsRUFBQSxDQUFBLEtBQUFDLG1CQUFBLElBQUEsSUFBQTtBQUFBO1VBRG1CLEtBQUFILE1BQUEsR0FBQTtBQUFBLFVBTHBCLE9BQUE7QUFBQSxVQUNBLE9BQUE7QUFBQSxVQUNBLFFBQUE7QUFBQSxVQUNDLE9BQUEsRUFBQSxnQkFBQSxJQUFBO0FBQUEsVUFDUCxRQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQSxRQUFBLFFBQUE7QUFBQSxRQUNjLEdBQUEsTUFBQSxJQUFBLFVBQUE7QUFBQTs7OzsifQ==
