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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3gtZmV0Y2guanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdGlvbnMvY3gtZmV0Y2gvY3gtZmV0Y2gudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWN0IH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdC1yZWdpc3RyeSc7XG5pbXBvcnQgeyB0IH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9pMThuJztcbmltcG9ydCB7IHNob3dCdWZmZXIgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYnVmZmVycyc7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJ0BzcmMvdXRpbHMvc2xlZXAnO1xuaW1wb3J0IEVkaXQgZnJvbSAnLi9FZGl0LnZ1ZSc7XG5cbmludGVyZmFjZSBEYXRhIHtcbiAgdGlja2Vyczogc3RyaW5nW107XG4gIGV4Y2hhbmdlOiBzdHJpbmc7XG59XG5cbmNvbnN0IENYX0ZFVENIX1NURVAgPSBhY3QuYWRkQWN0aW9uU3RlcDxEYXRhPih7XG4gIHR5cGU6ICdDWF9GRVRDSF9TVEVQJyxcbiAgZGVzY3JpcHRpb246IGRhdGEgPT4gdCgnYWN0LmZldGNoUHJpY2VTdGVwJywgZGF0YS5leGNoYW5nZSwgKGRhdGEudGlja2VycyB8fCBbXSkuam9pbignLCAnKSksXG4gIGV4ZWN1dGU6IGFzeW5jIGN0eCA9PiB7XG4gICAgY29uc3QgeyBkYXRhLCBjb21wbGV0ZSB9ID0gY3R4O1xuICAgIGNvbnN0IHRpY2tlcnMgPSBkYXRhLnRpY2tlcnMgfHwgW107XG4gICAgY29uc3Qgc2Vzc2lvbklkID0gYGN4LWZldGNoLSR7RGF0ZS5ub3coKX1gO1xuICAgIGZvciAoY29uc3QgdGlja2VyIG9mIHRpY2tlcnMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IGF3YWl0IHNob3dCdWZmZXIoYENYUE8gJHt0aWNrZXJ9LiR7ZGF0YS5leGNoYW5nZX1gKTtcbiAgICAgICAgaWYgKHdpbmRvdykge1xuICAgICAgICAgIHdpbmRvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtY3gtZmV0Y2gtc2Vzc2lvbicsIHNlc3Npb25JZCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIG9wZW4gQ1hQTyB3aW5kb3cgZm9yICR7dGlja2VyfWAsIGUpO1xuICAgICAgfVxuICAgICAgYXdhaXQgc2xlZXAoMzAwKTtcbiAgICB9XG4gICAgY29tcGxldGUoKTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgY29uc3QgQ1hfRkVUQ0ggPSBhY3QuYWRkQWN0aW9uPERhdGE+KHtcbiAgdHlwZTogJ0NYIEZldGNoJyxcbiAgZGVzY3JpcHRpb246IGRhdGEgPT4gdCgnYWN0LmZldGNoUHJpY2VEZXNjcmlwdGlvbicsIGRhdGEuZXhjaGFuZ2UsIChkYXRhLnRpY2tlcnMgfHwgW10pLmxlbmd0aCksXG4gIGVkaXRDb21wb25lbnQ6IEVkaXQsXG4gIGdlbmVyYXRlU3RlcHM6IGFzeW5jIGN0eCA9PiB7XG4gICAgY29uc3QgeyBlbWl0U3RlcCwgZGF0YSB9ID0gY3R4O1xuICAgIGVtaXRTdGVwKFxuICAgICAgQ1hfRkVUQ0hfU1RFUCh7XG4gICAgICAgIHRpY2tlcnM6IGRhdGEudGlja2VycyB8fCBbXSxcbiAgICAgICAgZXhjaGFuZ2U6IGRhdGEuZXhjaGFuZ2UgfHwgJycsXG4gICAgICB9KSxcbiAgICApO1xuICB9LFxufSk7XG4iXSwibmFtZXMiOlsiRWRpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFXQSxNQUFNLGdCQUFnQixJQUFJLGNBQW9CO0FBQUEsRUFDNUMsTUFBTTtBQUFBLEVBQ04sYUFBYSxDQUFBLFNBQVEsRUFBRSxzQkFBc0IsS0FBSyxXQUFXLEtBQUssV0FBVyxDQUFBLEdBQUksS0FBSyxJQUFJLENBQUM7QUFBQSxFQUMzRixTQUFTLE9BQU0sUUFBTztBQUNwQixVQUFNLEVBQUUsTUFBTSxTQUFBLElBQWE7QUFDM0IsVUFBTSxVQUFVLEtBQUssV0FBVyxDQUFBO0FBQ2hDLFVBQU0sWUFBWSxZQUFZLEtBQUssSUFBQSxDQUFLO0FBQ3hDLGVBQVcsVUFBVSxTQUFTO0FBQzVCLFVBQUk7QUFDRixjQUFNLFNBQVMsTUFBTSxXQUFXLFFBQVEsTUFBTSxJQUFJLEtBQUssUUFBUSxFQUFFO0FBQ2pFLFlBQUksUUFBUTtBQUNWLGlCQUFPLGFBQWEseUJBQXlCLFNBQVM7QUFBQSxRQUN4RDtBQUFBLE1BQ0YsU0FBUyxHQUFHO0FBQ1YsZ0JBQVEsTUFBTSxrQ0FBa0MsTUFBTSxJQUFJLENBQUM7QUFBQSxNQUM3RDtBQUNBLFlBQU0sTUFBTSxHQUFHO0FBQUEsSUFDakI7QUFDQSxhQUFBO0FBQUEsRUFDRjtBQUNGLENBQUM7QUFFdUIsSUFBSSxVQUFnQjtBQUFBLEVBQzFDLE1BQU07QUFBQSxFQUNOLGFBQWEsQ0FBQSxTQUFRLEVBQUUsNkJBQTZCLEtBQUssV0FBVyxLQUFLLFdBQVcsQ0FBQSxHQUFJLE1BQU07QUFBQSxFQUM5RixlQUFlQTtBQUFBQSxFQUNmLGVBQWUsT0FBTSxRQUFPO0FBQzFCLFVBQU0sRUFBRSxVQUFVLEtBQUEsSUFBUztBQUMzQjtBQUFBLE1BQ0UsY0FBYztBQUFBLFFBQ1osU0FBUyxLQUFLLFdBQVcsQ0FBQTtBQUFBLFFBQ3pCLFVBQVUsS0FBSyxZQUFZO0FBQUEsTUFBQSxDQUM1QjtBQUFBLElBQUE7QUFBQSxFQUVMO0FBQ0YsQ0FBQzsifQ==
