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
  addAndNavigateToPackage,
  generatePackageName,
} from '@src/features/XIT/shared/quick-purchase-utils';
import { materialsStore } from '@src/infrastructure/prun-api/data/materials';
import { fixed0 } from '@src/utils/format';
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
const selectedExchange = ref<string>('UNIVERSE');
const selectedShip = ref<string | undefined>(undefined);
const shipStorages = ref<any[]>([]);
const selectedSites = ref<string[]>([]);
const resupplyDays = ref<number>(userData.settings.burn.resupply);

const consumableCategories = [
  'food and luxury consumables',
  'consumables (basic)',
  'medical supplies',
  'ship parts',
  'ship engines',
  'ship shields',
];

onMounted(async () => {
  shipStorages.value = await getShipStorages();
  if (shipStorages.value.length > 0) {
    selectedShip.value = shipStorages.value[0].addressableId;
  }

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

const shipOptions = computed(() =>
  shipStorages.value.map(ship => ({
    value: ship.addressableId,
    label: serializeShipStorage(ship),
  })),
);

const materialList = computed(() => {
  const allMaterials = Object.entries(computedMaterials.value)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([ticker, amount]) => {
      const material = materialsStore.getByTicker(ticker);
      return {
        ticker,
        name: material?.name || ticker,
        amount,
        category: material?.category || '',
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

function onConfirm() {
  if (!selectedShip.value) {
    return;
  }

  const shipStorage = shipStorages.value.find(s => s.addressableId === selectedShip.value);
  if (!shipStorage) {
    return;
  }

  // Ensure package name is strictly sanitized locally to bypass any potential module caching issues
  const timestamp = dayjs().format('YYYY-MM-DD_HHmm');
  const safePrefix = props.packageNamePrefix.replace(/[^a-zA-Z0-9]/g, '_');
  const packageName = `${safePrefix}_${timestamp}`;
  const pkg = createQuickPurchasePackage(
    packageName,
    computedMaterials.value,
    selectedExchange.value,
    shipStorage,
  );

  const pkgName = addAndNavigateToPackage(pkg);
  // Package name is already sanitized (no spaces or special chars)
  showBuffer(`XIT ACT_EDIT_${pkgName}`);
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

      <!-- Consumables Section -->
      <div v-if="materialList.consumables.length > 0">
        <h4 :class="$style.categoryTitle">{{ t('quickPurchase.consumables') }}</h4>
        <div :class="$style.scrollTable">
          <table :class="$style.materialTable">
            <thead>
              <tr>
                <th>{{ t('quickPurchase.material') }}</th>
                <th>{{ t('quickPurchase.amount') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in materialList.consumables" :key="item.ticker">
                <td>{{ item.ticker }}</td>
                <td>{{ fixed0(item.amount) }}</td>
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
                <th>{{ t('quickPurchase.material') }}</th>
                <th>{{ t('quickPurchase.amount') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in materialList.rawMaterials" :key="item.ticker">
                <td>{{ item.ticker }}</td>
                <td>{{ fixed0(item.amount) }}</td>
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

    <div :class="$style.buttons">
      <PrunButton
        primary
        :disabled="!selectedShip || materialList.all.length === 0"
        @click="onConfirm">
        {{ t('quickPurchase.confirm') }}
      </PrunButton>
      <PrunButton @click="emit('close')">
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
</style>
