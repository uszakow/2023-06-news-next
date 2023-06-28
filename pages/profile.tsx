import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/app.context";
import { showNewsCount } from "@/helpers/pipes";
import { ProfileDataChange } from "@/components/ProfileDataChange/ProfileDataChange";
import { Button } from "@/components/ui/Button/Button";
import { Typography } from "@/components/ui/Typography/Typography";
import { fetchUser } from "@/api/fetchUser";
import { UserInterface } from "@/types/User.interface";

const ProfilePage: React.FC = () => {
  const { token, setUserContext, setIsLoading } = useContext(AppContext);
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    setIsLoading(true);

    if (token) {
      const getUserFromApi = async () => {
        try {
          const user = await fetchUser(token);
          setUser(user);
        } catch (error) { }
      };
      getUserFromApi();
    }
    
    setIsLoading(false);
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