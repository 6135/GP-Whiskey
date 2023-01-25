import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken , authlogout} from "../services/AuthService";
//colocar auth headers, dentro da area comentada

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
        const abortCont = new AbortController();
    
      fetch(url, {
        signal: abortCont.signal, 
        headers: {
            'Authorization': getToken(),
            'Accept': "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => {
        if (!res.ok) {
          if (res.status === 403 || res.status === 401)
          {
            authlogout();
            navigate("/Login");
          }
            // error coming back from server
            throw Error("Could not fetch the data for that resource");
          }
          
          return res.json();
        })
        .then((data) => {
          // console.log(data)
          setData(data);
          // setData(JSON.parse(data));
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setError(err.message);
          }
        });
   // abort the fetch
   return () => abortCont.abort();
}, [url]);

return { data, error };

}

export const postAPI = async (url, data) => {

    //console.log(data);

    return await axios.post(url, data)
        .then(response => {
            //here
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });

}
