import { $ } from './select-dom.js';
import features from './feature-registry.js';
import { screensStore } from './screens.js';
import { alertsStore } from './alerts.js';
import { refTextContent } from './reactive-dom.js';
import { computed, watchEffect } from './runtime-core.esm-bundler.js';
async function init() {
  const title = await $(document, 'title');
  const titleText = refTextContent(title);
  const newTitleText = computed(() => {
    const screenName = screensStore.current.value?.name;
    const notificationCount = alertsStore.all.value?.filter(x => !x.seen).length ?? 0;
    let title2 = 'Prosperous Universe';
    if (screenName !== void 0) {
      title2 = `${screenName} - ${title2}`;
    }
    if (notificationCount > 0) {
      title2 = `(${notificationCount}) ${title2}`;
    }
    return title2;
  });
  watchEffect(() => {
    if (titleText.value !== newTitleText.value) {
      title.textContent = newTitleText.value;
    }
  });
}
features.add(import.meta.url, init, 'Renames browser tab based on the current screen');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci10YWItbmFtZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2Jyb3dzZXItdGFiLW5hbWUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2NyZWVuc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NjcmVlbnMnO1xuaW1wb3J0IHsgYWxlcnRzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYWxlcnRzJztcbmltcG9ydCB7IHJlZlRleHRDb250ZW50IH0gZnJvbSAnQHNyYy91dGlscy9yZWFjdGl2ZS1kb20nO1xuXG5hc3luYyBmdW5jdGlvbiBpbml0KCkge1xuICBjb25zdCB0aXRsZSA9IGF3YWl0ICQoZG9jdW1lbnQsICd0aXRsZScpO1xuICBjb25zdCB0aXRsZVRleHQgPSByZWZUZXh0Q29udGVudCh0aXRsZSk7XG4gIGNvbnN0IG5ld1RpdGxlVGV4dCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBzY3JlZW5OYW1lID0gc2NyZWVuc1N0b3JlLmN1cnJlbnQudmFsdWU/Lm5hbWU7XG4gICAgY29uc3Qgbm90aWZpY2F0aW9uQ291bnQgPSBhbGVydHNTdG9yZS5hbGwudmFsdWU/LmZpbHRlcih4ID0+ICF4LnNlZW4pLmxlbmd0aCA/PyAwO1xuICAgIGxldCB0aXRsZSA9ICdQcm9zcGVyb3VzIFVuaXZlcnNlJztcbiAgICBpZiAoc2NyZWVuTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZSA9IGAke3NjcmVlbk5hbWV9IC0gJHt0aXRsZX1gO1xuICAgIH1cbiAgICBpZiAobm90aWZpY2F0aW9uQ291bnQgPiAwKSB7XG4gICAgICB0aXRsZSA9IGAoJHtub3RpZmljYXRpb25Db3VudH0pICR7dGl0bGV9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRpdGxlO1xuICB9KTtcbiAgd2F0Y2hFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0aXRsZVRleHQudmFsdWUgIT09IG5ld1RpdGxlVGV4dC52YWx1ZSkge1xuICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBuZXdUaXRsZVRleHQudmFsdWU7XG4gICAgfVxuICB9KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ1JlbmFtZXMgYnJvd3NlciB0YWIgYmFzZWQgb24gdGhlIGN1cnJlbnQgc2NyZWVuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUEsZUFBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLE1BQUEsRUFBQSxVQUFBLE9BQUE7QUFDQSxRQUFBLFlBQUEsZUFBQSxLQUFBO0FBQ0EsUUFBQSxlQUFBLFNBQUEsTUFBQTtBQUNFLFVBQUEsYUFBQSxhQUFBLFFBQUEsT0FBQTtBQUNBLFVBQUEsb0JBQUEsWUFBQSxJQUFBLE9BQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxVQUFBO0FBQ0EsUUFBQSxTQUFBO0FBQ0EsUUFBQSxlQUFBLFFBQUE7QUFDRSxlQUFBLEdBQUEsVUFBQSxNQUFBLE1BQUE7QUFBQSxJQUFnQztBQUVsQyxRQUFBLG9CQUFBLEdBQUE7QUFDRSxlQUFBLElBQUEsaUJBQUEsS0FBQSxNQUFBO0FBQUEsSUFBdUM7QUFFekMsV0FBQTtBQUFBLEVBQU8sQ0FBQTtBQUVULGNBQUEsTUFBQTtBQUNFLFFBQUEsVUFBQSxVQUFBLGFBQUEsT0FBQTtBQUNFLFlBQUEsY0FBQSxhQUFBO0FBQUEsSUFBaUM7QUFBQSxFQUNuQyxDQUFBO0FBRUo7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEsaURBQUE7In0=
