import { useCssModule } from './runtime-dom.esm-bundler.js';
import { C } from './prun-css.js';
import ColoredIcon from './ColoredIcon.vue.js';
import { materialsStore } from './materials.js';
import { showBuffer } from './buffers.js';
import { getMaterialName } from './i18n.js';
import { fixed0 } from './format.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  createCommentVNode,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'MaterialIcon',
  props: {
    amount: {},
    size: { default: 'large' },
    ticker: {},
    warning: { type: Boolean },
  },
  setup(__props) {
    const $style = useCssModule();
    const material = computed(() => materialsStore.getByTicker(__props.ticker));
    const name = computed(() => getMaterialName(material.value) ?? 'Unknown');
    const amountText = computed(() => {
      if (__props.amount === void 0) {
        return void 0;
      }
      if (__props.size === 'medium' && __props.amount >= 1e5) {
        return fixed0(Math.round(__props.amount / 1e3)) + 'k';
      }
      return fixed0(__props.amount);
    });
    const indicatorClasses = [
      C.MaterialIcon.indicator,
      C.MaterialIcon.neutral,
      C.MaterialIcon.typeVerySmall,
      {
        [C.ColoredValue.negative]: __props.warning,
        [$style.indicatorSmall]: __props.size === 'medium',
      },
    ];
    const onClick = () => showBuffer(`MAT ${__props.ticker.toUpperCase()}`);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).MaterialIcon.container,
              unref($style).container,
            ]),
          },
          [
            createVNode(
              ColoredIcon,
              {
                label: _ctx.ticker,
                title: unref(name),
                size: _ctx.size,
                onClick,
              },
              null,
              8,
              ['label', 'title', 'size'],
            ),
            unref(amountText) !== void 0
              ? (openBlock(),
                createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: normalizeClass(
                      ('C' in _ctx ? _ctx.C : unref(C)).MaterialIcon.indicatorContainer,
                    ),
                    onClick,
                  },
                  [
                    createBaseVNode(
                      'div',
                      {
                        class: normalizeClass(indicatorClasses),
                      },
                      toDisplayString(unref(amountText)),
                      1,
                    ),
                  ],
                  2,
                ))
              : createCommentVNode('', true),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0ZXJpYWxJY29uLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL01hdGVyaWFsSWNvbi52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBDb2xvcmVkSWNvbiwgeyBDb2xvcmVkSWNvblNpemUgfSBmcm9tICdAc3JjL2NvbXBvbmVudHMvQ29sb3JlZEljb24udnVlJztcbmltcG9ydCB7IG1hdGVyaWFsc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL21hdGVyaWFscyc7XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuaW1wb3J0IHsgZ2V0TWF0ZXJpYWxOYW1lIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2kxOG4nO1xuaW1wb3J0IHsgZml4ZWQwIH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuXG5jb25zdCB7XG4gIGFtb3VudCxcbiAgc2l6ZSA9ICdsYXJnZScsXG4gIHRpY2tlcixcbiAgd2FybmluZyxcbn0gPSBkZWZpbmVQcm9wczx7XG4gIGFtb3VudD86IG51bWJlcjtcbiAgc2l6ZT86IENvbG9yZWRJY29uU2l6ZTtcbiAgdGlja2VyOiBzdHJpbmc7XG4gIHdhcm5pbmc/OiBib29sZWFuO1xufT4oKTtcblxuY29uc3QgJHN0eWxlID0gdXNlQ3NzTW9kdWxlKCk7XG5cbmNvbnN0IG1hdGVyaWFsID0gY29tcHV0ZWQoKCkgPT4gbWF0ZXJpYWxzU3RvcmUuZ2V0QnlUaWNrZXIodGlja2VyKSk7XG5cbmNvbnN0IG5hbWUgPSBjb21wdXRlZCgoKSA9PiBnZXRNYXRlcmlhbE5hbWUobWF0ZXJpYWwudmFsdWUpID8/ICdVbmtub3duJyk7XG5cbmNvbnN0IGFtb3VudFRleHQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmIChhbW91bnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoc2l6ZSA9PT0gJ21lZGl1bScgJiYgYW1vdW50ID49IDEwMDAwMCkge1xuICAgIHJldHVybiBmaXhlZDAoTWF0aC5yb3VuZChhbW91bnQgLyAxMDAwKSkgKyAnayc7XG4gIH1cblxuICByZXR1cm4gZml4ZWQwKGFtb3VudCk7XG59KTtcblxuY29uc3QgaW5kaWNhdG9yQ2xhc3NlcyA9IFtcbiAgQy5NYXRlcmlhbEljb24uaW5kaWNhdG9yLFxuICBDLk1hdGVyaWFsSWNvbi5uZXV0cmFsLFxuICBDLk1hdGVyaWFsSWNvbi50eXBlVmVyeVNtYWxsLFxuICB7XG4gICAgW0MuQ29sb3JlZFZhbHVlLm5lZ2F0aXZlXTogd2FybmluZyxcbiAgICBbJHN0eWxlLmluZGljYXRvclNtYWxsXTogc2l6ZSA9PT0gJ21lZGl1bScsXG4gIH0sXG5dO1xuXG5jb25zdCBvbkNsaWNrID0gKCkgPT4gc2hvd0J1ZmZlcihgTUFUICR7dGlja2VyLnRvVXBwZXJDYXNlKCl9YCk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IDpjbGFzcz1cIltDLk1hdGVyaWFsSWNvbi5jb250YWluZXIsICRzdHlsZS5jb250YWluZXJdXCI+XG4gICAgPENvbG9yZWRJY29uIDpsYWJlbD1cInRpY2tlclwiIDp0aXRsZT1cIm5hbWVcIiA6c2l6ZT1cInNpemVcIiBAY2xpY2s9XCJvbkNsaWNrXCIgLz5cbiAgICA8ZGl2XG4gICAgICB2LWlmPVwiYW1vdW50VGV4dCAhPT0gdW5kZWZpbmVkXCJcbiAgICAgIDpjbGFzcz1cIkMuTWF0ZXJpYWxJY29uLmluZGljYXRvckNvbnRhaW5lclwiXG4gICAgICBAY2xpY2s9XCJvbkNsaWNrXCI+XG4gICAgICA8ZGl2IDpjbGFzcz1cImluZGljYXRvckNsYXNzZXNcIj57eyBhbW91bnRUZXh0IH19PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5jb250YWluZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcbn1cblxuLmluZGljYXRvclNtYWxsIHtcbiAgcGFkZGluZzogMnB4IDJweCAxcHggM3B4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJDIiwidGlja2VyIiwic2l6ZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfdW5yZWYiLCJfY3JlYXRlQ29tbWVudFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLFVBQUEsU0FBQSxhQUFBO0FBRUEsVUFBQSxXQUFBLFNBQUEsTUFBQSxlQUFBLFlBQUEsUUFBQSxNQUFBLENBQUE7QUFFQSxVQUFBLE9BQUEsU0FBQSxNQUFBLGdCQUFBLFNBQUEsS0FBQSxLQUFBLFNBQUE7QUFFQSxVQUFBLGFBQUEsU0FBQSxNQUFBO0FBQ0UsVUFBQSxRQUFBLFdBQUEsUUFBQTtBQUNFLGVBQUE7QUFBQSxNQUFPO0FBR1QsVUFBQSxRQUFBLFNBQUEsWUFBQSxRQUFBLFVBQUEsS0FBQTtBQUNFLGVBQUEsT0FBQSxLQUFBLE1BQUEsUUFBQSxTQUFBLEdBQUEsQ0FBQSxJQUFBO0FBQUEsTUFBMkM7QUFHN0MsYUFBQSxPQUFBLFFBQUEsTUFBQTtBQUFBLElBQW9CLENBQUE7QUFHdEIsVUFBQSxtQkFBQTtBQUFBLE1BQXlCLEVBQUEsYUFBQTtBQUFBLE1BQ1IsRUFBQSxhQUFBO0FBQUEsTUFDQSxFQUFBLGFBQUE7QUFBQSxNQUNBO0FBQUEsUUFDZixDQUFBLEVBQUEsYUFBQSxRQUFBLEdBQUEsUUFBQTtBQUFBLFFBQzZCLENBQUEsT0FBQSxjQUFBLEdBQUEsUUFBQSxTQUFBO0FBQUEsTUFDTztBQUFBLElBQ3BDO0FBR0YsVUFBQSxVQUFBLE1BQUEsV0FBQSxPQUFBLFFBQUEsT0FBQSxZQUFBLENBQUEsRUFBQTs7O1FBWVEsT0FBQUEsZUFBQSxFQVJRQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtNQUEwQyxHQUFBO0FBQUE7VUFDcUIsT0FBQSxLQUFBO0FBQUEsVUFBdERDLE9BQUFBLE1BQUFBLElBQUFBO0FBQUFBLFVBQWdCLE1BQUEsS0FBQTtBQUFBLFVBQWFDO0FBQUFBLFFBQU8sR0FBQSxNQUFBLEdBQUEsQ0FBQSxTQUFBLFNBQUEsTUFBQSxDQUFBO0FBQUE7VUFNbkQsS0FBQTtBQUFBLGlDQUhJRixPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxhQUFBQSxrQkFBQUE7QUFBQUEsVUFBaUM7QUFBQSxRQUN4QyxHQUFBO0FBQUE7WUFDb0QsT0FBQUQsZUFBQSxnQkFBQTtBQUFBLFVBQXhCLEdBQUFJLGdCQUFBQyxNQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxRQUFlLEdBQUEsQ0FBQSxLQUFBQyxtQkFBQSxJQUFBLElBQUE7QUFBQTs7OzsifQ==
