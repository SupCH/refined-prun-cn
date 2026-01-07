import { migrateVersionedUserData } from './user-data-versioned-migrations.js';
const migrations = [
  [
    '02.01.2026 Fix action package names',
    userData => {
      if (userData.actionPackages && Array.isArray(userData.actionPackages)) {
        let migrated = 0;
        for (const pkg of userData.actionPackages) {
          if (
            pkg.global?.name &&
            (pkg.global.name.includes(':') ||
              (pkg.global.name.includes('_') && !pkg.global.name.includes(' ')))
          ) {
            const oldName = pkg.global.name;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1kYXRhLW1pZ3JhdGlvbnMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdG9yZS91c2VyLWRhdGEtbWlncmF0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5pbXBvcnQgeyBtaWdyYXRlVmVyc2lvbmVkVXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YS12ZXJzaW9uZWQtbWlncmF0aW9ucyc7XG5cbnR5cGUgTWlncmF0aW9uID0gW2lkOiBzdHJpbmcsIG1pZ3JhdGlvbjogKHVzZXJEYXRhOiBhbnkpID0+IHZvaWRdO1xuXG4vLyBOZXcgbWlncmF0aW9ucyBzaG91bGQgYmUgYWRkZWQgdG8gdGhlIHRvcCBvZiB0aGUgbGlzdC5cbmNvbnN0IG1pZ3JhdGlvbnM6IE1pZ3JhdGlvbltdID0gW1xuICBbXG4gICAgJzAyLjAxLjIwMjYgRml4IGFjdGlvbiBwYWNrYWdlIG5hbWVzJyxcbiAgICB1c2VyRGF0YSA9PiB7XG4gICAgICAvLyBNaWdyYXRlIG9sZCBwYWNrYWdlIG5hbWVzOiByZW1vdmUgY29sb25zIGFuZCBoYW5kbGUgdW5kZXJzY29yZXMvc3BhY2VzIGNvbnNpc3RlbnRseVxuICAgICAgaWYgKHVzZXJEYXRhLmFjdGlvblBhY2thZ2VzICYmIEFycmF5LmlzQXJyYXkodXNlckRhdGEuYWN0aW9uUGFja2FnZXMpKSB7XG4gICAgICAgIGxldCBtaWdyYXRlZCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgcGtnIG9mIHVzZXJEYXRhLmFjdGlvblBhY2thZ2VzKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcGtnLmdsb2JhbD8ubmFtZSAmJlxuICAgICAgICAgICAgKHBrZy5nbG9iYWwubmFtZS5pbmNsdWRlcygnOicpIHx8XG4gICAgICAgICAgICAgIChwa2cuZ2xvYmFsLm5hbWUuaW5jbHVkZXMoJ18nKSAmJiAhcGtnLmdsb2JhbC5uYW1lLmluY2x1ZGVzKCcgJykpKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc3Qgb2xkTmFtZSA9IHBrZy5nbG9iYWwubmFtZTtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBjb2xvbnMgYW5kIGNvbnZlcnQgdW5kZXJzY29yZXMgdG8gc3BhY2VzIGZvciBzdGFuZGFyZCBzdG9yYWdlIGZvcm1hdFxuICAgICAgICAgICAgcGtnLmdsb2JhbC5uYW1lID0gb2xkTmFtZS5yZXBsYWNlKC86L2csICcnKS5yZXBsYWNlKC9fL2csICcgJyk7XG4gICAgICAgICAgICBtaWdyYXRlZCsrO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFtNaWdyYXRpb25dIEZpeGVkIHBhY2thZ2UgbmFtZTogXCIke29sZE5hbWV9XCIgLT4gXCIke3BrZy5nbG9iYWwubmFtZX1cImApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWlncmF0ZWQgPiAwKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYFtNaWdyYXRpb25dIEZpeGVkICR7bWlncmF0ZWR9IGFjdGlvbiBwYWNrYWdlIG5hbWUocylgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICAnMjUuMTIuMjAyNSBSZW5hbWUgZmVhdHVyZXMnLFxuICAgIHVzZXJEYXRhID0+IHtcbiAgICAgIHJlbmFtZUZlYXR1cmUoJ2N1c3RvbS1pdGVtLXNvcnRpbmcnLCAnaW52LWN1c3RvbS1pdGVtLXNvcnRpbmcnKTtcbiAgICAgIHJlbmFtZUZlYXR1cmUoJ2l0ZW0tbWFya2VycycsICdpbnYtaXRlbS1tYXJrZXJzJyk7XG4gICAgICByZW5hbWVGZWF0dXJlKCdzaG93LXNwYWNlLXJlbWFpbmluZycsICdpbnYtc2hvdy1zcGFjZS1yZW1haW5pbmcnKTtcblxuICAgICAgZnVuY3Rpb24gcmVuYW1lRmVhdHVyZShvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBkaXNhYmxlZCA9IHVzZXJEYXRhLnNldHRpbmdzLmRpc2FibGVkO1xuICAgICAgICBjb25zdCBpbmRleCA9IGRpc2FibGVkLmluZGV4T2Yob2xkTmFtZSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBkaXNhYmxlZFtpbmRleF0gPSBuZXdOYW1lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgXSxcbiAgW1xuICAgICcyNS4xMi4yMDI1IEFkZCBhdWRpbyB2b2x1bWUnLFxuICAgIHVzZXJEYXRhID0+IHtcbiAgICAgIHVzZXJEYXRhLnNldHRpbmdzLmF1ZGlvVm9sdW1lID0gMC40O1xuICAgIH0sXG4gIF0sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gbWlncmF0ZVVzZXJEYXRhKHVzZXJEYXRhOiBhbnkpIHtcbiAgLy8gVGhlIG1pZ3JhdGlvbnMgYXJlIG9yZGVyZWQgZnJvbSBuZXdlc3QgdG8gb2xkZXN0LCBidXQgd2Ugd2FudCB0byBydW4gdGhlbSBpbiBvcmRlci5cbiAgY29uc3Qgb3JkZXJlZE1pZ3JhdGlvbnMgPSBtaWdyYXRpb25zLnNsaWNlKCkucmV2ZXJzZSgpO1xuICBpZiAodXNlckRhdGEudmVyc2lvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbWlncmF0ZVZlcnNpb25lZFVzZXJEYXRhKHVzZXJEYXRhKTtcbiAgICBkZWxldGUgdXNlckRhdGEudmVyc2lvbjtcbiAgICAvLyBBZnRlciB0aGUgdmVyc2lvbmVkIG1pZ3JhdGlvbiwgd2Ugc2hvdWxkIHJ1biBhbGwgdGhlIG5hbWVkIG1pZ3JhdGlvbnMuXG4gICAgLy8gU2V0dGluZyB0aGUgbWlncmF0aW9uIGxpc3QgdG8gYW4gZW1wdHkgYXJyYXkgd2lsbCB0cmlnZ2VyIHRoYXQuXG4gICAgdXNlckRhdGEubWlncmF0aW9ucyA9IFtdO1xuICB9XG4gIGlmICh1c2VyRGF0YS5taWdyYXRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBUaGUgaW5pdGlhbCB1c2VyIGRhdGEgaXMgYWxyZWFkeSBtaWdyYXRlZCwgc28ganVzdCBhZGQgYWxsIG1pZ3JhdGlvbnMgdG8gdGhlIGxpc3QuXG4gICAgdXNlckRhdGEubWlncmF0aW9ucyA9IG9yZGVyZWRNaWdyYXRpb25zLm1hcCh4ID0+IHhbMF0pO1xuICB9XG4gIGNvbnN0IHBlcmZvcm1lZCA9IG5ldyBTZXQodXNlckRhdGEubWlncmF0aW9ucyk7XG4gIGZvciAoY29uc3QgW2lkLCBtaWdyYXRpb25dIG9mIG9yZGVyZWRNaWdyYXRpb25zKSB7XG4gICAgaWYgKCFwZXJmb3JtZWQuaGFzKGlkKSkge1xuICAgICAgbWlncmF0aW9uKHVzZXJEYXRhKTtcbiAgICAgIHVzZXJEYXRhLm1pZ3JhdGlvbnMucHVzaChpZCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB1c2VyRGF0YTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsTUFBTSxhQUEwQjtBQUFBLEVBQzlCO0FBQUEsSUFDRTtBQUFBLElBQ0EsQ0FBQSxhQUFZO0FBRVYsVUFBSSxTQUFTLGtCQUFrQixNQUFNLFFBQVEsU0FBUyxjQUFjLEdBQUc7QUFDckUsWUFBSSxXQUFXO0FBQ2YsbUJBQVcsT0FBTyxTQUFTLGdCQUFnQjtBQUN6QyxjQUNFLElBQUksUUFBUSxTQUNYLElBQUksT0FBTyxLQUFLLFNBQVMsR0FBRyxLQUMxQixJQUFJLE9BQU8sS0FBSyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksT0FBTyxLQUFLLFNBQVMsR0FBRyxJQUNqRTtBQUNBLGtCQUFNLFVBQVUsSUFBSSxPQUFPO0FBRTNCLGdCQUFJLE9BQU8sT0FBTyxRQUFRLFFBQVEsTUFBTSxFQUFFLEVBQUUsUUFBUSxNQUFNLEdBQUc7QUFDN0Q7QUFDQSxvQkFBUSxJQUFJLG9DQUFvQyxPQUFPLFNBQVMsSUFBSSxPQUFPLElBQUksR0FBRztBQUFBLFVBQ3BGO0FBQUEsUUFDRjtBQUNBLFlBQUksV0FBVyxHQUFHO0FBQ2hCLGtCQUFRLElBQUkscUJBQXFCLFFBQVEseUJBQXlCO0FBQUEsUUFDcEU7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQUE7QUFBQSxFQUVGO0FBQUEsSUFDRTtBQUFBLElBQ0EsQ0FBQSxhQUFZO0FBQ1Ysb0JBQWMsdUJBQXVCLHlCQUF5QjtBQUM5RCxvQkFBYyxnQkFBZ0Isa0JBQWtCO0FBQ2hELG9CQUFjLHdCQUF3QiwwQkFBMEI7QUFFaEUsZUFBUyxjQUFjLFNBQWlCLFNBQWlCO0FBQ3ZELGNBQU0sV0FBVyxTQUFTLFNBQVM7QUFDbkMsY0FBTSxRQUFRLFNBQVMsUUFBUSxPQUFPO0FBQ3RDLFlBQUksVUFBVSxJQUFJO0FBQ2hCLG1CQUFTLEtBQUssSUFBSTtBQUFBLFFBQ3BCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUFBO0FBQUEsRUFFRjtBQUFBLElBQ0U7QUFBQSxJQUNBLENBQUEsYUFBWTtBQUNWLGVBQVMsU0FBUyxjQUFjO0FBQUEsSUFDbEM7QUFBQSxFQUFBO0FBRUo7QUFFTyxTQUFTLGdCQUFnQixVQUFlO0FBRTdDLFFBQU0sb0JBQW9CLFdBQVcsTUFBQSxFQUFRLFFBQUE7QUFDN0MsTUFBSSxTQUFTLFlBQVksUUFBVztBQUNsQyw2QkFBeUIsUUFBUTtBQUNqQyxXQUFPLFNBQVM7QUFHaEIsYUFBUyxhQUFhLENBQUE7QUFBQSxFQUN4QjtBQUNBLE1BQUksU0FBUyxlQUFlLFFBQVc7QUFFckMsYUFBUyxhQUFhLGtCQUFrQixJQUFJLENBQUEsTUFBSyxFQUFFLENBQUMsQ0FBQztBQUFBLEVBQ3ZEO0FBQ0EsUUFBTSxZQUFZLElBQUksSUFBSSxTQUFTLFVBQVU7QUFDN0MsYUFBVyxDQUFDLElBQUksU0FBUyxLQUFLLG1CQUFtQjtBQUMvQyxRQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsR0FBRztBQUN0QixnQkFBVSxRQUFRO0FBQ2xCLGVBQVMsV0FBVyxLQUFLLEVBQUU7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQ1Q7In0=
