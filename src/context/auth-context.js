import { createContext, useContext, useEffect, useState } from "react";
import { createUser, getUser } from "../services/user-service";
import { getFavorites } from "../services/favorites-service";
import * as auth from "../services/auth-services";

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    getUser().then(setUser).catch(console.log);
  }, []);

  useEffect(() => {
    getFavorites().then((data) => {
      setFavorites([...data])
  }).catch(console.log);
  }, [currentPage]);

  function login(credentials) {
    auth.login(credentials).then(setUser).catch(console.log);
  }

  function logout() {
    auth.logout().then(() => setUser(null));
  }

  function signup(userData) {
    createUser(userData).then(setUser).catch(console.log);
  }

  const value = {
    user,
    favorites,
    setFavorites,
    currentPage,
    setCurrentPage,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
