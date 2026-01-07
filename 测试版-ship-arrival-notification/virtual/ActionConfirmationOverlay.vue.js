import { C } from './prun-css.js';
import _sfc_main$1 from './PrunButton.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ActionConfirmationOverlay',
  props: {
    confirmLabel: { default: 'Confirm' },
    message: {},
    onClose: { type: Function },
    onConfirm: { type: Function },
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).ActionConfirmationOverlay.container,
              ('C' in _ctx ? _ctx.C : unref(C)).ActionFeedback.overlay,
            ]),
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).ActionConfirmationOverlay.message,
                  ('C' in _ctx ? _ctx.C : unref(C)).ActionFeedback.message,
                  ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                  ('C' in _ctx ? _ctx.C : unref(C)).type.typeLarger,
                ]),
              },
              [
                createBaseVNode(
                  'span',
                  {
                    class: normalizeClass([
                      ('C' in _ctx ? _ctx.C : unref(C)).ActionConfirmationOverlay.message,
                      ('C' in _ctx ? _ctx.C : unref(C)).ActionFeedback.message,
                      ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                      ('C' in _ctx ? _ctx.C : unref(C)).type.typeLarger,
                    ]),
                  },
                  'Confirmation required',
                  2,
                ),
                createBaseVNode(
                  'span',
                  {
                    class: normalizeClass([
                      ('C' in _ctx ? _ctx.C : unref(C)).ActionConfirmationOverlay.text,
                      ('C' in _ctx ? _ctx.C : unref(C)).ActionFeedback.text,
                      ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                      ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
                    ]),
                  },
                  toDisplayString(_ctx.message),
                  3,
                ),
                createBaseVNode(
                  'div',
                  {
                    class: normalizeClass([
                      ('C' in _ctx ? _ctx.C : unref(C)).ActionConfirmationOverlay.buttons,
                    ]),
                  },
                  [
                    createVNode(
                      _sfc_main$1,
                      {
                        neutral: '',
                        onClick: _ctx.onClose,
                      },
                      {
                        default: withCtx(() => [
                          ...(_cache[0] || (_cache[0] = [createTextVNode('Cancel', -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                    createVNode(
                      _sfc_main$1,
                      {
                        danger: '',
                        onClick: _ctx.onConfirm,
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.confirmLabel), 1),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                  ],
                  2,
                ),
              ],
              2,
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uQ29uZmlybWF0aW9uT3ZlcmxheS52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FjdGlvbkNvbmZpcm1hdGlvbk92ZXJsYXkudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuXG5jb25zdCB7IGNvbmZpcm1MYWJlbCA9ICdDb25maXJtJyB9ID0gZGVmaW5lUHJvcHM8e1xuICBjb25maXJtTGFiZWw/OiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xufT4oKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiW0MuQWN0aW9uQ29uZmlybWF0aW9uT3ZlcmxheS5jb250YWluZXIsIEMuQWN0aW9uRmVlZGJhY2sub3ZlcmxheV1cIj5cbiAgICA8ZGl2XG4gICAgICA6Y2xhc3M9XCJbXG4gICAgICAgIEMuQWN0aW9uQ29uZmlybWF0aW9uT3ZlcmxheS5tZXNzYWdlLFxuICAgICAgICBDLkFjdGlvbkZlZWRiYWNrLm1lc3NhZ2UsXG4gICAgICAgIEMuZm9udHMuZm9udFJlZ3VsYXIsXG4gICAgICAgIEMudHlwZS50eXBlTGFyZ2VyLFxuICAgICAgXVwiPlxuICAgICAgPHNwYW5cbiAgICAgICAgOmNsYXNzPVwiW1xuICAgICAgICAgIEMuQWN0aW9uQ29uZmlybWF0aW9uT3ZlcmxheS5tZXNzYWdlLFxuICAgICAgICAgIEMuQWN0aW9uRmVlZGJhY2subWVzc2FnZSxcbiAgICAgICAgICBDLmZvbnRzLmZvbnRSZWd1bGFyLFxuICAgICAgICAgIEMudHlwZS50eXBlTGFyZ2VyLFxuICAgICAgICBdXCJcbiAgICAgICAgPkNvbmZpcm1hdGlvbiByZXF1aXJlZDwvc3BhblxuICAgICAgPlxuICAgICAgPHNwYW5cbiAgICAgICAgOmNsYXNzPVwiW1xuICAgICAgICAgIEMuQWN0aW9uQ29uZmlybWF0aW9uT3ZlcmxheS50ZXh0LFxuICAgICAgICAgIEMuQWN0aW9uRmVlZGJhY2sudGV4dCxcbiAgICAgICAgICBDLmZvbnRzLmZvbnRSZWd1bGFyLFxuICAgICAgICAgIEMudHlwZS50eXBlUmVndWxhcixcbiAgICAgICAgXVwiXG4gICAgICAgID57eyBtZXNzYWdlIH19PC9zcGFuXG4gICAgICA+XG4gICAgICA8ZGl2IDpjbGFzcz1cIltDLkFjdGlvbkNvbmZpcm1hdGlvbk92ZXJsYXkuYnV0dG9uc11cIj5cbiAgICAgICAgPFBydW5CdXR0b24gbmV1dHJhbCBAY2xpY2s9XCJvbkNsb3NlXCI+Q2FuY2VsPC9QcnVuQnV0dG9uPlxuICAgICAgICA8UHJ1bkJ1dHRvbiBkYW5nZXIgQGNsaWNrPVwib25Db25maXJtXCI+e3sgY29uZmlybUxhYmVsIH19PC9QcnVuQnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIm9uQ2xvc2UiLCJfY3JlYXRlVGV4dFZOb2RlIiwib25Db25maXJtIiwiX3RvRGlzcGxheVN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztRQTJDUSxPQUFBQSxlQUFBLEVBL0JRQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSx5Q0FBdUNBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLGVBQUFBLE9BQUFBLENBQUFBO0FBQUFBLE1BQXdCLEdBQUE7QUFBQTtVQThCckUsT0FBQUQsZUFBQTtBQUFBLGFBNUJjQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTthQUE2Q0EsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7YUFBa0NBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO2FBQTZCQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtVQUFPLENBQUE7QUFBQTs7WUFjcEksT0FBQUQsZUFBQTtBQUFBLGVBUHFCQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtlQUErQ0EsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7ZUFBb0NBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO2VBQStCQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtZQUFPLENBQUE7QUFBQTtVQU12SEMsZ0JBQUEsUUFBQTtBQUFBLFlBVXZCLE9BQUFGLGVBQUE7QUFBQSxlQVBxQkMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7ZUFBNENBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO2VBQWlDQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtlQUErQkEsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7WUFBTyxDQUFBO0FBQUE7VUFNNUhDLGdCQUFBLE9BQUE7QUFBQSxZQUtQLE9BQUFGLGVBQUEsRUFIUUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsMEJBQUFBLE9BQUFBLENBQUFBO0FBQUFBLFVBQW1DLEdBQUE7QUFBQTtjQUNTLFNBQUE7QUFBQSxjQUE1QyxTQUFBLEtBQUE7QUFBQSxZQUFnQkUsR0FBQUE7QUFBQUE7Z0JBQWVDLGdCQUFBLFVBQUEsRUFBQTtBQUFBLGNBQUEsRUFBQSxDQUFBO0FBQUE7OztjQUMwQixRQUFBO0FBQUEsY0FBekQsU0FBQSxLQUFBO0FBQUEsWUFBZUMsR0FBQUE7QUFBQUE7Z0JBQTZCRCxnQkFBQUUsZ0JBQUEsS0FBQSxZQUFBLEdBQUEsQ0FBQTtBQUFBLGNBQUgsQ0FBQTtBQUFBOzs7Ozs7OzsifQ==
