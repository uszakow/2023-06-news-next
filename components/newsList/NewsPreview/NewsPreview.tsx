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
  onNewsChange: () => void;
}

export const NewsPreview: React.FC<NewsPreviewProps> = ({ news, onNewsChange }) => {
  const { user, token } = useContext(AppContext);

  const { updateNewsApi, deleteNewsApi } = useNewsApi();

  const [content, setContent] = useState(['']);

  const [isEditNewsModalOpen, setIsEditNewsModalOpen] = useState(false);
  const [isDeleteNewsModalOpen, setIsDeleteNewsModalOpen] = useState(false);
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

      await onNewsChange();

      setIsEditNewsModalOpen(false);
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

      onNewsChange();

      setIsDeleteNewsModalOpen(false);
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
    setIsEditNewsModalOpen(false);
  };

  const closeDeleteNewsModal = (): void => {
    setError('');
    setIsDeleteNewsModalOpen(false);
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
              onClick={() => setIsEditNewsModalOpen(true)}
            />
            <Button
              className="ml-2"
              type="inline"
              label="Usuń"
              onClick={() => setIsDeleteNewsModalOpen(true)}
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
        isOpen={isEditNewsModalOpen}
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
        isOpen={isDeleteNewsModalOpen}
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