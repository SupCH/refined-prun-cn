import { migrateVersionedUserData } from './user-data-versioned-migrations.js';
const migrations = [
  [
    '02.01.2026 Fix action package names',
    userData => {
      if (userData.actionPackages && Array.isArray(userData.actionPackages)) {
        let migrated = 0;
        for (const pkg of userData.actionPackages) {
          if (pkg.global?.name && pkg.global.name.includes(' ')) {
            const oldName = pkg.global.name;
            pkg.global.name = oldName.replace(/\s+/g, '_').replace(/:/g, '');
            migrated++;
            console.log(`[Migration] Fixed package name: "${oldName}" -> "${pkg.global.name}"`);
          }
        }
        if (migrated > 0) {
          console.log(`[Migration] Fixed ${migrated} action package name(s)`);
        }
      }
    },
  ],
  [
    '25.12.2025 Rename features',
    userData => {
      renameFeature('custom-item-sorting', 'inv-custom-item-sorting');
      renameFeature('item-markers', 'inv-item-markers');
      renameFeature('show-space-remaining', 'inv-show-space-remaining');
      function renameFeature(oldName, newName) {
        const disabled = userData.settings.disabled;
        const index = disabled.indexOf(oldName);
        if (index !== -1) {
          disabled[index] = newName;
        }
      }
    },
  ],
  [
    '25.12.2025 Add audio volume',
    userData => {
      userData.settings.audioVolume = 0.4;
    },
  ],
];
function migrateUserData(userData) {
  const orderedMigrations = migrations.slice().reverse();
  if (userData.version !== void 0) {
    migrateVersionedUserData(userData);
    delete userData.version;
    userData.migrations = [];
  }
  if (userData.migrations === void 0) {
    userData.migrations = orderedMigrations.map(x => x[0]);
  }
  const performed = new Set(userData.migrations);
  for (const [id, migration] of orderedMigrations) {
    if (!performed.has(id)) {
      migration(userData);
      userData.migrations.push(id);
    }
  }
  return userData;
}
export { migrateUserData };
