<script setup lang="ts">
import Active from '@src/components/forms/Active.vue';
import TextInput from '@src/components/forms/TextInput.vue';

const { action } = defineProps<{
  action: UserData.ActionData;
}>();

// Read-only view for now, as this is generated programmatically
const displayTickers = computed(() => (action.tickers || []).join(', '));
</script>

<template>
  <Active label="Exchange">
    <TextInput v-model="action.exchange" disabled />
  </Active>
  <Active label="Tickers">
    <TextInput :model-value="displayTickers" disabled />
  </Active>
</template>
