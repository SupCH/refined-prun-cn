import xit from './xit-registry.js';
import CHAT from './CHAT.vue.js';
xit.add({
  command: 'CHAT',
  name: 'FIO CHAT',
  description: 'Provides read-only access to a planet chat.',
  mandatoryParameters: 'Planet Identifier',
  component: () => CHAT,
});
