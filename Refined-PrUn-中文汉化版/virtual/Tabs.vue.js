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
