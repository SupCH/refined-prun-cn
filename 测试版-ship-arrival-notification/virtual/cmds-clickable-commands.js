import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import link from './link.module.css.js';
import { showBuffer } from './buffers.js';
import { isPresent } from './is-present.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, 'tbody'), tbody => {
    subscribe($$(tbody, 'tr'), tr => {
      const commandColumn = tr.children[0];
      const command = commandColumn?.textContent;
      const mandatoryParameters = tr.children[2];
      if (!isPresent(command) || mandatoryParameters === void 0) {
        return;
      }
      commandColumn.classList.add(link.link);
      commandColumn.addEventListener('click', () => {
        void showBuffer(command, { autoSubmit: (mandatoryParameters.textContent ?? '') === '' });
      });
    });
  });
}
function init() {
  tiles.observe('CMDS', onTileReady);
}
features.add(import.meta.url, init, 'CMDS: Makes commands clickable.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21kcy1jbGlja2FibGUtY29tbWFuZHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9jbWRzLWNsaWNrYWJsZS1jb21tYW5kcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbGluayBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvY3NzL2xpbmsubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuaW1wb3J0IHsgaXNQcmVzZW50IH0gZnJvbSAndHMtZXh0cmFzJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCAndGJvZHknKSwgdGJvZHkgPT4ge1xuICAgIHN1YnNjcmliZSgkJCh0Ym9keSwgJ3RyJyksIHRyID0+IHtcbiAgICAgIGNvbnN0IGNvbW1hbmRDb2x1bW4gPSB0ci5jaGlsZHJlblswXTtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kQ29sdW1uPy50ZXh0Q29udGVudDtcbiAgICAgIGNvbnN0IG1hbmRhdG9yeVBhcmFtZXRlcnMgPSB0ci5jaGlsZHJlblsyXTtcbiAgICAgIGlmICghaXNQcmVzZW50KGNvbW1hbmQpIHx8IG1hbmRhdG9yeVBhcmFtZXRlcnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb21tYW5kQ29sdW1uLmNsYXNzTGlzdC5hZGQobGluay5saW5rKTtcbiAgICAgIGNvbW1hbmRDb2x1bW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHZvaWQgc2hvd0J1ZmZlcihjb21tYW5kLCB7IGF1dG9TdWJtaXQ6IChtYW5kYXRvcnlQYXJhbWV0ZXJzLnRleHRDb250ZW50ID8/ICcnKSA9PT0gJycgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ0NNRFMnLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdDTURTOiBNYWtlcyBjb21tYW5kcyBjbGlja2FibGUuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLFNBQUEsWUFBQSxNQUFBO0FBQ0UsWUFBQSxHQUFBLEtBQUEsUUFBQSxPQUFBLEdBQUEsQ0FBQSxVQUFBO0FBQ0UsY0FBQSxHQUFBLE9BQUEsSUFBQSxHQUFBLENBQUEsT0FBQTtBQUNFLFlBQUEsZ0JBQUEsR0FBQSxTQUFBLENBQUE7QUFDQSxZQUFBLFVBQUEsZUFBQTtBQUNBLFlBQUEsc0JBQUEsR0FBQSxTQUFBLENBQUE7QUFDQSxVQUFBLENBQUEsVUFBQSxPQUFBLEtBQUEsd0JBQUEsUUFBQTtBQUNFO0FBQUEsTUFBQTtBQUVGLG9CQUFBLFVBQUEsSUFBQSxLQUFBLElBQUE7QUFDQSxvQkFBQSxpQkFBQSxTQUFBLE1BQUE7QUFDRSxhQUFBLFdBQUEsU0FBQSxFQUFBLGFBQUEsb0JBQUEsZUFBQSxRQUFBLElBQUE7QUFBQSxNQUF1RixDQUFBO0FBQUEsSUFDeEYsQ0FBQTtBQUFBLEVBQ0YsQ0FBQTtBQUVMO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLFFBQUEsV0FBQTtBQUNGO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLGlDQUFBOyJ9
