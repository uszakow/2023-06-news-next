import Head from "next/head";
import React, { useContext } from "react";
import { AppContext } from "@/context/app.context";
import { showNewsCount } from "@/helpers/pipes";
import { ProfileDataChange } from "@/components/ProfileDataChange/ProfileDataChange";
import { Button } from "@/components/ui/Button/Button";
import { Typography } from "@/components/ui/Typography/Typography";

const ProfilePage: React.FC = () => {
  const { user, setUser } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setUser();
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