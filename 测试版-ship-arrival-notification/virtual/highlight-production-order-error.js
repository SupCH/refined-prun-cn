import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './highlight-production-order-error.module.css.js';
function init() {
  applyCssRule(
    'PROD',
    `.${C.OrderSlot.container}:has(.${C.OrderStatus.error})`,
    $style.inputMissingContainer,
  );
  applyCssRule('PRODQ', `tr:has(.${C.OrderStatus.error})`, $style.orderRow);
  applyCssRule(
    'PRODCO',
    `.${C.InputsOutputsView.input}:has(.${C.InputsOutputsView.amountMissing})`,
    $style.inputMissingContainer,
  );
}
features.add(
  import.meta.url,
  init,
  'Highlights production orders with errors in PROD, PRODQ, and PRODCO.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LXByb2R1Y3Rpb24tb3JkZXItZXJyb3IuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9oaWdobGlnaHQtcHJvZHVjdGlvbi1vcmRlci1lcnJvci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJHN0eWxlIGZyb20gJy4vaGlnaGxpZ2h0LXByb2R1Y3Rpb24tb3JkZXItZXJyb3IubW9kdWxlLmNzcyc7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGx5Q3NzUnVsZShcbiAgICAnUFJPRCcsXG4gICAgYC4ke0MuT3JkZXJTbG90LmNvbnRhaW5lcn06aGFzKC4ke0MuT3JkZXJTdGF0dXMuZXJyb3J9KWAsXG4gICAgJHN0eWxlLmlucHV0TWlzc2luZ0NvbnRhaW5lcixcbiAgKTtcbiAgYXBwbHlDc3NSdWxlKCdQUk9EUScsIGB0cjpoYXMoLiR7Qy5PcmRlclN0YXR1cy5lcnJvcn0pYCwgJHN0eWxlLm9yZGVyUm93KTtcbiAgYXBwbHlDc3NSdWxlKFxuICAgICdQUk9EQ08nLFxuICAgIGAuJHtDLklucHV0c091dHB1dHNWaWV3LmlucHV0fTpoYXMoLiR7Qy5JbnB1dHNPdXRwdXRzVmlldy5hbW91bnRNaXNzaW5nfSlgLFxuICAgICRzdHlsZS5pbnB1dE1pc3NpbmdDb250YWluZXIsXG4gICk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnSGlnaGxpZ2h0cyBwcm9kdWN0aW9uIG9yZGVycyB3aXRoIGVycm9ycyBpbiBQUk9ELCBQUk9EUSwgYW5kIFBST0RDTy4nLFxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsU0FBQSxPQUFBO0FBQ0U7QUFBQSxJQUFBO0FBQUEsSUFDRSxJQUFBLEVBQUEsVUFBQSxTQUFBLFNBQUEsRUFBQSxZQUFBLEtBQUE7QUFBQSxJQUNxRCxPQUFBO0FBQUEsRUFDOUM7QUFFVCxlQUFBLFNBQUEsV0FBQSxFQUFBLFlBQUEsS0FBQSxLQUFBLE9BQUEsUUFBQTtBQUNBO0FBQUEsSUFBQTtBQUFBLElBQ0UsSUFBQSxFQUFBLGtCQUFBLEtBQUEsU0FBQSxFQUFBLGtCQUFBLGFBQUE7QUFBQSxJQUN1RSxPQUFBO0FBQUEsRUFDaEU7QUFFWDtBQUVBLFNBQUE7QUFBQSxFQUFTLFlBQUE7QUFBQSxFQUNLO0FBQUEsRUFDWjtBQUVGOyJ9
