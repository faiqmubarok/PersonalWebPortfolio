import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(() => {
    // Inisialisasi state dari sessionStorage
    const storedAuth = sessionStorage.getItem("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { isAuthenticated: false, user: "" };
  });

  const adminLoggedIn = (userData) => {
    sessionStorage.setItem(
      "auth",
      JSON.stringify({ isAuthenticated: true, user: userData })
    );
    setAuthState({ isAuthenticated: true, user: userData });
  };

  const adminLoggedOut = () => {
    navigate("/");
    sessionStorage.removeItem("auth");
    setAuthState({ isAuthenticated: false, user: "" });
  };

  useEffect(() => {
    // Sync state with sessionStorage on component mount (optional fallback)
    const storedAuth = sessionStorage.getItem("auth");
    if (storedAuth) {
      setAuthState(JSON.parse(storedAuth));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, adminLoggedIn, adminLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node,
};

export default AuthContext;
