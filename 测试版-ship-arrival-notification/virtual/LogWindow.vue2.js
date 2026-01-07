import { useCssModule } from './runtime-dom.esm-bundler.js';
import { C } from './prun-css.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  useTemplateRef,
  watch,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createCommentVNode,
  createElementVNode as createBaseVNode,
  nextTick,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'LogWindow',
  props: {
    messages: {},
    scrolling: { type: Boolean },
  },
  setup(__props) {
    const $style = useCssModule();
    const logElement = useTemplateRef('log');
    watch(
      () => __props.messages,
      () => {
        if (__props.messages.length === 0 || !__props.scrolling) {
          return;
        }
        if (logElement.value) {
          nextTick(() =>
            logElement.value.scrollTo({ top: logElement.value.scrollHeight, behavior: 'smooth' }),
          );
        }
      },
      { deep: true },
    );
    function getTagClass(tag) {
      switch (tag) {
        case 'ACTION':
        case 'SUCCESS':
          return $style.success;
        case 'WARNING':
        case 'SKIP':
          return $style.warning;
        case 'ERROR':
        case 'CANCEL':
          return $style.failure;
      }
      return void 0;
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            ref: 'log',
            class: normalizeClass([
              unref($style).log,
              ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
            ]),
          },
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(_ctx.messages, message => {
                return (
                  openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: unref(objectId)(message),
                    },
                    [
                      message.tag
                        ? (openBlock(),
                          createElementBlock(
                            'b',
                            {
                              key: 0,
                              class: normalizeClass(getTagClass(message.tag)),
                            },
                            toDisplayString(message.tag) + ': ',
                            3,
                          ))
                        : createCommentVNode('', true),
                      createBaseVNode('span', null, toDisplayString(message.message), 1),
                    ],
                  )
                );
              }),
              128,
            )),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nV2luZG93LnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQUNUL0xvZ1dpbmRvdy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IG9iamVjdElkIH0gZnJvbSAnQHNyYy91dGlscy9vYmplY3QtaWQnO1xuaW1wb3J0IHsgTG9nVGFnIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL3J1bm5lci9sb2dnZXInO1xuXG5jb25zdCB7IG1lc3NhZ2VzLCBzY3JvbGxpbmcgfSA9IGRlZmluZVByb3BzPHtcbiAgbWVzc2FnZXM6IHsgdGFnOiBMb2dUYWc7IG1lc3NhZ2U6IHN0cmluZyB9W107XG4gIHNjcm9sbGluZzogYm9vbGVhbjtcbn0+KCk7XG5cbmNvbnN0ICRzdHlsZSA9IHVzZUNzc01vZHVsZSgpO1xuXG5jb25zdCBsb2dFbGVtZW50ID0gdXNlVGVtcGxhdGVSZWYoJ2xvZycpO1xuXG53YXRjaChcbiAgKCkgPT4gbWVzc2FnZXMsXG4gICgpID0+IHtcbiAgICBpZiAobWVzc2FnZXMubGVuZ3RoID09PSAwIHx8ICFzY3JvbGxpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGxvZ0VsZW1lbnQudmFsdWUpIHtcbiAgICAgIG5leHRUaWNrKCgpID0+XG4gICAgICAgIGxvZ0VsZW1lbnQudmFsdWUuc2Nyb2xsVG8oeyB0b3A6IGxvZ0VsZW1lbnQudmFsdWUuc2Nyb2xsSGVpZ2h0LCBiZWhhdmlvcjogJ3Ntb290aCcgfSksXG4gICAgICApO1xuICAgIH1cbiAgfSxcbiAgeyBkZWVwOiB0cnVlIH0sXG4pO1xuXG5mdW5jdGlvbiBnZXRUYWdDbGFzcyh0YWc6IExvZ1RhZykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgJ0FDVElPTic6XG4gICAgY2FzZSAnU1VDQ0VTUyc6XG4gICAgICByZXR1cm4gJHN0eWxlLnN1Y2Nlc3M7XG4gICAgY2FzZSAnV0FSTklORyc6XG4gICAgY2FzZSAnU0tJUCc6XG4gICAgICByZXR1cm4gJHN0eWxlLndhcm5pbmc7XG4gICAgY2FzZSAnRVJST1InOlxuICAgIGNhc2UgJ0NBTkNFTCc6XG4gICAgICByZXR1cm4gJHN0eWxlLmZhaWx1cmU7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgcmVmPVwibG9nXCIgOmNsYXNzPVwiWyRzdHlsZS5sb2csIEMuZm9udHMuZm9udFJlZ3VsYXJdXCI+XG4gICAgPGRpdiB2LWZvcj1cIm1lc3NhZ2UgaW4gbWVzc2FnZXNcIiA6a2V5PVwib2JqZWN0SWQobWVzc2FnZSlcIj5cbiAgICAgIDxiIHYtaWY9XCJtZXNzYWdlLnRhZ1wiIDpjbGFzcz1cImdldFRhZ0NsYXNzKG1lc3NhZ2UudGFnKVwiPnt7IG1lc3NhZ2UudGFnIH19OiA8L2I+XG4gICAgICA8c3Bhbj57eyBtZXNzYWdlLm1lc3NhZ2UgfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5sb2cge1xuICBtYXJnaW4tdG9wOiA1cHg7XG4gIG1hcmdpbi1sZWZ0OiA0cHg7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBsaW5lLWhlaWdodDogMS41O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjMyODJiO1xuICBjb2xvcjogI2JiYmJiYjtcbiAgYm9yZGVyOiAxcHggc29saWQgIzJiNDg1YTtcbiAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xuXG4gICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICB3aWR0aDogMDtcbiAgfVxuXG4gICY6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cbn1cblxuLnN1Y2Nlc3Mge1xuICBjb2xvcjogIzVjYjg1Yztcbn1cblxuLmZhaWx1cmUge1xuICBjb2xvcjogI2Q5NTM0Zjtcbn1cblxuLndhcm5pbmcge1xuICBjb2xvcjogI2Y3YTYwMDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiX3VucmVmIiwiQyIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlQ29tbWVudFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBU0EsVUFBQSxTQUFBLGFBQUE7QUFFQSxVQUFBLGFBQUEsZUFBQSxLQUFBO0FBRUE7QUFBQSxNQUFBLE1BQUEsUUFBQTtBQUFBLE1BQ1EsTUFBQTtBQUVKLFlBQUEsUUFBQSxTQUFBLFdBQUEsS0FBQSxDQUFBLFFBQUEsV0FBQTtBQUNFO0FBQUEsUUFBQTtBQUVGLFlBQUEsV0FBQSxPQUFBO0FBQ0U7QUFBQSxZQUFBLE1BQUEsV0FBQSxNQUFBLFNBQUEsRUFBQSxLQUFBLFdBQUEsTUFBQSxjQUFBLFVBQUEsU0FBQSxDQUFBO0FBQUEsVUFDc0Y7QUFBQSxRQUN0RjtBQUFBLE1BQ0Y7QUFBQSxNQUNGLEVBQUEsTUFBQSxLQUFBO0FBQUEsSUFDYTtBQUdmLGFBQUEsWUFBQSxLQUFBO0FBQ0UsY0FBQSxLQUFBO0FBQUEsUUFBYSxLQUFBO0FBQUEsUUFDTixLQUFBO0FBRUgsaUJBQUEsT0FBQTtBQUFBLFFBQWMsS0FBQTtBQUFBLFFBQ1gsS0FBQTtBQUVILGlCQUFBLE9BQUE7QUFBQSxRQUFjLEtBQUE7QUFBQSxRQUNYLEtBQUE7QUFFSCxpQkFBQSxPQUFBO0FBQUEsTUFBYztBQUVsQixhQUFBO0FBQUEsSUFBTzs7O1FBVUQsS0FBQTtBQUFBLFFBTEcsT0FBQUEsZUFBQSxDQUFBQyxNQUFBLE1BQUEsRUFBQSxNQUEyQkMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsTUFBQUEsV0FBQUEsQ0FBQUE7QUFBQUEsTUFBbUIsR0FBQTtBQUFBOztZQUkvQyxLQUFBRCxNQUFBLFFBQUEsRUFBQSxPQUFBO0FBQUEsVUFIaUQsR0FBQTtBQUFBO2NBQzBCLEtBQUE7QUFBQTtZQUExQixHQUFBRSxnQkFBQSxRQUFBLEdBQUEsSUFBQSxNQUFBLENBQUEsS0FBQUMsbUJBQUEsSUFBQSxJQUFBO0FBQUE7VUFDN0IsQ0FBQTtBQUFBOzs7OzsifQ==
