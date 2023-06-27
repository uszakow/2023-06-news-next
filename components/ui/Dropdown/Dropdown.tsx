import { PropsWithChildren, ReactNode, useState } from 'react';
import styles from './Dropdown.module.scss';

interface DropdownProps extends PropsWithChildren {
  type?: 'simple' | 'framed';
  title: string | ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ type = 'simple', title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(true);

  const dropdownClasses = `${styles.dropdown} ${styles[type]} relative`;
  const dropdownContentClasses = `${!isOpen ? 'none' : ''} ${styles['dropdown-content']}`;

  return (
    <div
      className={dropdownClasses}
      onMouseOver={() => type === 'simple' && setIsOpen(true)}
      onMouseLeave={() => type === 'simple' && setIsOpen(false)}
    >
      {typeof title === 'string' ?
        <div className='title'>{title}</div> :
        title
      }

      <div
        className={dropdownContentClasses}
        onClick={() => setIsOpen(false)}
      >
        {children}
      </div>
    </div>
  );
};