function observeDescendantListChanged(target, callback) {
  callback(target);
  const observer = new MutationObserver(() => callback(target));
  observer.observe(target, { childList: true, subtree: true });
}
export { observeDescendantListChanged };
