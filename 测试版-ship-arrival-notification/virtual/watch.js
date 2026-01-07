import onNodeDisconnected from './on-node-disconnected.js';
import { watch, watchEffect } from './runtime-core.esm-bundler.js';
async function watchUntil(condition) {
  await new Promise(resolve => {
    let unwatch = void 0;
    unwatch = watch(
      condition,
      result => {
        if (result) {
          unwatch?.();
          resolve();
        }
      },
      { immediate: true },
    );
  });
}
async function watchWhile(condition) {
  await new Promise(resolve => {
    let unwatch = void 0;
    unwatch = watch(
      condition,
      result => {
        if (!result) {
          unwatch?.();
          resolve();
        }
      },
      { immediate: true },
    );
  });
}
function watchEffectWhileNodeAlive(node, effect, options) {
  const stop = watchEffect(effect, options);
  onNodeDisconnected(node, stop);
  return stop;
}
export { watchEffectWhileNodeAlive, watchUntil, watchWhile };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2guanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy93YXRjaC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXYXRjaEVmZmVjdCwgV2F0Y2hPcHRpb25zQmFzZSwgV2F0Y2hTdG9wSGFuZGxlIH0gZnJvbSAndnVlJztcbmltcG9ydCBvbk5vZGVEaXNjb25uZWN0ZWQgZnJvbSAnQHNyYy91dGlscy9vbi1ub2RlLWRpc2Nvbm5lY3RlZCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3YXRjaFVudGlsKGNvbmRpdGlvbjogUmVmPGJvb2xlYW4+IHwgKCgpID0+IGJvb2xlYW4pKSB7XG4gIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgIGxldCB1bndhdGNoOiBXYXRjaFN0b3BIYW5kbGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgdW53YXRjaCA9IHdhdGNoKFxuICAgICAgY29uZGl0aW9uLFxuICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHVud2F0Y2g/LigpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHsgaW1tZWRpYXRlOiB0cnVlIH0sXG4gICAgKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3YXRjaFdoaWxlKGNvbmRpdGlvbjogUmVmPGJvb2xlYW4+IHwgKCgpID0+IGJvb2xlYW4pKSB7XG4gIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgIGxldCB1bndhdGNoOiBXYXRjaFN0b3BIYW5kbGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgdW53YXRjaCA9IHdhdGNoKFxuICAgICAgY29uZGl0aW9uLFxuICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICB1bndhdGNoPy4oKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7IGltbWVkaWF0ZTogdHJ1ZSB9LFxuICAgICk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZShcbiAgbm9kZTogTm9kZSxcbiAgZWZmZWN0OiBXYXRjaEVmZmVjdCxcbiAgb3B0aW9ucz86IFdhdGNoT3B0aW9uc0Jhc2UsXG4pIHtcbiAgY29uc3Qgc3RvcCA9IHdhdGNoRWZmZWN0KGVmZmVjdCwgb3B0aW9ucyk7XG4gIG9uTm9kZURpc2Nvbm5lY3RlZChub2RlLCBzdG9wKTtcbiAgcmV0dXJuIHN0b3A7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxlQUFBLFdBQUEsV0FBQTtBQUNFLFFBQUEsSUFBQSxRQUFBLENBQUEsWUFBQTtBQUNFLFFBQUEsVUFBQTtBQUNBLGNBQUE7QUFBQSxNQUFVO0FBQUEsTUFDUixDQUFBLFdBQUE7QUFFRSxZQUFBLFFBQUE7QUFDRSxvQkFBQTtBQUNBLGtCQUFBO0FBQUEsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNGLEVBQUEsV0FBQSxLQUFBO0FBQUEsSUFDa0I7QUFBQSxFQUNwQixDQUFBO0FBRUo7QUFFQSxlQUFBLFdBQUEsV0FBQTtBQUNFLFFBQUEsSUFBQSxRQUFBLENBQUEsWUFBQTtBQUNFLFFBQUEsVUFBQTtBQUNBLGNBQUE7QUFBQSxNQUFVO0FBQUEsTUFDUixDQUFBLFdBQUE7QUFFRSxZQUFBLENBQUEsUUFBQTtBQUNFLG9CQUFBO0FBQ0Esa0JBQUE7QUFBQSxRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0YsRUFBQSxXQUFBLEtBQUE7QUFBQSxJQUNrQjtBQUFBLEVBQ3BCLENBQUE7QUFFSjtBQUVPLFNBQUEsMEJBQUEsTUFBQSxRQUFBLFNBQUE7QUFLTCxRQUFBLE9BQUEsWUFBQSxRQUFBLE9BQUE7QUFDQSxxQkFBQSxNQUFBLElBQUE7QUFDQSxTQUFBO0FBQ0Y7In0=
