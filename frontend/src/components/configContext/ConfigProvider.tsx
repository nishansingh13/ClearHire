import { createContext, useContext, useState } from "react";

interface Config {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}


const ConfigContext = createContext<Config | null>(null);

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <ConfigContext.Provider value={{ loggedIn, setLoggedIn }}>
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
