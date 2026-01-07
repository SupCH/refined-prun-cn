import config from './config.js';
import { downloadJson, uploadJson } from './json-file.js';
import { migrateUserData } from './user-data-migrations.js';
import { userData, applyUserData, applyInitialUserData } from './user-data.js';
import { deepToRaw } from './deep-to-raw.js';
import { backupUserData, getUserDataBackups } from './user-data-backup.js';
import { watch } from './runtime-core.esm-bundler.js';
const fileType = 'rp-user-data';
function loadUserData() {
  let loaded = false;
  let userDataToLoad = config.userData;
  if (!userDataToLoad) {
    const backups = getUserDataBackups();
    if (backups.length > 0) {
      userDataToLoad = backups[0].data;
    }
  }
  if (userDataToLoad) {
    try {
      const userData2 = migrateUserData(userDataToLoad);
      applyUserData(userData2);
      loaded = true;
    } catch (e) {
      console.error('Error loading user data', e);
      loaded = false;
    }
  }
  if (!loaded) {
    migrateUserData(userData);
  }
  watchUserData();
}
function watchUserData() {
  let saveQueued = false;
  watch(
    userData,
    () => {
      if (!saveQueued) {
        setTimeout(() => {
          void saveUserData();
          saveQueued = false;
        }, 1e3);
        saveQueued = true;
      }
    },
    { deep: true },
  );
}
async function saveUserData() {
  const data = deepToRaw(userData);
  backupUserData(data);
  await new Promise(resolve => {
    const listener = e => {
      if (e.source !== window) {
        return;
      }
      if (e.data.type === 'rp-user-data-saved') {
        window.removeEventListener('message', listener);
        resolve();
      }
    };
    window.addEventListener('message', listener);
    window.postMessage({ type: 'rp-save-user-data', userData: data }, '*');
  });
}
function restoreBackup(backup) {
  const userData2 = migrateUserData(backup);
  applyUserData(userData2);
}
function downloadBackup(backup, timestamp) {
  const json = {
    type: fileType,
    data: backup,
  };
  downloadJson(json, `${fileType}-${timestamp}.json`);
}
function importUserData(onSuccess) {
  uploadJson(json => {
    if (json?.type !== fileType) {
      return;
    }
    const userData2 = migrateUserData(json.data);
    applyUserData(userData2);
    onSuccess?.();
  });
}
function exportUserData() {
  const json = {
    type: fileType,
    data: userData,
  };
  downloadJson(json, `${fileType}-${Date.now()}.json`);
}
function resetUserData() {
  applyInitialUserData();
  migrateUserData(userData);
}
export {
  downloadBackup,
  exportUserData,
  importUserData,
  loadUserData,
  resetUserData,
  restoreBackup,
  saveUserData,
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1kYXRhLXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9zdG9yYWdlL3VzZXItZGF0YS1zZXJpYWxpemVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRvd25sb2FkSnNvbiwgdXBsb2FkSnNvbiB9IGZyb20gJ0BzcmMvdXRpbHMvanNvbi1maWxlJztcbmltcG9ydCB7IG1pZ3JhdGVVc2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhLW1pZ3JhdGlvbnMnO1xuaW1wb3J0IHsgYXBwbHlJbml0aWFsVXNlckRhdGEsIGFwcGx5VXNlckRhdGEsIHVzZXJEYXRhIH0gZnJvbSAnQHNyYy9zdG9yZS91c2VyLWRhdGEnO1xuaW1wb3J0IHsgZGVlcFRvUmF3IH0gZnJvbSAnQHNyYy91dGlscy9kZWVwLXRvLXJhdyc7XG5pbXBvcnQgeyBiYWNrdXBVc2VyRGF0YSwgZ2V0VXNlckRhdGFCYWNrdXBzIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9zdG9yYWdlL3VzZXItZGF0YS1iYWNrdXAnO1xuXG5jb25zdCBmaWxlVHlwZSA9ICdycC11c2VyLWRhdGEnO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFVzZXJEYXRhKCkge1xuICBsZXQgbG9hZGVkID0gZmFsc2U7XG4gIGxldCB1c2VyRGF0YVRvTG9hZCA9IGNvbmZpZy51c2VyRGF0YTtcbiAgaWYgKCF1c2VyRGF0YVRvTG9hZCkge1xuICAgIGNvbnN0IGJhY2t1cHMgPSBnZXRVc2VyRGF0YUJhY2t1cHMoKTtcbiAgICBpZiAoYmFja3Vwcy5sZW5ndGggPiAwKSB7XG4gICAgICB1c2VyRGF0YVRvTG9hZCA9IGJhY2t1cHNbMF0uZGF0YTtcbiAgICB9XG4gIH1cbiAgaWYgKHVzZXJEYXRhVG9Mb2FkKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXJEYXRhID0gbWlncmF0ZVVzZXJEYXRhKHVzZXJEYXRhVG9Mb2FkKTtcbiAgICAgIGFwcGx5VXNlckRhdGEodXNlckRhdGEpO1xuICAgICAgbG9hZGVkID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHVzZXIgZGF0YScsIGUpO1xuICAgICAgbG9hZGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmICghbG9hZGVkKSB7XG4gICAgbWlncmF0ZVVzZXJEYXRhKHVzZXJEYXRhKTtcbiAgfVxuICB3YXRjaFVzZXJEYXRhKCk7XG59XG5cbmZ1bmN0aW9uIHdhdGNoVXNlckRhdGEoKSB7XG4gIGxldCBzYXZlUXVldWVkID0gZmFsc2U7XG5cbiAgd2F0Y2goXG4gICAgdXNlckRhdGEsXG4gICAgKCkgPT4ge1xuICAgICAgaWYgKGltcG9ydC5tZXRhLmVudi5ERVYpIHtcbiAgICAgICAgY29uc29sZS5sb2codXNlckRhdGEpO1xuICAgICAgfVxuICAgICAgaWYgKCFzYXZlUXVldWVkKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHZvaWQgc2F2ZVVzZXJEYXRhKCk7XG4gICAgICAgICAgc2F2ZVF1ZXVlZCA9IGZhbHNlO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgc2F2ZVF1ZXVlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSxcbiAgICB7IGRlZXA6IHRydWUgfSxcbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVVc2VyRGF0YSgpIHtcbiAgY29uc3QgZGF0YSA9IGRlZXBUb1Jhdyh1c2VyRGF0YSk7XG4gIGJhY2t1cFVzZXJEYXRhKGRhdGEpO1xuICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICBjb25zdCBsaXN0ZW5lciA9IChlOiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgIGlmIChlLnNvdXJjZSAhPT0gd2luZG93KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChlLmRhdGEudHlwZSA9PT0gJ3JwLXVzZXItZGF0YS1zYXZlZCcpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lcik7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIpO1xuICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7IHR5cGU6ICdycC1zYXZlLXVzZXItZGF0YScsIHVzZXJEYXRhOiBkYXRhIH0sICcqJyk7XG4gIH0pO1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IGZ1bmN0aW9uIHJlc3RvcmVCYWNrdXAoYmFja3VwOiBhbnkpIHtcbiAgY29uc3QgdXNlckRhdGEgPSBtaWdyYXRlVXNlckRhdGEoYmFja3VwKTtcbiAgYXBwbHlVc2VyRGF0YSh1c2VyRGF0YSk7XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWRCYWNrdXAoYmFja3VwOiBhbnksIHRpbWVzdGFtcDogbnVtYmVyKSB7XG4gIGNvbnN0IGpzb24gPSB7XG4gICAgdHlwZTogZmlsZVR5cGUsXG4gICAgZGF0YTogYmFja3VwLFxuICB9O1xuICBkb3dubG9hZEpzb24oanNvbiwgYCR7ZmlsZVR5cGV9LSR7dGltZXN0YW1wfS5qc29uYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbXBvcnRVc2VyRGF0YShvblN1Y2Nlc3M/OiAoKSA9PiB2b2lkKSB7XG4gIHVwbG9hZEpzb24oanNvbiA9PiB7XG4gICAgaWYgKGpzb24/LnR5cGUgIT09IGZpbGVUeXBlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHVzZXJEYXRhID0gbWlncmF0ZVVzZXJEYXRhKGpzb24uZGF0YSk7XG4gICAgYXBwbHlVc2VyRGF0YSh1c2VyRGF0YSk7XG4gICAgb25TdWNjZXNzPy4oKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRVc2VyRGF0YSgpIHtcbiAgY29uc3QganNvbiA9IHtcbiAgICB0eXBlOiBmaWxlVHlwZSxcbiAgICBkYXRhOiB1c2VyRGF0YSxcbiAgfTtcbiAgZG93bmxvYWRKc29uKGpzb24sIGAke2ZpbGVUeXBlfS0ke0RhdGUubm93KCl9Lmpzb25gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VXNlckRhdGEoKSB7XG4gIGFwcGx5SW5pdGlhbFVzZXJEYXRhKCk7XG4gIG1pZ3JhdGVVc2VyRGF0YSh1c2VyRGF0YSk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1BLE1BQUEsV0FBQTtBQUVPLFNBQUEsZUFBQTtBQUNMLE1BQUEsU0FBQTtBQUNBLE1BQUEsaUJBQUEsT0FBQTtBQUNBLE1BQUEsQ0FBQSxnQkFBQTtBQUNFLFVBQUEsVUFBQSxtQkFBQTtBQUNBLFFBQUEsUUFBQSxTQUFBLEdBQUE7QUFDRSx1QkFBQSxRQUFBLENBQUEsRUFBQTtBQUFBLElBQTRCO0FBQUEsRUFDOUI7QUFFRixNQUFBLGdCQUFBO0FBQ0UsUUFBQTtBQUNFLFlBQUEsWUFBQSxnQkFBQSxjQUFBO0FBQ0Esb0JBQUEsU0FBQTtBQUNBLGVBQUE7QUFBQSxJQUFTLFNBQUEsR0FBQTtBQUVULGNBQUEsTUFBQSwyQkFBQSxDQUFBO0FBQ0EsZUFBQTtBQUFBLElBQVM7QUFBQSxFQUNYO0FBRUYsTUFBQSxDQUFBLFFBQUE7QUFDRSxvQkFBQSxRQUFBO0FBQUEsRUFBd0I7QUFFMUIsZ0JBQUE7QUFDRjtBQUVBLFNBQUEsZ0JBQUE7QUFDRSxNQUFBLGFBQUE7QUFFQTtBQUFBLElBQUE7QUFBQSxJQUNFLE1BQUE7QUFLRSxVQUFBLENBQUEsWUFBQTtBQUNFLG1CQUFBLE1BQUE7QUFDRSxlQUFBLGFBQUE7QUFDQSx1QkFBQTtBQUFBLFFBQWEsR0FBQSxHQUFBO0FBRWYscUJBQUE7QUFBQSxNQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0YsRUFBQSxNQUFBLEtBQUE7QUFBQSxFQUNhO0FBRWpCO0FBRUEsZUFBQSxlQUFBO0FBQ0UsUUFBQSxPQUFBLFVBQUEsUUFBQTtBQUNBLGlCQUFBLElBQUE7QUFDQSxRQUFBLElBQUEsUUFBQSxDQUFBLFlBQUE7QUFDRSxVQUFBLFdBQUEsQ0FBQSxNQUFBO0FBQ0UsVUFBQSxFQUFBLFdBQUEsUUFBQTtBQUNFO0FBQUEsTUFBQTtBQUVGLFVBQUEsRUFBQSxLQUFBLFNBQUEsc0JBQUE7QUFDRSxlQUFBLG9CQUFBLFdBQUEsUUFBQTtBQUNBLGdCQUFBO0FBQUEsTUFBUTtBQUFBLElBQ1Y7QUFFRixXQUFBLGlCQUFBLFdBQUEsUUFBQTtBQUNBLFdBQUEsWUFBQSxFQUFBLE1BQUEscUJBQUEsVUFBQSxLQUFBLEdBQUEsR0FBQTtBQUFBLEVBQXFFLENBQUE7QUFFekU7QUFHTyxTQUFBLGNBQUEsUUFBQTtBQUNMLFFBQUEsWUFBQSxnQkFBQSxNQUFBO0FBQ0EsZ0JBQUEsU0FBQTtBQUNGO0FBR08sU0FBQSxlQUFBLFFBQUEsV0FBQTtBQUNMLFFBQUEsT0FBQTtBQUFBLElBQWEsTUFBQTtBQUFBLElBQ0wsTUFBQTtBQUFBLEVBQ0E7QUFFUixlQUFBLE1BQUEsR0FBQSxRQUFBLElBQUEsU0FBQSxPQUFBO0FBQ0Y7QUFFTyxTQUFBLGVBQUEsV0FBQTtBQUNMLGFBQUEsQ0FBQSxTQUFBO0FBQ0UsUUFBQSxNQUFBLFNBQUEsVUFBQTtBQUNFO0FBQUEsSUFBQTtBQUVGLFVBQUEsWUFBQSxnQkFBQSxLQUFBLElBQUE7QUFDQSxrQkFBQSxTQUFBO0FBQ0EsZ0JBQUE7QUFBQSxFQUFZLENBQUE7QUFFaEI7QUFFTyxTQUFBLGlCQUFBO0FBQ0wsUUFBQSxPQUFBO0FBQUEsSUFBYSxNQUFBO0FBQUEsSUFDTCxNQUFBO0FBQUEsRUFDQTtBQUVSLGVBQUEsTUFBQSxHQUFBLFFBQUEsSUFBQSxLQUFBLEtBQUEsT0FBQTtBQUNGO0FBRU8sU0FBQSxnQkFBQTtBQUNMLHVCQUFBO0FBQ0Esa0JBQUEsUUFBQTtBQUNGOyJ9
