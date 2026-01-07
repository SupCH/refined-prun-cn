import config from './config.js';
import SelectInput from './SelectInput.vue.js';
import _sfc_main$1 from './Active.vue.js';
import { sitesStore } from './sites.js';
import { getEntityNameFromAddress } from './addresses.js';
import { comparePlanets } from './util.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Configure',
  props: {
    data: {},
    config: {},
  },
  setup(__props) {
    const planets = computed(() =>
      (sitesStore.all.value ?? [])
        .map(x => getEntityNameFromAddress(x.address))
        .filter(x => x !== void 0)
        .sort(comparePlanets),
    );
    if (!__props.config.planet) {
      __props.config.planet = planets.value[0];
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('form', null, [
          createVNode(
            _sfc_main$1,
            { label: 'Planet' },
            {
              default: withCtx(() => [
                createVNode(
                  SelectInput,
                  {
                    modelValue: ('config' in _ctx ? _ctx.config : unref(config)).planet,
                    'onUpdate:modelValue':
                      _cache[0] ||
                      (_cache[0] = $event =>
                        (('config' in _ctx ? _ctx.config : unref(config)).planet = $event)),
                    options: unref(planets),
                  },
                  null,
                  8,
                  ['modelValue', 'options'],
                ),
              ]),
              _: 1,
            },
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJlLnZ1ZTQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQUNUL21hdGVyaWFsLWdyb3Vwcy9yZXN1cHBseS9Db25maWd1cmUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgU2VsZWN0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1NlbGVjdElucHV0LnZ1ZSc7XG5pbXBvcnQgQWN0aXZlIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9BY3RpdmUudnVlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9tYXRlcmlhbC1ncm91cHMvcmVzdXBwbHkvY29uZmlnJztcbmltcG9ydCB7IHNpdGVzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc2l0ZXMnO1xuaW1wb3J0IHsgZ2V0RW50aXR5TmFtZUZyb21BZGRyZXNzIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2FkZHJlc3Nlcyc7XG5pbXBvcnQgeyBjb21wYXJlUGxhbmV0cyB9IGZyb20gJ0BzcmMvdXRpbCc7XG5cbmNvbnN0IHsgY29uZmlnIH0gPSBkZWZpbmVQcm9wczx7IGRhdGE6IFVzZXJEYXRhLkFjdGlvbkRhdGE7IGNvbmZpZzogQ29uZmlnIH0+KCk7XG5cbmNvbnN0IHBsYW5ldHMgPSBjb21wdXRlZCgoKSA9PlxuICAoc2l0ZXNTdG9yZS5hbGwudmFsdWUgPz8gW10pXG4gICAgLm1hcCh4ID0+IGdldEVudGl0eU5hbWVGcm9tQWRkcmVzcyh4LmFkZHJlc3MpKVxuICAgIC5maWx0ZXIoeCA9PiB4ICE9PSB1bmRlZmluZWQpXG4gICAgLnNvcnQoY29tcGFyZVBsYW5ldHMpLFxuKTtcblxuaWYgKCFjb25maWcucGxhbmV0KSB7XG4gIGNvbmZpZy5wbGFuZXQgPSBwbGFuZXRzLnZhbHVlWzBdO1xufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGZvcm0+XG4gICAgPEFjdGl2ZSBsYWJlbD1cIlBsYW5ldFwiPlxuICAgICAgPFNlbGVjdElucHV0IHYtbW9kZWw9XCJjb25maWcucGxhbmV0XCIgOm9wdGlvbnM9XCJwbGFuZXRzXCIgLz5cbiAgICA8L0FjdGl2ZT5cbiAgPC9mb3JtPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlVk5vZGUiLCJBY3RpdmUiLCJfd2l0aEN0eCIsImNvbmZpZyIsIl91bnJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBVUEsVUFBQSxVQUFBO0FBQUEsTUFBZ0IsT0FBQSxXQUFBLElBQUEsU0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLE1BQUEseUJBQUEsRUFBQSxPQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsTUFBQSxNQUFBLE1BQUEsRUFBQSxLQUFBLGNBQUE7QUFBQSxJQUlRO0FBR3hCLFFBQUEsQ0FBQSxRQUFBLE9BQUEsUUFBQTtBQUNFLGNBQUEsT0FBQSxTQUFBLFFBQUEsTUFBQSxDQUFBO0FBQUEsSUFBK0I7OztRQVN4QkEsWUFBQUMsYUFBQSxFQUFBLE9BQUEsU0FBQSxHQUFBO0FBQUEsVUFIaUIsU0FBQUMsUUFBQSxNQUFBO0FBQUEsWUFDc0NGLFlBQUEsYUFBQTtBQUFBLGNBQUEsYUFBcENHLFlBQUFBLE9BQUFBLEtBQUFBLFNBQUFBLE1BQUFBLE1BQUFBLEdBQUFBO0FBQUFBLGNBQU8sdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFQQSxZQUFBQSxPQUFBQSxLQUFBQSxTQUFBQSxNQUFBQSxNQUFBQSxHQUFBQSxTQUFBQTtBQUFBQSxjQUFhLFNBQUFDLE1BQUEsT0FBQTtBQUFBLFlBQVksR0FBQSxNQUFBLEdBQUEsQ0FBQSxjQUFBLFNBQUEsQ0FBQTtBQUFBOzs7Ozs7OyJ9
