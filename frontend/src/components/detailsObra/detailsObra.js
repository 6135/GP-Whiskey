import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postAPI } from '../../services/serviceapi';

function DetailsObra() {
    //Neste ecra, entramos no scope de apenas UMA obra
    const [obra, setObra] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    // console.log("TESTE: " + location.state.obraid);

    useEffect(() => {
        async function func() {
            const { response, err, authenticated } = await postAPI("http://127.0.0.1:8000/constructions/detailsobra", { "obraid": location.state.obraid });
            if (!authenticated)
                navigate("/Login");


            setObra(response);
        }
        func();
    }, []);

    //nome
    //data de inicio
    //data de conclusao
    //flag encerrada

    /* FEVEREIRO -> Temos colocar mais uma variavel com o nome: 'Numero do processo'!!!!!*/
    /* FEVEREIRO -> Temos colocar mais uma variavel com o nome: 'Transportadora'!!!!!*/

    //gastos_extra

    //medicao_equip

    //reserva_hotel

    //cliente


    return (

        <div>
            <h1>Detalhes da Obra</h1>
            <div>
                <p>Nome: {obra.obra_nome}</p>
                <p>Data de inicio: {obra.obra_data_inicio}</p>
                <p>Data de conclusao: {obra.obra_data_conclusao}</p>
                <p>Encerrada: {obra.encerrada}</p>
            </div>
            <div>
                <p>Cliente: {obra.cliente_nome}   <button>Details</button></p>
            </div>

            <div>
                {/* Esta operacao é apenas no scope desta obra. Estamos apenas a associar funcionarios */}
                <div>Funcionarios: {obra.funcionarios && obra.funcionarios.map((item, index) => {
                    return (
                        <div key={item.email}>
                            <p>{item.email}</p>
                        </div>
                    )
                })} <button>Assign to Obra</button>
                    <button>De-assign from Obra</button>
                    <button>Check Funcionarios</button>
                </div>
            </div>

            <div>
                {/* Esta operacao é apenas no scope desta obra. Estamos apenas a associar registo de carros */}
                <div>Registo de carros: {obra.carros && obra.carros.map((item,index) => {
                    return (
                        <p key={item}>{item}</p>
                                                // Fix this here please if it errors

                    )
                })} <button>Assign to Obra</button>
                    <button>De-assign from Obra</button>
                    <button>Check Carros</button>
                </div>
            </div>

            <div>
                {/* Esta operacao é apenas no scope desta obra. Estamos apenas a associar registo de restaurantes */}
                <div>Registo de restaurantes: {obra.restaurantes && obra.restaurantes.map((item,index) => {
                    return (
                        <p key={item}>{item}</p>
                                                // Fix this here please if it errors

                    )
                })} <button>Assign to Obra</button>
                    <button>De-assign from Obra</button>
                    <button>Check Restaurantes</button>
                </div>
            </div>

            <div>
                {/* Esta operacao é apenas no scope desta obra. Estamos apenas a associar registo de fornecedores */}
                <p>Registo de fornecedores: {obra.fornecedores && obra.fornecedores.map((item,index) => {
                    return (
                        <p key={item}>{item}</p>
                        // Fix this here please if it errors
                    )
                })} <button>Assign to Obra</button>
                    <button>De-assign from Obra</button>
                    <button>Check Fornecedores</button>
                </p>
            </div>

            <div><p>Fotos: <button>Consult and Edit</button></p></div>

            <div><p>Relatorios: <button>Consult and Edit</button></p></div>
        </div>
    );

}

export default DetailsObra;