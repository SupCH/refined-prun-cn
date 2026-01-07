import { onNodeTreeMutation } from './on-node-tree-mutation.js';
import { isEmpty } from './is-empty.js';
async function* streamHtmlCollection(root, elements) {
  const seenElements = /* @__PURE__ */ new WeakSet();
  for (const element of Array.from(elements)) {
    seenElements.add(element);
    yield element;
  }
  const newElements = [];
  let resolve = () => {};
  onNodeTreeMutation(root, mutations => {
    if (mutations.every(x => x.addedNodes.length === 0)) {
      return;
    }
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (!seenElements.has(element)) {
        seenElements.add(element);
        newElements.push(element);
      }
    }
    if (!isEmpty(newElements)) {
      resolve();
    }
  });
  while (true) {
    await new Promise(x => (resolve = x));
    while (!isEmpty(newElements)) {
      yield newElements.shift();
    }
  }
}
async function streamElementOfHtmlCollection(root, elements) {
  if (elements.length > 0) {
    return elements[0];
  }
  await new Promise(resolve => {
    onNodeTreeMutation(root, () => {
      if (elements.length > 0) {
        resolve();
        return true;
      }
      return false;
    });
  });
  return elements[0];
}
export { streamElementOfHtmlCollection, streamHtmlCollection };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLWh0bWwtY29sbGVjdGlvbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL3N0cmVhbS1odG1sLWNvbGxlY3Rpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ3RzLWV4dHJhcyc7XG5pbXBvcnQgeyBvbk5vZGVUcmVlTXV0YXRpb24gfSBmcm9tICdAc3JjL3V0aWxzL29uLW5vZGUtdHJlZS1tdXRhdGlvbic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiogc3RyZWFtSHRtbENvbGxlY3Rpb248VCBleHRlbmRzIEVsZW1lbnQ+KFxuICByb290OiBOb2RlLFxuICBlbGVtZW50czogSFRNTENvbGxlY3Rpb25PZjxUPixcbikge1xuICBjb25zdCBzZWVuRWxlbWVudHMgPSBuZXcgV2Vha1NldDxUPigpO1xuXG4gIC8vIEVudW1lcmF0ZSBlbGVtZW50cyB2aWEgQXJyYXkuZnJvbSB0byBwcmV2ZW50XG4gIC8vIGJ1Z3Mgd2hlbiB0aGUgSFRNTENvbGxlY3Rpb24gaXMgbW9kaWZpZWQgZHVyaW5nIHlpZWxkLlxuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgQXJyYXkuZnJvbShlbGVtZW50cykpIHtcbiAgICBzZWVuRWxlbWVudHMuYWRkKGVsZW1lbnQpO1xuICAgIHlpZWxkIGVsZW1lbnQ7XG4gIH1cblxuICBjb25zdCBuZXdFbGVtZW50czogVFtdID0gW107XG4gIGxldCByZXNvbHZlID0gKCkgPT4ge307XG4gIG9uTm9kZVRyZWVNdXRhdGlvbihyb290LCBtdXRhdGlvbnMgPT4ge1xuICAgIGlmIChtdXRhdGlvbnMuZXZlcnkoeCA9PiB4LmFkZGVkTm9kZXMubGVuZ3RoID09PSAwKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgICBpZiAoIXNlZW5FbGVtZW50cy5oYXMoZWxlbWVudCkpIHtcbiAgICAgICAgc2VlbkVsZW1lbnRzLmFkZChlbGVtZW50KTtcbiAgICAgICAgbmV3RWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWlzRW1wdHkobmV3RWxlbWVudHMpKSB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfVxuICB9KTtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPih4ID0+IChyZXNvbHZlID0geCkpO1xuICAgIHdoaWxlICghaXNFbXB0eShuZXdFbGVtZW50cykpIHtcbiAgICAgIHlpZWxkIG5ld0VsZW1lbnRzLnNoaWZ0KCkhO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RyZWFtRWxlbWVudE9mSHRtbENvbGxlY3Rpb248VCBleHRlbmRzIEVsZW1lbnQ+KFxuICByb290OiBOb2RlLFxuICBlbGVtZW50czogSFRNTENvbGxlY3Rpb25PZjxUPixcbikge1xuICBpZiAoZWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBlbGVtZW50c1swXSBhcyBUO1xuICB9XG5cbiAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG4gICAgb25Ob2RlVHJlZU11dGF0aW9uKHJvb3QsICgpID0+IHtcbiAgICAgIGlmIChlbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBlbGVtZW50c1swXSBhcyBUO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsZ0JBQXVCLHFCQUNyQixNQUNBLFVBQ0E7QUFDQSxRQUFNLG1DQUFtQixRQUFBO0FBSXpCLGFBQVcsV0FBVyxNQUFNLEtBQUssUUFBUSxHQUFHO0FBQzFDLGlCQUFhLElBQUksT0FBTztBQUN4QixVQUFNO0FBQUEsRUFDUjtBQUVBLFFBQU0sY0FBbUIsQ0FBQTtBQUN6QixNQUFJLFVBQVUsTUFBTTtBQUFBLEVBQUM7QUFDckIscUJBQW1CLE1BQU0sQ0FBQSxjQUFhO0FBQ3BDLFFBQUksVUFBVSxNQUFNLENBQUEsTUFBSyxFQUFFLFdBQVcsV0FBVyxDQUFDLEdBQUc7QUFDbkQ7QUFBQSxJQUNGO0FBQ0EsYUFBUyxJQUFJLEdBQUcsSUFBSSxTQUFTLFFBQVEsS0FBSztBQUN4QyxZQUFNLFVBQVUsU0FBUyxDQUFDO0FBQzFCLFVBQUksQ0FBQyxhQUFhLElBQUksT0FBTyxHQUFHO0FBQzlCLHFCQUFhLElBQUksT0FBTztBQUN4QixvQkFBWSxLQUFLLE9BQU87QUFBQSxNQUMxQjtBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsUUFBUSxXQUFXLEdBQUc7QUFDekIsY0FBQTtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDRCxTQUFPLE1BQU07QUFDWCxVQUFNLElBQUksUUFBYyxDQUFBLE1BQU0sVUFBVSxDQUFFO0FBQzFDLFdBQU8sQ0FBQyxRQUFRLFdBQVcsR0FBRztBQUM1QixZQUFNLFlBQVksTUFBQTtBQUFBLElBQ3BCO0FBQUEsRUFDRjtBQUNGO0FBRUEsZUFBc0IsOEJBQ3BCLE1BQ0EsVUFDQTtBQUNBLE1BQUksU0FBUyxTQUFTLEdBQUc7QUFDdkIsV0FBTyxTQUFTLENBQUM7QUFBQSxFQUNuQjtBQUVBLFFBQU0sSUFBSSxRQUFjLENBQUEsWUFBVztBQUNqQyx1QkFBbUIsTUFBTSxNQUFNO0FBQzdCLFVBQUksU0FBUyxTQUFTLEdBQUc7QUFDdkIsZ0JBQUE7QUFDQSxlQUFPO0FBQUEsTUFDVDtBQUNBLGFBQU87QUFBQSxJQUNULENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxTQUFPLFNBQVMsQ0FBQztBQUNuQjsifQ==
