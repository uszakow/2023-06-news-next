import { api } from "@/api/config";
import { NewsInterface } from "@/types/News.interface";

export const fetchNews = async (): Promise<NewsInterface[]> => {
  const response = await api.get('/news');

  return response.data;
};
