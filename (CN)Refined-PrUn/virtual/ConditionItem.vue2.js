import { useCssModule } from './runtime-dom.esm-bundler.js';
import fa from './font-awesome.module.css.js';
import { friendlyConditionText } from './utils5.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ConditionItem',
  props: {
    condition: {},
    contract: {},
  },
  setup(__props) {
    const $style = useCssModule();
    const iconClass = computed(() => {
      switch (__props.condition.status) {
        case 'PENDING': {
          for (const dependency of __props.condition.dependencies) {
            const match = __props.contract.conditions.find(x => x.id === dependency);
            if (!match || match.status !== 'FULFILLED') {
              return $style.unavailable;
            }
          }
          return $style.pending;
        }
        case 'IN_PROGRESS':
        case 'PARTLY_FULFILLED':
          return $style.pending;
        case 'FULFILLMENT_ATTEMPTED':
        case 'VIOLATED':
          return $style.failed;
        case 'FULFILLED':
          return $style.fulfilled;
      }
    });
    const icon = computed(() => (__props.condition.status === 'FULFILLED' ? '' : ''));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          createBaseVNode(
            'span',
            {
              class: normalizeClass(unref(iconClass)),
            },
            [
              createBaseVNode(
                'span',
                {
                  class: normalizeClass([unref(fa).solid]),
                },
                toDisplayString(unref(icon)),
                3,
              ),
              createTextVNode(
                ' ' + toDisplayString(unref(friendlyConditionText)(_ctx.condition.type)),
                1,
              ),
            ],
            2,
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
