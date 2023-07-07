import { PropsWithChildren, ReactNode, useState } from 'react';
import styles from './Dropdown.module.scss';

interface DropdownProps extends PropsWithChildren {
  title: string | ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownContentClasses = `${!isOpen ? 'none' : ''} ${styles['dropdown-content']}`;

  return (
    <div
      className={`${styles.dropdown} relative`}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
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