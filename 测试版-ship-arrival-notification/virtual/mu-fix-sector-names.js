import features from './feature-registry.js';
import { watchUntil } from './watch.js';
import { sectorsStore } from './sectors.js';
import { dispatchClientPrunMessage, canDispatchClientPrunMessage } from './prun-api-listener.js';
import { WORLD_SECTORS } from './client-messages.js';
const fixedNames = /* @__PURE__ */ new Map([
  ['sector-4', 'LS'],
  ['sector-30', 'OY'],
  ['sector-35', 'AM'],
  ['sector-61', 'BS'],
  ['sector-73', 'IZ'],
  ['sector-79', 'LG'],
  ['sector-103', 'OS'],
]);
async function patchSectorNames() {
  await watchUntil(() => sectorsStore.all.value !== void 0 && canDispatchClientPrunMessage.value);
  const sectors = sectorsStore.all.value;
  for (const sector of sectors) {
    const fixedName = fixedNames.get(sector.id);
    if (fixedName) {
      sector.name = fixedName;
    }
  }
  const messsage = WORLD_SECTORS(sectors);
  dispatchClientPrunMessage(messsage);
}
function init() {
  void patchSectorNames();
}
features.add(import.meta.url, init, 'MU: Fixes sector names, for example LE => LS.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXUtZml4LXNlY3Rvci1uYW1lcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL211LWZpeC1zZWN0b3ItbmFtZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd2F0Y2hVbnRpbCB9IGZyb20gJ0BzcmMvdXRpbHMvd2F0Y2gnO1xuaW1wb3J0IHsgc2VjdG9yc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NlY3RvcnMnO1xuaW1wb3J0IHtcbiAgY2FuRGlzcGF0Y2hDbGllbnRQcnVuTWVzc2FnZSxcbiAgZGlzcGF0Y2hDbGllbnRQcnVuTWVzc2FnZSxcbn0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9wcnVuLWFwaS1saXN0ZW5lcic7XG5pbXBvcnQgeyBXT1JMRF9TRUNUT1JTIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9jbGllbnQtbWVzc2FnZXMnO1xuXG5jb25zdCBmaXhlZE5hbWVzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oW1xuICBbJ3NlY3Rvci00JywgJ0xTJ10sXG4gIFsnc2VjdG9yLTMwJywgJ09ZJ10sXG4gIFsnc2VjdG9yLTM1JywgJ0FNJ10sXG4gIFsnc2VjdG9yLTYxJywgJ0JTJ10sXG4gIFsnc2VjdG9yLTczJywgJ0laJ10sXG4gIFsnc2VjdG9yLTc5JywgJ0xHJ10sXG4gIFsnc2VjdG9yLTEwMycsICdPUyddLFxuXSk7XG5cbmFzeW5jIGZ1bmN0aW9uIHBhdGNoU2VjdG9yTmFtZXMoKSB7XG4gIGF3YWl0IHdhdGNoVW50aWwoXG4gICAgKCkgPT4gc2VjdG9yc1N0b3JlLmFsbC52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIGNhbkRpc3BhdGNoQ2xpZW50UHJ1bk1lc3NhZ2UudmFsdWUsXG4gICk7XG4gIGNvbnN0IHNlY3RvcnMgPSBzZWN0b3JzU3RvcmUuYWxsLnZhbHVlITtcbiAgZm9yIChjb25zdCBzZWN0b3Igb2Ygc2VjdG9ycykge1xuICAgIGNvbnN0IGZpeGVkTmFtZSA9IGZpeGVkTmFtZXMuZ2V0KHNlY3Rvci5pZCk7XG4gICAgaWYgKGZpeGVkTmFtZSkge1xuICAgICAgc2VjdG9yLm5hbWUgPSBmaXhlZE5hbWU7XG4gICAgfVxuICB9XG4gIGNvbnN0IG1lc3NzYWdlID0gV09STERfU0VDVE9SUyhzZWN0b3JzKTtcbiAgZGlzcGF0Y2hDbGllbnRQcnVuTWVzc2FnZShtZXNzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHZvaWQgcGF0Y2hTZWN0b3JOYW1lcygpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnTVU6IEZpeGVzIHNlY3RvciBuYW1lcywgZm9yIGV4YW1wbGUgTEUgPT4gTFMuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFRQSxNQUFBLGFBQUEsb0JBQUEsSUFBQTtBQUFBLEVBQTJDLENBQUEsWUFBQSxJQUFBO0FBQUEsRUFDeEIsQ0FBQSxhQUFBLElBQUE7QUFBQSxFQUNDLENBQUEsYUFBQSxJQUFBO0FBQUEsRUFDQSxDQUFBLGFBQUEsSUFBQTtBQUFBLEVBQ0EsQ0FBQSxhQUFBLElBQUE7QUFBQSxFQUNBLENBQUEsYUFBQSxJQUFBO0FBQUEsRUFDQSxDQUFBLGNBQUEsSUFBQTtBQUVwQixDQUFBO0FBRUEsZUFBQSxtQkFBQTtBQUNFLFFBQUE7QUFBQSxJQUFNLE1BQUEsYUFBQSxJQUFBLFVBQUEsVUFBQSw2QkFBQTtBQUFBLEVBQ3VFO0FBRTdFLFFBQUEsVUFBQSxhQUFBLElBQUE7QUFDQSxhQUFBLFVBQUEsU0FBQTtBQUNFLFVBQUEsWUFBQSxXQUFBLElBQUEsT0FBQSxFQUFBO0FBQ0EsUUFBQSxXQUFBO0FBQ0UsYUFBQSxPQUFBO0FBQUEsSUFBYztBQUFBLEVBQ2hCO0FBRUYsUUFBQSxXQUFBLGNBQUEsT0FBQTtBQUNBLDRCQUFBLFFBQUE7QUFDRjtBQUVBLFNBQUEsT0FBQTtBQUNFLE9BQUEsaUJBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSwrQ0FBQTsifQ==
