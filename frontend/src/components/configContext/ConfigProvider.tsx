import { createContext, useContext, useState, useEffect } from "react";

interface Config {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  server : string;
}


const ConfigContext = createContext<Config | null>(null);

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const server= "https://clearhire-jjyl.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setLoggedIn(true);
    } else {
      console.log('No token found, user not logged in');
    }
  }, []);

  return (
    <ConfigContext.Provider value={{ loggedIn, setLoggedIn , server }}>
      {children}
    </ConfigContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === null) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
