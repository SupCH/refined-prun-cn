import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { cxpcStore } from './cxpc.js';
import { cxobStore } from './cxob.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ChartContainer.settings), async settings => {
    await waitInitialCxpcResponse(tile.parameter);
    const radioGroups = _$$(settings, C.RadioGroup.container);
    if (radioGroups.length === 0) {
      return;
    }
    const timeRangeGroup = radioGroups[0];
    const rangeButtons = _$$(timeRangeGroup, C.RadioItem.container);
    if (rangeButtons.length === 0) {
      return;
    }
    const yearButton = rangeButtons[rangeButtons.length - 1];
    yearButton?.click();
  });
}
async function waitInitialCxpcResponse(ticker) {
  const broker = computed(() => cxobStore.getByTicker(ticker));
  await new Promise(resolve => {
    const check = data => {
      if (data.brokerId === broker.value?.id) {
        resolve();
        cxpcStore.offPricesReceived(check);
      }
    };
    cxpcStore.onPricesReceived(check);
  });
}
function init() {
  tiles.observe('CXPC', onTileReady);
}
features.add(import.meta.url, init, 'CXPC: Selects the 1y chart on open.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3hwYy1kZWZhdWx0LTF5LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYWR2YW5jZWQvY3hwYy1kZWZhdWx0LTF5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGN4cGNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9jeHBjJztcbmltcG9ydCB7IGN4b2JTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9jeG9iJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLkNoYXJ0Q29udGFpbmVyLnNldHRpbmdzKSwgYXN5bmMgc2V0dGluZ3MgPT4ge1xuICAgIGF3YWl0IHdhaXRJbml0aWFsQ3hwY1Jlc3BvbnNlKHRpbGUucGFyYW1ldGVyISk7XG4gICAgY29uc3QgcmFkaW9Hcm91cHMgPSBfJCQoc2V0dGluZ3MsIEMuUmFkaW9Hcm91cC5jb250YWluZXIpO1xuICAgIGlmIChyYWRpb0dyb3Vwcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lUmFuZ2VHcm91cCA9IHJhZGlvR3JvdXBzWzBdO1xuICAgIGNvbnN0IHJhbmdlQnV0dG9ucyA9IF8kJCh0aW1lUmFuZ2VHcm91cCwgQy5SYWRpb0l0ZW0uY29udGFpbmVyKTtcbiAgICBpZiAocmFuZ2VCdXR0b25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB5ZWFyQnV0dG9uID0gcmFuZ2VCdXR0b25zW3JhbmdlQnV0dG9ucy5sZW5ndGggLSAxXTtcbiAgICB5ZWFyQnV0dG9uPy5jbGljaygpO1xuICB9KTtcbn1cblxuLy8gVGhlIDF5IHJlcXVlc3Qgd2lsbCBub3QgYmUgc2VudCBpZiB0aGUgaW5pdGlhbCByZXNwb25zZSBoYXMgbm90IGFycml2ZWQgeWV0LlxuYXN5bmMgZnVuY3Rpb24gd2FpdEluaXRpYWxDeHBjUmVzcG9uc2UodGlja2VyOiBzdHJpbmcpIHtcbiAgY29uc3QgYnJva2VyID0gY29tcHV0ZWQoKCkgPT4gY3hvYlN0b3JlLmdldEJ5VGlja2VyKHRpY2tlcikpO1xuICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICBjb25zdCBjaGVjayA9IChkYXRhOiBQcnVuQXBpLkNYQnJva2VyUHJpY2VzKSA9PiB7XG4gICAgICBpZiAoZGF0YS5icm9rZXJJZCA9PT0gYnJva2VyLnZhbHVlPy5pZCkge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIGN4cGNTdG9yZS5vZmZQcmljZXNSZWNlaXZlZChjaGVjayk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjeHBjU3RvcmUub25QcmljZXNSZWNlaXZlZChjaGVjayk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aWxlcy5vYnNlcnZlKCdDWFBDJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnQ1hQQzogU2VsZWN0cyB0aGUgMXkgY2hhcnQgb24gb3Blbi4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUdBLFNBQUEsWUFBQSxNQUFBO0FBQ0UsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLGVBQUEsUUFBQSxHQUFBLE9BQUEsYUFBQTtBQUNFLFVBQUEsd0JBQUEsS0FBQSxTQUFBO0FBQ0EsVUFBQSxjQUFBLElBQUEsVUFBQSxFQUFBLFdBQUEsU0FBQTtBQUNBLFFBQUEsWUFBQSxXQUFBLEdBQUE7QUFDRTtBQUFBLElBQUE7QUFHRixVQUFBLGlCQUFBLFlBQUEsQ0FBQTtBQUNBLFVBQUEsZUFBQSxJQUFBLGdCQUFBLEVBQUEsVUFBQSxTQUFBO0FBQ0EsUUFBQSxhQUFBLFdBQUEsR0FBQTtBQUNFO0FBQUEsSUFBQTtBQUVGLFVBQUEsYUFBQSxhQUFBLGFBQUEsU0FBQSxDQUFBO0FBQ0EsZ0JBQUEsTUFBQTtBQUFBLEVBQWtCLENBQUE7QUFFdEI7QUFHQSxlQUFBLHdCQUFBLFFBQUE7QUFDRSxRQUFBLFNBQUEsU0FBQSxNQUFBLFVBQUEsWUFBQSxNQUFBLENBQUE7QUFDQSxRQUFBLElBQUEsUUFBQSxDQUFBLFlBQUE7QUFDRSxVQUFBLFFBQUEsQ0FBQSxTQUFBO0FBQ0UsVUFBQSxLQUFBLGFBQUEsT0FBQSxPQUFBLElBQUE7QUFDRSxnQkFBQTtBQUNBLGtCQUFBLGtCQUFBLEtBQUE7QUFBQSxNQUFpQztBQUFBLElBQ25DO0FBRUYsY0FBQSxpQkFBQSxLQUFBO0FBQUEsRUFBZ0MsQ0FBQTtBQUVwQztBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxRQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSxxQ0FBQTsifQ==
