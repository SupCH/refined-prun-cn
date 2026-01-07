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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJ1bkJ1dHRvbi52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1BydW5CdXR0b24udnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5jb25zdCB7IGRhbmdlciwgZGFyaywgZGlzYWJsZWQsIGlubGluZSwgbmV1dHJhbCwgcHJpbWFyeSwgc3VjY2VzcyB9ID0gZGVmaW5lUHJvcHM8e1xuICBkYW5nZXI/OiBib29sZWFuO1xuICBkYXJrPzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBpbmxpbmU/OiBib29sZWFuO1xuICBuZXV0cmFsPzogYm9vbGVhbjtcbiAgcHJpbWFyeT86IGJvb2xlYW47XG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xufT4oKTtcblxuY29uc3QgZW1pdCA9IGRlZmluZUVtaXRzPHsgKGU6ICdjbGljaycsIGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB9PigpO1xuXG5jb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgW0MuQnV0dG9uLmJ0bl06IHRydWUsXG4gIFtDLkJ1dHRvbi5pbmxpbmVdOiBpbmxpbmUsXG4gIFtDLkJ1dHRvbi5wcmltYXJ5XTogcHJpbWFyeSxcbiAgW0MuQnV0dG9uLnByaW1hcnlJbmxpbmVdOiBwcmltYXJ5ICYmIGlubGluZSxcbiAgW0MuQnV0dG9uLmRpc2FibGVkXTogZGlzYWJsZWQsXG4gIFtDLkJ1dHRvbi5kaXNhYmxlZElubGluZV06IGRpc2FibGVkICYmIGlubGluZSxcbiAgW0MuQnV0dG9uLm5ldXRyYWxdOiBuZXV0cmFsLFxuICBbQy5CdXR0b24ubmV1dHJhbElubGluZV06IG5ldXRyYWwgJiYgaW5saW5lLFxuICBbQy5CdXR0b24uc3VjY2Vzc106IHN1Y2Nlc3MsXG4gIFtDLkJ1dHRvbi5zdWNjZXNzSW5saW5lXTogc3VjY2VzcyAmJiBpbmxpbmUsXG4gIFtDLkJ1dHRvbi5kYW5nZXJdOiBkYW5nZXIsXG4gIFtDLkJ1dHRvbi5kYW5nZXJJbmxpbmVdOiBkYW5nZXIgJiYgaW5saW5lLFxuICBbQy5CdXR0b24uZGFya106IGRhcmssXG4gIFtDLkJ1dHRvbi5kYXJrSW5saW5lXTogZGFyayAmJiBpbmxpbmUsXG59KSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIDpjbGFzcz1cImNsYXNzZXNcIiB0eXBlPVwiYnV0dG9uXCIgOmRpc2FibGVkPVwiZGlzYWJsZWRcIiBAY2xpY2s9XCJlbWl0KCdjbGljaycsICRldmVudClcIj5cbiAgICA8c2xvdCAvPlxuICA8L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiX3VucmVmIiwiZGlzYWJsZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdBLFVBQUEsT0FBQTtBQUVBLFVBQUEsVUFBQSxTQUFBLE9BQUE7QUFBQSxNQUFnQyxDQUFBLEVBQUEsT0FBQSxHQUFBLEdBQUE7QUFBQSxNQUNkLENBQUEsRUFBQSxPQUFBLE1BQUEsR0FBQSxRQUFBO0FBQUEsTUFDRyxDQUFBLEVBQUEsT0FBQSxPQUFBLEdBQUEsUUFBQTtBQUFBLE1BQ0MsQ0FBQSxFQUFBLE9BQUEsYUFBQSxHQUFBLFFBQUEsV0FBQSxRQUFBO0FBQUEsTUFDaUIsQ0FBQSxFQUFBLE9BQUEsUUFBQSxHQUFBLFFBQUE7QUFBQSxNQUNoQixDQUFBLEVBQUEsT0FBQSxjQUFBLEdBQUEsUUFBQSxZQUFBLFFBQUE7QUFBQSxNQUNrQixDQUFBLEVBQUEsT0FBQSxPQUFBLEdBQUEsUUFBQTtBQUFBLE1BQ25CLENBQUEsRUFBQSxPQUFBLGFBQUEsR0FBQSxRQUFBLFdBQUEsUUFBQTtBQUFBLE1BQ2lCLENBQUEsRUFBQSxPQUFBLE9BQUEsR0FBQSxRQUFBO0FBQUEsTUFDakIsQ0FBQSxFQUFBLE9BQUEsYUFBQSxHQUFBLFFBQUEsV0FBQSxRQUFBO0FBQUEsTUFDaUIsQ0FBQSxFQUFBLE9BQUEsTUFBQSxHQUFBLFFBQUE7QUFBQSxNQUNsQixDQUFBLEVBQUEsT0FBQSxZQUFBLEdBQUEsUUFBQSxVQUFBLFFBQUE7QUFBQSxNQUNnQixDQUFBLEVBQUEsT0FBQSxJQUFBLEdBQUEsUUFBQTtBQUFBLE1BQ2xCLENBQUEsRUFBQSxPQUFBLFVBQUEsR0FBQSxRQUFBLFFBQUEsUUFBQTtBQUFBLElBQ2MsRUFBQTs7O1FBT3RCLE9BQUFBLGVBQUFDLE1BQUEsT0FBQSxDQUFBO0FBQUEsUUFGYyxNQUFBO0FBQUEsUUFBTyxVQUFBLEtBQUE7QUFBQSxRQUFvQkMsU0FBQUEsT0FBQUEsQ0FBQUEsTUFBQUEsT0FBQUEsQ0FBQUEsSUFBQUEsQ0FBQUEsV0FBQUEsS0FBQUEsU0FBQUEsTUFBQUE7QUFBQUEsTUFBc0MsR0FBQTtBQUFBO01BQzlFLEdBQUEsSUFBQSxVQUFBO0FBQUE7OzsifQ==
