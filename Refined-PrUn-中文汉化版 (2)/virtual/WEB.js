import xit from './xit-registry.js';
import './shortcuts.js';
import _sfc_main from './WEB.vue.js';
xit.add({
  command: 'WEB',
  name: 'WEB PAGE',
  description: 'Opens a web page.',
  mandatoryParameters: 'Web page URL',
  component: () => _sfc_main,
});
