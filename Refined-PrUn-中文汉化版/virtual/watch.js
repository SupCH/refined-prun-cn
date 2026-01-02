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
