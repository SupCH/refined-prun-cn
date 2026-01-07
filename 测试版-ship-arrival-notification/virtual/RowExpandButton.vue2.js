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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm93RXhwYW5kQnV0dG9uLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvRklOQlMvUm93RXhwYW5kQnV0dG9uLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuY29uc3QgbW9kZWwgPSBkZWZpbmVNb2RlbDxib29sZWFuPigpO1xuXG5jb25zdCAkc3R5bGUgPSB1c2VDc3NNb2R1bGUoKTtcbmNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICBbJHN0eWxlLmJ1dHRvbl06IHRydWUsXG4gIFskc3R5bGUuZXhwYW5kZWRdOiBtb2RlbC52YWx1ZSxcbn0pKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxzcGFuIDpjbGFzcz1cImNsYXNzZXNcIiBAY2xpY2s9XCJtb2RlbCA9ICFtb2RlbFwiPuKWtjwvc3Bhbj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uYnV0dG9uIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRyYW5zZm9ybTogc2NhbGUoMC43KTtcbiAgdHJhbnNpdGlvbjogMC4xcyBlYXNlLW91dDtcbn1cblxuLmJ1dHRvbjo6YmVmb3JlIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgLyogSW5jcmVhc2VzIGNsaWNrYWJsZSBhcmVhICovXG4gIHRvcDogLTVweDtcbiAgYm90dG9tOiAtNXB4O1xuICBsZWZ0OiAtNXB4O1xuICByaWdodDogLTVweDtcbiAgLyogSW52aXNpYmxlIGJ1dCBleHBhbmRzIGhpdGJveCAqL1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgei1pbmRleDogLTE7XG59XG5cbi5leHBhbmRlZCB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMC43KSByb3RhdGUoOTBkZWcpO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfdXNlTW9kZWwiLCJfbm9ybWFsaXplQ2xhc3MiLCJfdW5yZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLFVBQUEsUUFBQUEsU0FBQSxTQUFBLFlBQUE7QUFFQSxVQUFBLFNBQUEsYUFBQTtBQUNBLFVBQUEsVUFBQSxTQUFBLE9BQUE7QUFBQSxNQUFnQyxDQUFBLE9BQUEsTUFBQSxHQUFBO0FBQUEsTUFDYixDQUFBLE9BQUEsUUFBQSxHQUFBLE1BQUE7QUFBQSxJQUNRLEVBQUE7OztRQUs4QixPQUFBQyxlQUFBQyxNQUFBLE9BQUEsQ0FBQTtBQUFBLFFBQWxDLFNBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBLE1BQUEsUUFBQSxDQUFBLE1BQUE7QUFBQSxNQUFtQixHQUFBLEtBQUEsQ0FBQTtBQUFBLElBQVE7QUFBQTs7In0=
