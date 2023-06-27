import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  return (
    <div className={`${styles['error-message']} ${className} text-center`}>{message}</div>
  );
};