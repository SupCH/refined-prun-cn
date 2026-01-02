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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'RadioGroupContainer',
  props: {
    horizontal: { type: Boolean, default: false },
  },
  setup(__props) {
    const classes = computed(() => ({
      [C.RadioGroup.container]: true,
      [C.RadioGroup.horizontal]: __props.horizontal,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(unref(classes)),
          },
          [renderSlot(_ctx.$slots, 'default')],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
