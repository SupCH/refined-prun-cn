import { shallowRef } from './reactivity.esm-bundler.js';
const storageKey = 'refined-prun';
const maxBackups = 5;
const hoursBetweenBackups = 24;
const refBackups = shallowRef(loadBackups());
function getUserDataBackups() {
  return refBackups.value;
}
function loadBackups() {
  try {
    const json = localStorage.getItem(storageKey);
    if (!json) {
      return [];
    }
    const backups = JSON.parse(json);
    if (!backups?.backups) {
      return [];
    }
    return backups.backups;
  } catch {
    return [];
  }
}
function saveBackups(backups) {
  localStorage.setItem(storageKey, JSON.stringify({ backups }));
  refBackups.value = [...backups];
}
function backupUserData(data) {
  const backups = getUserDataBackups();
  const hasRecentBackup =
    backups.length > 0 && backups[0].timestamp > Date.now() - hoursBetweenBackups * 36e5;
  if (hasRecentBackup) {
    return;
  }
  backups.unshift({
    data,
    timestamp: Date.now(),
  });
  while (backups.length > maxBackups) {
    backups.pop();
  }
  saveBackups(backups);
}
function deleteUserDataBackup(backup) {
  const backups = getUserDataBackups().filter(x => x !== backup);
  saveBackups(backups);
}
export { backupUserData, deleteUserDataBackup, getUserDataBackups };
