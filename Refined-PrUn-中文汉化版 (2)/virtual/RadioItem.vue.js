import { C } from './prun-css.js';
import {
  defineComponent,
  mergeModels,
  useModel,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  renderSlot,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'RadioItem',
  props: /* @__PURE__ */ mergeModels(
    {
      horizontal: { type: Boolean, default: false },
    },
    {
      modelValue: { type: Boolean },
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props) {
    const model = useModel(__props, 'modelValue');
    const buttonClass = [
      C.RadioItem.container,
      {
        [C.RadioItem.containerHorizontal]: __props.horizontal,
      },
    ];
    const barClass = computed(() => [
      C.RadioItem.indicator,
      {
        [C.RadioItem.indicatorHorizontal]: __props.horizontal,
        [C.RadioItem.indicatorVertical]: !__props.horizontal,
        [C.RadioItem.active]: model.value,
        [C.effects.shadowPrimary]: model.value,
      },
    ]);
    const labelClass = [
      C.RadioItem.value,
      C.fonts.fontRegular,
      C.type.typeSmall,
      {
        [C.RadioItem.valueHorizontal]: __props.horizontal,
      },
    ];
    function onClick() {
      model.value = !model.value;
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(buttonClass),
            onClick,
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(unref(barClass)),
              },
              null,
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(labelClass),
              },
              [renderSlot(_ctx.$slots, 'default')],
            ),
          ],
        )
      );
    };
  },
});
export { _sfc_main as default };
