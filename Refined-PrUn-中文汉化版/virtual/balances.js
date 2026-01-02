import { onApiMessage } from './api-messages.js';
import { createEntityStore } from './create-entity-store.js';
import { ref } from './reactivity.esm-bundler.js';
import { computed } from './runtime-core.esm-bundler.js';
const store = createEntityStore(x => x.currency);
const state = store.state;
const ownCurrency = ref('');
onApiMessage({
  ACCOUNTING_CASH_BALANCES(data) {
    ownCurrency.value = data.ownCurrency.code;
    store.setAll(data.currencyAccounts.map(x => x.currencyBalance));
    store.setFetched();
  },
  ACCOUNTING_BOOKINGS(data) {
    for (const item of data.items) {
      if (item.accountCategory !== 'LIQUID_ASSETS' && item.accountType !== 1800) {
        continue;
      }
      store.setOne(item.balance);
    }
  },
});
const currencies = computed(() => state.all.value?.map(x => x.currency));
const balancesStore = {
  ...state,
  ownCurrency,
  currencies,
};
export { balancesStore };
