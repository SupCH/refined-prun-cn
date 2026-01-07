import xit from './xit-registry.js';
import BURN from './BURN.vue.js';
import { sitesStore } from './sites.js';
import { getEntityNameFromAddress } from './addresses.js';
xit.add({
  command: 'BURN',
  name: parameters => {
    if (parameters[0] && !parameters[1]) {
      const site = sitesStore.getByPlanetNaturalIdOrName(parameters[0]);
      if (site) {
        const name = getEntityNameFromAddress(site.address);
        return `ENHANCED BURN - ${name}`;
      }
    }
    return 'ENHANCED BURN';
  },
  description: 'Shows the number of days of consumables left.',
  optionalParameters: 'Planet Identifier(s), OVERALL, NOT',
  component: () => BURN,
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQlVSTi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9CVVJOL0JVUk4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJVUk4gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQlVSTi9CVVJOLnZ1ZSc7XG5pbXBvcnQgeyBzaXRlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NpdGVzJztcbmltcG9ydCB7IGdldEVudGl0eU5hbWVGcm9tQWRkcmVzcyB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9hZGRyZXNzZXMnO1xuXG54aXQuYWRkKHtcbiAgY29tbWFuZDogJ0JVUk4nLFxuICBuYW1lOiBwYXJhbWV0ZXJzID0+IHtcbiAgICBpZiAocGFyYW1ldGVyc1swXSAmJiAhcGFyYW1ldGVyc1sxXSkge1xuICAgICAgY29uc3Qgc2l0ZSA9IHNpdGVzU3RvcmUuZ2V0QnlQbGFuZXROYXR1cmFsSWRPck5hbWUocGFyYW1ldGVyc1swXSk7XG4gICAgICBpZiAoc2l0ZSkge1xuICAgICAgICBjb25zdCBuYW1lID0gZ2V0RW50aXR5TmFtZUZyb21BZGRyZXNzKHNpdGUuYWRkcmVzcyk7XG4gICAgICAgIHJldHVybiBgRU5IQU5DRUQgQlVSTiAtICR7bmFtZX1gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAnRU5IQU5DRUQgQlVSTic7XG4gIH0sXG4gIGRlc2NyaXB0aW9uOiAnU2hvd3MgdGhlIG51bWJlciBvZiBkYXlzIG9mIGNvbnN1bWFibGVzIGxlZnQuJyxcbiAgb3B0aW9uYWxQYXJhbWV0ZXJzOiAnUGxhbmV0IElkZW50aWZpZXIocyksIE9WRVJBTEwsIE5PVCcsXG4gIGNvbXBvbmVudDogKCkgPT4gQlVSTixcbn0pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxJQUFBLElBQUE7QUFBQSxFQUFRLFNBQUE7QUFBQSxFQUNHLE1BQUEsQ0FBQSxlQUFBO0FBRVAsUUFBQSxXQUFBLENBQUEsS0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBO0FBQ0UsWUFBQSxPQUFBLFdBQUEsMkJBQUEsV0FBQSxDQUFBLENBQUE7QUFDQSxVQUFBLE1BQUE7QUFDRSxjQUFBLE9BQUEseUJBQUEsS0FBQSxPQUFBO0FBQ0EsZUFBQSxtQkFBQSxJQUFBO0FBQUEsTUFBOEI7QUFBQSxJQUNoQztBQUdGLFdBQUE7QUFBQSxFQUFPO0FBQUEsRUFDVCxhQUFBO0FBQUEsRUFDYSxvQkFBQTtBQUFBLEVBQ08sV0FBQSxNQUFBO0FBRXRCLENBQUE7In0=
