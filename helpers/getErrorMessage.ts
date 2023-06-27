export const getErrorMessage = (error: any, defaultMessage: string): string => {
  console.error("Error:", error);

  const errorMessage = error?.response?.data?.message;

  if (typeof errorMessage === "string") {
    return errorMessage;
  } else if (Array.isArray(errorMessage)) {
    return errorMessage.join(" ");
  } else {
    return defaultMessage;
  }
};
