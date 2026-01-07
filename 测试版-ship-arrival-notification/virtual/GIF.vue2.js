import LoadingSpinner from './LoadingSpinner.vue.js';
import { useXitParameters } from './use-xit-parameters.js';
import {
  defineComponent,
  onMounted,
  createElementBlock,
  openBlock,
  createBlock,
  createCommentVNode,
  createElementVNode as createBaseVNode,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = ['src'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'GIF',
  setup(__props) {
    const parameters = useXitParameters();
    const tag = parameters.join(' ');
    const isLoading = ref(false);
    const url = ref();
    async function load() {
      if (isLoading.value) {
        return;
      }
      isLoading.value = true;
      url.value = void 0;
      let rawUrl = 'https://api.giphy.com/v1/gifs/random?api_key=c92SYJwV9J9MYJ33WGRdux4mNxAipq9y';
      if (tag) {
        rawUrl += '&tag=' + tag;
      }
      try {
        const response = await (await fetch(encodeURI(rawUrl))).json();
        url.value = response.data.images.original.webp;
      } catch (e) {
        console.error(e);
        url.value = '';
      }
    }
    function onLoad() {
      isLoading.value = false;
    }
    onMounted(() => void load());
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            unref(isLoading)
              ? (openBlock(), createBlock(LoadingSpinner, { key: 0 }))
              : createCommentVNode('', true),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.container),
              },
              [
                createBaseVNode(
                  'img',
                  {
                    class: normalizeClass(_ctx.$style.image),
                    src: unref(url),
                    alt: 'gif',
                    onClick: load,
                    onLoad,
                    onError: onLoad,
                  },
                  null,
                  42,
                  _hoisted_1,
                ),
              ],
              2,
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0lGLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvR0lGLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IExvYWRpbmdTcGlubmVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9Mb2FkaW5nU3Bpbm5lci52dWUnO1xuaW1wb3J0IHsgdXNlWGl0UGFyYW1ldGVycyB9IGZyb20gJ0BzcmMvaG9va3MvdXNlLXhpdC1wYXJhbWV0ZXJzJztcblxuY29uc3QgcGFyYW1ldGVycyA9IHVzZVhpdFBhcmFtZXRlcnMoKTtcbmNvbnN0IHRhZyA9IHBhcmFtZXRlcnMuam9pbignICcpO1xuXG5jb25zdCBpc0xvYWRpbmcgPSByZWYoZmFsc2UpO1xuY29uc3QgdXJsID0gcmVmPHN0cmluZyB8IHVuZGVmaW5lZD4oKTtcblxuYXN5bmMgZnVuY3Rpb24gbG9hZCgpIHtcbiAgaWYgKGlzTG9hZGluZy52YWx1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpc0xvYWRpbmcudmFsdWUgPSB0cnVlO1xuICB1cmwudmFsdWUgPSB1bmRlZmluZWQ7XG4gIGxldCByYXdVcmwgPSAnaHR0cHM6Ly9hcGkuZ2lwaHkuY29tL3YxL2dpZnMvcmFuZG9tP2FwaV9rZXk9YzkyU1lKd1Y5SjlNWUozM1dHUmR1eDRtTnhBaXBxOXknO1xuICBpZiAodGFnKSB7XG4gICAgcmF3VXJsICs9ICcmdGFnPScgKyB0YWc7XG4gIH1cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IChhd2FpdCBmZXRjaChlbmNvZGVVUkkocmF3VXJsKSkpLmpzb24oKTtcbiAgICB1cmwudmFsdWUgPSByZXNwb25zZS5kYXRhLmltYWdlcy5vcmlnaW5hbC53ZWJwO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB1cmwudmFsdWUgPSAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkxvYWQoKSB7XG4gIGlzTG9hZGluZy52YWx1ZSA9IGZhbHNlO1xufVxuXG5vbk1vdW50ZWQoKCkgPT4gdm9pZCBsb2FkKCkpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPExvYWRpbmdTcGlubmVyIHYtaWY9XCJpc0xvYWRpbmdcIiAvPlxuICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5jb250YWluZXJcIj5cbiAgICA8aW1nIDpjbGFzcz1cIiRzdHlsZS5pbWFnZVwiIDpzcmM9XCJ1cmxcIiBhbHQ9XCJnaWZcIiBAY2xpY2s9XCJsb2FkXCIgQGxvYWQ9XCJvbkxvYWRcIiBAZXJyb3I9XCJvbkxvYWRcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5pbWFnZSB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogMTAwJTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJfdW5yZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLFVBQUEsYUFBQSxpQkFBQTtBQUNBLFVBQUEsTUFBQSxXQUFBLEtBQUEsR0FBQTtBQUVBLFVBQUEsWUFBQSxJQUFBLEtBQUE7QUFDQSxVQUFBLE1BQUEsSUFBQTtBQUVBLG1CQUFBLE9BQUE7QUFDRSxVQUFBLFVBQUEsT0FBQTtBQUNFO0FBQUEsTUFBQTtBQUVGLGdCQUFBLFFBQUE7QUFDQSxVQUFBLFFBQUE7QUFDQSxVQUFBLFNBQUE7QUFDQSxVQUFBLEtBQUE7QUFDRSxrQkFBQSxVQUFBO0FBQUEsTUFBb0I7QUFFdEIsVUFBQTtBQUNFLGNBQUEsV0FBQSxPQUFBLE1BQUEsTUFBQSxVQUFBLE1BQUEsQ0FBQSxHQUFBLEtBQUE7QUFDQSxZQUFBLFFBQUEsU0FBQSxLQUFBLE9BQUEsU0FBQTtBQUFBLE1BQTBDLFNBQUEsR0FBQTtBQUUxQyxnQkFBQSxNQUFBLENBQUE7QUFDQSxZQUFBLFFBQUE7QUFBQSxNQUFZO0FBQUEsSUFDZDtBQUdGLGFBQUEsU0FBQTtBQUNFLGdCQUFBLFFBQUE7QUFBQSxJQUFrQjtBQUdwQixjQUFBLE1BQUEsS0FBQSxNQUFBOzs7OztVQU9RLE9BQUFBLGVBQUEsS0FBQSxPQUFBLFNBQUE7QUFBQSxRQUZ1QixHQUFBO0FBQUE7WUFDb0UsT0FBQUEsZUFBQSxLQUFBLE9BQUEsS0FBQTtBQUFBLFlBQXRFLEtBQUFDLE1BQUEsR0FBQTtBQUFBLFlBQVEsS0FBQTtBQUFBLFlBQVMsU0FBQTtBQUFBLFlBQWM7QUFBQSxZQUFPLFNBQUE7QUFBQSxVQUFzQixHQUFBLE1BQUEsSUFBQSxVQUFBO0FBQUE7Ozs7OyJ9
