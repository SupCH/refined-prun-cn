import { applyCssRule } from './refined-prun-css.js';
import { C, prunCssStylesheets } from './prun-css.js';
import features from './feature-registry.js';
import $style from './prun-bugs.module.css.js';
function removeMobileCssRules() {
  for (const style of prunCssStylesheets) {
    const styleSheet = style.sheet;
    const rules = styleSheet.cssRules;
    try {
      for (let j = rules.length - 1; j >= 0; j--) {
        const rule = rules[j];
        if (rule instanceof CSSMediaRule && rule.media.mediaText.includes('screen')) {
          styleSheet.deleteRule(j);
        }
      }
    } catch (e) {
      console.log(`Could not modify stylesheet: ${styleSheet.href}, Error: ${e}`);
    }
  }
}
function fixZOrder() {
  applyCssRule(
    [
      `.${C.ComExOrdersPanel.filter}`,
      `.${C.LocalMarket.filter}`,
      `.${C.ContractsListTable.filter}`,
    ],
    $style.filter,
  );
  applyCssRule(`.${C.ScrollView.track}`, $style.scrollTrack);
}
function init() {
  removeMobileCssRules();
  fixZOrder();
  applyCssRule(`.${C.Head.container}`, $style.head);
  applyCssRule(`.${C.ColoredIcon.subLabel}`, $style.subLabel);
  applyCssRule(`.${C.GridItemView.container}`, $style.gridItem);
  applyCssRule(`.${C.GridItemView.name}`, $style.gridItemName);
  applyCssRule(['PROD', 'PRODQ'], `.${C.OrderTile.overlay}`, $style.disablePointerEvents);
  applyCssRule('PROD', `.${C.SiteProductionLines.container}`, $style.containerScrollbarGutter);
  applyCssRule('GIFT', `.${C.UserSelector.suggestionsContainer}`, $style.giftSearchResults);
  applyCssRule('[data-tooltip-position="bottom"]', $style.tooltipBottom);
  applyCssRule('[data-tooltip-position="right"]', $style.tooltipRight);
}
features.add(import.meta.url, init, 'Fixes PrUn bugs.');
