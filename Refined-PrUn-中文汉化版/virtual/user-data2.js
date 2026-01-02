import { onApiMessage } from './api-messages.js';
import { shallowReactive } from './reactivity.esm-bundler.js';
import { computed } from './runtime-core.esm-bundler.js';
const userDataStore = shallowReactive({});
const companyContextId = computed(
  () => userDataStore.contexts?.find(x => x.type === 'COMPANY')?.id,
);
onApiMessage({
  USER_DATA(data) {
    Object.assign(userDataStore, data);
  },
});
export { companyContextId, userDataStore };
