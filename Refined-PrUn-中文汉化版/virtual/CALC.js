import xit from './xit-registry.js';
import CALC from './CALC.vue.js';
xit.add({
  command: ['CALC', 'CALCULATOR'],
  name: 'CALCULATOR',
  description: 'Provides an in-game calculator.',
  component: () => CALC,
});
