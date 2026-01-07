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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXg4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vb25lLW11dGF0aW9uQDMuMC4xL25vZGVfbW9kdWxlcy9vbmUtbXV0YXRpb24vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gb25lTXV0YXRpb24obm9kZSwgeyBmaWx0ZXIsIHNpZ25hbCwgLi4ub3B0aW9ucyB9ID0ge30pIHtcbiAgICBpZiAoc2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNoYW5nZXMgPT4ge1xuICAgICAgICAgICAgaWYgKCFmaWx0ZXIgfHwgZmlsdGVyKGNoYW5nZXMpKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoY2hhbmdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIG9wdGlvbnMpO1xuICAgICAgICBzaWduYWw/LmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgKCkgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFlLGVBQWUsWUFBWSxNQUFNLEVBQUUsUUFBUSxRQUFRLEdBQUcsUUFBTyxJQUFLLElBQUk7QUFDakYsTUFBSSxRQUFRLFNBQVM7QUFDakIsV0FBTyxDQUFBO0FBQUEsRUFDWDtBQUNBLFNBQU8sSUFBSSxRQUFRLGFBQVc7QUFDMUIsVUFBTSxXQUFXLElBQUksaUJBQWlCLGFBQVc7QUFDN0MsVUFBSSxDQUFDLFVBQVUsT0FBTyxPQUFPLEdBQUc7QUFDNUIsaUJBQVMsV0FBVTtBQUNuQixnQkFBUSxPQUFPO0FBQUEsTUFDbkI7QUFBQSxJQUNKLENBQUM7QUFDRCxhQUFTLFFBQVEsTUFBTSxPQUFPO0FBQzlCLFlBQVEsaUJBQWlCLFNBQVMsTUFBTTtBQUNwQyxlQUFTLFdBQVU7QUFDbkIsY0FBUSxDQUFBLENBQUU7QUFBQSxJQUNkLENBQUM7QUFBQSxFQUNMLENBQUM7QUFDTDsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
