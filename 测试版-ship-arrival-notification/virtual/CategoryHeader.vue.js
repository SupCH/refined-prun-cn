import SectionHeader from './SectionHeader.vue.js';
import {
  defineComponent,
  createBlock,
  openBlock,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CategoryHeader',
  props: {
    label: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          SectionHeader,
          { style: { width: '100%' } },
          {
            default: withCtx(() => [createTextVNode(toDisplayString(_ctx.label), 1)]),
            _: 1,
          },
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlIZWFkZXIudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvaW52LWN1c3RvbS1pdGVtLXNvcnRpbmcvQ2F0ZWdvcnlIZWFkZXIudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgU2VjdGlvbkhlYWRlciBmcm9tICdAc3JjL2NvbXBvbmVudHMvU2VjdGlvbkhlYWRlci52dWUnO1xuXG5kZWZpbmVQcm9wczx7IGxhYmVsOiBzdHJpbmcgfT4oKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxTZWN0aW9uSGVhZGVyIDpzdHlsZT1cInsgd2lkdGg6ICcxMDAlJyB9XCI+e3sgbGFiZWwgfX08L1NlY3Rpb25IZWFkZXI+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVCbG9jayIsImxhYmVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzBCQU9FQSxZQUFxRSxlQUFBLEVBQXJELE9BQU8sRUFBQSxPQUFBLE9BQUEsS0FBaUI7QUFBQSx5QkFBRSxNQUFXO0FBQUEsMENBQVJDLEtBQUFBLEtBQUssR0FBQSxDQUFBO0FBQUEsUUFBQTs7Ozs7OyJ9
