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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJlLnZ1ZTMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQUNUL21hdGVyaWFsLWdyb3Vwcy9yZXBhaXIvQ29uZmlndXJlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IFNlbGVjdElucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9TZWxlY3RJbnB1dC52dWUnO1xuaW1wb3J0IEFjdGl2ZSBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQWN0aXZlLnZ1ZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvbWF0ZXJpYWwtZ3JvdXBzL3JlcGFpci9jb25maWcnO1xuaW1wb3J0IHsgc2l0ZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zaXRlcyc7XG5pbXBvcnQgeyBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3MgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYWRkcmVzc2VzJztcbmltcG9ydCB7IGNvbXBhcmVQbGFuZXRzIH0gZnJvbSAnQHNyYy91dGlsJztcblxuY29uc3QgeyBjb25maWcgfSA9IGRlZmluZVByb3BzPHsgZGF0YTogVXNlckRhdGEuQWN0aW9uRGF0YTsgY29uZmlnOiBDb25maWcgfT4oKTtcblxuY29uc3QgcGxhbmV0cyA9IGNvbXB1dGVkKCgpID0+XG4gIChzaXRlc1N0b3JlLmFsbC52YWx1ZSA/PyBbXSlcbiAgICAubWFwKHggPT4gZ2V0RW50aXR5TmFtZUZyb21BZGRyZXNzKHguYWRkcmVzcykpXG4gICAgLmZpbHRlcih4ID0+IHggIT09IHVuZGVmaW5lZClcbiAgICAuc29ydChjb21wYXJlUGxhbmV0cyksXG4pO1xuXG5pZiAoIWNvbmZpZy5wbGFuZXQpIHtcbiAgY29uZmlnLnBsYW5ldCA9IHBsYW5ldHMudmFsdWVbMF07XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8Zm9ybT5cbiAgICA8QWN0aXZlIGxhYmVsPVwiUGxhbmV0XCI+XG4gICAgICA8U2VsZWN0SW5wdXQgdi1tb2RlbD1cImNvbmZpZy5wbGFuZXRcIiA6b3B0aW9ucz1cInBsYW5ldHNcIiAvPlxuICAgIDwvQWN0aXZlPlxuICA8L2Zvcm0+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVWTm9kZSIsIkFjdGl2ZSIsIl93aXRoQ3R4IiwiY29uZmlnIiwiX3VucmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFVQSxVQUFBLFVBQUE7QUFBQSxNQUFnQixPQUFBLFdBQUEsSUFBQSxTQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsTUFBQSx5QkFBQSxFQUFBLE9BQUEsQ0FBQSxFQUFBLE9BQUEsQ0FBQSxNQUFBLE1BQUEsTUFBQSxFQUFBLEtBQUEsY0FBQTtBQUFBLElBSVE7QUFHeEIsUUFBQSxDQUFBLFFBQUEsT0FBQSxRQUFBO0FBQ0UsY0FBQSxPQUFBLFNBQUEsUUFBQSxNQUFBLENBQUE7QUFBQSxJQUErQjs7O1FBU3hCQSxZQUFBQyxhQUFBLEVBQUEsT0FBQSxTQUFBLEdBQUE7QUFBQSxVQUhpQixTQUFBQyxRQUFBLE1BQUE7QUFBQSxZQUNzQ0YsWUFBQSxhQUFBO0FBQUEsY0FBQSxhQUFwQ0csWUFBQUEsT0FBQUEsS0FBQUEsU0FBQUEsTUFBQUEsTUFBQUEsR0FBQUE7QUFBQUEsY0FBTyx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFlBQVBBLFlBQUFBLE9BQUFBLEtBQUFBLFNBQUFBLE1BQUFBLE1BQUFBLEdBQUFBLFNBQUFBO0FBQUFBLGNBQWEsU0FBQUMsTUFBQSxPQUFBO0FBQUEsWUFBWSxHQUFBLE1BQUEsR0FBQSxDQUFBLGNBQUEsU0FBQSxDQUFBO0FBQUE7Ozs7Ozs7In0=
