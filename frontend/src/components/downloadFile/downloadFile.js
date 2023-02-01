import React, { useState, useEffect } from 'react';
import { downloadBytes, getAPI } from '../../services/serviceapi';

function DownloadFile() {
    const [report, setReport] = useState([]);
    const [value, setValue] = useState();

    useEffect(() => {
        getAPI("http://127.0.0.1:8000/filetransfer/relatorio").then(result => {
            console.log(result);
            console.log(result.response);
            setReport(result.response);
            //put first report in value as default
            setValue(JSON.stringify(result.response[0]));
        })

    }, []);

    const handleChange = (event) => {
        console.log(event.target.value);
        setValue(event.target.value);
    }

    const download = () => {
        //var a = document.createElement("a"); //Create <a>
        //a.click();
        console.log(value);
        let dic = JSON.parse(value);
        downloadBytes("http://127.0.0.1:8000/filetransfer/downloadRelatorio", { "id": dic.id, "filename": dic.nome })
            .then(result => {
                console.log("ENVIADO");
                //a.href = result.file;
                //a.download = result.nome;
                //console.log(result.status);
                //a.click();
            })
    }

    const l = report.map(item => {
        return (
            <option key={item.id} value={JSON.stringify(item)}>{item.nome}</option>
        )
    })

    //console.log(report);

    return (
        <div>
            <h1>
                Download File
            </h1>
            <h3>
                File Download using React!
            </h3>
            <div>
                <select value={value} onChange={handleChange}>{l}</select>
            </div>
            <button onClick={download}>Download File</button>
        </div>
    )
}

export default DownloadFile;