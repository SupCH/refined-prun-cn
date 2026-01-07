import xit from './xit-registry.js';
import CMDL from './CMDL.vue.js';
xit.add({
  command: 'CMDL',
  name: 'COMMAND LISTS',
  description: 'Provides a customizable list of command links.',
  optionalParameters: 'List Identifier or Name',
  component: () => CMDL,
});
