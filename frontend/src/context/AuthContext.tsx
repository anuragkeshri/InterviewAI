
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import type { ReactNode } from "react";

interface User {
  id: number;
  full_name: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("access_token")
  );

  const [loading, setLoading] = useState(true);

  // Verify existing token when application loads
  useEffect(() => {
    const controller = new AbortController();

    const verifyUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        const data: User = await response.json();

        setUser(data);

        sessionStorage.setItem(
          "user",
          JSON.stringify(data)
        );
      } catch (error) {
        if (controller.signal.aborted) return;

        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("user");

        setToken(null);
        setUser(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    verifyUser();

    return () => controller.abort();
  }, [token]);

  // Login
  const login = (accessToken: string, userData: User) => {
    sessionStorage.setItem("access_token", accessToken);

    sessionStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setLoading(true);
    setToken(accessToken);
    setUser(userData);
  };

  // Logout
  const logout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setLoading(false);
  };

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
