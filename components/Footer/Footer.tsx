import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={`${styles.footer} text-center py-1`}>
      <span>Created by</span>&nbsp;
      <a href="https://www.linkedin.com/in/p-uszakow/" target='_blank'>Paweł Uszakow</a>
    </footer>
  );
};