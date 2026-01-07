import _sfc_main$1 from './ContractLink.vue2.js';
import { timestampEachSecond } from './dayjs.js';
import dayjs from './dayjs.min.js';
import _sfc_main$2 from './ConditionText.vue.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ConditionRow',
  props: {
    condition: {},
    contract: {},
    deadline: {},
  },
  setup(__props) {
    const eta = computed(() => {
      if (!isFinite(__props.deadline)) {
        return '∞';
      }
      if (__props.deadline <= timestampEachSecond.value) {
        return '-';
      }
      let duration = dayjs.duration({ milliseconds: __props.deadline - timestampEachSecond.value });
      const days = Math.floor(duration.asDays());
      duration = duration.subtract(days, 'days');
      const hours = Math.floor(duration.asHours());
      if (days > 0) {
        return `${days}d ${hours}h`;
      }
      duration = duration.subtract(hours, 'hours');
      const minutes = Math.floor(duration.asMinutes());
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      duration = duration.subtract(minutes, 'minutes');
      const seconds = Math.floor(duration.asSeconds());
      if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
      }
      return `${seconds}s`;
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('tr', null, [
          createBaseVNode('td', null, [
            createVNode(_sfc_main$1, { contract: _ctx.contract }, null, 8, ['contract']),
          ]),
          createBaseVNode('td', null, toDisplayString(unref(eta)), 1),
          createBaseVNode('td', null, [
            createVNode(_sfc_main$2, { condition: _ctx.condition }, null, 8, ['condition']),
          ]),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZGl0aW9uUm93LnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9DT05UQy9Db25kaXRpb25Sb3cudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgQ29udHJhY3RMaW5rIGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0NPTlRDL0NvbnRyYWN0TGluay52dWUnO1xuaW1wb3J0IHsgdGltZXN0YW1wRWFjaFNlY29uZCB9IGZyb20gJ0BzcmMvdXRpbHMvZGF5anMnO1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcbmltcG9ydCBDb25kaXRpb25UZXh0IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0NPTlRDL0NvbmRpdGlvblRleHQudnVlJztcblxuY29uc3QgeyBkZWFkbGluZSB9ID0gZGVmaW5lUHJvcHM8e1xuICBjb25kaXRpb246IFBydW5BcGkuQ29udHJhY3RDb25kaXRpb247XG4gIGNvbnRyYWN0OiBQcnVuQXBpLkNvbnRyYWN0O1xuICBkZWFkbGluZTogbnVtYmVyO1xufT4oKTtcblxuY29uc3QgZXRhID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoIWlzRmluaXRlKGRlYWRsaW5lKSkge1xuICAgIHJldHVybiAn4oieJztcbiAgfVxuICBpZiAoZGVhZGxpbmUgPD0gdGltZXN0YW1wRWFjaFNlY29uZC52YWx1ZSkge1xuICAgIHJldHVybiAnLSc7XG4gIH1cbiAgbGV0IGR1cmF0aW9uID0gZGF5anMuZHVyYXRpb24oeyBtaWxsaXNlY29uZHM6IGRlYWRsaW5lIC0gdGltZXN0YW1wRWFjaFNlY29uZC52YWx1ZSB9KTtcbiAgY29uc3QgZGF5cyA9IE1hdGguZmxvb3IoZHVyYXRpb24uYXNEYXlzKCkpO1xuICBkdXJhdGlvbiA9IGR1cmF0aW9uLnN1YnRyYWN0KGRheXMsICdkYXlzJyk7XG4gIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihkdXJhdGlvbi5hc0hvdXJzKCkpO1xuICBpZiAoZGF5cyA+IDApIHtcbiAgICByZXR1cm4gYCR7ZGF5c31kICR7aG91cnN9aGA7XG4gIH1cbiAgZHVyYXRpb24gPSBkdXJhdGlvbi5zdWJ0cmFjdChob3VycywgJ2hvdXJzJyk7XG4gIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKGR1cmF0aW9uLmFzTWludXRlcygpKTtcbiAgaWYgKGhvdXJzID4gMCkge1xuICAgIHJldHVybiBgJHtob3Vyc31oICR7bWludXRlc31tYDtcbiAgfVxuICBkdXJhdGlvbiA9IGR1cmF0aW9uLnN1YnRyYWN0KG1pbnV0ZXMsICdtaW51dGVzJyk7XG4gIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKGR1cmF0aW9uLmFzU2Vjb25kcygpKTtcbiAgaWYgKG1pbnV0ZXMgPiAwKSB7XG4gICAgcmV0dXJuIGAke21pbnV0ZXN9bSAke3NlY29uZHN9c2A7XG4gIH1cbiAgcmV0dXJuIGAke3NlY29uZHN9c2A7XG59KTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx0cj5cbiAgICA8dGQ+XG4gICAgICA8Q29udHJhY3RMaW5rIDpjb250cmFjdD1cImNvbnRyYWN0XCIgLz5cbiAgICA8L3RkPlxuICAgIDx0ZD5cbiAgICAgIHt7IGV0YSB9fVxuICAgIDwvdGQ+XG4gICAgPHRkPlxuICAgICAgPENvbmRpdGlvblRleHQgOmNvbmRpdGlvbj1cImNvbmRpdGlvblwiIC8+XG4gICAgPC90ZD5cbiAgPC90cj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIkNvbnRyYWN0TGluayIsIkNvbmRpdGlvblRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQVlBLFVBQUEsTUFBQSxTQUFBLE1BQUE7QUFDRSxVQUFBLENBQUEsU0FBQSxRQUFBLFFBQUEsR0FBQTtBQUNFLGVBQUE7QUFBQSxNQUFPO0FBRVQsVUFBQSxRQUFBLFlBQUEsb0JBQUEsT0FBQTtBQUNFLGVBQUE7QUFBQSxNQUFPO0FBRVQsVUFBQSxXQUFBLE1BQUEsU0FBQSxFQUFBLGNBQUEsUUFBQSxXQUFBLG9CQUFBLE9BQUE7QUFDQSxZQUFBLE9BQUEsS0FBQSxNQUFBLFNBQUEsT0FBQSxDQUFBO0FBQ0EsaUJBQUEsU0FBQSxTQUFBLE1BQUEsTUFBQTtBQUNBLFlBQUEsUUFBQSxLQUFBLE1BQUEsU0FBQSxRQUFBLENBQUE7QUFDQSxVQUFBLE9BQUEsR0FBQTtBQUNFLGVBQUEsR0FBQSxJQUFBLEtBQUEsS0FBQTtBQUFBLE1BQXdCO0FBRTFCLGlCQUFBLFNBQUEsU0FBQSxPQUFBLE9BQUE7QUFDQSxZQUFBLFVBQUEsS0FBQSxNQUFBLFNBQUEsVUFBQSxDQUFBO0FBQ0EsVUFBQSxRQUFBLEdBQUE7QUFDRSxlQUFBLEdBQUEsS0FBQSxLQUFBLE9BQUE7QUFBQSxNQUEyQjtBQUU3QixpQkFBQSxTQUFBLFNBQUEsU0FBQSxTQUFBO0FBQ0EsWUFBQSxVQUFBLEtBQUEsTUFBQSxTQUFBLFVBQUEsQ0FBQTtBQUNBLFVBQUEsVUFBQSxHQUFBO0FBQ0UsZUFBQSxHQUFBLE9BQUEsS0FBQSxPQUFBO0FBQUEsTUFBNkI7QUFFL0IsYUFBQSxHQUFBLE9BQUE7QUFBQSxJQUFpQixDQUFBOzs7UUFlWkEsZ0JBQUEsTUFBQSxNQUFBO0FBQUEsVUFQRUMsWUFBQUMsYUFBQSxFQUFBLFVBQUEsS0FBQSxTQUFBLEdBQUEsTUFBQSxHQUFBLENBQUEsVUFBQSxDQUFBO0FBQUEsUUFEOEIsQ0FBQTtBQUFBO1FBRzNCRixnQkFBQSxNQUFBLE1BQUE7QUFBQSxVQUlIQyxZQUFBRSxhQUFBLEVBQUEsV0FBQSxLQUFBLFVBQUEsR0FBQSxNQUFBLEdBQUEsQ0FBQSxXQUFBLENBQUE7QUFBQSxRQURpQyxDQUFBO0FBQUE7Ozs7In0=
