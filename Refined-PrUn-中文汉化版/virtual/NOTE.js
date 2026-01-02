import xit from './xit-registry.js';
import NOTE from './NOTE.vue.js';
xit.add({
  command: ['NOTE', 'NOTES'],
  name: 'NOTE',
  description: 'Note-taking tool.',
  optionalParameters: 'Note Identifier or Name',
  component: () => NOTE,
});
