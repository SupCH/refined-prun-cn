import onetime from './index7.js';
import { onNodeTreeMutation } from './on-node-tree-mutation.js';
let elements = [];
function onNodeDisconnected(node, callback) {
  if (!node.isConnected) {
    callback();
    return;
  }
  setupObserver();
  elements.push([node, callback]);
}
const setupObserver = onetime(() => onNodeTreeMutation(document, checkConnected));
function checkConnected(mutations) {
  if (mutations.every(x => x.removedNodes.length === 0)) {
    return;
  }
  const currentElements = elements;
  elements = [];
  for (const element of currentElements) {
    if (element[0].isConnected) {
      elements.push(element);
      continue;
    }
    try {
      element[1]();
    } catch (e) {
      console.error(e);
    }
  }
}
export { onNodeDisconnected as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tbm9kZS1kaXNjb25uZWN0ZWQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9vbi1ub2RlLWRpc2Nvbm5lY3RlZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb25ldGltZSBmcm9tICdvbmV0aW1lJztcbmltcG9ydCB7IG9uTm9kZVRyZWVNdXRhdGlvbiB9IGZyb20gJ0BzcmMvdXRpbHMvb24tbm9kZS10cmVlLW11dGF0aW9uJztcblxubGV0IGVsZW1lbnRzOiBbTm9kZSwgKCkgPT4gdm9pZF1bXSA9IFtdO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbk5vZGVEaXNjb25uZWN0ZWQobm9kZTogTm9kZSwgY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgaWYgKCFub2RlLmlzQ29ubmVjdGVkKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBzZXR1cE9ic2VydmVyKCk7XG4gIGVsZW1lbnRzLnB1c2goW25vZGUsIGNhbGxiYWNrXSk7XG59XG5cbmNvbnN0IHNldHVwT2JzZXJ2ZXIgPSBvbmV0aW1lKCgpID0+IG9uTm9kZVRyZWVNdXRhdGlvbihkb2N1bWVudCwgY2hlY2tDb25uZWN0ZWQpKTtcblxuZnVuY3Rpb24gY2hlY2tDb25uZWN0ZWQobXV0YXRpb25zOiBNdXRhdGlvblJlY29yZFtdKSB7XG4gIGlmIChtdXRhdGlvbnMuZXZlcnkoeCA9PiB4LnJlbW92ZWROb2Rlcy5sZW5ndGggPT09IDApKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGN1cnJlbnRFbGVtZW50cyA9IGVsZW1lbnRzO1xuICBlbGVtZW50cyA9IFtdO1xuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY3VycmVudEVsZW1lbnRzKSB7XG4gICAgaWYgKGVsZW1lbnRbMF0uaXNDb25uZWN0ZWQpIHtcbiAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGVsZW1lbnRbMV0oKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsSUFBSSxXQUFpQyxDQUFBO0FBRXJDLFNBQXdCLG1CQUFtQixNQUFZLFVBQXNCO0FBQzNFLE1BQUksQ0FBQyxLQUFLLGFBQWE7QUFDckIsYUFBQTtBQUNBO0FBQUEsRUFDRjtBQUVBLGdCQUFBO0FBQ0EsV0FBUyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDaEM7QUFFQSxNQUFNLGdCQUFnQixRQUFRLE1BQU0sbUJBQW1CLFVBQVUsY0FBYyxDQUFDO0FBRWhGLFNBQVMsZUFBZSxXQUE2QjtBQUNuRCxNQUFJLFVBQVUsTUFBTSxDQUFBLE1BQUssRUFBRSxhQUFhLFdBQVcsQ0FBQyxHQUFHO0FBQ3JEO0FBQUEsRUFDRjtBQUNBLFFBQU0sa0JBQWtCO0FBQ3hCLGFBQVcsQ0FBQTtBQUNYLGFBQVcsV0FBVyxpQkFBaUI7QUFDckMsUUFBSSxRQUFRLENBQUMsRUFBRSxhQUFhO0FBQzFCLGVBQVMsS0FBSyxPQUFPO0FBQ3JCO0FBQUEsSUFDRjtBQUNBLFFBQUk7QUFDRixjQUFRLENBQUMsRUFBQTtBQUFBLElBQ1gsU0FBUyxHQUFHO0FBQ1YsY0FBUSxNQUFNLENBQUM7QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7QUFDRjsifQ==
