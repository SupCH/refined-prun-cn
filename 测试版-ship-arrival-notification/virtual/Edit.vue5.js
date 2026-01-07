import _sfc_main$1 from './Active.vue.js';
import { sitesStore } from './sites.js';
import { getEntityNameFromAddress } from './addresses.js';
import SelectInput from './SelectInput.vue.js';
import _sfc_main$2 from './NumberInput.vue.js';
import { comparePlanets } from './util.js';
import { configurableValue } from './shared-types.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Edit',
  props: {
    group: {},
  },
  setup(__props, { expose: __expose }) {
    const planets = computed(() => {
      const planets2 = (sitesStore.all.value ?? [])
        .map(x => getEntityNameFromAddress(x.address))
        .filter(x => x !== void 0)
        .sort(comparePlanets);
      planets2.unshift(configurableValue);
      return planets2;
    });
    const planet = ref(__props.group.planet ?? planets.value[0]);
    const planetError = ref(false);
    const days = ref(
      typeof __props.group.days === 'string'
        ? parseInt(__props.group.days || '0')
        : __props.group.days,
    );
    const advanceDays = ref(
      typeof __props.group.advanceDays === 'string'
        ? parseInt(__props.group.advanceDays || '0')
        : (__props.group.advanceDays ?? 0),
    );
    const advanceDaysError = ref(false);
    function validate() {
      let isValid = true;
      planetError.value = !planet.value;
      isValid &&= !planetError.value;
      advanceDaysError.value = advanceDays.value < 0;
      isValid &&= !advanceDaysError.value;
      return isValid;
    }
    function save() {
      __props.group.planet = planet.value;
      __props.group.days = days.value;
      __props.group.advanceDays = advanceDays.value;
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
              {
                label: 'Planet',
                error: unref(planetError),
              },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(planet),
                      'onUpdate:modelValue':
                        _cache[0] ||
                        (_cache[0] = $event => (isRef(planet) ? (planet.value = $event) : null)),
                      options: unref(planets),
                    },
                    null,
                    8,
                    ['modelValue', 'options'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['error'],
            ),
            createVNode(
              _sfc_main$1,
              {
                label: 'Day Threshold',
                tooltip:
                  'All buildings older than this threshold will be repaired.\n     If no number is provided all buildings are repaired.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$2,
                    {
                      modelValue: unref(days),
                      'onUpdate:modelValue':
                        _cache[1] ||
                        (_cache[1] = $event => (isRef(days) ? (days.value = $event) : null)),
                      optional: '',
                    },
                    null,
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
            ),
            createVNode(
              _sfc_main$1,
              {
                label: 'Time Offset',
                tooltip: 'The number of days in the future this repair will be conducted.',
                error: unref(advanceDaysError),
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$2,
                    {
                      modelValue: unref(advanceDays),
                      'onUpdate:modelValue':
                        _cache[2] ||
                        (_cache[2] = $event =>
                          isRef(advanceDays) ? (advanceDays.value = $event) : null),
                    },
                    null,
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['error'],
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdC52dWU1LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9tYXRlcmlhbC1ncm91cHMvcmVwYWlyL0VkaXQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgQWN0aXZlIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9BY3RpdmUudnVlJztcbmltcG9ydCB7IHNpdGVzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc2l0ZXMnO1xuaW1wb3J0IHsgZ2V0RW50aXR5TmFtZUZyb21BZGRyZXNzIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2FkZHJlc3Nlcyc7XG5pbXBvcnQgU2VsZWN0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1NlbGVjdElucHV0LnZ1ZSc7XG5pbXBvcnQgTnVtYmVySW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL051bWJlcklucHV0LnZ1ZSc7XG5pbXBvcnQgeyBjb21wYXJlUGxhbmV0cyB9IGZyb20gJ0BzcmMvdXRpbCc7XG5pbXBvcnQgeyBjb25maWd1cmFibGVWYWx1ZSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9zaGFyZWQtdHlwZXMnO1xuXG5jb25zdCB7IGdyb3VwIH0gPSBkZWZpbmVQcm9wczx7IGdyb3VwOiBVc2VyRGF0YS5NYXRlcmlhbEdyb3VwRGF0YSB9PigpO1xuXG5jb25zdCBwbGFuZXRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCBwbGFuZXRzID0gKHNpdGVzU3RvcmUuYWxsLnZhbHVlID8/IFtdKVxuICAgIC5tYXAoeCA9PiBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3MoeC5hZGRyZXNzKSlcbiAgICAuZmlsdGVyKHggPT4geCAhPT0gdW5kZWZpbmVkKVxuICAgIC5zb3J0KGNvbXBhcmVQbGFuZXRzKTtcbiAgcGxhbmV0cy51bnNoaWZ0KGNvbmZpZ3VyYWJsZVZhbHVlKTtcbiAgcmV0dXJuIHBsYW5ldHM7XG59KTtcblxuY29uc3QgcGxhbmV0ID0gcmVmKGdyb3VwLnBsYW5ldCA/PyBwbGFuZXRzLnZhbHVlWzBdKTtcbmNvbnN0IHBsYW5ldEVycm9yID0gcmVmKGZhbHNlKTtcblxuY29uc3QgZGF5cyA9IHJlZih0eXBlb2YgZ3JvdXAuZGF5cyA9PT0gJ3N0cmluZycgPyBwYXJzZUludChncm91cC5kYXlzIHx8ICcwJykgOiBncm91cC5kYXlzKTtcblxuY29uc3QgYWR2YW5jZURheXMgPSByZWYoXG4gIHR5cGVvZiBncm91cC5hZHZhbmNlRGF5cyA9PT0gJ3N0cmluZydcbiAgICA/IHBhcnNlSW50KGdyb3VwLmFkdmFuY2VEYXlzIHx8ICcwJylcbiAgICA6IChncm91cC5hZHZhbmNlRGF5cyA/PyAwKSxcbik7XG5jb25zdCBhZHZhbmNlRGF5c0Vycm9yID0gcmVmKGZhbHNlKTtcblxuZnVuY3Rpb24gdmFsaWRhdGUoKSB7XG4gIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgcGxhbmV0RXJyb3IudmFsdWUgPSAhcGxhbmV0LnZhbHVlO1xuICBpc1ZhbGlkICYmPSAhcGxhbmV0RXJyb3IudmFsdWU7XG4gIGFkdmFuY2VEYXlzRXJyb3IudmFsdWUgPSBhZHZhbmNlRGF5cy52YWx1ZSA8IDA7XG4gIGlzVmFsaWQgJiY9ICFhZHZhbmNlRGF5c0Vycm9yLnZhbHVlO1xuICByZXR1cm4gaXNWYWxpZDtcbn1cblxuZnVuY3Rpb24gc2F2ZSgpIHtcbiAgZ3JvdXAucGxhbmV0ID0gcGxhbmV0LnZhbHVlO1xuICBncm91cC5kYXlzID0gZGF5cy52YWx1ZTtcbiAgZ3JvdXAuYWR2YW5jZURheXMgPSBhZHZhbmNlRGF5cy52YWx1ZTtcbn1cblxuZGVmaW5lRXhwb3NlKHsgdmFsaWRhdGUsIHNhdmUgfSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8QWN0aXZlIGxhYmVsPVwiUGxhbmV0XCIgOmVycm9yPVwicGxhbmV0RXJyb3JcIj5cbiAgICA8U2VsZWN0SW5wdXQgdi1tb2RlbD1cInBsYW5ldFwiIDpvcHRpb25zPVwicGxhbmV0c1wiIC8+XG4gIDwvQWN0aXZlPlxuICA8QWN0aXZlXG4gICAgbGFiZWw9XCJEYXkgVGhyZXNob2xkXCJcbiAgICB0b29sdGlwPVwiQWxsIGJ1aWxkaW5ncyBvbGRlciB0aGFuIHRoaXMgdGhyZXNob2xkIHdpbGwgYmUgcmVwYWlyZWQuXG4gICAgIElmIG5vIG51bWJlciBpcyBwcm92aWRlZCBhbGwgYnVpbGRpbmdzIGFyZSByZXBhaXJlZC5cIj5cbiAgICA8TnVtYmVySW5wdXQgdi1tb2RlbD1cImRheXNcIiBvcHRpb25hbCAvPlxuICA8L0FjdGl2ZT5cbiAgPEFjdGl2ZVxuICAgIGxhYmVsPVwiVGltZSBPZmZzZXRcIlxuICAgIHRvb2x0aXA9XCJUaGUgbnVtYmVyIG9mIGRheXMgaW4gdGhlIGZ1dHVyZSB0aGlzIHJlcGFpciB3aWxsIGJlIGNvbmR1Y3RlZC5cIlxuICAgIDplcnJvcj1cImFkdmFuY2VEYXlzRXJyb3JcIj5cbiAgICA8TnVtYmVySW5wdXQgdi1tb2RlbD1cImFkdmFuY2VEYXlzXCIgLz5cbiAgPC9BY3RpdmU+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl91bnJlZiIsIl9jcmVhdGVWTm9kZSIsIl9pc1JlZiIsIk51bWJlcklucHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFXQSxVQUFBLFVBQUEsU0FBQSxNQUFBO0FBQ0UsWUFBQSxZQUFBLFdBQUEsSUFBQSxTQUFBLElBQUEsSUFBQSxDQUFBLE1BQUEseUJBQUEsRUFBQSxPQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsTUFBQSxNQUFBLE1BQUEsRUFBQSxLQUFBLGNBQUE7QUFJQSxlQUFBLFFBQUEsaUJBQUE7QUFDQSxhQUFBO0FBQUEsSUFBTyxDQUFBO0FBR1QsVUFBQSxTQUFBLElBQUEsUUFBQSxNQUFBLFVBQUEsUUFBQSxNQUFBLENBQUEsQ0FBQTtBQUNBLFVBQUEsY0FBQSxJQUFBLEtBQUE7QUFFQSxVQUFBLE9BQUEsSUFBQSxPQUFBLFFBQUEsTUFBQSxTQUFBLFdBQUEsU0FBQSxRQUFBLE1BQUEsUUFBQSxHQUFBLElBQUEsUUFBQSxNQUFBLElBQUE7QUFFQSxVQUFBLGNBQUE7QUFBQSxNQUFvQixPQUFBLFFBQUEsTUFBQSxnQkFBQSxXQUFBLFNBQUEsUUFBQSxNQUFBLGVBQUEsR0FBQSxJQUFBLFFBQUEsTUFBQSxlQUFBO0FBQUEsSUFHUTtBQUU1QixVQUFBLG1CQUFBLElBQUEsS0FBQTtBQUVBLGFBQUEsV0FBQTtBQUNFLFVBQUEsVUFBQTtBQUNBLGtCQUFBLFFBQUEsQ0FBQSxPQUFBO0FBQ0Esa0JBQUEsQ0FBQSxZQUFBO0FBQ0EsdUJBQUEsUUFBQSxZQUFBLFFBQUE7QUFDQSxrQkFBQSxDQUFBLGlCQUFBO0FBQ0EsYUFBQTtBQUFBLElBQU87QUFHVCxhQUFBLE9BQUE7QUFDRSxjQUFBLE1BQUEsU0FBQSxPQUFBO0FBQ0EsY0FBQSxNQUFBLE9BQUEsS0FBQTtBQUNBLGNBQUEsTUFBQSxjQUFBLFlBQUE7QUFBQSxJQUFnQztBQUdsQyxhQUFBLEVBQUEsVUFBQSxNQUFBOzs7O1VBTVcsT0FBQTtBQUFBLFVBRkssT0FBQUEsTUFBQSxXQUFBO0FBQUEsUUFBaUIsR0FBQTtBQUFBO1lBQ3NCQyxZQUFBLGFBQUE7QUFBQSxjQUFBLFlBQUFELE1BQUEsTUFBQTtBQUFBLGNBQTdCLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQUUsTUFBQSxNQUFBLElBQUEsT0FBQSxRQUFBLFNBQUE7QUFBQSxjQUFNLFNBQUFGLE1BQUEsT0FBQTtBQUFBLFlBQVksR0FBQSxNQUFBLEdBQUEsQ0FBQSxjQUFBLFNBQUEsQ0FBQTtBQUFBOzs7O1VBT2pDLE9BQUE7QUFBQSxVQUpELFNBQUE7QUFBQSxRQUNFLEdBQUE7QUFBQTtZQUUrQkMsWUFBQUUsYUFBQTtBQUFBLGNBQUEsWUFBQUgsTUFBQSxJQUFBO0FBQUEsY0FBakIsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBRSxNQUFBLElBQUEsSUFBQSxLQUFBLFFBQUEsU0FBQTtBQUFBLGNBQUksVUFBQTtBQUFBLFlBQUUsR0FBQSxNQUFBLEdBQUEsQ0FBQSxZQUFBLENBQUE7QUFBQTs7OztVQU9yQixPQUFBO0FBQUEsVUFKRCxTQUFBO0FBQUEsVUFDRSxPQUFBRixNQUFBLGdCQUFBO0FBQUEsUUFDQSxHQUFBO0FBQUE7WUFDNkJDLFlBQUFFLGFBQUE7QUFBQSxjQUFBLFlBQUFILE1BQUEsV0FBQTtBQUFBLGNBQWYsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBRSxNQUFBLFdBQUEsSUFBQSxZQUFBLFFBQUEsU0FBQTtBQUFBLFlBQVcsR0FBQSxNQUFBLEdBQUEsQ0FBQSxZQUFBLENBQUE7QUFBQTs7Ozs7OzsifQ==
