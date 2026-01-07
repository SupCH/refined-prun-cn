import { act } from '@src/features/XIT/ACT/act-registry';
import { t } from '@src/infrastructure/i18n';
import { showBuffer } from '@src/infrastructure/prun-ui/buffers';
import { sleep } from '@src/utils/sleep';
import Edit from './Edit.vue';

interface Data {
  tickers: string[];
  exchange: string;
}

const CX_FETCH_STEP = act.addActionStep<Data>({
  type: 'CX_FETCH_STEP',
  description: data => t('act.fetchPriceStep', data.exchange, (data.tickers || []).join(', ')),
  execute: async ctx => {
    const { data, complete } = ctx;
    const tickers = data.tickers || [];
    const sessionId = `cx-fetch-${Date.now()}`;
    for (const ticker of tickers) {
      try {
        const window = await showBuffer(`CXPO ${ticker}.${data.exchange}`);
        if (window) {
          window.setAttribute('data-cx-fetch-session', sessionId);
        }
      } catch (e) {
        console.error(`Failed to open CXPO window for ${ticker}`, e);
      }
      await sleep(300);
    }
    complete();
  },
});

export const CX_FETCH = act.addAction<Data>({
  type: 'CX Fetch',
  description: data => t('act.fetchPriceDescription', data.exchange, (data.tickers || []).length),
  editComponent: Edit,
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
