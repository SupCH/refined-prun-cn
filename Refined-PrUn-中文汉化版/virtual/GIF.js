import xit from './xit-registry.js';
import GIF from './GIF.vue.js';
xit.add({
  command: 'GIF',
  name: 'RANDOM GIF',
  description: 'Displays a random gif.',
  optionalParameters: 'Gif Category',
  component: () => GIF,
});
