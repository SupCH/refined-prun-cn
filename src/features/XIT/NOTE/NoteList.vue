<script setup lang="ts">
import { showTileOverlay, showConfirmationOverlay } from '@src/infrastructure/prun-ui/tile-overlay';
import CreateNoteOverlay from '@src/features/XIT/NOTE/CreateNoteOverlay.vue';
import PrunButton from '@src/components/PrunButton.vue';
import ActionBar from '@src/components/ActionBar.vue';
import { showBuffer } from '@src/infrastructure/prun-ui/buffers';
import { userData } from '@src/store/user-data';
import { createNote, deleteNote } from '@src/store/notes';
import { vDraggable } from 'vue-draggable-plus';
import grip from '@src/utils/grip.module.css';
import fa from '@src/utils/font-awesome.module.css';
import PrunLink from '@src/components/PrunLink.vue';

function createNewNote(ev: Event) {
  showTileOverlay(ev, CreateNoteOverlay, {
    onCreate: name => {
      const id = createNote(name);
      showBuffer(`XIT NOTE ${id}`);
    },
  });
}

function confirmDelete(ev: Event, note: UserData.Note) {
  showConfirmationOverlay(ev, () => deleteNote(note), {
    message: t('note.deleteConfirm', note.name),
  });
}

const dragging = ref(false);

const draggableOptions = {
  animation: 150,
  handle: `.${grip.grip}`,
  onStart: () => (dragging.value = true),
  onEnd: () => (dragging.value = false),
};
</script>

<template>
  <ActionBar>
    <PrunButton primary @click="createNewNote">{{ t('note.newNote') }}</PrunButton>
  </ActionBar>
  <table>
    <thead>
      <tr>
        <th>{{ t('note.noteName') }}</th>
        <th>{{ t('note.noteLength') }}</th>
        <th />
      </tr>
    </thead>
    <tbody
      v-draggable="[userData.notes, draggableOptions]"
      :class="dragging ? $style.dragging : null">
      <tr v-for="note in userData.notes" :key="note.id">
        <td>
          <span :class="[grip.grip, fa.solid, $style.grip]">
            {{ '\uf58e' }}
          </span>
          <PrunLink inline :command="`XIT NOTE ${note.id.substring(0, 8)}`">
            {{ note.name }}
          </PrunLink>
        </td>
        <td>
          <span>
            {{ t('note.characters', note.text.length.toLocaleString()) }}
          </span>
        </td>
        <td>
          <PrunButton danger @click="confirmDelete($event, note)">{{
            t('note.deleteNote')
          }}</PrunButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style module>
.grip {
  cursor: move;
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
  margin-right: 5px;
}

tr:hover .grip {
  opacity: 1;
}

.dragging td .grip {
  opacity: 0;
}
</style>
