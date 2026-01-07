import { subscribe } from './subscribe-async-generator.js';
import { $$, _$$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { contractDraftsStore } from './contract-drafts.js';
import { getEntityNameFromAddress } from './addresses.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const draft = computed(() => contractDraftsStore.getByNaturalId(tile.parameter));
  let conditionIndex;
  subscribe($$(tile.anchor, C.Draft.conditions), conditions => {
    return subscribe($$(conditions, 'tr'), row => {
      const indexText = row.children[0]?.textContent;
      const conditionEditButton = _$$(row, C.Button.btn)[0];
      if (!indexText || conditionEditButton === void 0) {
        return;
      }
      conditionEditButton.addEventListener('click', () => {
        const index = parseInt(indexText.replace('#', ''));
        if (isFinite(index)) {
          conditionIndex = index - 1;
        }
      });
    });
  });
  subscribe($$(tile.anchor, C.DraftConditionEditor.form), async form => {
    if (conditionIndex === void 0) {
      return;
    }
    const address = draft.value?.conditions[conditionIndex]?.address;
    const name = getEntityNameFromAddress(address);
    conditionIndex = void 0;
    if (name) {
      const input = await $(form, C.AddressSelector.input);
      input.placeholder = name;
    }
  });
}
function init() {
  tiles.observe('CONTD', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'CONTD: Sets the current address as the placeholder for the address field of the condition editor.',
);
