import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosConnect from "../Token/axios.js";
import { getItemFromLS, setItemsInLS, removeItemFromLS } from "../Token/script.js";

// Define the UserContext with default values
export const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  signin: () => {},
  signout: () => {},
});

// Create a provider component
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = getItemFromLS('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
      // Set Authorization header if user is logged in
      axiosConnect.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setItemsInLS('user', JSON.stringify(userData));
    axiosConnect.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    removeItemFromLS('user');
    delete axiosConnect.defaults.headers.common['Authorization'];
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, signin: handleLogin, signout: handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

// PropTypes validation for the UserContextProvider component
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};