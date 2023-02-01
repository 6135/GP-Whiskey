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
import CTableCell from '../../../components/CTableCell';




const columns = [
	{
		name: 'Nome',
		selector: row => row.nome,
		sortable: true,
		reorder: true,
		cell: row => <CTableCell data={row.nome} />
	},
	{
		name: 'Email',
		selector: row => row.email,
		sortable: true,
		reorder: true,
		cell: row => <CTableCell data={row.email} />
	},
	{
		name: 'Cargo',
		selector: row => row.cargo,
		sortable: true,
		reorder: true,
		cell : row => <CTableCell data={row.cargo} />
	},
	{
		name: 'Seguro de Saúde',
		selector: row => row.seguro_saude,
		sortable: true,
		reorder: true,
		cell : row => <CTableCell data={row.seguro_saude} />
	},
	{
		name: 'Data Início',
		selector: row => row.data_inicio,
		sortable: true,
		reorder: true,
		cell : row => <CTableCell data={row.data_inicio} />
	},
	{
		name: 'Data Conclusão',
		selector: row => row.data_conclusao,
		sortable: true,
		reorder: true,
		cell : row => <CTableCell data={row.data_conclusao} />
	}, {
		name: 'Ações',
		cell: row => (
			<div>
				<CNavLink type="button" to={`/funcionarios/editfuncionarios/${row.matricula}`}>
					<CIcon icon={cilPencil} size="xl" />
				</CNavLink>
				<CNavLink type="button" className='mx-1'>
					{/* onChange={} */}
					<CIcon icon={cilFolder} size="xl" />
				</CNavLink>
			</div>
		)
	}
];

const temp = [{
	nome: "Ana",
	email: "ana@gmail",
	cargo: "Engenheiro de Obra",
	seguro_saude: "Fidelidade",
	data_inicio: "01-01-2023",
	data_conclusao: "01-01-2024",
}, {
	nome: "Ana",
	email: "ana@gmail",
	cargo: "Engenheiro de Obra",
	seguro_saude: "Fidelidade",
	data_inicio: "01-01-2023",
	data_conclusao: "01-01-2024",
}, {
	nome: "Ana",
	email: "ana@gmail",
	cargo: "Engenheiro de Obra",
	seguro_saude: "Fidelidade",
	data_inicio: "01-01-2023",
	data_conclusao: "01-01-2024",
}, {
	nome: "Ana",
	email: "ana@gmail",
	cargo: "Engenheiro de Obra",
	seguro_saude: "Fidelidade",
	data_inicio: "01-01-2023",
	data_conclusao: "01-01-2024",
}, {
	nome: "Ana",
	email: "ana@gmail",
	cargo: "Engenheiro de Obra",
	seguro_saude: "Fidelidade",
	data_inicio: "01-01-2023",
	data_conclusao: "01-01-2024",
}, {
	nome: "Ana",
	email: "ana@gmail",
	cargo: "Engenheiro de Obra",
	seguro_saude: "Fidelidade",
	data_inicio: "01-01-2023",
	data_conclusao: "01-01-2024",
},];


function ReadFuncionarios({ detaildata }) {


	const [pendingFuncionarios, setPendingFuncionarios] = React.useState(true);
	const [funcionarios, setFuncionarios] = React.useState([]);
	const [filteredFuncionarios, setFilteredFuncionarios] = React.useState([]);

	function handleSearchFuncionarios(event) {
		setFilteredFuncionarios(
			funcionarios.filter(funcionario => {
				return (funcionario.nome && funcionario.nome.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(funcionario.email && funcionario.email.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(funcionario.cargo && funcionario.cargo.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(funcionario.seguro_saude && funcionario.seguro_saude.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(funcionario.data_inicio && funcionario.data_inicio.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(funcionario.data_conclusao && funcionario.data_conclusao.toLowerCase().includes(event.target.value.toLowerCase()))

			}));
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setFuncionarios(detaildata.funcionarios);
			setFilteredFuncionarios(detaildata.funcionarios);
			setPendingFuncionarios(false);
		}, 2000);
		return () => clearTimeout(timeout);
	

	}, [detaildata])


	return (

		<CCard className="">
			<CCardBody>
				<CRow className='pb-4'>
					<CCol>
						<h1>Funcionários</h1>
					</CCol>
					<CCol className='justify-content-end'>
						<CInputGroup>
							<CFormInput type="search" placeholder="Search" onChange={handleSearchFuncionarios} />
							<CButton type="submit" color="dark" variant="outline">
								<CIcon icon={cilSearch} size="xl" />
							</CButton>&nbsp;
							<CNavLink type="button" to="/addFuncionarios" component={NavLink} className="btn btn-outline-dark ">
								<CIcon icon={cilPlus} size="3xl" />
							</CNavLink>
						</CInputGroup>
					</CCol>
				</CRow>

				<DataTable style={{ width: '100px' }}
					striped
					pagination
					columns={columns}
					data={filteredFuncionarios}
					progressPending={pendingFuncionarios}
					highlightOnHover responsive
					paginationPerPage={5}
					paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50, 75, 100]}
				/>
			</CCardBody>
		</CCard>

	)
}

export default ReadFuncionarios
