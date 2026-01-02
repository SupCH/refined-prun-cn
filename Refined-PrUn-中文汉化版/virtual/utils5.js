function countDays(burn) {
  let days = 1e3;
  for (const key of Object.keys(burn)) {
    const mat = burn[key];
    if (!isNaN(mat.dailyAmount) && mat.dailyAmount < 0 && mat.daysLeft < days) {
      days = mat.daysLeft;
    }
  }
  return days;
}
export { countDays };
