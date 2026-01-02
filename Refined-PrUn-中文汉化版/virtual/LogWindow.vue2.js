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
