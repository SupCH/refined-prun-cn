import { useCssModule } from './runtime-dom.esm-bundler.js';
import {
  defineComponent,
  useModel,
  computed,
  createElementBlock,
  openBlock,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'RowExpandButton',
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {},
  },
  emits: ['update:modelValue'],
  setup(__props) {
    const model = useModel(__props, 'modelValue');
    const $style = useCssModule();
    const classes = computed(() => ({
      [$style.button]: true,
      [$style.expanded]: model.value,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'span',
          {
            class: normalizeClass(unref(classes)),
            onClick: _cache[0] || (_cache[0] = $event => (model.value = !model.value)),
          },
          '▶',
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
