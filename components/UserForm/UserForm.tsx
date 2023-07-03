import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/app.context";
import { useUserApi } from "@/api/useUserApi";
import { TabItemInterface } from "@/types/TabItem.interface";
import { Tabs } from "@ui/Tabs/Tabs";
import { ErrorMessage } from "@ui/ErrorMessage/ErrorMessage";
import { Typography } from "@ui/Typography/Typography";
import { Input } from "@ui/Input/Input";
import { Button } from "@ui/Button/Button";
import styles from './UserForm.module.scss';

export const UserForm: React.FC = () => {
  const tabs: TabItemInterface[] = [
    { id: 'login', label: 'Zaloguj się' },
    { id: 'registration', label: 'Utwórz konto' },
  ];

  const { setUserContext } = useContext(AppContext);

  const { createUserApi, loginUserApi } = useUserApi();

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | string[]>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError('');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error]);

  const loginUser = async () => {
    try {
      setLoading(true);
      const token = await loginUserApi({ name, password });

      if (token) {
        localStorage.setItem('token', token);
      }

      setUserContext();
    } catch (error: any) {
      setError(error.response?.data?.message || "Nie udało się zalogować, prosimy spróbować później");
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    try {
      setLoading(true);

      // an example of using api directly
      // const response = await api.post('/user', {
      //   name,
      //   password
      // });
      // an example of useing api with userApi object
      const response = await createUserApi({ name, password });

      if (response.status === 201) {
        loginUser();
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Nie udało się stworzyć konto użytkownika");
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
    </div>
  );
};