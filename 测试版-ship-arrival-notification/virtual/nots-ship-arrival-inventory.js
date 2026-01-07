import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { getPrunId } from './attributes.js';
import { alertsStore } from './alerts.js';
import { showBuffer } from './buffers.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.AlertListItem.container), processNotification);
}
async function processNotification(container) {
  const id = getPrunId(container);
  const alert = alertsStore.getById(id);
  if (alert?.type !== 'SHIP_FLIGHT_ENDED') {
    return;
  }
  const registration = alert.data.find(x => x.key === 'registration')?.value;
  if (!registration) {
    return;
  }
  container.addEventListener('click', e => {
    showBuffer(`SHPI ${registration}`);
    e.preventDefault();
    e.stopPropagation();
  });
}
function init() {
  tiles.observe('NOTS', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'NOTS: Opens ship inventory on "ship arrived" notification click.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90cy1zaGlwLWFycml2YWwtaW52ZW50b3J5LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvbm90cy1zaGlwLWFycml2YWwtaW52ZW50b3J5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFBydW5JZCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7IGFsZXJ0c1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2FsZXJ0cyc7XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuQWxlcnRMaXN0SXRlbS5jb250YWluZXIpLCBwcm9jZXNzTm90aWZpY2F0aW9uKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc05vdGlmaWNhdGlvbihjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG4gIGNvbnN0IGlkID0gZ2V0UHJ1bklkKGNvbnRhaW5lcik7XG4gIGNvbnN0IGFsZXJ0ID0gYWxlcnRzU3RvcmUuZ2V0QnlJZChpZCk7XG4gIGlmIChhbGVydD8udHlwZSAhPT0gJ1NISVBfRkxJR0hUX0VOREVEJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlZ2lzdHJhdGlvbiA9IGFsZXJ0LmRhdGEuZmluZCh4ID0+IHgua2V5ID09PSAncmVnaXN0cmF0aW9uJyk/LnZhbHVlIGFzIHN0cmluZztcbiAgaWYgKCFyZWdpc3RyYXRpb24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgc2hvd0J1ZmZlcihgU0hQSSAke3JlZ2lzdHJhdGlvbn1gKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ05PVFMnLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnTk9UUzogT3BlbnMgc2hpcCBpbnZlbnRvcnkgb24gXCJzaGlwIGFycml2ZWRcIiBub3RpZmljYXRpb24gY2xpY2suJyxcbik7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxTQUFBLFlBQUEsTUFBQTtBQUNFLFlBQUEsR0FBQSxLQUFBLFFBQUEsRUFBQSxjQUFBLFNBQUEsR0FBQSxtQkFBQTtBQUNGO0FBRUEsZUFBQSxvQkFBQSxXQUFBO0FBQ0UsUUFBQSxLQUFBLFVBQUEsU0FBQTtBQUNBLFFBQUEsUUFBQSxZQUFBLFFBQUEsRUFBQTtBQUNBLE1BQUEsT0FBQSxTQUFBLHFCQUFBO0FBQ0U7QUFBQSxFQUFBO0FBR0YsUUFBQSxlQUFBLE1BQUEsS0FBQSxLQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsY0FBQSxHQUFBO0FBQ0EsTUFBQSxDQUFBLGNBQUE7QUFDRTtBQUFBLEVBQUE7QUFFRixZQUFBLGlCQUFBLFNBQUEsQ0FBQSxNQUFBO0FBQ0UsZUFBQSxRQUFBLFlBQUEsRUFBQTtBQUNBLE1BQUEsZUFBQTtBQUNBLE1BQUEsZ0JBQUE7QUFBQSxFQUFrQixDQUFBO0FBRXRCO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLFFBQUEsV0FBQTtBQUNGO0FBRUEsU0FBQTtBQUFBLEVBQVMsWUFBQTtBQUFBLEVBQ0s7QUFBQSxFQUNaO0FBRUY7In0=
