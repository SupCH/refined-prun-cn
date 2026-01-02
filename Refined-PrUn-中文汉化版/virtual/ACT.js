import xit from './xit-registry.js';
import './cx-buy.js';
import './mtra.js';
import './refuel.js';
import './repair.js';
import './resupply.js';
import './manual.js';
import _sfc_main from './ACT.vue.js';
xit.add({
  command: ['ACT', 'ACTION'],
  name: parameters => {
    if (parameters.length === 0) {
      return 'ACTION PACKAGES';
    }
    if (parameters[0].toUpperCase() == 'GEN' || parameters[0].toUpperCase() == 'EDIT') {
      return 'EDIT ACTION PACKAGE';
    }
    return 'EXECUTE ACTION PACKAGE';
  },
  description: 'Allows to automate certain tasks.',
  optionalParameters: 'GEN and/or Action Name',
  contextItems: parameters => (parameters.length > 0 ? [{ cmd: 'XIT ACT' }] : []),
  component: () => _sfc_main,
});
