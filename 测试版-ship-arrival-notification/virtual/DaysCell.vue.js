import { C } from './prun-css.js';
import { userData } from './user-data.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { style: { position: 'relative' } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'DaysCell',
  props: {
    days: {},
  },
  setup(__props) {
    const flooredDays = computed(() => Math.floor(__props.days));
    const burnClass = computed(() => ({
      [C.Workforces.daysMissing]: flooredDays.value <= userData.settings.burn.red,
      [C.Workforces.daysWarning]: flooredDays.value <= userData.settings.burn.yellow,
      [C.Workforces.daysSupplied]: flooredDays.value > userData.settings.burn.yellow,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('td', _hoisted_1, [
          createBaseVNode(
            'div',
            {
              style: { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' },
              class: normalizeClass(unref(burnClass)),
            },
            null,
            2,
          ),
          createBaseVNode(
            'span',
            null,
            toDisplayString(unref(flooredDays) < 500 ? unref(flooredDays) : '∞'),
            1,
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF5c0NlbGwudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0JVUk4vRGF5c0NlbGwudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcblxuY29uc3QgeyBkYXlzIH0gPSBkZWZpbmVQcm9wczx7IGRheXM6IG51bWJlciB9PigpO1xuXG5jb25zdCBmbG9vcmVkRGF5cyA9IGNvbXB1dGVkKCgpID0+IE1hdGguZmxvb3IoZGF5cykpO1xuY29uc3QgYnVybkNsYXNzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgW0MuV29ya2ZvcmNlcy5kYXlzTWlzc2luZ106IGZsb29yZWREYXlzLnZhbHVlIDw9IHVzZXJEYXRhLnNldHRpbmdzLmJ1cm4ucmVkLFxuICBbQy5Xb3JrZm9yY2VzLmRheXNXYXJuaW5nXTogZmxvb3JlZERheXMudmFsdWUgPD0gdXNlckRhdGEuc2V0dGluZ3MuYnVybi55ZWxsb3csXG4gIFtDLldvcmtmb3JjZXMuZGF5c1N1cHBsaWVkXTogZmxvb3JlZERheXMudmFsdWUgPiB1c2VyRGF0YS5zZXR0aW5ncy5idXJuLnllbGxvdyxcbn0pKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx0ZCA6c3R5bGU9XCJ7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH1cIj5cbiAgICA8ZGl2XG4gICAgICA6c3R5bGU9XCJ7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAsIHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnIH1cIlxuICAgICAgOmNsYXNzPVwiYnVybkNsYXNzXCIgLz5cbiAgICA8c3Bhbj57eyBmbG9vcmVkRGF5cyA8IDUwMCA/IGZsb29yZWREYXlzIDogJ+KInicgfX08L3NwYW4+XG4gIDwvdGQ+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9ub3JtYWxpemVDbGFzcyIsIl91bnJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBS0EsVUFBQSxjQUFBLFNBQUEsTUFBQSxLQUFBLE1BQUEsUUFBQSxJQUFBLENBQUE7QUFDQSxVQUFBLFlBQUEsU0FBQSxPQUFBO0FBQUEsTUFBa0MsQ0FBQSxFQUFBLFdBQUEsV0FBQSxHQUFBLFlBQUEsU0FBQSxTQUFBLFNBQUEsS0FBQTtBQUFBLE1BQ3dDLENBQUEsRUFBQSxXQUFBLFdBQUEsR0FBQSxZQUFBLFNBQUEsU0FBQSxTQUFBLEtBQUE7QUFBQSxNQUNBLENBQUEsRUFBQSxXQUFBLFlBQUEsR0FBQSxZQUFBLFFBQUEsU0FBQSxTQUFBLEtBQUE7QUFBQSxJQUNBLEVBQUE7O0FBS3hFLGFBQUFBLFVBQUEsR0FBQUMsbUJBQUEsTUFBQSxZQUFBO0FBQUEsUUFLS0MsZ0JBQUEsT0FBQTtBQUFBLFVBRm9CLE9BQUEsRUFBQSxVQUFBLFlBQUEsTUFBQSxHQUFBLEtBQUEsR0FBQSxPQUFBLFFBQUEsUUFBQSxPQUFBO0FBQUEsVUFEYixPQUFBQyxlQUFBQyxNQUFBLFNBQUEsQ0FBQTtBQUFBLFFBQ1MsR0FBQSxNQUFBLENBQUE7QUFBQTtNQUNxQixDQUFBO0FBQUE7OzsifQ==
