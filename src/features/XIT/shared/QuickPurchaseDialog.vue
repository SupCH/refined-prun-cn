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

import { PlanetBurn } from '@src/core/burn';

const props = defineProps<{
  materials?: Record<string, number>;
  rawBurnData?: PlanetBurn[];
  packageNamePrefix: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

const exchanges = ['AI1', 'CI1', 'IC1', 'NC1', 'CI2', 'NC2'];
const selectedExchange = ref('IC1');

const resupplyDays = ref(userData.settings.burn.resupply);
const selectedSites = ref<string[]>(
  props.rawBurnData?.map(s => s.naturalId).filter(id => id !== '') ?? [],
);

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

const shipStorages = computed(() => getShipStorages());

const shipOptions = computed(() =>
  shipStorages.value.map(ship => ({
    value: ship.addressableId,
    label: serializeShipStorage(ship),
  })),
);

const selectedShip = ref(shipOptions.value[0]?.value ?? '');

const materialList = computed(() => {
  return Object.entries(computedMaterials.value)
    .map(([ticker, amount]) => {
      const material = materialsStore.getByTicker(ticker);
      return {
        ticker,
        name: material?.name ?? ticker,
        amount: Math.ceil(amount),
      };
    })
    .sort((a, b) => a.ticker.localeCompare(b.ticker));
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

  const packageName = generatePackageName(props.packageNamePrefix);
  const pkg = createQuickPurchasePackage(
    packageName,
    computedMaterials.value,
    selectedExchange.value,
    shipStorage,
  );

  const pkgName = addAndNavigateToPackage(pkg);
  // Use showBuffer with underscore-separated format
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
      <div :class="$style.scrollTable">
        <table :class="$style.materialTable">
          <thead>
            <tr>
              <th>{{ t('quickPurchase.material') }}</th>
              <th>{{ t('quickPurchase.amount') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in materialList" :key="item.ticker">
              <td>{{ item.ticker }}</td>
              <td>{{ fixed0(item.amount) }}</td>
            </tr>
            <tr v-if="materialList.length === 0">
              <td colspan="2" :class="$style.empty">{{ t('quickPurchase.noMaterials') }}</td>
            </tr>
          </tbody>
        </table>
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
      <PrunButton primary :disabled="!selectedShip || materialList.length === 0" @click="onConfirm">
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
