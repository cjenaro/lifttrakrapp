import * as React from "react";
import { useMutation } from "react-query";

type User = {
  email: string;
  password: string;
  id?: string;
  token?: string;
};

type Error = {
  message: string;
};

type Res = {
  token: string;
  user_id: string;
};

type AuthContextType = {
  user: User | undefined;
  login: (user: User) => void;
  register: (user: User) => void;
  logout: () => void;
  error: string;
  isLoading: boolean;
};

function toVoid() {}

async function loginFN(user: User) {
  const blob = await fetch("/.netlify/functions/login", {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });

  return await blob.json();
}

async function registerFN(user: User) {
  const blob = await fetch("/.netlify/functions/register", {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });

  return await blob.json();
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProperties {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProperties) {
  const afterMutation = {
    onSuccess(data: Res, vars: User) {
      setError("");
      setUser({
        ...vars,
        token: data.token,
        id: data.user_id,
      });
    },

    onError(err: Error) {
      setError(err.message);
    },
  };

  const { mutate: login, isLoading: loginLoading } = useMutation(
    loginFN,
    afterMutation
  );
  const { mutate: register, isLoading: registerLoading } = useMutation(
    registerFN,
    afterMutation
  );

  const [user, setUser] = React.useState<User | undefined>();
  const [error, setError] = React.useState<string>("");

  function logout() {
    setUser(undefined);
  }

  const isLoading = registerLoading || loginLoading;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, error, isLoading }}
    >
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
