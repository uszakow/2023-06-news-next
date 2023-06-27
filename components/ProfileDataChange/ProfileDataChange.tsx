import { useContext, useState } from "react";
import { Modal } from "@ui/Modal/Modal";
import { Button } from "@ui/Button/Button";
import { Input } from "@ui/Input/Input";
import { api } from "@/config";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import { AppContext } from "@/context/app.context";
import { ErrorMessage } from "../ui/ErrorMessage/ErrorMessage";
import { Typography } from "../ui/Typography/Typography";

interface ChangeUserDataBody {
  name?: string;
  password?: string;
}

export const ProfileDataChange: React.FC = () => {
  const { token, setUser } = useContext(AppContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openChangeNameModal = () => {
    setModalName('name');
    setIsModalOpen(true);
  };
  const openChangePasswordModal = () => {
    setModalName('password');
    setIsModalOpen(true);
  };
  const openDeleteProfileModal = () => {
    setModalName('delete');
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setName('');
    setPassword('');
    setPasswordConfirmation('');
    setError('');
    setModalName('');
    setIsModalOpen(false);
  };

  const changeUserData = async (field: 'name' | 'password'): Promise<void> => {
    if (password !== passwordConfirmation) {
      setError('Hasła się różnią.');
      return;
    }

    const body: ChangeUserDataBody = {};
    if (field === 'name') {
      body.name = name;
    }
    if (field === 'password') {
      body.password = password;
    }

    try {
      setLoading(true);

      await api.put('/user', body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser();
      closeModal();
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Nie udało się zmienić nazwy użytkownika");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      setLoading(true);

      await api.delete('/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser();
      closeModal();
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, "Nie udało się usunąć konto użytkownika");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const modalTitle = () => {
    switch (modalName) {
      case 'name':
        return 'Zmień nazwę użytkownika';
      case 'password':
        return 'Zmień hasło';
      case 'delete':
        return 'Usuń dane konto';
      default:
        return '';
    }
  };

  const modalContent = () => {
    switch (modalName) {
      case 'name':
        return (
          <>
            <Input
              value={name}
              label="Nowa nazwa użytkownika"
              placeholder="Wprowadź nazwę użytkownika"
              onChange={setName}
            />
            <Button
              className="mt-2 m-auto"
              label="Zmień nazwę"
              loading={loading}
              onClick={() => changeUserData('name')}
            />
          </>
        );
      case 'password':
        return (
          <>
            <Input
              type="password"
              value={password}
              label="Nowe hasło użytkownika"
              placeholder="Wprowadź hasło użytkownika"
              onChange={setPassword}
            />
            <Input
              type="password"
              value={passwordConfirmation}
              label="Potwierdzenie hasła użytkownika"
              placeholder="Wprowadź hasło użytkownika jeszcze raz"
              onChange={setPasswordConfirmation}
            />
            <Button
              className="mt-2 m-auto"
              label="Zmień hasło"
              loading={loading}
              onClick={() => changeUserData('password')}
            />
          </>
        );
      case 'delete':
        return (
          <>
            <Typography type='title'>Uwaga - potwierdzasz USUNIĘCIE tego konta!</Typography>
            <Typography type='text'>Tej akcji nie da się odwrócić! Jeżeli nie chcesz tego robić, po prostu zamknij to okno.</Typography>
            <Button
              className="mt-2 m-auto"
              type="danger"
              label="Usuń konto"
              onClick={() => deleteUser()}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex mt-2">
      <Button
        type="primary"
        label="Zmień nazwę"
        onClick={() => openChangeNameModal()}
      />
      <Button
        type="secondary"
        label="Zmień hasło"
        className="ml-2"
        onClick={() => openChangePasswordModal()}
      />
      <Button
        type="danger"
        label="Usuń konto"
        className="ml-2"
        onClick={() => openDeleteProfileModal()}
      />

      <Modal
        title={modalTitle()}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {modalContent()}
        {error && <ErrorMessage message={error} />}
      </Modal>
    </div >
  );
};