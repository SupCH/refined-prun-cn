import { vModelSelect } from './runtime-dom.esm-bundler.js';
import {
  defineComponent,
  mergeModels,
  useModel,
  createElementBlock,
  openBlock,
  withDirectives,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = ['value'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SelectInput',
  props: /* @__PURE__ */ mergeModels(
    {
      options: {},
    },
    {
      modelValue: {},
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props) {
    const model = useModel(__props, 'modelValue');
    const value = option => (typeof option === 'string' ? option : option.value);
    const label = option => (typeof option === 'string' ? option : option.label);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.container),
          },
          [
            withDirectives(
              createBaseVNode(
                'select',
                {
                  'onUpdate:modelValue':
                    _cache[0] || (_cache[0] = $event => (model.value = $event)),
                  class: normalizeClass(_ctx.$style.select),
                },
                [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(_ctx.options, option => {
                      return (
                        openBlock(),
                        createElementBlock(
                          'option',
                          {
                            key: value(option),
                            value: value(option),
                          },
                          toDisplayString(label(option)),
                          9,
                          _hoisted_1,
                        )
                      );
                    }),
                    128,
                  )),
                ],
                2,
              ),
              [[vModelSelect, model.value]],
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0SW5wdXQudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZm9ybXMvU2VsZWN0SW5wdXQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5jb25zdCBtb2RlbCA9IGRlZmluZU1vZGVsPHN0cmluZz4oKTtcblxudHlwZSBPcHRpb24gPVxuICB8IHN0cmluZ1xuICB8IHtcbiAgICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgICB2YWx1ZTogc3RyaW5nO1xuICAgIH07XG5cbmRlZmluZVByb3BzPHsgb3B0aW9uczogT3B0aW9uW10gfT4oKTtcblxuY29uc3QgdmFsdWUgPSAob3B0aW9uOiBPcHRpb24pID0+ICh0eXBlb2Ygb3B0aW9uID09PSAnc3RyaW5nJyA/IG9wdGlvbiA6IG9wdGlvbi52YWx1ZSk7XG5jb25zdCBsYWJlbCA9IChvcHRpb246IE9wdGlvbikgPT4gKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnID8gb3B0aW9uIDogb3B0aW9uLmxhYmVsKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiJHN0eWxlLmNvbnRhaW5lclwiPlxuICAgIDxzZWxlY3Qgdi1tb2RlbD1cIm1vZGVsXCIgOmNsYXNzPVwiJHN0eWxlLnNlbGVjdFwiPlxuICAgICAgPG9wdGlvbiB2LWZvcj1cIm9wdGlvbiBpbiBvcHRpb25zXCIgOmtleT1cInZhbHVlKG9wdGlvbilcIiA6dmFsdWU9XCJ2YWx1ZShvcHRpb24pXCI+XG4gICAgICAgIHt7IGxhYmVsKG9wdGlvbikgfX1cbiAgICAgIDwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uY29udGFpbmVyIHtcbiAgd2lkdGg6IDE1OHB4O1xuICBtYXJnaW4tcmlnaHQ6IDA7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xufVxuXG4uc2VsZWN0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl91c2VNb2RlbCIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfbm9ybWFsaXplQ2xhc3MiLCIkc3R5bGUiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJvcHRpb25zIiwiX3RvRGlzcGxheVN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxVQUFNLFFBQVFBLFNBQW1CLFNBQUEsWUFBQztBQVdsQyxVQUFNLFFBQVEsQ0FBQyxXQUFvQixPQUFPLFdBQVcsV0FBVyxTQUFTLE9BQU87QUFDaEYsVUFBTSxRQUFRLENBQUMsV0FBb0IsT0FBTyxXQUFXLFdBQVcsU0FBUyxPQUFPOzswQkFJOUVDLG1CQU1NLE9BQUE7QUFBQSxRQU5BLE9BQUtDLGVBQUVDLEtBQUFBLE9BQU8sU0FBUztBQUFBLE1BQUE7dUJBQzNCQyxnQkFJUyxVQUFBO0FBQUEsdUVBSlEsTUFBSyxRQUFBO0FBQUEsVUFBRyxPQUFLRixlQUFFQyxLQUFBQSxPQUFPLE1BQU07QUFBQSxRQUFBOzRCQUMzQ0YsbUJBRVNJLFVBQUEsTUFBQUMsV0FGZ0JDLEtBQUFBLFNBQU8sQ0FBakIsV0FBTTtnQ0FBckJOLG1CQUVTLFVBQUE7QUFBQSxjQUYwQixLQUFLLE1BQU0sTUFBTTtBQUFBLGNBQUksT0FBTyxNQUFNLE1BQU07QUFBQSxZQUFBLEdBQ3RFTyxnQkFBQSxNQUFNLE1BQU0sQ0FBQSxHQUFBLEdBQUEsVUFBQTtBQUFBOzt5QkFGRixNQUFBLEtBQUs7QUFBQSxRQUFBOzs7OzsifQ==
