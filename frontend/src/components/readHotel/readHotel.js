import { getAPI } from '../../services/serviceapi';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';


function ReadHotel() {
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getAPI("http://127.0.0.1:8000/constructions/hotel").then(result => { /* Conferir o LINK com o Fevereiro! */
      console.log(result);
      if(result.status !== "nao existem hoteis")
        setHotel(result);
    })

  }, []);

  function handleDetails(event) {
    let v = event.target.value;
    navigate('/detailshotel', { state: { id: v, } }); /* Conferir o LINK dos detalhes com o Fevereiro! */
  }
  return (
    <div>
      <h1>
        Listagem de Hoteis
      </h1>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Morada</th>
            </tr>
            {hotel && hotel.map(item => {

              return (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.email}</td>
                  <td>{item.telefone}</td>
                  <td>{item.morada}</td>
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

export default ReadHotel;