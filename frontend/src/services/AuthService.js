const API_Auth_URL = "http://localhost:8000/administration/login";
const TOKEN_KEY = "token";
const USER_KEY = "user";
const ROLE_KEY = "role";

export const authlogout = () => {
   return window.sessionStorage.clear();
};

export const getCurrentUser = () => {
  const user = window.sessionStorage.getItem(USER_KEY);
  if (user) {
    return user;
  }
  return null;
};

export const getCurrentRole = () => {
  const role = window.sessionStorage.getItem(ROLE_KEY);
  if (role) {
    return role;
  }
  return null;
};

export const saveToken  = (token) => {
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, token);
}
export const getToken  = () => {
  return window.sessionStorage.getItem(TOKEN_KEY);
}

export const saveUser  = (user) => {
  window.sessionStorage.removeItem(USER_KEY);
  window.sessionStorage.setItem(USER_KEY, user);
}

export const saveRole  = (role) => {
  window.sessionStorage.removeItem(ROLE_KEY);
  window.sessionStorage.setItem(ROLE_KEY, role);
}

export const isLoggedIn  = () => {
  const authToken = window.sessionStorage.getItem(TOKEN_KEY);
  return (authToken !== null) ? true : false;
}

export const login_api = async (email, password) => {
  let success = "";
  let err = "";

  const abortCont = new AbortController();
  await fetch(
        API_Auth_URL,
        {
            signal: abortCont.signal,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "email": email,
              "password": password,
            })
        }
    ).then((res) => {
      if(!res.ok)
      {
        throw Error("Invalid Credentials, try again.");
      }
     return res.json();
    }).then((data) => {
      saveToken("JWT " + data.access);
      saveUser(email);
      saveRole(data.authenticatedUser.role);
      success = "done";
    }).catch((error) => {
      authlogout();
      if (error.name === "AbortError") {
        console.log("fetch aborted");
        return () => abortCont.abort();
      } else {
        err = error.message;
      }
    });
    return {success,err}
  };