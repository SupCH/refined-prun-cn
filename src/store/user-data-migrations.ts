/* eslint-disable @typescript-eslint/no-explicit-any */
import { migrateVersionedUserData } from '@src/store/user-data-versioned-migrations';

type Migration = [id: string, migration: (userData: any) => void];

// New migrations should be added to the top of the list.
const migrations: Migration[] = [
  [
    '02.01.2026 Fix action package names',
    userData => {
      // Migrate old package names: remove colons and handle underscores/spaces consistently
      if (userData.actionPackages && Array.isArray(userData.actionPackages)) {
        let migrated = 0;
        for (const pkg of userData.actionPackages) {
          if (
            pkg.global?.name &&
            (pkg.global.name.includes(':') ||
              (pkg.global.name.includes('_') && !pkg.global.name.includes(' ')))
          ) {
            const oldName = pkg.global.name;
            // Remove colons and convert underscores to spaces for standard storage format
            pkg.global.name = oldName.replace(/:/g, '').replace(/_/g, ' ');
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

      function renameFeature(oldName: string, newName: string) {
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

export function migrateUserData(userData: any) {
  // The migrations are ordered from newest to oldest, but we want to run them in order.
  const orderedMigrations = migrations.slice().reverse();
  if (userData.version !== undefined) {
    migrateVersionedUserData(userData);
    delete userData.version;
    // After the versioned migration, we should run all the named migrations.
    // Setting the migration list to an empty array will trigger that.
    userData.migrations = [];
  }
  if (userData.migrations === undefined) {
    // The initial user data is already migrated, so just add all migrations to the list.
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
