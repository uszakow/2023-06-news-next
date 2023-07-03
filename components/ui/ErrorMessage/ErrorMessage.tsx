import { formatMessage } from '@/helpers/pipes';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string | string[];
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  return (
    <div className={`${styles['error-message']} ${className} text-center`}>{formatMessage(message)}</div>
  );
};