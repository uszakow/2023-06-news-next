import { Button } from "@ui/Button/Button";
import { ErrorMessage } from "@ui/ErrorMessage/ErrorMessage";
import { Input } from "@ui/Input/Input";
import { Modal } from "@ui/Modal/Modal";
import styles from './NewsManageModal.module.scss';

interface NewsModalProps {
  isOpen: boolean;
  newsTitle: string;
  newsContent: string;
  loading: boolean;
  errorMessage: string;
  setNewsTitle: (title: string) => void;
  setNewsContent: (title: string) => void;
  manageNews: () => void;
  closeModal: () => void;
}

export const NewsManageModal: React.FC<NewsModalProps> = ({ isOpen, newsTitle, newsContent, loading, errorMessage, setNewsTitle, setNewsContent, manageNews, closeModal }) => {
  return (
    <Modal
      className={styles['news-modal']}
      title="Dodanie nowej wiadomości"
      isOpen={isOpen}
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
        onClick={() => manageNews()}
      />
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </Modal>
  );
};