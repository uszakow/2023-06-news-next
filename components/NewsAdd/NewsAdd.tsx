import React, { useContext, useState } from "react";
import { Button } from "@ui/Button/Button";
import { Modal } from "@ui/Modal/Modal";
import { Input } from "@ui/Input/Input";
import { api } from "@/api/config";
import { AppContext } from "@/context/app.context";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import { ErrorMessage } from "@ui/ErrorMessage/ErrorMessage";
import { fetchNews } from "@/api/fetchNews";

interface NewsAddProps {
  updateNews: ([]) => void;
}

export const NewsAdd: React.FC<NewsAddProps> = ({ updateNews }) => {
  const { token } = useContext(AppContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createNews = async (): Promise<void> => {
    let contentHtml = '';

    if (newsContent) {
      const paragraphs = newsContent.split('\n');
      contentHtml = JSON.stringify(paragraphs);
    }

    try {
      setLoading(true);

      await api.post('/news', {
        title: newsTitle,
        content: contentHtml
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedNews = await fetchNews();
      updateNews(updatedNews);

      setNewsTitle('');
      setNewsContent('');
      closeModal();
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

      <Modal
        className="add-news-modal"
        title="Dodanie nowej wiadomości"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <Input
          value={newsTitle}
          label="Tytuł wiadomości"
          placeholder="Wpisz tytuł wiadomości"
          required={true}
          onChange={setNewsTitle}
        />
        <Input
          type="textarea"
          value={newsContent}
          label="Treść wiadomości"
          placeholder="Wpisz treść wiadomości"
          required={true}
          onChange={setNewsContent}
        />
        <Button
          className="mt-2 m-auto"
          label="Opublikuj"
          loading={loading}
          onClick={() => createNews()}
        />
        {error && <ErrorMessage message={error} />}
      </Modal>

      {/* An example of adding styles in the component without adding module file */}
      <style global jsx>{`
        .add-news-modal {
          min-width: 50vw;
        }
      `}</style>
    </>
  );
};