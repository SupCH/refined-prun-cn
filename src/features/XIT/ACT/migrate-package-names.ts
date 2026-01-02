import { userData } from '@src/store/user-data';

/**
 * Migrate old action package names with spaces to new underscore format
 * This runs once on extension load to fix packages created before the naming fix
 */
export function migrateActionPackageNames() {
  let migrated = 0;

  for (const pkg of userData.actionPackages) {
    const oldName = pkg.global.name;

    // Check if name contains spaces (old format)
    if (oldName.includes(' ')) {
      // Replace all spaces with underscores and remove colons
      const newName = oldName.replace(/\s+/g, '_').replace(/:/g, '');

      // Update package name
      pkg.global.name = newName;
      migrated++;

      console.log(`[Migration] Renamed action package: "${oldName}" -> "${newName}"`);
    }
  }

  if (migrated > 0) {
    console.log(`[Migration] Successfully migrated ${migrated} action package(s)`);
  }
}
