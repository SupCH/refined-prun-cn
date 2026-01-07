import HELP from '@src/features/XIT/HELP.vue';

xit.add({
  command: 'HELP',
  name: 'HELP',
  description: 'Useful information to get started with (zh-cn)refined-prun.',
  optionalParameters: 'ACTION',
  component: () => HELP,
});
