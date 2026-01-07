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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9yZWxheS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvbkFueUFwaU1lc3NhZ2UgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYXBpLW1lc3NhZ2VzJztcblxuY29uc3Qgc3RvcmFnZUtleSA9ICdycHJ1bi1yZWxheSc7XG5leHBvcnQgY29uc3QgcmVsYXlVcmwgPSByZWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RvcmFnZUtleSkgPz8gJycpO1xubGV0IHdlYnNvY2tldCA9IHVuZGVmaW5lZCBhcyBXZWJTb2NrZXQgfCB1bmRlZmluZWQ7XG5jb25zdCBwZW5kaW5nID0gW10gYXMgc3RyaW5nW107XG5cbmZ1bmN0aW9uIHVwZGF0ZVVybCh1cmw6IHN0cmluZykge1xuICBpZiAoIXVybCkge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHN0b3JhZ2VLZXkpO1xuICB9IGVsc2Uge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIHVybCk7XG4gIH1cbiAgd2Vic29ja2V0Py5jbG9zZSgpO1xuICBwZW5kaW5nLmxlbmd0aCA9IDA7XG4gIHdlYnNvY2tldCA9IHVuZGVmaW5lZDtcbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgd2Vic29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xuICB3ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsICgpID0+IHtcbiAgICBmb3IgKGNvbnN0IGNodW5rIG9mIHBlbmRpbmcpIHtcbiAgICAgIHdlYnNvY2tldD8uc2VuZChjaHVuayk7XG4gICAgfVxuICAgIHBlbmRpbmcubGVuZ3RoID0gMDtcbiAgfSk7XG4gIHdlYnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsICgpID0+IHtcbiAgICByZWxheVVybC52YWx1ZSA9ICcnO1xuICB9KTtcbiAgd2Vic29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xuICAgIHJlbGF5VXJsLnZhbHVlID0gJyc7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRSZWxheSgpIHtcbiAgd2F0Y2gocmVsYXlVcmwsIHVwZGF0ZVVybCwgeyBpbW1lZGlhdGU6IHRydWUgfSk7XG4gIG9uQW55QXBpTWVzc2FnZShtZXNzYWdlID0+IHtcbiAgICBpZiAoIXdlYnNvY2tldCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkgKyAnXFxuJztcbiAgICBjb25zdCBtYXhDaHVua1NpemUgPSA2NTUzNjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IG1heENodW5rU2l6ZSkge1xuICAgICAgY29uc3QgY2h1bmsgPSBkYXRhLnNsaWNlKGksIGkgKyBtYXhDaHVua1NpemUpO1xuICAgICAgaWYgKHdlYnNvY2tldC5yZWFkeVN0YXRlID09PSAwKSB7XG4gICAgICAgIHBlbmRpbmcucHVzaChjaHVuayk7XG4gICAgICB9IGVsc2UgaWYgKHdlYnNvY2tldC5yZWFkeVN0YXRlID09PSAxKSB7XG4gICAgICAgIHdlYnNvY2tldC5zZW5kKGNodW5rKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQUEsYUFBQTtBQUNPLE1BQUEsV0FBQSxJQUFBLGFBQUEsUUFBQSxVQUFBLEtBQUEsRUFBQTtBQUNQLElBQUEsWUFBQTtBQUNBLE1BQUEsVUFBQSxDQUFBO0FBRUEsU0FBQSxVQUFBLEtBQUE7QUFDRSxNQUFBLENBQUEsS0FBQTtBQUNFLGlCQUFBLFdBQUEsVUFBQTtBQUFBLEVBQWtDLE9BQUE7QUFFbEMsaUJBQUEsUUFBQSxZQUFBLEdBQUE7QUFBQSxFQUFvQztBQUV0QyxhQUFBLE1BQUE7QUFDQSxVQUFBLFNBQUE7QUFDQSxjQUFBO0FBQ0EsTUFBQSxDQUFBLEtBQUE7QUFDRTtBQUFBLEVBQUE7QUFFRixjQUFBLElBQUEsVUFBQSxHQUFBO0FBQ0EsWUFBQSxpQkFBQSxRQUFBLE1BQUE7QUFDRSxlQUFBLFNBQUEsU0FBQTtBQUNFLGlCQUFBLEtBQUEsS0FBQTtBQUFBLElBQXFCO0FBRXZCLFlBQUEsU0FBQTtBQUFBLEVBQWlCLENBQUE7QUFFbkIsWUFBQSxpQkFBQSxTQUFBLE1BQUE7QUFDRSxhQUFBLFFBQUE7QUFBQSxFQUFpQixDQUFBO0FBRW5CLFlBQUEsaUJBQUEsU0FBQSxNQUFBO0FBQ0UsYUFBQSxRQUFBO0FBQUEsRUFBaUIsQ0FBQTtBQUVyQjtBQUVPLFNBQUEsYUFBQTtBQUNMLFFBQUEsVUFBQSxXQUFBLEVBQUEsV0FBQSxLQUFBLENBQUE7QUFDQSxrQkFBQSxDQUFBLFlBQUE7QUFDRSxRQUFBLENBQUEsV0FBQTtBQUNFO0FBQUEsSUFBQTtBQUVGLFVBQUEsT0FBQSxLQUFBLFVBQUEsT0FBQSxJQUFBO0FBQ0EsVUFBQSxlQUFBO0FBQ0EsYUFBQSxJQUFBLEdBQUEsSUFBQSxLQUFBLFFBQUEsS0FBQSxjQUFBO0FBQ0UsWUFBQSxRQUFBLEtBQUEsTUFBQSxHQUFBLElBQUEsWUFBQTtBQUNBLFVBQUEsVUFBQSxlQUFBLEdBQUE7QUFDRSxnQkFBQSxLQUFBLEtBQUE7QUFBQSxNQUFrQixXQUFBLFVBQUEsZUFBQSxHQUFBO0FBRWxCLGtCQUFBLEtBQUEsS0FBQTtBQUFBLE1BQW9CO0FBQUEsSUFDdEI7QUFBQSxFQUNGLENBQUE7QUFFSjsifQ==
