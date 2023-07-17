import { PropsWithChildren } from 'react';
import styles from './Modal.module.scss';

interface ModalProps extends PropsWithChildren {
  title: string;
  isOpen: boolean;
  className?: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, className = '', children, onClose }) => {
  return (
    <div
      r-if={isOpen}
      className={`${styles.modal} flex-center`}
    >
      <div
        className={`${styles['modal-curtain']}`}
        onClick={() => onClose()}
      />
      <div className={`${styles['modal-overlap']}`}>
        <div className={`${styles['modal-wrap']} ${className} relative p-2`}>
          <div className={`${styles['modal-title']} flex flex-justify-between pb-1 mb-2`}>
            <h2 className={styles['modal-title-text']}>{title}</h2>
            <button
              className={`${styles['modal-title-button']} relative ml-2`}
              onClick={() => onClose()}
            />
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};