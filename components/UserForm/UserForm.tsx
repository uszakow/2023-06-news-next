import { TabItemInterface } from "@/types/TabItem.interface";
import { Tabs } from "@ui/Tabs/Tabs";
import { useContext, useEffect, useState } from "react";
import { Typography } from "@ui/Typography/Typography";
import { Input } from "@ui/Input/Input";
import { Button } from "@ui/Button/Button";
import { api } from "@/config";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import styles from './UserForm.module.scss';
import { ErrorMessage } from "@ui/ErrorMessage/ErrorMessage";
import { AppContext } from "@/context/app.context";

export const UserForm: React.FC = () => {
  const tabs: TabItemInterface[] = [
    { id: 'login', label: 'Zaloguj się' },
    { id: 'registration', label: 'Utwórz konto' },
  ];

  const { setUser } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError('');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error]);

  const loginUser = async () => {
    try {
      setLoading(true);
      const response = await api.post('/user/login', {
        name,
        password
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
      }

      setUser();
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, "Nie udało się zalogować, prosimy spróbować później");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    try {
      setLoading(true);
      const response = await api.post('/user', {
        name,
        password
      });

      if (response.status === 201) {
        loginUser();
      }
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, "Nie udało się stworzyć konto użytkownika");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles['user-form']} relative m-auto mt-3`}>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className={`${styles['user-form-wrap']} px-2 py-3`}>
        <Typography type='title'>
          {activeTab === 'login' ? 'Dane użytkownika:' : 'Nowy użytkownik:'}
        </Typography>
        <Input
          value={name}
          label="Nazwa użytkownika"
          placeholder="Wprowadź nazwę użytkownika"
          required
          onChange={setName}
        />
        <Input
          type='password'
          value={password}
          label="Hasło"
          placeholder={activeTab === 'login' ? "Wprowadź hasło" : "Hasło ma zawierać co najmniej 4 znaki"}
          required
          onChange={setPassword}
        />
        <Button
          className="mt-2 mb-1 m-auto"
          label={activeTab === 'login' ? 'Zaloguj się' : 'Utwórz konto'}
          onClick={activeTab === 'login' ? loginUser : createUser}
          loading={loading}
        />
        {error && <ErrorMessage message={error} />}
      </div>

      <style jsx>{`
        .user-form {
          border: 1px solid black;
        }
      `}</style>
    </div>
  );
};