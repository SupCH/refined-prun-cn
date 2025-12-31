<script setup lang="ts">
import BalanceSheetSection from '@src/features/XIT/FINBS/BalanceSheetSection.vue';
import * as summary from '@src/core/balance/balance-sheet-summary';
import { SectionData } from '@src/features/XIT/FINBS/balance-section';
import { liveBalanceSheet } from '@src/core/balance/balance-sheet-live';
import { ddmmyyyy } from '@src/utils/format';
import { lastBalance, previousBalance } from '@src/store/user-data-balance';

const currentAssets = computed<SectionData>(() => ({
  name: t('finbs.currentAssets'),
  total: summary.calcTotalCurrentAssets,
  children: [
    {
      name: t('finbs.cashAndCashEquivalents'),
      value: summary.calcTotalCashAndCashEquivalents,
      children: [
        {
          name: t('finbs.cash'),
          value: x => x.assets?.current?.cashAndCashEquivalents?.cash,
        },
        {
          name: t('finbs.deposits'),
          value: summary.calcTotalDeposits,
          children: [
            {
              name: t('finbs.cx'),
              value: x => x.assets?.current?.cashAndCashEquivalents?.deposits?.cx,
            },
            {
              name: t('finbs.fx'),
              value: x => x.assets?.current?.cashAndCashEquivalents?.deposits?.fx,
            },
          ],
        },
        {
          name: t('finbs.mmMaterials'),
          tooltip: t('finbs.mmMaterialsTooltip'),
          value: x => x.assets?.current?.cashAndCashEquivalents?.mmMaterials,
        },
      ],
    },
    {
      name: t('finbs.accountsReceivable'),
      value: x => x.assets?.current?.accountsReceivable,
    },
    {
      name: t('finbs.loansReceivable'),
      value: summary.calcTotalLoansReceivable,
      children: [
        {
          name: t('finbs.principal'),
          value: x => x.assets?.current?.loansReceivable?.principal,
        },
        {
          name: t('finbs.interest'),
          value: x => x.assets?.current?.loansReceivable?.interest,
        },
      ],
    },
    {
      name: t('finbs.inventory'),
      value: summary.calcTotalInventory,
      children: [
        {
          name: t('finbs.cxListedMaterials'),
          value: x => x.assets?.current?.inventory?.cxListedMaterials,
        },
        {
          name: t('finbs.cxInventory'),
          value: x => x.assets?.current?.inventory?.cxInventory,
        },
        {
          name: t('finbs.materialsInTransit'),
          value: x => x.assets?.current?.inventory?.materialsInTransit,
        },
        {
          name: t('finbs.baseInventory'),
          value: summary.calcTotalBaseInventory,
          children: [
            {
              name: t('finbs.finishedGoods'),
              value: x => x.assets?.current?.inventory?.baseInventory?.finishedGoods,
            },
            {
              name: t('finbs.wip'),
              value: x => x.assets?.current?.inventory?.baseInventory?.workInProgress,
            },
            {
              name: t('finbs.rawMaterials'),
              value: x => x.assets?.current?.inventory?.baseInventory?.rawMaterials,
            },
            {
              name: t('finbs.workforceConsumables'),
              value: x => x.assets?.current?.inventory?.baseInventory?.workforceConsumables,
            },
            {
              name: t('finbs.otherItems'),
              value: x => x.assets?.current?.inventory?.baseInventory?.otherItems,
            },
          ],
        },
        {
          name: t('finbs.fuelTanks'),
          value: x => x.assets?.current?.inventory?.fuelTanks,
        },
        {
          name: t('finbs.materialsReceivable'),
          value: x => x.assets?.current?.inventory?.materialsReceivable,
        },
      ],
    },
  ],
}));

const nonCurrentAssets = computed<SectionData>(() => ({
  name: t('finbs.nonCurrentAssets'),
  total: summary.calcTotalNonCurrentAssets,
  children: [
    {
      name: t('finbs.buildingsNet'),
      value: summary.calcTotalBuildings,
      children: [
        {
          name: t('finbs.marketValue'),
          value: summary.calcTotalBuildingsMarketValue,
          children: [
            {
              name: t('finbs.infrastructure'),
              value: x => x.assets?.nonCurrent?.buildings?.marketValue?.infrastructure,
            },
            {
              name: t('finbs.resourceExtraction'),
              value: x => x.assets?.nonCurrent?.buildings?.marketValue?.resourceExtraction,
            },
            {
              name: t('finbs.production'),
              value: x => x.assets?.nonCurrent?.buildings?.marketValue?.production,
            },
          ],
        },
        {
          name: t('finbs.accDepreciation'),
          less: true,
          value: x => x.assets?.nonCurrent?.buildings?.accumulatedDepreciation,
        },
      ],
    },
    {
      name: t('finbs.shipsNet'),
      value: summary.calcTotalShips,
      children: [
        {
          name: t('finbs.marketValue'),
          value: x => x.assets?.nonCurrent?.ships?.marketValue,
        },
        {
          name: t('finbs.accDepreciation'),
          less: true,
          value: x => x.assets?.nonCurrent?.ships?.accumulatedDepreciation,
        },
      ],
    },
    {
      name: t('finbs.longTermReceivables'),
      value: summary.calcTotalLongTermReceivables,
      children: [
        {
          name: t('finbs.accountsReceivable'),
          value: x => x.assets?.nonCurrent?.longTermReceivables?.accountsReceivable,
        },
        {
          name: t('finbs.materialsInTransit'),
          value: x => x.assets?.nonCurrent?.longTermReceivables?.materialsInTransit,
        },
        {
          name: t('finbs.materialsReceivable'),
          value: x => x.assets?.nonCurrent?.longTermReceivables?.materialsReceivable,
        },
        {
          name: t('finbs.loansPrincipal'),
          value: x => x.assets?.nonCurrent?.longTermReceivables?.loansPrincipal,
        },
      ],
    },
    {
      name: t('finbs.intangibleAssets'),
      value: summary.calcTotalIntangibleAssets,
      children: [
        {
          name: t('finbs.hqUpgrades'),
          value: x => x.assets?.nonCurrent?.intangibleAssets?.hqUpgrades,
        },
        {
          name: t('finbs.arc'),
          value: x => x.assets?.nonCurrent?.intangibleAssets?.arc,
        },
      ],
    },
  ],
}));

const currentLiabilities = computed<SectionData>(() => ({
  name: t('finbs.currentLiabilities'),
  total: summary.calcTotalCurrentLiabilities,
  children: [
    {
      name: t('finbs.accountsPayable'),
      value: x => x.liabilities?.current?.accountsPayable,
    },
    {
      name: t('finbs.materialsPayable'),
      value: x => x.liabilities?.current?.materialsPayable,
    },
    {
      name: t('finbs.loansPayable'),
      value: summary.calcTotalLoansPayable,
      children: [
        {
          name: t('finbs.principal'),
          value: x => x.liabilities?.current?.loansPayable?.principal,
        },
        {
          name: t('finbs.interest'),
          value: x => x.liabilities?.current?.loansPayable?.interest,
        },
      ],
    },
  ],
}));

const nonCurrentLiabilities = computed<SectionData>(() => ({
  name: t('finbs.nonCurrentLiabilities'),
  total: summary.calcTotalNonCurrentLiabilities,
  children: [
    {
      name: t('finbs.longTermPayables'),
      value: summary.calcTotalLongTermPayables,
      children: [
        {
          name: t('finbs.accountsPayable'),
          value: x => x.liabilities?.nonCurrent?.longTermPayables?.accountsPayable,
        },
        {
          name: t('finbs.materialsPayable'),
          value: x => x.liabilities?.nonCurrent?.longTermPayables?.materialsPayable,
        },
        {
          name: t('finbs.loansPrincipal'),
          value: x => x.liabilities?.nonCurrent?.longTermPayables?.loansPrincipal,
        },
      ],
    },
  ],
}));

const equity = computed<SectionData>(() => ({
  name: t('finbs.equity'),
  coloredTotal: true,
  total: summary.calcEquity,
  children: [
    {
      name: t('finbs.totalAssets'),
      value: summary.calcTotalAssets,
    },
    {
      name: t('finbs.totalLiabilities'),
      less: true,
      value: summary.calcTotalLiabilities,
    },
  ],
}));

const sections = [
  currentAssets,
  nonCurrentAssets,
  currentLiabilities,
  nonCurrentLiabilities,
  equity,
];
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>{{ t('finbs.currentPeriod') }}</th>
        <th>
          <template v-if="lastBalance">{{ ddmmyyyy(lastBalance.timestamp) }}</template>
          <template v-else>{{ t('finbs.lastPeriod') }}</template>
        </th>
        <th>
          <template v-if="previousBalance">{{ ddmmyyyy(previousBalance.timestamp) }}</template>
          <template v-else>{{ t('finbs.previousPeriod') }}</template>
        </th>
        <th>{{ t('finbs.change') }}</th>
      </tr>
    </thead>
    <BalanceSheetSection
      v-for="section in sections"
      :key="section.value.name"
      :current="liveBalanceSheet"
      :last="lastBalance"
      :previous="previousBalance"
      :section="section.value" />
  </table>
</template>

<style scoped>
table tr > :not(:first-child) {
  text-align: right;
}
</style>
