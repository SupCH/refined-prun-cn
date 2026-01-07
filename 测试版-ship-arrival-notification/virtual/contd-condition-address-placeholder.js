import { subscribe } from './subscribe-async-generator.js';
import { $$, _$$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { contractDraftsStore } from './contract-drafts.js';
import { getEntityNameFromAddress } from './addresses.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const draft = computed(() => contractDraftsStore.getByNaturalId(tile.parameter));
  let conditionIndex;
  subscribe($$(tile.anchor, C.Draft.conditions), conditions => {
    return subscribe($$(conditions, 'tr'), row => {
      const indexText = row.children[0]?.textContent;
      const conditionEditButton = _$$(row, C.Button.btn)[0];
      if (!indexText || conditionEditButton === void 0) {
        return;
      }
      conditionEditButton.addEventListener('click', () => {
        const index = parseInt(indexText.replace('#', ''));
        if (isFinite(index)) {
          conditionIndex = index - 1;
        }
      });
    });
  });
  subscribe($$(tile.anchor, C.DraftConditionEditor.form), async form => {
    if (conditionIndex === void 0) {
      return;
    }
    const address = draft.value?.conditions[conditionIndex]?.address;
    const name = getEntityNameFromAddress(address);
    conditionIndex = void 0;
    if (name) {
      const input = await $(form, C.AddressSelector.input);
      input.placeholder = name;
    }
  });
}
function init() {
  tiles.observe('CONTD', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'CONTD: Sets the current address as the placeholder for the address field of the condition editor.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGQtY29uZGl0aW9uLWFkZHJlc3MtcGxhY2Vob2xkZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9jb250ZC1jb25kaXRpb24tYWRkcmVzcy1wbGFjZWhvbGRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb250cmFjdERyYWZ0c1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2NvbnRyYWN0LWRyYWZ0cyc7XG5pbXBvcnQgeyBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3MgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYWRkcmVzc2VzJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgY29uc3QgZHJhZnQgPSBjb21wdXRlZCgoKSA9PiBjb250cmFjdERyYWZ0c1N0b3JlLmdldEJ5TmF0dXJhbElkKHRpbGUucGFyYW1ldGVyKSk7XG4gIGxldCBjb25kaXRpb25JbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuRHJhZnQuY29uZGl0aW9ucyksIGNvbmRpdGlvbnMgPT4ge1xuICAgIHJldHVybiBzdWJzY3JpYmUoJCQoY29uZGl0aW9ucywgJ3RyJyksIHJvdyA9PiB7XG4gICAgICBjb25zdCBpbmRleFRleHQgPSByb3cuY2hpbGRyZW5bMF0/LnRleHRDb250ZW50O1xuICAgICAgY29uc3QgY29uZGl0aW9uRWRpdEJ1dHRvbiA9IF8kJChyb3csIEMuQnV0dG9uLmJ0bilbMF07XG4gICAgICBpZiAoIWluZGV4VGV4dCB8fCBjb25kaXRpb25FZGl0QnV0dG9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uZGl0aW9uRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChpbmRleFRleHQucmVwbGFjZSgnIycsICcnKSk7XG4gICAgICAgIGlmIChpc0Zpbml0ZShpbmRleCkpIHtcbiAgICAgICAgICBjb25kaXRpb25JbmRleCA9IGluZGV4IC0gMTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuRHJhZnRDb25kaXRpb25FZGl0b3IuZm9ybSksIGFzeW5jIGZvcm0gPT4ge1xuICAgIGlmIChjb25kaXRpb25JbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGFkZHJlc3MgPSBkcmFmdC52YWx1ZT8uY29uZGl0aW9uc1tjb25kaXRpb25JbmRleF0/LmFkZHJlc3M7XG4gICAgY29uc3QgbmFtZSA9IGdldEVudGl0eU5hbWVGcm9tQWRkcmVzcyhhZGRyZXNzKTtcbiAgICBjb25kaXRpb25JbmRleCA9IHVuZGVmaW5lZDtcbiAgICBpZiAobmFtZSkge1xuICAgICAgY29uc3QgaW5wdXQgPSAoYXdhaXQgJChmb3JtLCBDLkFkZHJlc3NTZWxlY3Rvci5pbnB1dCkpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICBpbnB1dC5wbGFjZWhvbGRlciA9IG5hbWU7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZSgnQ09OVEQnLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnQ09OVEQ6IFNldHMgdGhlIGN1cnJlbnQgYWRkcmVzcyBhcyB0aGUgcGxhY2Vob2xkZXIgZm9yIHRoZSBhZGRyZXNzIGZpZWxkIG9mIHRoZSBjb25kaXRpb24gZWRpdG9yLicsXG4pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0EsU0FBQSxZQUFBLE1BQUE7QUFDRSxRQUFBLFFBQUEsU0FBQSxNQUFBLG9CQUFBLGVBQUEsS0FBQSxTQUFBLENBQUE7QUFDQSxNQUFBO0FBQ0EsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLE1BQUEsVUFBQSxHQUFBLENBQUEsZUFBQTtBQUNFLFdBQUEsVUFBQSxHQUFBLFlBQUEsSUFBQSxHQUFBLENBQUEsUUFBQTtBQUNFLFlBQUEsWUFBQSxJQUFBLFNBQUEsQ0FBQSxHQUFBO0FBQ0EsWUFBQSxzQkFBQSxJQUFBLEtBQUEsRUFBQSxPQUFBLEdBQUEsRUFBQSxDQUFBO0FBQ0EsVUFBQSxDQUFBLGFBQUEsd0JBQUEsUUFBQTtBQUNFO0FBQUEsTUFBQTtBQUVGLDBCQUFBLGlCQUFBLFNBQUEsTUFBQTtBQUNFLGNBQUEsUUFBQSxTQUFBLFVBQUEsUUFBQSxLQUFBLEVBQUEsQ0FBQTtBQUNBLFlBQUEsU0FBQSxLQUFBLEdBQUE7QUFDRSwyQkFBQSxRQUFBO0FBQUEsUUFBeUI7QUFBQSxNQUMzQixDQUFBO0FBQUEsSUFDRCxDQUFBO0FBQUEsRUFDRixDQUFBO0FBRUgsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLHFCQUFBLElBQUEsR0FBQSxPQUFBLFNBQUE7QUFDRSxRQUFBLG1CQUFBLFFBQUE7QUFDRTtBQUFBLElBQUE7QUFFRixVQUFBLFVBQUEsTUFBQSxPQUFBLFdBQUEsY0FBQSxHQUFBO0FBQ0EsVUFBQSxPQUFBLHlCQUFBLE9BQUE7QUFDQSxxQkFBQTtBQUNBLFFBQUEsTUFBQTtBQUNFLFlBQUEsUUFBQSxNQUFBLEVBQUEsTUFBQSxFQUFBLGdCQUFBLEtBQUE7QUFDQSxZQUFBLGNBQUE7QUFBQSxJQUFvQjtBQUFBLEVBQ3RCLENBQUE7QUFFSjtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxTQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUE7QUFBQSxFQUFTLFlBQUE7QUFBQSxFQUNLO0FBQUEsRUFDWjtBQUVGOyJ9
