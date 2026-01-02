import {
  sumAccountsPayable,
  selfNonCurrentConditions,
  sumFactionProvisions,
  sumProvisions,
  sumDeliveries,
  sumLoanRepayments,
} from './contract-conditions.js';
import { sum } from './sum.js';
import { computed } from './runtime-core.esm-bundler.js';
const accountsPayable = computed(() => sumAccountsPayable(selfNonCurrentConditions));
const materialsPayable = computed(() =>
  sum(
    sumDeliveries(selfNonCurrentConditions),
    sumProvisions(selfNonCurrentConditions),
    sumFactionProvisions(selfNonCurrentConditions),
  ),
);
const longTermDebt = computed(() => sumLoanRepayments(selfNonCurrentConditions));
const nonCurrentLiabilities = {
  accountsPayable,
  materialsPayable,
  longTermDebt,
};
export { nonCurrentLiabilities };
