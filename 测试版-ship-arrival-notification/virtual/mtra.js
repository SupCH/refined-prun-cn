import { act } from './act-registry.js';
import _sfc_main$1 from './Edit.vue2.js';
import _sfc_main from './Configure.vue.js';
import { MTRA_TRANSFER } from './MTRA_TRANSFER.js';
import { deserializeStorage, atSameLocation } from './utils3.js';
import { configurableValue } from './shared-types.js';
import { t } from './index5.js';
act.addAction({
  type: 'MTRA',
  description: (action, config) => {
    if (!action.group || !action.origin || !action.dest) {
      return '--';
    }
    const origin =
      action.origin == configurableValue
        ? (config?.origin ?? t('act.configuredLocation'))
        : action.origin;
    const dest =
      action.dest == configurableValue
        ? (config?.destination ?? t('act.configuredLocation'))
        : action.dest;
    return t('act.transferGroup', action.group, origin, dest);
  },
  editComponent: _sfc_main$1,
  configureComponent: _sfc_main,
  needsConfigure: data => {
    return data.origin === configurableValue || data.dest === configurableValue;
  },
  isValidConfig: (data, config) => {
    return (
      (data.origin !== configurableValue || config.origin !== void 0) &&
      (data.dest !== configurableValue || config.destination !== void 0)
    );
  },
  generateSteps: async ctx => {
    const { data, config, getMaterialGroup, emitStep } = ctx;
    const assert = ctx.assert;
    const materials = await getMaterialGroup(data.group);
    assert(materials, 'Invalid material group');
    const serializedOrigin = data.origin === configurableValue ? config?.origin : data.origin;
    const origin = deserializeStorage(serializedOrigin);
    assert(origin, 'Invalid origin');
    const serializedDest = data.dest === configurableValue ? config?.destination : data.dest;
    const dest = deserializeStorage(serializedDest);
    assert(dest, 'Invalid destination');
    const isSameLocation = atSameLocation(origin, dest);
    assert(isSameLocation, 'Origin and destination are not at the same location');
    for (const ticker of Object.keys(materials)) {
      emitStep(
        MTRA_TRANSFER({
          from: origin.id,
          to: dest.id,
          ticker,
          amount: materials[ticker],
        }),
      );
    }
  },
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXRyYS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy9tdHJhL210cmEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWN0IH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdC1yZWdpc3RyeSc7XG5pbXBvcnQgRWRpdCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy9tdHJhL0VkaXQudnVlJztcbmltcG9ydCBDb25maWd1cmUgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdGlvbnMvbXRyYS9Db25maWd1cmUudnVlJztcbmltcG9ydCB7IE1UUkFfVFJBTlNGRVIgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9uLXN0ZXBzL01UUkFfVFJBTlNGRVInO1xuaW1wb3J0IHsgYXRTYW1lTG9jYXRpb24sIGRlc2VyaWFsaXplU3RvcmFnZSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9hY3Rpb25zL3V0aWxzJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9hY3Rpb25zL210cmEvY29uZmlnJztcbmltcG9ydCB7IEFzc2VydEZuLCBjb25maWd1cmFibGVWYWx1ZSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgdCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvaTE4bic7XG5cbmFjdC5hZGRBY3Rpb248Q29uZmlnPih7XG4gIHR5cGU6ICdNVFJBJyxcbiAgZGVzY3JpcHRpb246IChhY3Rpb24sIGNvbmZpZykgPT4ge1xuICAgIGlmICghYWN0aW9uLmdyb3VwIHx8ICFhY3Rpb24ub3JpZ2luIHx8ICFhY3Rpb24uZGVzdCkge1xuICAgICAgcmV0dXJuICctLSc7XG4gICAgfVxuXG4gICAgY29uc3Qgb3JpZ2luID1cbiAgICAgIGFjdGlvbi5vcmlnaW4gPT0gY29uZmlndXJhYmxlVmFsdWVcbiAgICAgICAgPyAoY29uZmlnPy5vcmlnaW4gPz8gdCgnYWN0LmNvbmZpZ3VyZWRMb2NhdGlvbicpKVxuICAgICAgICA6IGFjdGlvbi5vcmlnaW47XG4gICAgY29uc3QgZGVzdCA9XG4gICAgICBhY3Rpb24uZGVzdCA9PSBjb25maWd1cmFibGVWYWx1ZVxuICAgICAgICA/IChjb25maWc/LmRlc3RpbmF0aW9uID8/IHQoJ2FjdC5jb25maWd1cmVkTG9jYXRpb24nKSlcbiAgICAgICAgOiBhY3Rpb24uZGVzdDtcbiAgICByZXR1cm4gdCgnYWN0LnRyYW5zZmVyR3JvdXAnLCBhY3Rpb24uZ3JvdXAsIG9yaWdpbiwgZGVzdCk7XG4gIH0sXG4gIGVkaXRDb21wb25lbnQ6IEVkaXQsXG4gIGNvbmZpZ3VyZUNvbXBvbmVudDogQ29uZmlndXJlLFxuICBuZWVkc0NvbmZpZ3VyZTogZGF0YSA9PiB7XG4gICAgcmV0dXJuIGRhdGEub3JpZ2luID09PSBjb25maWd1cmFibGVWYWx1ZSB8fCBkYXRhLmRlc3QgPT09IGNvbmZpZ3VyYWJsZVZhbHVlO1xuICB9LFxuICBpc1ZhbGlkQ29uZmlnOiAoZGF0YSwgY29uZmlnKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIChkYXRhLm9yaWdpbiAhPT0gY29uZmlndXJhYmxlVmFsdWUgfHwgY29uZmlnLm9yaWdpbiAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgKGRhdGEuZGVzdCAhPT0gY29uZmlndXJhYmxlVmFsdWUgfHwgY29uZmlnLmRlc3RpbmF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgKTtcbiAgfSxcbiAgZ2VuZXJhdGVTdGVwczogYXN5bmMgY3R4ID0+IHtcbiAgICBjb25zdCB7IGRhdGEsIGNvbmZpZywgZ2V0TWF0ZXJpYWxHcm91cCwgZW1pdFN0ZXAgfSA9IGN0eDtcbiAgICBjb25zdCBhc3NlcnQ6IEFzc2VydEZuID0gY3R4LmFzc2VydDtcblxuICAgIGNvbnN0IG1hdGVyaWFscyA9IGF3YWl0IGdldE1hdGVyaWFsR3JvdXAoZGF0YS5ncm91cCk7XG4gICAgYXNzZXJ0KG1hdGVyaWFscywgJ0ludmFsaWQgbWF0ZXJpYWwgZ3JvdXAnKTtcblxuICAgIGNvbnN0IHNlcmlhbGl6ZWRPcmlnaW4gPSBkYXRhLm9yaWdpbiA9PT0gY29uZmlndXJhYmxlVmFsdWUgPyBjb25maWc/Lm9yaWdpbiA6IGRhdGEub3JpZ2luO1xuICAgIGNvbnN0IG9yaWdpbiA9IGRlc2VyaWFsaXplU3RvcmFnZShzZXJpYWxpemVkT3JpZ2luKTtcbiAgICBhc3NlcnQob3JpZ2luLCAnSW52YWxpZCBvcmlnaW4nKTtcblxuICAgIGNvbnN0IHNlcmlhbGl6ZWREZXN0ID0gZGF0YS5kZXN0ID09PSBjb25maWd1cmFibGVWYWx1ZSA/IGNvbmZpZz8uZGVzdGluYXRpb24gOiBkYXRhLmRlc3Q7XG4gICAgY29uc3QgZGVzdCA9IGRlc2VyaWFsaXplU3RvcmFnZShzZXJpYWxpemVkRGVzdCk7XG4gICAgYXNzZXJ0KGRlc3QsICdJbnZhbGlkIGRlc3RpbmF0aW9uJyk7XG5cbiAgICBjb25zdCBpc1NhbWVMb2NhdGlvbiA9IGF0U2FtZUxvY2F0aW9uKG9yaWdpbiwgZGVzdCk7XG4gICAgYXNzZXJ0KGlzU2FtZUxvY2F0aW9uLCAnT3JpZ2luIGFuZCBkZXN0aW5hdGlvbiBhcmUgbm90IGF0IHRoZSBzYW1lIGxvY2F0aW9uJyk7XG5cbiAgICBmb3IgKGNvbnN0IHRpY2tlciBvZiBPYmplY3Qua2V5cyhtYXRlcmlhbHMpKSB7XG4gICAgICBlbWl0U3RlcChcbiAgICAgICAgTVRSQV9UUkFOU0ZFUih7XG4gICAgICAgICAgZnJvbTogb3JpZ2luLmlkLFxuICAgICAgICAgIHRvOiBkZXN0LmlkLFxuICAgICAgICAgIHRpY2tlcixcbiAgICAgICAgICBhbW91bnQ6IG1hdGVyaWFsc1t0aWNrZXJdLFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9LFxufSk7XG4iXSwibmFtZXMiOlsiRWRpdCIsIkNvbmZpZ3VyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVNBLElBQUksVUFBa0I7QUFBQSxFQUNwQixNQUFNO0FBQUEsRUFDTixhQUFhLENBQUMsUUFBUSxXQUFXO0FBQy9CLFFBQUksQ0FBQyxPQUFPLFNBQVMsQ0FBQyxPQUFPLFVBQVUsQ0FBQyxPQUFPLE1BQU07QUFDbkQsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLFNBQ0osT0FBTyxVQUFVLG9CQUNaLFFBQVEsVUFBVSxFQUFFLHdCQUF3QixJQUM3QyxPQUFPO0FBQ2IsVUFBTSxPQUNKLE9BQU8sUUFBUSxvQkFDVixRQUFRLGVBQWUsRUFBRSx3QkFBd0IsSUFDbEQsT0FBTztBQUNiLFdBQU8sRUFBRSxxQkFBcUIsT0FBTyxPQUFPLFFBQVEsSUFBSTtBQUFBLEVBQzFEO0FBQUEsRUFDQSxlQUFlQTtBQUFBQSxFQUNmLG9CQUFvQkM7QUFBQUEsRUFDcEIsZ0JBQWdCLENBQUEsU0FBUTtBQUN0QixXQUFPLEtBQUssV0FBVyxxQkFBcUIsS0FBSyxTQUFTO0FBQUEsRUFDNUQ7QUFBQSxFQUNBLGVBQWUsQ0FBQyxNQUFNLFdBQVc7QUFDL0IsWUFDRyxLQUFLLFdBQVcscUJBQXFCLE9BQU8sV0FBVyxZQUN2RCxLQUFLLFNBQVMscUJBQXFCLE9BQU8sZ0JBQWdCO0FBQUEsRUFFL0Q7QUFBQSxFQUNBLGVBQWUsT0FBTSxRQUFPO0FBQzFCLFVBQU0sRUFBRSxNQUFNLFFBQVEsa0JBQWtCLGFBQWE7QUFDckQsVUFBTSxTQUFtQixJQUFJO0FBRTdCLFVBQU0sWUFBWSxNQUFNLGlCQUFpQixLQUFLLEtBQUs7QUFDbkQsV0FBTyxXQUFXLHdCQUF3QjtBQUUxQyxVQUFNLG1CQUFtQixLQUFLLFdBQVcsb0JBQW9CLFFBQVEsU0FBUyxLQUFLO0FBQ25GLFVBQU0sU0FBUyxtQkFBbUIsZ0JBQWdCO0FBQ2xELFdBQU8sUUFBUSxnQkFBZ0I7QUFFL0IsVUFBTSxpQkFBaUIsS0FBSyxTQUFTLG9CQUFvQixRQUFRLGNBQWMsS0FBSztBQUNwRixVQUFNLE9BQU8sbUJBQW1CLGNBQWM7QUFDOUMsV0FBTyxNQUFNLHFCQUFxQjtBQUVsQyxVQUFNLGlCQUFpQixlQUFlLFFBQVEsSUFBSTtBQUNsRCxXQUFPLGdCQUFnQixxREFBcUQ7QUFFNUUsZUFBVyxVQUFVLE9BQU8sS0FBSyxTQUFTLEdBQUc7QUFDM0M7QUFBQSxRQUNFLGNBQWM7QUFBQSxVQUNaLE1BQU0sT0FBTztBQUFBLFVBQ2IsSUFBSSxLQUFLO0FBQUEsVUFDVDtBQUFBLFVBQ0EsUUFBUSxVQUFVLE1BQU07QUFBQSxRQUFBLENBQ3pCO0FBQUEsTUFBQTtBQUFBLElBRUw7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsifQ==
