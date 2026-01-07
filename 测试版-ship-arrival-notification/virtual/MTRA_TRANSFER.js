import { $, _$$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { act } from './act-registry.js';
import { serializeStorage } from './utils3.js';
import { fixed0 } from './format.js';
import { focusElement, changeInputValue, clickElement } from './util.js';
import { materialsStore } from './materials.js';
import { watchWhile } from './watch.js';
import { storagesStore } from './storage.js';
import { t } from './index5.js';
import { computed } from './runtime-core.esm-bundler.js';
const MTRA_TRANSFER = act.addActionStep({
  type: 'MTRA_TRANSFER',
  preProcessData: data => ({ ...data, ticker: data.ticker.toUpperCase() }),
  description: data => {
    const from = storagesStore.getById(data.from);
    const to = storagesStore.getById(data.to);
    const fromName = from ? serializeStorage(from) : t('act.notFound');
    const toName = to ? serializeStorage(to) : t('act.notFound');
    return t('act.transferDescription', fixed0(data.amount), data.ticker, fromName, toName);
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
      log.warning(t('act.notPresentInOrigin', ticker));
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
    const timeout = ms =>
      new Promise((_, reject) => setTimeout(() => reject(new Error(t('act.timeoutRetry'))), ms));
    const container = await Promise.race([
      $(tile.anchor, C.MaterialSelector.container),
      timeout(1e4),
    ]);
    const input = await Promise.race([$(container, 'input'), timeout(5e3)]);
    const suggestionsContainer = await Promise.race([
      $(container, C.MaterialSelector.suggestionsContainer),
      timeout(5e3),
    ]);
    focusElement(input);
    changeInputValue(input, ticker);
    const suggestionsList = await Promise.race([
      $(container, C.MaterialSelector.suggestionsList),
      timeout(5e3),
    ]);
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
    const storageUpdatePromise = watchWhile(() => destinationAmount.value === currentAmount);
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 5e3));
    await Promise.race([storageUpdatePromise, timeoutPromise]);
    complete();
  },
});
export { MTRA_TRANSFER };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTVRSQV9UUkFOU0ZFUi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9uLXN0ZXBzL01UUkFfVFJBTlNGRVIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWN0IH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBzZXJpYWxpemVTdG9yYWdlIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdGlvbnMvdXRpbHMnO1xuaW1wb3J0IHsgZml4ZWQwIH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuaW1wb3J0IHsgY2hhbmdlSW5wdXRWYWx1ZSwgY2xpY2tFbGVtZW50LCBmb2N1c0VsZW1lbnQgfSBmcm9tICdAc3JjL3V0aWwnO1xuaW1wb3J0IHsgbWF0ZXJpYWxzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvbWF0ZXJpYWxzJztcbmltcG9ydCB7IHdhdGNoV2hpbGUgfSBmcm9tICdAc3JjL3V0aWxzL3dhdGNoJztcbmltcG9ydCB7IHN0b3JhZ2VzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc3RvcmFnZSc7XG5pbXBvcnQgeyBBc3NlcnRGbiB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgdCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvaTE4bic7XG5cbmludGVyZmFjZSBEYXRhIHtcbiAgZnJvbTogc3RyaW5nO1xuICB0bzogc3RyaW5nO1xuICB0aWNrZXI6IHN0cmluZztcbiAgYW1vdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBNVFJBX1RSQU5TRkVSID0gYWN0LmFkZEFjdGlvblN0ZXA8RGF0YT4oe1xuICB0eXBlOiAnTVRSQV9UUkFOU0ZFUicsXG4gIHByZVByb2Nlc3NEYXRhOiBkYXRhID0+ICh7IC4uLmRhdGEsIHRpY2tlcjogZGF0YS50aWNrZXIudG9VcHBlckNhc2UoKSB9KSxcbiAgZGVzY3JpcHRpb246IGRhdGEgPT4ge1xuICAgIGNvbnN0IGZyb20gPSBzdG9yYWdlc1N0b3JlLmdldEJ5SWQoZGF0YS5mcm9tKTtcbiAgICBjb25zdCB0byA9IHN0b3JhZ2VzU3RvcmUuZ2V0QnlJZChkYXRhLnRvKTtcbiAgICBjb25zdCBmcm9tTmFtZSA9IGZyb20gPyBzZXJpYWxpemVTdG9yYWdlKGZyb20pIDogdCgnYWN0Lm5vdEZvdW5kJyk7XG4gICAgY29uc3QgdG9OYW1lID0gdG8gPyBzZXJpYWxpemVTdG9yYWdlKHRvKSA6IHQoJ2FjdC5ub3RGb3VuZCcpO1xuICAgIHJldHVybiB0KCdhY3QudHJhbnNmZXJEZXNjcmlwdGlvbicsIGZpeGVkMChkYXRhLmFtb3VudCksIGRhdGEudGlja2VyLCBmcm9tTmFtZSwgdG9OYW1lKTtcbiAgfSxcbiAgZXhlY3V0ZTogYXN5bmMgY3R4ID0+IHtcbiAgICBjb25zdCB7IGRhdGEsIGxvZywgc2V0U3RhdHVzLCByZXF1ZXN0VGlsZSwgd2FpdEFjdCwgd2FpdEFjdGlvbkZlZWRiYWNrLCBjb21wbGV0ZSwgc2tpcCwgZmFpbCB9ID1cbiAgICAgIGN0eDtcbiAgICBjb25zdCBhc3NlcnQ6IEFzc2VydEZuID0gY3R4LmFzc2VydDtcbiAgICBjb25zdCB7IHRpY2tlciwgYW1vdW50IH0gPSBkYXRhO1xuICAgIGNvbnN0IGZyb20gPSBzdG9yYWdlc1N0b3JlLmdldEJ5SWQoZGF0YS5mcm9tKTtcbiAgICBhc3NlcnQoZnJvbSwgJ09yaWdpbiBpbnZlbnRvcnkgbm90IGZvdW5kJyk7XG4gICAgY29uc3QgdG8gPSBzdG9yYWdlc1N0b3JlLmdldEJ5SWQoZGF0YS50byk7XG4gICAgYXNzZXJ0KHRvLCAnRGVzdGluYXRpb24gaW52ZW50b3J5IG5vdCBmb3VuZCcpO1xuXG4gICAgaWYgKCFmcm9tLml0ZW1zLmZpbmQoeCA9PiB4LnF1YW50aXR5Py5tYXRlcmlhbC50aWNrZXIgPT09IHRpY2tlcikpIHtcbiAgICAgIGxvZy53YXJuaW5nKHQoJ2FjdC5ub3RQcmVzZW50SW5PcmlnaW4nLCB0aWNrZXIpKTtcbiAgICAgIHNraXAoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoYW1vdW50IDw9IDApIHtcbiAgICAgIGxvZy53YXJuaW5nKGBObyAke3RpY2tlcn0gd2FzIHRyYW5zZmVycmVkICh0YXJnZXQgYW1vdW50IGlzIDApYCk7XG4gICAgICBza2lwKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBtYXRlcmlhbHNTdG9yZS5nZXRCeVRpY2tlcih0aWNrZXIpO1xuICAgIGFzc2VydChtYXRlcmlhbCwgYFVua25vd24gbWF0ZXJpYWwgJHt0aWNrZXJ9YCk7XG5cbiAgICAvLyBDaGVjayBpZiB3ZSBjYW4gZml0IGEgc2luZ2xlIHVuaXQuIE1UUkEgd2lsbCBiZSB1bnVzYWJsZSBvdGhlcndpc2UuXG4gICAgY29uc3QgZXBzaWxvbiA9IDAuMDAwMDAxO1xuICAgIGNvbnN0IGNhbkZpdFdlaWdodCA9IHRvLndlaWdodENhcGFjaXR5IC0gdG8ud2VpZ2h0TG9hZCAtIG1hdGVyaWFsLndlaWdodCArIGVwc2lsb24gPj0gMDtcbiAgICBjb25zdCBjYW5GaXRWb2x1bWUgPSB0by52b2x1bWVDYXBhY2l0eSAtIHRvLnZvbHVtZUxvYWQgLSBtYXRlcmlhbC52b2x1bWUgKyBlcHNpbG9uID49IDA7XG4gICAgaWYgKCFjYW5GaXRXZWlnaHQgfHwgIWNhbkZpdFZvbHVtZSkge1xuICAgICAgbG9nLndhcm5pbmcoYE5vICR7dGlja2VyfSB3YXMgdHJhbnNmZXJyZWQgKG5vIHNwYWNlKWApO1xuICAgICAgc2tpcCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRpbGUgPSBhd2FpdCByZXF1ZXN0VGlsZShcbiAgICAgIGBNVFJBIGZyb20tJHtmcm9tLmlkLnN1YnN0cmluZygwLCA4KX0gdG8tJHt0by5pZC5zdWJzdHJpbmcoMCwgOCl9YCxcbiAgICApO1xuICAgIGlmICghdGlsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFN0YXR1cygnU2V0dGluZyB1cCBNVFJBIGJ1ZmZlci4uLicpO1xuICAgIGNvbnN0IHRpbWVvdXQgPSAobXM6IG51bWJlcikgPT5cbiAgICAgIG5ldyBQcm9taXNlPGFueT4oKF8sIHJlamVjdCkgPT5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiByZWplY3QobmV3IEVycm9yKHQoJ2FjdC50aW1lb3V0UmV0cnknKSkpLCBtcyksXG4gICAgICApO1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtcbiAgICAgICQodGlsZS5hbmNob3IsIEMuTWF0ZXJpYWxTZWxlY3Rvci5jb250YWluZXIpLFxuICAgICAgdGltZW91dCgxMDAwMCksXG4gICAgXSk7XG4gICAgY29uc3QgaW5wdXQgPSBhd2FpdCBQcm9taXNlLnJhY2UoWyQoY29udGFpbmVyLCAnaW5wdXQnKSwgdGltZW91dCg1MDAwKV0pO1xuXG4gICAgY29uc3Qgc3VnZ2VzdGlvbnNDb250YWluZXIgPSBhd2FpdCBQcm9taXNlLnJhY2UoW1xuICAgICAgJChjb250YWluZXIsIEMuTWF0ZXJpYWxTZWxlY3Rvci5zdWdnZXN0aW9uc0NvbnRhaW5lciksXG4gICAgICB0aW1lb3V0KDUwMDApLFxuICAgIF0pO1xuICAgIGZvY3VzRWxlbWVudChpbnB1dCk7XG4gICAgY2hhbmdlSW5wdXRWYWx1ZShpbnB1dCwgdGlja2VyKTtcblxuICAgIGNvbnN0IHN1Z2dlc3Rpb25zTGlzdCA9IGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAkKGNvbnRhaW5lciwgQy5NYXRlcmlhbFNlbGVjdG9yLnN1Z2dlc3Rpb25zTGlzdCksXG4gICAgICB0aW1lb3V0KDUwMDApLFxuICAgIF0pO1xuICAgIHN1Z2dlc3Rpb25zQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgY29uc3QgbWF0Y2ggPSBfJCQoc3VnZ2VzdGlvbnNMaXN0LCBDLk1hdGVyaWFsU2VsZWN0b3Iuc3VnZ2VzdGlvbkVudHJ5KS5maW5kKFxuICAgICAgeCA9PiBfJCh4LCBDLkNvbG9yZWRJY29uLmxhYmVsKT8udGV4dENvbnRlbnQgPT09IHRpY2tlcixcbiAgICApO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgc3VnZ2VzdGlvbnNDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgZmFpbChgVGlja2VyICR7dGlja2VyfSBub3QgZm91bmQgaW4gdGhlIG1hdGVyaWFsIHNlbGVjdG9yYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgY2xpY2tFbGVtZW50KG1hdGNoKTtcbiAgICBzdWdnZXN0aW9uc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cbiAgICBjb25zdCBzbGlkZXJOdW1iZXJzID0gXyQkKHRpbGUuYW5jaG9yLCAncmMtc2xpZGVyLW1hcmstdGV4dCcpLm1hcCh4ID0+XG4gICAgICBOdW1iZXIoeC50ZXh0Q29udGVudCA/PyAwKSxcbiAgICApO1xuICAgIGNvbnN0IG1heEFtb3VudCA9IE1hdGgubWF4KC4uLnNsaWRlck51bWJlcnMpO1xuICAgIGNvbnN0IGFsbElucHV0cyA9IF8kJCh0aWxlLmFuY2hvciwgJ2lucHV0Jyk7XG4gICAgY29uc3QgYW1vdW50SW5wdXQgPSBhbGxJbnB1dHNbMV07XG4gICAgYXNzZXJ0KGFtb3VudElucHV0ICE9PSB1bmRlZmluZWQsICdBbW91bnQgaW5wdXQgbm90IGZvdW5kJyk7XG4gICAgaWYgKGFtb3VudCA+IG1heEFtb3VudCkge1xuICAgICAgY29uc3QgbGVmdG92ZXIgPSBhbW91bnQgLSBtYXhBbW91bnQ7XG4gICAgICBsb2cud2FybmluZyhcbiAgICAgICAgYCR7Zml4ZWQwKGxlZnRvdmVyKX0gJHt0aWNrZXJ9IG5vdCB0cmFuc2ZlcnJlZCBgICtcbiAgICAgICAgICBgKCR7Zml4ZWQwKG1heEFtb3VudCl9IG9mICR7Zml4ZWQwKGFtb3VudCl9IHRyYW5zZmVycmVkKWAsXG4gICAgICApO1xuICAgICAgaWYgKG1heEFtb3VudCA9PT0gMCkge1xuICAgICAgICBza2lwKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgY2hhbmdlSW5wdXRWYWx1ZShhbW91bnRJbnB1dCwgTWF0aC5taW4oYW1vdW50LCBtYXhBbW91bnQpLnRvU3RyaW5nKCkpO1xuXG4gICAgY29uc3QgdHJhbnNmZXJCdXR0b24gPSBhd2FpdCAkKHRpbGUuYW5jaG9yLCBDLkJ1dHRvbi5idG4pO1xuXG4gICAgYXdhaXQgd2FpdEFjdCgpO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uQW1vdW50ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgc3RvcmUgPSBzdG9yYWdlc1N0b3JlLmdldEJ5SWQoZGF0YS50byk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBzdG9yZT8uaXRlbXNcbiAgICAgICAgICAubWFwKHggPT4geC5xdWFudGl0eSA/PyB1bmRlZmluZWQpXG4gICAgICAgICAgLmZpbHRlcih4ID0+IHggIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAuZmluZCh4ID0+IHgubWF0ZXJpYWwudGlja2VyID09PSB0aWNrZXIpPy5hbW91bnQgPz8gMFxuICAgICAgKTtcbiAgICB9KTtcbiAgICBjb25zdCBjdXJyZW50QW1vdW50ID0gZGVzdGluYXRpb25BbW91bnQudmFsdWU7XG4gICAgYXdhaXQgY2xpY2tFbGVtZW50KHRyYW5zZmVyQnV0dG9uKTtcbiAgICBhd2FpdCB3YWl0QWN0aW9uRmVlZGJhY2sodGlsZSk7XG4gICAgc2V0U3RhdHVzKCdXYWl0aW5nIGZvciBzdG9yYWdlIHVwZGF0ZS4uLicpO1xuICAgIC8vIFdhaXQgZm9yIHN0b3JhZ2UgdXBkYXRlIHdpdGggYSA1IHNlY29uZCB0aW1lb3V0IHRvIHByZXZlbnQgaGFuZ2luZ1xuICAgIGNvbnN0IHN0b3JhZ2VVcGRhdGVQcm9taXNlID0gd2F0Y2hXaGlsZSgoKSA9PiBkZXN0aW5hdGlvbkFtb3VudC52YWx1ZSA9PT0gY3VycmVudEFtb3VudCk7XG4gICAgY29uc3QgdGltZW91dFByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNTAwMCkpO1xuICAgIGF3YWl0IFByb21pc2UucmFjZShbc3RvcmFnZVVwZGF0ZVByb21pc2UsIHRpbWVvdXRQcm9taXNlXSk7XG5cbiAgICBjb21wbGV0ZSgpO1xuICB9LFxufSk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFpQk8sTUFBQSxnQkFBQSxJQUFBLGNBQUE7QUFBQSxFQUE4QyxNQUFBO0FBQUEsRUFDN0MsZ0JBQUEsQ0FBQSxVQUFBLEVBQUEsR0FBQSxNQUFBLFFBQUEsS0FBQSxPQUFBLFlBQUE7RUFDZ0UsYUFBQSxDQUFBLFNBQUE7QUFFcEUsVUFBQSxPQUFBLGNBQUEsUUFBQSxLQUFBLElBQUE7QUFDQSxVQUFBLEtBQUEsY0FBQSxRQUFBLEtBQUEsRUFBQTtBQUNBLFVBQUEsV0FBQSxPQUFBLGlCQUFBLElBQUEsSUFBQSxFQUFBLGNBQUE7QUFDQSxVQUFBLFNBQUEsS0FBQSxpQkFBQSxFQUFBLElBQUEsRUFBQSxjQUFBO0FBQ0EsV0FBQSxFQUFBLDJCQUFBLE9BQUEsS0FBQSxNQUFBLEdBQUEsS0FBQSxRQUFBLFVBQUEsTUFBQTtBQUFBLEVBQXNGO0FBQUEsRUFDeEYsU0FBQSxPQUFBLFFBQUE7QUFFRSxVQUFBLEVBQUEsTUFBQSxLQUFBLFdBQUEsYUFBQSxTQUFBLG9CQUFBLFVBQUEsTUFBQSxLQUFBLElBQUE7QUFFQSxVQUFBLFNBQUEsSUFBQTtBQUNBLFVBQUEsRUFBQSxRQUFBLE9BQUEsSUFBQTtBQUNBLFVBQUEsT0FBQSxjQUFBLFFBQUEsS0FBQSxJQUFBO0FBQ0EsV0FBQSxNQUFBLDRCQUFBO0FBQ0EsVUFBQSxLQUFBLGNBQUEsUUFBQSxLQUFBLEVBQUE7QUFDQSxXQUFBLElBQUEsaUNBQUE7QUFFQSxRQUFBLENBQUEsS0FBQSxNQUFBLEtBQUEsQ0FB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
