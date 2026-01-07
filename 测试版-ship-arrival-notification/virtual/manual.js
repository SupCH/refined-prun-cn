import { act } from './act-registry.js';
import { fixed0 } from './format.js';
import _sfc_main from './Edit.vue7.js';
import { deepToRaw } from './deep-to-raw.js';
act.addMaterialGroup({
  type: 'Manual',
  description: data => {
    const materials = data.materials;
    if (!materials || Object.keys(materials).length == 0) {
      return '--';
    }
    return Object.keys(materials)
      .map(ticker => `${fixed0(materials[ticker])} ${ticker}`)
      .join(', ');
  },
  editComponent: _sfc_main,
  generateMaterialBill: async ({ data, log }) => {
    if (!data.materials || Object.keys(data.materials).length == 0) {
      log.error('Missing materials.');
      return void 0;
    }
    return structuredClone(deepToRaw(data.materials));
  },
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFudWFsLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9tYXRlcmlhbC1ncm91cHMvbWFudWFsL21hbnVhbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhY3QgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0LXJlZ2lzdHJ5JztcbmltcG9ydCB7IGZpeGVkMCB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCBFZGl0IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9tYXRlcmlhbC1ncm91cHMvbWFudWFsL0VkaXQudnVlJztcbmltcG9ydCB7IGRlZXBUb1JhdyB9IGZyb20gJ0BzcmMvdXRpbHMvZGVlcC10by1yYXcnO1xuXG5hY3QuYWRkTWF0ZXJpYWxHcm91cCh7XG4gIHR5cGU6ICdNYW51YWwnLFxuICBkZXNjcmlwdGlvbjogZGF0YSA9PiB7XG4gICAgY29uc3QgbWF0ZXJpYWxzID0gZGF0YS5tYXRlcmlhbHM7XG4gICAgaWYgKCFtYXRlcmlhbHMgfHwgT2JqZWN0LmtleXMobWF0ZXJpYWxzKS5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuICctLSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG1hdGVyaWFscylcbiAgICAgIC5tYXAodGlja2VyID0+IGAke2ZpeGVkMChtYXRlcmlhbHNbdGlja2VyXSl9ICR7dGlja2VyfWApXG4gICAgICAuam9pbignLCAnKTtcbiAgfSxcbiAgZWRpdENvbXBvbmVudDogRWRpdCxcbiAgZ2VuZXJhdGVNYXRlcmlhbEJpbGw6IGFzeW5jICh7IGRhdGEsIGxvZyB9KSA9PiB7XG4gICAgaWYgKCFkYXRhLm1hdGVyaWFscyB8fCBPYmplY3Qua2V5cyhkYXRhLm1hdGVyaWFscykubGVuZ3RoID09IDApIHtcbiAgICAgIGxvZy5lcnJvcignTWlzc2luZyBtYXRlcmlhbHMuJyk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gc3RydWN0dXJlZENsb25lKGRlZXBUb1JhdyhkYXRhLm1hdGVyaWFscykpO1xuICB9LFxufSk7XG4iXSwibmFtZXMiOlsiRWRpdCJdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLElBQUksaUJBQWlCO0FBQUEsRUFDbkIsTUFBTTtBQUFBLEVBQ04sYUFBYSxDQUFBLFNBQVE7QUFDbkIsVUFBTSxZQUFZLEtBQUs7QUFDdkIsUUFBSSxDQUFDLGFBQWEsT0FBTyxLQUFLLFNBQVMsRUFBRSxVQUFVLEdBQUc7QUFDcEQsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLE9BQU8sS0FBSyxTQUFTLEVBQ3pCLElBQUksWUFBVSxHQUFHLE9BQU8sVUFBVSxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sRUFBRSxFQUN0RCxLQUFLLElBQUk7QUFBQSxFQUNkO0FBQUEsRUFDQSxlQUFlQTtBQUFBQSxFQUNmLHNCQUFzQixPQUFPLEVBQUUsTUFBTSxVQUFVO0FBQzdDLFFBQUksQ0FBQyxLQUFLLGFBQWEsT0FBTyxLQUFLLEtBQUssU0FBUyxFQUFFLFVBQVUsR0FBRztBQUM5RCxVQUFJLE1BQU0sb0JBQW9CO0FBQzlCLGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTyxnQkFBZ0IsVUFBVSxLQUFLLFNBQVMsQ0FBQztBQUFBLEVBQ2xEO0FBQ0YsQ0FBQzsifQ==
