function removeArrayElement(array, item) {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
}
export { removeArrayElement as default };
