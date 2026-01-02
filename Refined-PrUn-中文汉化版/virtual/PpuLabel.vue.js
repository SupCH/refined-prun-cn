import { fixed0 } from './format.js';
import { getMaterialByName } from './i18n.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  Fragment,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'PpuLabel',
  props: {
    amountInput: {},
    materialName: {},
    totalPriceInput: {},
  },
  setup(__props) {
    const material = computed(() => getMaterialByName(__props.materialName));
    const unit = computed(() => {
      if (!material.value) {
        return void 0;
      }
      const weight = material.value.weight;
      const volume = material.value.volume;
      return weight >= volume ? { symbol: 't', size: weight } : { symbol: 'm³', size: volume };
    });
    const amount = computed(() => {
      const amount2 = parseInt(__props.amountInput, 10);
      return isFinite(amount2) ? amount2 : void 0;
    });
    const totalSize = computed(() => {
      if (unit.value && amount.value !== void 0) {
        return fixed0(amount.value * unit.value.size);
      }
      return `-- `;
    });
    const totalPrice = computed(() => {
      const totalPrice2 = parseInt(__props.totalPriceInput, 10);
      return isFinite(totalPrice2) ? totalPrice2 : void 0;
    });
    const perUnit = computed(() => {
      if (unit.value && amount.value !== void 0 && totalPrice.value !== void 0) {
        return fixed0(totalPrice.value / (amount.value * unit.value.size));
      }
      return '--';
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('span', null, [
          unref(material)
            ? (openBlock(),
              createElementBlock(
                Fragment,
                { key: 0 },
                [
                  createTextVNode(
                    toDisplayString(unref(totalSize)) +
                      ' ' +
                      toDisplayString(unref(unit)?.symbol) +
                      ' | ' +
                      toDisplayString(unref(perUnit)) +
                      '/' +
                      toDisplayString(unref(unit)?.symbol),
                    1,
                  ),
                ],
                64,
              ))
            : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode('--')], 64)),
        ])
      );
    };
  },
});
export { _sfc_main as default };
