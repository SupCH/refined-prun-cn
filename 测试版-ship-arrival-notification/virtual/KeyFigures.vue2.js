import { C } from './prun-css.js';
import _sfc_main$1 from './Tooltip.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createElementVNode as createBaseVNode,
  createTextVNode,
  createBlock,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'KeyFigures',
  props: {
    figures: {},
  },
  setup(__props) {
    const containerClasses = [C.FinanceOverviewPanel.data, C.figures.container];
    const figureClasses = [C.FinanceOverviewPanel.info, C.figures.figure, C.type.typeLarge];
    const labelClasses = [
      C.FinanceOverviewPanel.label,
      C.figures.label,
      C.type.typeRegular,
      C.type.typeSmall,
    ];
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(containerClasses),
          },
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(_ctx.figures, figure => {
                return (
                  openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: figure.name,
                      class: normalizeClass(figureClasses),
                    },
                    [
                      createBaseVNode('span', null, toDisplayString(figure.value), 1),
                      createBaseVNode(
                        'div',
                        {
                          class: normalizeClass(labelClasses),
                        },
                        [
                          createTextVNode(toDisplayString(figure.name) + ' ', 1),
                          figure.tooltip
                            ? (openBlock(),
                              createBlock(
                                _sfc_main$1,
                                {
                                  key: 0,
                                  tooltip: figure.tooltip,
                                  position: 'bottom',
                                  class: normalizeClass(_ctx.$style.tooltip),
                                },
                                null,
                                8,
                                ['tooltip', 'class'],
                              ))
                            : createCommentVNode('', true),
                        ],
                      ),
                    ],
                  )
                );
              }),
              128,
            )),
          ],
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5RmlndXJlcy52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0ZJTi9LZXlGaWd1cmVzLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IFRvb2x0aXAgZnJvbSAnQHNyYy9jb21wb25lbnRzL1Rvb2x0aXAudnVlJztcblxuaW50ZXJmYWNlIEtleUZpZ3VyZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgdG9vbHRpcD86IHN0cmluZztcbn1cblxuZGVmaW5lUHJvcHM8eyBmaWd1cmVzOiBLZXlGaWd1cmVbXSB9PigpO1xuXG5jb25zdCBjb250YWluZXJDbGFzc2VzID0gW0MuRmluYW5jZU92ZXJ2aWV3UGFuZWwuZGF0YSwgQy5maWd1cmVzLmNvbnRhaW5lcl07XG5jb25zdCBmaWd1cmVDbGFzc2VzID0gW0MuRmluYW5jZU92ZXJ2aWV3UGFuZWwuaW5mbywgQy5maWd1cmVzLmZpZ3VyZSwgQy50eXBlLnR5cGVMYXJnZV07XG5jb25zdCBsYWJlbENsYXNzZXMgPSBbXG4gIEMuRmluYW5jZU92ZXJ2aWV3UGFuZWwubGFiZWwsXG4gIEMuZmlndXJlcy5sYWJlbCxcbiAgQy50eXBlLnR5cGVSZWd1bGFyLFxuICBDLnR5cGUudHlwZVNtYWxsLFxuXTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiY29udGFpbmVyQ2xhc3Nlc1wiPlxuICAgIDxkaXYgdi1mb3I9XCJmaWd1cmUgaW4gZmlndXJlc1wiIDprZXk9XCJmaWd1cmUubmFtZVwiIDpjbGFzcz1cImZpZ3VyZUNsYXNzZXNcIj5cbiAgICAgIDxzcGFuPnt7IGZpZ3VyZS52YWx1ZSB9fTwvc3Bhbj5cbiAgICAgIDxkaXYgOmNsYXNzPVwibGFiZWxDbGFzc2VzXCI+XG4gICAgICAgIHt7IGZpZ3VyZS5uYW1lIH19XG4gICAgICAgIDxUb29sdGlwXG4gICAgICAgICAgdi1pZj1cImZpZ3VyZS50b29sdGlwXCJcbiAgICAgICAgICA6dG9vbHRpcD1cImZpZ3VyZS50b29sdGlwXCJcbiAgICAgICAgICBwb3NpdGlvbj1cImJvdHRvbVwiXG4gICAgICAgICAgOmNsYXNzPVwiJHN0eWxlLnRvb2x0aXBcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi50b29sdGlwIHtcbiAgcGFkZGluZzogMDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9vcGVuQmxvY2siLCJfY3JlYXRlQmxvY2siLCJUb29sdGlwIiwiX2NyZWF0ZUNvbW1lbnRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVdBLFVBQUEsbUJBQUEsQ0FBQSxFQUFBLHFCQUFBLE1BQUEsRUFBQSxRQUFBLFNBQUE7QUFDQSxVQUFBLGdCQUFBLENBQUEsRUFBQSxxQkFBQSxNQUFBLEVBQUEsUUFBQSxRQUFBLEVBQUEsS0FBQSxTQUFBO0FBQ0EsVUFBQSxlQUFBO0FBQUEsTUFBcUIsRUFBQSxxQkFBQTtBQUFBLE1BQ0ksRUFBQSxRQUFBO0FBQUEsTUFDYixFQUFBLEtBQUE7QUFBQSxNQUNILEVBQUEsS0FBQTtBQUFBLElBQ0E7OztRQWlCRCxPQUFBQSxlQUFBLGdCQUFBO0FBQUEsTUFadUIsR0FBQTtBQUFBOztZQVdyQixLQUFBLE9BQUE7QUFBQSxZQVZzQyxPQUFBQSxlQUFBLGFBQUE7QUFBQSxVQUEyQixHQUFBO0FBQUE7WUFDaERDLGdCQUFBLE9BQUE7QUFBQSxjQVFmLE9BQUFELGVBQUEsWUFBQTtBQUFBLFlBUG1CLEdBQUE7QUFBQTtjQUV2QixPQUFBLFdBQUFFLGFBQUFDLFlBQUFDLGFBQUE7QUFBQSxnQkFJNEIsS0FBQTtBQUFBO2dCQUZULFVBQUE7QUFBQSxnQkFDUixPQUFBSixlQUFBLEtBQUEsT0FBQSxPQUFBO0FBQUEsY0FDYSxHQUFBLE1BQUEsR0FBQSxDQUFBLFdBQUEsT0FBQSxDQUFBLEtBQUFLLG1CQUFBLElBQUEsSUFBQTtBQUFBOzs7Ozs7OyJ9
