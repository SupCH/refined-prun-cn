import { observeDescendantListChanged } from './mutation-observer.js';
function keepLast(owner, getParent, child) {
  observeDescendantListChanged(owner, () => {
    const parent = getParent();
    if (parent && parent.lastChild !== child) {
      parent.appendChild(child);
    }
  });
}
export { keepLast };
