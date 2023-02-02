import React, { useState, useEffect } from 'react'
import { getAPI } from '../../../services/serviceapi';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
	CCardTitle,
	CCard,
	CCardBody,
	CCardGroup,
	CCol,
	CContainer,
	CForm,
	CCardSubtitle,
	CCardText,
	CCardHeader,
	CNavLink,
	CNavItem,
	CRow,
	CFormInput,
	CButton,
	CHeaderNav,
	CFormCheck,
	CInputGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { cilPencil, cilUserX, cilPlus, cilSearch, cilFolder } from '@coreui/icons';
import { CCollapse } from '@coreui/react'
import DataTable from 'react-data-table-component';
import { func } from 'prop-types';





const columns = [
	{
		name: 'Nome',
		selector: row => row.nome,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Email',
		selector: row => row.mail,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Público',
		selector: row => row.publico,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Morada',
		selector: row => row.morada,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Fechado',
		selector: row => row.arquivado,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Ações',
		cell: row => (
			<><CNavLink type="button" to={`/clientes/editclientes/${row.matricula}`}>
				<CIcon icon={cilPencil} size="xl" />
			</CNavLink>
				<CNavLink type="button" className='mx-1'>
					{/* onChange={} */}
					<CIcon icon={cilFolder} size="xl" />
				</CNavLink></>
		)
	}
];

const temp = [{
	nome: "Ana",
	email: "ana@gmail",
	publico: "Sim",
	morada: "Rua dos patos"
},];


function ReadClientes({ detaildata }) {

	const [pendingClientes, setPendingClientes] = React.useState(true);
	const [clientes, setClientes] = React.useState([]);
	const [filteredClientes, setFilteredClientes] = React.useState([]);
	const navigate = useNavigate();

	function handleSearchClientes(event) {
		setFilteredClientes(
			clientes.filter(cliente => {
				return (cliente.nome && cliente.nome.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(cliente.mail && cliente.mail.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(cliente.publico && cliente.publico.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(cliente.morada && cliente.morada.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(cliente.arquivado && cliente.arquivado.toLowerCase().includes(event.target.value.toLowerCase()))
			}));
	}

	useEffect(() => {

		async function func() {
		
			if (detaildata) {
				const timeout = setTimeout(() => {
					setClientes(detaildata.clientes);
					setFilteredClientes(detaildata.clientes);
					setPendingClientes(false);
				}, 1000);
				return () => clearTimeout(timeout);
			}
			else {
				const { response, err, authenticated } = await getAPI("http://localhost:8000/administration/cliente");
				if (!authenticated)
					navigate("/Login");
				if (response.status !== 404) {
					response.forEach(res => {
						res.arquivado = res.arquivado === true ? "Sim" : "Não";
						res.publico = res.publico === true ? "Sim" : "Não";
					})
					setClientes(response);
					setFilteredClientes(response);
					setPendingClientes(false);
				}
			}
		}
		func();
	}, [])


	return (

		<CCard className="">
			<CCardBody>
				<CRow className='pb-4'>
					<CCol className='col-md-6 col-12'>
						<h1>Clientes</h1>
					</CCol>
					<CCol className='col-md-6 col-12 justify-content-end'>
						<CInputGroup>
							<CFormInput type="search" placeholder="Search" onChange={handleSearchClientes} />
							<CButton type="submit" color="dark" variant="outline">
								<CIcon icon={cilSearch} size="xl" />
							</CButton>&nbsp;
							<CNavLink type="button" to="/addclientes" component={NavLink} className="btn btn-outline-dark ">
								<CIcon icon={cilPlus} size="3xl" />
							</CNavLink>
						</CInputGroup>
					</CCol>
				</CRow>

				<DataTable
					striped
					pagination
					columns={columns}
					data={filteredClientes}
					progressPending={pendingClientes}
					highlightOnHover responsive
					paginationPerPage={5}
					paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50, 75, 100]}
				/>
			</CCardBody>
		</CCard>

	)
}

export default ReadClientes
