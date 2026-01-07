import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import link from './link.module.css.js';
import $style from './highlight-own-exchange-orders.module.css.js';
import { companyStore } from './company.js';
import { refPrunId } from './attributes.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { cxobStore } from './cxob.js';
import { showBuffer } from './buffers.js';
import { fxobStore } from './fxob.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile, getOwnOrders, orderCommand) {
  const ownOrders = computed(() => {
    const ownOrders2 = /* @__PURE__ */ new Map();
    const orders = getOwnOrders(tile.parameter);
    if (!orders) {
      return ownOrders2;
    }
    for (const order of orders) {
      ownOrders2.set(order.id, order);
    }
    return ownOrders2;
  });
  subscribe($$(tile.anchor, 'tr'), tr => {
    const id = refPrunId(tr);
    const ownOrder = computed(() => ownOrders.value.get(id.value ?? ''));
    const amountColumn = tr.children[1];
    if (amountColumn === void 0) {
      return;
    }
    amountColumn.addEventListener('click', () => {
      if (ownOrder.value) {
        void showBuffer(`${orderCommand} ${ownOrder.value.id.substring(0, 8)}`);
      }
    });
    watchEffectWhileNodeAlive(tr, () => {
      const isOwnOrder = ownOrder.value !== void 0;
      tr.classList.toggle($style.ownOrder, isOwnOrder);
      amountColumn.classList.toggle(link.link, isOwnOrder);
    });
  });
}
function getOwnComexOrders(parameter) {
  const orderBook = cxobStore.getByTicker(parameter);
  if (!orderBook) {
    return void 0;
  }
  return [...orderBook.sellingOrders, ...orderBook.buyingOrders].filter(
    x => x.trader.id === companyStore.value?.id,
  );
}
function getOwnForexOrders(parameter) {
  const orderBook = fxobStore.getByTicker(parameter);
  if (!orderBook) {
    return void 0;
  }
  return [...orderBook.sellingOrders, ...orderBook.buyingOrders].filter(
    x => x.trader.id === companyStore.value?.id,
  );
}
function init() {
  tiles.observe('CXOB', x => onTileReady(x, getOwnComexOrders, 'CXO'));
  tiles.observe('FXOB', x => onTileReady(x, getOwnForexOrders, 'FXO'));
}
features.add(import.meta.url, init, 'Highlights own orders in CXOB and FXOB.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LW93bi1leGNoYW5nZS1vcmRlcnMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9oaWdobGlnaHQtb3duLWV4Y2hhbmdlLW9yZGVycy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbGluayBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvY3NzL2xpbmsubW9kdWxlLmNzcyc7XG5pbXBvcnQgJHN0eWxlIGZyb20gJy4vaGlnaGxpZ2h0LW93bi1leGNoYW5nZS1vcmRlcnMubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyBjb21wYW55U3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvY29tcGFueSc7XG5pbXBvcnQgeyByZWZQcnVuSWQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYXR0cmlidXRlcyc7XG5pbXBvcnQgeyB3YXRjaEVmZmVjdFdoaWxlTm9kZUFsaXZlIH0gZnJvbSAnQHNyYy91dGlscy93YXRjaCc7XG5pbXBvcnQgeyBjeG9iU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvY3hvYic7XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuaW1wb3J0IHsgZnhvYlN0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2Z4b2InO1xuXG50eXBlIEdldE93bk9yZGVycyA9IChwYXJhbWV0ZXI/OiBzdHJpbmcpID0+IHsgaWQ6IHN0cmluZyB9W10gfCB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIG9uVGlsZVJlYWR5KHRpbGU6IFBydW5UaWxlLCBnZXRPd25PcmRlcnM6IEdldE93bk9yZGVycywgb3JkZXJDb21tYW5kOiBzdHJpbmcpIHtcbiAgY29uc3Qgb3duT3JkZXJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IG93bk9yZGVycyA9IG5ldyBNYXA8c3RyaW5nLCB7IGlkOiBzdHJpbmcgfT4oKTtcbiAgICBjb25zdCBvcmRlcnMgPSBnZXRPd25PcmRlcnModGlsZS5wYXJhbWV0ZXIpO1xuICAgIGlmICghb3JkZXJzKSB7XG4gICAgICByZXR1cm4gb3duT3JkZXJzO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IG9yZGVyIG9mIG9yZGVycykge1xuICAgICAgb3duT3JkZXJzLnNldChvcmRlci5pZCwgb3JkZXIpO1xuICAgIH1cbiAgICByZXR1cm4gb3duT3JkZXJzO1xuICB9KTtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCAndHInKSwgdHIgPT4ge1xuICAgIGNvbnN0IGlkID0gcmVmUHJ1bklkKHRyKTtcbiAgICBjb25zdCBvd25PcmRlciA9IGNvbXB1dGVkKCgpID0+IG93bk9yZGVycy52YWx1ZS5nZXQoaWQudmFsdWUgPz8gJycpKTtcbiAgICBjb25zdCBhbW91bnRDb2x1bW4gPSB0ci5jaGlsZHJlblsxXTtcbiAgICBpZiAoYW1vdW50Q29sdW1uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYW1vdW50Q29sdW1uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKG93bk9yZGVyLnZhbHVlKSB7XG4gICAgICAgIHZvaWQgc2hvd0J1ZmZlcihgJHtvcmRlckNvbW1hbmR9ICR7b3duT3JkZXIudmFsdWUuaWQuc3Vic3RyaW5nKDAsIDgpfWApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUodHIsICgpID0+IHtcbiAgICAgIGNvbnN0IGlzT3duT3JkZXIgPSBvd25PcmRlci52YWx1ZSAhPT0gdW5kZWZpbmVkO1xuICAgICAgdHIuY2xhc3NMaXN0LnRvZ2dsZSgkc3R5bGUub3duT3JkZXIsIGlzT3duT3JkZXIpO1xuICAgICAgYW1vdW50Q29sdW1uLmNsYXNzTGlzdC50b2dnbGUobGluay5saW5rLCBpc093bk9yZGVyKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldE93bkNvbWV4T3JkZXJzKHBhcmFtZXRlcj86IHN0cmluZykge1xuICBjb25zdCBvcmRlckJvb2sgPSBjeG9iU3RvcmUuZ2V0QnlUaWNrZXIocGFyYW1ldGVyKTtcbiAgaWYgKCFvcmRlckJvb2spIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBbLi4ub3JkZXJCb29rLnNlbGxpbmdPcmRlcnMsIC4uLm9yZGVyQm9vay5idXlpbmdPcmRlcnNdLmZpbHRlcihcbiAgICB4ID0+IHgudHJhZGVyLmlkID09PSBjb21wYW55U3RvcmUudmFsdWU/LmlkLFxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRPd25Gb3JleE9yZGVycyhwYXJhbWV0ZXI/OiBzdHJpbmcpIHtcbiAgY29uc3Qgb3JkZXJCb29rID0gZnhvYlN0b3JlLmdldEJ5VGlja2VyKHBhcmFtZXRlcik7XG4gIGlmICghb3JkZXJCb29rKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gWy4uLm9yZGVyQm9vay5zZWxsaW5nT3JkZXJzLCAuLi5vcmRlckJvb2suYnV5aW5nT3JkZXJzXS5maWx0ZXIoXG4gICAgeCA9PiB4LnRyYWRlci5pZCA9PT0gY29tcGFueVN0b3JlLnZhbHVlPy5pZCxcbiAgKTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZSgnQ1hPQicsIHggPT4gb25UaWxlUmVhZHkoeCwgZ2V0T3duQ29tZXhPcmRlcnMsICdDWE8nKSk7XG4gIHRpbGVzLm9ic2VydmUoJ0ZYT0InLCB4ID0+IG9uVGlsZVJlYWR5KHgsIGdldE93bkZvcmV4T3JkZXJzLCAnRlhPJykpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnSGlnaGxpZ2h0cyBvd24gb3JkZXJzIGluIENYT0IgYW5kIEZYT0IuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVdBLFNBQUEsWUFBQSxNQUFBLGNBQUEsY0FBQTtBQUNFLFFBQUEsWUFBQSxTQUFBLE1BQUE7QUFDRSxVQUFBLGFBQUEsb0JBQUEsSUFBQTtBQUNBLFVBQUEsU0FBQSxhQUFBLEtBQUEsU0FBQTtBQUNBLFFBQUEsQ0FBQSxRQUFBO0FBQ0UsYUFBQTtBQUFBLElBQU87QUFFVCxlQUFBLFNBQUEsUUFBQTtBQUNFLGlCQUFBLElBQUEsTUFBQSxJQUFBLEtBQUE7QUFBQSxJQUE2QjtBQUUvQixXQUFBO0FBQUEsRUFBTyxDQUFBO0FBRVQsWUFBQSxHQUFBLEtBQUEsUUFBQSxJQUFBLEdBQUEsQ0FBQSxPQUFBO0FBQ0UsVUFBQSxLQUFBLFVBQUEsRUFBQTtBQUNBLFVBQUEsV0FBQSxTQUFBLE1BQUEsVUFBQSxNQUFBLElBQUEsR0FBQSxTQUFBLEVBQUEsQ0FBQTtBQUNBLFVBQUEsZUFBQSxHQUFBLFNBQUEsQ0FBQTtBQUNBLFFBQUEsaUJBQUEsUUFBQTtBQUNFO0FBQUEsSUFBQTtBQUVGLGlCQUFBLGlCQUFBLFNBQUEsTUFBQTtBQUNFLFVBQUEsU0FBQSxPQUFBO0FBQ0UsYUFBQSxXQUFBLEdBQUEsWUFBQSxJQUFBLFNBQUEsTUFBQSxHQUFBLFVBQUEsR0FBQSxDQUFBLENBQUEsRUFBQTtBQUFBLE1BQXNFO0FBQUEsSUFDeEUsQ0FBQTtBQUVGLDhCQUFBLElBQUEsTUFBQTtBQUNFLFlBQUEsYUFBQSxTQUFBLFVBQUE7QUFDQSxTQUFBLFVBQUEsT0FBQSxPQUFBLFVBQUEsVUFBQTtBQUNBLG1CQUFBLFVBQUEsT0FBQSxLQUFBLE1BQUEsVUFBQTtBQUFBLElBQW1ELENBQUE7QUFBQSxFQUNwRCxDQUFBO0FBRUw7QUFFQSxTQUFBLGtCQUFBLFdBQUE7QUFDRSxRQUFBLFlBQUEsVUFBQSxZQUFBLFNBQUE7QUFDQSxNQUFBLENBQUEsV0FBQTtBQUNFLFdBQUE7QUFBQSxFQUFPO0FBRVQsU0FBQSxDQUFBLEdBQUEsVUFBQSxlQUFBLEdBQUEsVUFBQSxZQUFBLEVBQUE7QUFBQSxJQUErRCxDQUFBLE1BQUEsRUFBQSxPQUFBLE9BQUEsYUFBQSxPQUFBO0FBQUEsRUFDcEI7QUFFN0M7QUFFQSxTQUFBLGtCQUFBLFdBQUE7QUFDRSxRQUFBLFlBQUEsVUFBQSxZQUFBLFNBQUE7QUFDQSxNQUFBLENBQUEsV0FBQTtBQUNFLFdBQUE7QUFBQSxFQUFPO0FBRVQsU0FBQSxDQUFBLEdBQUEsVUFBQSxlQUFBLEdBQUEsVUFBQSxZQUFBLEVBQUE7QUFBQSxJQUErRCxDQUFBLE1BQUEsRUFBQSxPQUFBLE9BQUEsYUFBQSxPQUFBO0FBQUEsRUFDcEI7QUFFN0M7QUFFQSxTQUFBLE9BQUE7QUFDRSxRQUFBLFFBQUEsUUFBQSxDQUFBLE1BQUEsWUFBQSxHQUFBLG1CQUFBLEtBQUEsQ0FBQTtBQUNBLFFBQUEsUUFBQSxRQUFBLENBQUEsTUFBQSxZQUFBLEdBQUEsbUJBQUEsS0FBQSxDQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEseUNBQUE7In0=
