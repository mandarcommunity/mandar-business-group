import { DeviceEventEmitter } from 'react-native';
import { createContext,

  useContext,

  useEffect,

  useState,

} from "react";

import {

  getAccessToken,

  getUser,

  saveAccessToken,

  saveRefreshToken,

  saveUser,

  clearStorage,

} from "../utils/storage";

interface AuthContextType {

  isLoggedIn: boolean;

  user: any;

  loading: boolean;

  login: (
    data: any
  ) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

export const AuthProvider = ({
  children,
}: any) => {

  const [

    isLoggedIn,

    setIsLoggedIn,

  ] = useState(false);

  const [
    user,

    setUser,
  ] = useState(null);

  const [
    loading,

    setLoading,
  ] = useState(true);

  /* RESTORE SESSION */
  useEffect(() => {

    restoreSession();
    
    const sub = DeviceEventEmitter.addListener('force_logout', async () => {
      setIsLoggedIn(false);
      setUser(null);
    });
    
    return () => sub.remove();

  }, []);

  const restoreSession =
    async () => {

      try {

        const token =
          await getAccessToken();

        const savedUser =
          await getUser();

        if (
          token &&
          savedUser
        ) {

          setIsLoggedIn(
            true
          );

          setUser(
            savedUser
          );
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }

};

  /* LOGIN */
  const login =
    async (
      data: any
    ) => {

      await saveAccessToken(
        data.accessToken
      );

      await saveRefreshToken(
        data.refreshToken
      );

      await saveUser(
        data.user
      );

      setUser(
        data.user
      );

      setIsLoggedIn(
        true
      );
};

  /* LOGOUT */
  const logout =
    async () => {

      await clearStorage();

      setUser(null);

      setIsLoggedIn(
        false
      );
};

  return (

    <AuthContext.Provider

      value={{

        isLoggedIn,

        user,

        loading,

        login,

        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
};

export const useAuth =
  () => useContext(
    AuthContext
  );