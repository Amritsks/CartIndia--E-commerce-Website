import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [auth, setAuth] = useState({ user: null, token: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        setAuth(parsed);

        if (parsed.token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
        }
      }
    } catch (err) {
      console.error("AuthContext load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveAuth = (tokenValue, userObj) => {
    const newAuth = { token: tokenValue, user: userObj };
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
    axios.defaults.headers.common["Authorization"] = `Bearer ${tokenValue}`;
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("auth");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user: auth.user, token: auth.token, saveAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
