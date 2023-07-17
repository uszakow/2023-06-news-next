import { useContext, useState } from "react";
import { UpdateUserDto } from "@/types/UpdateUser.dto";
import { useUserApi } from "@/api/useUserApi";
import { AppContext } from "@/context/app.context";
import { Modal } from "@ui/Modal/Modal";
import { Button } from "@ui/Button/Button";
import { Input } from "@ui/Input/Input";
import { ErrorMessage } from "@ui/ErrorMessage/ErrorMessage";
import { Typography } from "@ui/Typography/Typography";

export const ProfileDataChange: React.FC = () => {
  const { token, setUserContext } = useContext(AppContext);

  const { updateUserApi, deleteUserApi } = useUserApi();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | string[]>("");

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

    const body: UpdateUserDto = {};
    if (field === 'name') {
      body.name = name;
    }
    if (field === 'password') {
      body.password = password;
    }

    try {
      setLoading(true);

      if (token) {
        await updateUserApi(body, token);
      }

      setUserContext();
      closeModal();
    } catch (error: any) {
      setError(error.response?.data?.message || "Nie udało się zmienić danych użytkownika.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      setLoading(true);

      if (token) {
        await deleteUserApi(token);
      }

      setUserContext();
      closeModal();
    } catch (error: any) {
      setError(error.response?.data?.message || "Nie udało się usunąć konto użytkownika.");
    } finally {
      setLoading(false);
    }
  };

  const getModalTitle = () => {
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
        title={getModalTitle()}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <div r-if={modalName === 'name'}>
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
        </div>

        <div r-else-if={modalName === 'password'}>
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
        </div>

        <div r-else-if={modalName === 'delete'}>
          <Typography type='title'>
            Uwaga - potwierdzasz USUNIĘCIE tego konta!
          </Typography>
          <Typography type='text'>
            Tej akcji nie da się odwrócić! Jeżeli nie chcesz tego robić, po prostu zamknij to okno.
          </Typography>
          <Button
            className="mt-2 m-auto"
            type="danger"
            label="Usuń konto"
            loading={loading}
            onClick={() => deleteUser()}
          />
        </div>
        <ErrorMessage r-if={error} message={error} />
      </Modal>
    </div >
  );
};