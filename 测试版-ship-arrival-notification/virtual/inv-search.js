import { subscribe } from './subscribe-async-generator.js';
import { $, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import $style from './inv-search.module.css.js';
import css from './css-utils.module.css.js';
import { createVNode } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  if (tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.InventoriesListContainer.filter), async inventoryFilters => {
    const tableBody = await $(tile.anchor, 'tbody');
    const onInput = e => {
      const input = e.target;
      for (let i = 0; i < tableBody.children.length; i++) {
        const row = tableBody.children[i];
        if (filterRow(row, input.value)) {
          row.classList.remove(css.hidden);
        } else {
          row.classList.add(css.hidden);
        }
      }
    };
    createFragmentApp(() =>
      createVNode('div', null, [
        createVNode(
          'input',
          {
            class: $style.inputText,
            placeholder: 'Enter location',
            onInput: onInput,
          },
          null,
        ),
      ]),
    ).after(inventoryFilters);
  });
}
function filterRow(row, search) {
  if (!search || search === '') {
    return true;
  }
  const location = row.children[1].textContent.toLowerCase();
  if (location !== '--') {
    if (location.includes(search.toLowerCase())) {
      return true;
    }
  }
  const name = row.children[2].textContent.toLowerCase();
  if (name !== '') {
    if (name.includes(search.toLowerCase())) {
      return true;
    }
  }
  return false;
}
function init() {
  tiles.observe(['INV', 'SHPI'], onTileReady);
}
features.add(import.meta.url, init, 'INV/SHPI: Adds a search bar to the main INV buffer.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52LXNlYXJjaC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2ludi1zZWFyY2gudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkc3R5bGUgZnJvbSAnLi9pbnYtc2VhcmNoLm1vZHVsZS5jc3MnO1xuaW1wb3J0IGNzcyBmcm9tICdAc3JjL3V0aWxzL2Nzcy11dGlscy5tb2R1bGUuY3NzJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgLy8gT25seSBhZGQgc2VhcmNoIGJhciB0byB0aGUgbWFpbiBJTlYgdGlsZVxuICBpZiAodGlsZS5wYXJhbWV0ZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuSW52ZW50b3JpZXNMaXN0Q29udGFpbmVyLmZpbHRlciksIGFzeW5jIGludmVudG9yeUZpbHRlcnMgPT4ge1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGF3YWl0ICQodGlsZS5hbmNob3IsICd0Ym9keScpO1xuXG4gICAgY29uc3Qgb25JbnB1dCA9IChlOiBFdmVudCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZUJvZHkuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgcm93ID0gdGFibGVCb2R5LmNoaWxkcmVuW2ldIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBpZiAoZmlsdGVyUm93KHJvdywgaW5wdXQudmFsdWUpKSB7XG4gICAgICAgICAgcm93LmNsYXNzTGlzdC5yZW1vdmUoY3NzLmhpZGRlbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93LmNsYXNzTGlzdC5hZGQoY3NzLmhpZGRlbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY3JlYXRlRnJhZ21lbnRBcHAoKCkgPT4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGlucHV0IGNsYXNzPXskc3R5bGUuaW5wdXRUZXh0fSBwbGFjZWhvbGRlcj1cIkVudGVyIGxvY2F0aW9uXCIgb25JbnB1dD17b25JbnB1dH0gLz5cbiAgICAgIDwvZGl2PlxuICAgICkpLmFmdGVyKGludmVudG9yeUZpbHRlcnMpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZmlsdGVyUm93KHJvdzogSFRNTEVsZW1lbnQsIHNlYXJjaDogc3RyaW5nKSB7XG4gIGlmICghc2VhcmNoIHx8IHNlYXJjaCA9PT0gJycpIHtcbiAgICAvLyBBbHdheXMgcmV0dXJuIGFsbCByb3dzIGZvciBlbXB0eSBzZWFyY2hlc1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gVGhlIGxvY2F0aW9uIG9mIHRoZSBpbnZlbnRvcnlcbiAgY29uc3QgbG9jYXRpb24gPSByb3cuY2hpbGRyZW5bMV0udGV4dENvbnRlbnQhLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChsb2NhdGlvbiAhPT0gJy0tJykge1xuICAgIC8vIEp1c3QgbWF0Y2ggdGhlIHNlYXJjaCB0ZXh0IGludG8gdGhlIGxvY2F0aW9uIG5hbWVcbiAgICBpZiAobG9jYXRpb24uaW5jbHVkZXMoc2VhcmNoLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBUaGUgbmFtZSBvZiB0aGUgc2hpcCAoJycgaWYgYSBub24tc2hpcCBpbnZlbnRvcnkpXG4gIGNvbnN0IG5hbWUgPSByb3cuY2hpbGRyZW5bMl0udGV4dENvbnRlbnQhLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChuYW1lICE9PSAnJykge1xuICAgIC8vIEp1c3QgbWF0Y2ggdGhlIHNlYXJjaCB0ZXh0IGludG8gdGhlIHNoaXAgbmFtZVxuICAgIGlmIChuYW1lLmluY2x1ZGVzKHNlYXJjaC50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aWxlcy5vYnNlcnZlKFsnSU5WJywgJ1NIUEknXSwgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnSU5WL1NIUEk6IEFkZHMgYSBzZWFyY2ggYmFyIHRvIHRoZSBtYWluIElOViBidWZmZXIuJyk7XG4iXSwibmFtZXMiOlsic3Vic2NyaWJlIiwiY3JlYXRlRnJhZ21lbnRBcHAiLCJmZWF0dXJlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0EsU0FBQSxZQUFBLE1BQUE7O0FBR0k7QUFBQSxFQUNGO0FBRUFBLFlBQUFBLEdBQUFBLEtBQUFBLFFBQUFBLEVBQUFBLHlCQUFBQSxNQUFBQSxHQUFBQSxPQUFBQSxxQkFBQUE7OztBQUlJLFlBQUEsUUFBQSxFQUFBO0FBQ0EsZUFBQSxJQUFBLEdBQUEsSUFBQSxVQUFBLFNBQUEsUUFBQSxLQUFBO0FBQ0UsY0FBQSxNQUFBLFVBQUEsU0FBQSxDQUFBOzs7UUFHQSxPQUFBOztRQUVBO0FBQUEsTUFDRjtBQUFBO0FBR0ZDLHNCQUFBQSxNQUFBQSxZQUFBQSxPQUFBQSxNQUFBQSxDQUFBQSxZQUFBQSxTQUFBQTtBQUFBQTtNQUVrQyxlQUFBO0FBQUE7SUFBK0MsR0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsTUFBQSxnQkFBQTtBQUFBLEVBR25GLENBQUE7QUFDRjtBQUVBLFNBQUEsVUFBQSxLQUFBLFFBQUE7QUFDRSxNQUFBLENBQUEsVUFBQSxXQUFBLElBQUE7QUFFRSxXQUFBO0FBQUEsRUFDRjtBQUdBLFFBQUEsV0FBQSxJQUFBLFNBQUEsQ0FBQSxFQUFBLFlBQUEsWUFBQTs7O0FBSUksYUFBQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBR0EsUUFBQSxPQUFBLElBQUEsU0FBQSxDQUFBLEVBQUEsWUFBQSxZQUFBOzs7QUFJSSxhQUFBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxTQUFBO0FBQ0Y7QUFFQSxTQUFBLE9BQUE7O0FBRUE7QUFFQUMsU0FBQUEsSUFBQUEsWUFBQUEsS0FBQUEsTUFBQUEscURBQUFBOyJ9
