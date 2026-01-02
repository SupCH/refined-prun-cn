import { $, _$$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { act } from './act-registry.js';
import { serializeStorage } from './utils3.js';
import { fixed0 } from './format.js';
import { focusElement, changeInputValue, clickElement } from './util.js';
import { materialsStore } from './materials.js';
import { watchWhile } from './watch.js';
import { storagesStore } from './storage.js';
import { computed } from './runtime-core.esm-bundler.js';
const MTRA_TRANSFER = act.addActionStep({
  type: 'MTRA_TRANSFER',
  preProcessData: data => ({ ...data, ticker: data.ticker.toUpperCase() }),
  description: data => {
    const from = storagesStore.getById(data.from);
    const to = storagesStore.getById(data.to);
    const fromName = from ? serializeStorage(from) : 'NOT FOUND';
    const toName = to ? serializeStorage(to) : 'NOT FOUND';
    return `Transfer ${fixed0(data.amount)} ${data.ticker} from ${fromName} to ${toName}`;
  },
  execute: async ctx => {
    const { data, log, setStatus, requestTile, waitAct, waitActionFeedback, complete, skip, fail } =
      ctx;
    const assert = ctx.assert;
    const { ticker, amount } = data;
    const from = storagesStore.getById(data.from);
    assert(from, 'Origin inventory not found');
    const to = storagesStore.getById(data.to);
    assert(to, 'Destination inventory not found');
    if (!from.items.find(x => x.quantity?.material.ticker === ticker)) {
      log.warning(`No ${ticker} was transferred (not present in origin)`);
      skip();
      return;
    }
    if (amount <= 0) {
      log.warning(`No ${ticker} was transferred (target amount is 0)`);
      skip();
      return;
    }
    const material = materialsStore.getByTicker(ticker);
    assert(material, `Unknown material ${ticker}`);
    const epsilon = 1e-6;
    const canFitWeight = to.weightCapacity - to.weightLoad - material.weight + epsilon >= 0;
    const canFitVolume = to.volumeCapacity - to.volumeLoad - material.volume + epsilon >= 0;
    if (!canFitWeight || !canFitVolume) {
      log.warning(`No ${ticker} was transferred (no space)`);
      skip();
      return;
    }
    const tile = await requestTile(
      `MTRA from-${from.id.substring(0, 8)} to-${to.id.substring(0, 8)}`,
    );
    if (!tile) {
      return;
    }
    setStatus('Setting up MTRA buffer...');
    const container = await $(tile.anchor, C.MaterialSelector.container);
    const input = await $(container, 'input');
    const suggestionsContainer = await $(container, C.MaterialSelector.suggestionsContainer);
    focusElement(input);
    changeInputValue(input, ticker);
    const suggestionsList = await $(container, C.MaterialSelector.suggestionsList);
    suggestionsContainer.style.display = 'none';
    const match = _$$(suggestionsList, C.MaterialSelector.suggestionEntry).find(
      x => _$(x, C.ColoredIcon.label)?.textContent === ticker,
    );
    if (!match) {
      suggestionsContainer.style.display = '';
      fail(`Ticker ${ticker} not found in the material selector`);
      return;
    }
    await clickElement(match);
    suggestionsContainer.style.display = '';
    const sliderNumbers = _$$(tile.anchor, 'rc-slider-mark-text').map(x =>
      Number(x.textContent ?? 0),
    );
    const maxAmount = Math.max(...sliderNumbers);
    const allInputs = _$$(tile.anchor, 'input');
    const amountInput = allInputs[1];
    assert(amountInput !== void 0, 'Amount input not found');
    if (amount > maxAmount) {
      const leftover = amount - maxAmount;
      log.warning(
        `${fixed0(leftover)} ${ticker} not transferred (${fixed0(maxAmount)} of ${fixed0(amount)} transferred)`,
      );
      if (maxAmount === 0) {
        skip();
        return;
      }
    }
    changeInputValue(amountInput, Math.min(amount, maxAmount).toString());
    const transferButton = await $(tile.anchor, C.Button.btn);
    await waitAct();
    const destinationAmount = computed(() => {
      const store = storagesStore.getById(data.to);
      return (
        store?.items
          .map(x => x.quantity ?? void 0)
          .filter(x => x !== void 0)
          .find(x => x.material.ticker === ticker)?.amount ?? 0
      );
    });
    const currentAmount = destinationAmount.value;
    await clickElement(transferButton);
    await waitActionFeedback(tile);
    setStatus('Waiting for storage update...');
    await watchWhile(() => destinationAmount.value === currentAmount);
    complete();
  },
});
export { MTRA_TRANSFER };
