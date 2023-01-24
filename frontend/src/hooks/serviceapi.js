import axios from "axios";

//colocar auth headers, dentro da area comentada

export const getAPI = (url) => {
    async function getData(url) {
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
    async function getData(url, data) {
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
    async function getData(url, data) {
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
    async function getData(url, data) {
        return await axios.delete(url, data)
            .then(response => {
                //here

                return response.data;
            });
    }

    var r = getData(url, data);

    return r;
}

export const downloadBytes = (url, data) => {

    async function getData(url, data) {
        return await axios(url, {
            url: url,
            method: 'POST',
            responseType: 'blob',
            data: data
        })
            .then(response => {
                console.log(response);
                console.log(response.data);
                const href = URL.createObjectURL(response.data);

                // create "a" HTML element with href to file & click
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', data["filename"]); //or any other extension
                document.body.appendChild(link);
                link.click();

                // clean up "a" element & remove ObjectURL
                document.body.removeChild(link);
                URL.revokeObjectURL(href);

            });
    }

    var r = getData(url, data);
    //console.log(r);
    return r;
}