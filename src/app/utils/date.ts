export function formatDateToDdMmYyyy(dateValue: string) {
  if (!dateValue) return undefined;
  const [year, month, day] = dateValue.split("-");
  if (!year || !month || !day) return undefined;
  return `${day}-${month}-${year}`;
}
