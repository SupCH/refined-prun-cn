import { useCssModule } from './runtime-dom.esm-bundler.js';
import { C } from './prun-css.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeStyle, normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = ['title'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ColoredIcon',
  props: {
    background: {},
    color: {},
    subLabel: {},
    label: {},
    size: { default: 'large' },
    title: {},
  },
  setup(__props) {
    const $style = useCssModule();
    const classes = computed(() => ({
      [C.ColoredIcon.container]: true,
      [$style.large]: __props.size === 'large',
      [$style.medium]: __props.size === 'medium',
      [$style.small]: __props.size === 'small',
      [$style.inline]: __props.size === 'inline',
      [$style.inlineTable]: __props.size === 'inline-table',
    }));
    const isSubLabelVisible = computed(
      () => __props.subLabel && (__props.size === 'large' || __props.size === 'medium'),
    );
    const subLabelClasses = [
      C.ColoredIcon.subLabel,
      C.type.typeVerySmall,
      {
        [$style.mediumSubLabel]: __props.size === 'medium',
      },
    ];
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(unref(classes)),
            style: normalizeStyle({ background: _ctx.background, color: _ctx.color }),
            title: _ctx.title,
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ColoredIcon.labelContainer),
              },
              [
                createBaseVNode(
                  'span',
                  {
                    class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ColoredIcon.label),
                  },
                  toDisplayString(_ctx.label),
                  3,
                ),
                unref(isSubLabelVisible)
                  ? (openBlock(),
                    createElementBlock(
                      'span',
                      {
                        key: 0,
                        class: normalizeClass(subLabelClasses),
                      },
                      toDisplayString(_ctx.subLabel),
                      1,
                    ))
                  : createCommentVNode('', true),
              ],
              2,
            ),
          ],
          14,
          _hoisted_1,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sb3JlZEljb24udnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQ29sb3JlZEljb24udnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5leHBvcnQgdHlwZSBDb2xvcmVkSWNvblNpemUgPSAnbGFyZ2UnIHwgJ21lZGl1bScgfCAnc21hbGwnIHwgJ2lubGluZScgfCAnaW5saW5lLXRhYmxlJztcblxuY29uc3Qge1xuICBiYWNrZ3JvdW5kLFxuICBjb2xvcixcbiAgbGFiZWwsXG4gIHN1YkxhYmVsLFxuICBzaXplID0gJ2xhcmdlJyxcbn0gPSBkZWZpbmVQcm9wczx7XG4gIGJhY2tncm91bmQ/OiBzdHJpbmc7XG4gIGNvbG9yPzogc3RyaW5nO1xuICBzdWJMYWJlbD86IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgc2l6ZT86IENvbG9yZWRJY29uU2l6ZTtcbiAgdGl0bGU6IHN0cmluZztcbn0+KCk7XG5cbmNvbnN0ICRzdHlsZSA9IHVzZUNzc01vZHVsZSgpO1xuXG5jb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgW0MuQ29sb3JlZEljb24uY29udGFpbmVyXTogdHJ1ZSxcbiAgWyRzdHlsZS5sYXJnZV06IHNpemUgPT09ICdsYXJnZScsXG4gIFskc3R5bGUubWVkaXVtXTogc2l6ZSA9PT0gJ21lZGl1bScsXG4gIFskc3R5bGUuc21hbGxdOiBzaXplID09PSAnc21hbGwnLFxuICBbJHN0eWxlLmlubGluZV06IHNpemUgPT09ICdpbmxpbmUnLFxuICBbJHN0eWxlLmlubGluZVRhYmxlXTogc2l6ZSA9PT0gJ2lubGluZS10YWJsZScsXG59KSk7XG5cbmNvbnN0IGlzU3ViTGFiZWxWaXNpYmxlID0gY29tcHV0ZWQoKCkgPT4gc3ViTGFiZWwgJiYgKHNpemUgPT09ICdsYXJnZScgfHwgc2l6ZSA9PT0gJ21lZGl1bScpKTtcblxuY29uc3Qgc3ViTGFiZWxDbGFzc2VzID0gW1xuICBDLkNvbG9yZWRJY29uLnN1YkxhYmVsLFxuICBDLnR5cGUudHlwZVZlcnlTbWFsbCxcbiAge1xuICAgIFskc3R5bGUubWVkaXVtU3ViTGFiZWxdOiBzaXplID09PSAnbWVkaXVtJyxcbiAgfSxcbl07XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IDpjbGFzcz1cImNsYXNzZXNcIiA6c3R5bGU9XCJ7IGJhY2tncm91bmQsIGNvbG9yIH1cIiA6dGl0bGU9XCJ0aXRsZVwiPlxuICAgIDxkaXYgOmNsYXNzPVwiQy5Db2xvcmVkSWNvbi5sYWJlbENvbnRhaW5lclwiPlxuICAgICAgPHNwYW4gOmNsYXNzPVwiQy5Db2xvcmVkSWNvbi5sYWJlbFwiPnt7IGxhYmVsIH19PC9zcGFuPlxuICAgICAgPHNwYW4gdi1pZj1cImlzU3ViTGFiZWxWaXNpYmxlXCIgOmNsYXNzPVwic3ViTGFiZWxDbGFzc2VzXCI+e3sgc3ViTGFiZWwgfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5sYXJnZSB7XG4gIGhlaWdodDogNDhweDtcbiAgd2lkdGg6IDQ4cHg7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cblxuLm1lZGl1bSB7XG4gIGhlaWdodDogMzJweDtcbiAgd2lkdGg6IDMycHg7XG4gIGZvbnQtc2l6ZTogMTFweDtcbn1cblxuLnNtYWxsIHtcbiAgaGVpZ2h0OiAyNHB4O1xuICB3aWR0aDogMjRweDtcbiAgZm9udC1zaXplOiA5cHg7XG59XG5cbi5pbmxpbmUge1xuICBoZWlnaHQ6IDE0cHg7XG4gIHdpZHRoOiAzMnB4O1xuICBmb250LXNpemU6IDExcHg7XG59XG5cbi5pbmxpbmVUYWJsZSB7XG4gIGhlaWdodDogMThweDtcbiAgd2lkdGg6IDMycHg7XG4gIGZvbnQtc2l6ZTogMTFweDtcbn1cblxuLm1lZGl1bVN1YkxhYmVsIHtcbiAgZm9udC1zaXplOiA3cHg7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIl91bnJlZiIsIl9ub3JtYWxpemVTdHlsZSIsInRpdGxlIiwiQyIsIl90b0Rpc3BsYXlTdHJpbmciLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVDb21tZW50Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLFVBQUEsU0FBQSxhQUFBO0FBRUEsVUFBQSxVQUFBLFNBQUEsT0FBQTtBQUFBLE1BQWdDLENBQUEsRUFBQSxZQUFBLFNBQUEsR0FBQTtBQUFBLE1BQ0gsQ0FBQSxPQUFBLEtBQUEsR0FBQSxRQUFBLFNBQUE7QUFBQSxNQUNGLENBQUEsT0FBQSxNQUFBLEdBQUEsUUFBQSxTQUFBO0FBQUEsTUFDQyxDQUFBLE9BQUEsS0FBQSxHQUFBLFFBQUEsU0FBQTtBQUFBLE1BQ0QsQ0FBQSxPQUFBLE1BQUEsR0FBQSxRQUFBLFNBQUE7QUFBQSxNQUNDLENBQUEsT0FBQSxXQUFBLEdBQUEsUUFBQSxTQUFBO0FBQUEsSUFDSyxFQUFBO0FBR2pDLFVBQUEsb0JBQUEsU0FBQSxNQUFBLFFBQUEsYUFBQSxRQUFBLFNBQUEsV0FBQSxRQUFBLFNBQUEsU0FBQTtBQUVBLFVBQUEsa0JBQUE7QUFBQSxNQUF3QixFQUFBLFlBQUE7QUFBQSxNQUNSLEVBQUEsS0FBQTtBQUFBLE1BQ1A7QUFBQSxRQUNQLENBQUEsT0FBQSxjQUFBLEdBQUEsUUFBQSxTQUFBO0FBQUEsTUFDb0M7QUFBQSxJQUNwQzs7O1FBVU0sT0FBQUEsZUFBQUMsTUFBQSxPQUFBLENBQUE7QUFBQSxRQUxjLE9BQUFDLGVBQUEsRUFBQSxZQUFBLEtBQUEsWUFBQSxPQUFBLEtBQUEsT0FBQTtBQUFBLFFBQTZCLE9BQUEsS0FBQTtBQUFBLE1BQVlDLEdBQUFBO0FBQUFBO1VBSXJELE9BQUFILGdCQUhPSSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxZQUFBQSxjQUFBQTtBQUFBQSxRQUE0QixHQUFBO0FBQUE7WUFDYyxPQUFBSixnQkFBdkNJLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLFlBQUFBLEtBQUFBO0FBQUFBLFVBQW1CLEdBQUFDLGdCQUFBLEtBQUEsS0FBQSxHQUFBLENBQUE7QUFBQSxVQUFVSixNQUFBLGlCQUFBLEtBQUFLLFVBQUEsR0FBQUMsbUJBQUEsUUFBQTtBQUFBLFlBQ2tDLEtBQUE7QUFBQTtVQUF2QixHQUFBRixnQkFBQSxLQUFBLFFBQUEsR0FBQSxDQUFBLEtBQUFHLG1CQUFBLElBQUEsSUFBQTtBQUFBOzs7OzsifQ==
