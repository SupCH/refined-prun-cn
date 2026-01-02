const callbackMap = /* @__PURE__ */ new WeakMap();
const removed = /* @__PURE__ */ new Set();
function onNodeTreeMutation(node, callback) {
  let callbacks = callbackMap.get(node) ?? [];
  if (callbacks.length === 0) {
    callbackMap.set(node, callbacks);
    const observer = new MutationObserver(mutations => {
      for (const callback2 of callbacks) {
        try {
          if (callback2(mutations)) {
            removed.add(callback2);
          }
        } catch (e) {
          console.error(e);
          removed.add(callback2);
        }
      }
      if (removed.size > 0) {
        const next = callbacks.filter(x => !removed.has(x));
        if (next.length === 0) {
          callbackMap.delete(node);
          observer.disconnect();
        } else {
          callbacks = next;
          callbackMap.set(node, callbacks);
        }
      }
      removed.clear();
    });
    observer.observe(node, { childList: true, subtree: true });
  }
  callbacks.push(callback);
}
export { onNodeTreeMutation };
