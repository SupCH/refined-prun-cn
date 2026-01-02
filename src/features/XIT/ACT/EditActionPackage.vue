<script setup lang="ts">
import Header from '@src/components/Header.vue';
import SectionHeader from '@src/components/SectionHeader.vue';
import Commands from '@src/components/forms/Commands.vue';
import PrunButton from '@src/components/PrunButton.vue';
import { showConfirmationOverlay, showTileOverlay } from '@src/infrastructure/prun-ui/tile-overlay';
import removeArrayElement from '@src/utils/remove-array-element';
import { objectId } from '@src/utils/object-id';
import { act } from '@src/features/XIT/ACT/act-registry';
import { showBuffer } from '@src/infrastructure/prun-ui/buffers';
import EditMaterialGroup from '@src/features/XIT/ACT/EditMaterialGroup.vue';
import EditAction from '@src/features/XIT/ACT/EditAction.vue';
import { downloadJson } from '@src/utils/json-file';
import { deepToRaw } from '@src/utils/deep-to-raw';
import RenameActionPackage from '@src/features/XIT/ACT/RenameActionPackage.vue';

import { t } from '@src/infrastructure/i18n';

const { pkg } = defineProps<{ pkg: UserData.ActionPackageData }>();

function onAddMaterialGroupClick(e: Event) {
  const group: UserData.MaterialGroupData = {
    name: '',
    type: 'Resupply',
  };
  showTileOverlay(e, EditMaterialGroup, {
    add: true,
    group,
    onSave: () => pkg.groups.push(group),
  });
}

function onEditMaterialGroupClick(e: Event, group: UserData.MaterialGroupData) {
  showTileOverlay(e, EditMaterialGroup, { group });
}

function onDeleteMaterialGroupClick(e: Event, group: UserData.MaterialGroupData) {
  showConfirmationOverlay(e, () => removeArrayElement(pkg.groups, group), {
    message: t('act.deleteGroupConfirm', group.name || '--'),
    confirmLabel: t('act.delete'),
  });
}

function onAddActionClick(e: Event) {
  const action: UserData.ActionData = {
    name: '',
    type: 'MTRA',
  };
  showTileOverlay(e, EditAction, {
    add: true,
    action,
    pkg,
    onSave: () => pkg.actions.push(action),
  });
}

function onEditActionClick(e: Event, action: UserData.ActionData) {
  showTileOverlay(e, EditAction, { action, pkg });
}

function onDeleteActionClick(e: Event, action: UserData.ActionData) {
  showConfirmationOverlay(e, () => removeArrayElement(pkg.actions, action), {
    message: t('act.deleteActionConfirm', action.name || '--'),
    confirmLabel: t('act.delete'),
  });
}

function getMaterialGroupDescription(group: UserData.MaterialGroupData) {
  const info = act.getMaterialGroupInfo(group.type);
  return info ? info.description(group) : '--';
}

function getActionDescription(action: UserData.ActionData) {
  const info = act.getActionInfo(action.type);
  return info ? info.description(action) : '--';
}

function onRenameClick(ev: Event) {
  showTileOverlay(ev, RenameActionPackage, {
    name: pkg.global.name,
    onRename: name => (pkg.global.name = name),
  });
}

function onExecuteClick() {
  showBuffer(`XIT ACT_${pkg.global.name.replace(' ', '_')}`);
}

function onExportClick() {
  const json = deepToRaw(pkg);
  downloadJson(json, `${pkg.global.name.replace(' ', '_')}-${Date.now()}.json`);
}
</script>

<template>
  <Header v-model="pkg.global.name" editable :class="$style.header" />
  <SectionHeader>{{ t('act.group') }}</SectionHeader>
  <table>
    <thead>
      <tr>
        <th>{{ t('act.typeLabel') }}</th>
        <th>{{ t('act.name') }}</th>
        <th>{{ t('act.content') }}</th>
        <th />
      </tr>
    </thead>
    <tbody v-if="pkg.groups.length === 0">
      <tr>
        <td colspan="4" :class="$style.emptyRow">{{ t('act.noGroups') }}</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr v-for="group in pkg.groups" :key="objectId(group)">
        <td>{{ group.type }}</td>
        <td>{{ group.name || '--' }}</td>
        <td>{{ getMaterialGroupDescription(group) }}</td>
        <td>
          <PrunButton dark inline @click="onEditMaterialGroupClick($event, group)">
            {{ t('act.edit') }}
          </PrunButton>
          <PrunButton dark inline @click="onDeleteMaterialGroupClick($event, group)">
            {{ t('act.delete') }}
          </PrunButton>
        </td>
      </tr>
    </tbody>
  </table>
  <form :class="$style.sectionCommands">
    <Commands>
      <PrunButton primary @click="onAddMaterialGroupClick">{{ t('act.add') }}</PrunButton>
    </Commands>
  </form>
  <SectionHeader>{{ t('act.action') }}</SectionHeader>
  <table>
    <thead>
      <tr>
        <th>{{ t('act.typeLabel') }}</th>
        <th>{{ t('act.name') }}</th>
        <th>{{ t('act.content') }}</th>
        <th />
      </tr>
    </thead>
    <tbody v-if="pkg.actions.length === 0">
      <tr>
        <td colspan="4" :class="$style.emptyRow">{{ t('act.noActions') }}</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr v-for="action in pkg.actions" :key="objectId(action)">
        <td>{{ action.type }}</td>
        <td>{{ action.name || '--' }}</td>
        <td>{{ getActionDescription(action) }}</td>
        <td>
          <PrunButton dark inline @click="onEditActionClick($event, action)">
            {{ t('act.edit') }}
          </PrunButton>
          <PrunButton dark inline @click="onDeleteActionClick($event, action)">
            {{ t('act.delete') }}
          </PrunButton>
        </td>
      </tr>
    </tbody>
  </table>
  <form :class="$style.sectionCommands">
    <Commands>
      <PrunButton primary @click="onAddActionClick">{{ t('act.add') }}</PrunButton>
    </Commands>
  </form>
  <SectionHeader>{{ t('act.commands') }}</SectionHeader>
  <form>
    <Commands :label="t('act.rename')">
      <PrunButton primary @click="onRenameClick">{{ t('act.rename').toUpperCase() }}</PrunButton>
    </Commands>
    <Commands :label="t('act.execute')">
      <PrunButton primary @click="onExecuteClick">{{ t('act.execute').toUpperCase() }}</PrunButton>
    </Commands>
    <Commands :label="t('act.export')">
      <PrunButton primary @click="onExportClick">{{ t('act.export').toUpperCase() }}</PrunButton>
    </Commands>
  </form>
</template>

<style module>
.header {
  margin-left: 4px;
}

.emptyRow {
  text-align: center;
}

.sectionCommands {
  margin-top: 0.75rem;
}
</style>
