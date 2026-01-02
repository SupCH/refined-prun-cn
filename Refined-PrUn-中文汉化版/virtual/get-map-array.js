function getMapArray(map, key) {
  let array = map.get(key);
  if (array === void 0) {
    array = [];
    map.set(key, array);
  }
  return array;
}
export { getMapArray as default };
