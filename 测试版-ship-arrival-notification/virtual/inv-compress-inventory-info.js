import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { applyCssRule } from './refined-prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import $style from './inv-compress-inventory-info.module.css.js';
async function onTileReady(tile) {
  subscribe($$(tile.anchor, C.StoreView.column), column => {
    const capacities = _$$(column, C.StoreView.capacity);
    if (capacities.length < 3) {
      return;
    }
    const container = document.createElement('div');
    container.classList.add($style.capacityContainer);
    container.appendChild(capacities[1]);
    container.appendChild(capacities[2]);
    capacities[0].after(container);
  });
}
function init() {
  applyCssRule(['INV', 'SHPI'], `.${C.StoreView.column}`, $style.storeViewColumn);
  applyCssRule(['INV', 'SHPI'], `.${C.StoreView.container}`, $style.storeViewContainer);
  applyCssRule(['INV', 'SHPI'], `.${C.InventorySortControls.controls}`, $style.sortControls);
  tiles.observe(['INV', 'SHPI'], onTileReady);
}
features.add(import.meta.url, init, 'INV/SHPI: Compresses specific inventory info into a row.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52LWNvbXByZXNzLWludmVudG9yeS1pbmZvLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvaW52LWNvbXByZXNzLWludmVudG9yeS1pbmZvLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkc3R5bGUgZnJvbSAnLi9pbnYtY29tcHJlc3MtaW52ZW50b3J5LWluZm8ubW9kdWxlLmNzcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIG9uVGlsZVJlYWR5KHRpbGU6IFBydW5UaWxlKSB7XG4gIHN1YnNjcmliZSgkJCh0aWxlLmFuY2hvciwgQy5TdG9yZVZpZXcuY29sdW1uKSwgY29sdW1uID0+IHtcbiAgICBjb25zdCBjYXBhY2l0aWVzID0gXyQkKGNvbHVtbiwgQy5TdG9yZVZpZXcuY2FwYWNpdHkpO1xuICAgIGlmIChjYXBhY2l0aWVzLmxlbmd0aCA8IDMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJHN0eWxlLmNhcGFjaXR5Q29udGFpbmVyKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FwYWNpdGllc1sxXSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhcGFjaXRpZXNbMl0pO1xuICAgIGNhcGFjaXRpZXNbMF0uYWZ0ZXIoY29udGFpbmVyKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGx5Q3NzUnVsZShbJ0lOVicsICdTSFBJJ10sIGAuJHtDLlN0b3JlVmlldy5jb2x1bW59YCwgJHN0eWxlLnN0b3JlVmlld0NvbHVtbik7XG4gIGFwcGx5Q3NzUnVsZShbJ0lOVicsICdTSFBJJ10sIGAuJHtDLlN0b3JlVmlldy5jb250YWluZXJ9YCwgJHN0eWxlLnN0b3JlVmlld0NvbnRhaW5lcik7XG4gIGFwcGx5Q3NzUnVsZShbJ0lOVicsICdTSFBJJ10sIGAuJHtDLkludmVudG9yeVNvcnRDb250cm9scy5jb250cm9sc31gLCAkc3R5bGUuc29ydENvbnRyb2xzKTtcbiAgdGlsZXMub2JzZXJ2ZShbJ0lOVicsICdTSFBJJ10sIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0lOVi9TSFBJOiBDb21wcmVzc2VzIHNwZWNpZmljIGludmVudG9yeSBpbmZvIGludG8gYSByb3cuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLGVBQUEsWUFBQSxNQUFBO0FBQ0UsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLFVBQUEsTUFBQSxHQUFBLENBQUEsV0FBQTtBQUNFLFVBQUEsYUFBQSxJQUFBLFFBQUEsRUFBQSxVQUFBLFFBQUE7QUFDQSxRQUFBLFdBQUEsU0FBQSxHQUFBO0FBQ0U7QUFBQSxJQUFBO0FBRUYsVUFBQSxZQUFBLFNBQUEsY0FBQSxLQUFBO0FBQ0EsY0FBQSxVQUFBLElBQUEsT0FBQSxpQkFBQTtBQUNBLGNBQUEsWUFBQSxXQUFBLENBQUEsQ0FBQTtBQUNBLGNBQUEsWUFBQSxXQUFBLENBQUEsQ0FBQTtBQUNBLGVBQUEsQ0FBQSxFQUFBLE1BQUEsU0FBQTtBQUFBLEVBQTZCLENBQUE7QUFFakM7QUFFQSxTQUFBLE9BQUE7QUFDRSxlQUFBLENBQUEsT0FBQSxNQUFBLEdBQUEsSUFBQSxFQUFBLFVBQUEsTUFBQSxJQUFBLE9BQUEsZUFBQTtBQUNBLGVBQUEsQ0FBQSxPQUFBLE1BQUEsR0FBQSxJQUFBLEVBQUEsVUFBQSxTQUFBLElBQUEsT0FBQSxrQkFBQTtBQUNBLGVBQUEsQ0FBQSxPQUFBLE1BQUEsR0FBQSxJQUFBLEVBQUEsc0JBQUEsUUFBQSxJQUFBLE9BQUEsWUFBQTtBQUNBLFFBQUEsUUFBQSxDQUFBLE9BQUEsTUFBQSxHQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSwwREFBQTsifQ==
