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
