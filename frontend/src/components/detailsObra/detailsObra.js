import { getAPI } from '../../hooks/serviceapi';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';


function DetailsObra() {

    //console.log("CRL");
    const location = useLocation();
    console.log("TESTE: " + location.state.obraid);
    //nome
    //data de inicio
    //data de conclusao
    //flag encerrada
    
    //fornecedor

    //restaurante

    //gastos_extra

    //medicao_equip

    //carro

    //foto

    //funcionario

    //relatorio
    
    //reserva_hotel

    //cliente

}

export default DetailsObra;