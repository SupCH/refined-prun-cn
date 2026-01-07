import { isSelfCondition } from './utils5.js';
import ShipmentIcon from './ShipmentIcon.vue.js';
import MaterialIcon from './MaterialIcon.vue.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createCommentVNode,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = {
  key: 0,
  style: { marginBottom: '4px' },
};
const _hoisted_2 = {
  key: 1,
  style: { marginBottom: '4px' },
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'MaterialList',
  props: {
    contract: {},
  },
  setup(__props) {
    const icons = computed(() => {
      const result = [];
      for (const condition of __props.contract.conditions) {
        switch (condition.type) {
          case 'DELIVERY_SHIPMENT': {
            if (isSelfCondition(__props.contract, condition)) {
              result.push({ type: 'SHIPMENT', shipmentId: condition.shipmentItemId });
              continue;
            }
            break;
          }
          case 'PROVISION':
          case 'PICKUP_SHIPMENT': {
            continue;
          }
        }
        const quantity = condition.quantity;
        if (!quantity?.material) {
          continue;
        }
        const amount = quantity.amount;
        const ticker = quantity.material.ticker;
        result.push({ type: 'MATERIAL', ticker, amount });
      }
      return result;
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          (openBlock(true),
          createElementBlock(
            Fragment,
            null,
            renderList(unref(icons), icon => {
              return (
                openBlock(),
                createElementBlock(
                  Fragment,
                  {
                    key: unref(objectId)(icon),
                  },
                  [
                    icon.type === 'SHIPMENT'
                      ? (openBlock(),
                        createElementBlock('div', _hoisted_1, [
                          createVNode(
                            ShipmentIcon,
                            {
                              size: 'medium',
                              'shipment-id': icon.shipmentId,
                            },
                            null,
                            8,
                            ['shipment-id'],
                          ),
                        ]))
                      : createCommentVNode('', true),
                    icon.type === 'MATERIAL'
                      ? (openBlock(),
                        createElementBlock('div', _hoisted_2, [
                          createVNode(
                            MaterialIcon,
                            {
                              size: 'medium',
                              ticker: icon.ticker,
                              amount: icon.amount,
                            },
                            null,
                            8,
                            ['ticker', 'amount'],
                          ),
                        ]))
                      : createCommentVNode('', true),
                  ],
                  64,
                )
              );
            }),
            128,
          )),
        ])
      );
    };
  },
});
export { _sfc_main as default };
