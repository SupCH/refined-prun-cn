<script setup lang="ts">
import PrunLink from '@src/components/PrunLink.vue';
import PrunButton from '@src/components/PrunButton.vue';
import { userData } from '@src/store/user-data';
import { saveUserData } from '@src/infrastructure/storage/user-data-serializer';

const needsToChoose = ref(userData.settings.mode === undefined);

function onBasicClick() {
  needsToChoose.value = false;
  userData.settings.mode = 'BASIC';
}

async function onFullClick() {
  needsToChoose.value = false;
  userData.settings.mode = 'FULL';
  await saveUserData();
  window.location.reload();
}
</script>

<template>
  <div :class="$style.container">
    <h1 :class="$style.title">{{ t('start.welcome') }}</h1>
    <p>
      {{ t('start.listCommands') }}
      <PrunLink inline command="XIT CMDS" />
    </p>
    <p>
      {{ t('start.changeSettings') }}
      <PrunLink inline command="XIT SET" />
    </p>
    <p>
      {{ t('start.additionalHelp') }}
      <PrunLink inline command="XIT HELP" />
    </p>
    <template v-if="needsToChoose">
      <p>
        {{ t('start.selectFeatureSet', 'XIT SET FEAT') }}
        <PrunLink inline command="XIT SET FEAT" />
        )
      </p>
      <div :class="$style.features">
        <PrunButton primary :class="$style.feature" @click="onBasicClick">
          <div :class="$style.featureTitle">
            <div :class="$style.title">{{ t('start.basicTitle') }}</div>
          </div>
          <div :class="$style.featureDescription">{{ t('start.basicDesc') }}</div>
        </PrunButton>
        <PrunButton primary :class="$style.feature" @click="onFullClick">
          <div :class="$style.featureTitle">
            <div :class="$style.title">{{ t('start.fullTitle') }}</div>
            <div>{{ t('start.fullRestart') }}</div>
          </div>
          <div :class="$style.featureDescription">
            {{ t('start.fullDesc') }}
          </div>
        </PrunButton>
      </div>
    </template>
    <p v-else>
      {{ t('start.changeAnytime') }}
      <PrunLink inline command="XIT SET FEAT" />
    </p>
  </div>
</template>

<style module>
.container {
  font-size: 12px;
  padding-left: 4px;
}

.title {
  font-weight: bold;
  display: block;
  font-size: 16px;
}

.features {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.feature {
  width: 49%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px;
  text-transform: none;
}

.featureTitle {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.featureDescription {
  padding-top: 4px;
}
</style>
