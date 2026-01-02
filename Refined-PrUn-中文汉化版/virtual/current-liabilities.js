import {
  sumAccountsPayable,
  selfCurrentConditions,
  sumFactionProvisions,
  sumProvisions,
  sumDeliveries,
  sumLoanRepayments,
  sumLoanInterest,
} from './contract-conditions.js';
import { sum } from './sum.js';
import { computed } from './runtime-core.esm-bundler.js';
const accountsPayable = computed(() => sumAccountsPayable(selfCurrentConditions));
const materialsPayable = computed(() =>
  sum(
    sumDeliveries(selfCurrentConditions),
    sumProvisions(selfCurrentConditions),
    sumFactionProvisions(selfCurrentConditions),
  ),
);
const shortTermDebt = computed(() => sumLoanRepayments(selfCurrentConditions));
const interestPayable = computed(() => sumLoanInterest(selfCurrentConditions));
const currentLiabilities = {
  accountsPayable,
  materialsPayable,
  shortTermDebt,
  interestPayable,
};
export { currentLiabilities };
