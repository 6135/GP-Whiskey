import React, { useState, useEffect } from 'react'
import { postAPI } from '../../../services/serviceapi';
import { useNavigate, useLocation } from "react-router-dom";

import {
	CCardGroup,
	CCol,
	CContainer,
	CRow,
} from '@coreui/react'
import ReadViaturas from '../viaturas/readviaturas';
import ReadFuncionarios from '../funcionarios/ReadFuncionarios';
import ReadGastosObra from '../gastosextra/gastosextra';
import ReadRestaurantes from '../Restaurantes/readrestaurantes';
import ReadFornecedores from '../fornecedores/fornecedores';
import ReadEquipamentos from '../medicoes/equipamentos';

import ReadHoteis from '../hoteis/hoteis.js'


function ReadDetalhes() {
	//Neste ecra, entramos no scope de apenas UMA obra
	const [obra, setObra] = useState([]);
	const location = useLocation();
	const navigate = useNavigate();

 useEffect(() => {
    async function func() {
        const { response, err, authenticated } = await postAPI("http://127.0.0.1:8000/constructions/detailsobra", { "obraid": location.state.obraid });
        if (!authenticated)
         navigate("/Login");          
        setObra(response);
      }
      func();
}, []);

	return (
		<div className="bg-light d-flex flex-row align-items-top">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md={10}>
						<CCardGroup className='min-vh-25'>
							<ReadFuncionarios detaildata={{ funcionarios: obra.funcionarios }} />
						</CCardGroup>
						<CCardGroup className='mt-3 min-vh-25'>
							<ReadEquipamentos detaildata={{ equipamentos: obra.equipamentos }} />
						</CCardGroup>
						<CCardGroup className='mt-3 min-vh-25' >
							<ReadViaturas detaildata={{ carros: obra.carros }} />
						</CCardGroup>
						<CCardGroup className='mt-3 min-vh-25'>
							<ReadGastosObra detaildata={{ gastos_extra: obra.gastos_extra }} />
						</CCardGroup>
						<CCardGroup className='mt-3 min-vh-25'>
							<ReadRestaurantes detaildata={{ restaurantes: obra.restaurantes }} />
						</CCardGroup>
						<CCardGroup className='my-3 min-vh-25'>
							<ReadHoteis detaildata={{ hoteis: obra.hoteis }} />
						</CCardGroup>
						<CCardGroup className='mt-3 min-vh-25'>
							<ReadFornecedores detaildata={{ fornecedores: obra.fornecedores }} />
						</CCardGroup>

					</CCol>
				</CRow>
			</CContainer>
		</div>
	)
}

export default ReadDetalhes
