import { t } from './index5.js';
import { useXitParameters } from './use-xit-parameters.js';
import _sfc_main$1 from './Tabs.vue.js';
import GAME from './GAME.vue.js';
import FEAT from './FEAT.vue.js';
import FIN from './FIN.vue4.js';
import BFR from './BFR.vue.js';
import { defineComponent, createBlock, openBlock } from './runtime-core.esm-bundler.js';
import { shallowRef, isRef, unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SET',
  setup(__props) {
    const tabs = [
      {
        id: 'GAME',
        label: t('settings.tabs.gameplay'),
        component: GAME,
      },
      {
        id: 'FEAT',
        label: t('settings.tabs.features'),
        component: FEAT,
      },
      {
        id: 'FIN',
        label: t('settings.tabs.financial'),
        component: FIN,
      },
      {
        id: 'BFR',
        label: t('settings.tabs.buffers'),
        component: BFR,
      },
    ];
    const parameters = useXitParameters();
    const parameter = parameters[0];
    const activeTab = shallowRef(tabs.find(x => x.id === parameter?.toUpperCase()) ?? tabs[0]);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$1,
          {
            modelValue: unref(activeTab),
            'onUpdate:modelValue':
              _cache[0] ||
              (_cache[0] = $event => (isRef(activeTab) ? (activeTab.value = $event) : null)),
            tabs,
          },
          null,
          8,
          ['modelValue'],
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0VULnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9TRVQvU0VULnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgdXNlWGl0UGFyYW1ldGVycyB9IGZyb20gJ0BzcmMvaG9va3MvdXNlLXhpdC1wYXJhbWV0ZXJzJztcbmltcG9ydCBUYWJzLCB7IFRhYiB9IGZyb20gJ0BzcmMvY29tcG9uZW50cy9UYWJzLnZ1ZSc7XG5pbXBvcnQgR0FNRSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9TRVQvR0FNRS52dWUnO1xuaW1wb3J0IEZFQVQgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvU0VUL0ZFQVQudnVlJztcbmltcG9ydCBGSU4gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvU0VUL0ZJTi52dWUnO1xuaW1wb3J0IEJGUiBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9TRVQvQkZSLnZ1ZSc7XG5cbmNvbnN0IHRhYnM6IFRhYltdID0gW1xuICB7XG4gICAgaWQ6ICdHQU1FJyxcbiAgICBsYWJlbDogdCgnc2V0dGluZ3MudGFicy5nYW1lcGxheScpLFxuICAgIGNvbXBvbmVudDogR0FNRSxcbiAgfSxcbiAge1xuICAgIGlkOiAnRkVBVCcsXG4gICAgbGFiZWw6IHQoJ3NldHRpbmdzLnRhYnMuZmVhdHVyZXMnKSxcbiAgICBjb21wb25lbnQ6IEZFQVQsXG4gIH0sXG4gIHtcbiAgICBpZDogJ0ZJTicsXG4gICAgbGFiZWw6IHQoJ3NldHRpbmdzLnRhYnMuZmluYW5jaWFsJyksXG4gICAgY29tcG9uZW50OiBGSU4sXG4gIH0sXG4gIHtcbiAgICBpZDogJ0JGUicsXG4gICAgbGFiZWw6IHQoJ3NldHRpbmdzLnRhYnMuYnVmZmVycycpLFxuICAgIGNvbXBvbmVudDogQkZSLFxuICB9LFxuXTtcblxuY29uc3QgcGFyYW1ldGVycyA9IHVzZVhpdFBhcmFtZXRlcnMoKTtcbmNvbnN0IHBhcmFtZXRlciA9IHBhcmFtZXRlcnNbMF07XG5cbmNvbnN0IGFjdGl2ZVRhYiA9IHNoYWxsb3dSZWYodGFicy5maW5kKHggPT4geC5pZCA9PT0gcGFyYW1ldGVyPy50b1VwcGVyQ2FzZSgpKSA/PyB0YWJzWzBdKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxUYWJzIHYtbW9kZWw9XCJhY3RpdmVUYWJcIiA6dGFicz1cInRhYnNcIiAvPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfdW5yZWYiLCJfaXNSZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLFVBQUEsT0FBQTtBQUFBLE1BQW9CO0FBQUEsUUFDbEIsSUFBQTtBQUFBLFFBQ00sT0FBQSxFQUFBLHdCQUFBO0FBQUEsUUFDNkIsV0FBQTtBQUFBLE1BQ3RCO0FBQUEsTUFDYjtBQUFBLFFBQ0EsSUFBQTtBQUFBLFFBQ00sT0FBQSxFQUFBLHdCQUFBO0FBQUEsUUFDNkIsV0FBQTtBQUFBLE1BQ3RCO0FBQUEsTUFDYjtBQUFBLFFBQ0EsSUFBQTtBQUFBLFFBQ00sT0FBQSxFQUFBLHlCQUFBO0FBQUEsUUFDOEIsV0FBQTtBQUFBLE1BQ3ZCO0FBQUEsTUFDYjtBQUFBLFFBQ0EsSUFBQTtBQUFBLFFBQ00sT0FBQSxFQUFBLHVCQUFBO0FBQUEsUUFDNEIsV0FBQTtBQUFBLE1BQ3JCO0FBQUEsSUFDYjtBQUdGLFVBQUEsYUFBQSxpQkFBQTtBQUNBLFVBQUEsWUFBQSxXQUFBLENBQUE7QUFFQSxVQUFBLFlBQUEsV0FBQSxLQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsT0FBQSxXQUFBLFlBQUEsQ0FBQSxLQUFBLEtBQUEsQ0FBQSxDQUFBOzs7UUFJMkMsWUFBQUEsTUFBQSxTQUFBO0FBQUEsUUFBMUIsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBQyxNQUFBLFNBQUEsSUFBQSxVQUFBLFFBQUEsU0FBQTtBQUFBLFFBQVM7QUFBQSxNQUFHLEdBQUEsTUFBQSxHQUFBLENBQUEsWUFBQSxDQUFBO0FBQUE7OzsifQ==
