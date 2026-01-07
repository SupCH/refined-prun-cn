<script setup lang="ts">
import ActionBar from '@src/components/ActionBar.vue';
import PrunButton from '@src/components/PrunButton.vue';
import Header from '@src/components/Header.vue';
import { ActionRunner } from '@src/features/XIT/ACT/runner/action-runner';
import { useTile } from '@src/hooks/use-tile';
import { Logger, LogTag } from '@src/features/XIT/ACT/runner/logger';
import LogWindow from '@src/features/XIT/ACT/LogWindow.vue';
import ConfigWindow from '@src/features/XIT/ACT/ConfigureWindow.vue';
import { ActionPackageConfig } from '@src/features/XIT/ACT/shared-types';
import { act } from '@src/features/XIT/ACT/act-registry';

import { t } from '@src/infrastructure/i18n';

const { pkg } = defineProps<{ pkg: UserData.ActionPackageData }>();

const tile = useTile();
let goingToSplit = ref(false);

const config = ref({
  materialGroups: {},
  actions: {},
} as ActionPackageConfig);

const log = ref([] as { tag: LogTag; message: string }[]);
const logScrolling = ref(true);
const isPreviewing = ref(false);
const isRunning = ref(false);
const statusText = ref(undefined as string | undefined);
const actReady = ref(false);

watch(config, clearLog, { deep: true });

watchEffect(() => {
  for (const name of pkg.groups.map(x => x.name!)) {
    if (config.value.materialGroups[name] === undefined) {
      config.value.materialGroups[name] = {};
    }
  }
  for (const name of pkg.actions.map(x => x.name!)) {
    if (config.value.actions[name] === undefined) {
      config.value.actions[name] = {};
    }
  }
});

const needsConfigure = computed(() => {
  for (const action of pkg.actions) {
    const info = act.getActionInfo(action.type);
    if (info && info.needsConfigure?.(action)) {
      return true;
    }
  }
  for (const group of pkg.groups) {
    const info = act.getMaterialGroupInfo(group.type);
    if (info && info.needsConfigure?.(group)) {
      return true;
    }
  }
  return false;
});

const hasPriceFetchAction = computed(() => pkg.actions.some(a => a.type === 'CX Fetch'));

const isValidConfig = computed(() => {
  for (const action of pkg.actions) {
    const info = act.getActionInfo(action.type);
    let actionConfig = config.value.actions[action.name!] ?? {};
    const isValid = info?.isValidConfig?.(action, actionConfig) ?? true;
    if (!isValid) {
      return false;
    }
  }
  for (const group of pkg.groups) {
    const info = act.getMaterialGroupInfo(group.type);
    let groupConfig = config.value.materialGroups[group.name!] ?? {};
    const isValid = info?.isValidConfig?.(group, groupConfig) ?? true;
    if (!isValid) {
      return false;
    }
  }
  return true;
});

const showConfigure = ref(true);

const shouldShowConfigure = computed(() => {
  return needsConfigure.value && (!isValidConfig.value || showConfigure.value);
});

const runner = new ActionRunner({
  tile,
  log: new Logger(logMessage),
  onBufferSplit: () => (goingToSplit.value = true),
  onStart: () => (isRunning.value = true),
  onEnd: () => {
    isRunning.value = false;
    statusText.value = undefined;
  },
  onStatusChanged: (title, keepReady) => {
    statusText.value = title;
    if (!keepReady) {
      actReady.value = false;
    }
  },
  onActReady: () => {
    actReady.value = true;
  },
});

function onConfigureApplyClick() {
  showConfigure.value = false;
}

function onConfigureClick() {
  showConfigure.value = true;
}

async function onPreviewClick() {
  logScrolling.value = false;
  clearLog();
  isPreviewing.value = true;
  await runner.preview(pkg, config.value);
  isPreviewing.value = false;
  statusText.value = undefined;
}

function onExecuteClick() {
  logScrolling.value = true;
  clearLog();
  actReady.value = false;
  runner.execute(pkg, config.value, false);
}

function onAutoExecuteClick() {
  logScrolling.value = true;
  clearLog();
  actReady.value = false;
  runner.execute(pkg, config.value, true);
}

function onStopAutoClick() {
  runner.stopAuto();
}

function onCancelClick() {
  actReady.value = false;
  runner.cancel();
}

function onActClick() {
  actReady.value = false;
  runner.act();
}

function onSkipClick() {
  actReady.value = false;
  runner.skip();
}

function logMessage(tag: LogTag, message: string) {
  return log.value.push({ tag, message });
}

function clearLog() {
  log.value.length = 0;
}

function closeAllPriceWindows() {
  const windows = Array.from(document.getElementsByClassName(C.Window.window)) as HTMLDivElement[];

  for (const window of windows) {
    let shouldClose = false;

    // 1. 检查是否是带有 session 标记的价格窗口 (CXPO)
    const sessionId = window.getAttribute('data-cx-fetch-session');
    if (sessionId) {
      shouldClose = true;
    } else {
      // 2. 检查是否是 XIT 窗口（包括 "XIT " 和 "XIT_" 格式，不区分大小写）
      const cmdElement = window.querySelector(`.${C.TileFrame.cmd}`);
      const cmdText = (cmdElement?.textContent || '').toUpperCase();
      if (cmdText.startsWith('XIT ') || cmdText.startsWith('XIT_')) {
        shouldClose = true;
      }
    }

    if (shouldClose) {
      const buttons = window.querySelectorAll(`.${C.Window.button}`);
      const closeButton = Array.from(buttons).find(x => x.textContent === 'x');
      if (closeButton) {
        (closeButton as HTMLElement).click();
      }
    }
  }
}
</script>

<template>
  <div v-if="goingToSplit" />
  <div v-else :class="$style.root">
    <Header :class="$style.header">{{ pkg.global.name }}</Header>
    <ConfigWindow
      v-if="shouldShowConfigure"
      :pkg="pkg"
      :config="config"
      :class="$style.mainWindow" />
    <LogWindow v-else :messages="log" :scrolling="logScrolling" :class="$style.mainWindow" />
    <div :class="$style.status">
      <span>{{ t('act.status') }}: </span>
      <span v-if="statusText">{{ statusText }}</span>
      <span v-else-if="shouldShowConfigure">{{ t('act.configureParams') }}</span>
      <span v-else>{{ t('act.pressExecute') }}</span>
    </div>
    <ActionBar :class="$style.actionBar">
      <template v-if="shouldShowConfigure">
        <PrunButton primary :disabled="!isValidConfig" @click="onConfigureApplyClick">
          {{ t('act.apply').toUpperCase() }}
        </PrunButton>
      </template>
      <template v-else-if="isPreviewing">
        <PrunButton v-if="needsConfigure" primary @click="onConfigureClick">
          {{ t('act.configure').toUpperCase() }}
        </PrunButton>
        <PrunButton disabled>{{ t('act.preview').toUpperCase() }}</PrunButton>
        <PrunButton disabled>{{ t('act.execute').toUpperCase() }}</PrunButton>
      </template>
      <template v-else-if="!isRunning">
        <PrunButton v-if="needsConfigure" primary @click="onConfigureClick">
          {{ t('act.configure').toUpperCase() }}
        </PrunButton>
        <PrunButton primary @click="onPreviewClick">
          {{ t('act.preview').toUpperCase() }}
        </PrunButton>
        <PrunButton primary @click="onExecuteClick">
          {{ t('act.execute').toUpperCase() }}
        </PrunButton>
        <PrunButton primary :class="$style.executeButton" @click="onAutoExecuteClick">
          {{ t('act.autoExecute').toUpperCase() }}
        </PrunButton>
        <PrunButton
          v-if="hasPriceFetchAction"
          :class="$style.executeButton"
          @click="closeAllPriceWindows"
          dark>
          {{ t('quickPurchase.closeAllWindows').toUpperCase() }}
        </PrunButton>
      </template>
      <template v-else>
        <PrunButton v-if="needsConfigure" primary disabled>
          {{ t('act.configure').toUpperCase() }}
        </PrunButton>
        <PrunButton primary disabled>{{ t('act.preview').toUpperCase() }}</PrunButton>
        <PrunButton danger :class="$style.executeButton" @click="onCancelClick">
          {{ t('act.cancel').toUpperCase() }}
        </PrunButton>
        <PrunButton v-if="runner.isAutoMode" primary @click="onStopAutoClick">
          {{ t('act.stopAuto').toUpperCase() }}
        </PrunButton>
        <PrunButton primary :disabled="!actReady || runner.isAutoMode" @click="onActClick">
          {{ t('act.act').toUpperCase() }}
        </PrunButton>
        <PrunButton neutral :disabled="!actReady || runner.isAutoMode" @click="onSkipClick">
          {{ t('act.skip').toUpperCase() }}
        </PrunButton>
      </template>
    </ActionBar>
  </div>
</template>

<style module>
.root {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.mainWindow {
  flex-grow: 1;
}

.header {
  margin-left: 4px;
}

.status {
  margin-left: 5px;
  margin-top: 5px;
}

.actionBar {
  margin-left: 2px;
  justify-content: flex-start;
  user-select: none;
}

/* Use the same width for cancel and execute buttons to keep layout stable. */
.executeButton {
  width: 80px;
}
</style>
