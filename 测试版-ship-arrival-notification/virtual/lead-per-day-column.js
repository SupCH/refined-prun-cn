import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refValue } from './reactive-dom.js';
import { fixed0, fixed01, fixed02 } from './format.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { ref } from './reactivity.esm-bundler.js';
import { computed } from './runtime-core.esm-bundler.js';
async function onTileReady(tile) {
  subscribe($$(tile.anchor, C.Leaderboard.leaderboardTypeSelect), () => {
    const selects = _$$(tile.anchor, 'select');
    const typeSelect = selects.find(select => select.name === 'type');
    const rangeSelect = selects.find(select => select.name === 'range');
    if (!typeSelect || !rangeSelect) {
      return;
    }
    const appliedType = ref(typeSelect.value);
    const buttons = _$$(tile.anchor, 'button');
    for (const button of buttons) {
      button.addEventListener('click', () => (appliedType.value = typeSelect.value));
    }
    const rangeValue = refValue(rangeSelect);
    const range = computed(() => {
      if (appliedType.value !== 'PRODUCTION') {
        return void 0;
      }
      return parseInt(rangeValue.value.replace('DAYS_', ''), 10);
    });
    subscribe($$(tile.anchor, 'table'), table => {
      subscribe($$(table, 'thead'), thead => {
        subscribe($$(thead, 'tr'), tr => {
          if (tr.children.length < 2) {
            return;
          }
          const th = document.createElement('th');
          th.textContent = 'Per Day';
          watchEffectWhileNodeAlive(tr, () => {
            if (appliedType.value === 'PRODUCTION') {
              tr.children[1].after(th);
            } else {
              th.remove();
            }
          });
        });
      });
      subscribe($$(table, 'tbody'), tbody => {
        subscribe($$(tbody, 'tr'), tr => {
          const scoreColumn = tr.children[1];
          const span = scoreColumn?.children[0];
          if (span === void 0) {
            return;
          }
          if (range.value === void 0) {
            return;
          }
          const score = parseInt(span.textContent ?? '', 10);
          span.textContent = fixed0(score);
          const perDay = score / range.value;
          if (!isFinite(perDay)) {
            return;
          }
          const perDayColumn = document.createElement('td');
          perDayColumn.style.backgroundColor = scoreColumn.style.backgroundColor;
          scoreColumn.after(perDayColumn);
          const abs = Math.abs(perDay);
          perDayColumn.textContent =
            abs >= 1e3 ? fixed0(abs) : abs >= 100 ? fixed01(abs) : fixed02(abs);
        });
      });
    });
  });
}
function init() {
  tiles.observe('LEAD', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'LEAD: Adds a "Per Day" column to the "Commodity Production" leaderboard.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZC1wZXItZGF5LWNvbHVtbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2xlYWQtcGVyLWRheS1jb2x1bW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVmVmFsdWUgfSBmcm9tICdAc3JjL3V0aWxzL3JlYWN0aXZlLWRvbSc7XG5pbXBvcnQgeyBmaXhlZDAsIGZpeGVkMDEsIGZpeGVkMDIgfSBmcm9tICdAc3JjL3V0aWxzL2Zvcm1hdCc7XG5pbXBvcnQgeyB3YXRjaEVmZmVjdFdoaWxlTm9kZUFsaXZlIH0gZnJvbSAnQHNyYy91dGlscy93YXRjaCc7XG5cbmFzeW5jIGZ1bmN0aW9uIG9uVGlsZVJlYWR5KHRpbGU6IFBydW5UaWxlKSB7XG4gIHN1YnNjcmliZSgkJCh0aWxlLmFuY2hvciwgQy5MZWFkZXJib2FyZC5sZWFkZXJib2FyZFR5cGVTZWxlY3QpLCAoKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0cyA9IF8kJCh0aWxlLmFuY2hvciwgJ3NlbGVjdCcpO1xuICAgIGNvbnN0IHR5cGVTZWxlY3QgPSBzZWxlY3RzLmZpbmQoc2VsZWN0ID0+IHNlbGVjdC5uYW1lID09PSAndHlwZScpO1xuICAgIGNvbnN0IHJhbmdlU2VsZWN0ID0gc2VsZWN0cy5maW5kKHNlbGVjdCA9PiBzZWxlY3QubmFtZSA9PT0gJ3JhbmdlJyk7XG4gICAgaWYgKCF0eXBlU2VsZWN0IHx8ICFyYW5nZVNlbGVjdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBhcHBsaWVkVHlwZSA9IHJlZih0eXBlU2VsZWN0LnZhbHVlKTtcbiAgICBjb25zdCBidXR0b25zID0gXyQkKHRpbGUuYW5jaG9yLCAnYnV0dG9uJyk7XG4gICAgZm9yIChjb25zdCBidXR0b24gb2YgYnV0dG9ucykge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gKGFwcGxpZWRUeXBlLnZhbHVlID0gdHlwZVNlbGVjdC52YWx1ZSkpO1xuICAgIH1cbiAgICBjb25zdCByYW5nZVZhbHVlID0gcmVmVmFsdWUocmFuZ2VTZWxlY3QpO1xuICAgIGNvbnN0IHJhbmdlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKGFwcGxpZWRUeXBlLnZhbHVlICE9PSAnUFJPRFVDVElPTicpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJzZUludChyYW5nZVZhbHVlLnZhbHVlLnJlcGxhY2UoJ0RBWVNfJywgJycpLCAxMCk7XG4gICAgfSk7XG4gICAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCAndGFibGUnKSwgdGFibGUgPT4ge1xuICAgICAgc3Vic2NyaWJlKCQkKHRhYmxlLCAndGhlYWQnKSwgdGhlYWQgPT4ge1xuICAgICAgICBzdWJzY3JpYmUoJCQodGhlYWQsICd0cicpLCB0ciA9PiB7XG4gICAgICAgICAgaWYgKHRyLmNoaWxkcmVuLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgICAgICAgIHRoLnRleHRDb250ZW50ID0gJ1BlciBEYXknO1xuICAgICAgICAgIHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUodHIsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChhcHBsaWVkVHlwZS52YWx1ZSA9PT0gJ1BST0RVQ1RJT04nKSB7XG4gICAgICAgICAgICAgIHRyLmNoaWxkcmVuWzFdLmFmdGVyKHRoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgc3Vic2NyaWJlKCQkKHRhYmxlLCAndGJvZHknKSwgdGJvZHkgPT4ge1xuICAgICAgICBzdWJzY3JpYmUoJCQodGJvZHksICd0cicpLCB0ciA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NvcmVDb2x1bW4gPSB0ci5jaGlsZHJlblsxXSBhcyBIVE1MVGFibGVDZWxsRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBzcGFuID0gc2NvcmVDb2x1bW4/LmNoaWxkcmVuWzBdIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICBpZiAoc3BhbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJhbmdlLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzY29yZSA9IHBhcnNlSW50KHNwYW4udGV4dENvbnRlbnQgPz8gJycsIDEwKTtcbiAgICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gZml4ZWQwKHNjb3JlKTtcbiAgICAgICAgICBjb25zdCBwZXJEYXkgPSBzY29yZSAvIHJhbmdlLnZhbHVlO1xuICAgICAgICAgIGlmICghaXNGaW5pdGUocGVyRGF5KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBwZXJEYXlDb2x1bW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgIHBlckRheUNvbHVtbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzY29yZUNvbHVtbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgICAgc2NvcmVDb2x1bW4uYWZ0ZXIocGVyRGF5Q29sdW1uKTtcbiAgICAgICAgICBjb25zdCBhYnMgPSBNYXRoLmFicyhwZXJEYXkpO1xuICAgICAgICAgIHBlckRheUNvbHVtbi50ZXh0Q29udGVudCA9XG4gICAgICAgICAgICBhYnMgPj0gMTAwMCA/IGZpeGVkMChhYnMpIDogYWJzID49IDEwMCA/IGZpeGVkMDEoYWJzKSA6IGZpeGVkMDIoYWJzKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ0xFQUQnLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnTEVBRDogQWRkcyBhIFwiUGVyIERheVwiIGNvbHVtbiB0byB0aGUgXCJDb21tb2RpdHkgUHJvZHVjdGlvblwiIGxlYWRlcmJvYXJkLicsXG4pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFJQSxlQUFBLFlBQUEsTUFBQTtBQUNFLFlBQUEsR0FBQSxLQUFBLFFBQUEsRUFBQSxZQUFBLHFCQUFBLEdBQUEsTUFBQTtBQUNFLFVBQUEsVUFBQSxJQUFBLEtBQUEsUUFBQSxRQUFBO0FBQ0EsVUFBQSxhQUFBLFFBQUEsS0FBQSxDQUFBLFdBQUEsT0FBQSxTQUFBLE1BQUE7QUFDQSxVQUFBLGNBQUEsUUFBQSxLQUFBLENBQUEsV0FBQSxPQUFBLFNBQUEsT0FBQTtBQUNBLFFBQUEsQ0FBQSxjQUFBLENBQUEsYUFBQTtBQUNFO0FBQUEsSUFBQTtBQUVGLFVBQUEsY0FBQSxJQUFBLFdBQUEsS0FBQTtBQUNBLFVBQUEsVUFBQSxJQUFBLEtBQUEsUUFBQSxRQUFBO0FBQ0EsZUFBQSxVQUFBLFNBQUE7QUFDRSxhQUFBLGlCQUFBLFNBQUEsTUFBQSxZQUFBLFFBQUEsV0FBQSxLQUFBO0FBQUEsSUFBNkU7QUFFL0UsVUFBQSxhQUFBLFNBQUEsV0FBQTtBQUNBLFVBQUEsUUFBQSxTQUFBLE1BQUE7QUFDRSxVQUFBLFlBQUEsVUFBQSxjQUFBO0FBQ0UsZUFBQTtBQUFBLE1BQU87QUFFVCxhQUFBLFNBQUEsV0FBQSxNQUFBLFFBQUEsU0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQXlELENBQUE7QUFFM0QsY0FBQSxHQUFBLEtBQUEsUUFBQSxPQUFBLEdBQUEsQ0FBQSxVQUFBO0FBQ0UsZ0JBQUEsR0FBQSxPQUFBLE9BQUEsR0FBQSxDQUFBLFVBQUE7QUFDRSxrQkFBQSxHQUFBLE9BQUEsSUFBQSxHQUFBLENBQUEsT0FBQTtBQUNFLGNBQUEsR0FBQSxTQUFBLFNBQUEsR0FBQTtBQUNFO0FBQUEsVUFBQTtBQUVGLGdCQUFBLEtBQUEsU0FBQSxjQUFBLElBQUE7QUFDQSxhQUFBLGNBQUE7QUFDQSxvQ0FBQSxJQUFBLE1BQUE7QUFDRSxnQkFBQSxZQUFBLFVBQUEsY0FBQTtBQUNFLGlCQUFBLFNBQUEsQ0FBQSxFQUFBLE1BQUEsRUFBQTtBQUFBLFlBQXVCLE9BQUE7QUFFdkIsaUJBQUEsT0FBQTtBQUFBLFlBQVU7QUFBQSxVQUNaLENBQUE7QUFBQSxRQUNELENBQUE7QUFBQSxNQUNGLENBQUE7QUFFSCxnQkFBQSxHQUFBLE9BQUEsT0FBQSxHQUFBLENBQUEsVUFBQTtBQUNFLGtCQUFBLEdBQUEsT0FBQSxJQUFBLEdBQUEsQ0FBQSxPQUFBO0FBQ0UsZ0JBQUEsY0FBQSxHQUFBLFNBQUEsQ0FBQTtBQUNBLGdCQUFBLE9BQUEsYUFBQSxTQUFBLENBQUE7QUFDQSxjQUFBLFNBQUEsUUFBQTtBQUNFO0FBQUEsVUFBQTtBQUdGLGNBQUEsTUFBQSxVQUFBLFFBQUE7QUFDRTtBQUFBLFVBQUE7QUFHRixnQkFBQSxRQUFBLFNBQUEsS0FBQSxlQUFBLElBQUEsRUFBQTtBQUNBLGVBQUEsY0FBQSxPQUFBLEtBQUE7QUFDQSxnQkFBQSxTQUFBLFFBQUEsTUFBQTtBQUNBLGNBQUEsQ0FBQSxTQUFBLE1BQUEsR0FBQTtBQUNFO0FBQUEsVUFBQTtBQUVGLGdCQUFBLGVBQUEsU0FBQSxjQUFBLElBQUE7QUFDQSx1QkFBQSxNQUFBLGtCQUFBLFlBQUEsTUFBQTtBQUNBLHNCQUFBLE1BQUEsWUFBQTtBQUNBLGdCQUFBLE1BQUEsS0FBQSxJQUFBLE1BQUE7QUFDQSx1QkFBQSxjQUFBLE9BQUEsTUFBQSxPQUFBLEdBQUEsSUFBQSxPQUFBLE1BQUEsUUFBQSxHQUFBLElBQUEsUUFBQSxHQUFBO0FBQUEsUUFDcUUsQ0FBQTtBQUFBLE1BQ3RFLENBQUE7QUFBQSxJQUNGLENBQUE7QUFBQSxFQUNGLENBQUE7QUFFTDtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxRQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUE7QUFBQSxFQUFTLFlBQUE7QUFBQSxFQUNLO0FBQUEsRUFDWjtBQUVGOyJ9
