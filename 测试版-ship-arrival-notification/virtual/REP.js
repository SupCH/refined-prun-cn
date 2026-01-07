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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUkVQLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL1JFUC9SRVAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJFUCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9SRVAvUkVQLnZ1ZSc7XG5pbXBvcnQgeyBnZXRFbnRpdHlOYXR1cmFsSWRGcm9tQWRkcmVzcyB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9hZGRyZXNzZXMnO1xuaW1wb3J0IHsgZ2V0UGFyYW1ldGVyU2l0ZXMgfSBmcm9tICcuL2VudHJpZXMnO1xuXG54aXQuYWRkKHtcbiAgY29tbWFuZDogWydSRVAnLCAnUkVQQUlSJywgJ1JFUEFJUlMnXSxcbiAgbmFtZTogJ1JFUEFJUlMnLFxuICBkZXNjcmlwdGlvbjogJ1Nob3dzIHRoZSBtYXRlcmlhbHMgdG8gcmVwYWlyIGJ1aWxkaW5ncy4nLFxuICBvcHRpb25hbFBhcmFtZXRlcnM6ICdQbGFuZXQgSWRlbnRpZmllcihzKScsXG4gIGNvbnRleHRJdGVtczogcGFyYW1ldGVycyA9PiB7XG4gICAgaWYgKHBhcmFtZXRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gW3sgY21kOiAnQlJBJyB9XTtcbiAgICB9XG4gICAgY29uc3Qgc2l0ZXMgPSBnZXRQYXJhbWV0ZXJTaXRlcyhwYXJhbWV0ZXJzKSA/PyBbXTtcbiAgICByZXR1cm4gc2l0ZXMubWFwKHggPT4gKHsgY21kOiBgQlJBICR7Z2V0RW50aXR5TmF0dXJhbElkRnJvbUFkZHJlc3MoeC5hZGRyZXNzKX1gIH0pKTtcbiAgfSxcbiAgY29tcG9uZW50OiAoKSA9PiBSRVAsXG59KTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsSUFBQSxJQUFBO0FBQUEsRUFBUSxTQUFBLENBQUEsT0FBQSxVQUFBLFNBQUE7QUFBQSxFQUM4QixNQUFBO0FBQUEsRUFDOUIsYUFBQTtBQUFBLEVBQ08sb0JBQUE7QUFBQSxFQUNPLGNBQUEsQ0FBQSxlQUFBO0FBRWxCLFFBQUEsV0FBQSxXQUFBLEdBQUE7QUFDRSxhQUFBLENBQUEsRUFBQSxLQUFBLE9BQUE7QUFBQSxJQUFzQjtBQUV4QixVQUFBLFFBQUEsa0JBQUEsVUFBQSxLQUFBLENBQUE7QUFDQSxXQUFBLE1BQUEsSUFBQSxDQUFBLE9BQUEsRUFBQSxLQUFBLE9BQUEsOEJBQUEsRUFBQSxPQUFBLENBQUEsR0FBQSxFQUFBO0FBQUEsRUFBa0Y7QUFBQSxFQUNwRixXQUFBLE1BQUE7QUFFRixDQUFBOyJ9
