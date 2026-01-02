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
