import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import { shipsStore } from './ships.js';
import { flightsStore } from './flights.js';
import { isEmpty } from './is-empty.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, 'tr'), row => {
    const id = refPrunId(row);
    const ship = computed(() => shipsStore.getById(id.value));
    const flight = computed(() => flightsStore.getById(ship.value?.flightId));
    const labels = {
      TAKE_OFF: '↑',
      DEPARTURE: '↗',
      CHARGE: '±',
      JUMP: '⟿',
      TRANSIT: '⟶',
      APPROACH: '↘',
      LANDING: '↓',
    };
    const statusLabel = computed(() => {
      if (!ship.value) {
        return void 0;
      }
      if (!flight.value) {
        return '⦁';
      }
      const segment = flight.value.segments[flight.value.currentSegmentIndex];
      if (segment === void 0) {
        return void 0;
      }
      return labels[segment.type] ?? void 0;
    });
    function replaceStatus() {
      if (statusLabel.value === void 0) {
        return;
      }
      const statusCell = row.children[3];
      if (statusCell === void 0) {
        return;
      }
      const nodes = Array.from(statusCell.childNodes).filter(
        x => x.nodeType === Node.TEXT_NODE || x.nodeType === Node.ELEMENT_NODE,
      );
      if (isEmpty(nodes)) {
        return;
      }
      if (statusCell.style.textAlign !== 'center') {
        statusCell.style.textAlign = 'center';
      }
      if (nodes[0].textContent !== statusLabel.value) {
        nodes[0].textContent = statusLabel.value;
      }
      for (const node of nodes.slice(1)) {
        if (node.textContent) {
          node.textContent = '';
        }
      }
    }
    replaceStatus();
    const observer = new MutationObserver(replaceStatus);
    observer.observe(row, { childList: true, subtree: true, characterData: true });
  });
}
function init() {
  tiles.observe(['FLT', 'FLTS', 'FLTP'], onTileReady);
}
features.add(import.meta.url, init, 'FLT: Replaces the flight status text with arrow icons.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx0LWZsaWdodC1zdGF0dXMtaWNvbnMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9hZHZhbmNlZC9mbHQtZmxpZ2h0LXN0YXR1cy1pY29ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWZQcnVuSWQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYXR0cmlidXRlcyc7XG5pbXBvcnQgeyBzaGlwc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NoaXBzJztcbmltcG9ydCB7IGZsaWdodHNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9mbGlnaHRzJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICd0cy1leHRyYXMnO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICAvLyBTaG9ydGVuIGZsaWdodCBzdGF0dXNcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCAndHInKSwgcm93ID0+IHtcbiAgICBjb25zdCBpZCA9IHJlZlBydW5JZChyb3cpO1xuICAgIGNvbnN0IHNoaXAgPSBjb21wdXRlZCgoKSA9PiBzaGlwc1N0b3JlLmdldEJ5SWQoaWQudmFsdWUpKTtcbiAgICBjb25zdCBmbGlnaHQgPSBjb21wdXRlZCgoKSA9PiBmbGlnaHRzU3RvcmUuZ2V0QnlJZChzaGlwLnZhbHVlPy5mbGlnaHRJZCkpO1xuXG4gICAgY29uc3QgbGFiZWxzID0ge1xuICAgICAgVEFLRV9PRkY6ICfihpEnLFxuICAgICAgREVQQVJUVVJFOiAn4oaXJyxcbiAgICAgIENIQVJHRTogJ8KxJyxcbiAgICAgIEpVTVA6ICfin78nLFxuICAgICAgVFJBTlNJVDogJ+KfticsXG4gICAgICBBUFBST0FDSDogJ+KGmCcsXG4gICAgICBMQU5ESU5HOiAn4oaTJyxcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RhdHVzTGFiZWwgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAoIXNoaXAudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFmbGlnaHQudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuICfipoEnO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzZWdtZW50ID0gZmxpZ2h0LnZhbHVlLnNlZ21lbnRzW2ZsaWdodC52YWx1ZS5jdXJyZW50U2VnbWVudEluZGV4XTtcbiAgICAgIGlmIChzZWdtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxhYmVsc1tzZWdtZW50LnR5cGVdID8/IHVuZGVmaW5lZDtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHJlcGxhY2VTdGF0dXMoKSB7XG4gICAgICBpZiAoc3RhdHVzTGFiZWwudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzdGF0dXNDZWxsID0gcm93LmNoaWxkcmVuWzNdIGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50O1xuICAgICAgaWYgKHN0YXR1c0NlbGwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vZGVzID0gQXJyYXkuZnJvbShzdGF0dXNDZWxsLmNoaWxkTm9kZXMpLmZpbHRlcihcbiAgICAgICAgeCA9PiB4Lm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSB8fCB4Lm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSxcbiAgICAgICk7XG4gICAgICBpZiAoaXNFbXB0eShub2RlcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXR1c0NlbGwuc3R5bGUudGV4dEFsaWduICE9PSAnY2VudGVyJykge1xuICAgICAgICBzdGF0dXNDZWxsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGVzWzBdLnRleHRDb250ZW50ICE9PSBzdGF0dXNMYWJlbC52YWx1ZSkge1xuICAgICAgICBub2Rlc1swXS50ZXh0Q29udGVudCA9IHN0YXR1c0xhYmVsLnZhbHVlO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzLnNsaWNlKDEpKSB7XG4gICAgICAgIGlmIChub2RlLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVwbGFjZVN0YXR1cygpO1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIocmVwbGFjZVN0YXR1cyk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShyb3csIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZShbJ0ZMVCcsICdGTFRTJywgJ0ZMVFAnXSwgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnRkxUOiBSZXBsYWNlcyB0aGUgZmxpZ2h0IHN0YXR1cyB0ZXh0IHdpdGggYXJyb3cgaWNvbnMuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsU0FBQSxZQUFBLE1BQUE7QUFFRSxZQUFBLEdBQUEsS0FBQSxRQUFBLElBQUEsR0FBQSxDQUFBLFFBQUE7QUFDRSxVQUFBLEtBQUEsVUFBQSxHQUFBO0FBQ0EsVUFBQSxPQUFBLFNBQUEsTUFBQSxXQUFBLFFBQUEsR0FBQSxLQUFBLENBQUE7QUFDQSxVQUFBLFNBQUEsU0FBQSxNQUFBLGFBQUEsUUFBQSxLQUFBLE9BQUEsUUFBQSxDQUFBO0FBRUEsVUFBQSxTQUFBO0FBQUEsTUFBZSxVQUFBO0FBQUEsTUFDSCxXQUFBO0FBQUEsTUFDQyxRQUFBO0FBQUEsTUFDSCxNQUFBO0FBQUEsTUFDRixTQUFBO0FBQUEsTUFDRyxVQUFBO0FBQUEsTUFDQyxTQUFBO0FBQUEsSUFDRDtBQUdYLFVBQUEsY0FBQSxTQUFBLE1BQUE7QUFDRSxVQUFBLENBQUEsS0FBQSxPQUFBO0FBQ0UsZUFBQTtBQUFBLE1BQU87QUFHVCxVQUFBLENBQUEsT0FBQSxPQUFBO0FBQ0UsZUFBQTtBQUFBLE1BQU87QUFHVCxZQUFBLFVBQUEsT0FBQSxNQUFBLFNBQUEsT0FBQSxNQUFBLG1CQUFBO0FBQ0EsVUFBQSxZQUFBLFFBQUE7QUFDRSxlQUFBO0FBQUEsTUFBTztBQUdULGFBQUEsT0FBQSxRQUFBLElBQUEsS0FBQTtBQUFBLElBQStCLENBQUE7QUFHakMsYUFBQSxnQkFBQTtBQUNFLFVBQUEsWUFBQSxVQUFBLFFBQUE7QUFDRTtBQUFBLE1BQUE7QUFFRixZQUFBLGFBQUEsSUFBQSxTQUFBLENBQUE7QUFDQSxVQUFBLGVBQUEsUUFBQTtBQUNFO0FBQUEsTUFBQTtBQUdGLFlBQUEsUUFBQSxNQUFBLEtBQUEsV0FBQSxVQUFBLEVBQUE7QUFBQSxRQUFnRCxDQUFBLE1BQUEsRUFBQSxhQUFBLEtBQUEsYUFBQSxFQUFBLGFBQUEsS0FBQTtBQUFBLE1BQ1k7QUFFNUQsVUFBQSxRQUFBLEtBQUEsR0FBQTtBQUNFO0FBQUEsTUFBQTtBQUVGLFVBQUEsV0FBQSxNQUFBLGNBQUEsVUFBQTtBQUNFLG1CQUFBLE1BQUEsWUFBQTtBQUFBLE1BQTZCO0FBRS9CLFVBQUEsTUFBQSxDQUFBLEVBQUEsZ0JBQUEsWUFBQSxPQUFBO0FBQ0UsY0FBQSxDQUFBLEVBQUEsY0FBQSxZQUFBO0FBQUEsTUFBbUM7QUFFckMsaUJBQUEsUUFBQSxNQUFBLE1BQUEsQ0FBQSxHQUFBO0FBQ0UsWUFBQSxLQUFBLGFBQUE7QUFDRSxlQUFBLGNBQUE7QUFBQSxRQUFtQjtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUdGLGtCQUFBO0FBQ0EsVUFBQSxXQUFBLElBQUEsaUJBQUEsYUFBQTtBQUNBLGFBQUEsUUFBQSxLQUFBLEVBQUEsV0FBQSxNQUFBLFNBQUEsTUFBQSxlQUFBLE1BQUE7QUFBQSxFQUE2RSxDQUFBO0FBRWpGO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLENBQUEsT0FBQSxRQUFBLE1BQUEsR0FBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEsd0RBQUE7In0=
