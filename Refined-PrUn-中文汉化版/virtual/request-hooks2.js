let hooks = void 0;
function implementRequestHooks(newHooks) {
  hooks = newHooks;
}
const request = {
  production(siteId) {
    getHooks().production(siteId);
  },
  workforce(siteId) {
    getHooks().workforce(siteId);
  },
  cxos() {
    getHooks().cxos();
  },
  fxos() {
    getHooks().fxos();
  },
  blueprints() {
    getHooks().blueprints();
  },
  shipyards() {
    getHooks().shipyards();
  },
  shipyardProjects() {
    getHooks().shipyardProjects();
  },
};
function getHooks() {
  if (!hooks) {
    throw Error('Not implemented');
  }
  return hooks;
}
function createRequestGetter(getter, request2) {
  return value => {
    const result = getter(value);
    if (result !== void 0) {
      return result;
    }
    request2(value);
    return void 0;
  };
}
function createRequestStore(request2, store) {
  const wrapped = {};
  for (const key in store) {
    Object.defineProperty(wrapped, key, {
      get: () => {
        request2();
        return store[key];
      },
    });
  }
  wrapped.request = request2;
  return wrapped;
}
export { createRequestGetter, createRequestStore, implementRequestHooks, request };
