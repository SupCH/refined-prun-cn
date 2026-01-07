import { onAnyApiMessage } from './api-messages.js';
import { ref } from './reactivity.esm-bundler.js';
import { watch } from './runtime-core.esm-bundler.js';
const storageKey = 'rprun-relay';
const relayUrl = ref(localStorage.getItem(storageKey) ?? '');
let websocket = void 0;
const pending = [];
function updateUrl(url) {
  if (!url) {
    localStorage.removeItem(storageKey);
  } else {
    localStorage.setItem(storageKey, url);
  }
  websocket?.close();
  pending.length = 0;
  websocket = void 0;
  if (!url) {
    return;
  }
  websocket = new WebSocket(url);
  websocket.addEventListener('open', () => {
    for (const chunk of pending) {
      websocket?.send(chunk);
    }
    pending.length = 0;
  });
  websocket.addEventListener('close', () => {
    relayUrl.value = '';
  });
  websocket.addEventListener('error', () => {
    relayUrl.value = '';
  });
}
function startRelay() {
  watch(relayUrl, updateUrl, { immediate: true });
  onAnyApiMessage(message => {
    if (!websocket) {
      return;
    }
    const data = JSON.stringify(message) + '\n';
    const maxChunkSize = 65536;
    for (let i = 0; i < data.length; i += maxChunkSize) {
      const chunk = data.slice(i, i + maxChunkSize);
      if (websocket.readyState === 0) {
        pending.push(chunk);
      } else if (websocket.readyState === 1) {
        websocket.send(chunk);
      }
    }
  });
}
export { relayUrl, startRelay };
