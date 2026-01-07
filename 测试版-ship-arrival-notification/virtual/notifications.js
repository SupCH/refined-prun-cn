import { $ } from './select-dom.js';
import { C } from './prun-css.js';
import oneMutation from './index8.js';
async function waitNotificationLoaded(container) {
  const content = await $(container, C.AlertListItem.content);
  const isLoaded = () => !content.textContent?.includes('…');
  if (!isLoaded()) {
    await oneMutation(content, {
      childList: true,
      subtree: true,
      characterData: true,
      filter: isLoaded,
    });
  }
  return content;
}
export { waitNotificationLoaded };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvbm90aWZpY2F0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb25lTXV0YXRpb24gZnJvbSAnb25lLW11dGF0aW9uJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdhaXROb3RpZmljYXRpb25Mb2FkZWQoY29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICBjb25zdCBjb250ZW50ID0gYXdhaXQgJChjb250YWluZXIsIEMuQWxlcnRMaXN0SXRlbS5jb250ZW50KTtcbiAgLy8gRG9uJ3QgbWVzcyB3aXRoIGxvYWRpbmcgbm90aWZpY2F0aW9uc1xuICBjb25zdCBpc0xvYWRlZCA9ICgpID0+ICFjb250ZW50LnRleHRDb250ZW50Py5pbmNsdWRlcygn4oCmJyk7XG4gIGlmICghaXNMb2FkZWQoKSkge1xuICAgIGF3YWl0IG9uZU11dGF0aW9uKGNvbnRlbnQsIHtcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgICAgZmlsdGVyOiBpc0xvYWRlZCxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxlQUFBLHVCQUFBLFdBQUE7QUFDRSxRQUFBLFVBQUEsTUFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBLE9BQUE7QUFFQSxRQUFBLFdBQUEsTUFBQSxDQUFBLFFBQUEsYUFBQSxTQUFBLEdBQUE7QUFDQSxNQUFBLENBQUEsU0FBQSxHQUFBO0FBQ0UsVUFBQSxZQUFBLFNBQUE7QUFBQSxNQUEyQixXQUFBO0FBQUEsTUFDZCxTQUFBO0FBQUEsTUFDRixlQUFBO0FBQUEsTUFDTSxRQUFBO0FBQUEsSUFDUCxDQUFBO0FBQUEsRUFDVDtBQUVILFNBQUE7QUFDRjsifQ==
