import _sfc_main$1 from './Active.vue.js';
import { sitesStore } from './sites.js';
import { getEntityNameFromAddress } from './addresses.js';
import SelectInput from './SelectInput.vue.js';
import _sfc_main$2 from './NumberInput.vue.js';
import { comparePlanets } from './util.js';
import _sfc_main$3 from './TextInput.vue.js';
import _sfc_main$4 from './RadioItem.vue.js';
import { materialsStore } from './materials.js';
import { t } from './index5.js';
import { configurableValue } from './shared-types.js';
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
import { toDisplayString } from './shared.esm-bundler.js';
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
        ? parseInt(__props.group.days || '10')
        : (__props.group.days ?? 10),
    );
    const daysError = ref(false);
    const exclusions = ref(__props.group.exclusions?.join(', ') ?? '');
    const useBaseInventory = ref(__props.group.useBaseInv ?? true);
    const workforceOnly = ref(__props.group.consumablesOnly ?? false);
    function validate() {
      let isValid = true;
      planetError.value = !planet.value;
      isValid &&= !planetError.value;
      daysError.value = days.value <= 0;
      isValid &&= !daysError.value;
      return isValid;
    }
    function save() {
      __props.group.planet = planet.value;
      __props.group.days = days.value;
      __props.group.exclusions = exclusions.value
        .split(',')
        .map(x => materialsStore.getByTicker(x.trim())?.ticker)
        .filter(x => x !== void 0);
      __props.group.useBaseInv = useBaseInventory.value;
      __props.group.consumablesOnly = workforceOnly.value;
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
                label: unref(t)('act.planet'),
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
              ['label', 'error'],
            ),
            createVNode(
              _sfc_main$1,
              {
                label: unref(t)('act.days'),
                tooltip: 'The number of days of supplies to refill the planet with.',
                error: unref(daysError),
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
                    },
                    null,
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['label', 'error'],
            ),
            createVNode(
              _sfc_main$1,
              {
                label: unref(t)('act.materialExclusions'),
                tooltip:
                  'Materials to be excluded from the group. List material tickers separated by commas.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$3,
                    {
                      modelValue: unref(exclusions),
                      'onUpdate:modelValue':
                        _cache[2] ||
                        (_cache[2] = $event =>
                          isRef(exclusions) ? (exclusions.value = $event) : null),
                    },
                    null,
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['label'],
            ),
            createVNode(
              _sfc_main$1,
              {
                label: unref(t)('act.useBaseInv'),
                tooltip: 'Whether to count the materials currently in the base towards the totals.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      modelValue: unref(useBaseInventory),
                      'onUpdate:modelValue':
                        _cache[3] ||
                        (_cache[3] = $event =>
                          isRef(useBaseInventory) ? (useBaseInventory.value = $event) : null),
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(unref(t)('act.useBaseInv').toLowerCase()),
                          1,
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['label'],
            ),
            createVNode(
              _sfc_main$1,
              {
                label: unref(t)('act.workforceOnly'),
                tooltip:
                  'Whether to limit the materials in the group to workforce consumables only.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      modelValue: unref(workforceOnly),
                      'onUpdate:modelValue':
                        _cache[4] ||
                        (_cache[4] = $event =>
                          isRef(workforceOnly) ? (workforceOnly.value = $event) : null),
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(unref(t)('act.workforceOnly').toLowerCase()),
                          1,
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['label'],
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdC52dWU2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9tYXRlcmlhbC1ncm91cHMvcmVzdXBwbHkvRWRpdC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBBY3RpdmUgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0FjdGl2ZS52dWUnO1xuaW1wb3J0IHsgc2l0ZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zaXRlcyc7XG5pbXBvcnQgeyBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3MgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYWRkcmVzc2VzJztcbmltcG9ydCBTZWxlY3RJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvU2VsZWN0SW5wdXQudnVlJztcbmltcG9ydCBOdW1iZXJJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvTnVtYmVySW5wdXQudnVlJztcbmltcG9ydCB7IGNvbXBhcmVQbGFuZXRzIH0gZnJvbSAnQHNyYy91dGlsJztcbmltcG9ydCBUZXh0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1RleHRJbnB1dC52dWUnO1xuaW1wb3J0IFJhZGlvSXRlbSBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvUmFkaW9JdGVtLnZ1ZSc7XG5pbXBvcnQgeyBtYXRlcmlhbHNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9tYXRlcmlhbHMnO1xuaW1wb3J0IHsgdCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvaTE4bic7XG5pbXBvcnQgeyBjb25maWd1cmFibGVWYWx1ZSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9zaGFyZWQtdHlwZXMnO1xuXG5jb25zdCB7IGdyb3VwIH0gPSBkZWZpbmVQcm9wczx7IGdyb3VwOiBVc2VyRGF0YS5NYXRlcmlhbEdyb3VwRGF0YSB9PigpO1xuXG5jb25zdCBwbGFuZXRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCBwbGFuZXRzID0gKHNpdGVzU3RvcmUuYWxsLnZhbHVlID8/IFtdKVxuICAgIC5tYXAoeCA9PiBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3MoeC5hZGRyZXNzKSlcbiAgICAuZmlsdGVyKHggPT4geCAhPT0gdW5kZWZpbmVkKVxuICAgIC5zb3J0KGNvbXBhcmVQbGFuZXRzKTtcbiAgcGxhbmV0cy51bnNoaWZ0KGNvbmZpZ3VyYWJsZVZhbHVlKTtcbiAgcmV0dXJuIHBsYW5ldHM7XG59KTtcblxuY29uc3QgcGxhbmV0ID0gcmVmKGdyb3VwLnBsYW5ldCA/PyBwbGFuZXRzLnZhbHVlWzBdKTtcbmNvbnN0IHBsYW5ldEVycm9yID0gcmVmKGZhbHNlKTtcblxuY29uc3QgZGF5cyA9IHJlZihcbiAgdHlwZW9mIGdyb3VwLmRheXMgPT09ICdzdHJpbmcnID8gcGFyc2VJbnQoZ3JvdXAuZGF5cyB8fCAnMTAnKSA6IChncm91cC5kYXlzID8/IDEwKSxcbik7XG5jb25zdCBkYXlzRXJyb3IgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBleGNsdXNpb25zID0gcmVmKGdyb3VwLmV4Y2x1c2lvbnM/LmpvaW4oJywgJykgPz8gJycpO1xuXG5jb25zdCB1c2VCYXNlSW52ZW50b3J5ID0gcmVmKGdyb3VwLnVzZUJhc2VJbnYgPz8gdHJ1ZSk7XG5cbmNvbnN0IHdvcmtmb3JjZU9ubHkgPSByZWYoZ3JvdXAuY29uc3VtYWJsZXNPbmx5ID8/IGZhbHNlKTtcblxuZnVuY3Rpb24gdmFsaWRhdGUoKSB7XG4gIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgcGxhbmV0RXJyb3IudmFsdWUgPSAhcGxhbmV0LnZhbHVlO1xuICBpc1ZhbGlkICYmPSAhcGxhbmV0RXJyb3IudmFsdWU7XG4gIGRheXNFcnJvci52YWx1ZSA9IGRheXMudmFsdWUgPD0gMDtcbiAgaXNWYWxpZCAmJj0gIWRheXNFcnJvci52YWx1ZTtcbiAgcmV0dXJuIGlzVmFsaWQ7XG59XG5cbmZ1bmN0aW9uIHNhdmUoKSB7XG4gIGdyb3VwLnBsYW5ldCA9IHBsYW5ldC52YWx1ZTtcbiAgZ3JvdXAuZGF5cyA9IGRheXMudmFsdWU7XG4gIGdyb3VwLmV4Y2x1c2lvbnMgPSBleGNsdXNpb25zLnZhbHVlXG4gICAgLnNwbGl0KCcsJylcbiAgICAubWFwKHggPT4gbWF0ZXJpYWxzU3RvcmUuZ2V0QnlUaWNrZXIoeC50cmltKCkpPy50aWNrZXIpXG4gICAgLmZpbHRlcih4ID0+IHggIT09IHVuZGVmaW5lZCk7XG4gIGdyb3VwLnVzZUJhc2VJbnYgPSB1c2VCYXNlSW52ZW50b3J5LnZhbHVlO1xuICBncm91cC5jb25zdW1hYmxlc09ubHkgPSB3b3JrZm9yY2VPbmx5LnZhbHVlO1xufVxuXG5kZWZpbmVFeHBvc2UoeyB2YWxpZGF0ZSwgc2F2ZSB9KTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxBY3RpdmUgOmxhYmVsPVwidCgnYWN0LnBsYW5ldCcpXCIgOmVycm9yPVwicGxhbmV0RXJyb3JcIj5cbiAgICA8U2VsZWN0SW5wdXQgdi1tb2RlbD1cInBsYW5ldFwiIDpvcHRpb25zPVwicGxhbmV0c1wiIC8+XG4gIDwvQWN0aXZlPlxuICA8QWN0aXZlXG4gICAgOmxhYmVsPVwidCgnYWN0LmRheXMnKVwiXG4gICAgdG9vbHRpcD1cIlRoZSBudW1iZXIgb2YgZGF5cyBvZiBzdXBwbGllcyB0byByZWZpbGwgdGhlIHBsYW5ldCB3aXRoLlwiXG4gICAgOmVycm9yPVwiZGF5c0Vycm9yXCI+XG4gICAgPE51bWJlcklucHV0IHYtbW9kZWw9XCJkYXlzXCIgLz5cbiAgPC9BY3RpdmU+XG4gIDxBY3RpdmVcbiAgICA6bGFiZWw9XCJ0KCdhY3QubWF0ZXJpYWxFeGNsdXNpb25zJylcIlxuICAgIHRvb2x0aXA9XCJNYXRlcmlhbHMgdG8gYmUgZXhjbHVkZWQgZnJvbSB0aGUgZ3JvdXAuIExpc3QgbWF0ZXJpYWwgdGlja2VycyBzZXBhcmF0ZWQgYnkgY29tbWFzLlwiPlxuICAgIDxUZXh0SW5wdXQgdi1tb2RlbD1cImV4Y2x1c2lvbnNcIiAvPlxuICA8L0FjdGl2ZT5cbiAgPEFjdGl2ZVxuICAgIDpsYWJlbD1cInQoJ2FjdC51c2VCYXNlSW52JylcIlxuICAgIHRvb2x0aXA9XCJXaGV0aGVyIHRvIGNvdW50IHRoZSBtYXRlcmlhbHMgY3VycmVudGx5IGluIHRoZSBiYXNlIHRvd2FyZHMgdGhlIHRvdGFscy5cIj5cbiAgICA8UmFkaW9JdGVtIHYtbW9kZWw9XCJ1c2VCYXNlSW52ZW50b3J5XCI+e3sgdCgnYWN0LnVzZUJhc2VJbnYnKS50b0xvd2VyQ2FzZSgpIH19PC9SYWRpb0l0ZW0+XG4gIDwvQWN0aXZlPlxuICA8QWN0aXZlXG4gICAgOmxhYmVsPVwidCgnYWN0Lndvcmtmb3JjZU9ubHknKVwiXG4gICAgdG9vbHRpcD1cIldoZXRoZXIgdG8gbGltaXQgdGhlIG1hdGVyaWFscyBpbiB0aGUgZ3JvdXAgdG8gd29ya2ZvcmNlIGNvbnN1bWFibGVzIG9ubHkuXCI+XG4gICAgPFJhZGlvSXRlbSB2LW1vZGVsPVwid29ya2ZvcmNlT25seVwiPnt7IHQoJ2FjdC53b3JrZm9yY2VPbmx5JykudG9Mb3dlckNhc2UoKSB9fTwvUmFkaW9JdGVtPlxuICA8L0FjdGl2ZT5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX3VucmVmIiwiX2NyZWF0ZVZOb2RlIiwiX2lzUmVmIiwiTnVtYmVySW5wdXQiLCJUZXh0SW5wdXQiLCJSYWRpb0l0ZW0iLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxVQUFBLFVBQUEsU0FBQSxNQUFBO0FBQ0UsWUFBQSxZQUFBLFdBQUEsSUFBQSxTQUFBLElBQUEsSUFBQSxDQUFBLE1BQUEseUJBQUEsRUFBQSxPQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsTUFBQSxNQUFBLE1BQUEsRUFBQSxLQUFBLGNBQUE7QUFJQSxlQUFBLFFB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
