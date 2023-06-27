import { PropsWithChildren } from "react";
import styles from './Typography.module.scss';

interface TypographyProps extends PropsWithChildren {
  type: 'title' | 'text';
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({ type, className = '', children }) => {
  const typographyClasses = `${styles[type]} ${className}`;

  switch (type) {
    case 'title':
      return <h2 className={typographyClasses}>{children}</h2>;
    case 'text':
      return <span className={typographyClasses}>{children}</span>;
  }
};