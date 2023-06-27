import { api } from "@/config";
import { UserSummaryInterface } from "@/types/UserSummary.interface";
import { PropsWithChildren, createContext, useState } from "react";

interface AppContextProps {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  token: string | null;
  user: UserSummaryInterface | null;
  setUser: () => void;
}

const initialAppContext: AppContextProps = {
  isLoading: true,
  setIsLoading: () => { },
  token: null,
  user: null,
  setUser: () => { }
};

export const AppContext = createContext<AppContextProps>(initialAppContext);

export const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(initialAppContext.isLoading);
  const [token, setToken] = useState(initialAppContext.token);
  const [user, setUser] = useState(initialAppContext.user);

  const manageUser = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await api.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setToken(token);
        setUser(response.data);
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
    setUser: manageUser
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
