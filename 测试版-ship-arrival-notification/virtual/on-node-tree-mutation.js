const callbackMap = /* @__PURE__ */ new WeakMap();
const removed = /* @__PURE__ */ new Set();
function onNodeTreeMutation(node, callback) {
  let callbacks = callbackMap.get(node) ?? [];
  if (callbacks.length === 0) {
    callbackMap.set(node, callbacks);
    const observer = new MutationObserver(mutations => {
      for (const callback2 of callbacks) {
        try {
          if (callback2(mutations)) {
            removed.add(callback2);
          }
        } catch (e) {
          console.error(e);
          removed.add(callback2);
        }
      }
      if (removed.size > 0) {
        const next = callbacks.filter(x => !removed.has(x));
        if (next.length === 0) {
          callbackMap.delete(node);
          observer.disconnect();
        } else {
          callbacks = next;
          callbackMap.set(node, callbacks);
        }
      }
      removed.clear();
    });
    observer.observe(node, { childList: true, subtree: true });
  }
  callbacks.push(callback);
}
export { onNodeTreeMutation };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tbm9kZS10cmVlLW11dGF0aW9uLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvb24tbm9kZS10cmVlLW11dGF0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbInR5cGUgTXV0YXRpb25DYWxsYmFjayA9IChtdXRhdGlvbnM6IE11dGF0aW9uUmVjb3JkW10pID0+IGJvb2xlYW4gfCB2b2lkO1xuXG5jb25zdCBjYWxsYmFja01hcCA9IG5ldyBXZWFrTWFwPE5vZGUsIE11dGF0aW9uQ2FsbGJhY2tbXT4oKTtcbmNvbnN0IHJlbW92ZWQgPSBuZXcgU2V0PE11dGF0aW9uQ2FsbGJhY2s+KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5vZGVUcmVlTXV0YXRpb24obm9kZTogTm9kZSwgY2FsbGJhY2s6IE11dGF0aW9uQ2FsbGJhY2spIHtcbiAgbGV0IGNhbGxiYWNrcyA9IGNhbGxiYWNrTWFwLmdldChub2RlKSA/PyBbXTtcbiAgaWYgKGNhbGxiYWNrcy5sZW5ndGggPT09IDApIHtcbiAgICBjYWxsYmFja01hcC5zZXQobm9kZSwgY2FsbGJhY2tzKTtcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9ucyA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIGNhbGxiYWNrcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChjYWxsYmFjayhtdXRhdGlvbnMpKSB7XG4gICAgICAgICAgICByZW1vdmVkLmFkZChjYWxsYmFjayk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICByZW1vdmVkLmFkZChjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChyZW1vdmVkLnNpemUgPiAwKSB7XG4gICAgICAgIGNvbnN0IG5leHQgPSBjYWxsYmFja3MuZmlsdGVyKHggPT4gIXJlbW92ZWQuaGFzKHgpKTtcbiAgICAgICAgaWYgKG5leHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgY2FsbGJhY2tNYXAuZGVsZXRlKG5vZGUpO1xuICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFja3MgPSBuZXh0O1xuICAgICAgICAgIGNhbGxiYWNrTWFwLnNldChub2RlLCBjYWxsYmFja3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZW1vdmVkLmNsZWFyKCk7XG4gICAgfSk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG59XG4iXSwibmFtZXMiOlsiY2FsbGJhY2siXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sa0NBQWtCLFFBQUE7QUFDeEIsTUFBTSw4QkFBYyxJQUFBO0FBRWIsU0FBUyxtQkFBbUIsTUFBWSxVQUE0QjtBQUN6RSxNQUFJLFlBQVksWUFBWSxJQUFJLElBQUksS0FBSyxDQUFBO0FBQ3pDLE1BQUksVUFBVSxXQUFXLEdBQUc7QUFDMUIsZ0JBQVksSUFBSSxNQUFNLFNBQVM7QUFDL0IsVUFBTSxXQUFXLElBQUksaUJBQWlCLENBQUEsY0FBYTtBQUNqRCxpQkFBV0EsYUFBWSxXQUFXO0FBQ2hDLFlBQUk7QUFDRixjQUFJQSxVQUFTLFNBQVMsR0FBRztBQUN2QixvQkFBUSxJQUFJQSxTQUFRO0FBQUEsVUFDdEI7QUFBQSxRQUNGLFNBQVMsR0FBRztBQUNWLGtCQUFRLE1BQU0sQ0FBQztBQUNmLGtCQUFRLElBQUlBLFNBQVE7QUFBQSxRQUN0QjtBQUFBLE1BQ0Y7QUFDQSxVQUFJLFFBQVEsT0FBTyxHQUFHO0FBQ3BCLGNBQU0sT0FBTyxVQUFVLE9BQU8sQ0FBQSxNQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQztBQUNsRCxZQUFJLEtBQUssV0FBVyxHQUFHO0FBQ3JCLHNCQUFZLE9BQU8sSUFBSTtBQUN2QixtQkFBUyxXQUFBO0FBQUEsUUFDWCxPQUFPO0FBQ0wsc0JBQVk7QUFDWixzQkFBWSxJQUFJLE1BQU0sU0FBUztBQUFBLFFBQ2pDO0FBQUEsTUFDRjtBQUNBLGNBQVEsTUFBQTtBQUFBLElBQ1YsQ0FBQztBQUNELGFBQVMsUUFBUSxNQUFNLEVBQUUsV0FBVyxNQUFNLFNBQVMsTUFBTTtBQUFBLEVBQzNEO0FBQ0EsWUFBVSxLQUFLLFFBQVE7QUFDekI7In0=
