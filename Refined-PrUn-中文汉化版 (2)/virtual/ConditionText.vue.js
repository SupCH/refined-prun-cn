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
