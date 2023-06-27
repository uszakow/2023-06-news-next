export const showNewsCount = (count: number): string => {
  return `${count} ${count === 1 ? "wiadomość" : "wiadomości"}`;
};
