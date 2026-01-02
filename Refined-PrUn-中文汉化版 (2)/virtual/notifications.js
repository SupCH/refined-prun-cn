import { $ } from './select-dom.js';
import { C } from './prun-css.js';
import oneMutation from './index7.js';
async function waitNotificationLoaded(container) {
  const content = await $(container, C.AlertListItem.content);
  const isLoaded = () => !content.textContent?.includes('…');
  if (!isLoaded()) {
    await oneMutation(content, {
      childList: true,
      subtree: true,
      characterData: true,
      filter: isLoaded,
    });
  }
  return content;
}
export { waitNotificationLoaded };
