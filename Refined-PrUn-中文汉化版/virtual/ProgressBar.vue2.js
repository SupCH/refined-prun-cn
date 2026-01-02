import { useCssModule } from './runtime-dom.esm-bundler.js';
import { C } from './prun-css.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = ['value', 'max'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ProgressBar',
  props: {
    danger: { type: Boolean },
    good: { type: Boolean },
    max: {},
    value: {},
    warning: { type: Boolean },
  },
  setup(__props) {
    const $style = useCssModule();
    const primary = computed(() => !__props.good && !__props.warning && !__props.danger);
    const classes = computed(() => {
      return {
        [C.ProgressBar.progress]: true,
        [C.ProgressBar.primary]: primary.value,
        [$style.good]: __props.good,
        [$style.warning]: __props.warning,
        [$style.danger]: __props.danger,
      };
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'progress',
          {
            class: normalizeClass(unref(classes)),
            value: _ctx.value,
            max: _ctx.max,
          },
          null,
          10,
          _hoisted_1,
        )
      );
    };
  },
});
export { _sfc_main as default };
