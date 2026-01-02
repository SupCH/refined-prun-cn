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
