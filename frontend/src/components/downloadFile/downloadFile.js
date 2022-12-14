import React, { useState, useEffect } from 'react';
import { getAPI, postAPI } from '../../hooks/serviceapi';

function DownloadFile() {
    const [report, setReport] = useState([]);
    const [value, setValue] = useState();

    useEffect(() => {
        getAPI("http://127.0.0.1:8000/filetransfer/api/relatorio").then(result => {
            //console.log(result);
            setReport(result);
            //put first report in value as default
            setValue(result[0].id);
        })

    }, []);

    const handleChange = (event) => {
        //console.log(event.target.value);
        setValue(event.target.value);   
    }
    
    const download = () => {
        var a = document.createElement("a"); //Create <a>
        //a.click();
        postAPI("http://127.0.0.1:8000/filetransfer/api/downloadRelatorio", {"id": value})
        .then(result => {
            console.log("ENVIADO");
            a.href = result.report_bin;
            a.download = result.nome;
            a.click();
        })
        
        /*var a = document.createElement("a"); //Create <a>
        a.href = value; //Image Base64 Goes here
        a.download = "novo.txt"; //File name Here
        a.click(); //Downloaded file*/
    }

    const l = report.map(item => {
        return (
            <option value={item.id}>{item.nome}</option>
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