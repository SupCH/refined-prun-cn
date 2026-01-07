function sumBy(array, property) {
  if (array === void 0) {
    return void 0;
  }
  let result = 0;
  for (const item of array) {
    const value = property(item);
    if (value === void 0) {
      return void 0;
    }
    result += value;
  }
  return result;
}
export { sumBy };
