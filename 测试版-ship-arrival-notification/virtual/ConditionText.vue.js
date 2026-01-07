import { fixed02 } from './format.js';
import _sfc_main$1 from './AddressLink.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  Fragment,
  createTextVNode,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ConditionText',
  props: {
    condition: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return _ctx.condition.type === 'PAYMENT'
        ? (openBlock(),
          createElementBlock(
            Fragment,
            { key: 0 },
            [
              createTextVNode(
                ' Pay ' +
                  toDisplayString(unref(fixed02)(_ctx.condition.amount.amount)) +
                  ' ' +
                  toDisplayString(_ctx.condition.amount.currency),
                1,
              ),
            ],
            64,
          ))
        : _ctx.condition.type === 'LOAN_PAYOUT'
          ? (openBlock(),
            createElementBlock(
              Fragment,
              { key: 1 },
              [
                createTextVNode(
                  ' Pay ' +
                    toDisplayString(unref(fixed02)(_ctx.condition.amount.amount)) +
                    ' ' +
                    toDisplayString(_ctx.condition.amount.currency),
                  1,
                ),
              ],
              64,
            ))
          : _ctx.condition.type === 'LOAN_INSTALLMENT'
            ? (openBlock(),
              createElementBlock(
                Fragment,
                { key: 2 },
                [
                  createTextVNode(
                    ' Pay ' +
                      toDisplayString(
                        unref(fixed02)(
                          _ctx.condition.repayment.amount + _ctx.condition.interest.amount,
                        ),
                      ) +
                      ' ' +
                      toDisplayString(_ctx.condition.repayment.currency) +
                      ' (auto) ',
                    1,
                  ),
                ],
                64,
              ))
            : _ctx.condition.type === 'DELIVERY_SHIPMENT'
              ? (openBlock(),
                createElementBlock(
                  Fragment,
                  { key: 3 },
                  [
                    _cache[0] || (_cache[0] = createTextVNode(' Deliver SHPT @ ', -1)),
                    createVNode(
                      _sfc_main$1,
                      {
                        address: _ctx.condition.destination,
                      },
                      null,
                      8,
                      ['address'],
                    ),
                  ],
                  64,
                ))
              : _ctx.condition.type === 'DELIVERY'
                ? (openBlock(),
                  createElementBlock(
                    Fragment,
                    { key: 4 },
                    [
                      createTextVNode(
                        ' Deliver ' +
                          toDisplayString(_ctx.condition.quantity.amount) +
                          ' ' +
                          toDisplayString(_ctx.condition.quantity.material.ticker) +
                          ' @ ',
                        1,
                      ),
                      createVNode(
                        _sfc_main$1,
                        {
                          address: _ctx.condition.address,
                        },
                        null,
                        8,
                        ['address'],
                      ),
                    ],
                    64,
                  ))
                : _ctx.condition.type === 'PICKUP_SHIPMENT'
                  ? (openBlock(),
                    createElementBlock(
                      Fragment,
                      { key: 5 },
                      [
                        _cache[1] || (_cache[1] = createTextVNode(' Pick up SHPT @ ', -1)),
                        createVNode(
                          _sfc_main$1,
                          {
                            address: _ctx.condition.address,
                          },
                          null,
                          8,
                          ['address'],
                        ),
                      ],
                      64,
                    ))
                  : _ctx.condition.type === 'PROVISION_SHIPMENT'
                    ? (openBlock(),
                      createElementBlock(
                        Fragment,
                        { key: 6 },
                        [
                          createTextVNode(
                            ' Provision ' +
                              toDisplayString(_ctx.condition.quantity.amount) +
                              ' ' +
                              toDisplayString(_ctx.condition.quantity.material.ticker) +
                              ' @ ',
                            1,
                          ),
                          createVNode(
                            _sfc_main$1,
                            {
                              address: _ctx.condition.address,
                            },
                            null,
                            8,
                            ['address'],
                          ),
                        ],
                        64,
                      ))
                    : _ctx.condition.type === 'PROVISION'
                      ? (openBlock(),
                        createElementBlock(
                          Fragment,
                          { key: 7 },
                          [
                            createTextVNode(
                              ' Provision ' +
                                toDisplayString(_ctx.condition.quantity.amount) +
                                ' ' +
                                toDisplayString(_ctx.condition.quantity.material.ticker) +
                                ' @ ',
                              1,
                            ),
                            createVNode(
                              _sfc_main$1,
                              {
                                address: _ctx.condition.address,
                              },
                              null,
                              8,
                              ['address'],
                            ),
                          ],
                          64,
                        ))
                      : _ctx.condition.type === 'EXPLORATION'
                        ? (openBlock(),
                          createElementBlock(
                            Fragment,
                            { key: 8 },
                            [
                              _cache[2] || (_cache[2] = createTextVNode(' Explore ', -1)),
                              createVNode(
                                _sfc_main$1,
                                {
                                  address: _ctx.condition.address,
                                },
                                null,
                                8,
                                ['address'],
                              ),
                            ],
                            64,
                          ))
                        : _ctx.condition.type === 'COMEX_PURCHASE_PICKUP'
                          ? (openBlock(),
                            createElementBlock(
                              Fragment,
                              { key: 9 },
                              [
                                createTextVNode(
                                  ' Pick up ' +
                                    toDisplayString(
                                      _ctx.condition.quantity.amount -
                                        _ctx.condition.pickedUp.amount,
                                    ) +
                                    ' ' +
                                    toDisplayString(_ctx.condition.quantity.material.ticker) +
                                    ' @ ',
                                  1,
                                ),
                                createVNode(
                                  _sfc_main$1,
                                  {
                                    address: _ctx.condition.address,
                                  },
                                  null,
                                  8,
                                  ['address'],
                                ),
                              ],
                              64,
                            ))
                          : _ctx.condition.type === 'HEADQUARTERS_UPGRADE'
                            ? (openBlock(),
                              createElementBlock(
                                Fragment,
                                { key: 10 },
                                [createTextVNode('Upgrade HQ')],
                                64,
                              ))
                            : _ctx.condition.type === 'BASE_CONSTRUCTION'
                              ? (openBlock(),
                                createElementBlock(
                                  Fragment,
                                  { key: 11 },
                                  [createTextVNode('Construct Base')],
                                  64,
                                ))
                              : _ctx.condition.type === 'FINISH_FLIGHT'
                                ? (openBlock(),
                                  createElementBlock(
                                    Fragment,
                                    { key: 12 },
                                    [createTextVNode('Finish Flight')],
                                    64,
                                  ))
                                : _ctx.condition.type === 'PLACE_ORDER'
                                  ? (openBlock(),
                                    createElementBlock(
                                      Fragment,
                                      { key: 13 },
                                      [createTextVNode('Place Order')],
                                      64,
                                    ))
                                  : _ctx.condition.type === 'PRODUCTION_ORDER_COMPLETED'
                                    ? (openBlock(),
                                      createElementBlock(
                                        Fragment,
                                        { key: 14 },
                                        [createTextVNode(' Complete Production Order ')],
                                        64,
                                      ))
                                    : _ctx.condition.type === 'PRODUCTION_RUN'
                                      ? (openBlock(),
                                        createElementBlock(
                                          Fragment,
                                          { key: 15 },
                                          [createTextVNode('Run Production')],
                                          64,
                                        ))
                                      : _ctx.condition.type === 'START_FLIGHT'
                                        ? (openBlock(),
                                          createElementBlock(
                                            Fragment,
                                            { key: 16 },
                                            [createTextVNode('Start Flight')],
                                            64,
                                          ))
                                        : _ctx.condition.type === 'POWER'
                                          ? (openBlock(),
                                            createElementBlock(
                                              Fragment,
                                              { key: 17 },
                                              [createTextVNode('Become Governor')],
                                              64,
                                            ))
                                          : _ctx.condition.type === 'REPAIR_SHIP'
                                            ? (openBlock(),
                                              createElementBlock(
                                                Fragment,
                                                { key: 18 },
                                                [createTextVNode('Repair Ship')],
                                                64,
                                              ))
                                            : _ctx.condition.type === 'CONTRIBUTION'
                                              ? (openBlock(),
                                                createElementBlock(
                                                  Fragment,
                                                  { key: 19 },
                                                  [createTextVNode('Contribution')],
                                                  64,
                                                ))
                                              : (openBlock(),
                                                createElementBlock(
                                                  Fragment,
                                                  { key: 20 },
                                                  [
                                                    createTextVNode(
                                                      toDisplayString(_ctx.condition.type),
                                                      1,
                                                    ),
                                                  ],
                                                  64,
                                                ));
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZGl0aW9uVGV4dC52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQ09OVEMvQ29uZGl0aW9uVGV4dC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IGZpeGVkMDIgfSBmcm9tICdAc3JjL3V0aWxzL2Zvcm1hdCc7XG5pbXBvcnQgQWRkcmVzc0xpbmsgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQ09OVEMvQWRkcmVzc0xpbmsudnVlJztcblxuZGVmaW5lUHJvcHM8eyBjb25kaXRpb246IFBydW5BcGkuQ29udHJhY3RDb25kaXRpb24gfT4oKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx0ZW1wbGF0ZSB2LWlmPVwiY29uZGl0aW9uLnR5cGUgPT09ICdQQVlNRU5UJ1wiPlxuICAgIFBheSB7eyBmaXhlZDAyKGNvbmRpdGlvbi5hbW91bnQhLmFtb3VudCkgfX0ge3sgY29uZGl0aW9uLmFtb3VudCEuY3VycmVuY3kgfX1cbiAgPC90ZW1wbGF0ZT5cbiAgPHRlbXBsYXRlIHYtZWxzZS1pZj1cImNvbmRpdGlvbi50eXBlID09PSAnTE9BTl9QQVlPVVQnXCI+XG4gICAgUGF5IHt7IGZpeGVkMDIoY29uZGl0aW9uLmFtb3VudCEuYW1vdW50KSB9fSB7eyBjb25kaXRpb24uYW1vdW50IS5jdXJyZW5jeSB9fVxuICA8L3RlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiY29uZGl0aW9uLnR5cGUgPT09ICdMT0FOX0lOU1RBTExNRU5UJ1wiPlxuICAgIFBheSB7eyBmaXhlZDAyKGNvbmRpdGlvbi5yZXBheW1lbnQhLmFtb3VudCArIGNvbmRpdGlvbi5pbnRlcmVzdCEuYW1vdW50KSB9fVxuICAgIHt7IGNvbmRpdGlvbi5yZXBheW1lbnQhLmN1cnJlbmN5IH19IChhdXRvKVxuICA8L3RlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiY29uZGl0aW9uLnR5cGUgPT09ICdERUxJVkVSWV9TSElQTUVOVCdcIj5cbiAgICBEZWxpdmVyIFNIUFQgQFxuICAgIDxBZGRyZXNzTGluayA6YWRkcmVzcz1cImNvbmRpdGlvbi5kZXN0aW5hdGlvbiFcIiAvPlxuICA8L3RlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiY29uZGl0aW9uLnR5cGUgPT09ICdERUxJVkVSWSdcIj5cbiAgICBEZWxpdmVyIHt7IGNvbmRpdGlvbi5xdWFudGl0eSEuYW1vdW50IH19IHt7IGNvbmRpdGlvbi5xdWFudGl0eSEubWF0ZXJpYWwudGlja2VyIH19IEBcbiAgICA8QWRkcmVzc0xpbmsgOmFkZHJlc3M9XCJjb25kaXRpb24uYWRkcmVzcyFcIiAvPlxuICA8L3RlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiY29uZGl0aW9uLnR5cGUgPT09ICdQSUNLVVBfU0hJUE1FTlQnXCI+XG4gICAgUGljayB1cCBTSFBUIEBcbiAgICA8QWRkcmVzc0xpbmsgOmFkZHJlc3M9XCJjb25kaXRpb24uYWRkcmVzcyFcIiAvPlxuICA8L3RlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiY29uZGl0aW9uLnR5cGUgPT09ICdQUk9WSVNJT05fU0hJUE1FTlQnXCI+XG4gICAgUHJvdmlzaW9uIHt7IGNvbmRpdGlvbi5xdWFudGl0eSEuYW1vdW50IH19IHt7IGNvbmRpdGlvbi5xdWFudGl0eSEubWF0ZXJpYWwudGlja2VyIH19IEBcbiAgICA8QWRkcmVzc0xpbmsgOmFkZHJlc3M9XCJjb25kaXRpb24uYWRkcmVzcyFcIiAvPlxuICA8L3RlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiY29uZGl0aW9uLnR5cGUgPT09ICdQUk9WSVNJT04nXCI+XG4gICAgUHJvdmlzaW9uIHt7IGNvbmRpdGlvbi5xdWFudGl0eSEuYW1vdW50IH19IHt7IGNvbmRpdGlvbi5xdWFudGl0eSEubWF0ZXJpYWwudGlja2VyIH19IEBcbiAgICA8QWRkcmVzc0xpbmsgOmFkZHJlc3M9XCJjb25kaXRpb24uYWRkcmVzcyFcIiAvPlxuICA8L3RlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiY29uZGl0aW9uLnR5cGUgPT09ICdFWFBMT1JBVElPTidcIj5cbiAgICBFeHBsb3JlXG4gICAgPEFkZHJlc3NMaW5rIDphZGRyZXNzPVwiY29uZGl0aW9uLmFkZHJlc3MhXCIgLz5cbiAgPC90ZW1wbGF0ZT5cbiAgPHRlbXBsYXRlIHYtZWxzZS1pZj1cImNvbmRpdGlvbi50eXBlID09PSAnQ09NRVhfUFVSQ0hBU0VfUElDS1VQJ1wiPlxuICAgIFBpY2sgdXAge3sgY29uZGl0aW9uLnF1YW50aXR5IS5hbW91bnQgLSBjb25kaXRpb24ucGlja2VkVXAhLmFtb3VudCB9fVxuICAgIHt7IGNvbmRpdGlvbi5xdWFudGl0eSEubWF0ZXJpYWwudGlja2VyIH19IEBcbiAgICA8QWRkcmVzc0xpbmsgOmFkZHJlc3M9XCJjb25kaXRpb24uYWRkcmVzcyFcIiAvPlxuICA8L3RlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiY29uZGl0aW9uLnR5cGUgPT09ICdIRUFEUVVBUlRFUlNfVVBHUkFERSdcIj5VcGdyYWRlIEhRPC90ZW1wbGF0ZT5cbiAgPHRlbXBsYXRlIHYtZWxzZS1pZj1cImNvbmRpdGlvbi50eXBlID09PSAnQkFTRV9DT05TVFJVQ1RJT04nXCI+Q29uc3RydWN0IEJhc2U8L3RlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiY29uZGl0aW9uLnR5cGUgPT09ICdGSU5JU0hfRkxJR0hUJ1wiPkZpbmlzaCBGbGlnaHQ8L3RlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiY29uZGl0aW9uLnR5cGUgPT09ICdQTEFDRV9PUkRFUidcIj5QbGFjZSBPcmRlcjwvdGVtcGxhdGU+XG4gIDx0ZW1wbGF0ZSB2LWVsc2UtaWY9XCJjb25kaXRpb24udHlwZSA9PT0gJ1BST0RVQ1RJT05fT1JERVJfQ09NUExFVEVEJ1wiPlxuICAgIENvbXBsZXRlIFByb2R1Y3Rpb24gT3JkZXJcbiAgPC90ZW1wbGF0ZT5cbiAgPHRlbXBsYXRlIHYtZWxzZS1pZj1cImNvbmRpdGlvbi50eXBlID09PSAnUFJPRFVDVElPTl9SVU4nXCI+UnVuIFByb2R1Y3Rpb248L3RlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiY29uZGl0aW9uLnR5cGUgPT09ICdTVEFSVF9GTElHSFQnXCI+U3RhcnQgRmxpZ2h0PC90ZW1wbGF0ZT5cbiAgPHRlbXBsYXRlIHYtZWxzZS1pZj1cImNvbmRpdGlvbi50eXBlID09PSAnUE9XRVInXCI+QmVjb21lIEdvdmVybm9yPC90ZW1wbGF0ZT5cbiAgPHRlbXBsYXRlIHYtZWxzZS1pZj1cImNvbmRpdGlvbi50eXBlID09PSAnUkVQQUlSX1NISVAnXCI+UmVwYWlyIFNoaXA8L3RlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiY29uZGl0aW9uLnR5cGUgPT09ICdDT05UUklCVVRJT04nXCI+Q29udHJpYnV0aW9uPC90ZW1wbGF0ZT5cbiAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICB7eyBjb25kaXRpb24udHlwZSB9fVxuICA8L3RlbXBsYXRlPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJjb25kaXRpb24iLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfdW5yZWYiLCJfY3JlYXRlVk5vZGUiLCJBZGRyZXNzTGluayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUWtCQSxhQUFBQSxLQUFBQSxVQUFVLFNBQUksMEJBQTlCQyxtQkFFV0MsVUFBQSxFQUFBLEtBQUEsRUFBQSxHQUFBO0FBQUEsUUFGbUNDLGdCQUFBLFVBQ3hDQyxnQkFBR0MsTUFBQSxPQUFBLEVBQVFMLEtBQUFBLFVBQVUsT0FBUSxNQUFNLENBQUEsSUFBSSxNQUFDSSxnQkFBR0osS0FBQUEsVUFBVSxPQUFRLFFBQVEsR0FBQSxDQUFBO0FBQUEsTUFBQSxVQUV0REEsS0FBQUEsVUFB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
