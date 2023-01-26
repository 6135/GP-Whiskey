import { getAPI } from '../../services/serviceapi';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';


function ReadCarro() {
  const [carro, setCarro] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getAPI("http://127.0.0.1:8000/constructions/carro").then(result => { /* Conferir o LINK com o Fevereiro! */
      console.log(result);
      if(result.status !== "nao existem carros")
        setCarro(result);
    })

  }, []);

  function handleDetails(event) {
    let v = event.target.value;
    navigate('/detailscarro', { state: { id: v, } }); /* Conferir o LINK dos detalhes com o Fevereiro! */
  }
  return (
    <div>
      <h1>
        Listagem de Viaturas
      </h1>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Matrícula</th>
              <th>Marca</th>
              <th>Ano</th>
              <th>Seguradora</th>
              <th>Data de início</th>
              <th>Data de fim</th>
            </tr>
            {carro && carro.map(item => {

              return (
                <tr key={item.id}>
                  <td>{item.matricula}</td>
                  <td>{item.marca}</td>
                  <td>{item.ano}</td>
                  <td>{item.seguradora}</td>
                  <td>{item.data_inicio}</td>
                  <td>{item.data_fim}</td>
                  <td>
                    <button value={item.id} onClick={handleDetails}>Detalhes</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReadCarro;