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
