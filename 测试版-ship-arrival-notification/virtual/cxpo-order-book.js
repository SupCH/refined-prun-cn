import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import OrderBook from './OrderBook.vue.js';
import { changeInputValue } from './util.js';
import { increaseDefaultBufferSize } from './buffer-sizes.js';
import { fixed02, fixed0 } from './format.js';
function onTileReady(tile) {
  if (!tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.ComExPlaceOrderForm.form), form => {
    const formParent = form.parentElement;
    formParent.style.display = 'flex';
    form.style.flex = '1';
    for (const label of _$$(form, C.FormComponent.label)) {
      label.style.minWidth = '120px';
    }
    for (const span of _$$(form, C.Tooltip.container)) {
      span.setAttribute('data-tooltip-position', 'right');
    }
    const dynamicInputs = _$$(form, 'input');
    function onOrderClick(price, quantity) {
      changeInputValue(dynamicInputs[1], fixed02(price));
      if (quantity !== void 0 && quantity > 0) {
        changeInputValue(dynamicInputs[0], fixed0(quantity));
      }
    }
    createFragmentApp(OrderBook, { ticker: tile.parameter, onOrderClick }).appendTo(formParent);
  });
}
function init() {
  increaseDefaultBufferSize('CXPO', { width: 60 });
  tiles.observe('CXPO', onTileReady);
}
features.add(import.meta.url, init, 'CXPO: Adds a compact order book.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3hwby1vcmRlci1ib29rLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvY3hwby1vcmRlci1ib29rL2N4cG8tb3JkZXItYm9vay50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT3JkZXJCb29rIGZyb20gJy4vT3JkZXJCb29rLnZ1ZSc7XG5pbXBvcnQgeyBjaGFuZ2VJbnB1dFZhbHVlIH0gZnJvbSAnQHNyYy91dGlsJztcbmltcG9ydCB7IGluY3JlYXNlRGVmYXVsdEJ1ZmZlclNpemUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYnVmZmVyLXNpemVzJztcbmltcG9ydCB7IGZpeGVkMCwgZml4ZWQwMiB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgaWYgKCF0aWxlLnBhcmFtZXRlcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHN1YnNjcmliZSgkJCh0aWxlLmFuY2hvciwgQy5Db21FeFBsYWNlT3JkZXJGb3JtLmZvcm0pLCBmb3JtID0+IHtcbiAgICBjb25zdCBmb3JtUGFyZW50ID0gZm9ybS5wYXJlbnRFbGVtZW50ITtcbiAgICBmb3JtUGFyZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgZm9ybS5zdHlsZS5mbGV4ID0gJzEnO1xuICAgIGZvciAoY29uc3QgbGFiZWwgb2YgXyQkKGZvcm0sIEMuRm9ybUNvbXBvbmVudC5sYWJlbCkpIHtcbiAgICAgIChsYWJlbCBhcyBIVE1MTGFiZWxFbGVtZW50KS5zdHlsZS5taW5XaWR0aCA9ICcxMjBweCc7XG4gICAgfVxuICAgIGZvciAoY29uc3Qgc3BhbiBvZiBfJCQoZm9ybSwgQy5Ub29sdGlwLmNvbnRhaW5lcikpIHtcbiAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAtcG9zaXRpb24nLCAncmlnaHQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkeW5hbWljSW5wdXRzID0gXyQkKGZvcm0sICdpbnB1dCcpO1xuXG4gICAgZnVuY3Rpb24gb25PcmRlckNsaWNrKHByaWNlOiBudW1iZXIsIHF1YW50aXR5PzogbnVtYmVyKSB7XG4gICAgICBjaGFuZ2VJbnB1dFZhbHVlKGR5bmFtaWNJbnB1dHNbMV0sIGZpeGVkMDIocHJpY2UpKTtcbiAgICAgIGlmIChxdWFudGl0eSAhPT0gdW5kZWZpbmVkICYmIHF1YW50aXR5ID4gMCkge1xuICAgICAgICBjaGFuZ2VJbnB1dFZhbHVlKGR5bmFtaWNJbnB1dHNbMF0sIGZpeGVkMChxdWFudGl0eSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUZyYWdtZW50QXBwKE9yZGVyQm9vaywgeyB0aWNrZXI6IHRpbGUucGFyYW1ldGVyLCBvbk9yZGVyQ2xpY2sgfSkuYXBwZW5kVG8oZm9ybVBhcmVudCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICBpbmNyZWFzZURlZmF1bHRCdWZmZXJTaXplKCdDWFBPJywgeyB3aWR0aDogNjAgfSk7XG4gIHRpbGVzLm9ic2VydmUoJ0NYUE8nLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdDWFBPOiBBZGRzIGEgY29tcGFjdCBvcmRlciBib29rLicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQSxTQUFBLFlBQUEsTUFBQTtBQUNFLE1BQUEsQ0FBQSxLQUFBLFdBQUE7QUFDRTtBQUFBLEVBQUE7QUFHRixZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsb0JBQUEsSUFBQSxHQUFBLENBQUEsU0FBQTtBQUNFLFVBQUEsYUFBQSxLQUFBO0FBQ0EsZUFBQSxNQUFBLFVBQUE7QUFDQSxTQUFBLE1BQUEsT0FBQTtBQUNBLGVBQUEsU0FBQSxJQUFBLE1BQUEsRUFBQSxjQUFBLEtBQUEsR0FBQTtBQUNFLFlBQUEsTUFBQSxXQUFBO0FBQUEsSUFBNkM7QUFFL0MsZUFBQSxRQUFBLElBQUEsTUFBQSxFQUFBLFFBQUEsU0FBQSxHQUFBO0FBQ0UsV0FBQSxhQUFBLHlCQUFBLE9BQUE7QUFBQSxJQUFrRDtBQUdwRCxVQUFBLGdCQUFBLElBQUEsTUFBQSxPQUFBO0FBRUEsYUFBQSxhQUFBLE9BQUEsVUFBQTtBQUNFLHVCQUFBLGNBQUEsQ0FBQSxHQUFBLFFBQUEsS0FBQSxDQUFBO0FBQ0EsVUFBQSxhQUFBLFVBQUEsV0FBQSxHQUFBO0FBQ0UseUJBQUEsY0FBQSxDQUFBLEdBQUEsT0FBQSxRQUFBLENBQUE7QUFBQSxNQUFtRDtBQUFBLElBQ3JEO0FBR0Ysc0JBQUEsV0FBQSxFQUFBLFFBQUEsS0FBQSxXQUFBLGFBQUEsQ0FBQSxFQUFBLFNBQUEsVUFBQTtBQUFBLEVBQTBGLENBQUE7QUFFOUY7QUFFQSxTQUFBLE9BQUE7QUFDRSw0QkFBQSxRQUFBLEVBQUEsT0FBQSxHQUFBLENBQUE7QUFDQSxRQUFBLFFBQUEsUUFBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEsa0NBQUE7In0=
