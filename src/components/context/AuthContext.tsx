import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  user: string;
  isAuth: boolean;
  errors: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | undefined>(undefined);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState<any | null>(null);

  const contextValue: AuthContextProps = {
    user,
    isAuth,
    errors,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
