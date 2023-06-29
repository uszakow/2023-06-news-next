import { useContext, useState } from "react";
import { AppContext } from "@/context/app.context";
import { api } from "@/api/config";
import { fetchNews } from "@/api/fetchNews";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import { Button } from "@ui/Button/Button";
import { NewsManageModal } from "../NewsManageModal/NewsManageModal";

interface NewsAddProps {
  updateNewsList: ([]) => void;
}

export const NewsAdd: React.FC<NewsAddProps> = ({ updateNewsList }) => {
  const { token } = useContext(AppContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createNews = async (): Promise<void> => {
    try {
      setLoading(true);

      await api.post('/news', {
        title: newsTitle,
        content: newsContent
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedNewsList = await fetchNews();
      updateNewsList(updatedNewsList);

      setNewsTitle('');
      setNewsContent('');
      setIsModalOpen(false);
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Nie udało się stworzyć wiadomość");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
        newsTitle={newsTitle}
        newsContent={newsContent}
        loading={loading}
        errorMessage={error}
        setNewsTitle={setNewsTitle}
        setNewsContent={setNewsContent}
        manageNews={createNews}
        closeModal={() => setIsModalOpen(false)}
      />
    </>
  );
};