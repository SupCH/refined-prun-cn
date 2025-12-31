<script setup lang="ts">
import { castArray } from '@src/utils/cast-array';
import PrunLink from '@src/components/PrunLink.vue';
import { objectId } from '@src/utils/object-id';

const sorted = xit.registry.sort((a, b) => {
  const commandA = castArray(a.command)[0];
  const commandB = castArray(b.command)[0];
  return commandA.localeCompare(commandB);
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>{{ t('cmds.command') }}</th>
        <th>{{ t('cmds.description') }}</th>
        <th>{{ t('cmds.mandatory') }}</th>
        <th>{{ t('cmds.optional') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="command in sorted" :key="objectId(command)">
        <td>
          <PrunLink
            :command="'XIT ' + castArray(command.command)[0]"
            :auto-submit="!command.mandatoryParameters">
            {{ castArray(command.command)[0] }}
          </PrunLink>
        </td>
        <td>{{ t('commands.' + castArray(command.command)[0]) }}</td>
        <td>{{ command.mandatoryParameters }}</td>
        <td>{{ command.optionalParameters }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
