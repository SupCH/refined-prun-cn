import { C } from './prun-css.js';
import {
  defineComponent,
  mergeModels,
  useModel,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
  createBlock,
  resolveDynamicComponent,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = ['onClick'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Tabs',
  props: /* @__PURE__ */ mergeModels(
    {
      tabs: {},
    },
    {
      modelValue: {
        required: true,
      },
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props) {
    const model = useModel(__props, 'modelValue');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Tabs.component),
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Tabs.tabs),
              },
              [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(_ctx.tabs, tab => {
                    return (
                      openBlock(),
                      createElementBlock(
                        'div',
                        {
                          key: tab.id,
                          class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Tabs.header),
                          onClick: $event => (model.value = tab),
                        },
                        [
                          model.value.id === tab.id
                            ? (openBlock(),
                              createElementBlock(
                                Fragment,
                                { key: 0 },
                                [
                                  createBaseVNode(
                                    'a',
                                    {
                                      class: normalizeClass([
                                        ('C' in _ctx ? _ctx.C : unref(C)).Tabs.tabActive,
                                        ('C' in _ctx ? _ctx.C : unref(C)).Tabs.tab,
                                        ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                                        ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
                                      ]),
                                    },
                                    toDisplayString(tab.label),
                                    3,
                                  ),
                                  createBaseVNode(
                                    'div',
                                    {
                                      class: normalizeClass([
                                        ('C' in _ctx ? _ctx.C : unref(C)).Tabs.toggleIndicator,
                                        ('C' in _ctx ? _ctx.C : unref(C)).Tabs
                                          .toggleIndicatorActive,
                                        ('C' in _ctx ? _ctx.C : unref(C)).effects.shadowPrimary,
                                      ]),
                                    },
                                    null,
                                    2,
                                  ),
                                ],
                                64,
                              ))
                            : (openBlock(),
                              createElementBlock(
                                Fragment,
                                { key: 1 },
                                [
                                  createBaseVNode(
                                    'a',
                                    {
                                      class: normalizeClass([
                                        ('C' in _ctx ? _ctx.C : unref(C)).Tabs.tab,
                                        ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                                        ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
                                      ]),
                                    },
                                    toDisplayString(tab.label),
                                    3,
                                  ),
                                  createBaseVNode(
                                    'div',
                                    {
                                      class: normalizeClass([
                                        ('C' in _ctx ? _ctx.C : unref(C)).Tabs.toggleIndicator,
                                      ]),
                                    },
                                    null,
                                    2,
                                  ),
                                ],
                                64,
                              )),
                        ],
                        10,
                        _hoisted_1,
                      )
                    );
                  }),
                  128,
                )),
              ],
              2,
            ),
            createBaseVNode(
              'article',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Tabs.content),
              },
              [
                createBaseVNode('div', null, [
                  (openBlock(), createBlock(resolveDynamicComponent(model.value.component))),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1RhYnMudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5leHBvcnQgaW50ZXJmYWNlIFRhYiB7XG4gIGlkOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGNvbXBvbmVudDogQ29tcG9uZW50O1xufVxuXG5kZWZpbmVQcm9wczx7IHRhYnM6IFRhYltdIH0+KCk7XG5cbmNvbnN0IG1vZGVsID0gZGVmaW5lTW9kZWw8VGFiPih7XG4gIHJlcXVpcmVkOiB0cnVlLFxufSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IDpjbGFzcz1cIkMuVGFicy5jb21wb25lbnRcIj5cbiAgICA8ZGl2IDpjbGFzcz1cIkMuVGFicy50YWJzXCI+XG4gICAgICA8ZGl2IHYtZm9yPVwidGFiIGluIHRhYnNcIiA6a2V5PVwidGFiLmlkXCIgOmNsYXNzPVwiQy5UYWJzLmhlYWRlclwiIEBjbGljaz1cIm1vZGVsID0gdGFiXCI+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwibW9kZWwuaWQgPT09IHRhYi5pZFwiPlxuICAgICAgICAgIDxhIDpjbGFzcz1cIltDLlRhYnMudGFiQWN0aXZlLCBDLlRhYnMudGFiLCBDLmZvbnRzLmZvbnRSZWd1bGFyLCBDLnR5cGUudHlwZVJlZ3VsYXJdXCI+XG4gICAgICAgICAgICB7eyB0YWIubGFiZWwgfX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgOmNsYXNzPVwiW1xuICAgICAgICAgICAgICBDLlRhYnMudG9nZ2xlSW5kaWNhdG9yLFxuICAgICAgICAgICAgICBDLlRhYnMudG9nZ2xlSW5kaWNhdG9yQWN0aXZlLFxuICAgICAgICAgICAgICBDLmVmZmVjdHMuc2hhZG93UHJpbWFyeSxcbiAgICAgICAgICAgIF1cIiAvPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgIDxhIDpjbGFzcz1cIltDLlRhYnMudGFiLCBDLmZvbnRzLmZvbnRSZWd1bGFyLCBDLnR5cGUudHlwZVJlZ3VsYXJdXCI+e3sgdGFiLmxhYmVsIH19PC9hPlxuICAgICAgICAgIDxkaXYgOmNsYXNzPVwiW0MuVGFicy50b2dnbGVJbmRpY2F0b3JdXCIgLz5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxhcnRpY2xlIDpjbGFzcz1cIkMuVGFicy5jb250ZW50XCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8Y29tcG9uZW50IDppcz1cIm1vZGVsLmNvbXBvbmVudFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2FydGljbGU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfdXNlTW9kZWwiLCJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUJsb2NrIiwiX3Jlc29sdmVEeW5hbWljQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQVNBLFVBQUEsUUFBQUEsU0FBQSxTQUFBLFlBQUE7OztRQStCUSxPQUFBQyxnQkF6Qk9DLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLEtBQUFBLFNBQUFBO0FBQUFBLE1BQWdCLEdBQUE7QUFBQTtVQW1CckIsT0FBQUQsZ0JBbEJPQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxLQUFBQSxJQUFBQTtBQUFBQSxRQUFXLEdBQUE7QUFBQTs7Y0FpQmhCLEtBQUEsSUFBQTtBQUFBLGNBaEI2QixPQUFBRCxnQkFBWUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsS0FBQUEsTUFBQUE7QUFBQUEsY0FBYSxTQUFBLENBQUEsV0FBQSxNQUFBLFFBQUE7QUFBQSxZQUFrQixHQUFBO0FBQUE7Z0JBV2pFQyxnQkFBQSxLQUFBO0FBQUEsa0JBUEwsT0FBQUYsZUFBQSxvREFGMEJDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLEtBQUFBLE1BQVlBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLHVCQUFxQkEsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsS0FBQUEsV0FBQUEsQ0FBQUE7QUFBQUEsZ0JBQWtCLEdBQUFFLGdCQUFBLElBQUEsS0FBQSxHQUFBLENBQUE7QUFBQSxnQkFDbkVELGdCQUFBLE9BQUE7QUFBQSxrQkFPUCxPQUFBRixlQUFBO0FBQUEscUJBSm1CQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtxQkFBc0NBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO3FCQUE0Q0EsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7a0JBQVUsQ0FBQTtBQUFBOztnQkFTN0dDLGdCQUFBLEtBQUE7QUFBQSxrQkFGNEUsT0FBQUYsZUFBQSxFQUF6RUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsY0FBWUEsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsTUFBQUEsY0FBcUJBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO2dCQUFrQixHQUFBRSxnQkFBQSxJQUFBLEtBQUEsR0FBQSxDQUFBO0FBQUEsZ0JBQWVELGdCQUFBLE9BQUE7QUFBQSxrQkFDckMsT0FBQUYsZUFBQSxFQUEzQkMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsS0FBQUEsZUFBQUEsQ0FBQUE7QUFBQUEsZ0JBQXNCLEdBQUEsTUFBQSxDQUFBO0FBQUE7Ozs7O1VBUWhDLE9BQUFELGdCQUpPQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxLQUFBQSxPQUFBQTtBQUFBQSxRQUFjLEdBQUE7QUFBQTthQUd2QkcsVUFBQSxHQUFBQyxZQUFBQyx3QkFBQSxNQUFBLE1BQUEsU0FBQSxDQUFBO0FBQUEsVUFEMkIsQ0FBQTtBQUFBOzs7OzsifQ==
