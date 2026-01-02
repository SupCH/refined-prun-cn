import { contractsStore, isFactionContract } from './contracts.js';
import dayjs from './dayjs.min.js';
import { timestampEachMinute } from './dayjs.js';
import { sumBy } from './sum-by.js';
import { calcMaterialAmountPrice } from './cx.js';
import { binarySearch } from './binary-search.js';
import { map } from './map-values.js';
import { computed } from './runtime-core.esm-bundler.js';
const sortedConditions = computed(() => {
  const active = contractsStore.active.value;
  if (!active) {
    return void 0;
  }
  const conditions = [];
  for (const contract of active) {
    const activeConditions = contract.conditions.filter(x => x.status !== 'FULFILLED');
    for (const condition of activeConditions) {
      conditions.push({
        contract,
        condition,
        isSelf: condition.party === contract.party,
        deadline: calculateDeadline(contract, condition),
        dependencies: condition.dependencies
          .map(id => contract.conditions.find(x => x.id === id))
          .filter(x => x !== void 0),
      });
    }
  }
  conditions.sort((a, b) => a.deadline - b.deadline);
  return conditions;
});
function calculateDeadline(contract, condition) {
  if (condition.type === 'COMEX_PURCHASE_PICKUP') {
    return getLatestDependencyDeadline(contract, condition);
  }
  if (condition.deadline) {
    return condition.deadline.timestamp;
  }
  if (!condition.deadlineDuration) {
    return Number.POSITIVE_INFINITY;
  }
  return getLatestDependencyDeadline(contract, condition) + condition.deadlineDuration.millis;
}
function getLatestDependencyDeadline(contract, condition) {
  let latestDependency = contract.date.timestamp;
  for (const dependency of condition.dependencies) {
    const dependencyCondition = contract.conditions.find(x => x.id === dependency);
    if (dependencyCondition) {
      latestDependency = Math.max(
        latestDependency,
        calculateDeadline(contract, dependencyCondition),
      );
    }
  }
  return latestDependency;
}
const accountingPeriod = dayjs.duration(1, 'week').asMilliseconds();
const currentSplitIndex = computed(() => {
  const sorted = sortedConditions.value;
  if (!sorted) {
    return void 0;
  }
  const currentSplitDate = timestampEachMinute.value + accountingPeriod;
  return binarySearch(currentSplitDate, sorted, x => x.deadline);
});
const currentConditions = computed(() => {
  return sortedConditions.value?.slice(0, currentSplitIndex.value);
});
const selfCurrentConditions = computed(() => {
  return currentConditions.value?.filter(x => x.isSelf);
});
const partnerCurrentConditions = computed(() => {
  return currentConditions.value?.filter(x => !x.isSelf);
});
const nonCurrentConditions = computed(() => {
  return sortedConditions.value?.slice(currentSplitIndex.value);
});
const selfNonCurrentConditions = computed(() => {
  return nonCurrentConditions.value?.filter(x => x.isSelf);
});
const partnerNonCurrentConditions = computed(() => {
  return nonCurrentConditions.value?.filter(x => !x.isSelf);
});
function sumAccountsPayable(conditions) {
  return sumConditions(conditions, ['PAYMENT', 'LOAN_PAYOUT'], x => x.amount.amount);
}
function sumLoanRepayments(conditions) {
  return sumConditions(conditions, ['LOAN_INSTALLMENT'], x => x.repayment.amount);
}
function sumLoanInterest(conditions) {
  const filtered = conditions.value?.filter(
    x =>
      x.condition.type === 'LOAN_INSTALLMENT' &&
      x.dependencies.every(y => y.status === 'FULFILLED'),
  );
  return sumBy(filtered, x => x.condition.interest.amount);
}
function sumDeliveries(conditions) {
  return sumConditions(conditions, ['DELIVERY'], getMaterialQuantityValue);
}
function sumProvisions(conditions) {
  return sumConditions(conditions, ['PROVISION'], getMaterialQuantityValue);
}
function sumFactionProvisions(conditions) {
  const filtered = conditions.value?.filter(
    x => isFactionContract(x.contract) && x.condition.type === 'PROVISION_SHIPMENT',
  );
  return sumBy(filtered, x => getMaterialQuantityValue(x.condition));
}
function sumMaterialsPickup(conditions) {
  return sumConditions(conditions, ['COMEX_PURCHASE_PICKUP'], x => {
    return map(
      [calcMaterialAmountPrice(x.quantity), calcMaterialAmountPrice(x.pickedUp)],
      (quantity, pickedUp) => quantity - pickedUp,
    );
  });
}
function sumShipmentDeliveries(conditions) {
  let total = 0;
  const filtered = conditions.value?.filter(x => x.condition.type === 'DELIVERY_SHIPMENT');
  if (!filtered) {
    return void 0;
  }
  for (const cc of filtered) {
    const pickup = findDependency(cc.contract, cc.condition, 'PICKUP_SHIPMENT');
    if (!pickup) {
      continue;
    }
    const provision = findDependency(cc.contract, pickup, 'PROVISION_SHIPMENT');
    if (provision?.status !== 'FULFILLED' || !provision?.quantity) {
      continue;
    }
    const value = getMaterialQuantityValue(provision);
    if (value === void 0) {
      return void 0;
    }
    total += value;
  }
  return total;
}
function findDependency(contract, condition, type) {
  for (const id of condition.dependencies) {
    const match = contract.conditions.find(x => x.id === id);
    if (match?.type === type) {
      return match;
    }
  }
  return void 0;
}
function sumConditions(conditions, types, property) {
  const filtered = conditions.value?.filter(x => types.includes(x.condition.type));
  return sumBy(filtered, x => property(x.condition));
}
function getMaterialQuantityValue(condition) {
  return calcMaterialAmountPrice(condition.quantity);
}
export {
  currentConditions,
  nonCurrentConditions,
  partnerCurrentConditions,
  partnerNonCurrentConditions,
  selfCurrentConditions,
  selfNonCurrentConditions,
  sumAccountsPayable,
  sumDeliveries,
  sumFactionProvisions,
  sumLoanInterest,
  sumLoanRepayments,
  sumMaterialsPickup,
  sumProvisions,
  sumShipmentDeliveries,
};
