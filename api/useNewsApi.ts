import { api } from "./config";
import { getRequestOptions } from "@/helpers/getRequestOptions";
import { NewsInterface } from "@/types/News.interface";
import { NewsDto } from "@/types/News.dto";
import { UpdateNewsDto } from "@/types/UpdateNews.dto";

export const useNewsApi = () => {
  const createNewsApi = async (body: NewsDto, token: string): Promise<void> => {
    await api.post("/news", body, getRequestOptions(token));
  };

  const getNewsListApi = async (): Promise<NewsInterface[]> => {
    const response = await api.get("/news");
    return response.data;
  };

  const getNewsApi = async (newsId: string): Promise<NewsInterface> => {
    const response = await api.get(`/news/${newsId}`);
    return response.data;
  };

  const updateNewsApi = async (
    newsId: string,
    body: UpdateNewsDto,
    token: string
  ): Promise<void> => {
    await api.put(`/news/${newsId}`, body, getRequestOptions(token));
  };

  const deleteNewsApi = async (
    newsId: string,
    token: string
  ): Promise<void> => {
    await api.delete(`/news/${newsId}`, getRequestOptions(token));
  };

  return {
    createNewsApi,
    getNewsListApi,
    getNewsApi,
    updateNewsApi,
    deleteNewsApi,
  };
};
