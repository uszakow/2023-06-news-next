import LoadingIcon from "@/public/icons/loader.svg";
import styles from './Button.module.scss';

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger' | 'inline';
  label: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ type = 'primary', label, disabled, loading, className = '', onClick }) => {
  const buttonClasses = `${styles.button} ${styles[type]} ${className} flex-center`;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ?
        <LoadingIcon className={styles.loader} /> :
        label
      }
    </button>
  );
};