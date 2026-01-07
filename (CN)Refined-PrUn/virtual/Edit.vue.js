import _sfc_main$1 from './Active.vue.js';
import _sfc_main$3 from './Commands.vue.js';
import _sfc_main$2 from './PrunButton.vue.js';
import SelectInput from './SelectInput.vue.js';
import _sfc_main$4 from './RadioItem.vue.js';
import { showTileOverlay } from './tile-overlay.js';
import _sfc_main$5 from './EditPriceLimits.vue.js';
import { materialsStore } from './materials.js';
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
import { ref, unref, isRef, reactive } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Edit',
  props: {
    action: {},
    pkg: {},
  },
  setup(__props, { expose: __expose }) {
    const materialGroups = computed(() => __props.pkg.groups.map(x => x.name).filter(x => x));
    const materialGroup = ref(__props.action.group ?? materialGroups.value[0]);
    const exchanges = ['AI1', 'CI1', 'IC1', 'NC1', 'CI2', 'NC2'];
    const exchange = ref(__props.action.exchange ?? exchanges[0]);
    const priceLimits = ref(getPriceLimits());
    function getPriceLimits() {
      const priceLimits2 = __props.action.priceLimits ?? {};
      return Object.keys(priceLimits2).map(x => [x, priceLimits2[x]]);
    }
    const buyPartial = ref(__props.action.buyPartial ?? false);
    const allowUnfilled = ref(__props.action.allowUnfilled ?? false);
    const useCXInv = ref(__props.action.useCXInv ?? true);
    function onEditPriceLimitsClick(e) {
      showTileOverlay(e, _sfc_main$5, reactive({ priceLimits }));
    }
    function validate() {
      return true;
    }
    function save() {
      __props.action.group = materialGroup.value;
      __props.action.exchange = exchange.value;
      __props.action.priceLimits = {};
      for (let [ticker, price] of priceLimits.value) {
        const material = materialsStore.getByTicker(ticker);
        if (!material || price === 0 || !isFinite(price)) {
          continue;
        }
        __props.action.priceLimits[material.ticker] = price;
      }
      __props.action.buyPartial = buyPartial.value;
      __props.action.allowUnfilled = allowUnfilled.value;
      __props.action.useCXInv = useCXInv.value;
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
              { label: 'Material Group' },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(materialGroup),
                      'onUpdate:modelValue':
                        _cache[0] ||
                        (_cache[0] = $event =>
                          isRef(materialGroup) ? (materialGroup.value = $event) : null),
                      options: unref(materialGroups),
                    },
                    null,
                    8,
                    ['modelValue', 'options'],
                  ),
                ]),
                _: 1,
              },
            ),
            createVNode(
              _sfc_main$1,
              { label: 'Exchange' },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(exchange),
                      'onUpdate:modelValue':
                        _cache[1] ||
                        (_cache[1] = $event =>
                          isRef(exchange) ? (exchange.value = $event) : null),
                      options: exchanges,
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
              _sfc_main$3,
              { label: 'Price Limits' },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$2,
                    {
                      primary: '',
                      onClick: onEditPriceLimitsClick,
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[5] || (_cache[5] = [createTextVNode('EDIT', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              },
            ),
            createVNode(
              _sfc_main$1,
              {
                label: 'Buy Partial',
                tooltip: 'Whether the action will be taken if there is not enough stock on the CX.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      modelValue: unref(buyPartial),
                      'onUpdate:modelValue':
                        _cache[2] ||
                        (_cache[2] = $event =>
                          isRef(buyPartial) ? (buyPartial.value = $event) : null),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[6] || (_cache[6] = [createTextVNode('buy partial', -1)])),
                      ]),
                      _: 1,
                    },
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
                label: 'Allow Unfilled',
                tooltip: 'Create a full bid order even if there is not enough stock on the CX.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      modelValue: unref(allowUnfilled),
                      'onUpdate:modelValue':
                        _cache[3] ||
                        (_cache[3] = $event =>
                          isRef(allowUnfilled) ? (allowUnfilled.value = $event) : null),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[7] || (_cache[7] = [createTextVNode('allow unfilled', -1)])),
                      ]),
                      _: 1,
                    },
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
                label: 'Use CX Inventory',
                tooltip:
                  'Whether to use stock in the CX warehouse when calculating how much needs to be bought.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      modelValue: unref(useCXInv),
                      'onUpdate:modelValue':
                        _cache[4] ||
                        (_cache[4] = $event =>
                          isRef(useCXInv) ? (useCXInv.value = $event) : null),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[8] || (_cache[8] = [createTextVNode('use cx inventory', -1)])),
                      ]),
                      _: 1,
                    },
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
