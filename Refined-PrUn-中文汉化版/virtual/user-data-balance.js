import { userData } from './user-data.js';
import dayjs from './dayjs.min.js';
import { diffHours } from './time-diff.js';
import { liveBalanceSheet } from './balance-sheet-live.js';
import { timestampEachMinute } from './dayjs.js';
import { computed } from './runtime-core.esm-bundler.js';
const v1 = computed(() => userData.balanceHistory.v1.map(deserializeBalanceSheetV1Data));
const v2 = computed(() => userData.balanceHistory.v2.map(deserializeBalanceSheetV2Data));
const balanceHistory = computed(() => v1.value.concat(v2.value));
const lastBalance = computed(() => {
  timestampEachMinute.value;
  const now = Date.now();
  const dayjsNow = dayjs(now);
  const history = balanceHistory.value;
  for (let i = history.length - 1; i >= 0; i--) {
    const timestamp = history[i].timestamp;
    if (now < timestamp) {
      return void 0;
    }
    if (!dayjsNow.isSame(timestamp, 'isoWeek')) {
      return history[i];
    }
  }
  return void 0;
});
const previousBalance = computed(() => {
  if (!lastBalance.value) {
    return void 0;
  }
  timestampEachMinute.value;
  const lastTimestamp = lastBalance.value.timestamp;
  const lastDayjs = dayjs(lastTimestamp);
  const now = Date.now();
  const history = balanceHistory.value;
  for (let i = history.length - 1; i >= 0; i--) {
    const timestamp = history[i].timestamp;
    if (now < timestamp) {
      return void 0;
    }
    if (lastBalance.value.timestamp < timestamp) {
      continue;
    }
    if (!lastDayjs.isSame(timestamp, 'isoWeek')) {
      return history[i];
    }
  }
  return void 0;
});
function canCollectFinDataPoint() {
  return serializeBalanceSheet(liveBalanceSheet) !== void 0;
}
function trackBalanceHistory() {
  setTimeout(trackBalanceHistory, 1e3);
  const now = Date.now() - dayjs.duration(10, 'minutes').asMilliseconds();
  const lastRecording = balanceHistory.value.at(-1);
  const hasRecentBalanceRecording =
    lastRecording &&
    (dayjs(lastRecording.timestamp).isSame(now, 'day') ||
      diffHours(lastRecording.timestamp, now) < 8);
  if (!hasRecentBalanceRecording) {
    collectFinDataPoint();
  }
}
function collectFinDataPoint() {
  const sheet = serializeBalanceSheet(liveBalanceSheet);
  if (sheet) {
    userData.balanceHistory.v2.push(sheet);
  }
}
function deserializeBalanceSheetV1Data(data) {
  const [timestamp, currentAssets, nonCurrentAssets, liabilities] = data;
  return {
    timestamp,
    assets: {
      current: {
        total: currentAssets,
      },
      nonCurrent: {
        total: nonCurrentAssets,
      },
    },
    liabilities: {
      total: liabilities,
    },
  };
}
function deserializeBalanceSheetV2Data(data) {
  const [
    timestamp,
    cash,
    cx,
    fx,
    mmMaterials,
    accountsReceivableCurrent,
    loansPrincipalCurrent,
    loansInterestCurrent,
    cxListedMaterials,
    cxInventory,
    finishedGoods,
    workInProgress,
    rawMaterials,
    workforceConsumables,
    otherItems,
    fuelTanks,
    materialsInTransitCurrent,
    materialsReceivableCurrent,
    infrastructure,
    resourceExtraction,
    production,
    accumulatedDepreciation,
    shipsMarketValue,
    shipsDepreciation,
    accountsReceivableNonCurrent,
    materialsInTransitNonCurrent,
    materialsReceivableNonCurrent,
    loansPrincipalNonCurrent,
    hqUpgrades,
    arc,
    accountsPayableCurrent,
    materialsPayableCurrent,
    debtsPrincipalCurrent,
    debtsInterestCurrent,
    accountsPayableNonCurrent,
    materialsPayableNonCurrent,
    debtsPrincipalNonCurrent,
  ] = data;
  return {
    timestamp,
    assets: {
      current: {
        cashAndCashEquivalents: {
          cash,
          deposits: {
            cx,
            fx,
          },
          mmMaterials,
        },
        accountsReceivable: accountsReceivableCurrent,
        loansReceivable: {
          principal: loansPrincipalCurrent,
          interest: loansInterestCurrent,
        },
        inventory: {
          cxListedMaterials,
          cxInventory,
          materialsInTransit: materialsInTransitCurrent,
          baseInventory: {
            finishedGoods,
            workInProgress,
            rawMaterials,
            workforceConsumables,
            otherItems,
          },
          fuelTanks,
          materialsReceivable: materialsReceivableCurrent,
        },
      },
      nonCurrent: {
        buildings: {
          marketValue: {
            infrastructure,
            resourceExtraction,
            production,
          },
          accumulatedDepreciation,
        },
        ships: {
          marketValue: shipsMarketValue,
          accumulatedDepreciation: shipsDepreciation,
        },
        longTermReceivables: {
          accountsReceivable: accountsReceivableNonCurrent,
          materialsReceivable: materialsReceivableNonCurrent,
          materialsInTransit: materialsInTransitNonCurrent,
          loansPrincipal: loansPrincipalNonCurrent,
        },
        intangibleAssets: {
          hqUpgrades,
          arc,
        },
      },
    },
    liabilities: {
      current: {
        accountsPayable: accountsPayableCurrent,
        materialsPayable: materialsPayableCurrent,
        loansPayable: {
          principal: debtsPrincipalCurrent,
          interest: debtsInterestCurrent,
        },
      },
      nonCurrent: {
        longTermPayables: {
          accountsPayable: accountsPayableNonCurrent,
          materialsPayable: materialsPayableNonCurrent,
          loansPrincipal: debtsPrincipalNonCurrent,
        },
      },
    },
  };
}
function serializeBalanceSheet(data) {
  const sheet = [
    data.timestamp,
    data.assets?.current?.cashAndCashEquivalents?.cash,
    data.assets?.current?.cashAndCashEquivalents?.deposits?.cx,
    data.assets?.current?.cashAndCashEquivalents?.deposits?.fx,
    data.assets?.current?.cashAndCashEquivalents?.mmMaterials,
    data.assets?.current?.accountsReceivable,
    data.assets?.current?.loansReceivable?.principal,
    data.assets?.current?.loansReceivable?.interest,
    data.assets?.current?.inventory?.cxListedMaterials,
    data.assets?.current?.inventory?.cxInventory,
    data.assets?.current?.inventory?.baseInventory?.finishedGoods,
    data.assets?.current?.inventory?.baseInventory?.workInProgress,
    data.assets?.current?.inventory?.baseInventory?.rawMaterials,
    data.assets?.current?.inventory?.baseInventory?.workforceConsumables,
    data.assets?.current?.inventory?.baseInventory?.otherItems,
    data.assets?.current?.inventory?.fuelTanks,
    data.assets?.current?.inventory?.materialsInTransit,
    data.assets?.current?.inventory?.materialsReceivable,
    data.assets?.nonCurrent?.buildings?.marketValue?.infrastructure,
    data.assets?.nonCurrent?.buildings?.marketValue?.resourceExtraction,
    data.assets?.nonCurrent?.buildings?.marketValue?.production,
    data.assets?.nonCurrent?.buildings?.accumulatedDepreciation,
    data.assets?.nonCurrent?.ships?.marketValue,
    data.assets?.nonCurrent?.ships?.accumulatedDepreciation,
    data.assets?.nonCurrent?.longTermReceivables?.accountsReceivable,
    data.assets?.nonCurrent?.longTermReceivables?.materialsInTransit,
    data.assets?.nonCurrent?.longTermReceivables?.materialsReceivable,
    data.assets?.nonCurrent?.longTermReceivables?.loansPrincipal,
    data.assets?.nonCurrent?.intangibleAssets?.hqUpgrades,
    data.assets?.nonCurrent?.intangibleAssets?.arc,
    data.liabilities?.current?.accountsPayable,
    data.liabilities?.current?.materialsPayable,
    data.liabilities?.current?.loansPayable?.principal,
    data.liabilities?.current?.loansPayable?.interest,
    data.liabilities?.nonCurrent?.longTermPayables?.accountsPayable,
    data.liabilities?.nonCurrent?.longTermPayables?.materialsPayable,
    data.liabilities?.nonCurrent?.longTermPayables?.loansPrincipal,
  ];
  if (sheet.some(x => x === void 0)) {
    return void 0;
  }
  return sheet.map(x => Math.round(x));
}
export {
  balanceHistory,
  canCollectFinDataPoint,
  collectFinDataPoint,
  deserializeBalanceSheetV1Data,
  deserializeBalanceSheetV2Data,
  lastBalance,
  previousBalance,
  serializeBalanceSheet,
  trackBalanceHistory,
};
