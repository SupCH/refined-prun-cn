import _sfc_main$1 from './ContractLink.vue.js';
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
