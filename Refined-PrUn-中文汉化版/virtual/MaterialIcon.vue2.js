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
