import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { refValue } from './reactive-dom.js';
function onTileReady(tile) {
  if (!tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.Site.info), info => {
    const elements = _$$(info, C.FormComponent.containerPassive);
    if (elements.length < 2) {
      return;
    }
    const areaRow = elements[0];
    areaRow.style.display = 'none';
    const areaBar = areaRow.getElementsByTagName('progress')[0];
    if (areaBar === void 0) {
      return;
    }
    const areaBarCopy = areaBar.cloneNode(true);
    const areaValue = refValue(areaBar);
    watchEffectWhileNodeAlive(areaBar, () => (areaBarCopy.value = areaValue.value));
    const editDiv = elements[1].getElementsByTagName('div')[0];
    editDiv.insertBefore(areaBarCopy, editDiv.lastChild);
  });
}
function init() {
  tiles.observe('BS', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'BS: Merges the area progress bar field with the detailed area stats row.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtbWVyZ2UtYXJlYS1zdGF0cy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2JzLW1lcmdlLWFyZWEtc3RhdHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZSB9IGZyb20gJ0BzcmMvdXRpbHMvd2F0Y2gnO1xuaW1wb3J0IHsgcmVmVmFsdWUgfSBmcm9tICdAc3JjL3V0aWxzL3JlYWN0aXZlLWRvbSc7XG5cbmZ1bmN0aW9uIG9uVGlsZVJlYWR5KHRpbGU6IFBydW5UaWxlKSB7XG4gIC8vIE9ubHkgcHJvY2VzcyBCUyB0aWxlcyB3aXRoIHBhcmFtZXRlclxuICBpZiAoIXRpbGUucGFyYW1ldGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLlNpdGUuaW5mbyksIGluZm8gPT4ge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gXyQkKGluZm8sIEMuRm9ybUNvbXBvbmVudC5jb250YWluZXJQYXNzaXZlKTtcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFyZWFSb3cgPSBlbGVtZW50c1swXTtcbiAgICBhcmVhUm93LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgY29uc3QgYXJlYUJhciA9IGFyZWFSb3cuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3Byb2dyZXNzJylbMF07XG4gICAgaWYgKGFyZWFCYXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFyZWFCYXJDb3B5ID0gYXJlYUJhci5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTFByb2dyZXNzRWxlbWVudDtcbiAgICBjb25zdCBhcmVhVmFsdWUgPSByZWZWYWx1ZShhcmVhQmFyKTtcbiAgICB3YXRjaEVmZmVjdFdoaWxlTm9kZUFsaXZlKGFyZWFCYXIsICgpID0+IChhcmVhQmFyQ29weS52YWx1ZSA9IGFyZWFWYWx1ZS52YWx1ZSkpO1xuICAgIGNvbnN0IGVkaXREaXYgPSBlbGVtZW50c1sxXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgZWRpdERpdi5pbnNlcnRCZWZvcmUoYXJlYUJhckNvcHksIGVkaXREaXYubGFzdENoaWxkKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ0JTJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoXG4gIGltcG9ydC5tZXRhLnVybCxcbiAgaW5pdCxcbiAgJ0JTOiBNZXJnZXMgdGhlIGFyZWEgcHJvZ3Jlc3MgYmFyIGZpZWxkIHdpdGggdGhlIGRldGFpbGVkIGFyZWEgc3RhdHMgcm93LicsXG4pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxTQUFBLFlBQUEsTUFBQTtBQUVFLE1BQUEsQ0FBQSxLQUFBLFdBQUE7QUFDRTtBQUFBLEVBQUE7QUFHRixZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsS0FBQSxJQUFBLEdBQUEsQ0FBQSxTQUFBO0FBQ0UsVUFBQSxXQUFBLElBQUEsTUFBQSxFQUFBLGNBQUEsZ0JBQUE7QUFDQSxRQUFBLFNBQUEsU0FBQSxHQUFBO0FBQ0U7QUFBQSxJQUFBO0FBR0YsVUFBQSxVQUFBLFNBQUEsQ0FBQTtBQUNBLFlBQUEsTUFBQSxVQUFBO0FBQ0EsVUFBQSxVQUFBLFFBQUEscUJBQUEsVUFBQSxFQUFBLENBQUE7QUFDQSxRQUFBLFlBQUEsUUFBQTtBQUNFO0FBQUEsSUFBQTtBQUdGLFVBQUEsY0FBQSxRQUFBLFVBQUEsSUFBQTtBQUNBLFVBQUEsWUFBQSxTQUFBLE9BQUE7QUFDQSw4QkFBQSxTQUFBLE1BQUEsWUFBQSxRQUFBLFVBQUEsS0FBQTtBQUNBLFVBQUEsVUFBQSxTQUFBLENBQUEsRUFBQSxxQkFBQSxLQUFBLEVBQUEsQ0FBQTtBQUNBLFlBQUEsYUFBQSxhQUFBLFFBQUEsU0FBQTtBQUFBLEVBQW1ELENBQUE7QUFFdkQ7QUFFQSxTQUFBLE9BQUE7QUFDRSxRQUFBLFFBQUEsTUFBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBO0FBQUEsRUFBUyxZQUFBO0FBQUEsRUFDSztBQUFBLEVBQ1o7QUFFRjsifQ==
