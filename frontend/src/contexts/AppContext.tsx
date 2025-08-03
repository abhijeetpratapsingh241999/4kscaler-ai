import React, { createContext, useState, useEffect, useContext } from 'react';

// Context mein share kiye jaane wale data ke liye TypeScript interface
interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isLoginPopupOpen: boolean;
  setLoginPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Ek naya context banate hain aur use upar define kiye gaye type se jodte hain
const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Yeh ek custom hook hai jisse hum kisi bhi component mein 
 * aasani se AppContext ka data access kar sakte hain.
 */
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Provider component ke props ke liye type
type AppProviderProps = {
  children: React.ReactNode;
};

// Yeh hamara main provider component hai
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('theme') as 'dark' | 'light') || 'dark');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const login = () => {
    setIsLoggedIn(true);
    setLoginPopupOpen(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const value: AppContextType = {
    theme,
    toggleTheme,
    isLoggedIn,
    login,
    logout,
    isLoginPopupOpen,
    setLoginPopupOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
