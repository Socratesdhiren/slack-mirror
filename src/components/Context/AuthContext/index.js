import React, { createContext, useState } from 'react';
import axios from 'axios';

import {
  API_URL,
  JWT_TOKEN,
  USER_FULL_NAME,
  PERMISSION_KEY,
  LANGUAGE_KEY,
} from '../../../constant/appConfig';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from '../../../utils/storageUtil';
import history from '../../../utils/history';
import { isAuthenticated } from '../../../utils/jwtUtil';

const AuthContext = createContext({
  user: {},
  isAuthenticated: false,
});

const AuthProvider = props => {
  const [user, setUser] = useState(getLocalStorage('user') || {});
  const [loading] = useState(false);
  const [authenticated, setAuthenticated] = useState(isAuthenticated() || false);
  const state = { user, loading, authenticated };

  const login = ({ userId, password }) => {
    return axios.post('https://dev.citytech.global/finpulse/web-api/v1' + '/auths', { userId, password }).then(response => {
      setLocalStorage(JWT_TOKEN, response.data.data.token);
      setLocalStorage(PERMISSION_KEY, response.data.data.permissions);
      setLocalStorage(USER_FULL_NAME, response.data.data.fullName);
      setAuthenticated(true);
      history.push('/dashboard');
      return response;
    });
  };

  const logout = () => {
    clearLocalStorage(JWT_TOKEN);
    clearLocalStorage(PERMISSION_KEY);
    clearLocalStorage(USER_FULL_NAME);
    clearLocalStorage(LANGUAGE_KEY);
    setUser({});
    setAuthenticated(false);
    history.push('/');
  };

  return (
    <AuthContext.Provider
      {...props}
      value={{
        ...state,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
