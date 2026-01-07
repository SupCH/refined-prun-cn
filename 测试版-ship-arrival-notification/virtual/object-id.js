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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LWlkLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvb2JqZWN0LWlkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlkcyA9IG5ldyBXZWFrTWFwPG9iamVjdCwgbnVtYmVyPigpO1xubGV0IG5leHRJZCA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RJZChvYmo6IG9iamVjdCkge1xuICBsZXQgaWQgPSBpZHMuZ2V0KG9iaik7XG4gIGlmIChpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaWQgPSBuZXh0SWQrKztcbiAgICBpZHMuc2V0KG9iaiwgaWQpO1xuICB9XG4gIHJldHVybiBpZDtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLDBCQUFVLFFBQUE7QUFDaEIsSUFBSSxTQUFTO0FBRU4sU0FBUyxTQUFTLEtBQWE7QUFDcEMsTUFBSSxLQUFLLElBQUksSUFBSSxHQUFHO0FBQ3BCLE1BQUksT0FBTyxRQUFXO0FBQ3BCLFNBQUs7QUFDTCxRQUFJLElBQUksS0FBSyxFQUFFO0FBQUEsRUFDakI7QUFDQSxTQUFPO0FBQ1Q7In0=
