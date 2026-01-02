<script setup lang="ts">
import Active from '@src/components/forms/Active.vue';
import SelectInput from '@src/components/forms/SelectInput.vue';
import NumberInput from '@src/components/forms/NumberInput.vue';
import PrunButton from '@src/components/PrunButton.vue';
import { userData } from '@src/store/user-data';
import {
  getShipStorages,
  serializeShipStorage,
  createQuickPurchasePackage,
  createPriceFetchPackage,
  addAndNavigateToPackage,
  generatePackageName,
} from '@src/features/XIT/shared/quick-purchase-utils';
import { materialsStore } from '@src/infrastructure/prun-api/data/materials';
import { materialCategoriesStore } from '@src/infrastructure/prun-api/data/material-categories';
import { cxobStore } from '@src/infrastructure/prun-api/data/cxob';
import { fixed0, fixed02 } from '@src/utils/format';
import { showBuffer } from '@src/infrastructure/prun-ui/buffers';
import dayjs from 'dayjs';
import { t } from '@src/infrastructure/i18n';

import { PlanetBurn } from '@src/core/burn';

const props = defineProps<{
  materials?: Record<string, number>;
  packageNamePrefix: string;
  rawBurnData?: PlanetBurn[];
}>();

const emit = defineEmits<(e: 'close') => void>();

const exchanges = ['AI1', 'CI1', 'IC1', 'NC1', 'CI2', 'NC2'];
const selectedExchange = ref<string>('AI1');
const selectedShip = ref<string | undefined>(undefined);
const shipStorages = ref<any[]>([]);
const selectedSites = ref<string[]>([]);
const resupplyDays = ref<number>(userData.settings.burn.resupply);

// Material selection state
const selectedMaterials = ref<Set<string>>(new Set());

const consumableCategories = [
  'food',
  'beverage',
  'drink',
  'luxury',
  'consumable',
  'medical',
  'apparel',
  'clothing',
  'wear',
  'textile',
  'provision',
  'workforce',
  'overall',
  'ship part',
  'ship engine',
  'ship shield',
  'fuel',
];

onMounted(async () => {
  shipStorages.value = await getShipStorages();
  selectedShip.value = 'local';

  if (props.rawBurnData) {
    selectedSites.value = props.rawBurnData
      .filter(burn => burn.naturalId !== '')
      .map(burn => burn.naturalId);
  }
});

const computedMaterials = computed(() => {
  if (props.rawBurnData) {
    const materials: Record<string, number> = {};
    for (const burn of props.rawBurnData) {
      if (burn.naturalId === '' || !selectedSites.value.includes(burn.naturalId)) continue;

      for (const [ticker, burnData] of Object.entries(burn.burn)) {
        if (burnData.dailyAmount >= 0) continue;
        const need = Math.max(0, resupplyDays.value * -burnData.dailyAmount - burnData.inventory);
        if (need > 0) {
          materials[ticker] = (materials[ticker] || 0) + need;
        }
      }
    }
    return materials;
  }
  return props.materials || {};
});

// Auto-select all materials when they change
watch(
  computedMaterials,
  newMaterials => {
    Object.keys(newMaterials).forEach(ticker => selectedMaterials.value.add(ticker));
  },
  { immediate: true },
);

const shipOptions = computed(() => {
  const options = shipStorages.value.map(ship => ({
    value: ship.addressableId,
    label: serializeShipStorage(ship),
  }));

  options.unshift({
    value: 'local',
    label: t('quickPurchase.localWarehouse'),
  });

  return options;
});

const materialList = computed(() => {
  const allMaterials = Object.entries(computedMaterials.value)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([ticker, amount]) => {
      const material = materialsStore.getByTicker(ticker);
      const cxTicker = `${ticker}.${selectedExchange.value}`;
      const orderBook = cxobStore.getByTicker(cxTicker);
      let unitPrice: number | undefined = undefined;
      if (orderBook && orderBook.sellingOrders.length > 0) {
        // Get lowest ask price
        const sortedOrders = orderBook.sellingOrders
          .slice()
          .sort((a, b) => a.limit.amount - b.limit.amount);
        unitPrice = sortedOrders[0]?.limit.amount;
      }
      return {
        ticker,
        name: material?.name || ticker,
        amount,
        category: materialCategoriesStore.getById(material?.category)?.name || '',
        unitPrice,
        totalPrice: unitPrice ? unitPrice * amount : undefined,
      };
    });

  const consumables = allMaterials.filter(m =>
    consumableCategories.some(cat => m.category.toLowerCase().includes(cat)),
  );

  const rawMaterials = allMaterials.filter(
    m => !consumableCategories.some(cat => m.category.toLowerCase().includes(cat)),
  );

  return { consumables, rawMaterials, all: allMaterials };
});

function toggleSite(naturalId: string) {
  const index = selectedSites.value.indexOf(naturalId);
  if (index > -1) {
    selectedSites.value.splice(index, 1);
  } else {
    selectedSites.value.push(naturalId);
  }
}

// Material selection functions
function toggleMaterial(ticker: string) {
  if (selectedMaterials.value.has(ticker)) {
    selectedMaterials.value.delete(ticker);
  } else {
    selectedMaterials.value.add(ticker);
  }
}

const isAllConsumablesSelected = computed(() => {
  const consumables = materialList.value.consumables;
  return consumables.length > 0 && consumables.every(m => selectedMaterials.value.has(m.ticker));
});

function toggleAllConsumables() {
  if (isAllConsumablesSelected.value) {
    materialList.value.consumables.forEach(m => selectedMaterials.value.delete(m.ticker));
  } else {
    materialList.value.consumables.forEach(m => selectedMaterials.value.add(m.ticker));
  }
}

const isAllRawSelected = computed(() => {
  const raw = materialList.value.rawMaterials;
  return raw.length > 0 && raw.every(m => selectedMaterials.value.has(m.ticker));
});

function toggleAllRawMaterials() {
  if (isAllRawSelected.value) {
    materialList.value.rawMaterials.forEach(m => selectedMaterials.value.delete(m.ticker));
  } else {
    materialList.value.rawMaterials.forEach(m => selectedMaterials.value.add(m.ticker));
  }
}

function clearAllSelections() {
  selectedMaterials.value.clear();
}

// Calculate total estimated cost for selected materials
const totalEstimatedCost = computed(() => {
  let total = 0;
  let hasAllPrices = true;
  for (const item of materialList.value.all) {
    if (selectedMaterials.value.has(item.ticker)) {
      if (item.totalPrice) {
        total += item.totalPrice;
      } else {
        hasAllPrices = false;
      }
    }
  }
  return { total, hasAllPrices };
});

function onConfirm() {
  if (!selectedShip.value) {
    return;
  }

  let shipStorage: any = undefined;
  if (selectedShip.value !== 'local') {
    shipStorage = shipStorages.value.find(s => s.addressableId === selectedShip.value);
    if (!shipStorage) {
      return;
    }
  }

  // Check if any materials are selected
  if (selectedMaterials.value.size === 0) {
    alert(t('quickPurchase.noMaterialsSelected'));
    return;
  }

  // Filter materials by selection
  const filteredMaterials: Record<string, number> = {};
  for (const [ticker, amount] of Object.entries(computedMaterials.value)) {
    if (selectedMaterials.value.has(ticker)) {
      filteredMaterials[ticker] = amount;
    }
  }

  // Use space-based name for storage (project convention), but NO colons or special chars
  const timestamp = dayjs().format('YYYY-MM-DD HHmm');
  const packageName = `${props.packageNamePrefix} ${timestamp}`;
  const pkg = createQuickPurchasePackage(
    packageName,
    filteredMaterials,
    selectedExchange.value,
    shipStorage,
  );

  const pkgName = addAndNavigateToPackage(pkg);
  // Navigation command MUST use underscores instead of spaces
  showBuffer(`XIT ACT_EDIT_${pkgName.split(' ').join('_')}`);
  emit('close');
}

function openPrice(ticker: string) {
  showBuffer(`CXPO ${ticker}.${selectedExchange.value}`);
}

function onCreatePriceFetch() {
  const tickers: string[] = [];
  for (const item of materialList.value.all) {
    if (selectedMaterials.value.has(item.ticker)) {
      tickers.push(item.ticker);
    }
  }

  if (tickers.length === 0) {
    alert(t('quickPurchase.noMaterialsSelected'));
    return;
  }

  const timestamp = dayjs().format('YYYY-MM-DD HHmm');
  const packageName = `FETCH ${selectedExchange.value} ${timestamp}`;
  const pkg = createPriceFetchPackage(packageName, tickers, selectedExchange.value);
  const pkgName = addAndNavigateToPackage(pkg);
  showBuffer(`XIT ACT_EDIT_${pkgName.split(' ').join('_')}`);
  emit('close');
}
</script>

<template>
  <div :class="$style.container">
    <h2>{{ t('quickPurchase.title') }}</h2>

    <div v-if="rawBurnData && rawBurnData.length > 0" :class="$style.section">
      <div :class="$style.flexRow">
        <Active :label="t('quickPurchase.resupplyDays')">
          <NumberInput v-model="resupplyDays" />
        </Active>
      </div>
      <h3>{{ t('quickPurchase.selectSites') }}</h3>
      <div :class="$style.siteGrid">
        <div
          v-for="site in rawBurnData.filter(s => s.naturalId !== '')"
          :key="site.naturalId"
          :class="$style.siteItem"
          @click="toggleSite(site.naturalId)">
          <input type="checkbox" :checked="selectedSites.includes(site.naturalId)" @click.stop />
          <span>{{ site.planetName }} ({{ site.naturalId }})</span>
        </div>
      </div>
    </div>

    <div :class="$style.section">
      <h3>{{ t('quickPurchase.materialList') }}</h3>

      <!-- Selection Buttons -->
      <div :class="$style.selectionButtons">
        <PrunButton
          :primary="!isAllConsumablesSelected"
          :danger="isAllConsumablesSelected"
          @click="toggleAllConsumables">
          {{
            isAllConsumablesSelected
              ? t('quickPurchase.deselectAllConsumables')
              : t('quickPurchase.selectAllConsumables')
          }}
        </PrunButton>
        <PrunButton
          :primary="!isAllRawSelected"
          :danger="isAllRawSelected"
          @click="toggleAllRawMaterials">
          {{
            isAllRawSelected
              ? t('quickPurchase.deselectAllRawMaterials')
              : t('quickPurchase.selectAllRawMaterials')
          }}
        </PrunButton>
        <PrunButton dark @click="clearAllSelections">{{
          t('quickPurchase.clearSelections')
        }}</PrunButton>
        <span :class="$style.selectedCount"
          >{{ t('quickPurchase.selected') }}: {{ selectedMaterials.size }}</span
        >
      </div>

      <!-- Consumables Section -->
      <div v-if="materialList.consumables.length > 0">
        <h4 :class="$style.categoryTitle">{{ t('quickPurchase.consumables') }}</h4>
        <div :class="$style.scrollTable">
          <table :class="$style.materialTable">
            <thead>
              <tr>
                <th style="width: 40px"></th>
                <th>{{ t('quickPurchase.material') }}</th>
                <th>{{ t('quickPurchase.amount') }}</th>
                <th>{{ t('quickPurchase.unitPrice') }}</th>
                <th>{{ t('quickPurchase.totalCost') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in materialList.consumables"
                :key="item.ticker"
                @click="toggleMaterial(item.ticker)"
                :class="$style.clickableRow">
                <td>
                  <input
                    type="checkbox"
                    :checked="selectedMaterials.has(item.ticker)"
                    @click.stop="toggleMaterial(item.ticker)" />
                </td>
                <td>{{ item.ticker }}</td>
                <td>{{ fixed0(item.amount) }}</td>
                <td :class="{ [$style.noData]: !item.unitPrice }">
                  <span v-if="item.unitPrice">{{ fixed02(item.unitPrice) }}</span>
                  <span v-else @click.stop="openPrice(item.ticker)" :class="$style.loadLink">{{
                    t('quickPurchase.load')
                  }}</span>
                </td>
                <td :class="{ [$style.noData]: !item.totalPrice }">{{
                  item.totalPrice ? fixed0(item.totalPrice) : '--'
                }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Raw Materials Section -->
      <div v-if="materialList.rawMaterials.length > 0" :class="$style.rawMaterialsSection">
        <h4 :class="$style.categoryTitle">{{ t('quickPurchase.rawMaterials') }}</h4>
        <div :class="$style.scrollTable">
          <table :class="$style.materialTable">
            <thead>
              <tr>
                <th style="width: 40px"></th>
                <th>{{ t('quickPurchase.material') }}</th>
                <th>{{ t('quickPurchase.amount') }}</th>
                <th>{{ t('quickPurchase.unitPrice') }}</th>
                <th>{{ t('quickPurchase.totalCost') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in materialList.rawMaterials"
                :key="item.ticker"
                @click="toggleMaterial(item.ticker)"
                :class="$style.clickableRow">
                <td>
                  <input
                    type="checkbox"
                    :checked="selectedMaterials.has(item.ticker)"
                    @click.stop="toggleMaterial(item.ticker)" />
                </td>
                <td>{{ item.ticker }}</td>
                <td>{{ fixed0(item.amount) }}</td>
                <td :class="{ [$style.noData]: !item.unitPrice }">{{
                  item.unitPrice ? fixed02(item.unitPrice) : '--'
                }}</td>
                <td :class="{ [$style.noData]: !item.totalPrice }">{{
                  item.totalPrice ? fixed0(item.totalPrice) : '--'
                }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="materialList.all.length === 0" :class="$style.empty">
        {{ t('quickPurchase.noMaterials') }}
      </div>
    </div>

    <form :class="$style.form">
      <Active :label="t('quickPurchase.selectExchange')">
        <SelectInput v-model="selectedExchange" :options="exchanges" />
      </Active>
      <Active :label="t('quickPurchase.selectShip')">
        <SelectInput v-if="shipOptions.length > 0" v-model="selectedShip" :options="shipOptions" />
        <div v-else :class="$style.error">{{ t('quickPurchase.noShips') }}</div>
      </Active>
    </form>

    <!-- Total Cost Summary -->
    <div :class="$style.totalCostSection" v-if="selectedMaterials.size > 0">
      <span>{{ t('quickPurchase.estimatedTotal') }}: </span>
      <strong v-if="totalEstimatedCost.hasAllPrices">{{ fixed0(totalEstimatedCost.total) }}</strong>
      <span v-else :class="$style.noData"
        >{{ fixed0(totalEstimatedCost.total) }}+ ({{ t('quickPurchase.missingPrices') }})</span
      >
    </div>

    <!-- Price Fetch Helper -->
    <div
      :class="$style.fetchSection"
      v-if="!totalEstimatedCost.hasAllPrices && selectedMaterials.size > 0">
      <div :class="$style.fetchInfo">
        {{ t('quickPurchase.createPriceFetchDesc') }}
      </div>
      <PrunButton @click="onCreatePriceFetch" :class="$style.fetchButton" primary>
        {{ t('quickPurchase.createPriceFetch') }}
      </PrunButton>
    </div>

    <div :class="$style.buttons">
      <PrunButton
        primary
        :disabled="!selectedShip || materialList.all.length === 0"
        @click="onConfirm">
        {{ t('quickPurchase.confirm') }}
      </PrunButton>
      <PrunButton primary @click="emit('close')">
        {{ t('quickPurchase.cancel') }}
      </PrunButton>
    </div>
  </div>
</template>

<style module>
.container {
  padding: 16px;
  min-width: 400px;
}

.section {
  margin: 16px 0;
}

.categoryTitle {
  font-size: 14px;
  font-weight: 600;
  margin: 12px 0 8px 0;
  color: var(--color-text);
}

.rawMaterialsSection {
  margin-top: 16px;
}

.materialTable {
  width: 100%;
  border-collapse: collapse;
}

.materialTable th,
.materialTable td {
  padding: 4px 8px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.materialTable th {
  font-weight: bold;
}

.form {
  margin: 16px 0;
}

.flexRow {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 8px;
}

.siteGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
  margin-top: 8px;
  max-height: 120px;
  overflow-y: auto;
  padding: 8px;
  background: var(--color-background-light);
  border: 1px solid var(--color-border);
}

.siteItem {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.siteItem:hover {
  background: var(--color-background-lighter);
}

.scrollTable {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid var(--color-border);
}

.empty {
  text-align: center;
  padding: 16px;
  color: var(--color-text-muted);
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 16px;
}

.error {
  color: var(--color-error);
}

.selectionButtons {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.selectedCount {
  margin-left: auto;
  font-weight: bold;
  color: var(--color-text);
}

.clickableRow {
  cursor: pointer;
}

.clickableRow:hover {
  background: var(--color-background-lighter);
}

.noData {
  color: var(--color-text-muted);
  font-style: italic;
}

.loadLink {
  color: var(--color-primary);
  text-decoration: underline;
  cursor: pointer;
}

.loadLink:hover {
  filter: brightness(1.2);
}

.fetchSection {
  margin-top: 8px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fetchInfo {
  font-size: 0.9em;
  color: var(--color-text-subtle);
  margin-right: 12px;
  flex: 1;
}

.fetchButton {
  white-space: nowrap;
  font-size: 0.9em;
  padding: 4px 8px;
}
</style>
