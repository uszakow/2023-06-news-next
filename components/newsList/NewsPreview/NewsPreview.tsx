import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppContext } from "@/context/app.context";
import { useNewsApi } from "@/api/useNewsApi";
import { NewsInterface } from "@/types/News.interface";
import { Button } from "@ui/Button/Button";
import { Modal } from "@ui/Modal/Modal";
import { Typography } from "@ui/Typography/Typography";
import { NewsManageModal } from "../NewsManageModal/NewsManageModal";
import styles from './NewsPreview.module.scss';
import { ErrorMessage } from "@/components/ui/ErrorMessage/ErrorMessage";

interface NewsPreviewProps {
  news: NewsInterface;
  updateNewsList: ([]) => void;
}

export const NewsPreview: React.FC<NewsPreviewProps> = ({ news, updateNewsList }) => {
  const { user, token } = useContext(AppContext);

  const { getNewsListApi, updateNewsApi, deleteNewsApi } = useNewsApi();

  const [content, setContent] = useState(['']);

  const [editNewsModalOpen, setEditNewsModalOpen] = useState(false);
  const [deleteNewsModalOpen, setDeleteNewsModalOpen] = useState(false);
  const [updatedNewsTitle, setUpdatedNewsTitle] = useState(news.title);
  const [updatedNewsContent, setUpdatedNewsContent] = useState(news.content);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | string[]>('');

  useEffect(() => {
    const splittedContent = news.content.split('\n');

    setContent(splittedContent);
  }, [news.content]);

  const updateNews = async (): Promise<void> => {
    try {
      setLoading(true);

      if (token) {
        await updateNewsApi(news.id, { title: updatedNewsTitle, content: updatedNewsContent }, token);
      }

      const updatedNewsList = await getNewsListApi();
      updateNewsList(updatedNewsList);

      setEditNewsModalOpen(false);
    } catch (error: any) {
      setError(error.response?.data?.message || "Nie udało się zaktualizować wiadomość");
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (): Promise<void> => {
    try {
      setLoading(true);

      if (token) {
        await deleteNewsApi(news.id, token);
      }

      const updatedNewsList = await getNewsListApi();
      updateNewsList(updatedNewsList);

      setDeleteNewsModalOpen(false);
    } catch (error: any) {
      setError(error.response?.data?.message || "Nie udałos się usunąć wiadomość");
    } finally {
      setLoading(false);
    }
  };

  const closeEditNewsModal = (): void => {
    setError('');
    setUpdatedNewsTitle(news.title);
    setUpdatedNewsContent(news.content);
    setEditNewsModalOpen(false);
  };

  const closeDeleteNewsModal = (): void => {
    setError('');
    setDeleteNewsModalOpen(false);
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
        modalTitle="Edytowanie wiadomości"
        newsTitle={updatedNewsTitle}
        newsContent={updatedNewsContent}
        loading={loading}
        error={error}
        setNewsTitle={setUpdatedNewsTitle}
        setNewsContent={setUpdatedNewsContent}
        manageNews={updateNews}
        closeModal={() => closeEditNewsModal()}
      />

      <Modal
        title="Usuń wiadomość"
        isOpen={deleteNewsModalOpen}
        onClose={() => closeDeleteNewsModal()}
      >
        <Typography type="text">Potwierdź usunięcie tej wiadomości.</Typography>
        <Button
          className="mt-2 m-auto"
          type="danger"
          label="Usuń wiadomość"
          loading={loading}
          onClick={() => deleteNews()}
        />
        {error && <ErrorMessage message={error} />}
      </Modal>
    </div>
  );
};