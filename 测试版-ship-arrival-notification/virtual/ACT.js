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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUNULmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9BQ1QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2FjdGlvbnMvY3gtYnV5L2N4LWJ1eSc7XG5pbXBvcnQgJy4vYWN0aW9ucy9tdHJhL210cmEnO1xuaW1wb3J0ICcuL2FjdGlvbnMvY3gtYnV5L2N4LWJ1eSc7XG5pbXBvcnQgJy4vYWN0aW9ucy9tdHJhL210cmEnO1xuaW1wb3J0ICcuL2FjdGlvbnMvcmVmdWVsL3JlZnVlbCc7XG5pbXBvcnQgJy4vYWN0aW9ucy9jeC1mZXRjaC9jeC1mZXRjaCc7XG5cbmltcG9ydCAnLi9tYXRlcmlhbC1ncm91cHMvcmVwYWlyL3JlcGFpcic7XG5pbXBvcnQgJy4vbWF0ZXJpYWwtZ3JvdXBzL3Jlc3VwcGx5L3Jlc3VwcGx5JztcbmltcG9ydCAnLi9tYXRlcmlhbC1ncm91cHMvbWFudWFsL21hbnVhbCc7XG5cbmltcG9ydCBBQ1QgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL0FDVC52dWUnO1xuaW1wb3J0IHsgdCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvaTE4bic7XG5cbnhpdC5hZGQoe1xuICBjb21tYW5kOiBbJ0FDVCcsICdBQ1RJT04nXSxcbiAgbmFtZTogcGFyYW1ldGVycyA9PiB7XG4gICAgaWYgKHBhcmFtZXRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdCgnYWN0LnRpdGxlJyk7XG4gICAgfVxuICAgIGlmIChwYXJhbWV0ZXJzWzBdLnRvVXBwZXJDYXNlKCkgPT0gJ0dFTicgfHwgcGFyYW1ldGVyc1swXS50b1VwcGVyQ2FzZSgpID09ICdFRElUJykge1xuICAgICAgcmV0dXJuIHQoJ2FjdC5lZGl0UGFja2FnZScpO1xuICAgIH1cbiAgICByZXR1cm4gdCgnYWN0LmV4ZWN1dGVQYWNrYWdlJyk7XG4gIH0sXG4gIGRlc2NyaXB0aW9uOiAnQWxsb3dzIHRvIGF1dG9tYXRlIGNlcnRhaW4gdGFza3MuJyxcbiAgb3B0aW9uYWxQYXJhbWV0ZXJzOiAnR0VOIGFuZC9vciBBY3Rpb24gTmFtZScsXG4gIGNvbnRleHRJdGVtczogcGFyYW1ldGVycyA9PiAocGFyYW1ldGVycy5sZW5ndGggPiAwID8gW3sgY21kOiAnWElUIEFDVCcgfV0gOiBbXSksXG4gIGNvbXBvbmVudDogKCkgPT4gQUNULFxufSk7XG4iXSwibmFtZXMiOlsiQUNUIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBY0EsSUFBQSxJQUFBO0FBQUEsRUFBUSxTQUFBLENBQUEsT0FBQSxRQUFBO0FBQUEsRUFDbUIsTUFBQSxDQUFBLGVBQUE7QUFFdkIsUUFBQSxXQUFBLFdBQUEsR0FBQTtBQUNFLGFBQUEsRUFBQSxXQUFBO0FBQUEsSUFBb0I7QUFFdEIsUUFBQSxXQUFBLENBQUEsRUFBQSxpQkFBQSxTQUFBLFdBQUEsQ0FBQSxFQUFBLFlBQUEsS0FBQSxRQUFBO0FBQ0UsYUFBQSxFQUFBLGlCQUFBO0FBQUEsSUFBMEI7QUFFNUIsV0FBQSxFQUFBLG9CQUFBO0FBQUEsRUFBNkI7QUFBQSxFQUMvQixhQUFBO0FBQUEsRUFDYSxvQkFBQTtBQUFBLEVBQ08sY0FBQSxDQUFBLGVBQUEsV0FBQSxTQUFBLElBQUEsQ0FBQSxFQUFBLEtBQUEsVUFBQSxDQUFBLElBQUEsQ0FBQTtBQUFBLEVBQ3lELFdBQUEsTUFBQUE7QUFFL0UsQ0FBQTsifQ==
