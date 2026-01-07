import { subscribe } from './subscribe-async-generator.js';
import { $$, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { getPrunId } from './attributes.js';
import { alertsStore } from './alerts.js';
import { materialsStore } from './materials.js';
import { getMaterialName } from './i18n.js';
import { waitNotificationLoaded } from './notifications.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.AlertListItem.container), processNotification);
}
async function processNotification(container) {
  const content = await waitNotificationLoaded(container);
  const id = getPrunId(container);
  const alert = alertsStore.getById(id);
  if (!alert) {
    return;
  }
  const textSpan = _$$(content, 'span')[0];
  const alertText = textSpan?.textContent;
  if (!alertText) {
    return;
  }
  let name = void 0;
  switch (alert.type) {
    case 'COMEX_ORDER_FILLED':
    case 'FOREX_ORDER_FILLED':
    case 'COMEX_TRADE':
    case 'FOREX_TRADE': {
      name = alert.data.find(x => x.key === 'commodity')?.value;
      break;
    }
    case 'PRODUCTION_ORDER_FINISHED': {
      name = alert.data.find(x => x.key === 'material')?.value;
      break;
    }
    default: {
      return;
    }
  }
  const material = materialsStore.getByName(name);
  const localizedName = getMaterialName(material);
  if (material && localizedName) {
    textSpan.textContent = alertText.replace(localizedName, material.ticker);
  }
}
function init() {
  tiles.observe('NOTS', onTileReady);
}
features.add(import.meta.url, init, 'NOTS: Replaces material name with material ticker.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90cy1tYXRlcmlhbC10aWNrZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9ub3RzLW1hdGVyaWFsLXRpY2tlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRQcnVuSWQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYXR0cmlidXRlcyc7XG5pbXBvcnQgeyBhbGVydHNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9hbGVydHMnO1xuaW1wb3J0IHsgbWF0ZXJpYWxzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvbWF0ZXJpYWxzJztcbmltcG9ydCB7IGdldE1hdGVyaWFsTmFtZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9pMThuJztcbmltcG9ydCB7IHdhaXROb3RpZmljYXRpb25Mb2FkZWQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvbm90aWZpY2F0aW9ucyc7XG5cbmZ1bmN0aW9uIG9uVGlsZVJlYWR5KHRpbGU6IFBydW5UaWxlKSB7XG4gIHN1YnNjcmliZSgkJCh0aWxlLmFuY2hvciwgQy5BbGVydExpc3RJdGVtLmNvbnRhaW5lciksIHByb2Nlc3NOb3RpZmljYXRpb24pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzTm90aWZpY2F0aW9uKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcbiAgY29uc3QgY29udGVudCA9IGF3YWl0IHdhaXROb3RpZmljYXRpb25Mb2FkZWQoY29udGFpbmVyKTtcblxuICBjb25zdCBpZCA9IGdldFBydW5JZChjb250YWluZXIpO1xuICBjb25zdCBhbGVydCA9IGFsZXJ0c1N0b3JlLmdldEJ5SWQoaWQpO1xuICBpZiAoIWFsZXJ0KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdGV4dFNwYW4gPSBfJCQoY29udGVudCwgJ3NwYW4nKVswXTtcbiAgY29uc3QgYWxlcnRUZXh0ID0gdGV4dFNwYW4/LnRleHRDb250ZW50O1xuICBpZiAoIWFsZXJ0VGV4dCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHN3aXRjaCAoYWxlcnQudHlwZSkge1xuICAgIGNhc2UgJ0NPTUVYX09SREVSX0ZJTExFRCc6XG4gICAgY2FzZSAnRk9SRVhfT1JERVJfRklMTEVEJzpcbiAgICBjYXNlICdDT01FWF9UUkFERSc6XG4gICAgY2FzZSAnRk9SRVhfVFJBREUnOiB7XG4gICAgICBuYW1lID0gYWxlcnQuZGF0YS5maW5kKHggPT4geC5rZXkgPT09ICdjb21tb2RpdHknKT8udmFsdWUgYXMgc3RyaW5nO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJ1BST0RVQ1RJT05fT1JERVJfRklOSVNIRUQnOiB7XG4gICAgICBuYW1lID0gYWxlcnQuZGF0YS5maW5kKHggPT4geC5rZXkgPT09ICdtYXRlcmlhbCcpPy52YWx1ZSBhcyBzdHJpbmc7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1hdGVyaWFsID0gbWF0ZXJpYWxzU3RvcmUuZ2V0QnlOYW1lKG5hbWUpO1xuICBjb25zdCBsb2NhbGl6ZWROYW1lID0gZ2V0TWF0ZXJpYWxOYW1lKG1hdGVyaWFsKTtcbiAgaWYgKG1hdGVyaWFsICYmIGxvY2FsaXplZE5hbWUpIHtcbiAgICB0ZXh0U3Bhbi50ZXh0Q29udGVudCA9IGFsZXJ0VGV4dC5yZXBsYWNlKGxvY2FsaXplZE5hbWUsIG1hdGVyaWFsLnRpY2tlcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZSgnTk9UUycsIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ05PVFM6IFJlcGxhY2VzIG1hdGVyaWFsIG5hbWUgd2l0aCBtYXRlcmlhbCB0aWNrZXIuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU1BLFNBQUEsWUFBQSxNQUFBO0FBQ0UsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLGNBQUEsU0FBQSxHQUFBLG1CQUFBO0FBQ0Y7QUFFQSxlQUFBLG9CQUFBLFdBQUE7QUFDRSxRQUFBLFVBQUEsTUFBQSx1QkFBQSxTQUFBO0FBRUEsUUFBQSxLQUFBLFVBQUEsU0FBQTtBQUNBLFFBQUEsUUFBQSxZQUFBLFFBQUEsRUFBQTtBQUNBLE1BQUEsQ0FBQSxPQUFBO0FBQ0U7QUFBQSxFQUFBO0FBR0YsUUFBQSxXQUFBLElBQUEsU0FBQSxNQUFBLEVBQUEsQ0FBQTtBQUNBLFFBQUEsWUFBQSxVQUFBO0FBQ0EsTUFBQSxDQUFBLFdBQUE7QUFDRTtBQUFBLEVBQUE7QUFHRixNQUFBLE9BQUE7QUFDQSxVQUFBLE1BQUEsTUFBQTtBQUFBLElBQW9CLEtBQUE7QUFBQSxJQUNiLEtBQUE7QUFBQSxJQUNBLEtBQUE7QUFBQSxJQUNBLEtBQUEsZUFBQTtBQUVILGFBQUEsTUFBQSxLQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsUUFBQSxXQUFBLEdBQUE7QUFDQTtBQUFBLElBQUE7QUFBQSxJQUNGLEtBQUEsNkJBQUE7QUFFRSxhQUFBLE1BQUEsS0FBQSxLQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsVUFBQSxHQUFBO0FBQ0E7QUFBQSxJQUFBO0FBQUEsSUFDRixTQUFBO0FBRUU7QUFBQSxJQUFBO0FBQUEsRUFDRjtBQUdGLFFBQUEsV0FBQSxlQUFBLFVBQUEsSUFBQTtBQUNBLFFBQUEsZ0JBQUEsZ0JBQUEsUUFBQTtBQUNBLE1BQUEsWUFBQSxlQUFBO0FBQ0UsYUFBQSxjQUFBLFVBQUEsUUFBQSxlQUFBLFNBQUEsTUFBQTtBQUFBLEVBQXVFO0FBRTNFO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLFFBQUEsV0FBQTtBQUNGO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLG9EQUFBOyJ9
