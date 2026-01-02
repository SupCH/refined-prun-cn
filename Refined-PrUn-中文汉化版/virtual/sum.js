function sum(...values) {
  let result = 0;
  for (const item of values) {
    if (item === void 0) {
      return void 0;
    }
    result += item;
  }
  return result;
}
export { sum };
