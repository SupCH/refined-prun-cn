import { C } from './prun-css.js';
import { showBuffer } from './buffers.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createCommentVNode,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ContextControlsItem',
  props: {
    cmd: {},
    label: {},
  },
  setup(__props) {
    const props = __props;
    const commandParts = computed(() => {
      const words = props.cmd.split(' ');
      let command = words.shift();
      if (command === 'XIT') {
        command += ' ' + words.shift();
      }
      return [command, words.join(' ')];
    });
    const itemClasses = [C.ContextControls.item, C.fonts.fontRegular, C.type.typeSmall];
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(itemClasses),
            onClick: _cache[0] || (_cache[0] = () => unref(showBuffer)(_ctx.cmd)),
          },
          [
            createBaseVNode('span', null, [
              createBaseVNode(
                'span',
                {
                  class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ContextControls.cmd),
                },
                toDisplayString(unref(commandParts)[0]),
                3,
              ),
              createTextVNode(' ' + toDisplayString(unref(commandParts)[1]), 1),
            ]),
            _ctx.label
              ? (openBlock(),
                createElementBlock(
                  'span',
                  {
                    key: 0,
                    class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ContextControls.label),
                  },
                  ': ' + toDisplayString(_ctx.label),
                  3,
                ))
              : createCommentVNode('', true),
          ],
        )
      );
    };
  },
});
export { _sfc_main as default };
