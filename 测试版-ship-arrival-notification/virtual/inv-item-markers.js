import { subscribe } from './subscribe-async-generator.js';
import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import IconMarker from './IconMarker.vue.js';
import { computedTileState } from './user-data-tiles.js';
import { refTextContent } from './reactive-dom.js';
import { getTileState } from './tile-state2.js';
import { computed } from './runtime-core.esm-bundler.js';
import { reactive } from './reactivity.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.StoreView.container), container => {
    subscribe($$(container, C.GridItemView.image), item => {
      if (item.children[1] === void 0) {
        void addMarker(item, tile);
      }
    });
  });
}
const icons = [
  { character: '', color: '#CC220E' },
  { character: '', color: '#F7A601' },
  { character: '', color: '#088DBF' },
  { character: '', color: '#C9C9C9' },
  { character: '', color: '#3A8018' },
];
async function addMarker(mat, tile) {
  const matTickerElem = await $(mat, C.ColoredIcon.label);
  const ticker = refTextContent(matTickerElem);
  const state = computedTileState(getTileState(tile), 'markers', {});
  const markerId = computed({
    get: () => (ticker.value !== null ? state.value[ticker.value] : 0) ?? 0,
    set: id => {
      if (ticker.value === null) {
        return;
      }
      const result = { ...state.value };
      if (id === 0) {
        delete result[ticker.value];
      } else {
        result[ticker.value] = id;
      }
      state.value = result;
    },
  });
  const wrapStatus = value => {
    if (value < 0) {
      return icons.length;
    }
    if (value > icons.length) {
      return 0;
    }
    return value;
  };
  mat.style.position = 'relative';
  createFragmentApp(
    IconMarker,
    reactive({
      marker: computed(() => icons[markerId.value - 1]?.character),
      color: computed(() => icons[markerId.value - 1]?.color),
      onNext: () => (markerId.value = wrapStatus(markerId.value + 1)),
      onPrevious: () => (markerId.value = wrapStatus(markerId.value - 1)),
    }),
  ).appendTo(mat);
}
function init() {
  tiles.observe(['INV', 'SHPI'], onTileReady);
}
features.add(import.meta.url, init, 'INV/SHPI: Adds bottom-left item markers.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52LWl0ZW0tbWFya2Vycy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2ludi1pdGVtLW1hcmtlcnMvaW52LWl0ZW0tbWFya2Vycy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSWNvbk1hcmtlciBmcm9tICcuL0ljb25NYXJrZXIudnVlJztcbmltcG9ydCB7IGNvbXB1dGVkVGlsZVN0YXRlIH0gZnJvbSAnQHNyYy9zdG9yZS91c2VyLWRhdGEtdGlsZXMnO1xuaW1wb3J0IHsgcmVmVGV4dENvbnRlbnQgfSBmcm9tICdAc3JjL3V0aWxzL3JlYWN0aXZlLWRvbSc7XG5pbXBvcnQgeyBnZXRUaWxlU3RhdGUgfSBmcm9tICcuL3RpbGUtc3RhdGUnO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuU3RvcmVWaWV3LmNvbnRhaW5lciksIGNvbnRhaW5lciA9PiB7XG4gICAgc3Vic2NyaWJlKCQkKGNvbnRhaW5lciwgQy5HcmlkSXRlbVZpZXcuaW1hZ2UpLCBpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLmNoaWxkcmVuWzFdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdm9pZCBhZGRNYXJrZXIoaXRlbSwgdGlsZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5pbnRlcmZhY2UgSWNvbiB7XG4gIGNoYXJhY3Rlcjogc3RyaW5nO1xuICBjb2xvcjogc3RyaW5nO1xufVxuXG5jb25zdCBpY29uczogSWNvbltdID0gW1xuICB7IGNoYXJhY3RlcjogJ1xcdWYwMmUnLCBjb2xvcjogJyNDQzIyMEUnIH0sXG4gIHsgY2hhcmFjdGVyOiAnXFx1ZjAwNScsIGNvbG9yOiAnI0Y3QTYwMScgfSxcbiAgeyBjaGFyYWN0ZXI6ICdcXHVmMTM1JywgY29sb3I6ICcjMDg4REJGJyB9LFxuICB7IGNoYXJhY3RlcjogJ1xcdWYwMmInLCBjb2xvcjogJyNDOUM5QzknIH0sXG4gIHsgY2hhcmFjdGVyOiAnXFx1ZjFmOCcsIGNvbG9yOiAnIzNBODAxOCcgfSxcbl07XG5cbmFzeW5jIGZ1bmN0aW9uIGFkZE1hcmtlcihtYXQ6IEhUTUxFbGVtZW50LCB0aWxlOiBQcnVuVGlsZSkge1xuICBjb25zdCBtYXRUaWNrZXJFbGVtID0gYXdhaXQgJChtYXQsIEMuQ29sb3JlZEljb24ubGFiZWwpO1xuICBjb25zdCB0aWNrZXIgPSByZWZUZXh0Q29udGVudChtYXRUaWNrZXJFbGVtKTtcbiAgY29uc3Qgc3RhdGUgPSBjb21wdXRlZFRpbGVTdGF0ZShnZXRUaWxlU3RhdGUodGlsZSksICdtYXJrZXJzJywge30pO1xuICBjb25zdCBtYXJrZXJJZCA9IGNvbXB1dGVkKHtcbiAgICBnZXQ6ICgpID0+ICh0aWNrZXIudmFsdWUgIT09IG51bGwgPyBzdGF0ZS52YWx1ZVt0aWNrZXIudmFsdWVdIDogMCkgPz8gMCxcbiAgICBzZXQ6IGlkID0+IHtcbiAgICAgIGlmICh0aWNrZXIudmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzdWx0ID0geyAuLi5zdGF0ZS52YWx1ZSB9O1xuICAgICAgaWYgKGlkID09PSAwKSB7XG4gICAgICAgIGRlbGV0ZSByZXN1bHRbdGlja2VyLnZhbHVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFt0aWNrZXIudmFsdWVdID0gaWQ7XG4gICAgICB9XG4gICAgICBzdGF0ZS52YWx1ZSA9IHJlc3VsdDtcbiAgICB9LFxuICB9KTtcbiAgY29uc3Qgd3JhcFN0YXR1cyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgcmV0dXJuIGljb25zLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKHZhbHVlID4gaWNvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuICBtYXQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICBjcmVhdGVGcmFnbWVudEFwcChcbiAgICBJY29uTWFya2VyLFxuICAgIHJlYWN0aXZlKHtcbiAgICAgIG1hcmtlcjogY29tcHV0ZWQoKCkgPT4gaWNvbnNbbWFya2VySWQudmFsdWUgLSAxXT8uY2hhcmFjdGVyKSxcbiAgICAgIGNvbG9yOiBjb21wdXRlZCgoKSA9PiBpY29uc1ttYXJrZXJJZC52YWx1ZSAtIDFdPy5jb2xvciksXG4gICAgICBvbk5leHQ6ICgpID0+IChtYXJrZXJJZC52YWx1ZSA9IHdyYXBTdGF0dXMobWFya2VySWQudmFsdWUgKyAxKSksXG4gICAgICBvblByZXZpb3VzOiAoKSA9PiAobWFya2VySWQudmFsdWUgPSB3cmFwU3RhdHVzKG1hcmtlcklkLnZhbHVlIC0gMSkpLFxuICAgIH0pLFxuICApLmFwcGVuZFRvKG1hdCk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoWydJTlYnLCAnU0hQSSddLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdJTlYvU0hQSTogQWRkcyBib3R0b20tbGVmdCBpdGVtIG1hcmtlcnMuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBS0EsU0FBQSxZQUFBLE1BQUE7QUFDRSxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsVUFBQSxTQUFBLEdBQUEsQ0FBQSxjQUFBO0FBQ0UsY0FBQSxHQUFBLFdBQUEsRUFBQSxhQUFBLEtBQUEsR0FBQSxDQUFBLFNBQUE7QUFDRSxVQUFBLEtBQUEsU0FBQSxDQUFBLE1BQUEsUUFBQTtBQUNFLGFBQUEsVUFBQSxNQUFBLElBQUE7QUFBQSxNQUF5QjtBQUFBLElBQzNCLENBQUE7QUFBQSxFQUNELENBQUE7QUFFTDtBQU9BLE1BQUEsUUFBQTtBQUFBLEVBQXNCLEVBQUEsV0FBQSxLQUFBLE9BQUEsVUFBQTtBQUFBLEVBQ29CLEVBQUEsV0FBQSxLQUFBLE9BQUEsVUFBQTtBQUFBLEVBQ0EsRUFBQSxXQUFBLEtBQUEsT0FBQSxVQUFBO0FBQUEsRUFDQSxFQUFBLFdBQUEsS0FBQSxPQUFBLFVBQUE7QUFBQSxFQUNBLEVBQUEsV0FBQSxLQUFBLE9BQUEsVUFBQTtBQUUxQztBQUVBLGVBQUEsVUFBQSxLQUFBLE1BQUE7QUFDRSxRQUFBLGdCQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUEsWUFBQSxLQUFBO0FBQ0EsUUFBQSxTQUFBLGVBQUEsYUFBQTtBQUNBLFFBQUEsUUFBQSxrQkFBQSxhQUFBLElBQUEsR0FBQSxXQUFBLEVBQUE7QUFDQSxRQUFBLFdBQUEsU0FBQTtBQUFBLElBQTBCLEtBQUEsT0FBQSxPQUFBLFVBQUEsT0FBQSxNQUFBLE1BQUEsT0FBQSxLQUFBLElBQUEsTUFBQTtBQUFBLElBQzhDLEtBQUEsQ0FBQSxPQUFBO0FBRXBFLFVBQUEsT0FBQSxVQUFBLE1BQUE7QUFDRTtBQUFBLE1BQUE7QUFFRixZQUFBLFNBQUEsRUFBQSxHQUFBLE1BQUEsTUFBQTtBQUNBLFVBQUEsT0FBQSxHQUFBO0FBQ0UsZUFBQSxPQUFBLE9BQUEsS0FBQTtBQUFBLE1BQTBCLE9BQUE7QUFFMUIsZUFBQSxPQUFBLEtBQUEsSUFBQTtBQUFBLE1BQXVCO0FBRXpCLFlBQUEsUUFBQTtBQUFBLElBQWM7QUFBQSxFQUNoQixDQUFBO0FBRUYsUUFBQSxhQUFBLENBQUEsVUFBQTtBQUNFLFFBQUEsUUFBQSxHQUFBO0FBQ0UsYUFBQSxNQUFBO0FBQUEsSUFBYTtBQUVmLFFBQUEsUUFBQSxNQUFBLFFBQUE7QUFDRSxhQUFBO0FBQUEsSUFBTztBQUVULFdBQUE7QUFBQSxFQUFPO0FBRVQsTUFBQSxNQUFBLFdBQUE7QUFDQTtBQUFBLElBQUE7QUFBQSxJQUNFLFNBQUE7QUFBQSxNQUNTLFFBQUEsU0FBQSxNQUFBLE1BQUEsU0FBQSxRQUFBLENBQUEsR0FBQSxTQUFBO0FBQUEsTUFDb0QsT0FBQSxTQUFBLE1BQUEsTUFBQSxTQUFBLFFBQUEsQ0FBQSxHQUFBLEtBQUE7QUFBQSxNQUNMLFFBQUEsTUFBQSxTQUFBLFFBQUEsV0FBQSxTQUFBLFFBQUEsQ0FBQTtBQUFBLE1BQ08sWUFBQSxNQUFBLFNBQUEsUUFBQSxXQUFBLFNBQUEsUUFBQSxDQUFBO0FBQUEsSUFDSSxDQUFBO0FBQUEsRUFDbEUsRUFBQSxTQUFBLEdBQUE7QUFFTDtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxDQUFBLE9BQUEsTUFBQSxHQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSwwQ0FBQTsifQ==
