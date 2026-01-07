import { userData } from './user-data.js';
import { getInvStore } from './store-id.js';
import { reactive } from './reactivity.esm-bundler.js';
import { watch } from './runtime-core.esm-bundler.js';
const cache = /* @__PURE__ */ new Map();
function getSortingData(storeId) {
  const store = getInvStore(storeId);
  if (!store) {
    return {
      modes: [],
    };
  }
  if (cache.has(store.id)) {
    return cache.get(store.id);
  }
  let data = userData.sorting[store.id];
  let added = data !== void 0;
  data ??= reactive({
    modes: [],
  });
  watch(
    data,
    () => {
      const isEmpty =
        data.modes.length === 0 &&
        data.cat === void 0 &&
        data.reverse === void 0 &&
        data.active === void 0;
      if (isEmpty && added) {
        delete userData.sorting[store.id];
        added = false;
      }
      if (!isEmpty && !added) {
        userData.sorting[store.id] = data;
        added = true;
      }
    },
    { deep: true },
  );
  cache.set(store.id, data);
  return data;
}
export { getSortingData };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1kYXRhLXNvcnRpbmcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdG9yZS91c2VyLWRhdGEtc29ydGluZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCB7IGdldEludlN0b3JlIH0gZnJvbSAnQHNyYy9jb3JlL3N0b3JlLWlkJztcblxuY29uc3QgY2FjaGUgPSBuZXcgTWFwPHN0cmluZywgVXNlckRhdGEuU3RvcmVTb3J0aW5nRGF0YT4oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNvcnRpbmdEYXRhKHN0b3JlSWQ6IHN0cmluZyk6IFVzZXJEYXRhLlN0b3JlU29ydGluZ0RhdGEge1xuICBjb25zdCBzdG9yZSA9IGdldEludlN0b3JlKHN0b3JlSWQpO1xuICBpZiAoIXN0b3JlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vZGVzOiBbXSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGNhY2hlLmhhcyhzdG9yZS5pZCkpIHtcbiAgICByZXR1cm4gY2FjaGUuZ2V0KHN0b3JlLmlkKSE7XG4gIH1cblxuICBsZXQgZGF0YSA9IHVzZXJEYXRhLnNvcnRpbmdbc3RvcmUuaWRdO1xuICBsZXQgYWRkZWQgPSBkYXRhICE9PSB1bmRlZmluZWQ7XG4gIGRhdGEgPz89IHJlYWN0aXZlKHtcbiAgICBtb2RlczogW10sXG4gIH0pO1xuICB3YXRjaChcbiAgICBkYXRhLFxuICAgICgpID0+IHtcbiAgICAgIGNvbnN0IGlzRW1wdHkgPVxuICAgICAgICBkYXRhLm1vZGVzLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICBkYXRhLmNhdCA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgIGRhdGEucmV2ZXJzZSA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgIGRhdGEuYWN0aXZlID09PSB1bmRlZmluZWQ7XG4gICAgICBpZiAoaXNFbXB0eSAmJiBhZGRlZCkge1xuICAgICAgICBkZWxldGUgdXNlckRhdGEuc29ydGluZ1tzdG9yZS5pZF07XG4gICAgICAgIGFkZGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIWlzRW1wdHkgJiYgIWFkZGVkKSB7XG4gICAgICAgIHVzZXJEYXRhLnNvcnRpbmdbc3RvcmUuaWRdID0gZGF0YTtcbiAgICAgICAgYWRkZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0sXG4gICAgeyBkZWVwOiB0cnVlIH0sXG4gICk7XG4gIGNhY2hlLnNldChzdG9yZS5pZCwgZGF0YSk7XG4gIHJldHVybiBkYXRhO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxNQUFBLFFBQUEsb0JBQUEsSUFBQTtBQUVPLFNBQUEsZUFBQSxTQUFBO0FBQ0wsUUFBQSxRQUFBLFlBQUEsT0FBQTtBQUNBLE1BQUEsQ0FBQSxPQUFBO0FBQ0UsV0FBQTtBQUFBLE1BQU8sT0FBQSxDQUFBO0FBQUEsSUFDRztBQUFBLEVBQ1Y7QUFHRixNQUFBLE1BQUEsSUFBQSxNQUFBLEVBQUEsR0FBQTtBQUNFLFdBQUEsTUFBQSxJQUFBLE1BQUEsRUFBQTtBQUFBLEVBQXlCO0FBRzNCLE1BQUEsT0FBQSxTQUFBLFFBQUEsTUFBQSxFQUFBO0FBQ0EsTUFBQSxRQUFBLFNBQUE7QUFDQSxXQUFBLFNBQUE7QUFBQSxJQUFrQixPQUFBLENBQUE7QUFBQSxFQUNSLENBQUE7QUFFVjtBQUFBLElBQUE7QUFBQSxJQUNFLE1BQUE7QUFFRSxZQUFBLFVBQUEsS0FBQSxNQUFBLFdBQUEsS0FBQSxLQUFBLFFBQUEsVUFBQSxLQUFBLFlBQUEsVUFBQSxLQUFBLFdBQUE7QUFLQSxVQUFBLFdBQUEsT0FBQTtBQUNFLGVBQUEsU0FBQSxRQUFBLE1BQUEsRUFBQTtBQUNBLGdCQUFBO0FBQUEsTUFBUTtBQUVWLFVBQUEsQ0FBQSxXQUFBLENBQUEsT0FBQTtBQUNFLGlCQUFBLFFBQUEsTUFBQSxFQUFBLElBQUE7QUFDQSxnQkFBQTtBQUFBLE1BQVE7QUFBQSxJQUNWO0FBQUEsSUFDRixFQUFBLE1BQUEsS0FBQTtBQUFBLEVBQ2E7QUFFZixRQUFBLElBQUEsTUFBQSxJQUFBLElBQUE7QUFDQSxTQUFBO0FBQ0Y7In0=
