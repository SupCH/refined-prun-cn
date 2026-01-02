import { sitesStore } from './sites.js';
import { getEntityNaturalIdFromAddress } from './addresses.js';
import { implementRequestHooks } from './request-hooks2.js';
import { showBuffer } from './buffers.js';
import { onApiMessage } from './api-messages.js';
import { cxosStore } from './cxos.js';
import { fxosStore } from './fxos.js';
import { blueprintsStore } from './blueprints.js';
import { shipyardsStore } from './shipyards.js';
import { shipyardProjectsStore } from './shipyard-projects.js';
import { computed } from './runtime-core.esm-bundler.js';
const bs = /* @__PURE__ */ new Set();
onApiMessage({
  CLIENT_CONNECTION_OPENED() {
    bs.clear();
  },
});
function requestBS(siteId) {
  const site = sitesStore.getById(siteId);
  if (!site) {
    return;
  }
  if (bs.has(site.siteId)) {
    return;
  }
  bs.add(site.siteId);
  const naturalId = getEntityNaturalIdFromAddress(site.address);
  singleBufferRequest(`BS ${naturalId}`, () => sitesStore.getById(siteId) !== void 0)();
}
function singleBufferRequest(command, closeWhen) {
  let requested = false;
  onApiMessage({
    CLIENT_CONNECTION_OPENED() {
      requested = false;
    },
  });
  return function request() {
    if (requested) {
      return;
    }
    requested = true;
    showBuffer(command, { autoClose: true, closeWhen: computed(closeWhen) });
  };
}
implementRequestHooks({
  production: requestBS,
  workforce: requestBS,
  cxos: singleBufferRequest('CXOS', () => cxosStore.fetched.value),
  fxos: singleBufferRequest('FXOS', () => fxosStore.fetched.value),
  blueprints: singleBufferRequest('BLU', () => blueprintsStore.fetched.value),
  shipyards: singleBufferRequest('SHY', () => shipyardsStore.fetched.value),
  shipyardProjects: singleBufferRequest('SHYP', () => shipyardProjectsStore.fetched.value),
});
