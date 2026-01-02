const any = [];
const registry = /* @__PURE__ */ new Map();
function onAnyApiMessage(handler) {
  any.push(handler);
}
function onApiMessage(handlers) {
  for (const type in handlers) {
    let list = registry.get(type);
    if (!list) {
      list = [];
      registry.set(type, list);
    }
    list.push(handlers[type]);
  }
}
function dispatch(message) {
  let changed = false;
  for (const handler of any) {
    const result = handler(message);
    if (result) {
      changed = true;
    }
  }
  const handlers = registry.get(message.type);
  if (handlers) {
    for (const handler of handlers) {
      const result = handler(message.data);
      if (result) {
        changed = true;
      }
    }
  }
  return changed;
}
export { dispatch, onAnyApiMessage, onApiMessage };
