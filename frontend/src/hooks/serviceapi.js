import axios from "axios";
import { getToken, authlogout } from "../services/AuthService";
//colocar auth headers, dentro da area comentada

export const getAPI = async (url) => {
  const abortCont = new AbortController();
  let response = null;
  let err = "";
  let authenticated = true;
  let token = getToken();
  let headers = {
    'Authorization': token,
    'Accept': "application/json",
    "Content-Type": "application/json",
  };
  let data = token !== null ? {
    signal: abortCont.signal,
    headers: headers
  } : { signal: abortCont.signal };

  await axios.get(url, data)
    .then((res) => {
      if (res.status !== 200) {
        // error coming back from server
        throw Error("Could not fetch the data for that resource");
      }

      response = res.data;
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("fetch aborted");
        return () => abortCont.abort();
      } else {
        if (error.response.status === 403 || error.response.status === 401) {
          authlogout();
          authenticated = false;
        }
        err = error.message;
      }
    });

  return { response, err, authenticated }
}

export const postAPI = async (url, data) => {
  let token = getToken();
  let headers = {
    'Authorization': token,
    'Accept': "application/json",
    "Content-Type": "application/json",
  };
  let response = null;
  let err = "";
  let authenticated = true;

  await axios.post(url, data, token !== null ? {headers:headers} : null)
    .then((res) => {
      if (res.status !== 200) {
        throw Error("Could not fetch the data for that resource");
      }
      response = res.data;
    }).catch(function (error) {
      
      if (error.response.status === 403 || error.response.status === 401) {
        authlogout();
        authenticated = false;
      }
      err = error.message;
    });

  return { response, err, authenticated }
}
