import Head from "next/head";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/app.context";
import { showNewsCount } from "@/helpers/pipes";
import { Button } from "@ui/Button/Button";
import { Typography } from "@ui/Typography/Typography";
import { ProfileDataChange } from "@/components/ProfileDataChange/ProfileDataChange";

const ProfilePage: React.FC = () => {
  const { user, setUserContext } = useContext(AppContext);

  useEffect(() => {
    setUserContext();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUserContext();
  };

  return (
    <>
      <Head>
        <title>Strona użytkownika</title>
      </Head>
      <Typography type="title" className="flex flex-justify-between flex-align-end">
        <span>Nazwa użytkownika: {user?.name}</span>
        <Button type="inline" label="Wyloguj się" onClick={() => logout()} />
      </Typography>
      <Typography type="text" className="block">
        {user?.name} stworzył {showNewsCount(user?.news?.length ?? 0)}
      </Typography>

      <ProfileDataChange />
    </>
  );
};

export default ProfilePage;