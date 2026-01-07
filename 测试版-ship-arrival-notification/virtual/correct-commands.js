import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import { subscribe } from './subscribe-async-generator.js';
import features from './feature-registry.js';
import { changeInputValue } from './util.js';
import { correctMaterialCommand } from './material-commands.js';
import { correctPlanetCommand } from './planet-commands.js';
import { correctShipCommand } from './ship-commands.js';
import { correctSystemCommand } from './system-commands.js';
import { correctXitWeb } from './xit-web.js';
import { correctXitArgs } from './xit-args.js';
const transformers = [
  correctMaterialCommand,
  correctPlanetCommand,
  correctShipCommand,
  correctSystemCommand,
  correctXitWeb,
  correctXitArgs,
];
async function onSelectorReady(selector) {
  const input = await $(selector, C.PanelSelector.input);
  const form = input.form;
  let skipCorrection = false;
  form.addEventListener('submit', ev => {
    if (skipCorrection) {
      skipCorrection = false;
      return;
    }
    const parts = input.value.split(' ');
    for (const transform of transformers) {
      transform(parts);
    }
    const command = parts.join(' ');
    if (input.value === command) {
      return;
    }
    ev.stopPropagation();
    ev.preventDefault();
    changeInputValue(input, command);
    setTimeout(() => form.requestSubmit(), 0);
    skipCorrection = true;
  });
}
function init() {
  subscribe($$(document, C.Tile.selector), onSelectorReady);
}
features.add(import.meta.url, init, 'Corrects tile commands.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ycmVjdC1jb21tYW5kcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2NvcnJlY3QtY29tbWFuZHMvY29ycmVjdC1jb21tYW5kcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjaGFuZ2VJbnB1dFZhbHVlIH0gZnJvbSAnQHNyYy91dGlsJztcbmltcG9ydCB7IGNvcnJlY3RNYXRlcmlhbENvbW1hbmQgfSBmcm9tICcuL21hdGVyaWFsLWNvbW1hbmRzJztcbmltcG9ydCB7IGNvcnJlY3RQbGFuZXRDb21tYW5kIH0gZnJvbSAnLi9wbGFuZXQtY29tbWFuZHMnO1xuaW1wb3J0IHsgY29ycmVjdFNoaXBDb21tYW5kIH0gZnJvbSAnLi9zaGlwLWNvbW1hbmRzJztcbmltcG9ydCB7IGNvcnJlY3RTeXN0ZW1Db21tYW5kIH0gZnJvbSAnLi9zeXN0ZW0tY29tbWFuZHMnO1xuaW1wb3J0IHsgY29ycmVjdFhpdFdlYiB9IGZyb20gJy4veGl0LXdlYic7XG5pbXBvcnQgeyBjb3JyZWN0WGl0QXJncyB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvYmFzaWMvY29ycmVjdC1jb21tYW5kcy94aXQtYXJncyc7XG5cbmNvbnN0IHRyYW5zZm9ybWVycyA9IFtcbiAgY29ycmVjdE1hdGVyaWFsQ29tbWFuZCxcbiAgY29ycmVjdFBsYW5ldENvbW1hbmQsXG4gIGNvcnJlY3RTaGlwQ29tbWFuZCxcbiAgY29ycmVjdFN5c3RlbUNvbW1hbmQsXG4gIGNvcnJlY3RYaXRXZWIsXG4gIGNvcnJlY3RYaXRBcmdzLFxuXTtcblxuYXN5bmMgZnVuY3Rpb24gb25TZWxlY3RvclJlYWR5KHNlbGVjdG9yOiBIVE1MRWxlbWVudCkge1xuICBjb25zdCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGF3YWl0ICQoc2VsZWN0b3IsIEMuUGFuZWxTZWxlY3Rvci5pbnB1dCk7XG4gIGNvbnN0IGZvcm0gPSBpbnB1dC5mb3JtITtcbiAgbGV0IHNraXBDb3JyZWN0aW9uID0gZmFsc2U7XG5cbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBldiA9PiB7XG4gICAgaWYgKHNraXBDb3JyZWN0aW9uKSB7XG4gICAgICBza2lwQ29ycmVjdGlvbiA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnRzID0gaW5wdXQudmFsdWUuc3BsaXQoJyAnKTtcbiAgICBmb3IgKGNvbnN0IHRyYW5zZm9ybSBvZiB0cmFuc2Zvcm1lcnMpIHtcbiAgICAgIHRyYW5zZm9ybShwYXJ0cyk7XG4gICAgfVxuXG4gICAgY29uc3QgY29tbWFuZCA9IHBhcnRzLmpvaW4oJyAnKTtcbiAgICBpZiAoaW5wdXQudmFsdWUgPT09IGNvbW1hbmQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNoYW5nZUlucHV0VmFsdWUoaW5wdXQsIGNvbW1hbmQpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gZm9ybS5yZXF1ZXN0U3VibWl0KCksIDApO1xuICAgIHNraXBDb3JyZWN0aW9uID0gdHJ1ZTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHN1YnNjcmliZSgkJChkb2N1bWVudCwgQy5UaWxlLnNlbGVjdG9yKSwgb25TZWxlY3RvclJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0NvcnJlY3RzIHRpbGUgY29tbWFuZHMuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxNQUFBLGVBQUE7QUFBQSxFQUFxQjtBQUFBLEVBQ25CO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUVGO0FBRUEsZUFBQSxnQkFBQSxVQUFBO0FBQ0UsUUFBQSxRQUFBLE1BQUEsRUFBQSxVQUFBLEVBQUEsY0FBQSxLQUFBO0FBQ0EsUUFBQSxPQUFBLE1BQUE7QUFDQSxNQUFBLGlCQUFBO0FBRUEsT0FBQSxpQkFBQSxVQUFBLENBQUEsT0FBQTtBQUNFLFFBQUEsZ0JBQUE7QUFDRSx1QkFBQTtBQUNBO0FBQUEsSUFBQTtBQUdGLFVBQUEsUUFBQSxNQUFBLE1BQUEsTUFBQSxHQUFBO0FBQ0EsZUFBQSxhQUFBLGNBQUE7QUFDRSxnQkFBQSxLQUFBO0FBQUEsSUFBZTtBQUdqQixVQUFBLFVBQUEsTUFBQSxLQUFBLEdBQUE7QUFDQSxRQUFBLE1BQUEsVUFBQSxTQUFBO0FBQ0U7QUFBQSxJQUFBO0FBR0YsT0FBQSxnQkFBQTtBQUNBLE9BQUEsZUFBQTtBQUNBLHFCQUFBLE9BQUEsT0FBQTtBQUNBLGVBQUEsTUFBQSxLQUFBLGNBQUEsR0FBQSxDQUFBO0FBQ0EscUJBQUE7QUFBQSxFQUFpQixDQUFBO0FBRXJCO0FBRUEsU0FBQSxPQUFBO0FBQ0UsWUFBQSxHQUFBLFVBQUEsRUFBQSxLQUFBLFFBQUEsR0FBQSxlQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEseUJBQUE7In0=
