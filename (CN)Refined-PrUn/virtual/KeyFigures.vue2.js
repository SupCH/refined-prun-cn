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
