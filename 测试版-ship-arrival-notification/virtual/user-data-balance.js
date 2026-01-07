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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1kYXRhLWJhbGFuY2UuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdG9yZS91c2VyLWRhdGEtYmFsYW5jZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYXJ0aWFsQmFsYW5jZVNoZWV0IH0gZnJvbSAnQHNyYy9jb3JlL2JhbGFuY2UvYmFsYW5jZS1zaGVldCc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcyc7XG5pbXBvcnQgeyBkaWZmSG91cnMgfSBmcm9tICdAc3JjL3V0aWxzL3RpbWUtZGlmZic7XG5pbXBvcnQgeyBsaXZlQmFsYW5jZVNoZWV0IH0gZnJvbSAnQHNyYy9jb3JlL2JhbGFuY2UvYmFsYW5jZS1zaGVldC1saXZlJztcbmltcG9ydCB7IHRpbWVzdGFtcEVhY2hNaW51dGUgfSBmcm9tICdAc3JjL3V0aWxzL2RheWpzJztcblxuY29uc3QgdjEgPSBjb21wdXRlZCgoKSA9PiB1c2VyRGF0YS5iYWxhbmNlSGlzdG9yeS52MS5tYXAoZGVzZXJpYWxpemVCYWxhbmNlU2hlZXRWMURhdGEpKTtcbmNvbnN0IHYyID0gY29tcHV0ZWQoKCkgPT4gdXNlckRhdGEuYmFsYW5jZUhpc3RvcnkudjIubWFwKGRlc2VyaWFsaXplQmFsYW5jZVNoZWV0VjJEYXRhKSk7XG5cbmV4cG9ydCBjb25zdCBiYWxhbmNlSGlzdG9yeSA9IGNvbXB1dGVkKCgpID0+IHYxLnZhbHVlLmNvbmNhdCh2Mi52YWx1ZSkpO1xuXG5leHBvcnQgY29uc3QgbGFzdEJhbGFuY2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gIC8vIFRvdWNoIHRpbWVzdGFtcEVhY2hNaW51dGUgdG8gdHJpZ2dlciByZWFjdGl2aXR5LFxuICAvLyBidXQgdXNlIERhdGUubm93KCkgaW5zdGVhZCBiZWNhdXNlIHRoZSBtb3N0IHJlY2VudFxuICAvLyBoaXN0b3J5IGVudHJ5IGNhbiBiZSBtb3JlIHJlY2VudCB0aGFuIGEgbWludXRlIGFnby5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICBjb25zdCBfID0gdGltZXN0YW1wRWFjaE1pbnV0ZS52YWx1ZTtcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgY29uc3QgZGF5anNOb3cgPSBkYXlqcyhub3cpO1xuICBjb25zdCBoaXN0b3J5ID0gYmFsYW5jZUhpc3RvcnkudmFsdWU7XG4gIGZvciAobGV0IGkgPSBoaXN0b3J5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gaGlzdG9yeVtpXS50aW1lc3RhbXA7XG4gICAgaWYgKG5vdyA8IHRpbWVzdGFtcCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKCFkYXlqc05vdy5pc1NhbWUodGltZXN0YW1wLCAnaXNvV2VlaycpKSB7XG4gICAgICByZXR1cm4gaGlzdG9yeVtpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn0pO1xuXG5leHBvcnQgY29uc3QgcHJldmlvdXNCYWxhbmNlID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoIWxhc3RCYWxhbmNlLnZhbHVlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICAvLyBUb3VjaCB0aW1lc3RhbXBFYWNoTWludXRlIHRvIHRyaWdnZXIgcmVhY3Rpdml0eSxcbiAgLy8gYnV0IHVzZSBEYXRlLm5vdygpIGluc3RlYWQgYmVjYXVzZSB0aGUgbW9zdCByZWNlbnRcbiAgLy8gaGlzdG9yeSBlbnRyeSBjYW4gYmUgbW9yZSByZWNlbnQgdGhhbiBhIG1pbnV0ZSBhZ28uXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgY29uc3QgXyA9IHRpbWVzdGFtcEVhY2hNaW51dGUudmFsdWU7XG4gIGNvbnN0IGxhc3RUaW1lc3RhbXAgPSBsYXN0QmFsYW5jZS52YWx1ZS50aW1lc3RhbXA7XG4gIGNvbnN0IGxhc3REYXlqcyA9IGRheWpzKGxhc3RUaW1lc3RhbXApO1xuICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICBjb25zdCBoaXN0b3J5ID0gYmFsYW5jZUhpc3RvcnkudmFsdWU7XG4gIGZvciAobGV0IGkgPSBoaXN0b3J5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gaGlzdG9yeVtpXS50aW1lc3RhbXA7XG4gICAgaWYgKG5vdyA8IHRpbWVzdGFtcCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKGxhc3RCYWxhbmNlLnZhbHVlLnRpbWVzdGFtcCA8IHRpbWVzdGFtcCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICghbGFzdERheWpzLmlzU2FtZSh0aW1lc3RhbXAsICdpc29XZWVrJykpIHtcbiAgICAgIHJldHVybiBoaXN0b3J5W2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5Db2xsZWN0RmluRGF0YVBvaW50KCkge1xuICByZXR1cm4gc2VyaWFsaXplQmFsYW5jZVNoZWV0KGxpdmVCYWxhbmNlU2hlZXQpICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFja0JhbGFuY2VIaXN0b3J5KCkge1xuICBzZXRUaW1lb3V0KHRyYWNrQmFsYW5jZUhpc3RvcnksIDEwMDApO1xuICAvLyBPZmZzZXQgJ25vdycgYnkgMTAgbWludXRlcyBpbiB0aGUgcGFzdCB0byBwcmV2ZW50IHJlY29yZGluZyBvbiAyMzo1OVxuICBjb25zdCBub3cgPSBEYXRlLm5vdygpIC0gZGF5anMuZHVyYXRpb24oMTAsICdtaW51dGVzJykuYXNNaWxsaXNlY29uZHMoKTtcbiAgY29uc3QgbGFzdFJlY29yZGluZyA9IGJhbGFuY2VIaXN0b3J5LnZhbHVlLmF0KC0xKTtcbiAgY29uc3QgaGFzUmVjZW50QmFsYW5jZVJlY29yZGluZyA9XG4gICAgbGFzdFJlY29yZGluZyAmJlxuICAgIChkYXlqcyhsYXN0UmVjb3JkaW5nLnRpbWVzdGFtcCkuaXNTYW1lKG5vdywgJ2RheScpIHx8XG4gICAgICBkaWZmSG91cnMobGFzdFJlY29yZGluZy50aW1lc3RhbXAsIG5vdykgPCA4KTtcbiAgaWYgKCFoYXNSZWNlbnRCYWxhbmNlUmVjb3JkaW5nKSB7XG4gICAgY29sbGVjdEZpbkRhdGFQb2ludCgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsZWN0RmluRGF0YVBvaW50KCkge1xuICBjb25zdCBzaGVldCA9IHNlcmlhbGl6ZUJhbGFuY2VTaGVldChsaXZlQmFsYW5jZVNoZWV0KTtcbiAgaWYgKHNoZWV0KSB7XG4gICAgdXNlckRhdGEuYmFsYW5jZUhpc3RvcnkudjIucHVzaChzaGVldCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplQmFsYW5jZVNoZWV0VjFEYXRhKFxuICBkYXRhOiBVc2VyRGF0YS5CYWxhbmNlU2hlZXREYXRhVjEsXG4pOiBQYXJ0aWFsQmFsYW5jZVNoZWV0IHtcbiAgY29uc3QgW3RpbWVzdGFtcCwgY3VycmVudEFzc2V0cywgbm9uQ3VycmVudEFzc2V0cywgbGlhYmlsaXRpZXNdID0gZGF0YTtcbiAgcmV0dXJuIHtcbiAgICB0aW1lc3RhbXAsXG5cbiAgICBhc3NldHM6IHtcbiAgICAgIGN1cnJlbnQ6IHtcbiAgICAgICAgdG90YWw6IGN1cnJlbnRBc3NldHMsXG4gICAgICB9LFxuICAgICAgbm9uQ3VycmVudDoge1xuICAgICAgICB0b3RhbDogbm9uQ3VycmVudEFzc2V0cyxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIGxpYWJpbGl0aWVzOiB7XG4gICAgICB0b3RhbDogbGlhYmlsaXRpZXMsXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplQmFsYW5jZVNoZWV0VjJEYXRhKFxuICBkYXRhOiBVc2VyRGF0YS5CYWxhbmNlU2hlZXREYXRhVjIsXG4pOiBQYXJ0aWFsQmFsYW5jZVNoZWV0IHtcbiAgY29uc3QgW1xuICAgIHRpbWVzdGFtcCxcbiAgICBjYXNoLFxuICAgIGN4LFxuICAgIGZ4LFxuICAgIG1tTWF0ZXJpYWxzLFxuICAgIGFjY291bnRzUmVjZWl2YWJsZUN1cnJlbnQsXG4gICAgbG9hbnNQcmluY2lwYWxDdXJyZW50LFxuICAgIGxvYW5zSW50ZXJlc3RDdXJyZW50LFxuICAgIGN4TGlzdGVkTWF0ZXJpYWxzLFxuICAgIGN4SW52ZW50b3J5LFxuICAgIGZpbmlzaGVkR29vZHMsXG4gICAgd29ya0luUHJvZ3Jlc3MsXG4gICAgcmF3TWF0ZXJpYWxzLFxuICAgIHdvcmtmb3JjZUNvbnN1bWFibGVzLFxuICAgIG90aGVySXRlbXMsXG4gICAgZnVlbFRhbmtzLFxuICAgIG1hdGVyaWFsc0luVHJhbnNpdEN1cnJlbnQsXG4gICAgbWF0ZXJpYWxzUmVjZWl2YWJsZUN1cnJlbnQsXG4gICAgaW5mcmFzdHJ1Y3R1cmUsXG4gICAgcmVzb3VyY2VFeHRyYWN0aW9uLFxuICAgIHByb2R1Y3Rpb24sXG4gICAgYWNjdW11bGF0ZWREZXByZWNpYXRpb24sXG4gICAgc2hpcHNNYXJrZXRWYWx1ZSxcbiAgICBzaGlwc0RlcHJlY2lhdGlvbixcbiAgICBhY2NvdW50c1JlY2VpdmFibGVOb25DdXJyZW50LFxuICAgIG1hdGVyaWFsc0luVHJhbnNpdE5vbkN1cnJlbnQsXG4gICAgbWF0ZXJpYWxzUmVjZWl2YWJsZU5vbkN1cnJlbnQsXG4gICAgbG9hbnNQcmluY2lwYWxOb25DdXJyZW50LFxuICAgIGhxVXBncmFkZXMsXG4gICAgYXJjLFxuICAgIGFjY291bnRzUGF5YWJsZUN1cnJlbnQsXG4gICAgbWF0ZXJpYWxzUGF5YWJsZUN1cnJlbnQsXG4gICAgZGVidHNQcmluY2lwYWxDdXJyZW50LFxuICAgIGRlYnRzSW50ZXJlc3RDdXJyZW50LFxuICAgIGFjY291bnRzUGF5YWJsZU5vbkN1cnJlbnQsXG4gICAgbWF0ZXJpYWxzUGF5YWJsZU5vbkN1cnJlbnQsXG4gICAgZGVidHNQcmluY2lwYWxOb25DdXJyZW50LFxuICBdID0gZGF0YTtcblxuICByZXR1cm4ge1xuICAgIHRpbWVzdGFtcCxcbiAgICBhc3NldHM6IHtcbiAgICAgIGN1cnJlbnQ6IHtcbiAgICAgICAgY2FzaEFuZENhc2hFcXVpdmFsZW50czoge1xuICAgICAgICAgIGNhc2gsXG4gICAgICAgICAgZGVwb3NpdHM6IHtcbiAgICAgICAgICAgIGN4LFxuICAgICAgICAgICAgZngsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtbU1hdGVyaWFscyxcbiAgICAgICAgfSxcbiAgICAgICAgYWNjb3VudHNSZWNlaXZhYmxlOiBhY2NvdW50c1JlY2VpdmFibGVDdXJyZW50LFxuICAgICAgICBsb2Fuc1JlY2VpdmFibGU6IHtcbiAgICAgICAgICBwcmluY2lwYWw6IGxvYW5zUHJpbmNpcGFsQ3VycmVudCxcbiAgICAgICAgICBpbnRlcmVzdDogbG9hbnNJbnRlcmVzdEN1cnJlbnQsXG4gICAgICAgIH0sXG4gICAgICAgIGludmVudG9yeToge1xuICAgICAgICAgIGN4TGlzdGVkTWF0ZXJpYWxzLFxuICAgICAgICAgIGN4SW52ZW50b3J5LFxuICAgICAgICAgIG1hdGVyaWFsc0luVHJhbnNpdDogbWF0ZXJpYWxzSW5UcmFuc2l0Q3VycmVudCxcbiAgICAgICAgICBiYXNlSW52ZW50b3J5OiB7XG4gICAgICAgICAgICBmaW5pc2hlZEdvb2RzLFxuICAgICAgICAgICAgd29ya0luUHJvZ3Jlc3MsXG4gICAgICAgICAgICByYXdNYXRlcmlhbHMsXG4gICAgICAgICAgICB3b3JrZm9yY2VDb25zdW1hYmxlcyxcbiAgICAgICAgICAgIG90aGVySXRlbXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmdWVsVGFua3MsXG4gICAgICAgICAgbWF0ZXJpYWxzUmVjZWl2YWJsZTogbWF0ZXJpYWxzUmVjZWl2YWJsZUN1cnJlbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgbm9uQ3VycmVudDoge1xuICAgICAgICBidWlsZGluZ3M6IHtcbiAgICAgICAgICBtYXJrZXRWYWx1ZToge1xuICAgICAgICAgICAgaW5mcmFzdHJ1Y3R1cmUsXG4gICAgICAgICAgICByZXNvdXJjZUV4dHJhY3Rpb24sXG4gICAgICAgICAgICBwcm9kdWN0aW9uLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWNjdW11bGF0ZWREZXByZWNpYXRpb24sXG4gICAgICAgIH0sXG4gICAgICAgIHNoaXBzOiB7XG4gICAgICAgICAgbWFya2V0VmFsdWU6IHNoaXBzTWFya2V0VmFsdWUsXG4gICAgICAgICAgYWNjdW11bGF0ZWREZXByZWNpYXRpb246IHNoaXBzRGVwcmVjaWF0aW9uLFxuICAgICAgICB9LFxuICAgICAgICBsb25nVGVybVJlY2VpdmFibGVzOiB7XG4gICAgICAgICAgYWNjb3VudHNSZWNlaXZhYmxlOiBhY2NvdW50c1JlY2VpdmFibGVOb25DdXJyZW50LFxuICAgICAgICAgIG1hdGVyaWFsc1JlY2VpdmFibGU6IG1hdGVyaWFsc1JlY2VpdmFibGVOb25DdXJyZW50LFxuICAgICAgICAgIG1hdGVyaWFsc0luVHJhbnNpdDogbWF0ZXJpYWxzSW5UcmFuc2l0Tm9uQ3VycmVudCxcbiAgICAgICAgICBsb2Fuc1ByaW5jaXBhbDogbG9hbnNQcmluY2lwYWxOb25DdXJyZW50LFxuICAgICAgICB9LFxuICAgICAgICBpbnRhbmdpYmxlQXNzZXRzOiB7XG4gICAgICAgICAgaHFVcGdyYWRlcyxcbiAgICAgICAgICBhcmMsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgbGlhYmlsaXRpZXM6IHtcbiAgICAgIGN1cnJlbnQ6IHtcbiAgICAgICAgYWNjb3VudHNQYXlhYmxlOiBhY2NvdW50c1BheWFibGVDdXJyZW50LFxuICAgICAgICBtYXRlcmlhbHNQYXlhYmxlOiBtYXRlcmlhbHNQYXlhYmxlQ3VycmVudCxcbiAgICAgICAgbG9hbnNQYXlhYmxlOiB7XG4gICAgICAgICAgcHJpbmNpcGFsOiBkZWJ0c1ByaW5jaXBhbEN1cnJlbnQsXG4gICAgICAgICAgaW50ZXJlc3Q6IGRlYnRzSW50ZXJlc3RDdXJyZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIG5vbkN1cnJlbnQ6IHtcbiAgICAgICAgbG9uZ1Rlcm1QYXlhYmxlczoge1xuICAgICAgICAgIGFjY291bnRzUGF5YWJsZTogYWNjb3VudHNQYXlhYmxlTm9uQ3VycmVudCxcbiAgICAgICAgICBtYXRlcmlhbHNQYXlhYmxlOiBtYXRlcmlhbHNQYXlhYmxlTm9uQ3VycmVudCxcbiAgICAgICAgICBsb2Fuc1ByaW5jaXBhbDogZGVidHNQcmluY2lwYWxOb25DdXJyZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplQmFsYW5jZVNoZWV0KFxuICBkYXRhOiBQYXJ0aWFsQmFsYW5jZVNoZWV0LFxuKTogVXNlckRhdGEuQmFsYW5jZVNoZWV0RGF0YVYyIHwgdW5kZWZpbmVkIHtcbiAgY29uc3Qgc2hlZXQ6IChudW1iZXIgfCB1bmRlZmluZWQpW10gPSBbXG4gICAgZGF0YS50aW1lc3RhbXAsXG4gICAgZGF0YS5hc3NldHM/LmN1cnJlbnQ/LmNhc2hBbmRDYXNoRXF1aXZhbGVudHM/LmNhc2gsXG4gICAgZGF0YS5hc3NldHM/LmN1cnJlbnQ/LmNhc2hBbmRDYXNoRXF1aXZhbGVudHM/LmRlcG9zaXRzPy5jeCxcbiAgICBkYXRhLmFzc2V0cz8uY3VycmVudD8uY2FzaEFuZENhc2hFcXVpdmFsZW50cz8uZGVwb3NpdHM/LmZ4LFxuICAgIGRhdGEuYXNzZXRzPy5jdXJyZW50Py5jYXNoQW5kQ2FzaEVxdWl2YWxlbnRzPy5tbU1hdGVyaWFscyxcbiAgICBkYXRhLmFzc2V0cz8uY3VycmVudD8uYWNjb3VudHNSZWNlaXZhYmxlLFxuICAgIGRhdGEuYXNzZXRzPy5jdXJyZW50Py5sb2Fuc1JlY2VpdmFibGU/LnByaW5jaXBhbCxcbiAgICBkYXRhLmFzc2V0cz8uY3VycmVudD8ubG9hbnNSZWNlaXZhYmxlPy5pbnRlcmVzdCxcbiAgICBkYXRhLmFzc2V0cz8uY3VycmVudD8uaW52ZW50b3J5Py5jeExpc3RlZE1hdGVyaWFscyxcbiAgICBkYXRhLmFzc2V0cz8uY3VycmVudD8uaW52ZW50b3J5Py5jeEludmVudG9yeSxcbiAgICBkYXRhLmFzc2V0cz8uY3VycmVudD8uaW52ZW50b3J5Py5iYXNlSW52ZW50b3J5Py5maW5pc2hlZEdvb2RzLFxuICAgIGRhdGEuYXNzZXRzPy5jdXJyZW50Py5pbnZlbnRvcnk/LmJhc2VJbnZlbnRvcnk/LndvcmtJblByb2dyZXNzLFxuICAgIGRhdGEuYXNzZXRzPy5jdXJyZW50Py5pbnZlbnRvcnk/LmJhc2VJbnZlbnRvcnk/LnJhd01hdGVyaWFscyxcbiAgICBkYXRhLmFzc2V0cz8uY3VycmVudD8uaW52ZW50b3J5Py5iYXNlSW52ZW50b3J5Py53b3JrZm9yY2VDb25zdW1hYmxlcyxcbiAgICBkYXRhLmFzc2V0cz8uY3VycmVudD8uaW52ZW50b3J5Py5iYXNlSW52ZW50b3J5Py5vdGhlckl0ZW1zLFxuICAgIGRhdGEuYXNzZXRzPy5jdXJyZW50Py5pbnZlbnRvcnk/LmZ1ZWxUYW5rcyxcbiAgICBkYXRhLmFzc2V0cz8uY3VycmVudD8uaW52ZW50b3J5Py5tYXRlcmlhbHNJblRyYW5zaXQsXG4gICAgZGF0YS5hc3NldHM/LmN1cnJlbnQ/LmludmVudG9yeT8ubWF0ZXJpYWxzUmVjZWl2YWJsZSxcbiAgICBkYXRhLmFzc2V0cz8ubm9uQ3VycmVudD8uYnVpbGRpbmdzPy5tYXJrZXRWYWx1ZT8uaW5mcmFzdHJ1Y3R1cmUsXG4gICAgZGF0YS5hc3NldHM/Lm5vbkN1cnJlbnQ/LmJ1aWxkaW5ncz8ubWFya2V0VmFsdWU/LnJlc291cmNlRXh0cmFjdGlvbixcbiAgICBkYXRhLmFzc2V0cz8ubm9uQ3VycmVudD8uYnVpbGRpbmdzPy5tYXJrZXRWYWx1ZT8ucHJvZHVjdGlvbixcbiAgICBkYXRhLmFzc2V0cz8ubm9uQ3VycmVudD8uYnVpbGRpbmdzPy5hY2N1bXVsYXRlZERlcHJlY2lhdGlvbixcbiAgICBkYXRhLmFzc2V0cz8ubm9uQ3VycmVudD8uc2hpcHM/Lm1hcmtldFZhbHVlLFxuICAgIGRhdGEuYXNzZXRzPy5ub25DdXJyZW50Py5zaGlwcz8uYWNjdW11bGF0ZWREZXByZWNpYXRpb24sXG4gICAgZGF0YS5hc3NldHM/Lm5vbkN1cnJlbnQ/LmxvbmdUZXJtUmVjZWl2YWJsZXM/LmFjY291bnRzUmVjZWl2YWJsZSxcbiAgICBkYXRhLmFzc2V0cz8ubm9uQ3VycmVudD8ubG9uZ1Rlcm1SZWNlaXZhYmxlcz8ubWF0ZXJpYWxzSW5UcmFuc2l0LFxuICAgIGRhdGEuYXNzZXRzPy5ub25DdXJyZW50Py5sb25nVGVybVJlY2VpdmFibGVzPy5tYXRlcmlhbHNSZWNlaXZhYmxlLFxuICAgIGRhdGEuYXNzZXRzPy5ub25DdXJyZW50Py5sb25nVGVybVJlY2VpdmFibGVzPy5sb2Fuc1ByaW5jaXBhbCxcbiAgICBkYXRhLmFzc2V0cz8ubm9uQ3VycmVudD8uaW50YW5naWJsZUFzc2V0cz8uaHFVcGdyYWRlcyxcbiAgICBkYXRhLmFzc2V0cz8ubm9uQ3VycmVudD8uaW50YW5naWJsZUFzc2V0cz8uYXJjLFxuICAgIGRhdGEubGlhYmlsaXRpZXM/LmN1cnJlbnQ/LmFjY291bnRzUGF5YWJsZSxcbiAgICBkYXRhLmxpYWJpbGl0aWVzPy5jdXJyZW50Py5tYXRlcmlhbHNQYXlhYmxlLFxuICAgIGRhdGEubGlhYmlsaXRpZXM/LmN1cnJlbnQ/LmxvYW5zUGF5YWJsZT8ucHJpbmNpcGFsLFxuICAgIGRhdGEubGlhYmlsaXRpZXM/LmN1cnJlbnQ/LmxvYW5zUGF5YWJsZT8uaW50ZXJlc3QsXG4gICAgZGF0YS5saWFiaWxpdGllcz8ubm9uQ3VycmVudD8ubG9uZ1Rlcm1QYXlhYmxlcz8uYWNjb3VudHNQYXlhYmxlLFxuICAgIGRhdGEubGlhYmlsaXRpZXM/Lm5vbkN1cnJlbnQ/LmxvbmdUZXJtUGF5YWJsZXM/Lm1hdGVyaWFsc1BheWFibGUsXG4gICAgZGF0YS5saWFiaWxpdGllcz8ubm9uQ3VycmVudD8ubG9uZ1Rlcm1QYXlhYmxlcz8ubG9hbnNQcmluY2lwYWwsXG4gIF07XG4gIGlmIChzaGVldC5zb21lKHggPT4geCA9PT0gdW5kZWZpbmVkKSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIHNoZWV0Lm1hcCh4ID0+IE1hdGgucm91bmQoeCEpKSBhcyBVc2VyRGF0YS5CYWxhbmNlU2hlZXREYXRhVjI7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBT0EsTUFBQSxLQUFBLFNBQUEsTUFBQSxTQUFBLGVBQUEsR0FBQSxJQUFBLDZCQUFBLENBQUE7QUFDQSxNQUFBLEtBQUEsU0FBQSxNQUFBLFNBQUEsZUFBQSxHQUFBLElBQUEsNkJBQUEsQ0FBQTtBQUVPLE1BQUEsaUJBQUEsU0FBQSxNQUFBLEdBQUEsTUFBQSxPQUFBLEdBQUEsS0FBQSxDQUFBO0FBRUEsTUFBQSxjQUFBLFNBQUEsTUFBQTtBQUtMLHNCQUFBO0FBQ0EsUUFBQSxNQUFBLEtBQUEsSUFBQTtBQUNBLFFBQUEsV0FBQSxNQUFBLEdBQUE7QUFDQSxRQUFBLFVBQUEsZUFBQTtBQUNBLFdBQUEsSUFBQSxRQUFBLFNBQUEsR0FBQSxLQUFBLEdBQUEsS0FBQTtBQUNFLFVBQUEsWUFBQSxRQUFBLENBQUEsRUFBQTtBQUNBLFFBQUEsTUFBQSxXQUFBO0FBQ0UsYUFBQTtBQUFBLElBQU87QUFFVCxRQUFBLENBQUEsU0FBQSxPQUFBLFdBQUEsU0FBQSxHQUFBO0FBQ0UsYUFBQSxRQUFBLENBQUE7QUFBQSxJQUFnQjtBQUFBLEVBQ2xCO0FBRUYsU0FBQTtBQUNGLENBQUE7QUFFTyxNQUFBLGtCQUFBLFNBQUEsTUFBQTtBQUNMLE1BQUEsQ0FBQSxZQUFBLE9BQUE7QUFDRSxXQUFBO0FBQUEsRUFBTztBQU1ULHNCQUFBO0FBQ0EsUUFBQSxnQkFBQSxZQUFBLE1BQUE7QUFDQSxRQUFBLFlBQUEsTUFBQSxhQUFBO0FBQ0EsUUFBQSxNQUFBLEtBQUEs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
