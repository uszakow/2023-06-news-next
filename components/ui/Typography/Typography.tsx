import { PropsWithChildren } from "react";
import styles from './Typography.module.scss';

interface TypographyProps extends PropsWithChildren {
  type: 'title' | 'text';
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({ type, className = '', children }) => {
  const typographyClasses = `${styles[type]} ${className}`;

  return (
    <>
      <h2 r-if={type === 'title'} className={typographyClasses}>{children}</h2>
      <span r-else-if={type === 'text'} className={typographyClasses}>{children}</span>
    </>
  );
};