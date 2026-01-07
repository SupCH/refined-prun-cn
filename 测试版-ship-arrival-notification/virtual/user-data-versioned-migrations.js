import removeArrayElement from './remove-array-element.js';
import { tilesStore } from './tiles2.js';
import { getInvStore } from './store-id.js';
function migrateVersionedUserData(userData) {
  if (userData.version < 10) {
    userData.tabs = {
      order: [],
      hidden: [],
    };
  }
  if (userData.version < 11) {
    let convertDueDate = function (task) {
      if (task.dueDate) {
        const [year, month, day] = task.dueDate.split('-').map(x => parseInt(x, 10));
        const date = new Date(year, month - 1, day);
        task.dueDate = date.getTime();
      }
      if (task.subtasks) {
        for (const subtask of task.subtasks) {
          convertDueDate(subtask);
        }
      }
    };
    for (const list of userData.todo) {
      for (const task of list.tasks) {
        convertDueDate(task);
      }
    }
  }
  if (userData.version < 12) {
    userData.commandLists = [];
  }
  if (userData.version < 13) {
    removeArrayElement(userData.settings.disabled, 'hide-bfrs-button');
  }
  if (userData.version < 14) {
    userData.settings.buffers = [];
  }
  if (userData.version < 15) {
    removeArrayElement(userData.settings.disabled, 'productivity-through-depression');
  }
  if (userData.version < 16) {
    removeArrayElement(userData.settings.disabled, 'mtra-sync-amount-slider');
  }
  if (userData.version < 17) {
    removeArrayElement(userData.settings.disabled, 'nots-ship-name');
  }
  if (userData.version < 18) {
    const sorting = {};
    for (const mode of userData.sorting) {
      const store = getInvStore(mode.storeId);
      if (!store) {
        continue;
      }
      const storeSorting = (sorting[store.id] ??= { modes: [] });
      storeSorting.modes.push(mode);
      delete mode.storeId;
    }
    userData.sorting = sorting;
    for (const tileId of Object.keys(userData.tileState)) {
      const tile = tilesStore.getById(tileId);
      if (!tile?.content?.startsWith('INV')) {
        continue;
      }
      const storeId = tile.content.substring(3);
      const store = getInvStore(storeId);
      const state = userData.tileState[tileId];
      if (store) {
        const storeSorting = (sorting[store.id] ??= { modes: [] });
        storeSorting.active = state.activeSort !== void 0 ? state.activeSort : void 0;
        storeSorting.cat = state.catSort !== void 0 ? state.catSort : void 0;
        storeSorting.reverse = state.reverseSort !== void 0 ? state.reverseSort : void 0;
      }
      delete state.activeSort;
      delete state.catSort;
      delete state.reverseSort;
    }
  }
  if (userData.version < 19) {
    removeArrayElement(userData.settings.disabled, 'contd-fill-condition-address');
  }
  if (userData.version < 20) {
    removeArrayElement(userData.settings.disabled, 'shipment-item-detail');
  }
  if (userData.version < 21) {
    userData.settings.defaultChartType = 'SMOOTH';
  }
  if (userData.version < 22) {
    userData.tabs.locked = [];
  }
  if (userData.version < 23) {
    for (const data of Object.values(userData.sorting)) {
      for (const mode of data.modes) {
        delete mode.storeId;
      }
    }
  }
}
export { migrateVersionedUserData };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1kYXRhLXZlcnNpb25lZC1taWdyYXRpb25zLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmUvdXNlci1kYXRhLXZlcnNpb25lZC1taWdyYXRpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmltcG9ydCByZW1vdmVBcnJheUVsZW1lbnQgZnJvbSAnQHNyYy91dGlscy9yZW1vdmUtYXJyYXktZWxlbWVudCc7XG5pbXBvcnQgeyB0aWxlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3RpbGVzJztcbmltcG9ydCB7IGdldEludlN0b3JlIH0gZnJvbSAnQHNyYy9jb3JlL3N0b3JlLWlkJztcblxuLy8gVGhpcyBpcyBhbiBvbGQgbWlncmF0aW9uIHN5c3RlbSB0aGF0IHVzZWQgYSB2ZXJzaW9uIG51bWJlci5cbi8vIEl0IGlzIGxlZnQgaGVyZSBmb3Igb2xkIHVzZXIgZGF0YSB0aGF0IHdhcyBjcmVhdGVkIGJlZm9yZSB0aGUgbmFtZWQgbWlncmF0aW9ucyB3ZXJlIGltcGxlbWVudGVkLlxuLy8gTmV3IG1pZ3JhdGlvbnMgc2hvdWxkIG5vdCB1c2UgdGhpcyBhcHByb2FjaC4gU2VlIHVzZXItZGF0YS1taWdyYXRpb25zLnRzLlxuZXhwb3J0IGZ1bmN0aW9uIG1pZ3JhdGVWZXJzaW9uZWRVc2VyRGF0YSh1c2VyRGF0YTogYW55KSB7XG4gIGlmICh1c2VyRGF0YS52ZXJzaW9uIDwgMTApIHtcbiAgICB1c2VyRGF0YS50YWJzID0ge1xuICAgICAgb3JkZXI6IFtdLFxuICAgICAgaGlkZGVuOiBbXSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKHVzZXJEYXRhLnZlcnNpb24gPCAxMSkge1xuICAgIGZ1bmN0aW9uIGNvbnZlcnREdWVEYXRlKHRhc2s6IGFueSkge1xuICAgICAgaWYgKHRhc2suZHVlRGF0ZSkge1xuICAgICAgICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSB0YXNrLmR1ZURhdGUuc3BsaXQoJy0nKS5tYXAoeCA9PiBwYXJzZUludCh4LCAxMCkpO1xuICAgICAgICAvLyBNb250aCBpcyAwLWJhc2VkXG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gICAgICAgIHRhc2suZHVlRGF0ZSA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgfVxuICAgICAgaWYgKHRhc2suc3VidGFza3MpIHtcbiAgICAgICAgZm9yIChjb25zdCBzdWJ0YXNrIG9mIHRhc2suc3VidGFza3MpIHtcbiAgICAgICAgICBjb252ZXJ0RHVlRGF0ZShzdWJ0YXNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgbGlzdCBvZiB1c2VyRGF0YS50b2RvKSB7XG4gICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgbGlzdC50YXNrcykge1xuICAgICAgICBjb252ZXJ0RHVlRGF0ZSh0YXNrKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAodXNlckRhdGEudmVyc2lvbiA8IDEyKSB7XG4gICAgdXNlckRhdGEuY29tbWFuZExpc3RzID0gW107XG4gIH1cblxuICBpZiAodXNlckRhdGEudmVyc2lvbiA8IDEzKSB7XG4gICAgcmVtb3ZlQXJyYXlFbGVtZW50KHVzZXJEYXRhLnNldHRpbmdzLmRpc2FibGVkLCAnaGlkZS1iZnJzLWJ1dHRvbicpO1xuICB9XG5cbiAgaWYgKHVzZXJEYXRhLnZlcnNpb24gPCAxNCkge1xuICAgIHVzZXJEYXRhLnNldHRpbmdzLmJ1ZmZlcnMgPSBbXTtcbiAgfVxuXG4gIGlmICh1c2VyRGF0YS52ZXJzaW9uIDwgMTUpIHtcbiAgICByZW1vdmVBcnJheUVsZW1lbnQodXNlckRhdGEuc2V0dGluZ3MuZGlzYWJsZWQsICdwcm9kdWN0aXZpdHktdGhyb3VnaC1kZXByZXNzaW9uJyk7XG4gIH1cblxuICBpZiAodXNlckRhdGEudmVyc2lvbiA8IDE2KSB7XG4gICAgcmVtb3ZlQXJyYXlFbGVtZW50KHVzZXJEYXRhLnNldHRpbmdzLmRpc2FibGVkLCAnbXRyYS1zeW5jLWFtb3VudC1zbGlkZXInKTtcbiAgfVxuXG4gIGlmICh1c2VyRGF0YS52ZXJzaW9uIDwgMTcpIHtcbiAgICByZW1vdmVBcnJheUVsZW1lbnQodXNlckRhdGEuc2V0dGluZ3MuZGlzYWJsZWQsICdub3RzLXNoaXAtbmFtZScpO1xuICB9XG5cbiAgaWYgKHVzZXJEYXRhLnZlcnNpb24gPCAxOCkge1xuICAgIGNvbnN0IHNvcnRpbmcgPSB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICAgIGZvciAoY29uc3QgbW9kZSBvZiB1c2VyRGF0YS5zb3J0aW5nKSB7XG4gICAgICBjb25zdCBzdG9yZSA9IGdldEludlN0b3JlKG1vZGUuc3RvcmVJZCk7XG4gICAgICBpZiAoIXN0b3JlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3RvcmVTb3J0aW5nID0gKHNvcnRpbmdbc3RvcmUuaWRdID8/PSB7IG1vZGVzOiBbXSB9KTtcbiAgICAgIHN0b3JlU29ydGluZy5tb2Rlcy5wdXNoKG1vZGUpO1xuICAgICAgZGVsZXRlIG1vZGUuc3RvcmVJZDtcbiAgICB9XG4gICAgdXNlckRhdGEuc29ydGluZyA9IHNvcnRpbmc7XG4gICAgZm9yIChjb25zdCB0aWxlSWQgb2YgT2JqZWN0LmtleXModXNlckRhdGEudGlsZVN0YXRlKSkge1xuICAgICAgY29uc3QgdGlsZSA9IHRpbGVzU3RvcmUuZ2V0QnlJZCh0aWxlSWQpO1xuICAgICAgaWYgKCF0aWxlPy5jb250ZW50Py5zdGFydHNXaXRoKCdJTlYnKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0b3JlSWQgPSB0aWxlLmNvbnRlbnQuc3Vic3RyaW5nKDMpO1xuICAgICAgY29uc3Qgc3RvcmUgPSBnZXRJbnZTdG9yZShzdG9yZUlkKTtcbiAgICAgIGNvbnN0IHN0YXRlID0gdXNlckRhdGEudGlsZVN0YXRlW3RpbGVJZF07XG4gICAgICBpZiAoc3RvcmUpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVTb3J0aW5nID0gKHNvcnRpbmdbc3RvcmUuaWRdID8/PSB7IG1vZGVzOiBbXSB9KTtcbiAgICAgICAgc3RvcmVTb3J0aW5nLmFjdGl2ZSA9IHN0YXRlLmFjdGl2ZVNvcnQgIT09IHVuZGVmaW5lZCA/IHN0YXRlLmFjdGl2ZVNvcnQgOiB1bmRlZmluZWQ7XG4gICAgICAgIHN0b3JlU29ydGluZy5jYXQgPSBzdGF0ZS5jYXRTb3J0ICE9PSB1bmRlZmluZWQgPyBzdGF0ZS5jYXRTb3J0IDogdW5kZWZpbmVkO1xuICAgICAgICBzdG9yZVNvcnRpbmcucmV2ZXJzZSA9IHN0YXRlLnJldmVyc2VTb3J0ICE9PSB1bmRlZmluZWQgPyBzdGF0ZS5yZXZlcnNlU29ydCA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSBzdGF0ZS5hY3RpdmVTb3J0O1xuICAgICAgZGVsZXRlIHN0YXRlLmNhdFNvcnQ7XG4gICAgICBkZWxldGUgc3RhdGUucmV2ZXJzZVNvcnQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHVzZXJEYXRhLnZlcnNpb24gPCAxOSkge1xuICAgIHJlbW92ZUFycmF5RWxlbWVudCh1c2VyRGF0YS5zZXR0aW5ncy5kaXNhYmxlZCwgJ2NvbnRkLWZpbGwtY29uZGl0aW9uLWFkZHJlc3MnKTtcbiAgfVxuXG4gIGlmICh1c2VyRGF0YS52ZXJzaW9uIDwgMjApIHtcbiAgICByZW1vdmVBcnJheUVsZW1lbnQodXNlckRhdGEuc2V0dGluZ3MuZGlzYWJsZWQsICdzaGlwbWVudC1pdGVtLWRldGFpbCcpO1xuICB9XG5cbiAgaWYgKHVzZXJEYXRhLnZlcnNpb24gPCAyMSkge1xuICAgIHVzZXJEYXRhLnNldHRpbmdzLmRlZmF1bHRDaGFydFR5cGUgPSAnU01PT1RIJztcbiAgfVxuXG4gIGlmICh1c2VyRGF0YS52ZXJzaW9uIDwgMjIpIHtcbiAgICB1c2VyRGF0YS50YWJzLmxvY2tlZCA9IFtdO1xuICB9XG5cbiAgaWYgKHVzZXJEYXRhLnZlcnNpb24gPCAyMykge1xuICAgIGZvciAoY29uc3QgZGF0YSBvZiBPYmplY3QudmFsdWVzKHVzZXJEYXRhLnNvcnRpbmcpIGFzIGFueVtdKSB7XG4gICAgICBmb3IgKGNvbnN0IG1vZGUgb2YgZGF0YS5tb2Rlcykge1xuICAgICAgICBkZWxldGUgbW9kZS5zdG9yZUlkO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVFPLFNBQVMseUJBQXlCLFVBQWU7QUFDdEQsTUFBSSxTQUFTLFVBQVUsSUFBSTtBQUN6QixhQUFTLE9BQU87QUFBQSxNQUNkLE9BQU8sQ0FBQTtBQUFBLE1BQ1AsUUFBUSxDQUFBO0FBQUEsSUFBQztBQUFBLEVBRWI7QUFFQSxNQUFJLFNBQVMsVUFBVSxJQUFJO0FBQ3pCLFFBQVMsaUJBQVQsU0FBd0IsTUFBVztBQUNqQyxVQUFJLEtBQUssU0FBUztBQUNoQixjQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxLQUFLLFFBQVEsTUFBTSxHQUFHLEVBQUUsSUFBSSxDQUFBLE1BQUssU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUUzRSxjQUFNLE9BQU8sSUFBSSxLQUFLLE1BQU0sUUFBUSxHQUFHLEdBQUc7QUFDMUMsYUFBSyxVQUFVLEtBQUssUUFBQTtBQUFBLE1BQ3RCO0FBQ0EsVUFBSSxLQUFLLFVBQVU7QUFDakIsbUJBQVcsV0FBVyxLQUFLLFVBQVU7QUFDbkMseUJBQWUsT0FBTztBQUFBLFFBQ3hCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxlQUFXLFFBQVEsU0FBUyxNQUFNO0FBQ2hDLGlCQUFXLFFBQVEsS0FBSyxPQUFPO0FBQzdCLHVCQUFlLElBQUk7QUFBQSxNQUNyQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsTUFBSSxTQUFTLFVBQVUsSUFBSTtBQUN6QixhQUFTLGVBQWUsQ0FBQTtBQUFBLEVBQzFCO0FBRUEsTUFBSSxTQUFTLFVBQVUsSUFBSTtBQUN6Qix1QkFBbUIsU0FBUyxTQUFTLFVBQVUsa0JBQWtCO0FBQUEsRUFDbkU7QUFFQSxNQUFJLFNBQVMsVUFBVSxJQUFJO0FBQ3pCLGFBQVMsU0FBUyxVQUFVLENBQUE7QUFBQSxFQUM5QjtBQUVBLE1BQUksU0FBUyxVQUFVLElBQUk7QUFDekIsdUJBQW1CLFNBQVMsU0FBUyxVQUFVLGlDQUFpQztBQUFBLEVBQ2xGO0FBRUEsTUFBSSxTQUFTLFVBQVUsSUFBSTtBQUN6Qix1QkFBbUIsU0FBUyxTQUFTLFVBQVUseUJBQXlCO0FBQUEsRUFDMUU7QUFFQSxNQUFJLFNBQVMsVUFBVSxJQUFJO0FBQ3pCLHVCQUFtQixTQUFTLFNBQVMsVUFBVSxnQkFBZ0I7QUFBQSxFQUNqRTtBQUVBLE1BQUksU0FBUyxVQUFVLElBQUk7QUFDekIsVUFBTSxVQUFVLENBQUE7QUFDaEIsZUFBVyxRQUFRLFNBQVMsU0FBUztBQUNuQyxZQUFNLFFBQVEsWUFBWSxLQUFLLE9BQU87QUFDdEMsVUFBSSxDQUFDLE9BQU87QUFDVjtBQUFBLE1BQ0Y7QUFDQSxZQUFNLGVBQWdCLFFBQVEsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEdBQUM7QUFDdEQsbUJBQWEsTUFBTSxLQUFLLElBQUk7QUFDNUIsYUFBTyxLQUFLO0FBQUEsSUFDZDtBQUNBLGFBQVMsVUFBVTtBQUNuQixlQUFXLFVBQVUsT0FBTyxLQUFLLFNBQVMsU0FBUyxHQUFHO0FBQ3BELFlBQU0sT0FBTyxXQUFXLFFBQVEsTUFBTTtBQUN0QyxVQUFJLENBQUMsTUFBTSxTQUFTLFdBQVcsS0FBSyxHQUFHO0FBQ3JDO0FBQUEsTUFDRjtBQUNBLFlBQU0sVUFBVSxLQUFLLFFBQVEsVUFBVSxDQUFDO0FBQ3hDLFlBQU0sUUFBUSxZQUFZLE9BQU87QUFDakMsWUFBTSxRQUFRLFNBQVMsVUFBVSxNQUFNO0FBQ3ZDLFVBQUksT0FBTztBQUNULGNBQU0sZUFBZ0IsUUFBUSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sR0FBQztBQUN0RCxxQkFBYSxTQUFTLE1BQU0sZUFBZSxTQUFZLE1BQU0sYUFBYTtBQUMxRSxxQkFBYSxNQUFNLE1BQU0sWUFBWSxTQUFZLE1BQU0sVUFBVTtBQUNqRSxxQkFBYSxVQUFVLE1BQU0sZ0JBQWdCLFNBQVksTUFBTSxjQUFjO0FBQUEsTUFDL0U7QUFDQSxhQUFPLE1BQU07QUFDYixhQUFPLE1BQU07QUFDYixhQUFPLE1BQU07QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUVBLE1BQUksU0FBUyxVQUFVLElBQUk7QUFDekIsdUJBQW1CLFNBQVMsU0FBUyxVQUFVLDhCQUE4QjtBQUFBLEVBQy9FO0FBRUEsTUFBSSxTQUFTLFVBQVUsSUFBSTtBQUN6Qix1QkFBbUIsU0FBUyxTQUFTLFVBQVUsc0JBQXNCO0FBQUEsRUFDdkU7QUFFQSxNQUFJLFNBQVMsVUFBVSxJQUFJO0FBQ3pCLGFBQVMsU0FBUyxtQkFBbUI7QUFBQSxFQUN2QztBQUVBLE1BQUksU0FBUyxVQUFVLElBQUk7QUFDekIsYUFBUyxLQUFLLFNBQVMsQ0FBQTtBQUFBLEVBQ3pCO0FBRUEsTUFBSSxTQUFTLFVBQVUsSUFBSTtBQUN6QixlQUFXLFFBQVEsT0FBTyxPQUFPLFNBQVMsT0FBTyxHQUFZO0FBQzNELGlCQUFXLFFBQVEsS0FBSyxPQUFPO0FBQzdCLGVBQU8sS0FBSztBQUFBLE1BQ2Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOyJ9
