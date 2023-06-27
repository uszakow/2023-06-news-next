import LoadingIcon from "@/public/icons/loader.svg";
import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.background}>
      <LoadingIcon className={styles.loader} />
    </div>
  );
};