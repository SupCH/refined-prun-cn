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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1jb250cmFjdHMtZGV0YWlscy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL3NpZGViYXItY29udHJhY3RzLWRldGFpbHMvc2lkZWJhci1jb250cmFjdHMtZGV0YWlscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3NzIGZyb20gJ0BzcmMvdXRpbHMvY3NzLXV0aWxzLm1vZHVsZS5jc3MnO1xuaW1wb3J0IGxpbmsgZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2Nzcy9saW5rLm1vZHVsZS5jc3MnO1xuaW1wb3J0ICRzdHlsZSBmcm9tICcuL3NpZGViYXItY29udHJhY3RzLWRldGFpbHMubW9kdWxlLmNzcyc7XG5pbXBvcnQgQ29udHJhY3RQYXJ0bmVyTmFtZSBmcm9tICcuL0NvbnRyYWN0UGFydG5lck5hbWUudnVlJztcbmltcG9ydCB7IHJlZlRleHRDb250ZW50IH0gZnJvbSAnQHNyYy91dGlscy9yZWFjdGl2ZS1kb20nO1xuaW1wb3J0IHsgc2hvd0J1ZmZlciB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9idWZmZXJzJztcblxuZnVuY3Rpb24gb25Db250cmFjdElkUmVhZHkoaWQ6IEhUTUxFbGVtZW50KSB7XG4gIGlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2hvd0J1ZmZlcihgQ09OVCAke2lkLnRleHRDb250ZW50fWApKTtcbiAgY3JlYXRlRnJhZ21lbnRBcHAoXG4gICAgQ29udHJhY3RQYXJ0bmVyTmFtZSxcbiAgICByZWFjdGl2ZSh7XG4gICAgICBjb250cmFjdExvY2FsSWQ6IHJlZlRleHRDb250ZW50KGlkKSxcbiAgICB9KSxcbiAgKS5hZnRlcihpZCk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGx5Q3NzUnVsZShgLiR7Qy5TaWRlYmFyLmNvbnRyYWN0fSAuJHtDLkxpbmsubGlua306bGFzdC1jaGlsZGAsIGNzcy5oaWRkZW4pO1xuICBhcHBseUNzc1J1bGUoYC4ke0MuU2lkZWJhci5jb250cmFjdElkfWAsIGxpbmsubGluayk7XG4gIGFwcGx5Q3NzUnVsZShgLiR7Qy5TaWRlYmFyLmNvbnRyYWN0SWR9YCwgJHN0eWxlLmNvbnRyYWN0SWQpO1xuICBzdWJzY3JpYmUoJCQoZG9jdW1lbnQsIEMuU2lkZWJhci5jb250cmFjdElkKSwgb25Db250cmFjdElkUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoXG4gIGltcG9ydC5tZXRhLnVybCxcbiAgaW5pdCxcbiAgJ0FkZHMgYSBwYXJ0bmVyIG5hbWUgdG8gY29udHJhY3RzIGluIHRoZSBzaWRlYmFyIG9uIHRoZSByaWdodC4nLFxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBT0EsU0FBQSxrQkFBQSxJQUFBO0FBQ0UsS0FBQSxpQkFBQSxTQUFBLE1BQUEsV0FBQSxRQUFBLEdBQUEsV0FBQSxFQUFBLENBQUE7QUFDQTtBQUFBLElBQUE7QUFBQSxJQUNFLFNBQUE7QUFBQSxNQUNTLGlCQUFBLGVBQUEsRUFBQTtBQUFBLElBQzJCLENBQUE7QUFBQSxFQUNuQyxFQUFBLE1BQUEsRUFBQTtBQUVMO0FBRUEsU0FBQSxPQUFBO0FBQ0UsZUFBQSxJQUFBLEVBQUEsUUFBQSxRQUFBLEtBQUEsRUFBQSxLQUFBLElBQUEsZUFBQSxJQUFBLE1BQUE7QUFDQSxlQUFBLElBQUEsRUFBQSxRQUFBLFVBQUEsSUFBQSxLQUFBLElBQUE7QUFDQSxlQUFBLElBQUEsRUFBQSxRQUFBLFVBQUEsSUFBQSxPQUFBLFVBQUE7QUFDQSxZQUFBLEdBQUEsVUFBQSxFQUFBLFFBQUEsVUFBQSxHQUFBLGlCQUFBO0FBQ0Y7QUFFQSxTQUFBO0FBQUEsRUFBUyxZQUFBO0FBQUEsRUFDSztBQUFBLEVBQ1o7QUFFRjsifQ==
