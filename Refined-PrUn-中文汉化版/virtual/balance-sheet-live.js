import { timestampEachSecond } from './dayjs.js';
import { currentAssets } from './current-assets.js';
import { nonCurrentAssets } from './non-current-assets.js';
import { currentLiabilities } from './current-liabilities.js';
import { nonCurrentLiabilities } from './non-current-liabilities.js';
import {
  calcDebtRatio,
  calcAcidTestRatio,
  calcQuickLiabilities,
  calcQuickAssets,
  calcLiquidationValue,
  calcEquity,
  calcTotalIntangibleAssets,
  calcTotalLiabilities,
  calcTotalNonCurrentLiabilities,
  calcTotalCurrentLiabilities,
  calcTotalAssets,
  calcTotalNonCurrentAssets,
  calcTotalCurrentAssets,
} from './balance-sheet-summary.js';
import { isRef } from './reactivity.esm-bundler.js';
import { computed } from './runtime-core.esm-bundler.js';
const liveBalanceSheet = createLiveBalanceSheet();
function createLiveBalanceSheet() {
  return unwrapRefProperties({
    timestamp: timestampEachSecond,
    assets: {
      current: unwrapRefProperties({
        cashAndCashEquivalents: unwrapRefProperties({
          cash: currentAssets.cashTotal,
          deposits: unwrapRefProperties({
            cx: currentAssets.cxDepositsTotal,
            fx: currentAssets.fxDepositsTotal,
          }),
          mmMaterials: currentAssets.inventory.mmMaterialsTotal,
        }),
        accountsReceivable: currentAssets.accountsReceivable,
        loansReceivable: unwrapRefProperties({
          principal: currentAssets.shortTermLoans,
          interest: currentAssets.interestReceivable,
        }),
        inventory: unwrapRefProperties({
          cxListedMaterials: currentAssets.inventory.cxListedMaterials,
          cxInventory: currentAssets.inventory.cxInventoryTotal,
          materialsInTransit: currentAssets.inventory.materialsInTransit,
          baseInventory: unwrapRefProperties({
            finishedGoods: currentAssets.inventory.finishedGoods,
            workInProgress: currentAssets.inventory.workInProgress,
            rawMaterials: currentAssets.inventory.rawMaterials,
            workforceConsumables: currentAssets.inventory.workforceConsumables,
            otherItems: currentAssets.inventory.otherItems,
          }),
          fuelTanks: currentAssets.inventory.fuelTanks,
          materialsReceivable: currentAssets.inventory.materialsReceivable,
        }),
      }),
      nonCurrent: unwrapRefProperties({
        buildings: unwrapRefProperties({
          marketValue: unwrapRefProperties({
            infrastructure: nonCurrentAssets.buildings.infrastructure,
            resourceExtraction: nonCurrentAssets.buildings.resourceExtraction,
            production: nonCurrentAssets.buildings.production,
          }),
          accumulatedDepreciation: nonCurrentAssets.buildings.accumulatedDepreciation,
        }),
        ships: unwrapRefProperties({
          marketValue: nonCurrentAssets.shipsMarketValue,
          accumulatedDepreciation: nonCurrentAssets.shipsDepreciation,
        }),
        longTermReceivables: unwrapRefProperties({
          accountsReceivable: nonCurrentAssets.accountsReceivable,
          materialsInTransit: nonCurrentAssets.materialsInTransit,
          materialsReceivable: nonCurrentAssets.materialsReceivable,
          loansPrincipal: nonCurrentAssets.longTermLoans,
        }),
        intangibleAssets: unwrapRefProperties({
          hqUpgrades: nonCurrentAssets.hqUpgrades,
          arc: nonCurrentAssets.arc,
        }),
      }),
    },
    liabilities: {
      current: unwrapRefProperties({
        accountsPayable: currentLiabilities.accountsPayable,
        materialsPayable: currentLiabilities.materialsPayable,
        loansPayable: unwrapRefProperties({
          principal: currentLiabilities.shortTermDebt,
          interest: currentLiabilities.interestPayable,
        }),
      }),
      nonCurrent: unwrapRefProperties({
        longTermPayables: unwrapRefProperties({
          accountsPayable: nonCurrentLiabilities.accountsPayable,
          materialsPayable: nonCurrentLiabilities.materialsPayable,
          loansPrincipal: nonCurrentLiabilities.longTermDebt,
        }),
      }),
    },
  });
}
function unwrapRefProperties(obj) {
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const property = obj[key];
      if (isRef(property)) {
        Object.defineProperty(result, key, {
          get: () => property.value,
          enumerable: true,
          configurable: true,
        });
      } else {
        result[key] = property;
      }
    }
  }
  return result;
}
const liveBalanceSummary = unwrapBalanceSheetExtras({
  currentAssets: calcTotalCurrentAssets,
  nonCurrentAssets: calcTotalNonCurrentAssets,
  assets: calcTotalAssets,
  currentLiabilities: calcTotalCurrentLiabilities,
  nonCurrentLiabilities: calcTotalNonCurrentLiabilities,
  liabilities: calcTotalLiabilities,
  intangibleAssets: calcTotalIntangibleAssets,
  equity: calcEquity,
  liquidationValue: calcLiquidationValue,
  quickAssets: calcQuickAssets,
  quickLiabilities: calcQuickLiabilities,
  acidTestRatio: calcAcidTestRatio,
  debtRatio: calcDebtRatio,
});
function unwrapBalanceSheetExtras(obj) {
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const extra = obj[key];
      const ref = computed(() => extra(liveBalanceSheet));
      Object.defineProperty(result, key, {
        get: () => ref.value,
        enumerable: true,
        configurable: true,
      });
    }
  }
  return result;
}
export { liveBalanceSheet, liveBalanceSummary };
