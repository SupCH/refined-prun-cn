import { C } from './prun-css.js';
import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  const selector = `.${C.Tile.tile} .${C.TileControls.splitControls} + .${C.TileControls.control}`;
  applyCssRule(`.${C.MainState.tileContainer} > ${selector}`, css.hidden);
  applyCssRule(`.${C.Window.body} > ${selector}`, css.hidden);
}
features.add(
  import.meta.url,
  init,
  'Hides the close button on single tile windows where it does nothing.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZS1pbmFjdGl2ZS1jbG9zZS1idXR0b24uanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9oaWRlLWluYWN0aXZlLWNsb3NlLWJ1dHRvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3NzIGZyb20gJ0BzcmMvdXRpbHMvY3NzLXV0aWxzLm1vZHVsZS5jc3MnO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBjb25zdCBzZWxlY3RvciA9IGAuJHtDLlRpbGUudGlsZX0gLiR7Qy5UaWxlQ29udHJvbHMuc3BsaXRDb250cm9sc30gKyAuJHtDLlRpbGVDb250cm9scy5jb250cm9sfWA7XG4gIGFwcGx5Q3NzUnVsZShgLiR7Qy5NYWluU3RhdGUudGlsZUNvbnRhaW5lcn0gPiAke3NlbGVjdG9yfWAsIGNzcy5oaWRkZW4pO1xuICBhcHBseUNzc1J1bGUoYC4ke0MuV2luZG93LmJvZHl9ID4gJHtzZWxlY3Rvcn1gLCBjc3MuaGlkZGVuKTtcbn1cblxuZmVhdHVyZXMuYWRkKFxuICBpbXBvcnQubWV0YS51cmwsXG4gIGluaXQsXG4gICdIaWRlcyB0aGUgY2xvc2UgYnV0dG9uIG9uIHNpbmdsZSB0aWxlIHdpbmRvd3Mgd2hlcmUgaXQgZG9lcyBub3RoaW5nLicsXG4pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxTQUFBLE9BQUE7QUFDRSxRQUFBLFdBQUEsSUFBQSxFQUFBLEtBQUEsSUFBQSxLQUFBLEVBQUEsYUFBQSxhQUFBLE9BQUEsRUFBQSxhQUFBLE9BQUE7QUFDQSxlQUFBLElBQUEsRUFBQSxVQUFBLGFBQUEsTUFBQSxRQUFBLElBQUEsSUFBQSxNQUFBO0FBQ0EsZUFBQSxJQUFBLEVBQUEsT0FBQSxJQUFBLE1BQUEsUUFBQSxJQUFBLElBQUEsTUFBQTtBQUNGO0FBRUEsU0FBQTtBQUFBLEVBQVMsWUFBQTtBQUFBLEVBQ0s7QUFBQSxFQUNaO0FBRUY7In0=
