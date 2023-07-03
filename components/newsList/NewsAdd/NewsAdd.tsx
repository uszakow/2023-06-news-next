import { useContext, useState } from "react";
import { AppContext } from "@/context/app.context";
import { useNewsApi } from "@/api/useNewsApi";
import { Button } from "@ui/Button/Button";
import { NewsManageModal } from "../NewsManageModal/NewsManageModal";

interface NewsAddProps {
  updateNewsList: ([]) => void;
}

export const NewsAdd: React.FC<NewsAddProps> = ({ updateNewsList }) => {
  const { token } = useContext(AppContext);

  const { createNewsApi, getNewsListApi } = useNewsApi();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | string[]>('');

  const createNews = async (): Promise<void> => {
    try {
      setLoading(true);

      if (token) {
        await createNewsApi({ title: newsTitle, content: newsContent }, token);
      }

      const updatedNewsList = await getNewsListApi();
      updateNewsList(updatedNewsList);

      setNewsTitle('');
      setNewsContent('');
      setIsModalOpen(false);
    } catch (error: any) {
      setError(error.response?.data?.message || "Nie udało się stworzyć wiadomość.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = (): void => {
    setError('');
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        className="mt-2"
        type="adding"
        label="Dodaj nową wiadomość"
        onClick={() => setIsModalOpen(true)}
      />

      <NewsManageModal
        isOpen={isModalOpen}
        modalTitle="Dodanie nowej wiadomości"
        newsTitle={newsTitle}
        newsContent={newsContent}
        loading={loading}
        error={error}
        setNewsTitle={setNewsTitle}
        setNewsContent={setNewsContent}
        manageNews={createNews}
        closeModal={() => closeModal()}
      />
    </>
  );
};