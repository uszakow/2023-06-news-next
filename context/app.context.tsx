import { PropsWithChildren, createContext, useState } from "react";
import { useUserApi } from "@/api/useUserApi";
import { UserInterface } from "@/types/User.interface";

interface AppContextProps {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  token: string | null;
  user: UserInterface | null;
  setUserContext: () => void;
}

const initialAppContext: AppContextProps = {
  isLoading: true,
  setIsLoading: () => { },
  token: null,
  user: null,
  setUserContext: () => { }
};

export const AppContext = createContext<AppContextProps>(initialAppContext);

export const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { getUserApi } = useUserApi();

  const [isLoading, setIsLoading] = useState(initialAppContext.isLoading);
  const [token, setToken] = useState(initialAppContext.token);
  const [user, setUser] = useState(initialAppContext.user);

  const manageUser = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const user = await getUserApi(token);

        setToken(token);
        setUser(user);
      } catch (error) { }
    } else {
      setToken(null);
      setUser(null);
    }

    setIsLoading(false);
  };

  const appContextValue: AppContextProps = {
    isLoading,
    setIsLoading,
    token,
    user,
    setUserContext: manageUser
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
