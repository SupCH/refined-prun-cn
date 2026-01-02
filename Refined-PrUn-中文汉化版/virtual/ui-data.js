import { onApiMessage } from './api-messages.js';
import { shallowReactive } from './reactivity.esm-bundler.js';
const uiDataStore = shallowReactive({});
onApiMessage({
  UI_DATA(data) {
    Object.assign(uiDataStore, data);
  },
});
export { uiDataStore };
