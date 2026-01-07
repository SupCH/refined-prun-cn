import { isSelfCondition } from './utils4.js';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0ZXJpYWxMaXN0LnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQ09OVFMvTWF0ZXJpYWxMaXN0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgaXNTZWxmQ29uZGl0aW9uIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQ09OVFMvdXRpbHMnO1xuaW1wb3J0IFNoaXBtZW50SWNvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvU2hpcG1lbnRJY29uLnZ1ZSc7XG5pbXBvcnQgTWF0ZXJpYWxJY29uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9NYXRlcmlhbEljb24udnVlJztcbmltcG9ydCB7IG9iamVjdElkIH0gZnJvbSAnQHNyYy91dGlscy9vYmplY3QtaWQnO1xuXG5jb25zdCB7IGNvbnRyYWN0IH0gPSBkZWZpbmVQcm9wczx7IGNvbnRyYWN0OiBQcnVuQXBpLkNvbnRyYWN0IH0+KCk7XG5cbmludGVyZmFjZSBTaGlwbWVudEljb25Qcm9wcyB7XG4gIHR5cGU6ICdTSElQTUVOVCc7XG4gIHNoaXBtZW50SWQ6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIE1hdGVyaWFsSWNvblByb3BzIHtcbiAgdHlwZTogJ01BVEVSSUFMJztcbiAgdGlja2VyOiBzdHJpbmc7XG4gIGFtb3VudDogbnVtYmVyO1xufVxuXG5jb25zdCBpY29ucyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmVzdWx0OiAoU2hpcG1lbnRJY29uUHJvcHMgfCBNYXRlcmlhbEljb25Qcm9wcylbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGNvbmRpdGlvbiBvZiBjb250cmFjdC5jb25kaXRpb25zKSB7XG4gICAgc3dpdGNoIChjb25kaXRpb24udHlwZSkge1xuICAgICAgY2FzZSAnREVMSVZFUllfU0hJUE1FTlQnOiB7XG4gICAgICAgIGlmIChpc1NlbGZDb25kaXRpb24oY29udHJhY3QsIGNvbmRpdGlvbikpIHtcbiAgICAgICAgICByZXN1bHQucHVzaCh7IHR5cGU6ICdTSElQTUVOVCcsIHNoaXBtZW50SWQ6IGNvbmRpdGlvbi5zaGlwbWVudEl0ZW1JZCEgfSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdQUk9WSVNJT04nOlxuICAgICAgY2FzZSAnUElDS1VQX1NISVBNRU5UJzoge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBxdWFudGl0eSA9IGNvbmRpdGlvbi5xdWFudGl0eTtcbiAgICBpZiAoIXF1YW50aXR5Py5tYXRlcmlhbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgYW1vdW50ID0gcXVhbnRpdHkuYW1vdW50O1xuICAgIGNvbnN0IHRpY2tlciA9IHF1YW50aXR5Lm1hdGVyaWFsLnRpY2tlcjtcbiAgICByZXN1bHQucHVzaCh7IHR5cGU6ICdNQVRFUklBTCcsIHRpY2tlcjogdGlja2VyLCBhbW91bnQ6IGFtb3VudCB9KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDx0ZW1wbGF0ZSB2LWZvcj1cImljb24gaW4gaWNvbnNcIiA6a2V5PVwib2JqZWN0SWQoaWNvbilcIj5cbiAgICAgIDxkaXYgdi1pZj1cImljb24udHlwZSA9PT0gJ1NISVBNRU5UJ1wiIDpzdHlsZT1cInsgbWFyZ2luQm90dG9tOiAnNHB4JyB9XCI+XG4gICAgICAgIDxTaGlwbWVudEljb24gc2l6ZT1cIm1lZGl1bVwiIDpzaGlwbWVudC1pZD1cImljb24uc2hpcG1lbnRJZFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgdi1pZj1cImljb24udHlwZSA9PT0gJ01BVEVSSUFMJ1wiIDpzdHlsZT1cInsgbWFyZ2luQm90dG9tOiAnNHB4JyB9XCI+XG4gICAgICAgIDxNYXRlcmlhbEljb24gc2l6ZT1cIm1lZGl1bVwiIDp0aWNrZXI9XCJpY29uLnRpY2tlclwiIDphbW91bnQ9XCJpY29uLmFtb3VudFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3RlbXBsYXRlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+PC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX3VucmVmIiwiX2NyZWF0ZVZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxVQUFBLFFBQUEsU0FBQSxNQUFBO0FBQ0UsWUFBQSxTQUFBLENBQUE7QUFDQSxpQkFBQSxhQUFBLFFBQUEsU0FBQSxZQUFBO0FBQ0UsZ0JBQUEsVUFBQSxNQUFBO0FBQUEsVUFBd0IsS0FBQSxxQkFBQTtBQUVwQixnQkFBQSxnQkFBQSxRQUFBLFVBQUEsU0FBQSxHQUFBO0FBQ0UscUJBQUEsS0FBQSxFQUFBLE1BQUEsWUFBQSxZQUFBLFVBQUEsZ0JBQUE7QUFDQTtBQUFBLFlBQUE7QUFFRjtBQUFBLFVBQUE7QUFBQSxVQUNGLEtBQUE7QUFBQSxVQUNLLEtBQUEsbUJBQUE7QUFFSDtBQUFBLFVBQUE7QUFBQSxRQUNGO0FBR0YsY0FBQSxXQUFBLFVBQUE7QUFDQSxZQUFBLENBQUEsVUFBQSxVQUFBO0FBQ0U7QUFBQSxRQUFBO0FBR0YsY0FBQSxTQUFBLFNBQUE7QUFDQSxjQUFBLFNBQUEsU0FBQSxTQUFBO0FBQ0EsZUFBQSxLQUFBLEVBQUEsTUFBQSxZQUFBLFFBQUEsUUFBQTtBQUFBLE1BQWdFO0FBRWxFLGFBQUE7QUFBQSxJQUFPLENBQUE7OztTQWNEQSxVQUFBLElBQUEsR0FBQUMsbUJBQUFDLFVBQUEsTUFBQUMsV0FBQUMsTUFBQSxLQUFBLEdBQUEsQ0FBQSxTQUFBOzs7VUFSK0MsR0FBQTtBQUFBO2NBRzNDQyxZQUFBLGNBQUE7QUFBQSxnQkFEeUQsTUFBQTtBQUFBLGdCQUExQyxlQUFBLEtBQUE7QUFBQSxjQUE0QixHQUFBLE1BQUEsR0FBQSxDQUFBLGFBQUEsQ0FBQTtBQUFBOztjQUkzQ0EsWUFBQSxjQUFBO0FBQUEsZ0JBRHNFLE1BQUE7QUFBQSxnQkFBdkQsUUFBQSxLQUFBO0FBQUEsZ0JBQXVCLFFBQUEsS0FBQTtBQUFBLGNBQXNCLEdBQUEsTUFBQSxHQUFBLENBQUEsVUFBQSxRQUFBLENBQUE7QUFBQTs7Ozs7OzsifQ==
