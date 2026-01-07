import { subscribe } from './subscribe-async-generator.js';
import { $$, $, _$$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import $style from './screen-tab-bar.module.css.js';
import TabBar from './TabBar.vue.js';
import { userData } from './user-data.js';
import removeArrayElement from './remove-array-element.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { syncState } from './sync.js';
import { watchEffect, computed, createVNode } from './runtime-core.esm-bundler.js';
function onListReady(list) {
  subscribe($$(list, C.ScreenControls.screen), onScreenItemReady);
  watchEffect(() => {
    syncState();
    sortScreenList(list);
  });
}
function sortScreenList(list) {
  const screens = _$$(list, C.ScreenControls.screen).map(screen => {
    const name = _$(screen, C.ScreenControls.name);
    const id = extractScreenId(name.href);
    const index = id ? userData.tabs.order.indexOf(id) : -1;
    return {
      el: screen,
      index,
    };
  });
  screens.sort((a, b) => a.index - b.index);
  for (const screen of screens) {
    list.appendChild(screen.el);
  }
  list.appendChild(_$(list, C.ScreenControls.undo));
}
async function onScreenItemReady(item) {
  const name = await $(item, C.ScreenControls.name);
  const id = extractScreenId(name.href);
  if (id === void 0) {
    return;
  }
  const copy = await $(item, C.ScreenControls.copy);
  const hidden = computed(() => userData.tabs.hidden.includes(id));
  watchEffectWhileNodeAlive(name, () => {
    if (hidden.value) {
      name.classList.add($style.hiddenName);
    } else {
      name.classList.remove($style.hiddenName);
    }
  });
  function onClick(e) {
    if (hidden.value) {
      removeArrayElement(userData.tabs.hidden, id);
    } else {
      userData.tabs.hidden.push(id);
    }
    e.stopPropagation();
    e.preventDefault();
  }
  createFragmentApp(() =>
    createVNode(
      'div',
      {
        class: [C.ScreenControls.delete, C.type.typeSmall, $style.hideButton],
        onClick: onClick,
      },
      [hidden.value ? 'shw' : 'hide'],
    ),
  ).before(copy);
}
function extractScreenId(url) {
  return url?.match(/screen=([\w-]+)/)?.[1] ?? void 0;
}
function init() {
  subscribe($$(document, C.ScreenControls.container), container => {
    createFragmentApp(TabBar).appendTo(container);
  });
  subscribe($$(document, C.ScreenControls.screens), onListReady);
  applyCssRule(`.${C.Head.contextAndScreens}`, $style.contextAndScreens);
  applyCssRule(`.${C.ScreenControls.container}`, $style.screenControls);
}
features.add(import.meta.url, init, 'Adds a tab bar for user screens.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuLXRhYi1iYXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9zY3JlZW4tdGFiLWJhci9zY3JlZW4tdGFiLWJhci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICRzdHlsZSBmcm9tICcuL3NjcmVlbi10YWItYmFyLm1vZHVsZS5jc3MnO1xuaW1wb3J0IFRhYkJhciBmcm9tICcuL1RhYkJhci52dWUnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YSc7XG5pbXBvcnQgcmVtb3ZlQXJyYXlFbGVtZW50IGZyb20gJ0BzcmMvdXRpbHMvcmVtb3ZlLWFycmF5LWVsZW1lbnQnO1xuaW1wb3J0IHsgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZSB9IGZyb20gJ0BzcmMvdXRpbHMvd2F0Y2gnO1xuaW1wb3J0IHsgc3luY1N0YXRlIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9iYXNpYy9zY3JlZW4tdGFiLWJhci9zeW5jJztcblxuZnVuY3Rpb24gb25MaXN0UmVhZHkobGlzdDogSFRNTEVsZW1lbnQpIHtcbiAgc3Vic2NyaWJlKCQkKGxpc3QsIEMuU2NyZWVuQ29udHJvbHMuc2NyZWVuKSwgb25TY3JlZW5JdGVtUmVhZHkpO1xuICB3YXRjaEVmZmVjdCgoKSA9PiB7XG4gICAgc3luY1N0YXRlKCk7XG4gICAgc29ydFNjcmVlbkxpc3QobGlzdCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzb3J0U2NyZWVuTGlzdChsaXN0OiBIVE1MRWxlbWVudCkge1xuICBjb25zdCBzY3JlZW5zID0gXyQkKGxpc3QsIEMuU2NyZWVuQ29udHJvbHMuc2NyZWVuKS5tYXAoc2NyZWVuID0+IHtcbiAgICBjb25zdCBuYW1lID0gXyQoc2NyZWVuLCBDLlNjcmVlbkNvbnRyb2xzLm5hbWUpIGFzIEhUTUxBbmNob3JFbGVtZW50O1xuICAgIGNvbnN0IGlkID0gZXh0cmFjdFNjcmVlbklkKG5hbWUuaHJlZik7XG4gICAgY29uc3QgaW5kZXggPSBpZCA/IHVzZXJEYXRhLnRhYnMub3JkZXIuaW5kZXhPZihpZCkgOiAtMTtcbiAgICByZXR1cm4ge1xuICAgICAgZWw6IHNjcmVlbixcbiAgICAgIGluZGV4LFxuICAgIH07XG4gIH0pO1xuICBzY3JlZW5zLnNvcnQoKGEsIGIpID0+IGEuaW5kZXggLSBiLmluZGV4KTtcbiAgZm9yIChjb25zdCBzY3JlZW4gb2Ygc2NyZWVucykge1xuICAgIGxpc3QuYXBwZW5kQ2hpbGQoc2NyZWVuLmVsKTtcbiAgfVxuICBsaXN0LmFwcGVuZENoaWxkKF8kKGxpc3QsIEMuU2NyZWVuQ29udHJvbHMudW5kbykhKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gb25TY3JlZW5JdGVtUmVhZHkoaXRlbTogSFRNTEVsZW1lbnQpIHtcbiAgY29uc3QgbmFtZSA9IChhd2FpdCAkKGl0ZW0sIEMuU2NyZWVuQ29udHJvbHMubmFtZSkpIGFzIEhUTUxBbmNob3JFbGVtZW50O1xuICBjb25zdCBpZCA9IGV4dHJhY3RTY3JlZW5JZChuYW1lLmhyZWYpITtcbiAgaWYgKGlkID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgY29weSA9IGF3YWl0ICQoaXRlbSwgQy5TY3JlZW5Db250cm9scy5jb3B5KTtcbiAgY29uc3QgaGlkZGVuID0gY29tcHV0ZWQoKCkgPT4gdXNlckRhdGEudGFicy5oaWRkZW4uaW5jbHVkZXMoaWQpKTtcblxuICB3YXRjaEVmZmVjdFdoaWxlTm9kZUFsaXZlKG5hbWUsICgpID0+IHtcbiAgICBpZiAoaGlkZGVuLnZhbHVlKSB7XG4gICAgICBuYW1lLmNsYXNzTGlzdC5hZGQoJHN0eWxlLmhpZGRlbk5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lLmNsYXNzTGlzdC5yZW1vdmUoJHN0eWxlLmhpZGRlbk5hbWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gb25DbGljayhlOiBFdmVudCkge1xuICAgIGlmIChoaWRkZW4udmFsdWUpIHtcbiAgICAgIHJlbW92ZUFycmF5RWxlbWVudCh1c2VyRGF0YS50YWJzLmhpZGRlbiwgaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1c2VyRGF0YS50YWJzLmhpZGRlbi5wdXNoKGlkKTtcbiAgICB9XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBjcmVhdGVGcmFnbWVudEFwcCgoKSA9PiAoXG4gICAgPGRpdiBjbGFzcz17W0MuU2NyZWVuQ29udHJvbHMuZGVsZXRlLCBDLnR5cGUudHlwZVNtYWxsLCAkc3R5bGUuaGlkZUJ1dHRvbl19IG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgICAge2hpZGRlbi52YWx1ZSA/ICdzaHcnIDogJ2hpZGUnfVxuICAgIDwvZGl2PlxuICApKS5iZWZvcmUoY29weSk7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RTY3JlZW5JZCh1cmw/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIHVybD8ubWF0Y2goL3NjcmVlbj0oW1xcdy1dKykvKT8uWzFdID8/IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgc3Vic2NyaWJlKCQkKGRvY3VtZW50LCBDLlNjcmVlbkNvbnRyb2xzLmNvbnRhaW5lciksIGNvbnRhaW5lciA9PiB7XG4gICAgY3JlYXRlRnJhZ21lbnRBcHAoVGFiQmFyKS5hcHBlbmRUbyhjb250YWluZXIpO1xuICB9KTtcbiAgc3Vic2NyaWJlKCQkKGRvY3VtZW50LCBDLlNjcmVlbkNvbnRyb2xzLnNjcmVlbnMpLCBvbkxpc3RSZWFkeSk7XG4gIGFwcGx5Q3NzUnVsZShgLiR7Qy5IZWFkLmNvbnRleHRBbmRTY3JlZW5zfWAsICRzdHlsZS5jb250ZXh0QW5kU2NyZWVucyk7XG4gIGFwcGx5Q3NzUnVsZShgLiR7Qy5TY3JlZW5Db250cm9scy5jb250YWluZXJ9YCwgJHN0eWxlLnNjcmVlbkNvbnRyb2xzKTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0FkZHMgYSB0YWIgYmFyIGZvciB1c2VyIHNjcmVlbnMuJyk7XG4iXSwibmFtZXMiOlsic3Vic2NyaWJlIiwid2F0Y2hFZmZlY3QiLCJzeW5jU3RhdGUiLCJlbCIsImluZGV4Iiwic2NyZWVucyIsImxpc3QiLCJjcmVhdGVGcmFnbWVudEFwcCIsImFwcGx5Q3NzUnVsZSIsImZlYXR1cmVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBT0EsU0FBQSxZQUFBLE1BQUE7QUFDRUEsWUFBQUEsR0FBQUEsTUFBQUEsRUFBQUEsZUFBQUEsTUFBQUEsR0FBQUEsaUJBQUFBO0FBQ0FDLGNBQUFBLE1BQUFBO0FBQ0VDLGNBQUFBOztFQUVGLENBQUE7QUFDRjtBQUVBLFNBQUEsZUFBQSxNQUFBO0FBQ0UsUUFBQSxVQUFBLElBQUEsTUFBQSxFQUFBLGVBQUEsTUFBQSxFQUFBLElBQUEsWUFBQTs7QUFFRSxVQUFBLEtBQUEsZ0JBQUEsS0FBQSxJQUFBO0FBQ0EsVUFBQSxRQUFBLEtBQUEsU0FBQSxLQUFBLE1BQUEsUUFBQSxFQUFBLElBQUE7O01BRUVDLElBQUFBO0FBQUFBLE1BQ0FDO0FBQUFBO0VBRUosQ0FBQTtBQUNBQyxVQUFBQSxLQUFBQSxDQUFBQSxHQUFBQSxNQUFBQSxFQUFBQSxRQUFBQSxFQUFBQSxLQUFBQTtBQUNBLGFBQUEsVUFBQSxTQUFBO0FBQ0VDLFNBQUFBLFlBQUFBLE9BQUFBLEVBQUFBO0FBQUFBLEVBQ0Y7QUFDQUEsT0FBQUEsWUFBQUEsR0FBQUEsTUFBQUEsRUFBQUEsZUFBQUEsSUFBQUEsQ0FBQUE7QUFDRjtBQUVBLGVBQUEsa0JBQUEsTUFBQTtBQUNFLFFBQUEsT0FBQSxNQUFBLEVBQUEsTUFBQSxFQUFBLGVBQUEsSUFBQTtBQUNBLFFBQUEsS0FBQSxnQkFBQSxLQUFBLElBQUE7O0FBRUU7QUFBQSxFQUNGO0FBQ0EsUUFBQSxPQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsZUFBQSxJQUFBO0FBQ0EsUUFBQSxTQUFBLFNBQUEsTUFBQSxTQUFBLEtBQUEsT0FBQSxTQUFBLEVBQUEsQ0FBQTs7OztJQUtFLE9BQUE7O0lBRUE7QUFBQSxFQUNGLENBQUE7Ozs7SUFLRSxPQUFBOztJQUVBOzs7RUFHRjs7SUFFa0IsU0FBQSxDQUFBLEVBQUEsZUFBQSxRQUFBLEVBQUEsS0FBQSxXQUFBLE9BQUEsVUFBQTtBQUFBO0VBQzRFLEdBQUEsQ0FBQSxPQUFBLFFBQUEsUUFBQSxNQUFBLENBQUEsQ0FBQSxFQUFBLE9BQUEsSUFBQTtBQUloRztBQUVBLFNBQUEsZ0JBQUEsS0FBQTs7QUFFQTtBQUVBLFNBQUEsT0FBQTtBQUNFTixZQUFBQSxHQUFBQSxVQUFBQSxFQUFBQSxlQUFBQSxTQUFBQSxHQUFBQSxlQUFBQTtBQUNFTyxzQkFBQUEsTUFBQUEsRUFBQUEsU0FBQUEsU0FBQUE7QUFBQUEsRUFDRixDQUFBO0FBQ0FQLFlBQUFBLEdBQUFBLFVBQUFBLEVBQUFBLGVBQUFBLE9BQUFBLEdBQUFBLFdBQUFBO0FBQ0FRLGVBQUFBLElBQUFBLEVBQUFBLEtBQUFBLGlCQUFBQSxJQUFBQSxPQUFBQSxpQkFBQUE7QUFDQUEsZUFBQUEsSUFBQUEsRUFBQUEsZUFBQUEsU0FBQUEsSUFBQUEsT0FBQUEsY0FBQUE7QUFDRjtBQUVBQyxTQUFBQSxJQUFBQSxZQUFBQSxLQUFBQSxNQUFBQSxrQ0FBQUE7In0=
