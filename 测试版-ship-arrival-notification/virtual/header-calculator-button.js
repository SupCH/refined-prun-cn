import { $ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { showBuffer } from './buffers.js';
import TileControlsButton from './TileControlsButton.vue.js';
async function onTileReady(tile) {
  const tileControls = await $(tile.frame, C.TileFrame.controls);
  createFragmentApp(TileControlsButton, {
    icon: '',
    onClick: () => showBuffer('XIT CALC'),
    marginTop: 4,
  }).prependTo(tileControls);
  return;
}
function init() {
  tiles.observe(['LM', 'CX', 'XIT'], onTileReady);
}
features.add(
  import.meta.url,
  init,
  'Adds a calculator button to the buffer header of LM, CX and XIT commands.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNhbGN1bGF0b3ItYnV0dG9uLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvaGVhZGVyLWNhbGN1bGF0b3ItYnV0dG9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNob3dCdWZmZXIgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYnVmZmVycyc7XG5pbXBvcnQgVGlsZUNvbnRyb2xzQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9UaWxlQ29udHJvbHNCdXR0b24udnVlJztcblxuYXN5bmMgZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgY29uc3QgdGlsZUNvbnRyb2xzID0gYXdhaXQgJCh0aWxlLmZyYW1lLCBDLlRpbGVGcmFtZS5jb250cm9scyk7XG4gIGNyZWF0ZUZyYWdtZW50QXBwKFRpbGVDb250cm9sc0J1dHRvbiwge1xuICAgIGljb246ICdcXHVmMWVjJyxcbiAgICBvbkNsaWNrOiAoKSA9PiBzaG93QnVmZmVyKCdYSVQgQ0FMQycpLFxuICAgIG1hcmdpblRvcDogNCxcbiAgfSkucHJlcGVuZFRvKHRpbGVDb250cm9scyk7XG4gIHJldHVybjtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZShbJ0xNJywgJ0NYJywgJ1hJVCddLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnQWRkcyBhIGNhbGN1bGF0b3IgYnV0dG9uIHRvIHRoZSBidWZmZXIgaGVhZGVyIG9mIExNLCBDWCBhbmQgWElUIGNvbW1hbmRzLicsXG4pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxlQUFBLFlBQUEsTUFBQTtBQUNFLFFBQUEsZUFBQSxNQUFBLEVBQUEsS0FBQSxPQUFBLEVBQUEsVUFBQSxRQUFBO0FBQ0Esb0JBQUEsb0JBQUE7QUFBQSxJQUFzQyxNQUFBO0FBQUEsSUFDOUIsU0FBQSxNQUFBLFdBQUEsVUFBQTtBQUFBLElBQzhCLFdBQUE7QUFBQSxFQUN6QixDQUFBLEVBQUEsVUFBQSxZQUFBO0FBRWI7QUFDRjtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxDQUFBLE1BQUEsTUFBQSxLQUFBLEdBQUEsV0FBQTtBQUNGO0FBRUEsU0FBQTtBQUFBLEVBQVMsWUFBQTtBQUFBLEVBQ0s7QUFBQSxFQUNaO0FBRUY7In0=
