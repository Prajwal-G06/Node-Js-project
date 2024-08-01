import React, { useState, createContext, ReactNode } from "react";

interface AuthContextType {
  state: string | object | undefined;
  setState: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<string | object | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
