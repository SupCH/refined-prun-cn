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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHM3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0ZJTkJTL3V0aWxzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZpeGVkMCwgcGVyY2VudDAsIHBlcmNlbnQxLCBwZXJjZW50MiB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEFtb3VudChhbW91bnQ6IG51bWJlciB8IHVuZGVmaW5lZCkge1xuICBpZiAoYW1vdW50ID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gJy0tJztcbiAgfVxuICByZXR1cm4gZml4ZWQwKGFtb3VudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRDaGFuZ2UoY2hhbmdlOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgaWYgKGNoYW5nZSA9PT0gdW5kZWZpbmVkIHx8ICFpc0Zpbml0ZShjaGFuZ2UpKSB7XG4gICAgcmV0dXJuICctLSc7XG4gIH1cbiAgY29uc3QgYWJzQ2hhbmdlID0gTWF0aC5hYnMoY2hhbmdlKTtcbiAgbGV0IGZvcm1hdHRlZDogc3RyaW5nO1xuICBpZiAoYWJzQ2hhbmdlID49IDEwKSB7XG4gICAgcmV0dXJuIGNoYW5nZSA+IDAgPyAnPiArOTk5JScgOiAnPCAtOTk5JSc7XG4gIH1cbiAgaWYgKGFic0NoYW5nZSA8IDAuMDAwMSkge1xuICAgIHJldHVybiBjaGFuZ2UgPj0gMCA/ICcrMCUnIDogJy0wJSc7XG4gIH1cbiAgaWYgKGFic0NoYW5nZSA+IDEpIHtcbiAgICBmb3JtYXR0ZWQgPSBwZXJjZW50MChhYnNDaGFuZ2UpO1xuICB9IGVsc2UgaWYgKGFic0NoYW5nZSA+IDAuMSkge1xuICAgIGZvcm1hdHRlZCA9IHBlcmNlbnQxKGFic0NoYW5nZSk7XG4gIH0gZWxzZSB7XG4gICAgZm9ybWF0dGVkID0gcGVyY2VudDIoYWJzQ2hhbmdlKTtcbiAgfVxuICBjb25zdCBzaWduID0gY2hhbmdlID4gMCA/ICcrJyA6IGNoYW5nZSA8IDAgPyAnLScgOiAnJztcbiAgcmV0dXJuIHNpZ24gKyBmb3JtYXR0ZWQ7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVPLFNBQVMsYUFBYSxRQUE0QjtBQUN2RCxNQUFJLFdBQVcsUUFBVztBQUN4QixXQUFPO0FBQUEsRUFDVDtBQUNBLFNBQU8sT0FBTyxNQUFNO0FBQ3RCO0FBRU8sU0FBUyxhQUFhLFFBQTRCO0FBQ3ZELE1BQUksV0FBVyxVQUFhLENBQUMsU0FBUyxNQUFNLEdBQUc7QUFDN0MsV0FBTztBQUFBLEVBQ1Q7QUFDQSxRQUFNLFlBQVksS0FBSyxJQUFJLE1BQU07QUFDakMsTUFBSTtBQUNKLE1BQUksYUFBYSxJQUFJO0FBQ25CLFdBQU8sU0FBUyxJQUFJLFlBQVk7QUFBQSxFQUNsQztBQUNBLE1BQUksWUFBWSxNQUFRO0FBQ3RCLFdBQU8sVUFBVSxJQUFJLFFBQVE7QUFBQSxFQUMvQjtBQUNBLE1BQUksWUFBWSxHQUFHO0FBQ2pCLGdCQUFZLFNBQVMsU0FBUztBQUFBLEVBQ2hDLFdBQVcsWUFBWSxLQUFLO0FBQzFCLGdCQUFZLFNBQVMsU0FBUztBQUFBLEVBQ2hDLE9BQU87QUFDTCxnQkFBWSxTQUFTLFNBQVM7QUFBQSxFQUNoQztBQUNBLFFBQU0sT0FBTyxTQUFTLElBQUksTUFBTSxTQUFTLElBQUksTUFBTTtBQUNuRCxTQUFPLE9BQU87QUFDaEI7In0=
