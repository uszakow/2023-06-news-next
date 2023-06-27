import Link from "next/link";
import React, { useContext } from "react";
import styles from './Navbar.module.scss';
import { Dropdown } from "@ui/Dropdown/Dropdown";
import { AppContext } from "@/context/app.context";

export const Navbar: React.FC = () => {
  const { user, setUser } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setUser();
  };

  return (
    <nav className={`${styles.navbar} flex flex-justify-between px-3`}>
      <Link href='/' className={styles['navbar-item']}>Wiadomości</Link>
      {user ?
        <Dropdown title={<div className={`${styles['navbar-item']} ${styles['user-name']}`}>{user.name}</div>}>
          <Link href='/profile' className="dropdown-item">Strona użytkownika</Link>
          <button
            className="dropdown-item"
            onClick={() => logout()}
          >
            Wyloguj się
          </button>
        </Dropdown> :
        <Link href='/login' className={styles['navbar-item']}>Zaloguj się</Link>
      }
    </nav>
  );
};
