import xit from './xit-registry.js';
import REP from './REP.vue.js';
import { getEntityNaturalIdFromAddress } from './addresses.js';
import { getParameterSites } from './entries.js';
xit.add({
  command: ['REP', 'REPAIR', 'REPAIRS'],
  name: 'REPAIRS',
  description: 'Shows the materials to repair buildings.',
  optionalParameters: 'Planet Identifier(s)',
  contextItems: parameters => {
    if (parameters.length === 0) {
      return [{ cmd: 'BRA' }];
    }
    const sites = getParameterSites(parameters) ?? [];
    return sites.map(x => ({ cmd: `BRA ${getEntityNaturalIdFromAddress(x.address)}` }));
  },
  component: () => REP,
});
