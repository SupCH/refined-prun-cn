import { diffDays } from './time-diff.js';
import { userData } from './user-data.js';
import { balancesStore } from './balances.js';
import { userDataStore } from './user-data2.js';
import { isPresent } from './is-present.js';
import { computed } from './runtime-core.esm-bundler.js';
const hour12 = computed(() => {
  switch (userData.settings.time) {
    case '24H':
      return false;
    case '12H':
      return true;
    case 'DEFAULT':
      return void 0;
  }
});
const locale = computed(() => {
  let preferredLocale = userDataStore.preferredLocale;
  if (!preferredLocale) {
    return void 0;
  }
  preferredLocale = preferredLocale.replace('_', '-');
  return navigator.language.startsWith(preferredLocale) ? navigator.language : preferredLocale;
});
function dateTimeFormat(options) {
  const format = computed(() => {
    return new Intl.DateTimeFormat(
      locale.value,
      typeof options === 'function' ? options() : options,
    );
  });
  return date => format.value.format(date);
}
function numberFormat(options) {
  const format = computed(() => {
    return new Intl.NumberFormat(locale.value, typeof options === 'function' ? options() : options);
  });
  return value => format.value.format(value);
}
const hhForXitSet = computed(() => {
  return new Intl.DateTimeFormat(locale.value, { hour: '2-digit' }).format;
});
const hhmm = dateTimeFormat(() => ({
  hour: '2-digit',
  minute: '2-digit',
  hour12: hour12.value,
}));
dateTimeFormat(() => ({
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: hour12.value,
}));
const ddmm = dateTimeFormat({
  month: '2-digit',
  day: '2-digit',
});
const ddmmyyyy = dateTimeFormat({
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
});
const fixed0 = numberFormat({
  maximumFractionDigits: 0,
});
const fixed02 = numberFormat({
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
const fixed1 = numberFormat({
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const fixed01 = numberFormat({
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});
const fixed2 = numberFormat({
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const percent0 = numberFormat({
  style: 'percent',
  maximumFractionDigits: 0,
});
const percent1 = numberFormat({
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const percent2 = numberFormat({
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
function formatEta(from, to) {
  let ret = hhmm(to);
  const days = diffDays(from, to);
  if (days > 0) {
    ret += ` +${days}d`;
  }
  return ret;
}
function formatCurrency(currency, format) {
  if (!isPresent(currency)) {
    return '--';
  }
  format ??= fixed0;
  const settings = userData.settings.currency;
  const symbol = getCurrencySymbol(settings);
  const spacing = settings.preset === 'DEFAULT' ? 'HAS_SPACE' : settings.spacing;
  const position = settings.preset === 'DEFAULT' ? 'AFTER' : settings.position;
  if (position === 'AFTER') {
    return spacing === 'HAS_SPACE' ? format(currency) + ' ' + symbol : format(currency) + symbol;
  }
  const sign = currency < 0 ? '-' : '';
  return spacing === 'HAS_SPACE'
    ? sign + symbol + ' ' + format(Math.abs(currency))
    : sign + symbol + format(Math.abs(currency));
}
function getCurrencySymbol(settings) {
  switch (settings.preset) {
    case 'DEFAULT':
      return balancesStore.ownCurrency.value;
    case 'AIC':
      return '₳';
    case 'ICA':
      return 'ǂ';
    case 'CIS':
      return '₡';
    case 'NCC':
      return '₦';
    case 'CUSTOM':
      return settings.custom;
  }
}
export {
  ddmm,
  ddmmyyyy,
  fixed0,
  fixed01,
  fixed02,
  fixed1,
  fixed2,
  formatCurrency,
  formatEta,
  hhForXitSet,
  hhmm,
  percent0,
  percent1,
  percent2,
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZm9ybWF0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRpZmZEYXlzIH0gZnJvbSAnQHNyYy91dGlscy90aW1lLWRpZmYnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YSc7XG5pbXBvcnQgeyBpc1ByZXNlbnQgfSBmcm9tICd0cy1leHRyYXMnO1xuaW1wb3J0IHsgYmFsYW5jZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9iYWxhbmNlcyc7XG5pbXBvcnQgeyB1c2VyRGF0YVN0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3VzZXItZGF0YSc7XG5cbmNvbnN0IGhvdXIxMiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgc3dpdGNoICh1c2VyRGF0YS5zZXR0aW5ncy50aW1lKSB7XG4gICAgY2FzZSAnMjRIJzpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlICcxMkgnOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAnREVGQVVMVCc6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59KTtcblxuY29uc3QgbG9jYWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICBsZXQgcHJlZmVycmVkTG9jYWxlID0gdXNlckRhdGFTdG9yZS5wcmVmZXJyZWRMb2NhbGU7XG4gIGlmICghcHJlZmVycmVkTG9jYWxlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBwcmVmZXJyZWRMb2NhbGUgPSBwcmVmZXJyZWRMb2NhbGUucmVwbGFjZSgnXycsICctJyk7XG4gIHJldHVybiBuYXZpZ2F0b3IubGFuZ3VhZ2Uuc3RhcnRzV2l0aChwcmVmZXJyZWRMb2NhbGUpID8gbmF2aWdhdG9yLmxhbmd1YWdlIDogcHJlZmVycmVkTG9jYWxlO1xufSk7XG5cbmZ1bmN0aW9uIGRhdGVUaW1lRm9ybWF0KG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zIHwgKCgpID0+IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zKSkge1xuICBjb25zdCBmb3JtYXQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFxuICAgICAgbG9jYWxlLnZhbHVlLFxuICAgICAgdHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zKCkgOiBvcHRpb25zLFxuICAgICk7XG4gIH0pO1xuICByZXR1cm4gKGRhdGU/OiBudW1iZXIgfCBEYXRlIHwgdW5kZWZpbmVkKSA9PiBmb3JtYXQudmFsdWUuZm9ybWF0KGRhdGUpO1xufVxuXG5mdW5jdGlvbiBudW1iZXJGb3JtYXQob3B0aW9uczogSW50bC5OdW1iZXJGb3JtYXRPcHRpb25zIHwgKCgpID0+IEludGwuTnVtYmVyRm9ybWF0T3B0aW9ucykpIHtcbiAgY29uc3QgZm9ybWF0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQobG9jYWxlLnZhbHVlLCB0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMoKSA6IG9wdGlvbnMpO1xuICB9KTtcbiAgcmV0dXJuICh2YWx1ZTogbnVtYmVyKSA9PiBmb3JtYXQudmFsdWUuZm9ybWF0KHZhbHVlKTtcbn1cblxuZXhwb3J0IGNvbnN0IGhoRm9yWGl0U2V0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLnZhbHVlLCB7IGhvdXI6ICcyLWRpZ2l0JyB9KS5mb3JtYXQ7XG59KTtcblxuZXhwb3J0IGNvbnN0IGhobW0gPSBkYXRlVGltZUZvcm1hdCgoKSA9PiAoe1xuICBob3VyOiAnMi1kaWdpdCcsXG4gIG1pbnV0ZTogJzItZGlnaXQnLFxuICBob3VyMTI6IGhvdXIxMi52YWx1ZSxcbn0pKTtcblxuZXhwb3J0IGNvbnN0IGhobW1zcyA9IGRhdGVUaW1lRm9ybWF0KCgpID0+ICh7XG4gIGhvdXI6ICcyLWRpZ2l0JyxcbiAgbWludXRlOiAnMi1kaWdpdCcsXG4gIHNlY29uZDogJzItZGlnaXQnLFxuICBob3VyMTI6IGhvdXIxMi52YWx1ZSxcbn0pKTtcblxuZXhwb3J0IGNvbnN0IGRkbW0gPSBkYXRlVGltZUZvcm1hdCh7XG4gIG1vbnRoOiAnMi1kaWdpdCcsXG4gIGRheTogJzItZGlnaXQnLFxufSk7XG5cbmV4cG9ydCBjb25zdCBkZG1teXl5eSA9IGRhdGVUaW1lRm9ybWF0KHtcbiAgbW9udGg6ICcyLWRpZ2l0JyxcbiAgZGF5OiAnMi1kaWdpdCcsXG4gIHllYXI6ICdudW1lcmljJyxcbn0pO1xuXG5leHBvcnQgY29uc3QgZml4ZWQwID0gbnVtYmVyRm9ybWF0KHtcbiAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAwLFxufSk7XG5cbmV4cG9ydCBjb25zdCBmaXhlZDAyID0gbnVtYmVyRm9ybWF0KHtcbiAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwLFxuICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG59KTtcblxuZXhwb3J0IGNvbnN0IGZpeGVkMSA9IG51bWJlckZvcm1hdCh7XG4gIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMSxcbiAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAxLFxufSk7XG5cbmV4cG9ydCBjb25zdCBmaXhlZDAxID0gbnVtYmVyRm9ybWF0KHtcbiAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwLFxuICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDEsXG59KTtcblxuZXhwb3J0IGNvbnN0IGZpeGVkMiA9IG51bWJlckZvcm1hdCh7XG4gIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxufSk7XG5cbmV4cG9ydCBjb25zdCBwZXJjZW50MCA9IG51bWJlckZvcm1hdCh7XG4gIHN0eWxlOiAncGVyY2VudCcsXG4gIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMCxcbn0pO1xuXG5leHBvcnQgY29uc3QgcGVyY2VudDEgPSBudW1iZXJGb3JtYXQoe1xuICBzdHlsZTogJ3BlcmNlbnQnLFxuICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDEsXG4gIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMSxcbn0pO1xuXG5leHBvcnQgY29uc3QgcGVyY2VudDIgPSBudW1iZXJGb3JtYXQoe1xuICBzdHlsZTogJ3BlcmNlbnQnLFxuICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXRhKGZyb206IG51bWJlciwgdG86IG51bWJlcikge1xuICBsZXQgcmV0ID0gaGhtbSh0byk7XG4gIGNvbnN0IGRheXMgPSBkaWZmRGF5cyhmcm9tLCB0byk7XG4gIGlmIChkYXlzID4gMCkge1xuICAgIHJldCArPSBgICske2RheXN9ZGA7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEN1cnJlbmN5KGN1cnJlbmN5PzogbnVtYmVyIHwgbnVsbCwgZm9ybWF0PzogKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZykge1xuICBpZiAoIWlzUHJlc2VudChjdXJyZW5jeSkpIHtcbiAgICByZXR1cm4gJy0tJztcbiAgfVxuICBmb3JtYXQgPz89IGZpeGVkMDtcbiAgY29uc3Qgc2V0dGluZ3MgPSB1c2VyRGF0YS5zZXR0aW5ncy5jdXJyZW5jeTtcbiAgY29uc3Qgc3ltYm9sID0gZ2V0Q3VycmVuY3lTeW1ib2woc2V0dGluZ3MpO1xuICBjb25zdCBzcGFjaW5nID0gc2V0dGluZ3MucHJlc2V0ID09PSAnREVGQVVMVCcgPyAnSEFTX1NQQUNFJyA6IHNldHRpbmdzLnNwYWNpbmc7XG4gIGNvbnN0IHBvc2l0aW9uID0gc2V0dGluZ3MucHJlc2V0ID09PSAnREVGQVVMVCcgPyAnQUZURVInIDogc2V0dGluZ3MucG9zaXRpb247XG4gIGlmIChwb3NpdGlvbiA9PT0gJ0FGVEVSJykge1xuICAgIHJldHVybiBzcGFjaW5nID09PSAnSEFTX1NQQUNFJyA/IGZvcm1hdChjdXJyZW5jeSkgKyAnICcgKyBzeW1ib2wgOiBmb3JtYXQoY3VycmVuY3kpICsgc3ltYm9sO1xuICB9XG4gIGNvbnN0IHNpZ24gPSBjdXJyZW5jeSA8IDAgPyAnLScgOiAnJztcbiAgcmV0dXJuIHNwYWNpbmcgPT09ICdIQVNfU1BBQ0UnXG4gICAgPyBzaWduICsgc3ltYm9sICsgJyAnICsgZm9ybWF0KE1hdGguYWJzKGN1cnJlbmN5KSlcbiAgICA6IHNpZ24gKyBzeW1ib2wgKyBmb3JtYXQoTWF0aC5hYnMoY3VycmVuY3kpKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVuY3lTeW1ib2woc2V0dGluZ3M6IHR5cGVvZiB1c2VyRGF0YS5zZXR0aW5ncy5jdXJyZW5jeSkge1xuICBzd2l0Y2ggKHNldHRpbmdzLnByZXNldCkge1xuICAgIGNhc2UgJ0RFRkFVTFQnOlxuICAgICAgcmV0dXJuIGJhbGFuY2VzU3RvcmUub3duQ3VycmVuY3kudmFsdWU7XG4gICAgY2FzZSAnQUlDJzpcbiAgICAgIHJldHVybiAn4oKzJztcbiAgICBjYXNlICdJQ0EnOlxuICAgICAgcmV0dXJuICfHgic7XG4gICAgY2FzZSAnQ0lTJzpcbiAgICAgIHJldHVybiAn4oKhJztcbiAgICBjYXNlICdOQ0MnOlxuICAgICAgcmV0dXJuICfigqYnO1xuICAgIGNhc2UgJ0NVU1RPTSc6XG4gICAgICByZXR1cm4gc2V0dGluZ3MuY3VzdG9tO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBTUEsTUFBQSxTQUFBLFNBQUEsTUFBQTtBQUNFLFVBQUEsU0FBQSxTQUFBLE1BQUE7QUFBQSxJQUFnQyxLQUFBO0FBRTVCLGFBQUE7QUFBQSxJQUFPLEtBQUE7QUFFUCxhQUFBO0FBQUEsSUFBTyxLQUFBO0FBRVAsYUFBQTtBQUFBLEVBQU87QUFFYixDQUFBO0FBRUEsTUFBQSxTQUFBLFNBQUEsTUFBQTtBQUNF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
