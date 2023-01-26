import React, { useState, useEffect } from 'react';
import { postAPI, getAPI } from '../../hooks/serviceapi';
import { useNavigate } from "react-router-dom";
function DownloadFile() {
    const [value, setValue] = useState();
    const [report, setReport] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        async function func() {
            const { response, err, authenticated } = await getAPI("http://127.0.0.1:8000/filetransfer/relatorio");
            if (!authenticated)
                navigate("/Login");

            setReport(response);
        }
        func();
    }, [])

    console.log(report);
    //put first report in value as default
    // setValue(report[0].id);

    const handleChange = (event) => {
        console.log(event.target.value);
        setValue(event.target.value);
    }

    const download = async () => {
        var a = document.createElement("a"); //Create <a>
        //a.click();
        const { response: result, err, authenticated } = await postAPI("http://127.0.0.1:8000/filetransfer/downloadRelatorio", { "id": value });
        if (!authenticated)
            navigate("/Login");

        console.log("ENVIADO");
        a.href = result.report_bin;
        a.download = result.nome;
        a.click();


        /*var a = document.createElement("a"); //Create <a>
        a.href = value; //Image Base64 Goes here
        a.download = "novo.txt"; //File name Here
        a.click(); //Downloaded file*/
    }

    return (
        <div>
            <h1>
                Download File
            </h1>
            <h3>
                File Download using React!
            </h3>
            <div>
                {report && <select value={value} onChange={handleChange}>{report.map(item => {
                    return (
                        <option key={item.id} value={item.id}>{item.nome}</option>
                    )
                })}</select>}
            </div>
            <button onClick={download}>Download File</button>
        </div>
    )
}

export default DownloadFile;