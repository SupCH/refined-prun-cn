import './actions/cx-buy/cx-buy';
import './actions/mtra/mtra';
import './actions/cx-buy/cx-buy';
import './actions/mtra/mtra';
import './actions/refuel/refuel';
import './actions/cx-fetch/cx-fetch';

import './material-groups/repair/repair';
import './material-groups/resupply/resupply';
import './material-groups/manual/manual';

import ACT from '@src/features/XIT/ACT/ACT.vue';
import { t } from '@src/infrastructure/i18n';

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
  component: () => ACT,
});
