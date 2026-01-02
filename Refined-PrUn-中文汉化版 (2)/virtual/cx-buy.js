import { act } from './act-registry.js';
import _sfc_main from './Edit.vue.js';
import { CXPO_BUY } from './CXPO_BUY.js';
import { fixed0, fixed02 } from './format.js';
import { fillAmount } from './utils2.js';
act.addAction({
  type: 'CX Buy',
  description: action => {
    if (!action.group || !action.exchange) {
      return '--';
    }
    return 'Buying group ' + action.group + ' from ' + action.exchange;
  },
  editComponent: _sfc_main,
  generateSteps: async ctx => {
    const { data, state, log, fail, getMaterialGroup, emitStep } = ctx;
    const assert = ctx.assert;
    const allowUnfilled = data.allowUnfilled ?? false;
    const buyPartial = data.buyPartial ?? false;
    const materials = await getMaterialGroup(data.group);
    assert(materials, 'Invalid material group');
    const exchange = data.exchange;
    assert(exchange, 'Missing exchange');
    if ((data.useCXInv ?? true) && data.exchange) {
      for (const mat of Object.keys(materials)) {
        for (const CXMat of Object.keys(state.WAR[data.exchange])) {
          if (CXMat === mat) {
            const used = Math.min(materials[mat], state.WAR[data.exchange][CXMat]);
            materials[mat] -= used;
            state.WAR[data.exchange][CXMat] -= used;
            if (state.WAR[data.exchange][mat] <= 0) {
              delete state.WAR[data.exchange][CXMat];
            }
          }
        }
        if (materials[mat] <= 0) {
          delete materials[mat];
        }
      }
    }
    for (const ticker of Object.keys(materials)) {
      const amount = materials[ticker];
      const priceLimit = data.priceLimits?.[ticker] ?? Infinity;
      if (isNaN(priceLimit)) {
        log.error('Non-numerical price limit on ' + ticker);
        continue;
      }
      const cxTicker = `${ticker}.${data.exchange}`;
      const filled = fillAmount(cxTicker, amount, priceLimit);
      let bidAmount = amount;
      if (filled && filled.amount < amount && !allowUnfilled) {
        if (!buyPartial) {
          let message2 = `Not enough materials on ${exchange} to buy ${fixed0(amount)} ${ticker}`;
          if (isFinite(priceLimit)) {
            message2 += ` with price limit ${fixed02(priceLimit)}/u`;
          }
          fail(message2);
          return;
        }
        const leftover = amount - filled.amount;
        let message = `${fixed0(leftover)} ${ticker} will not be bought on ${exchange} (${fixed0(filled.amount)} of ${fixed0(amount)} available`;
        if (isFinite(priceLimit)) {
          message += ` with price limit ${fixed02(priceLimit)}/u`;
        }
        message += ')';
        log.warning(message);
        if (filled.amount === 0) {
          continue;
        }
        bidAmount = filled.amount;
      }
      emitStep(
        CXPO_BUY({
          exchange,
          ticker,
          amount: bidAmount,
          priceLimit,
          buyPartial,
          allowUnfilled,
        }),
      );
    }
  },
});
