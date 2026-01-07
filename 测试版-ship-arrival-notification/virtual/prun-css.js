import { _$$, $$, registerClassName } from './select-dom.js';
import { subscribe } from './subscribe-async-generator.js';
import { watchUntil } from './watch.js';
import { reactive, ref } from './reactivity.esm-bundler.js';
const C = {};
const prunCssStylesheets = reactive(/* @__PURE__ */ new Set());
const appContainerFound = ref(false);
let mergedPrunStyles = '';
const prunStyleUpdated = ref(false);
async function loadPrunCss() {
  for (const style of _$$(document.head, 'style')) {
    processStylesheet(style);
  }
  subscribe($$(document.head, 'style'), processStylesheet);
  await watchUntil(() => appContainerFound.value);
}
function processStylesheet(style) {
  if (style.dataset.source !== 'prun' || prunCssStylesheets.has(style)) {
    return;
  }
  const classSet = /* @__PURE__ */ new Set();
  const cssRules = style.sheet.cssRules;
  for (let i = 0; i < cssRules.length; i++) {
    const rule = cssRules.item(i);
    const selector = rule?.selectorText;
    if (!selector?.includes('___')) {
      continue;
    }
    const matches = selector.match(/[\w-]+__[\w-]+___[\w-]+/g);
    for (const match of matches ?? []) {
      const className = match.replace('.', '');
      classSet.add(className);
    }
  }
  const classes = Array.from(classSet);
  classes.sort();
  for (const cssClass of classes) {
    const camelize = s => s.replace(/-./g, x => x[1].toUpperCase());
    const parts = cssClass.replace('__', '.').replace('___', '.').split('.');
    const parent = camelize(parts[0]);
    if (parent === '') {
      continue;
    }
    const child = camelize(parts[1]);
    let parentObject = C[parent];
    if (parentObject === void 0) {
      parentObject = {};
      C[parent] = parentObject;
    }
    if (parentObject[child] !== void 0) {
      continue;
    }
    parentObject[child] = cssClass;
    registerClassName(cssClass);
  }
  prunCssStylesheets.add(style);
  appContainerFound.value = C.App?.container !== void 0;
  mergedPrunStyles +=
    style.textContent
      .split('\n')
      .filter(x => !x.includes('sourceMappingURL'))
      .join('\n') + '\n';
}
export { C, loadPrunCss, mergedPrunStyles, prunCssStylesheets, prunStyleUpdated };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJ1bi1jc3MuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL3BydW4tY3NzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZ2lzdGVyQ2xhc3NOYW1lIH0gZnJvbSAnQHNyYy91dGlscy9zZWxlY3QtZG9tJztcbmltcG9ydCB7IHdhdGNoVW50aWwgfSBmcm9tICdAc3JjL3V0aWxzL3dhdGNoJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnQHNyYy91dGlscy9zbGVlcCc7XG5cbmV4cG9ydCBjb25zdCBDID0ge30gYXMgUHJ1bkNzc0NsYXNzZXM7XG5leHBvcnQgY29uc3QgcHJ1bkNzc1N0eWxlc2hlZXRzID0gcmVhY3RpdmU8U2V0PEhUTUxTdHlsZUVsZW1lbnQ+PihuZXcgU2V0KCkpO1xuY29uc3QgYXBwQ29udGFpbmVyRm91bmQgPSByZWYoZmFsc2UpO1xuZXhwb3J0IGxldCBtZXJnZWRQcnVuU3R5bGVzID0gJyc7XG5leHBvcnQgY29uc3QgcHJ1blN0eWxlVXBkYXRlZCA9IHJlZihmYWxzZSk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkUHJ1bkNzcygpIHtcbiAgZm9yIChjb25zdCBzdHlsZSBvZiBfJCQoZG9jdW1lbnQuaGVhZCwgJ3N0eWxlJykpIHtcbiAgICBwcm9jZXNzU3R5bGVzaGVldChzdHlsZSk7XG4gIH1cblxuICBzdWJzY3JpYmUoJCQoZG9jdW1lbnQuaGVhZCwgJ3N0eWxlJyksIHByb2Nlc3NTdHlsZXNoZWV0KTtcbiAgYXdhaXQgd2F0Y2hVbnRpbCgoKSA9PiBhcHBDb250YWluZXJGb3VuZC52YWx1ZSk7XG5cbiAgaWYgKGltcG9ydC5tZXRhLmVudi5ERVYpIHtcbiAgICB2b2lkIGNoZWNrUHJ1bkNzc1VwZGF0ZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NTdHlsZXNoZWV0KHN0eWxlOiBIVE1MU3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZS5kYXRhc2V0LnNvdXJjZSAhPT0gJ3BydW4nIHx8IHBydW5Dc3NTdHlsZXNoZWV0cy5oYXMoc3R5bGUpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY2xhc3NTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgY29uc3QgY3NzUnVsZXMgPSBzdHlsZS5zaGVldCEuY3NzUnVsZXM7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY3NzUnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBydWxlID0gY3NzUnVsZXMuaXRlbShpKSBhcyBDU1NTdHlsZVJ1bGU7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBydWxlPy5zZWxlY3RvclRleHQ7XG4gICAgaWYgKCFzZWxlY3Rvcj8uaW5jbHVkZXMoJ19fXycpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgbWF0Y2hlcyA9IHNlbGVjdG9yLm1hdGNoKC9bXFx3LV0rX19bXFx3LV0rX19fW1xcdy1dKy9nKTtcbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIG1hdGNoZXMgPz8gW10pIHtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IG1hdGNoLnJlcGxhY2UoJy4nLCAnJyk7XG4gICAgICBjbGFzc1NldC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjbGFzc2VzID0gQXJyYXkuZnJvbShjbGFzc1NldCk7XG4gIGNsYXNzZXMuc29ydCgpO1xuICBmb3IgKGNvbnN0IGNzc0NsYXNzIG9mIGNsYXNzZXMpIHtcbiAgICBjb25zdCBjYW1lbGl6ZSA9IChzOiBzdHJpbmcpID0+IHMucmVwbGFjZSgvLS4vZywgeCA9PiB4WzFdLnRvVXBwZXJDYXNlKCkpO1xuICAgIGNvbnN0IHBhcnRzID0gY3NzQ2xhc3MucmVwbGFjZSgnX18nLCAnLicpLnJlcGxhY2UoJ19fXycsICcuJykuc3BsaXQoJy4nKTtcbiAgICBjb25zdCBwYXJlbnQgPSBjYW1lbGl6ZShwYXJ0c1swXSk7XG4gICAgaWYgKHBhcmVudCA9PT0gJycpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCBjaGlsZCA9IGNhbWVsaXplKHBhcnRzWzFdKTtcbiAgICBsZXQgcGFyZW50T2JqZWN0ID0gQ1twYXJlbnRdO1xuICAgIGlmIChwYXJlbnRPYmplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyZW50T2JqZWN0ID0ge307XG4gICAgICBDW3BhcmVudF0gPSBwYXJlbnRPYmplY3Q7XG4gICAgfVxuICAgIGlmIChwYXJlbnRPYmplY3RbY2hpbGRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBwYXJlbnRPYmplY3RbY2hpbGRdID0gY3NzQ2xhc3M7XG4gICAgcmVnaXN0ZXJDbGFzc05hbWUoY3NzQ2xhc3MpO1xuICB9XG5cbiAgcHJ1bkNzc1N0eWxlc2hlZXRzLmFkZChzdHlsZSk7XG4gIGFwcENvbnRhaW5lckZvdW5kLnZhbHVlID0gQy5BcHA/LmNvbnRhaW5lciAhPT0gdW5kZWZpbmVkO1xuXG4gIG1lcmdlZFBydW5TdHlsZXMgKz1cbiAgICBzdHlsZVxuICAgICAgLnRleHRDb250ZW50IS5zcGxpdCgnXFxuJylcbiAgICAgIC5maWx0ZXIoeCA9PiAheC5pbmNsdWRlcygnc291cmNlTWFwcGluZ1VSTCcpKVxuICAgICAgLmpvaW4oJ1xcbicpICsgJ1xcbic7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrUHJ1bkNzc1VwZGF0ZSgpIHtcbiAgbGV0IGxhc3RTdHlsZXNoZWV0ID0gJyc7XG4gIHdoaWxlICghbGFzdFN0eWxlc2hlZXQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9yZWZpbmVkLXBydW4uZ2l0aHViLmlvL3BydW4tY3NzL3BydW4uY3NzJyk7XG4gICAgICBsYXN0U3R5bGVzaGVldCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIERvIG5vdGhpbmcuXG4gICAgfVxuICAgIGlmICghbGFzdFN0eWxlc2hlZXQpIHtcbiAgICAgIGF3YWl0IHNsZWVwKDEwMDApO1xuICAgIH1cbiAgfVxuICBwcnVuU3R5bGVVcGRhdGVkLnZhbHVlID0gbGFzdFN0eWxlc2hlZXQgIT09IG1lcmdlZFBydW5TdHlsZXM7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUlPLE1BQUEsSUFBQSxDQUFBO0FBQ0EsTUFBQSxxQkFBQSxTQUFBLG9CQUFBLElBQUEsQ0FBQTtBQUNQLE1BQUEsb0JBQUEsSUFBQSxLQUFBO0FBQ08sSUFBQSxtQkFBQTtBQUNBLE1BQUEsbUJBQUEsSUFBQSxLQUFBO0FBRVAsZUFBQSxjQUFBO0FBQ0UsYUFBQSxTQUFBLElBQUEsU0FBQSxNQUFBLE9BQUEsR0FBQTtBQUNFLHNCQUFBLEtBQUE7QUFBQSxFQUF1QjtBQUd6QixZQUFBLEdBQUEsU0FBQSxNQUFBLE9BQUEsR0FBQSxpQkFBQTtBQUNBLFFBQUEsV0FBQSxNQUFBLGtCQUFBLEtBQUE7QUFLRjtBQUVBLFNBQUEsa0JBQUEsT0FBQTtBQUNFLE1BQUEsTUFBQSxRQUFBLFdBQUEsVUFBQSxtQkFBQSxJQUFBLEtBQUEsR0FBQTtBQUNFO0FBQUEsRUFBQTtBQUdGLFFBQUEsV0FBQSxvQkFBQSxJQUFBO0FBQ0EsUUFBQSxXQUFBLE1BQUEsTUFBQTtBQUNBLFdBQUEsSUFBQSxHQUFBLElBQUEsU0FBQSxRQUFBLEtBQUE7QUFDRSxVQUFBLE9BQUEsU0FBQSxLQUFBLENBQUE7QUFDQSxVQUFBLFdBQUEsTUFBQTtBQUNBLFFBQUEsQ0FBQSxVQUFBLFNBQUEsS0FBQSxHQUFBO0FBQ0U7QUFBQSxJQUFBO0FBRUYsVUFBQSxVQUFBLFNBQUEsTUFBQSwwQkFBQTtBQUNBLGVBQUEsU0FBQSxXQUFBLElBQUE7QUFDRSxZQUFBLFlBQUEsTUFBQSxRQUFBLEtBQUEsRUFBQTtBQUNBLGVBQUEsSUFBQSxTQUFBO0FBQUEsSUFBc0I7QUFBQSxFQUN4QjtBQUdGLFFBQUEsVUFBQSxNQUFBLEtBQUEsUUFBQTtBQUNBLFVBQUEsS0FBQTtBQUNBLGFBQUEsWUFBQSxTQUFBO0FBQ0UsVUFBQSxXQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsT0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsWUFBQSxDQUFBO0FBQ0EsVUFBQSxRQUFBLFNBQUEsUUFBQSxNQUFBLEdBQUEsRUFBQSxRQUFBLE9BQUEsR0FBQSxFQUFBLE1BQUEsR0FBQTtBQUNBLFVBQUEsU0FBQSxTQUFBLE1BQUEsQ0FBQSxDQUFBO0FBQ0EsUUFBQSxXQUFBLElBQUE7QUFDRTtBQUFBLElBQUE7QUFFRixVQUFBLFFBQUEsU0FBQSxNQUFBLENBQUEsQ0FBQTtBQUNBLFFBQUEsZUFBQSxFQUFBLE1BQUE7QUFDQSxRQUFBLGlCQUFBLFFBQUE7QUFDRSxxQkFBQSxDQUFBO0FBQ0EsUUFBQSxNQUFBLElBQUE7QUFBQSxJQUFZO0FBRWQsUUFBQSxhQUFBLEtBQUEsTUFBQSxRQUFBO0FBQ0U7QUFBQSxJQUFBO0FBRUYsaUJBQUEsS0FBQSxJQUFBO0FBQ0Esc0JBQUEsUUFBQTtBQUFBLEVBQTBCO0FBRzVCLHFCQUFBLElBQUEsS0FBQTtBQUNBLG9CQUFBLFFBQUEsRUFBQSxLQUFBLGNBQUE7QUFFQSxzQkFBQSxNQUFBLFlBQUEsTUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLFNBQUEsa0JBQUEsQ0FBQSxFQUFBLEtBQUEsSUFBQSxJQUFBO0FBS0Y7In0=
