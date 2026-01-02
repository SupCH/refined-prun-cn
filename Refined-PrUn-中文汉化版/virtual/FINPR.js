import xit from './xit-registry.js';
import FINPR from './FINPR.vue.js';
xit.add({
  command: ['FINPR'],
  name: 'Profitability Report',
  description: 'Base profitability report.',
  contextItems: () => [
    { cmd: 'XIT FIN' },
    { cmd: 'XIT FINBS' },
    { cmd: 'XIT FINCH' },
    { cmd: 'XIT SET FIN' },
  ],
  component: () => FINPR,
});
