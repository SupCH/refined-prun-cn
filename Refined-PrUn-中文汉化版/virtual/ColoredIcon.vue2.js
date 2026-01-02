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
