import xit from './xit-registry.js';
import FINCH from './FINCH.vue.js';
xit.add({
  command: ['FINCH'],
  name: 'Financial Charts',
  description: 'Financial charts for equity and assets.',
  optionalParameters: 'EQUITY, ASSETS, LOCATIONS',
  contextItems: () => [
    { cmd: 'XIT FIN' },
    { cmd: 'XIT FINBS' },
    { cmd: 'XIT FINPR' },
    { cmd: 'XIT SET FIN' },
  ],
  component: () => FINCH,
});
