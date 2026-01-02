const ids = /* @__PURE__ */ new WeakMap();
let nextId = 0;
function objectId(obj) {
  let id = ids.get(obj);
  if (id === void 0) {
    id = nextId++;
    ids.set(obj, id);
  }
  return id;
}
export { objectId };
