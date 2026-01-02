import socketIOMiddleware from './socket-io-middleware.js';
import { dispatch } from './api-messages.js';
import { companyContextId } from './user-data2.js';
import { startMeasure } from './performance-measure.js';
import { context } from './screens.js';
import { ref } from './reactivity.esm-bundler.js';
import { computed } from './runtime-core.esm-bundler.js';
const middleware = {
  onOpen: function () {
    const storeAction = {
      type: 'CLIENT_CONNECTION_OPENED',
      data: void 0,
    };
    dispatch(storeAction);
  },
  onMessage: message => {
    if (context.value === companyContextId.value || !companyContextId.value || !context.value) {
      return processEvent(message) ?? false;
    }
    return false;
  },
  dispatchClientMessage: ref(void 0),
};
function listenPrunApi() {
  socketIOMiddleware(middleware);
}
const isRecordingPrunLog = ref(false);
const prunLog = ref([]);
function processEvent(message) {
  if (!message || !message.messageType || !message.payload) {
    return;
  }
  startMeasure(message.messageType);
  try {
    if (message.messageType === 'ACTION_COMPLETED') {
      return processEvent(message.payload.message);
    } else {
      if (isRecordingPrunLog.value) {
        prunLog.value.push(message);
      }
      const storeAction = {
        type: message.messageType,
        data: message.payload,
      };
      return dispatch(storeAction);
    }
  } finally {
  }
}
const canDispatchClientPrunMessage = computed(() => !!middleware.dispatchClientMessage.value);
function dispatchClientPrunMessage(message) {
  if (!middleware.dispatchClientMessage.value) {
    return false;
  }
  middleware.dispatchClientMessage.value(message);
  return true;
}
export {
  canDispatchClientPrunMessage,
  dispatchClientPrunMessage,
  isRecordingPrunLog,
  listenPrunApi,
  prunLog,
};
