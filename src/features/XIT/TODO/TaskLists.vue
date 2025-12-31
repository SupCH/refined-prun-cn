<script setup lang="ts">
import grip from '@src/utils/grip.module.css';
import fa from '@src/utils/font-awesome.module.css';
import { showTileOverlay, showConfirmationOverlay } from '@src/infrastructure/prun-ui/tile-overlay';
import PrunButton from '@src/components/PrunButton.vue';
import ActionBar from '@src/components/ActionBar.vue';
import { showBuffer } from '@src/infrastructure/prun-ui/buffers';
import { userData } from '@src/store/user-data';
import { vDraggable } from 'vue-draggable-plus';
import CreateTaskList from '@src/features/XIT/TODO/CreateTaskList.vue';
import { createId } from '@src/store/create-id';
import removeArrayElement from '@src/utils/remove-array-element';
import { sumBy } from '@src/utils/sum-by';
import PrunLink from '@src/components/PrunLink.vue';
import { ddmmyyyy } from '@src/utils/format';

function createNewList(ev: Event) {
  showTileOverlay(ev, CreateTaskList, {
    onCreate: name => {
      const id = createId();
      userData.todo.push({ id, name, tasks: [] });
      showBuffer(`XIT TODO ${id.substring(0, 8)}`);
    },
  });
}

function confirmDelete(ev: Event, list: UserData.TaskList) {
  showConfirmationOverlay(ev, () => removeArrayElement(userData.todo, list), {
    message: t('todo.deleteListConfirm', list.name),
  });
}

function countCompletedTasks(list: UserData.TaskList) {
  return sumBy(list.tasks, x => (x.completed ? 1 : 0));
}

function getDueDate(list: UserData.TaskList) {
  const dates: number[] = [];
  const add = (task: UserData.Task) => {
    if (task.dueDate !== undefined) {
      dates.push(task.dueDate);
    }
    for (const subtask of task.subtasks ?? []) {
      add(subtask);
    }
  };
  for (const task of list.tasks) {
    add(task);
  }
  if (dates.length === 0) {
    return undefined;
  }
  dates.sort();
  return ddmmyyyy(dates[0]);
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
    <PrunButton primary @click="createNewList">{{ t('todo.addList') }}</PrunButton>
  </ActionBar>
  <table>
    <thead>
      <tr>
        <th>{{ t('todo.listName') }}</th>
        <th>{{ t('todo.tasks') }}</th>
        <th>{{ t('todo.dueDate') }}</th>
        <th />
      </tr>
    </thead>
    <tbody
      v-draggable="[userData.todo, draggableOptions]"
      :class="dragging ? $style.dragging : null">
      <tr v-for="list in userData.todo" :key="list.id">
        <td>
          <span :class="[grip.grip, fa.solid, $style.grip]">
            {{ '\uf58e' }}
          </span>
          <PrunLink inline :command="`XIT TODO ${list.id.substring(0, 8)}`">
            {{ list.name }}
          </PrunLink>
        </td>
        <td>
          <span>{{ countCompletedTasks(list) }}/{{ list.tasks.length }}</span>
        </td>
        <td>
          <span>{{ getDueDate(list) }}</span>
        </td>
        <td>
          <PrunButton danger @click="confirmDelete($event, list)">{{
            t('todo.deleteList')
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
