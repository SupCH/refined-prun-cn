import { C } from './prun-css.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  renderSlot,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = ['disabled'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'PrunButton',
  props: {
    danger: { type: Boolean },
    dark: { type: Boolean },
    disabled: { type: Boolean },
    inline: { type: Boolean },
    neutral: { type: Boolean },
    primary: { type: Boolean },
    success: { type: Boolean },
  },
  emits: ['click'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const classes = computed(() => ({
      [C.Button.btn]: true,
      [C.Button.inline]: __props.inline,
      [C.Button.primary]: __props.primary,
      [C.Button.primaryInline]: __props.primary && __props.inline,
      [C.Button.disabled]: __props.disabled,
      [C.Button.disabledInline]: __props.disabled && __props.inline,
      [C.Button.neutral]: __props.neutral,
      [C.Button.neutralInline]: __props.neutral && __props.inline,
      [C.Button.success]: __props.success,
      [C.Button.successInline]: __props.success && __props.inline,
      [C.Button.danger]: __props.danger,
      [C.Button.dangerInline]: __props.danger && __props.inline,
      [C.Button.dark]: __props.dark,
      [C.Button.darkInline]: __props.dark && __props.inline,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'button',
          {
            class: normalizeClass(unref(classes)),
            type: 'button',
            disabled: _ctx.disabled,
            onClick: _cache[0] || (_cache[0] = $event => emit('click', $event)),
          },
          [renderSlot(_ctx.$slots, 'default')],
          10,
          _hoisted_1,
        )
      );
    };
  },
});
export { _sfc_main as default };
