<script setup lang="ts">
import PrunLink from '@src/components/PrunLink.vue';
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>{{ t('help.wantTo') }}</th>
        <th>{{ t('help.command') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ t('help.changeSettings') }}</td>
        <td>
          <PrunLink command="XIT SET" />
        </td>
      </tr>
      <tr>
        <td>{{ t('help.changeFeatureSet') }}</td>
        <td>
          <PrunLink command="XIT SET FEAT" />
        </td>
      </tr>
      <tr>
        <td>{{ t('help.disableFeature') }}</td>
        <td>
          <PrunLink command="XIT SET FEAT" />
        </td>
      </tr>
      <tr>
        <td>{{ t('help.findCommands') }}</td>
        <td>
          <PrunLink command="XIT CMDS" />
        </td>
      </tr>
      <tr>
        <td>{{ t('help.importPmmg') }}</td>
        <td>
          <PrunLink command="XIT SET PMMG" />
        </td>
      </tr>
      <tr>
        <td>{{ t('help.corgiGif') }}</td>
        <td>
          <PrunLink command="XIT GIF CORGI" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
