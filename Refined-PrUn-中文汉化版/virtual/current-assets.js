import { sumBy } from './sum-by.js';
import { balancesStore } from './balances.js';
import { cxosStore } from './cxos.js';
import { fxosStore } from './fxos.js';
import {
  sumLoanInterest,
  sumAccountsPayable,
  sumLoanRepayments,
  partnerCurrentConditions,
} from './contract-conditions.js';
import { sumMapValues } from './utils.js';
import { inventory } from './inventory.js';
import { sum } from './sum.js';
import { computed } from './runtime-core.esm-bundler.js';
const cashTotal = computed(() => sumBy(balancesStore.all.value, x => x.amount));
const cxDeposits = computed(() => {
  const orders = cxosStore.active.value;
  if (!orders) {
    return void 0;
  }
  const deposits = /* @__PURE__ */ new Map();
  const buyOrders = orders.filter(x => x.type === 'BUYING');
  for (const order of buyOrders) {
    const deposit = order.limit.amount * order.amount;
    const currency = order.limit.currency;
    deposits.set(currency, (deposits.get(currency) ?? 0) + deposit);
  }
  return deposits;
});
const cxDepositsTotal = computed(() => sumMapValues(cxDeposits.value));
const fxDeposits = computed(() => {
  const orders = fxosStore.active.value;
  if (!orders) {
    return void 0;
  }
  const deposits = /* @__PURE__ */ new Map();
  for (const order of orders) {
    let deposit;
    let currency;
    if (order.type === 'SELLING') {
      deposit = order.amount.amount;
      currency = order.limit.base;
    } else {
      deposit = order.amount.amount * order.limit.rate;
      currency = order.limit.quote;
    }
    deposits.set(currency, (deposits.get(currency) ?? 0) + deposit);
  }
  return deposits;
});
const fxDepositsTotal = computed(() => sumMapValues(fxDeposits.value));
computed(() => sum(cxDepositsTotal.value, fxDepositsTotal.value));
const interestReceivable = computed(() => sumLoanInterest(partnerCurrentConditions));
const accountsReceivable = computed(() => sumAccountsPayable(partnerCurrentConditions));
const shortTermLoans = computed(() => sumLoanRepayments(partnerCurrentConditions));
const currentAssets = {
  cashTotal,
  cxDeposits,
  cxDepositsTotal,
  fxDeposits,
  fxDepositsTotal,
  interestReceivable,
  accountsReceivable,
  shortTermLoans,
  inventory,
};
export { currentAssets };
