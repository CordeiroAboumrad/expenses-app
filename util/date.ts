export function getFormattedDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
