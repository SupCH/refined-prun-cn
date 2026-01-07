import { $ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { showBuffer } from './buffers.js';
import TileControlsButton from './TileControlsButton.vue.js';
async function onTileReady(tile) {
  const splitControls = await $(tile.frame, C.TileControls.splitControls);
  createFragmentApp(TileControlsButton, {
    icon: '',
    onClick: () => showBuffer(tile.fullCommand, { force: true }),
  }).before(splitControls);
}
function init() {
  tiles.observeAll(onTileReady);
}
features.add(import.meta.url, init, 'Adds a tile duplicate button to the buffer header.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWR1cGxpY2F0ZS1idXR0b24uanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9oZWFkZXItZHVwbGljYXRlLWJ1dHRvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuaW1wb3J0IFRpbGVDb250cm9sc0J1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvVGlsZUNvbnRyb2xzQnV0dG9uLnZ1ZSc7XG5cbmFzeW5jIGZ1bmN0aW9uIG9uVGlsZVJlYWR5KHRpbGU6IFBydW5UaWxlKSB7XG4gIGNvbnN0IHNwbGl0Q29udHJvbHMgPSBhd2FpdCAkKHRpbGUuZnJhbWUsIEMuVGlsZUNvbnRyb2xzLnNwbGl0Q29udHJvbHMpO1xuICBjcmVhdGVGcmFnbWVudEFwcChUaWxlQ29udHJvbHNCdXR0b24sIHtcbiAgICBpY29uOiAnXFx1ZjI0ZCcsXG4gICAgb25DbGljazogKCkgPT4gc2hvd0J1ZmZlcih0aWxlLmZ1bGxDb21tYW5kLCB7IGZvcmNlOiB0cnVlIH0pLFxuICB9KS5iZWZvcmUoc3BsaXRDb250cm9scyk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmVBbGwob25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnQWRkcyBhIHRpbGUgZHVwbGljYXRlIGJ1dHRvbiB0byB0aGUgYnVmZmVyIGhlYWRlci4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsZUFBQSxZQUFBLE1BQUE7QUFDRSxRQUFBLGdCQUFBLE1BQUEsRUFBQSxLQUFBLE9BQUEsRUFBQSxhQUFBLGFBQUE7QUFDQSxvQkFBQSxvQkFBQTtBQUFBLElBQXNDLE1BQUE7QUFBQSxJQUM5QixTQUFBLE1BQUEsV0FBQSxLQUFBLGFBQUEsRUFBQSxPQUFBLEtBQUEsQ0FBQTtBQUFBLEVBQ3FELENBQUEsRUFBQSxPQUFBLGFBQUE7QUFFL0Q7QUFFQSxTQUFBLE9BQUE7QUFDRSxRQUFBLFdBQUEsV0FBQTtBQUNGO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLG9EQUFBOyJ9
