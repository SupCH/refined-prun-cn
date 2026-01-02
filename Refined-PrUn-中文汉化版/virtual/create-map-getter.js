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
