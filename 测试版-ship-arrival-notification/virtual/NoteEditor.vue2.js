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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90ZUVkaXRvci52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL05PVEUvTm90ZUVkaXRvci52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHNob3dCdWZmZXIgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYnVmZmVycyc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9IZWFkZXIudnVlJztcblxuY29uc3QgeyBub3RlIH0gPSBkZWZpbmVQcm9wczx7IG5vdGU6IFVzZXJEYXRhLk5vdGUgfT4oKTtcblxuY29uc3QgJHN0eWxlID0gdXNlQ3NzTW9kdWxlKCk7XG5cbmNvbnN0IHNlZ21lbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCB0ZXh0ID0gbm90ZS50ZXh0O1xuICBpZiAodGV4dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgcmVnZXhwID0gL1xcYig/OlthLXpBLVowLTldezEsM31cXC4oPzpDSTF8SUMxfEFJMXxOQzF8Q0kyfE5DMikpXFxiL2c7XG4gIGNvbnN0IHJlc3VsdDogeyB0ZXh0OiBzdHJpbmc7IGlzTGluazogYm9vbGVhbiB9W10gPSBbXTtcbiAgbGV0IGxhc3RJbmRleCA9IDA7XG4gIGxldCBtYXRjaDtcblxuICB3aGlsZSAoKG1hdGNoID0gcmVnZXhwLmV4ZWModGV4dCkpICE9PSBudWxsKSB7XG4gICAgaWYgKG1hdGNoLmluZGV4ID4gbGFzdEluZGV4KSB7XG4gICAgICByZXN1bHQucHVzaCh7IHRleHQ6IHRleHQuc3Vic3RyaW5nKGxhc3RJbmRleCwgbWF0Y2guaW5kZXgpLCBpc0xpbms6IGZhbHNlIH0pO1xuICAgIH1cbiAgICByZXN1bHQucHVzaCh7IHRleHQ6IG1hdGNoWzBdLCBpc0xpbms6IHRydWUgfSk7XG4gICAgbGFzdEluZGV4ID0gcmVnZXhwLmxhc3RJbmRleDtcbiAgfVxuXG4gIGlmIChsYXN0SW5kZXggPCB0ZXh0Lmxlbmd0aCkge1xuICAgIHJlc3VsdC5wdXNoKHsgdGV4dDogdGV4dC5zdWJzdHJpbmcobGFzdEluZGV4KSwgaXNMaW5rOiBmYWxzZSB9KTtcbiAgfSBlbHNlIGlmICh0ZXh0W3RleHQubGVuZ3RoIC0gMV0gPT09ICdcXG4nKSB7XG4gICAgLy8gQWNjb3VudCBmb3IgZmluYWwgbmV3IGxpbmVcbiAgICByZXN1bHQucHVzaCh7IHRleHQ6ICcgJywgaXNMaW5rOiBmYWxzZSB9KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxuY29uc3QgdGV4dGJveCA9IHVzZVRlbXBsYXRlUmVmPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCd0ZXh0Ym94Jyk7XG5jb25zdCBvdmVybGF5ID0gdXNlVGVtcGxhdGVSZWY8SFRNTFByZUVsZW1lbnQ+KCdvdmVybGF5Jyk7XG5cbm9uTW91bnRlZCgoKSA9PiB7XG4gIHRleHRib3gudmFsdWUhLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcbiAgICBvdmVybGF5LnZhbHVlIS5zY3JvbGxUb3AgPSB0ZXh0Ym94LnZhbHVlIS5zY3JvbGxUb3A7XG4gICAgb3ZlcmxheS52YWx1ZSEuc2Nyb2xsTGVmdCA9IHRleHRib3gudmFsdWUhLnNjcm9sbExlZnQ7XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIG9uTGlua0NsaWNrKHRleHQ6IHN0cmluZykge1xuICBzaG93QnVmZmVyKGBDWFBPICR7dGV4dH1gKTtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxIZWFkZXIgdi1tb2RlbD1cIm5vdGUubmFtZVwiIGVkaXRhYmxlIDpjbGFzcz1cIiRzdHlsZS5oZWFkZXJcIiAvPlxuICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5oZWFkZXJcIj57eyBub3RlLm5hbWUgfX08L2Rpdj5cbiAgPGRpdj5cbiAgICA8dGV4dGFyZWEgcmVmPVwidGV4dGJveFwiIHYtbW9kZWw9XCJub3RlLnRleHRcIiA6Y2xhc3M9XCIkc3R5bGUudGV4dGFyZWFcIiBzcGVsbGNoZWNrPVwiZmFsc2VcIiAvPlxuICAgIDxwcmUgcmVmPVwib3ZlcmxheVwiIDpjbGFzcz1cIiRzdHlsZS5vdmVybGF5XCI+XG4gICAgICA8dGVtcGxhdGUgdi1mb3I9XCIoc2VnbWVudCwgaSkgaW4gc2VnbWVudHNcIiA6a2V5PVwiaVwiPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIHYtaWY9XCJzZWdtZW50LmlzTGlua1wiXG4gICAgICAgICAgOmNsYXNzPVwiW0MuTGluay5saW5rLCAkc3R5bGUubGlua11cIlxuICAgICAgICAgIEBjbGljaz1cIm9uTGlua0NsaWNrKHNlZ21lbnQudGV4dClcIlxuICAgICAgICA+e3sgc2VnbWVudC50ZXh0IH19PC9zcGFuPlxuICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPnt7IHNlZ21lbnQudGV4dCB9fTwvdGVtcGxhdGU+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcHJlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uaGVhZGVyIHtcbiAgcGFkZGluZy10b3A6IDVweDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDJweDtcbn1cblxuLnRleHRhcmVhIHtcbiAgY29sb3I6IHRyYW5zcGFyZW50O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY2FyZXQtY29sb3I6IHdoaXRlO1xuICBtYXJnaW46IDEwcHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGJvcmRlcjogMDtcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDIwcHgpO1xuICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDIwcHggLSAyMHB4KTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDIwcHg7XG4gIGxlZnQ6IDA7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgZm9udC1mYW1pbHk6ICdEcm9pZCBTYW5zJywgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBsaW5lLWhlaWdodDogMS41O1xuICB0YWItc2l6ZTogNDtcbiAgcmVzaXplOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuXG4udGV4dGFyZWE6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4udGV4dGFyZWE6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgd2lkdGg6IDA7XG59XG5cbi5vdmVybGF5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyMzYxZDtcbiAgY29sb3I6ICNjY2NjY2M7XG4gIG1hcmdpbjogMTBweDtcbiAgcGFkZGluZzogMTBweDtcbiAgYm9yZGVyOiAwO1xuICB3aWR0aDogY2FsYygxMDAlIC0gMjBweCk7XG4gIGhlaWdodDogY2FsYygxMDAlIC0gMjBweCAtIDIwcHgpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMjBweDtcbiAgbGVmdDogMDtcbiAgb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBmb250LWZhbWlseTogJ0Ryb2lkIFNhbnMnLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDEzcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIHRhYi1zaXplOiA0O1xufVxuXG4ub3ZlcmxheTo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICB3aWR0aDogMDtcbn1cblxuLmxpbmsge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDI7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIl91bnJlZiIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3dpdGhEaXJlY3RpdmVzIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJDIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQU1BLFVBQUEsU0FBQSxhQUFBO0FBRUEsVUFBQSxXQUFBLFNBQUEsTUFBQTtBQUNFLFlBQUEsT0FBQSxRQUFBLEtBQUE7QUFDQSxVQUFBLFNBQUEsUUFBQTtBQUNFLGVBQUEsQ0FBQTtBQUFBLE1BQVE7QUFHVixZQUFBLFNBQUE7QUFDQSxZQUFBLFNBQUEsQ0FBQTtBQUNBLFVBQUEsWUFBQTtBQUNBLFVBQUE7QUFFQSxjQUFBLFFBQUEsT0FBQSxLQUFBLElBQUEsT0FBQSxNQUFBO0FBQ0UsWUFBQSxNQUFBLFFBQUEsV0FBQTtBQUNFLGlCQUFBLEtBQUEsRUFBQSxNQUFBLEtBQUEsVUFBQSxXQUFBLE1BQUEsS0FBQSxHQUFBLFFBQUEsTUFBQSxDQUFBO0FBQUEsUUFBMkU7QUFFN0UsZUFBQSxLQUFBLEVBQUEsTUFBQSxNQUFBLENBQUEsR0FBQSxRQUFBLE1BQUE7QUFDQSxvQkFBQSxPQUFBO0FBQUEsTUFBbUI7QUFHckIsVUFBQSxZQUFBLEtBQUEsUUFBQTtBQUNFLGVBQUEsS0FBQSxFQUFBLE1BQUEsS0FBQSxVQUFBLFNBQUEsR0FBQSxRQUFBLE9BQUE7QUFBQSxNQUE4RCxXQUFBLEtBQUEsS0FBQSxTQUFBLENBQUEsTUFBQSxNQUFBO0FBRzlELGVBQUEsS0FBQSxFQUFBLE1BQUEsS0FBQSxRQUFBLE9BQUE7QUFBQSxNQUF3QztBQUcxQyxhQUFBO0FBQUEsSUFBTyxDQUFBO0FBR1QsVUFBQSxVQUFBLGVBQUEsU0FBQTtBQUNBLFVBQUEsVUFBQSxlQUFBLFNBQUE7QUFFQSxjQUFBLE1BQUE7QUFDRSxjQUFBLE1BQUEsaUJBQUEsVUFBQSxNQUFBO0FBQ0UsZ0JBQUEsTUFBQSxZQUFBLFFBQUEsTUFBQTtBQUNBLGdCQUFBLE1BQUEsYUFBQSxRQUFBLE1BQUE7QUFBQSxNQUEyQyxDQUFBO0FBQUEsSUFDNUMsQ0FBQTtBQUdILGFBQUEsWUFBQSxNQUFBO0FBQ0UsaUJBQUEsUUFBQSxJQUFBLEVBQUE7QUFBQSxJQUF5Qjs7OztVQUtxQyxZQUFBLEtBQUEsS0FBQTtBQUFBLFVBQXhDLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQSxLQUFBLEtBQUEsT0FBQTtBQUFBLFVBQUksVUFBQTtBQUFBLFVBQUUsT0FBQUEsZUFBQUMsTUFBQSxNQUFBLEVBQUEsTUFBQTtBQUFBLFFBQThCLEdBQUEsTUFBQSxHQUFBLENBQUEsY0FBQSxPQUFBLENBQUE7QUFBQTtVQUNULE9BQUFELGVBQUFDLE1BQUEsTUFBQSxFQUFBLE1BQUE7QUFBQSxRQUF2QixHQUFBQyxnQkFBQSxLQUFBLEtBQUEsSUFBQSxHQUFBLENBQUE7QUFBQSxRQUFjQyxnQkFBQSxPQUFBLE1BQUE7QUFBQSxVQWFsQ0MsZUFBQUQsZ0JBQUEsWUFBQTtBQUFBLFlBWHNGLFNBQUE7QUFBQSxZQUE1RSxLQUFBO0FBQUEsWUFBQSx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsS0FBQSxLQUFBLE9BQUE7QUFBQSxZQUE0QixPQUFBSCxlQUFBQyxNQUFBLE1BQUEsRUFBQSxRQUFBO0FBQUEsWUFBeUIsWUFBQTtBQUFBLFVBQWEsR0FBQSxNQUFBLENBQUEsR0FBQTtBQUFBO1VBQXRDLENBQUE7QUFBQTtZQVVwQyxTQUFBO0FBQUEsWUFURyxLQUFBO0FBQUEsWUFBQSxPQUFBRCxlQUFBQyxNQUFBLE1BQUEsRUFBQSxPQUFBO0FBQUEsVUFBZ0MsR0FBQTtBQUFBO2FBQ3ZDSSxVQUFBLElBQUEsR0FBQUMsbUJBQUFDLFVBQUEsTUFBQUMsV0FBQVAsTUFBQSxRQUFBLEdBQUEsQ0FBQSxTQUFBLE1BQUE7O2dCQUFrRCxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQVEsZ0JBQUEsY0FBQSxFQUFBO0FBQUEsZ0JBQ2hELFFBQUEsVUFBQUosYUFBQUMsbUJBQUEsUUFBQTtBQUFBLGtCQUkwQixLQUFBO0FBQUEsMENBRmZJLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO2tCQUF3QixTQUFBLENBQUEsV0FBQSxZQUFBLFFBQUEsSUFBQTtBQUFBLGdCQUNELEdBQUFSLGdCQUFBLFFBQUEsSUFBQSxHQUFBLElBQUEsVUFBQSxNQUFBRyxVQUFBLEdBQUFDLG1CQUFBQyxVQUFBLEVBQUEsS0FBQSxFQUFBLEdBQUE7QUFBQSxrQkFFWUUsZ0JBQUFQLGdCQUFBLFFBQUEsSUFBQSxHQUFBLENBQUE7QUFBQSxnQkFBZCxHQUFBLEVBQUE7QUFBQTtjQUNsQyxHQUFBLEVBQUE7QUFBQTs7VUFDRixHQUFBLENBQUE7QUFBQTs7Ozs7In0=
