<script setup lang="ts">
import Active from '@src/components/forms/Active.vue';
import SelectInput from '@src/components/forms/SelectInput.vue';
import PrunButton from '@src/components/PrunButton.vue';
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

const { materials, packageNamePrefix } = defineProps<{
  materials: Record<string, number>;
  packageNamePrefix: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

const exchanges = ['AI1', 'CI1', 'IC1', 'NC1', 'CI2', 'NC2'];
const selectedExchange = ref('IC1');

const shipStorages = computed(() => getShipStorages());

const shipOptions = computed(() =>
  shipStorages.value.map(ship => ({
    value: ship.addressableId,
    label: serializeShipStorage(ship),
  })),
);

const selectedShip = ref(shipOptions.value[0]?.value ?? '');

const materialList = computed(() => {
  return Object.entries(materials)
    .map(([ticker, amount]) => {
      const material = materialsStore.getByTicker(ticker);
      return {
        ticker,
        name: material?.name ?? ticker,
        amount,
      };
    })
    .sort((a, b) => a.ticker.localeCompare(b.ticker));
});

function onConfirm() {
  if (!selectedShip.value) {
    return;
  }

  const shipStorage = shipStorages.value.find(s => s.addressableId === selectedShip.value);
  if (!shipStorage) {
    return;
  }

  const packageName = generatePackageName(packageNamePrefix);
  const pkg = createQuickPurchasePackage(
    packageName,
    materials,
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

    <div :class="$style.section">
      <h3>{{ t('quickPurchase.materialList') }}</h3>
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
        </tbody>
      </table>
    </div>

    <form :class="$style.form">
      <Active :label="t('quickPurchase.selectExchange')">
        <SelectInput v-model="selectedExchange" :options="exchanges" />
      </Active>
      <Active :label="t('quickPurchase.selectShip')">
        <SelectInput
          v-if="shipOptions.length > 0"
          v-model="selectedShip"
          :options="shipOptions.map(o => o.label)" />
        <div v-else :class="$style.error">{{ t('quickPurchase.noShips') }}</div>
      </Active>
    </form>

    <div :class="$style.buttons">
      <PrunButton primary :disabled="!selectedShip" @click="onConfirm">
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
