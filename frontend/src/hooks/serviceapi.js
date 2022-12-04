import axios from "axios";
import { useState, useEffect} from 'react';

//colocar auth headers, dentro da area comentada

export const GetAPI = (url) => {
    const [response, setResponse] = useState({});

    async function getData(url){
        await axios.get(url)
        .then(response => {
            //here
    
            setResponse(response.data);
            //console.log(response.data);
        });
    }

    useEffect(() => {
        getData(url);
    }, [url]);
    
    return response;
    //console.log(response);
}

export const PutAPI = (url, data) => {
    const [response, setResponse] = useState({});

    async function getData(url, data){
        await axios.put(url, data)
        .then(response => {
            //here
    
            setResponse(response.data);
            //console.log(response.data);
        });
    }

    useEffect(() => {
        getData(url, data);
    }, [url, data]);
    
    return response;
    //console.log(response);
}

export const PostAPI = (url, data) => {
    const [response, setResponse] = useState({});

    async function getData(url, data){
        await axios.post(url, data)
        .then(response => {
            //here
    
            setResponse(response.data);
            //console.log(response.data);
        });
    }

    useEffect(() => {
        getData(url, data);
    }, [url, data]);
    
    return response;
    //console.log(response);
}

export const DeleteAPI = (url, data) => {
    const [response, setResponse] = useState({});

    async function getData(url, data){
        await axios.delete(url, data)
        .then(response => {
            //here
    
            setResponse(response.data);
            //console.log(response.data);
        });
    }

    useEffect(() => {
        getData(url, data);
    }, [url, data]);
    
    return response;
    //console.log(response);
}