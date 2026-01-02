function diffDays(from, to, float = false) {
  const diff = to - from;
  const days = diff / 864e5;
  return float ? days : days >= 0 ? Math.floor(days) : Math.ceil(days);
}
function diffHours(from, to, float = false) {
  const diff = to - from;
  const days = diff / 36e5;
  return float ? days : days >= 0 ? Math.floor(days) : Math.ceil(days);
}
export { diffDays, diffHours };
