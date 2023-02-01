import React, { useState, useEffect } from 'react'
import { getAPI } from '../../../services/serviceapi';
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from 'react-router-dom';
import {
	CCardTitle,
	CCard,
	CCardBody,
	CCardGroup,
	CCol,
	CContainer,
	CForm,
	CNavLink,
	CRow,
	CFormInput,
	CButton,
	CInputGroup,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilPencil, cilFolder, cilPlus, cilSearch } from '@coreui/icons'
import DataTable from 'react-data-table-component';


const columns = [
	{
		name: 'Matricula',
		selector: row => row.matricula,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Marca',
		selector: row => row.marca,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Ano',
		selector: row => row.ano,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Seguradora',
		selector: row => row.seguradora,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Data Inicio',
		selector: row => row.data_inicio,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Data fim',
		selector: row => row.data_fim,
		sortable: true,
		reorder: true,
	}, {
		name: 'Ações',
		cell: row => (
			<><CNavLink type="button" to={`/viaturas/editviaturas/${row.matricula}`}>
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
	matricula: "Mat1",
	marca: "BWM",
	ano: "2030",
	seguradora: "Fidelidade",
	data_inicio: "01-01-2023",
	data_fim: "01-01-2024",
}, {
	matricula: "Mat2",
	marca: "Opel",
	ano: "2029",
	seguradora: "Seguros",
	data_inicio: "01-01-2021",
	data_fim: "02-02-2022",
}, {
	matricula: "Mat1",
	marca: "BWM",
	ano: "2030",
	seguradora: "Fidelidade",
	data_inicio: "01-01-2023",
	data_fim: "01-01-2024",
}, {
	matricula: "Mat2",
	marca: "Opel",
	ano: "2029",
	seguradora: "Seguros",
	data_inicio: "01-01-2021",
	data_fim: "02-02-2022",
}, {
	matricula: "Mat1",
	marca: "BWM",
	ano: "2030",
	seguradora: "Fidelidade",
	data_inicio: "01-01-2023",
	data_fim: "01-01-2024",
}, {
	matricula: "Mat2",
	marca: "Opel",
	ano: "2029",
	seguradora: "Seguros",
	data_inicio: "01-01-2021",
	data_fim: "02-02-2022",
},];
function ReadViaturas({detaildata}) {
	const [pendingViaturas, setPendingViaturas] = React.useState(true);
	const [viaturas, setViaturas] = React.useState([]);
	const [filteredViaturas, setFilteredViaturas] = React.useState([]);


	function handleSearchViatura(event) {
		console.log(event.target.value);
		setFilteredViaturas(
			viaturas.filter(viatura => {
				return (viatura.matricula && viatura.matricula.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(viatura.marca && viatura.marca.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(viatura.ano && viatura.ano.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(viatura.seguradora && viatura.seguradora.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(viatura.data_inicio && viatura.data_inicio.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(viatura.data_fim && viatura.data_fim.toLowerCase().includes(event.target.value.toLowerCase()))

			}));
	}

	useEffect(() => {


		const timeout = setTimeout(() => {
			console.log(detaildata.carros);
			setViaturas(detaildata.carros);
			setFilteredViaturas(detaildata.carros);
			setPendingViaturas(false);
		}, 1000);
		return () => clearTimeout(timeout);

	}, [detaildata])


	return (

		<CCard className="p-4">
			<CCardBody>
				

				<CRow className='pb-4'>
										<CCol>
											<h1>Viaturas</h1>
										</CCol>
										<CCol className='justify-content-end'>
											<CInputGroup>
												<CFormInput type="search" placeholder="Search" onChange={handleSearchViatura} />
												<CButton type="submit" color="dark" variant="outline">
													<CIcon icon={cilSearch} size="xl" />
												</CButton>&nbsp;
												<CNavLink type="button" to="/addviaturas" component={NavLink} className="btn btn-outline-dark ">
													<CIcon icon={cilPlus} size="3xl" />
												</CNavLink>
											</CInputGroup>
										</CCol>
									</CRow>

				<DataTable
					striped
					pagination
					columns={columns}
					data={filteredViaturas}
					progressPending={pendingViaturas}
					highlightOnHover
					paginationPerPage={5}
					paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50, 75, 100]}
				/>

			</CCardBody>
		</CCard>

	)
}

export default ReadViaturas
