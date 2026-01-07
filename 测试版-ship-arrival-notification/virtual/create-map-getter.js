import { computed } from './runtime-core.esm-bundler.js';
const upperCase = value => value.toUpperCase();
function createMapGetter(items, selector, valueTransformer) {
  valueTransformer ??= upperCase;
  const map = computed(() => {
    if (items.value === void 0) {
      return void 0;
    }
    const map2 = /* @__PURE__ */ new Map();
    for (const item of items.value) {
      map2.set(valueTransformer(selector(item)), item);
    }
    return map2;
  });
  return value => (map.value !== void 0 && value ? map.value.get(valueTransformer(value)) : void 0);
}
function createGroupMapGetter(items, selector, valueTransformer) {
  valueTransformer ??= upperCase;
  const map = computed(() => {
    if (items.value === void 0) {
      return void 0;
    }
    const map2 = /* @__PURE__ */ new Map();
    for (const item of items.value) {
      const key = valueTransformer(selector(item));
      let group = map2.get(key);
      if (!group) {
        group = [];
        map2.set(key, group);
      }
      group.push(item);
    }
    return map2;
  });
  return value => (map.value !== void 0 && value ? map.value.get(valueTransformer(value)) : void 0);
}
export { createGroupMapGetter, createMapGetter };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW1hcC1nZXR0ZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2NyZWF0ZS1tYXAtZ2V0dGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHVwcGVyQ2FzZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZS50b1VwcGVyQ2FzZSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWFwR2V0dGVyPFQ+KFxuICBpdGVtczogUmVmPFRbXSB8IHVuZGVmaW5lZD4sXG4gIHNlbGVjdG9yOiAoaXRlbTogVCkgPT4gc3RyaW5nLFxuICB2YWx1ZVRyYW5zZm9ybWVyPzogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZyxcbikge1xuICB2YWx1ZVRyYW5zZm9ybWVyID8/PSB1cHBlckNhc2U7XG4gIGNvbnN0IG1hcCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAoaXRlbXMudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIFQ+KCk7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zLnZhbHVlKSB7XG4gICAgICBtYXAuc2V0KHZhbHVlVHJhbnNmb3JtZXIoc2VsZWN0b3IoaXRlbSkpLCBpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbiAgfSk7XG4gIHJldHVybiAodmFsdWU/OiBzdHJpbmcgfCBudWxsKSA9PlxuICAgIG1hcC52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlID8gbWFwLnZhbHVlLmdldCh2YWx1ZVRyYW5zZm9ybWVyKHZhbHVlKSkgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHcm91cE1hcEdldHRlcjxUPihcbiAgaXRlbXM6IFJlZjxUW10gfCB1bmRlZmluZWQ+LFxuICBzZWxlY3RvcjogKGl0ZW06IFQpID0+IHN0cmluZyxcbiAgdmFsdWVUcmFuc2Zvcm1lcj86ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmcsXG4pIHtcbiAgdmFsdWVUcmFuc2Zvcm1lciA/Pz0gdXBwZXJDYXNlO1xuICBjb25zdCBtYXAgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKGl0ZW1zLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBUW10+KCk7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zLnZhbHVlKSB7XG4gICAgICBjb25zdCBrZXkgPSB2YWx1ZVRyYW5zZm9ybWVyKHNlbGVjdG9yKGl0ZW0pKTtcbiAgICAgIGxldCBncm91cCA9IG1hcC5nZXQoa2V5KTtcbiAgICAgIGlmICghZ3JvdXApIHtcbiAgICAgICAgZ3JvdXAgPSBbXTtcbiAgICAgICAgbWFwLnNldChrZXksIGdyb3VwKTtcbiAgICAgIH1cbiAgICAgIGdyb3VwLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG4gIH0pO1xuICByZXR1cm4gKHZhbHVlPzogc3RyaW5nIHwgbnVsbCkgPT5cbiAgICBtYXAudmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA/IG1hcC52YWx1ZS5nZXQodmFsdWVUcmFuc2Zvcm1lcih2YWx1ZSkpIDogdW5kZWZpbmVkO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFBLFlBQUEsQ0FBQSxVQUFBLE1BQUEsWUFBQTtBQUVPLFNBQUEsZ0JBQUEsT0FBQSxVQUFBLGtCQUFBO0FBS0wsdUJBQUE7QUFDQSxRQUFBLE1BQUEsU0FBQSxNQUFBO0FBQ0UsUUFBQSxNQUFBLFVBQUEsUUFBQTtBQUNFLGFBQUE7QUFBQSxJQUFPO0FBRVQsVUFBQSxPQUFBLG9CQUFBLElBQUE7QUFDQSxlQUFBLFFBQUEsTUFBQSxPQUFBO0FBQ0UsV0FBQSxJQUFBLGlCQUFBLFNBQUEsSUFBQSxDQUFBLEdBQUEsSUFBQTtBQUFBLElBQThDO0FBRWhELFdBQUE7QUFBQSxFQUFPLENBQUE7QUFFVCxTQUFBLENBQUEsVUFBQSxJQUFBLFVBQUEsVUFBQSxRQUFBLElBQUEsTUFBQSxJQUFBLGlCQUFBLEtBQUEsQ0FBQSxJQUFBO0FBRUY7QUFFTyxTQUFBLHFCQUFBLE9BQUEsVUFBQSxrQkFBQTtBQUtMLHVCQUFBO0FBQ0EsUUFBQSxNQUFBLFNBQUEsTUFBQTtBQUNFLFFBQUEsTUFBQSxVQUFBLFFBQUE7QUFDRSxhQUFBO0FBQUEsSUFBTztBQUVULFVBQUEsT0FBQSxvQkFBQSxJQUFBO0FBQ0EsZUFBQSxRQUFBLE1BQUEsT0FBQTtBQUNFLFlBQUEsTUFBQSxpQkFBQSxTQUFBLElBQUEsQ0FBQTtBQUNBLFVBQUEsUUFBQSxLQUFBLElBQUEsR0FBQTtBQUNBLFVBQUEsQ0FBQSxPQUFBO0FBQ0UsZ0JBQUEsQ0FBQTtBQUNBLGFBQUEsSUFBQSxLQUFBLEtBQUE7QUFBQSxNQUFrQjtBQUVwQixZQUFBLEtBQUEsSUFBQTtBQUFBLElBQWU7QUFFakIsV0FBQTtBQUFBLEVBQU8sQ0FBQTtBQUVULFNBQUEsQ0FBQSxVQUFBLElBQUEsVUFBQSxVQUFBLFFBQUEsSUFBQSxNQUFBLElBQUEsaUJBQUEsS0FBQSxDQUFBLElBQUE7QUFFRjsifQ==
