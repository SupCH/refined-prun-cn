async function oneMutation(node, { filter, signal, ...options } = {}) {
  if (signal?.aborted) {
    return [];
  }
  return new Promise(resolve => {
    const observer = new MutationObserver(changes => {
      if (!filter || filter(changes)) {
        observer.disconnect();
        resolve(changes);
      }
    });
    observer.observe(node, options);
    signal?.addEventListener('abort', () => {
      observer.disconnect();
      resolve([]);
    });
  });
}
export { oneMutation as default };
