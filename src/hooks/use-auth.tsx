import * as React from "react";

type User = {
  email: string;
};

type AuthContextType = {
  user: User | undefined;
  login: (user: User) => void;
  logout: () => void;
};

function toVoid() {}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProperties {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProperties) {
  const [user, setUser] = React.useState<User | undefined>();

  function login(user: User) {
    console.log(user);
    setUser(user);
  }

  function logout() {
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context)
    throw new Error("useAuth needs to be used within an AuthProvider");

  return context;
}
