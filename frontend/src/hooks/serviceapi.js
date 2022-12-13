import axios from "axios";

//colocar auth headers, dentro da area comentada

export const getAPI = (url) => {

    async function getData(url){
        return await axios.get(url)
        .then(response => {
            //here
            //console.log(response.data);
            return response.data;

        });
    }

    var r = getData(url);
    //console.log(r);
    return r;
}

export const postAPI = (url, data) => {

    //console.log(data);
    async function getData(url, data){
        return await axios.post(url, data)
        .then(response => {
            //here

            return response.data;
        });
    }

    var r = getData(url, data);

    return r;
}

export const putAPI = (url, data) => {

    //console.log(data);
    async function getData(url, data){
        return await axios.put(url, data)
        .then(response => {
            //here

            return response.data;
        });
    }

    var r = getData(url, data);

    return r;
}

export const deleteAPI = (url, data) => {

    //console.log(data);
    async function getData(url, data){
        return await axios.delete(url, data)
        .then(response => {
            //here

            return response.data;
        });
    }

    var r = getData(url, data);

    return r;
}
