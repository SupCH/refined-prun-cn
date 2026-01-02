import { castArray } from './cast-array.js';
function findWithQuery(query, find) {
  if (typeof query === 'string') {
    query = query
      .trim()
      .split(' ')
      .filter(x => x.length > 0);
  }
  query = query.map(x => x.toLowerCase());
  let include = [];
  const includeSet = /* @__PURE__ */ new Set();
  const exclude = /* @__PURE__ */ new Set();
  let includeAll = true;
  let excludeAll = false;
  let isNot = false;
  let nextTerm = '';
  const nextTermParts = [];
  while (query.length > 0) {
    const nextQueryPart = query.shift();
    nextTermParts.push(nextQueryPart);
    if (nextTerm.length === 0) {
      nextTerm = nextQueryPart;
    } else {
      nextTerm += ' ' + nextQueryPart;
    }
    if (nextTerm === 'not') {
      isNot = true;
      excludeAll = true;
      nextTerm = '';
      nextTermParts.length = 0;
      continue;
    }
    const match = find(nextTerm, nextTermParts);
    if (match === void 0) {
      continue;
    }
    const matches = castArray(match);
    if (!isNot) {
      includeAll = false;
      for (const item of matches) {
        if (!includeSet.has(item)) {
          include.push(item);
          includeSet.add(item);
        }
      }
    } else {
      excludeAll = false;
      for (const item of matches) {
        exclude.add(item);
      }
    }
    nextTerm = '';
    nextTermParts.length = 0;
  }
  include = include.filter(x => !exclude.has(x));
  return {
    include,
    exclude,
    includeAll,
    excludeAll,
  };
}
export { findWithQuery };
