import { subscribe } from './subscribe-async-generator.js';
import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { cxobStore } from './cxob.js';
import { changeInputValue } from './util.js';
import { fixed02 } from './format.js';
import { refValue } from './reactive-dom.js';
import { createReactiveDiv } from './reactive-element.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { isFiniteOrder } from './orders.js';
import { computed } from './runtime-core.esm-bundler.js';
import { ref } from './reactivity.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ComExPlaceOrderForm.form), x => onFormReady(x, tile.parameter));
}
async function onFormReady(form, parameter) {
  const orderBook = computed(() => cxobStore.getByTicker(parameter));
  const quantityInput = await $(form.children[7], 'input');
  const quantityValue = refValue(quantityInput);
  const priceInfo = computed(() => {
    const quantity = Number(quantityValue.value);
    if (!Number.isFinite(quantity) || quantity <= 0 || !orderBook.value) {
      return void 0;
    }
    return {
      buy: fillQuantity(orderBook.value.sellingOrders, quantity),
      sell: fillQuantity(orderBook.value.buyingOrders, quantity),
    };
  });
  const priceBuy = computed(() => priceInfo.value?.buy.price ?? 0);
  const priceSell = computed(() => priceInfo.value?.sell.price ?? 0);
  const priceInput = await $(form.children[8], 'input');
  const priceInputValue = refValue(priceInput);
  const showAutoValues = computed(() => priceInputValue.value === '');
  const buttonsField = form.children[12];
  const isBuyFocused = ref(false);
  const buy = await $(buttonsField, C.Button.success);
  buy.addEventListener('mouseover', () => (isBuyFocused.value = true));
  buy.addEventListener('mouseleave', () => (isBuyFocused.value = false));
  buy.addEventListener('click', e => {
    if (showAutoValues.value) {
      changeInputValue(priceInput, fixed02(priceBuy.value));
      e.stopPropagation();
      e.preventDefault();
    }
  });
  const isSellFocused = ref(false);
  const sell = await $(buttonsField, C.Button.danger);
  sell.addEventListener('mouseover', () => (isSellFocused.value = true));
  sell.addEventListener('mouseleave', () => (isSellFocused.value = false));
  sell.addEventListener('click', e => {
    if (showAutoValues.value) {
      changeInputValue(priceInput, fixed02(priceSell.value));
      e.stopPropagation();
      e.preventDefault();
    }
  });
  const placeholderText = computed(() => {
    if (isBuyFocused.value) {
      return fixed02(priceBuy.value);
    }
    if (isSellFocused.value) {
      return fixed02(priceSell.value);
    }
    return 'Auto';
  });
  watchEffectWhileNodeAlive(form, () => {
    priceInput.placeholder = placeholderText.value;
  });
  const currencyCode = orderBook.value?.currency.code ?? '';
  const showBuyValues = computed(() => showAutoValues.value && !isSellFocused.value);
  const showSellValues = computed(() => showAutoValues.value && !isBuyFocused.value);
  const effectivePriceLabel = await $(form.children[9], C.StaticInput.static);
  createDualLabels(
    effectivePriceLabel.parentElement,
    currencyCode,
    showAutoValues,
    computed(() => (showBuyValues.value ? priceInfo.value?.buy.effectivePrice : void 0)),
    computed(() => (showSellValues.value ? priceInfo.value?.sell.effectivePrice : void 0)),
  );
  const volumeLabel = await $(form.children[10], C.StaticInput.static);
  createDualLabels(
    volumeLabel.parentElement,
    currencyCode,
    showAutoValues,
    computed(() => (showBuyValues.value ? priceInfo.value?.buy.volume : void 0)),
    computed(() => (showSellValues.value ? priceInfo.value?.sell.volume : void 0)),
  );
  watchEffectWhileNodeAlive(form, () => {
    effectivePriceLabel.style.display = showAutoValues.value ? 'none' : '';
    volumeLabel.style.display = showAutoValues.value ? 'none' : '';
  });
}
function createDualLabels(container, currencyUnit, showAutoValues, buyValue, sellValue) {
  const text = computed(() => {
    if (!showAutoValues.value) {
      return void 0;
    }
    if (buyValue.value !== void 0 && sellValue.value !== void 0) {
      return `${fixed02(buyValue.value)} ${currencyUnit} / ${fixed02(sellValue.value)} ${currencyUnit}`;
    }
    if (buyValue.value !== void 0) {
      return `${fixed02(buyValue.value)} ${currencyUnit}`;
    }
    if (sellValue.value !== void 0) {
      return `${fixed02(sellValue.value)} ${currencyUnit}`;
    }
    return '--';
  });
  const div = createReactiveDiv(container, text);
  div.classList.add(C.StaticInput.static, C.forms.static);
  container.prepend(div);
}
function fillQuantity(orders, quantityNeeded) {
  const filled = {
    amount: 0,
    priceLimit: 0,
    volume: 0,
  };
  for (const order of orders) {
    const orderAmount = isFiniteOrder(order) ? order.amount : Number.POSITIVE_INFINITY;
    const remaining = quantityNeeded - filled.amount;
    const filledByOrder = Math.min(remaining, orderAmount);
    const orderPrice = order.limit.amount;
    filled.priceLimit = orderPrice;
    filled.amount += filledByOrder;
    filled.volume += filledByOrder * orderPrice;
    if (filled.amount === quantityNeeded) {
      break;
    }
  }
  const leftover = quantityNeeded - filled.amount;
  filled.volume += leftover * filled.priceLimit;
  return {
    price: filled.priceLimit,
    effectivePrice: filled.volume / quantityNeeded,
    volume: filled.volume,
  };
}
function init() {
  tiles.observe('CXPO', onTileReady);
}
features.add(import.meta.url, init, 'CXPO: Adds automatic price calculation.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3hwby1hdXRvLXByaWNlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvY3hwby1hdXRvLXByaWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGN4b2JTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9jeG9iJztcbmltcG9ydCB7IGNoYW5nZUlucHV0VmFsdWUgfSBmcm9tICdAc3JjL3V0aWwnO1xuaW1wb3J0IHsgZml4ZWQwMiB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCB7IHJlZlZhbHVlIH0gZnJvbSAnQHNyYy91dGlscy9yZWFjdGl2ZS1kb20nO1xuaW1wb3J0IHsgY3JlYXRlUmVhY3RpdmVEaXYgfSBmcm9tICdAc3JjL3V0aWxzL3JlYWN0aXZlLWVsZW1lbnQnO1xuaW1wb3J0IHsgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZSB9IGZyb20gJ0BzcmMvdXRpbHMvd2F0Y2gnO1xuaW1wb3J0IHsgaXNGaW5pdGVPcmRlciB9IGZyb20gJ0BzcmMvY29yZS9vcmRlcnMnO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuQ29tRXhQbGFjZU9yZGVyRm9ybS5mb3JtKSwgeCA9PiBvbkZvcm1SZWFkeSh4LCB0aWxlLnBhcmFtZXRlcikpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBvbkZvcm1SZWFkeShmb3JtOiBIVE1MRWxlbWVudCwgcGFyYW1ldGVyPzogc3RyaW5nKSB7XG4gIGNvbnN0IG9yZGVyQm9vayA9IGNvbXB1dGVkKCgpID0+IGN4b2JTdG9yZS5nZXRCeVRpY2tlcihwYXJhbWV0ZXIpKTtcblxuICBjb25zdCBxdWFudGl0eUlucHV0ID0gYXdhaXQgJChmb3JtLmNoaWxkcmVuWzddLCAnaW5wdXQnKTtcbiAgY29uc3QgcXVhbnRpdHlWYWx1ZSA9IHJlZlZhbHVlKHF1YW50aXR5SW5wdXQpO1xuICBjb25zdCBwcmljZUluZm8gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgcXVhbnRpdHkgPSBOdW1iZXIocXVhbnRpdHlWYWx1ZS52YWx1ZSk7XG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUocXVhbnRpdHkpIHx8IHF1YW50aXR5IDw9IDAgfHwgIW9yZGVyQm9vay52YWx1ZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGJ1eTogZmlsbFF1YW50aXR5KG9yZGVyQm9vay52YWx1ZS5zZWxsaW5nT3JkZXJzLCBxdWFudGl0eSksXG4gICAgICBzZWxsOiBmaWxsUXVhbnRpdHkob3JkZXJCb29rLnZhbHVlLmJ1eWluZ09yZGVycywgcXVhbnRpdHkpLFxuICAgIH07XG4gIH0pO1xuXG4gIGNvbnN0IHByaWNlQnV5ID0gY29tcHV0ZWQoKCkgPT4gcHJpY2VJbmZvLnZhbHVlPy5idXkucHJpY2UgPz8gMCk7XG4gIGNvbnN0IHByaWNlU2VsbCA9IGNvbXB1dGVkKCgpID0+IHByaWNlSW5mby52YWx1ZT8uc2VsbC5wcmljZSA/PyAwKTtcblxuICBjb25zdCBwcmljZUlucHV0ID0gYXdhaXQgJChmb3JtLmNoaWxkcmVuWzhdLCAnaW5wdXQnKTtcbiAgY29uc3QgcHJpY2VJbnB1dFZhbHVlID0gcmVmVmFsdWUocHJpY2VJbnB1dCk7XG4gIGNvbnN0IHNob3dBdXRvVmFsdWVzID0gY29tcHV0ZWQoKCkgPT4gcHJpY2VJbnB1dFZhbHVlLnZhbHVlID09PSAnJyk7XG5cbiAgY29uc3QgYnV0dG9uc0ZpZWxkID0gZm9ybS5jaGlsZHJlblsxMl07XG5cbiAgY29uc3QgaXNCdXlGb2N1c2VkID0gcmVmKGZhbHNlKTtcbiAgY29uc3QgYnV5ID0gYXdhaXQgJChidXR0b25zRmllbGQsIEMuQnV0dG9uLnN1Y2Nlc3MpO1xuICBidXkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4gKGlzQnV5Rm9jdXNlZC52YWx1ZSA9IHRydWUpKTtcbiAgYnV5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiAoaXNCdXlGb2N1c2VkLnZhbHVlID0gZmFsc2UpKTtcbiAgYnV5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgaWYgKHNob3dBdXRvVmFsdWVzLnZhbHVlKSB7XG4gICAgICBjaGFuZ2VJbnB1dFZhbHVlKHByaWNlSW5wdXQsIGZpeGVkMDIocHJpY2VCdXkudmFsdWUpKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBpc1NlbGxGb2N1c2VkID0gcmVmKGZhbHNlKTtcbiAgY29uc3Qgc2VsbCA9IGF3YWl0ICQoYnV0dG9uc0ZpZWxkLCBDLkJ1dHRvbi5kYW5nZXIpO1xuICBzZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IChpc1NlbGxGb2N1c2VkLnZhbHVlID0gdHJ1ZSkpO1xuICBzZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiAoaXNTZWxsRm9jdXNlZC52YWx1ZSA9IGZhbHNlKSk7XG4gIHNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBpZiAoc2hvd0F1dG9WYWx1ZXMudmFsdWUpIHtcbiAgICAgIGNoYW5nZUlucHV0VmFsdWUocHJpY2VJbnB1dCwgZml4ZWQwMihwcmljZVNlbGwudmFsdWUpKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBwbGFjZWhvbGRlclRleHQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKGlzQnV5Rm9jdXNlZC52YWx1ZSkge1xuICAgICAgcmV0dXJuIGZpeGVkMDIocHJpY2VCdXkudmFsdWUpO1xuICAgIH1cbiAgICBpZiAoaXNTZWxsRm9jdXNlZC52YWx1ZSkge1xuICAgICAgcmV0dXJuIGZpeGVkMDIocHJpY2VTZWxsLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuICdBdXRvJztcbiAgfSk7XG5cbiAgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZShmb3JtLCAoKSA9PiB7XG4gICAgcHJpY2VJbnB1dC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyVGV4dC52YWx1ZTtcbiAgfSk7XG5cbiAgY29uc3QgY3VycmVuY3lDb2RlID0gb3JkZXJCb29rLnZhbHVlPy5jdXJyZW5jeS5jb2RlID8/ICcnO1xuICBjb25zdCBzaG93QnV5VmFsdWVzID0gY29tcHV0ZWQoKCkgPT4gc2hvd0F1dG9WYWx1ZXMudmFsdWUgJiYgIWlzU2VsbEZvY3VzZWQudmFsdWUpO1xuICBjb25zdCBzaG93U2VsbFZhbHVlcyA9IGNvbXB1dGVkKCgpID0+IHNob3dBdXRvVmFsdWVzLnZhbHVlICYmICFpc0J1eUZvY3VzZWQudmFsdWUpO1xuXG4gIGNvbnN0IGVmZmVjdGl2ZVByaWNlTGFiZWwgPSBhd2FpdCAkKGZvcm0uY2hpbGRyZW5bOV0sIEMuU3RhdGljSW5wdXQuc3RhdGljKTtcbiAgY3JlYXRlRHVhbExhYmVscyhcbiAgICBlZmZlY3RpdmVQcmljZUxhYmVsLnBhcmVudEVsZW1lbnQhLFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBzaG93QXV0b1ZhbHVlcyxcbiAgICBjb21wdXRlZCgoKSA9PiAoc2hvd0J1eVZhbHVlcy52YWx1ZSA/IHByaWNlSW5mby52YWx1ZT8uYnV5LmVmZmVjdGl2ZVByaWNlIDogdW5kZWZpbmVkKSksXG4gICAgY29tcHV0ZWQoKCkgPT4gKHNob3dTZWxsVmFsdWVzLnZhbHVlID8gcHJpY2VJbmZvLnZhbHVlPy5zZWxsLmVmZmVjdGl2ZVByaWNlIDogdW5kZWZpbmVkKSksXG4gICk7XG5cbiAgY29uc3Qgdm9sdW1lTGFiZWwgPSBhd2FpdCAkKGZvcm0uY2hpbGRyZW5bMTBdLCBDLlN0YXRpY0lucHV0LnN0YXRpYyk7XG4gIGNyZWF0ZUR1YWxMYWJlbHMoXG4gICAgdm9sdW1lTGFiZWwucGFyZW50RWxlbWVudCEsXG4gICAgY3VycmVuY3lDb2RlLFxuICAgIHNob3dBdXRvVmFsdWVzLFxuICAgIGNvbXB1dGVkKCgpID0+IChzaG93QnV5VmFsdWVzLnZhbHVlID8gcHJpY2VJbmZvLnZhbHVlPy5idXkudm9sdW1lIDogdW5kZWZpbmVkKSksXG4gICAgY29tcHV0ZWQoKCkgPT4gKHNob3dTZWxsVmFsdWVzLnZhbHVlID8gcHJpY2VJbmZvLnZhbHVlPy5zZWxsLnZvbHVtZSA6IHVuZGVmaW5lZCkpLFxuICApO1xuXG4gIHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUoZm9ybSwgKCkgPT4ge1xuICAgIGVmZmVjdGl2ZVByaWNlTGFiZWwuc3R5bGUuZGlzcGxheSA9IHNob3dBdXRvVmFsdWVzLnZhbHVlID8gJ25vbmUnIDogJyc7XG4gICAgdm9sdW1lTGFiZWwuc3R5bGUuZGlzcGxheSA9IHNob3dBdXRvVmFsdWVzLnZhbHVlID8gJ25vbmUnIDogJyc7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEdWFsTGFiZWxzKFxuICBjb250YWluZXI6IEhUTUxFbGVtZW50LFxuICBjdXJyZW5jeVVuaXQ6IHN0cmluZyxcbiAgc2hvd0F1dG9WYWx1ZXM6IFJlZjxib29sZWFuPixcbiAgYnV5VmFsdWU6IFJlZjxudW1iZXIgfCB1bmRlZmluZWQ+LFxuICBzZWxsVmFsdWU6IFJlZjxudW1iZXIgfCB1bmRlZmluZWQ+LFxuKSB7XG4gIGNvbnN0IHRleHQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKCFzaG93QXV0b1ZhbHVlcy52YWx1ZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKGJ1eVZhbHVlLnZhbHVlICE9PSB1bmRlZmluZWQgJiYgc2VsbFZhbHVlLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBgJHtmaXhlZDAyKGJ1eVZhbHVlLnZhbHVlKX0gJHtjdXJyZW5jeVVuaXR9IC8gJHtmaXhlZDAyKHNlbGxWYWx1ZS52YWx1ZSl9ICR7Y3VycmVuY3lVbml0fWA7XG4gICAgfVxuICAgIGlmIChidXlWYWx1ZS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gYCR7Zml4ZWQwMihidXlWYWx1ZS52YWx1ZSl9ICR7Y3VycmVuY3lVbml0fWA7XG4gICAgfVxuICAgIGlmIChzZWxsVmFsdWUudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGAke2ZpeGVkMDIoc2VsbFZhbHVlLnZhbHVlKX0gJHtjdXJyZW5jeVVuaXR9YDtcbiAgICB9XG4gICAgcmV0dXJuICctLSc7XG4gIH0pO1xuICBjb25zdCBkaXYgPSBjcmVhdGVSZWFjdGl2ZURpdihjb250YWluZXIsIHRleHQpO1xuICBkaXYuY2xhc3NMaXN0LmFkZChDLlN0YXRpY0lucHV0LnN0YXRpYywgQy5mb3Jtcy5zdGF0aWMpO1xuICBjb250YWluZXIucHJlcGVuZChkaXYpO1xufVxuXG5mdW5jdGlvbiBmaWxsUXVhbnRpdHkob3JkZXJzOiBQcnVuQXBpLkNYQnJva2VyT3JkZXJbXSwgcXVhbnRpdHlOZWVkZWQ6IG51bWJlcikge1xuICBjb25zdCBmaWxsZWQgPSB7XG4gICAgYW1vdW50OiAwLFxuICAgIHByaWNlTGltaXQ6IDAsXG4gICAgdm9sdW1lOiAwLFxuICB9O1xuICBmb3IgKGNvbnN0IG9yZGVyIG9mIG9yZGVycykge1xuICAgIGNvbnN0IG9yZGVyQW1vdW50ID0gaXNGaW5pdGVPcmRlcihvcmRlcikgPyBvcmRlci5hbW91bnQgOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgY29uc3QgcmVtYWluaW5nID0gcXVhbnRpdHlOZWVkZWQgLSBmaWxsZWQuYW1vdW50O1xuICAgIGNvbnN0IGZpbGxlZEJ5T3JkZXIgPSBNYXRoLm1pbihyZW1haW5pbmcsIG9yZGVyQW1vdW50KTtcbiAgICBjb25zdCBvcmRlclByaWNlID0gb3JkZXIubGltaXQuYW1vdW50O1xuICAgIGZpbGxlZC5wcmljZUxpbWl0ID0gb3JkZXJQcmljZTtcbiAgICBmaWxsZWQuYW1vdW50ICs9IGZpbGxlZEJ5T3JkZXI7XG4gICAgZmlsbGVkLnZvbHVtZSArPSBmaWxsZWRCeU9yZGVyICogb3JkZXJQcmljZTtcbiAgICBpZiAoZmlsbGVkLmFtb3VudCA9PT0gcXVhbnRpdHlOZWVkZWQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBjb25zdCBsZWZ0b3ZlciA9IHF1YW50aXR5TmVlZGVkIC0gZmlsbGVkLmFtb3VudDtcbiAgZmlsbGVkLnZvbHVtZSArPSBsZWZ0b3ZlciAqIGZpbGxlZC5wcmljZUxpbWl0O1xuICByZXR1cm4ge1xuICAgIHByaWNlOiBmaWxsZWQucHJpY2VMaW1pdCxcbiAgICBlZmZlY3RpdmVQcmljZTogZmlsbGVkLnZvbHVtZSAvIHF1YW50aXR5TmVlZGVkLFxuICAgIHZvbHVtZTogZmlsbGVkLnZvbHVtZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZSgnQ1hQTycsIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0NYUE86IEFkZHMgYXV0b21hdGljIHByaWNlIGNhbGN1bGF0aW9uLicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBUUEsU0FBQSxZQUFBLE1BQUE7QUFDRSxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsb0JBQUEsSUFBQSxHQUFBLENBQUEsTUFBQSxZQUFBLEdBQUEsS0FBQSxTQUFBLENBQUE7QUFDRjtBQUVBLGVBQUEsWUFBQSxNQUFBLFdBQUE7QUFDRSxRQUFBLFlBQUEsU0FBQSxNQUFBLFVBQUEsWUFBQSxTQUFBLENBQUE7QUFFQSxRQUFBLGdCQUFBLE1BQUEsRUFBQSxLQUFBLFNBQUEsQ0FBQSxHQUFBLE9BQUE7QUFDQSxRQUFBLGdCQUFBLFNBQUEsYUFBQTtBQUNBLFFBQUEsWUFBQSxTQUFBLE1BQUE7QUFDRSxVQUFBLFdBQUEsT0FBQSxjQUFBLEtBQUE7QUFDQSxRQUFBLENBQUEsT0FBQSxTQUFB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
