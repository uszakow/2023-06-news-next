import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppContext } from "@/context/app.context";
import { api } from "@/api/config";
import { fetchNews } from "@/api/fetchNews";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import { NewsInterface } from "@/types/News.interface";
import { Button } from "@ui/Button/Button";
import { Modal } from "@ui/Modal/Modal";
import { Typography } from "@ui/Typography/Typography";
import { NewsManageModal } from "../NewsManageModal/NewsManageModal";
import styles from './NewsPreview.module.scss';

interface NewsPreviewProps {
  news: NewsInterface;
  updateNewsList: ([]) => void;
}

export const NewsPreview: React.FC<NewsPreviewProps> = ({ news, updateNewsList }) => {
  const { user, token } = useContext(AppContext);

  const [content, setContent] = useState(['']);

  const [editNewsModalOpen, setEditNewsModalOpen] = useState(false);
  const [deleteNewsModalOpen, setDeleteNewsModalOpen] = useState(false);
  const [updatedNewsTitle, setUpdatedNewsTitle] = useState(news.title);
  const [updatedNewsContent, setUpdatedNewsContent] = useState(news.content);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const splittedContent = news.content.split('\n');

    setContent(splittedContent);
  }, [news.content]);

  const updateNews = async (): Promise<void> => {
    try {
      setLoading(true);

      await api.put(`/news/${news.id}`, {
        title: updatedNewsTitle,
        content: updatedNewsContent
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedNewsList = await fetchNews();
      updateNewsList(updatedNewsList);

      setEditNewsModalOpen(false);
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Nie udało się zaktualizować wiadomość");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (): Promise<void> => {
    try {
      setLoading(true);

      await api.delete(`/news/${news.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedNewsList = await fetchNews();
      updateNewsList(updatedNewsList);

      setDeleteNewsModalOpen(false);
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Nie udałos się usunąć wiadomość");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles['news-preview']} p-1 mb-2`}>
      <Typography
        className="flex flex-justify-between flex-align-end"
        type="title"
      >
        <Link
          href={`/news/${news.id}`}
          className={styles['news-preview-title']}
        >
          {news.title}
        </Link>
        {user?.id === news.author.id && (
          <div className="flex">
            <Button
              type="inline"
              label="Edytuj"
              onClick={() => setEditNewsModalOpen(true)}
            />
            <Button
              className="ml-2"
              type="inline"
              label="Usuń"
              onClick={() => setDeleteNewsModalOpen(true)}
            />
          </div>
        )}
      </Typography>

      <div className={styles['news-preview-content']}>
        {content?.map((item, index) => (
          <p key={index + item}>{item}</p>
        ))}
      </div>

      <NewsManageModal
        isOpen={editNewsModalOpen}
        newsTitle={updatedNewsTitle}
        newsContent={updatedNewsContent}
        loading={loading}
        errorMessage={error}
        setNewsTitle={setUpdatedNewsTitle}
        setNewsContent={setUpdatedNewsContent}
        manageNews={updateNews}
        closeModal={() => setEditNewsModalOpen(false)}
      />

      <Modal
        title="Usuń wiadomość"
        isOpen={deleteNewsModalOpen}
        onClose={() => setDeleteNewsModalOpen(false)}
      >
        <Typography type="text">Potwierdź usunięcie tej wiadomości.</Typography>
        <Button
          className="mt-2 m-auto"
          type="danger"
          label="Usuń wiadomość"
          loading={loading}
          onClick={() => deleteNews()}
        />
      </Modal>
    </div>
  );
};