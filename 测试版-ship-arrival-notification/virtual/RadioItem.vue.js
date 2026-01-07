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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9JdGVtLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZm9ybXMvUmFkaW9JdGVtLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuY29uc3QgbW9kZWwgPSBkZWZpbmVNb2RlbDxib29sZWFuPigpO1xuXG5jb25zdCB7IGhvcml6b250YWwgPSBmYWxzZSB9ID0gZGVmaW5lUHJvcHM8eyBob3Jpem9udGFsPzogYm9vbGVhbiB9PigpO1xuXG5jb25zdCBidXR0b25DbGFzcyA9IFtcbiAgQy5SYWRpb0l0ZW0uY29udGFpbmVyLFxuICB7XG4gICAgW0MuUmFkaW9JdGVtLmNvbnRhaW5lckhvcml6b250YWxdOiBob3Jpem9udGFsLFxuICB9LFxuXTtcblxuY29uc3QgYmFyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiBbXG4gIEMuUmFkaW9JdGVtLmluZGljYXRvcixcbiAge1xuICAgIFtDLlJhZGlvSXRlbS5pbmRpY2F0b3JIb3Jpem9udGFsXTogaG9yaXpvbnRhbCxcbiAgICBbQy5SYWRpb0l0ZW0uaW5kaWNhdG9yVmVydGljYWxdOiAhaG9yaXpvbnRhbCxcbiAgICBbQy5SYWRpb0l0ZW0uYWN0aXZlXTogbW9kZWwudmFsdWUsXG4gICAgW0MuZWZmZWN0cy5zaGFkb3dQcmltYXJ5XTogbW9kZWwudmFsdWUsXG4gIH0sXG5dKTtcblxuY29uc3QgbGFiZWxDbGFzcyA9IFtcbiAgQy5SYWRpb0l0ZW0udmFsdWUsXG4gIEMuZm9udHMuZm9udFJlZ3VsYXIsXG4gIEMudHlwZS50eXBlU21hbGwsXG4gIHtcbiAgICBbQy5SYWRpb0l0ZW0udmFsdWVIb3Jpem9udGFsXTogaG9yaXpvbnRhbCxcbiAgfSxcbl07XG5cbmZ1bmN0aW9uIG9uQ2xpY2soKSB7XG4gIG1vZGVsLnZhbHVlID0gIW1vZGVsLnZhbHVlO1xufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJidXR0b25DbGFzc1wiIEBjbGljaz1cIm9uQ2xpY2tcIj5cbiAgICA8ZGl2IDpjbGFzcz1cImJhckNsYXNzXCIgLz5cbiAgICA8ZGl2IDpjbGFzcz1cImxhYmVsQ2xhc3NcIj5cbiAgICAgIDxzbG90IC8+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfdXNlTW9kZWwiLCJfbm9ybWFsaXplQ2xhc3MiLCJfdW5yZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsVUFBQSxRQUFBQSxTQUFBLFNBQUEsWUFBQTtBQUlBLFVBQUEsY0FBQTtBQUFBLE1BQW9CLEVBQUEsVUFBQTtBQUFBLE1BQ047QUFBQSxRQUNaLENBQUEsRUFBQSxVQUFBLG1CQUFBLEdBQUEsUUFBQTtBQUFBLE1BQ3FDO0FBQUEsSUFDckM7QUFHRixVQUFBLFdBQUEsU0FBQSxNQUFBO0FBQUEsTUFBZ0MsRUFBQSxVQUFBO0FBQUEsTUFDbEI7QUFBQSxRQUNaLENBQUEsRUFBQSxVQUFBLG1CQUFBLEdBQUEsUUFBQTtBQUFBLFFBQ3FDLENBQUEsRUFBQSxVQUFBLGlCQUFBLEdBQUEsQ0FBQSxRQUFBO0FBQUEsUUFDRCxDQUFBLEVBQUEsVUFBQSxNQUFBLEdBQUEsTUFBQTtBQUFBLFFBQ04sQ0FBQSxFQUFBLFFBQUEsYUFBQSxHQUFBLE1BQUE7QUFBQSxNQUNLO0FBQUEsSUFDbkMsQ0FBQTtBQUdGLFVBQUEsYUFBQTtBQUFBLE1BQW1CLEVBQUEsVUFBQTtBQUFBLE1BQ0wsRUFBQSxNQUFBO0FBQUEsTUFDSixFQUFBLEtBQUE7QUFBQSxNQUNEO0FBQUEsUUFDUCxDQUFBLEVBQUEsVUFBQSxlQUFBLEdBQUEsUUFBQTtBQUFBLE1BQ2lDO0FBQUEsSUFDakM7QUFHRixhQUFBLFVBQUE7QUFDRSxZQUFBLFFBQUEsQ0FBQSxNQUFBO0FBQUEsSUFBcUI7OztRQVVmLE9BQUFDLGVBQUEsV0FBQTtBQUFBLFFBTGtCO0FBQUEsTUFBRyxHQUFBO0FBQUE7VUFDQSxPQUFBQSxlQUFBQyxNQUFBLFFBQUEsQ0FBQTtBQUFBLFFBQUosR0FBQSxNQUFBLENBQUE7QUFBQTtVQUdmLE9BQUFELGVBQUEsVUFBQTtBQUFBLFFBRmlCLEdBQUE7QUFBQTtRQUNiLENBQUE7QUFBQTs7OzsifQ==
