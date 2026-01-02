import xit from './xit-registry.js';
import './cx-buy.js';
import './mtra.js';
import './refuel.js';
import './cx-fetch.js';
import './repair.js';
import './resupply.js';
import './manual.js';
import _sfc_main from './ACT.vue.js';
import { t } from './index5.js';
xit.add({
  command: ['ACT', 'ACTION'],
  name: parameters => {
    if (parameters.length === 0) {
      return t('act.title');
    }
    if (parameters[0].toUpperCase() == 'GEN' || parameters[0].toUpperCase() == 'EDIT') {
      return t('act.editPackage');
    }
    return t('act.executePackage');
  },
  description: 'Allows to automate certain tasks.',
  optionalParameters: 'GEN and/or Action Name',
  contextItems: parameters => (parameters.length > 0 ? [{ cmd: 'XIT ACT' }] : []),
  component: () => _sfc_main,
});
