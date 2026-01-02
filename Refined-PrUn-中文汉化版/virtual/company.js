import { onApiMessage } from './api-messages.js';
import { shallowRef } from './reactivity.esm-bundler.js';
const companyStore = shallowRef(void 0);
onApiMessage({
  COMPANY_DATA(data) {
    companyStore.value = data;
  },
});
export { companyStore };
