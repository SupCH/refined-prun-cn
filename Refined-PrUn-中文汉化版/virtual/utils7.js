import { percent0, percent1, percent2, fixed0 } from './format.js';
function formatAmount(amount) {
  if (amount === void 0) {
    return '--';
  }
  return fixed0(amount);
}
function formatChange(change) {
  if (change === void 0 || !isFinite(change)) {
    return '--';
  }
  const absChange = Math.abs(change);
  let formatted;
  if (absChange >= 10) {
    return change > 0 ? '> +999%' : '< -999%';
  }
  if (absChange < 1e-4) {
    return change >= 0 ? '+0%' : '-0%';
  }
  if (absChange > 1) {
    formatted = percent0(absChange);
  } else if (absChange > 0.1) {
    formatted = percent1(absChange);
  } else {
    formatted = percent2(absChange);
  }
  const sign = change > 0 ? '+' : change < 0 ? '-' : '';
  return sign + formatted;
}
export { formatAmount, formatChange };
