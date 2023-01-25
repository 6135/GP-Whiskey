import { useFetch } from '../../hooks/serviceapi';
import './readObra.css';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';


function ReadObra() {
  const {data: obra, error } = useFetch("http://localhost:8000/constructions/obra");
  const navigate = useNavigate();
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
              <th>Data de Início</th>
              <th>Data de Conclusão</th>
            </tr>
            {obra && obra.map(item => {

              return (
                <tr key={item.id}>
                  <td>{item.nome}</td>
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