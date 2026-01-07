import { screensStore } from './screens.js';
import { userData } from './user-data.js';
import removeArrayElement from './remove-array-element.js';
function syncState() {
  const sorted = screensStore.sorted.value;
  if (!sorted) {
    return;
  }
  const order = userData.tabs.order;
  const hidden = userData.tabs.hidden;
  const tracked = /* @__PURE__ */ new Set([...order, ...hidden]);
  for (const tab of sorted) {
    if (!tracked.has(tab.id)) {
      order.push(tab.id);
    }
  }
  const existing = new Set(sorted.map(x => x.id));
  for (const id of order) {
    if (!existing.has(id)) {
      removeArrayElement(order, id);
    }
  }
  for (const id of hidden) {
    if (!existing.has(id)) {
      removeArrayElement(hidden, id);
    }
  }
}
export { syncState };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL3NjcmVlbi10YWItYmFyL3N5bmMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2NyZWVuc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NjcmVlbnMnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YSc7XG5pbXBvcnQgcmVtb3ZlQXJyYXlFbGVtZW50IGZyb20gJ0BzcmMvdXRpbHMvcmVtb3ZlLWFycmF5LWVsZW1lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gc3luY1N0YXRlKCkge1xuICBjb25zdCBzb3J0ZWQgPSBzY3JlZW5zU3RvcmUuc29ydGVkLnZhbHVlO1xuICBpZiAoIXNvcnRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBvcmRlciA9IHVzZXJEYXRhLnRhYnMub3JkZXI7XG4gIGNvbnN0IGhpZGRlbiA9IHVzZXJEYXRhLnRhYnMuaGlkZGVuO1xuICBjb25zdCB0cmFja2VkID0gbmV3IFNldDxzdHJpbmc+KFsuLi5vcmRlciwgLi4uaGlkZGVuXSk7XG4gIGZvciAoY29uc3QgdGFiIG9mIHNvcnRlZCkge1xuICAgIGlmICghdHJhY2tlZC5oYXModGFiLmlkKSkge1xuICAgICAgb3JkZXIucHVzaCh0YWIuaWQpO1xuICAgIH1cbiAgfVxuICBjb25zdCBleGlzdGluZyA9IG5ldyBTZXQ8c3RyaW5nPihzb3J0ZWQubWFwKHggPT4geC5pZCkpO1xuICBmb3IgKGNvbnN0IGlkIG9mIG9yZGVyKSB7XG4gICAgaWYgKCFleGlzdGluZy5oYXMoaWQpKSB7XG4gICAgICByZW1vdmVBcnJheUVsZW1lbnQob3JkZXIsIGlkKTtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCBpZCBvZiBoaWRkZW4pIHtcbiAgICBpZiAoIWV4aXN0aW5nLmhhcyhpZCkpIHtcbiAgICAgIHJlbW92ZUFycmF5RWxlbWVudChoaWRkZW4sIGlkKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJTyxTQUFTLFlBQVk7QUFDMUIsUUFBTSxTQUFTLGFBQWEsT0FBTztBQUNuQyxNQUFJLENBQUMsUUFBUTtBQUNYO0FBQUEsRUFDRjtBQUNBLFFBQU0sUUFBUSxTQUFTLEtBQUs7QUFDNUIsUUFBTSxTQUFTLFNBQVMsS0FBSztBQUM3QixRQUFNLDhCQUFjLElBQVksQ0FBQyxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDckQsYUFBVyxPQUFPLFFBQVE7QUFDeEIsUUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUUsR0FBRztBQUN4QixZQUFNLEtBQUssSUFBSSxFQUFFO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBQ0EsUUFBTSxXQUFXLElBQUksSUFBWSxPQUFPLElBQUksQ0FBQSxNQUFLLEVBQUUsRUFBRSxDQUFDO0FBQ3RELGFBQVcsTUFBTSxPQUFPO0FBQ3RCLFFBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxHQUFHO0FBQ3JCLHlCQUFtQixPQUFPLEVBQUU7QUFBQSxJQUM5QjtBQUFBLEVBQ0Y7QUFDQSxhQUFXLE1BQU0sUUFBUTtBQUN2QixRQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsR0FBRztBQUNyQix5QkFBbUIsUUFBUSxFQUFFO0FBQUEsSUFDL0I7QUFBQSxFQUNGO0FBQ0Y7In0=
