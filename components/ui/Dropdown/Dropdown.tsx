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
      <div r-if={title === 'string'} className='title'>{title}</div>
      <span r-else>{title}</span>
      
      <div
        className={dropdownContentClasses}
        onClick={() => setIsOpen(false)}
      >
        {children}
      </div>
    </div>
  );
};