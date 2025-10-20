export function getDayDiff(startDate, endDate) {
  const dateTimeDiff = endDate - startDate;
  return Math.ceil(dateTimeDiff / (1000 * 60 * 60 * 24));
}
