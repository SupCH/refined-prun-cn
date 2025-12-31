<script setup lang="ts">
import PrunButton from '@src/components/PrunButton.vue';
import SectionHeader from '@src/components/SectionHeader.vue';
import Tooltip from '@src/components/Tooltip.vue';
import TextInput from '@src/components/forms/TextInput.vue';
import Active from '@src/components/forms/Active.vue';
import NumberInput from '@src/components/forms/NumberInput.vue';
import Commands from '@src/components/forms/Commands.vue';
import { showConfirmationOverlay } from '@src/infrastructure/prun-ui/tile-overlay';
import { initialUserData, userData } from '@src/store/user-data';
import {
  downloadBackup,
  exportUserData,
  importUserData,
  resetUserData,
  restoreBackup,
  saveUserData,
} from '@src/infrastructure/storage/user-data-serializer';
import SelectInput from '@src/components/forms/SelectInput.vue';
import { objectId } from '@src/utils/object-id';
import {
  deleteUserDataBackup,
  getUserDataBackups,
  UserDataBackup,
} from '@src/infrastructure/storage/user-data-backup';
import { ddmmyyyy, hhForXitSet, hhmm } from '@src/utils/format';
import dayjs from 'dayjs';

const isDefault24 = computed(() => {
  return hhForXitSet.value(dayjs.duration(12, 'hours').asMilliseconds()) === '13';
});

const timeFormats = computed(() => {
  return [
    {
      label: isDefault24.value ? t('game.formats.default24') : t('game.formats.default12'),
      value: 'DEFAULT',
    },
    {
      label: t('game.formats.h24'),
      value: '24H',
    },
    {
      label: t('game.formats.h12'),
      value: '12H',
    },
  ] as { label: string; value: UserData.TimeFormat }[];
});

const exchangeChartTypes = computed(() => [
  {
    label: t('game.formats.smooth'),
    value: 'SMOOTH',
  },
  {
    label: t('game.formats.aligned'),
    value: 'ALIGNED',
  },
  {
    label: t('game.formats.raw'),
    value: 'RAW',
  },
]) as ComputedRef<{ label: string; value: UserData.ExchangeChartType }[]>;

const currencySettings = computed(() => userData.settings.currency);

const currencyPresets = computed(() => [
  {
    label: t('game.formats.default'),
    value: 'DEFAULT',
  },
  {
    label: '₳',
    value: 'AIC',
  },
  {
    label: '₡',
    value: 'CIS',
  },
  {
    label: 'ǂ',
    value: 'ICA',
  },
  {
    label: '₦',
    value: 'NCC',
  },
  {
    label: t('game.formats.custom'),
    value: 'CUSTOM',
  },
]) as ComputedRef<{ label: string; value: UserData.CurrencyPreset }[]>;

const currencyPosition = computed(() => [
  {
    label: t('game.formats.after'),
    value: 'AFTER',
  },
  {
    label: t('game.formats.before'),
    value: 'BEFORE',
  },
]) as ComputedRef<{ label: string; value: UserData.CurrencyPosition }[]>;

const currencySpacing = computed(() => [
  {
    label: t('game.formats.hasSpace'),
    value: 'HAS_SPACE',
  },
  {
    label: t('game.formats.noSpace'),
    value: 'NO_SPACE',
  },
]) as ComputedRef<{ label: string; value: UserData.CurrencySpacing }[]>;

const backups = computed(() => getUserDataBackups());

function addSidebarButton() {
  userData.settings.sidebar.push(['SET', 'XIT SET']);
}

function deleteSidebarButton(index: number) {
  userData.settings.sidebar.splice(index, 1);
}

function confirmResetSidebar(ev: Event) {
  showConfirmationOverlay(ev, () => {
    userData.settings.sidebar = structuredClone(initialUserData.settings.sidebar);
  });
}

function importUserDataAndReload() {
  importUserData(async () => {
    await saveUserData();
    window.location.reload();
  });
}

async function restoreBackupAndReload(ev: Event, backup: UserDataBackup) {
  showConfirmationOverlay(
    ev,
    async () => {
      restoreBackup(backup);
      await saveUserData();
      window.location.reload();
    },
    {
      message:
        'Are you sure you want to restore this backup? This will overwrite your current data.',
    },
  );
}

function confirmDeleteBackup(ev: Event, backup: UserDataBackup) {
  showConfirmationOverlay(ev, () => deleteUserDataBackup(backup));
}

function confirmResetAllData(ev: Event) {
  showConfirmationOverlay(ev, async () => {
    resetUserData();
    await saveUserData();
    window.location.reload();
  });
}
</script>

<template>
  <SectionHeader>{{ t('game.appearance') }}</SectionHeader>
  <form>
    <Active :label="t('game.timeFormat')">
      <SelectInput v-model="userData.settings.time" :options="timeFormats" />
    </Active>
    <Active :label="t('game.defaultChartType')">
      <SelectInput v-model="userData.settings.defaultChartType" :options="exchangeChartTypes" />
    </Active>
  </form>
  <SectionHeader>
    {{ t('game.currencySymbol') }}
    <Tooltip :class="$style.tooltip" :tooltip="t('game.currencyTooltip')" />
  </SectionHeader>
  <form>
    <Active :label="t('game.symbol')">
      <SelectInput v-model="currencySettings.preset" :options="currencyPresets" />
    </Active>
    <Active v-if="currencySettings.preset === 'CUSTOM'" :label="t('game.customSymbol')">
      <TextInput v-model="currencySettings.custom" />
    </Active>
    <Active v-if="currencySettings.preset !== 'DEFAULT'" :label="t('game.position')">
      <SelectInput v-model="currencySettings.position" :options="currencyPosition" />
    </Active>
    <Active
      v-if="currencySettings.preset !== 'DEFAULT'"
      :label="t('game.spacing')"
      :tooltip="t('game.spacingTooltip')">
      <SelectInput v-model="currencySettings.spacing" :options="currencySpacing" />
    </Active>
  </form>
  <SectionHeader>{{ t('game.burnSettings') }}</SectionHeader>
  <form>
    <Active :label="t('game.redLabel')" :tooltip="t('game.redTooltip')">
      <NumberInput v-model="userData.settings.burn.red" />
    </Active>
    <Active :label="t('game.yellowLabel')" :tooltip="t('game.yellowTooltip')">
      <NumberInput v-model="userData.settings.burn.yellow" />
    </Active>
    <Active :label="t('game.resupplyLabel')" :tooltip="t('game.resupplyTooltip')">
      <NumberInput v-model="userData.settings.burn.resupply" />
    </Active>
  </form>
  <SectionHeader>
    {{ t('game.sidebarButtons') }}
    <Tooltip :class="$style.tooltip" :tooltip="t('game.sidebarTooltip')" />
  </SectionHeader>
  <form>
    <Active
      v-for="(button, i) in userData.settings.sidebar"
      :key="objectId(button)"
      :label="t('game.buttonLabel', i + 1)">
      <div :class="$style.sidebarInputPair">
        <TextInput v-model="button[0]" :class="$style.sidebarInput" />
        <TextInput v-model="button[1]" :class="$style.sidebarInput" />
        <PrunButton danger @click="deleteSidebarButton(i)">x</PrunButton>
      </div>
    </Active>
    <Commands>
      <PrunButton primary @click="confirmResetSidebar">{{ t('game.resetSidebar') }}</PrunButton>
      <PrunButton primary @click="addSidebarButton">{{ t('game.addNew') }}</PrunButton>
    </Commands>
  </form>
  <SectionHeader>{{ t('game.importExport') }}</SectionHeader>
  <form>
    <Commands>
      <PrunButton primary @click="importUserDataAndReload">{{ t('game.importData') }}</PrunButton>
      <PrunButton primary @click="exportUserData">{{ t('game.exportData') }}</PrunButton>
    </Commands>
  </form>
  <template v-if="backups.length > 0">
    <SectionHeader>{{ t('game.backups') }}</SectionHeader>
    <form>
      <Commands
        v-for="backup in backups"
        :key="backup.timestamp"
        :label="ddmmyyyy(backup.timestamp) + ' ' + hhmm(backup.timestamp)">
        <PrunButton primary @click="downloadBackup(backup.data, backup.timestamp)">
          {{ t('game.export') }}
        </PrunButton>
        <PrunButton primary @click="restoreBackupAndReload($event, backup.data)">
          {{ t('game.restore') }}
        </PrunButton>
        <PrunButton danger @click="confirmDeleteBackup($event, backup)">{{
          t('game.delete')
        }}</PrunButton>
      </Commands>
    </form>
  </template>
  <SectionHeader>{{ t('game.dangerZone') }}</SectionHeader>
  <form>
    <Commands>
      <PrunButton danger @click="confirmResetAllData">{{ t('game.resetAllData') }}</PrunButton>
    </Commands>
  </form>
</template>

<style module>
.tooltip {
  float: revert;
  font-size: 12px;
  margin-top: -4px;
}

.sidebarInputPair {
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
}

.sidebarInput {
  width: 40%;
}

.sidebarInput input {
  width: 100%;
}
</style>
