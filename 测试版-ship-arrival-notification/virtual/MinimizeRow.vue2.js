import { C } from './prun-css.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'MinimizeRow',
  props: {
    isMinimized: { type: Boolean },
    onClick: { type: Function },
  },
  setup(__props) {
    const symbol = computed(() => (__props.isMinimized ? '+' : '-'));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.containerPassive,
              ('C' in _ctx ? _ctx.C : unref(C)).forms.passive,
              ('C' in _ctx ? _ctx.C : unref(C)).forms.formComponent,
            ]),
          },
          [
            createBaseVNode(
              'label',
              {
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.label,
                  ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                  ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
                ]),
              },
              'Minimize',
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.input,
                  ('C' in _ctx ? _ctx.C : unref(C)).forms.input,
                ]),
              },
              [
                createBaseVNode('div', null, [
                  createBaseVNode(
                    'div',
                    {
                      class: normalizeClass(_ctx.$style.minimize),
                      onClick:
                        _cache[0] ||
                        (_cache[0] = //@ts-ignore
                          (...args) => _ctx.onClick && _ctx.onClick(...args)),
                    },
                    toDisplayString(unref(symbol)),
                    3,
                  ),
                ]),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWluaW1pemVSb3cudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL21pbmltaXplLWhlYWRlcnMvTWluaW1pemVSb3cudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5jb25zdCB7IGlzTWluaW1pemVkIH0gPSBkZWZpbmVQcm9wczx7XG4gIGlzTWluaW1pemVkPzogYm9vbGVhbjtcbiAgb25DbGljazogKCkgPT4gdm9pZDtcbn0+KCk7XG5cbmNvbnN0IHN5bWJvbCA9IGNvbXB1dGVkKCgpID0+IChpc01pbmltaXplZCA/ICcrJyA6ICctJykpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJbQy5Gb3JtQ29tcG9uZW50LmNvbnRhaW5lclBhc3NpdmUsIEMuZm9ybXMucGFzc2l2ZSwgQy5mb3Jtcy5mb3JtQ29tcG9uZW50XVwiPlxuICAgIDxsYWJlbCA6Y2xhc3M9XCJbQy5Gb3JtQ29tcG9uZW50LmxhYmVsLCBDLmZvbnRzLmZvbnRSZWd1bGFyLCBDLnR5cGUudHlwZVJlZ3VsYXJdXCJcbiAgICAgID5NaW5pbWl6ZTwvbGFiZWxcbiAgICA+XG4gICAgPGRpdiA6Y2xhc3M9XCJbQy5Gb3JtQ29tcG9uZW50LmlucHV0LCBDLmZvcm1zLmlucHV0XVwiPlxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUubWluaW1pemVcIiBAY2xpY2s9XCJvbkNsaWNrXCI+e3sgc3ltYm9sIH19PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLm1pbmltaXplIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogM3B4O1xuICBtYXJnaW4tdG9wOiAxcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDE4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2MzUzZTtcbiAgY29sb3I6ICMzZmEyZGU7XG5cbiAgJjpob3ZlciB7XG4gICAgY29sb3I6ICMyNjM1M2U7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNmYTJkZTtcbiAgfVxufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfdW5yZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBTUEsVUFBQSxTQUFBLFNBQUEsTUFBQSxRQUFBLGNBQUEsTUFBQSxHQUFBOzs7UUFhUSxPQUFBQSxlQUFBLEVBVFFDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLG9DQUFrQ0EsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsTUFBQUEsVUFBaUJBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO01BQXFCLEdBQUE7QUFBQTtVQUduRixPQUFBRCxlQUFBLEVBRmVDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLHlCQUF1QkEsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsTUFBQUEsY0FBcUJBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO1FBQWtCLEdBQUEsWUFBQSxDQUFBO0FBQUEsUUFDbkVDLGdCQUFBLE9BQUE7QUFBQSxVQU1MLE9BQUFGLGVBQUEsRUFKUUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEseUJBQXVCQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxNQUFBQSxLQUFBQSxDQUFBQTtBQUFBQSxRQUFhLEdBQUE7QUFBQTtZQUcxQ0MsZ0JBQUEsT0FBQTtBQUFBLGNBRDZELE9BQUFGLGVBQUEsS0FBQSxPQUFBLFFBQUE7QUFBQSxjQUFyQyxTQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQTtBQUFBLGNBQVEsSUFBQSxTQUFBLEtBQUEsV0FBQSxLQUFBLFFBQUEsR0FBQSxJQUFBO0FBQUEsWUFBRSxHQUFBRyxnQkFBQUMsTUFBQSxNQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsVUFBa0IsQ0FBQTtBQUFBOzs7OzsifQ==
