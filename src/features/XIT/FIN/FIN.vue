<script setup lang="ts">
import { calculateLocationAssets } from '@src/core/financials';
import KeyFigures from '@src/features/XIT/FIN/KeyFigures.vue';
import FinHeader from '@src/features/XIT/FIN/FinHeader.vue';
import {
  fixed0,
  fixed1,
  fixed2,
  formatCurrency,
  percent0,
  percent1,
  percent2,
} from '@src/utils/format';
import { liveBalanceSummary } from '@src/core/balance/balance-sheet-live';

const locations = computed(() => calculateLocationAssets());

function formatRatio(ratio: number | undefined) {
  if (ratio === undefined) {
    return '--';
  }
  if (!isFinite(ratio)) {
    return 'N/A';
  }
  const absRatio = Math.abs(ratio);
  if (absRatio > 1000) {
    return ratio > 0 ? '> 1,000' : '< -1,000';
  }
  if (absRatio > 100) {
    return fixed0(ratio);
  }
  if (absRatio > 10) {
    return fixed1(ratio);
  }
  return fixed2(ratio);
}

function formatPercentage(ratio: number | undefined) {
  if (ratio === undefined) {
    return '--';
  }
  if (!isFinite(ratio)) {
    return 'N/A';
  }
  const absRatio = Math.abs(ratio);
  if (absRatio > 10) {
    return ratio > 0 ? '> 1,000%' : '< -1,000%';
  }
  if (absRatio > 1) {
    return percent0(ratio);
  }
  if (absRatio > 0.1) {
    return percent1(ratio);
  }
  return percent2(ratio);
}

const figures = computed(() => {
  return [
    {
      name: t('fin.quickAssets'),
      value: formatCurrency(liveBalanceSummary.quickAssets),
      tooltip: t('fin.quickAssetsTooltip'),
    },
    {
      name: t('fin.currentAssets'),
      value: formatCurrency(liveBalanceSummary.currentAssets),
    },
    { name: t('fin.totalAssets'), value: formatCurrency(liveBalanceSummary.totalAssets) },
    { name: t('fin.equity'), value: formatCurrency(liveBalanceSummary.equity) },
    {
      name: t('fin.quickLiabilities'),
      value: formatCurrency(liveBalanceSummary.quickLiabilities),
      tooltip: t('fin.quickLiabilitiesTooltip'),
    },
    {
      name: t('fin.currentLiabilities'),
      value: formatCurrency(liveBalanceSummary.currentLiabilities),
    },
    {
      name: t('fin.totalLiabilities'),
      value: formatCurrency(liveBalanceSummary.liabilities),
    },
    {
      name: t('fin.liquidationValue'),
      value: formatCurrency(liveBalanceSummary.liquidationValue),
      tooltip: t('fin.liquidationValueTooltip'),
    },
    {
      name: t('fin.quickRatio'),
      value: formatRatio(liveBalanceSummary.acidTestRatio),
      tooltip: t('fin.quickRatioTooltip'),
    },
    {
      name: t('fin.debtRatio'),
      value: formatPercentage(liveBalanceSummary.debtRatio),
      tooltip: t('fin.debtRatioTooltip'),
    },
  ];
});
</script>

<template>
  <FinHeader>{{ t('fin.keyFigures') }}</FinHeader>
  <KeyFigures :figures="figures" />
  <FinHeader>{{ t('fin.inventoryBreakdown') }}</FinHeader>
  <table>
    <thead>
      <tr>
        <th>{{ t('fin.name') }}</th>
        <th>{{ t('fin.nonCurrentAssets') }}</th>
        <th>{{ t('fin.currentAssets') }}</th>
        <th>{{ t('fin.totalAssetsTable') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="location in locations" :key="location.name">
        <td>{{ location.name }}</td>
        <td>{{ fixed0(location.nonCurrent) }}</td>
        <td>{{ fixed0(location.current) }}</td>
        <td>{{ fixed0(location.total) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table tr > :not(:first-child) {
  text-align: right;
}
</style>
