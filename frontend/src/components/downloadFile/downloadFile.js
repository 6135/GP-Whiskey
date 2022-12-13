import React, { Component } from 'react';
import { getAPI } from '../../hooks/serviceapi';

class DownloadFile extends Component {

    handleRequest = () => {
        var relatorio = getAPI("http://127.0.0.1:8000/filetransfer/api/relatorio");
        //console.log(relatorio); 
        return relatorio;
    }

    handlePrint = async() => {
        return await this.handleRequest()
            .then((result) => {
                console.log(result[0].id);

                return result[0].id;
            });
    }

    render() {
        var t = this.handlePrint();
        console.log(t);

        return (
            <div>
                <h1>
                    Download File
                </h1>
                <h3>
                    File Download using React!
                </h3>
            </div>
        );
    }
}

export default DownloadFile;