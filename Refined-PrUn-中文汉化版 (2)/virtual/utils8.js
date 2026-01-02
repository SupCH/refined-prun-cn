function isValidPackageName(name) {
  return /^[ 0-9a-zA-Z.-]*$/.test(name);
}
export { isValidPackageName };
