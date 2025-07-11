import { createContext, useContext, useState, useEffect } from "react";

interface Config {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  server : string;
}


const ConfigContext = createContext<Config | null>(null);

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const server= "https://clearhire.onrender.com";

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('ConfigProvider checking token:', token);
    if (token) {
      setLoggedIn(true);
      console.log('User is logged in');
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
