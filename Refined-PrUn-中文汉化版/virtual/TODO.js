import xit from './xit-registry.js';
import TODO from './TODO.vue.js';
xit.add({
  command: ['TODO'],
  name: 'TO-DO LIST',
  description: 'Provides a to-do list for organizing your plans.',
  optionalParameters: 'To-do List Identifier or Name',
  component: () => TODO,
});
