import LoadingSpinner from './LoadingSpinner.vue.js';
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
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CALC',
  setup(__props) {
    const loading = ref(true);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            unref(loading)
              ? (openBlock(),
                createBlock(
                  LoadingSpinner,
                  {
                    key: 0,
                    class: normalizeClass(_ctx.$style.loading),
                  },
                  null,
                  8,
                  ['class'],
                ))
              : createCommentVNode('', true),
            createBaseVNode(
              'iframe',
              {
                src: 'https://refined-prun.github.io/xit-calc/',
                width: '100%',
                height: '100%',
                class: normalizeClass(_ctx.$style.calc),
                onLoad: _cache[0] || (_cache[0] = $event => (loading.value = false)),
              },
              null,
              34,
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
