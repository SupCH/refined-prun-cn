import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.SectionList.button), buttons => {
    const demolish = buttons.children[1];
    demolish?.classList.add(C.Button.danger);
  });
}
function init() {
  tiles.observe('BBL', onTileReady);
}
features.add(import.meta.url, init, 'BBL: Applies the "danger" style to the "Demolish" button.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJsLWRhbmdlcm91cy1kZW1vbGlzaC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2JibC1kYW5nZXJvdXMtZGVtb2xpc2gudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLlNlY3Rpb25MaXN0LmJ1dHRvbiksIGJ1dHRvbnMgPT4ge1xuICAgIGNvbnN0IGRlbW9saXNoID0gYnV0dG9ucy5jaGlsZHJlblsxXTtcbiAgICBkZW1vbGlzaD8uY2xhc3NMaXN0LmFkZChDLkJ1dHRvbi5kYW5nZXIpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZSgnQkJMJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnQkJMOiBBcHBsaWVzIHRoZSBcImRhbmdlclwiIHN0eWxlIHRvIHRoZSBcIkRlbW9saXNoXCIgYnV0dG9uLicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsU0FBQSxZQUFBLE1BQUE7QUFDRSxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsWUFBQSxNQUFBLEdBQUEsQ0FBQSxZQUFBO0FBQ0UsVUFBQSxXQUFBLFFBQUEsU0FBQSxDQUFBO0FBQ0EsY0FBQSxVQUFBLElBQUEsRUFBQSxPQUFBLE1BQUE7QUFBQSxFQUF1QyxDQUFBO0FBRTNDO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLE9BQUEsV0FBQTtBQUNGO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLDJEQUFBOyJ9
