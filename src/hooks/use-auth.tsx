import * as React from "react";

type User = {
  email: string;
  password: string;
  token?: string;
};

type AuthContextType = {
  user: User | undefined;
  login: (user: User) => void;
  register: (user: User) => void;
  logout: () => void;
  error: string;
};

function toVoid() {}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProperties {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProperties) {
  const [user, setUser] = React.useState<User | undefined>();
  const [error, setError] = React.useState<string>("");

  async function login(user: User) {
    const blob = await fetch("/.netlify/functions/login", {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });

    const res = await blob.json();

    if (blob.ok) {
      setError("");
      setUser({
        ...user,
        token: res.token,
      });
    } else {
      setError(res.message);
    }
  }

  async function register(user: User) {
    const blob = await fetch("/.netlify/functions/register", {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });

    const res = await blob.json();

    if (blob.ok) {
      setError("");
      setUser({
        ...user,
        token: res.token,
      });
    } else {
      setError(res.message);
    }
  }

  function logout() {
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, error }}>
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
