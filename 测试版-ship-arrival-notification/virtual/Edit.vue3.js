import _sfc_main$1 from './Active.vue.js';
import SelectInput from './SelectInput.vue.js';
import { storageSort, serializeStorage } from './utils3.js';
import { configurableValue } from './shared-types.js';
import _sfc_main$2 from './RadioItem.vue.js';
import { getRefuelOrigins } from './utils6.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
  createTextVNode,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Edit',
  props: {
    action: {},
    pkg: {},
  },
  setup(__props, { expose: __expose }) {
    const storages = computed(() => {
      const storages2 = getRefuelOrigins().sort(storageSort).map(serializeStorage);
      storages2.unshift(configurableValue);
      return storages2;
    });
    const origin = ref(__props.action.origin ?? storages.value[0]);
    const buyMissingFuel = ref(__props.action.buyMissingFuel ?? true);
    function validate() {
      return true;
    }
    function save() {
      __props.action.origin = origin.value;
      __props.action.buyMissingFuel = buyMissingFuel.value;
    }
    __expose({ validate, save });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(
              _sfc_main$1,
              { label: 'Origin' },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(origin),
                      'onUpdate:modelValue':
                        _cache[0] ||
                        (_cache[0] = $event => (isRef(origin) ? (origin.value = $event) : null)),
                      options: unref(storages),
                    },
                    null,
                    8,
                    ['modelValue', 'options'],
                  ),
                ]),
                _: 1,
              },
            ),
            createVNode(
              _sfc_main$1,
              {
                label: 'Buy Missing Fuel',
                tooltip:
                  'Whether the fuel will be bought if there is not enough stock (CX warehouse only).',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$2,
                    {
                      modelValue: unref(buyMissingFuel),
                      'onUpdate:modelValue':
                        _cache[1] ||
                        (_cache[1] = $event =>
                          isRef(buyMissingFuel) ? (buyMissingFuel.value = $event) : null),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[2] || (_cache[2] = [createTextVNode('buy fuel', -1)])),
                      ]),
                      _: 1,
                    },
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdC52dWUzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9hY3Rpb25zL3JlZnVlbC9FZGl0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IEFjdGl2ZSBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQWN0aXZlLnZ1ZSc7XG5pbXBvcnQgU2VsZWN0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1NlbGVjdElucHV0LnZ1ZSc7XG5pbXBvcnQgeyBzZXJpYWxpemVTdG9yYWdlLCBzdG9yYWdlU29ydCB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9hY3Rpb25zL3V0aWxzJztcbmltcG9ydCB7IGNvbmZpZ3VyYWJsZVZhbHVlIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL3NoYXJlZC10eXBlcyc7XG5pbXBvcnQgUmFkaW9JdGVtIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9SYWRpb0l0ZW0udnVlJztcbmltcG9ydCB7IGdldFJlZnVlbE9yaWdpbnMgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy9yZWZ1ZWwvdXRpbHMnO1xuXG5jb25zdCB7IGFjdGlvbiB9ID0gZGVmaW5lUHJvcHM8e1xuICBhY3Rpb246IFVzZXJEYXRhLkFjdGlvbkRhdGE7XG4gIHBrZzogVXNlckRhdGEuQWN0aW9uUGFja2FnZURhdGE7XG59PigpO1xuXG5jb25zdCBzdG9yYWdlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3Qgc3RvcmFnZXMgPSBnZXRSZWZ1ZWxPcmlnaW5zKCkuc29ydChzdG9yYWdlU29ydCkubWFwKHNlcmlhbGl6ZVN0b3JhZ2UpO1xuICBzdG9yYWdlcy51bnNoaWZ0KGNvbmZpZ3VyYWJsZVZhbHVlKTtcbiAgcmV0dXJuIHN0b3JhZ2VzO1xufSk7XG5cbmNvbnN0IG9yaWdpbiA9IHJlZihhY3Rpb24ub3JpZ2luID8/IHN0b3JhZ2VzLnZhbHVlWzBdKTtcblxuY29uc3QgYnV5TWlzc2luZ0Z1ZWwgPSByZWYoYWN0aW9uLmJ1eU1pc3NpbmdGdWVsID8/IHRydWUpO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSgpIHtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHNhdmUoKSB7XG4gIGFjdGlvbi5vcmlnaW4gPSBvcmlnaW4udmFsdWU7XG4gIGFjdGlvbi5idXlNaXNzaW5nRnVlbCA9IGJ1eU1pc3NpbmdGdWVsLnZhbHVlO1xufVxuXG5kZWZpbmVFeHBvc2UoeyB2YWxpZGF0ZSwgc2F2ZSB9KTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxBY3RpdmUgbGFiZWw9XCJPcmlnaW5cIj5cbiAgICA8U2VsZWN0SW5wdXQgdi1tb2RlbD1cIm9yaWdpblwiIDpvcHRpb25zPVwic3RvcmFnZXNcIiAvPlxuICA8L0FjdGl2ZT5cbiAgPEFjdGl2ZVxuICAgIGxhYmVsPVwiQnV5IE1pc3NpbmcgRnVlbFwiXG4gICAgdG9vbHRpcD1cIldoZXRoZXIgdGhlIGZ1ZWwgd2lsbCBiZSBib3VnaHQgaWYgdGhlcmUgaXMgbm90IGVub3VnaCBzdG9jayAoQ1ggd2FyZWhvdXNlIG9ubHkpLlwiPlxuICAgIDxSYWRpb0l0ZW0gdi1tb2RlbD1cImJ1eU1pc3NpbmdGdWVsXCI+YnV5IGZ1ZWw8L1JhZGlvSXRlbT5cbiAgPC9BY3RpdmU+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl93aXRoQ3R4IiwiX2NyZWF0ZVZOb2RlIiwiX3VucmVmIiwiX2lzUmVmIiwiUmFkaW9JdGVtIiwiX2NyZWF0ZVRleHRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsVUFBQSxXQUFBLFNBQUEsTUFBQTtBQUNFLFlBQUEsWUFBQSxtQkFBQSxLQUFBLFdBQUEsRUFBQSxJQUFBLGdCQUFBO0FBQ0EsZ0JBQUEsUUFBQSxpQkFBQTtBQUNBLGFBQUE7QUFBQSxJQUFPLENBQUE7QUFHVCxVQUFBLFNBQUEsSUFBQSxRQUFBLE9BQUEsVUFBQSxTQUFBLE1BQUEsQ0FBQSxDQUFBO0FBRUEsVUFBQSxpQkFBQSxJQUFBLFFBQUEsT0FBQSxrQkFBQSxJQUFBO0FBRUEsYUFBQSxXQUFBO0FBQ0UsYUFBQTtBQUFBLElBQU87QUFHVCxhQUFBLE9BQUE7QUFDRSxjQUFBLE9BQUEsU0FBQSxPQUFBO0FBQ0EsY0FBQSxPQUFBLGlCQUFBLGVBQUE7QUFBQSxJQUF1QztBQUd6QyxhQUFBLEVBQUEsVUFBQSxNQUFBOzs7O1VBSXdCLFNBQUFBLFFBQUEsTUFBQTtBQUFBLFlBQ2dDQyxZQUFBLGFBQUE7QUFBQSxjQUFBLFlBQUFDLE1BQUEsTUFBQTtBQUFBLGNBQTlCLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQUMsTUFBQSxNQUFBLElBQUEsT0FBQSxRQUFBLFNBQUE7QUFBQSxjQUFNLFNBQUFELE1BQUEsUUFBQTtBQUFBLFlBQVksR0FBQSxNQUFBLEdBQUEsQ0FBQSxjQUFBLFNBQUEsQ0FBQTtBQUFBOzs7O1VBTWpDLE9BQUE7QUFBQSxVQUhELFNBQUE7QUFBQSxRQUNFLEdBQUE7QUFBQTtZQUNnREQsWUFBQUcsYUFBQTtBQUFBLGNBQUEsWUFBQUYsTUFBQSxjQUFBO0FBQUEsY0FBcEMsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBQyxNQUFBLGNBQUEsSUFBQSxlQUFBLFFBQUEsU0FBQTtBQUFBLFlBQWMsR0FBQTtBQUFBO2dCQUFVRSxnQkFBQSxZQUFBLEVBQUE7QUFBQSxjQUFBLEVBQUEsQ0FBQTtBQUFBOzs7Ozs7Ozs7In0=
