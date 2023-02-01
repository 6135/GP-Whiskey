import { getAPI } from '../../services/serviceapi';
import './readObra.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function ReadObra() {
  const [obra, setObra] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function func() {
      //TODO: filtro de obras encerradas em baixo
      // const { response, err, authenticated } = await getAPI("http://localhost:8000/constructions/obra",{"encerrada":true});
      const { response, err, authenticated } = await getAPI("http://localhost:8000/constructions/obra");
      if (!authenticated)
        navigate("/Login");
      if(response.status !== "nao existem obras")
        setObra(response);
    }
    func();
  }, [])
  function handleDetails(event) {
    let v = event.target.value;
    navigate('/detailsobra', { state: { obraid: v, } });
  }
  return (
    <div>
      <h1>
        Listagem de Obras
      </h1>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Nome</th>
              {/*<th>Número do processo</th>*/}
              {/*<th>Transportadora</th>*/}
              <th>Data de Início</th>
              <th>Data de Conclusão</th>
            </tr>
            {obra && obra.map(item => {

              return (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  {/*<td>{item.n_processo}</td>*/}
                  {/*<td>{item.transportadora}</td>*/}
                  <td>{item.data_inicio}</td>
                  <td>{item.data_conclusao}</td>
                  <td>
                    <button className="button" value={item.id} onClick={handleDetails}>Details</button>
                    <button className="button_delete" value={item.id}>Delete</button>
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

export default ReadObra;