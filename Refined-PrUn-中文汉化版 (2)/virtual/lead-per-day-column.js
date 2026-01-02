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
