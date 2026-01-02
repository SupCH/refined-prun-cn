function isValidUrl(url) {
  if (!url) {
    return false;
  }
  try {
    return Boolean(new URL(url));
  } catch {
    return false;
  }
}
export { isValidUrl };
