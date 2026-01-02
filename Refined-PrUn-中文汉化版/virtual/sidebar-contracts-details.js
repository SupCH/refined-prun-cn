import { createFragmentApp } from './vue-fragment-app.js';
import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
import link from './link.module.css.js';
import $style from './sidebar-contracts-details.module.css.js';
import ContractPartnerName from './ContractPartnerName.vue.js';
import { refTextContent } from './reactive-dom.js';
import { showBuffer } from './buffers.js';
import { reactive } from './reactivity.esm-bundler.js';
function onContractIdReady(id) {
  id.addEventListener('click', () => showBuffer(`CONT ${id.textContent}`));
  createFragmentApp(
    ContractPartnerName,
    reactive({
      contractLocalId: refTextContent(id),
    }),
  ).after(id);
}
function init() {
  applyCssRule(`.${C.Sidebar.contract} .${C.Link.link}:last-child`, css.hidden);
  applyCssRule(`.${C.Sidebar.contractId}`, link.link);
  applyCssRule(`.${C.Sidebar.contractId}`, $style.contractId);
  subscribe($$(document, C.Sidebar.contractId), onContractIdReady);
}
features.add(
  import.meta.url,
  init,
  'Adds a partner name to contracts in the sidebar on the right.',
);
