import { _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import _sfc_main from './Overlay.vue.js';
import _sfc_main$1 from './ActionConfirmationOverlay.vue.js';
function showTileOverlay(baseElementOrEvent, component, rootProps) {
  const container = findMountContainer(baseElementOrEvent);
  if (!container) {
    return;
  }
  const scrollView = _$(container, C.ScrollView.view);
  if (!scrollView) {
    return;
  }
  const content = scrollView.lastChild;
  if (content) {
    content.style.display = 'none';
  }
  const fragmentApp = createFragmentApp(_sfc_main, {
    child: component,
    props: rootProps,
    onClose: () => {
      fragmentApp.unmount();
      if (content) {
        scrollView.appendChild(content);
        content.style.display = '';
      }
    },
  });
  fragmentApp.appendTo(scrollView);
}
function showConfirmationOverlay(baseElementOrEvent, onConfirm, options) {
  const message = options?.message ?? 'Are you sure?';
  const confirmLabel = options?.confirmLabel ?? 'Confirm';
  const container = findMountContainer(baseElementOrEvent);
  if (!container) {
    return;
  }
  const fragmentApp = createFragmentApp(_sfc_main$1, {
    message,
    confirmLabel,
    onConfirm: () => {
      fragmentApp.unmount();
      onConfirm();
    },
    onClose: () => fragmentApp.unmount(),
  });
  fragmentApp.appendTo(container);
}
function findMountContainer(baseElementOrEvent) {
  const target = baseElementOrEvent.target ? baseElementOrEvent.target : baseElementOrEvent;
  return target.closest(`.${C.TileFrame.anchor}`);
}
export { showConfirmationOverlay, showTileOverlay };
