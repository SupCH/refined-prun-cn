function map(values, selector) {
  const args = [];
  for (const value of values) {
    if (value === void 0) {
      return void 0;
    }
    args.push(value);
  }
  return selector(...args);
}
export { map };
