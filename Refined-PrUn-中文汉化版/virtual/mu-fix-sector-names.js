import features from './feature-registry.js';
import { watchUntil } from './watch.js';
import { sectorsStore } from './sectors.js';
import { dispatchClientPrunMessage, canDispatchClientPrunMessage } from './prun-api-listener.js';
import { WORLD_SECTORS } from './client-messages.js';
const fixedNames = /* @__PURE__ */ new Map([
  ['sector-4', 'LS'],
  ['sector-30', 'OY'],
  ['sector-35', 'AM'],
  ['sector-61', 'BS'],
  ['sector-73', 'IZ'],
  ['sector-79', 'LG'],
  ['sector-103', 'OS'],
]);
async function patchSectorNames() {
  await watchUntil(() => sectorsStore.all.value !== void 0 && canDispatchClientPrunMessage.value);
  const sectors = sectorsStore.all.value;
  for (const sector of sectors) {
    const fixedName = fixedNames.get(sector.id);
    if (fixedName) {
      sector.name = fixedName;
    }
  }
  const messsage = WORLD_SECTORS(sectors);
  dispatchClientPrunMessage(messsage);
}
function init() {
  void patchSectorNames();
}
features.add(import.meta.url, init, 'MU: Fixes sector names, for example LE => LS.');
