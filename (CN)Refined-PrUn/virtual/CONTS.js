import xit from './xit-registry.js';
import _sfc_main from './CONTS.vue.js';
xit.add({
  command: ['CONTS', 'CONTRACTS'],
  name: 'ACTIVE CONTRACTS',
  description: 'Displays active contracts.',
  contextItems: () => [{ cmd: 'XIT CONTC' }, { cmd: 'CONTS' }, { cmd: 'CONTD' }],
  component: () => _sfc_main,
});
