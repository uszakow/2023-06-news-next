export const getRequestOptions = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
