import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem("auth");
      return stored ? JSON.parse(stored) : { user: null, token: null };
    } catch {
      return { user: null, token: null };
    }
  });

  // Spread values for convenience
  const { user, token } = auth;

  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth]);

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
    <AuthContext.Provider value={{ user, token, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
