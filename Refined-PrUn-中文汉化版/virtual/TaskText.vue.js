import PrunLink from './PrunLink.vue.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createBlock,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'TaskText',
  props: {
    text: {},
  },
  setup(__props) {
    const parts = computed(() => {
      const parts2 = [];
      let processed = __props.text;
      if (!processed) {
        return parts2;
      }
      const matches = [...processed.matchAll(/\[\[([a-zA-Z]):([^:\]]+)]]/g)];
      let cut = 0;
      for (const match of matches) {
        const before = processed.substring(0, match.index - cut);
        if (before.length > 0) {
          parts2.push({ text: before });
        }
        switch (match[1]) {
          case 'm':
            parts2.push({ text: match[2], command: `MAT ${match[2]}` });
            break;
          case 'p':
            parts2.push({ text: match[2], command: `BS ${match[2]}` });
            break;
          default:
            parts2.push({ text: match[0] });
            break;
        }
        processed = processed.slice(match.index + match[0].length - cut);
        cut = match.index + match[0].length;
      }
      if (processed.length > 0) {
        parts2.push({ text: processed });
      }
      return parts2;
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          (openBlock(true),
          createElementBlock(
            Fragment,
            null,
            renderList(unref(parts), part => {
              return (
                openBlock(),
                createElementBlock(
                  Fragment,
                  {
                    key: unref(objectId)(part),
                  },
                  [
                    part.command
                      ? (openBlock(),
                        createBlock(
                          PrunLink,
                          {
                            key: 0,
                            inline: '',
                            command: part.command,
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(part.text), 1),
                            ]),
                            _: 2,
                          },
                          1032,
                          ['command'],
                        ))
                      : (openBlock(),
                        createElementBlock('span', _hoisted_1, toDisplayString(part.text), 1)),
                  ],
                  64,
                )
              );
            }),
            128,
          )),
        ])
      );
    };
  },
});
export { _sfc_main as default };
