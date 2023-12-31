export const showNewsCount = (count: number): string => {
  return `${count} ${count === 1 ? "wiadomość" : "wiadomości"}`;
};

export const formatMessage = (message: string | string[]): string => {
  if (Array.isArray(message)) {
    return message.join(" ");
  }
  return message;
};
