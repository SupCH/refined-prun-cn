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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NCYXIudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXIudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5jb25zdCB7IGRhbmdlciwgZ29vZCwgd2FybmluZyB9ID0gZGVmaW5lUHJvcHM8e1xuICBkYW5nZXI/OiBib29sZWFuO1xuICBnb29kPzogYm9vbGVhbjtcbiAgbWF4OiBudW1iZXI7XG4gIHZhbHVlOiBudW1iZXI7XG4gIHdhcm5pbmc/OiBib29sZWFuO1xufT4oKTtcblxuY29uc3QgJHN0eWxlID0gdXNlQ3NzTW9kdWxlKCk7XG5cbmNvbnN0IHByaW1hcnkgPSBjb21wdXRlZCgoKSA9PiAhZ29vZCAmJiAhd2FybmluZyAmJiAhZGFuZ2VyKTtcblxuY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBbQy5Qcm9ncmVzc0Jhci5wcm9ncmVzc106IHRydWUsXG4gICAgW0MuUHJvZ3Jlc3NCYXIucHJpbWFyeV06IHByaW1hcnkudmFsdWUsXG4gICAgWyRzdHlsZS5nb29kXTogZ29vZCxcbiAgICBbJHN0eWxlLndhcm5pbmddOiB3YXJuaW5nLFxuICAgIFskc3R5bGUuZGFuZ2VyXTogZGFuZ2VyLFxuICB9O1xufSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cHJvZ3Jlc3MgOmNsYXNzPVwiY2xhc3Nlc1wiIDp2YWx1ZT1cInZhbHVlXCIgOm1heD1cIm1heFwiIC8+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLmdvb2Q6Oi13ZWJraXQtcHJvZ3Jlc3MtdmFsdWUge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1ycC1jb2xvci1ncmVlbik7XG59XG5cbi53YXJuaW5nOjotd2Via2l0LXByb2dyZXNzLXZhbHVlIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tcnAtY29sb3ItYWNjZW50LXByaW1hcnkpO1xufVxuXG4uZGFuZ2VyOjotd2Via2l0LXByb2dyZXNzLXZhbHVlIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tcnAtY29sb3ItcmVkKTtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiX3VucmVmIiwidmFsdWUiLCJtYXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQSxVQUFBLFNBQUEsYUFBQTtBQUVBLFVBQUEsVUFBQSxTQUFBLE1BQUEsQ0FBQSxRQUFBLFFBQUEsQ0FBQSxRQUFBLFdBQUEsQ0FBQSxRQUFBLE1BQUE7QUFFQSxVQUFBLFVBQUEsU0FBQSxNQUFBO0FBQ0UsYUFBQTtBQUFBLFFBQU8sQ0FBQSxFQUFBLFlBQUEsUUFBQSxHQUFBO0FBQUEsUUFDcUIsQ0FBQSxFQUFBLFlBQUEsT0FBQSxHQUFBLFFBQUE7QUFBQSxRQUNPLENBQUEsT0FBQSxJQUFBLEdBQUEsUUFBQTtBQUFBLFFBQ2xCLENBQUEsT0FBQSxPQUFBLEdBQUEsUUFBQTtBQUFBLFFBQ0csQ0FBQSxPQUFBLE1BQUEsR0FBQSxRQUFBO0FBQUEsTUFDRDtBQUFBLElBQ25CLENBQUE7OztRQUt1RCxPQUFBQSxlQUFBQyxNQUFBLE9BQUEsQ0FBQTtBQUFBLFFBQTlCLE9BQUEsS0FBQTtBQUFBLFFBQVVDLEtBQUFBLEtBQUFBO0FBQUFBLE1BQWFDLEdBQUFBLE1BQUFBLElBQUFBLFVBQUFBO0FBQUFBOzs7In0=
