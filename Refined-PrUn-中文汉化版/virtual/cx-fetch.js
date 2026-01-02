import { act } from './act-registry.js';
import { t } from './index5.js';
import { showBuffer } from './buffers.js';
import { sleep } from './sleep.js';
import _sfc_main from './Edit.vue4.js';
const CX_FETCH_STEP = act.addActionStep({
  type: 'CX_FETCH_STEP',
  description: data => t('act.fetchPriceStep', data.exchange, (data.tickers || []).join(', ')),
  execute: async ctx => {
    const { data, complete } = ctx;
    const tickers = data.tickers || [];
    for (const ticker of tickers) {
      showBuffer(`CXPO ${ticker}.${data.exchange}`);
      await sleep(300);
    }
    complete();
  },
});
act.addAction({
  type: 'CX Fetch',
  description: data => t('act.fetchPriceDescription', data.exchange, (data.tickers || []).length),
  editComponent: _sfc_main,
  generateSteps: async ctx => {
    const { emitStep, data } = ctx;
    emitStep(
      CX_FETCH_STEP({
        tickers: data.tickers || [],
        exchange: data.exchange || '',
      }),
    );
  },
});
