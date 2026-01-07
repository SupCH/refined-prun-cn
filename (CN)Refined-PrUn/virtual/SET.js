import xit from './xit-registry.js';
import _sfc_main$1 from './PMMG.vue.js';
import _sfc_main from './SET.vue.js';
xit.add({
  command: ['SET', 'SETTINGS'],
  name: 'REFINED PRUN SETTINGS',
  description: 'Refined PrUn settings.',
  optionalParameters: 'Settings Tab Identifier',
  component: parameters => {
    switch (parameters[0]?.toUpperCase()) {
      case 'PMMG':
        return _sfc_main$1;
      default:
        return _sfc_main;
    }
  },
});
