import { useCssModule, vModelText } from './runtime-dom.esm-bundler.js';
import { C } from './prun-css.js';
import { showBuffer } from './buffers.js';
import Header from './Header.vue.js';
import {
  defineComponent,
  computed,
  useTemplateRef,
  onMounted,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withDirectives,
  createTextVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = ['onClick'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'NoteEditor',
  props: {
    note: {},
  },
  setup(__props) {
    const $style = useCssModule();
    const segments = computed(() => {
      const text = __props.note.text;
      if (text === void 0) {
        return [];
      }
      const regexp = /\b(?:[a-zA-Z0-9]{1,3}\.(?:CI1|IC1|AI1|NC1|CI2|NC2))\b/g;
      const result = [];
      let lastIndex = 0;
      let match;
      while ((match = regexp.exec(text)) !== null) {
        if (match.index > lastIndex) {
          result.push({ text: text.substring(lastIndex, match.index), isLink: false });
        }
        result.push({ text: match[0], isLink: true });
        lastIndex = regexp.lastIndex;
      }
      if (lastIndex < text.length) {
        result.push({ text: text.substring(lastIndex), isLink: false });
      } else if (text[text.length - 1] === '\n') {
        result.push({ text: ' ', isLink: false });
      }
      return result;
    });
    const textbox = useTemplateRef('textbox');
    const overlay = useTemplateRef('overlay');
    onMounted(() => {
      textbox.value.addEventListener('scroll', () => {
        overlay.value.scrollTop = textbox.value.scrollTop;
        overlay.value.scrollLeft = textbox.value.scrollLeft;
      });
    });
    function onLinkClick(text) {
      showBuffer(`CXPO ${text}`);
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(
              Header,
              {
                modelValue: _ctx.note.name,
                'onUpdate:modelValue':
                  _cache[0] || (_cache[0] = $event => (_ctx.note.name = $event)),
                editable: '',
                class: normalizeClass(unref($style).header),
              },
              null,
              8,
              ['modelValue', 'class'],
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(unref($style).header),
              },
              toDisplayString(_ctx.note.name),
              3,
            ),
            createBaseVNode('div', null, [
              withDirectives(
                createBaseVNode(
                  'textarea',
                  {
                    ref_key: 'textbox',
                    ref: textbox,
                    'onUpdate:modelValue':
                      _cache[1] || (_cache[1] = $event => (_ctx.note.text = $event)),
                    class: normalizeClass(unref($style).textarea),
                    spellcheck: 'false',
                  },
                  null,
                  2,
                ),
                [[vModelText, _ctx.note.text]],
              ),
              createBaseVNode(
                'pre',
                {
                  ref_key: 'overlay',
                  ref: overlay,
                  class: normalizeClass(unref($style).overlay),
                },
                [
                  _cache[4] || (_cache[4] = createTextVNode('      ', -1)),
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(unref(segments), (segment, i) => {
                      return (
                        openBlock(),
                        createElementBlock(
                          Fragment,
                          { key: i },
                          [
                            _cache[2] || (_cache[2] = createTextVNode('\n        ', -1)),
                            segment.isLink
                              ? (openBlock(),
                                createElementBlock(
                                  'span',
                                  {
                                    key: 0,
                                    class: normalizeClass([
                                      ('C' in _ctx ? _ctx.C : unref(C)).Link.link,
                                      unref($style).link,
                                    ]),
                                    onClick: $event => onLinkClick(segment.text),
                                  },
                                  toDisplayString(segment.text),
                                  11,
                                  _hoisted_1,
                                ))
                              : (openBlock(),
                                createElementBlock(
                                  Fragment,
                                  { key: 1 },
                                  [createTextVNode(toDisplayString(segment.text), 1)],
                                  64,
                                )),
                            _cache[3] || (_cache[3] = createTextVNode('\n      ', -1)),
                          ],
                          64,
                        )
                      );
                    }),
                    128,
                  )),
                  _cache[5] || (_cache[5] = createTextVNode('\n    ', -1)),
                ],
                2,
              ),
            ]),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
