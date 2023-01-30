import axios from "axios";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
const API_Auth_URL = "http://localhost:8000/administration/login";
const TOKEN_KEY = "token";
const USER_KEY = "user";
const ROLE_KEY = "role";

export const authlogout = () => {
  delete_cookie(TOKEN_KEY);
  delete_cookie(USER_KEY);
  delete_cookie(ROLE_KEY);
};

export const getCurrentUser = () => {
  const user = read_cookie(USER_KEY);
  if (user) {
    return user;
  }
  return null;
};

export const getCurrentRole = () => {
  const role = read_cookie(ROLE_KEY);
  if (role) {
    return role;
  }
  return null;
};

export const saveToken = (token) => {
  bake_cookie(TOKEN_KEY, token);
}

export const getToken = () => {
  return read_cookie(TOKEN_KEY);
}

export const saveUser = (user) => {
  bake_cookie(USER_KEY, user);
}

export const saveRole = (role) => {
  bake_cookie(ROLE_KEY, role);
}

export const isLoggedIn = () => {
  const authToken = read_cookie(TOKEN_KEY);
  return (!Array.isArray(authToken)) ? true : false;
}

export const login_api = async (email, password) => {
  let success = "";
  let err = "";

  await axios.post(
    API_Auth_URL,
    {
      "email": email,
      "password": password,
    },
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => {
    if (res.status !== 200) {
      throw Error("Invalid Credentials, try again.");
    }
    saveToken("JWT " + res.data.access);
    saveUser(email);
    saveRole(res.data.authenticatedUser.role);
    success = "done";
  }).catch((error) => {
    authlogout();
    err = "Invalid Credentials, try again.";
  });

  return { success, err }
};  