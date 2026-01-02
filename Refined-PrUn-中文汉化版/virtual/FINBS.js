import xit from './xit-registry.js';
import FINBS from './FINBS.vue.js';
xit.add({
  command: ['FINBS'],
  name: 'Balance Statement',
  description: 'Balance statement showing your assets and liabilities.',
  contextItems: () => [
    { cmd: 'XIT FIN' },
    { cmd: 'XIT FINPR' },
    { cmd: 'XIT FINCH' },
    { cmd: 'XIT SET FIN' },
  ],
  component: () => FINBS,
});
