import React, { useState, useEffect } from 'react'
import { getAPI } from '../../../hooks/serviceapi';
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
	CTable,
	CTableHead,
	CTableBody,
	CTableRow,
	CTableHeaderCell,
	CTableDataCell,
	CCollapse
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilPencil, cilUserX, cilPlus, cilSearch } from '@coreui/icons'
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
	},
];

const temp = [{
	matricula: 		"Mat1",
	marca: 			"BWM",
	ano: 			"2030",
	seguradora: 	"Fidelidade",
	data_inicio: 	"01-01-2023",
	data_fim: 		"01-01-2024",
}, {
	matricula: 		"Mat2",
	marca: 			"Opel",
	ano: 			"2029",
	seguradora: 	"Seguros",
	data_inicio: 	"01-01-2021",
	data_fim: 		"02-02-2022",
},{
	matricula: 		"Mat1",
	marca: 			"BWM",
	ano: 			"2030",
	seguradora: 	"Fidelidade",
	data_inicio: 	"01-01-2023",
	data_fim: 		"01-01-2024",
}, {
	matricula: 		"Mat2",
	marca: 			"Opel",
	ano: 			"2029",
	seguradora: 	"Seguros",
	data_inicio: 	"01-01-2021",
	data_fim: 		"02-02-2022",
},{
	matricula: 		"Mat1",
	marca: 			"BWM",
	ano: 			"2030",
	seguradora: 	"Fidelidade",
	data_inicio: 	"01-01-2023",
	data_fim: 		"01-01-2024",
}, {
	matricula: 		"Mat2",
	marca: 			"Opel",
	ano: 			"2029",
	seguradora: 	"Seguros",
	data_inicio: 	"01-01-2021",
	data_fim: 		"02-02-2022",
},{
	matricula: 		"Mat1",
	marca: 			"BWM",
	ano: 			"2030",
	seguradora: 	"Fidelidade",
	data_inicio: 	"01-01-2023",
	data_fim: 		"01-01-2024",
}, {
	matricula: 		"Mat2",
	marca: 			"Opel",
	ano: 			"2029",
	seguradora: 	"Seguros",
	data_inicio: 	"01-01-2021",
	data_fim: 		"02-02-2022",
},{
	matricula: 		"Mat1",
	marca: 			"BWM",
	ano: 			"2030",
	seguradora: 	"Fidelidade",
	data_inicio: 	"01-01-2023",
	data_fim: 		"01-01-2024",
}, {
	matricula: 		"Mat2",
	marca: 			"Opel",
	ano: 			"2029",
	seguradora: 	"Seguros",
	data_inicio: 	"01-01-2021",
	data_fim: 		"02-02-2022",
},{
	matricula: 		"Mat1",
	marca: 			"BWM",
	ano: 			"2030",
	seguradora: 	"Fidelidade",
	data_inicio: 	"01-01-2023",
	data_fim: 		"01-01-2024",
}, {
	matricula: 		"Mat2",
	marca: 			"Opel",
	ano: 			"2029",
	seguradora: 	"Seguros",
	data_inicio: 	"01-01-2021",
	data_fim: 		"02-02-2022",
},{
	matricula: 		"Mat1",
	marca: 			"BWM",
	ano: 			"2030",
	seguradora: 	"Fidelidade",
	data_inicio: 	"01-01-2023",
	data_fim: 		"01-01-2024",
}, {
	matricula: 		"Mat2",
	marca: 			"Opel",
	ano: 			"2029",
	seguradora: 	"Seguros",
	data_inicio: 	"01-01-2021",
	data_fim: 		"02-02-2022",
},{
	matricula: 		"Mat1",
	marca: 			"BWM",
	ano: 			"2030",
	seguradora: 	"Fidelidade",
	data_inicio: 	"01-01-2023",
	data_fim: 		"01-01-2024",
}, {
	matricula: 		"Mat2",
	marca: 			"Opel",
	ano: 			"2029",
	seguradora: 	"Seguros",
	data_inicio: 	"01-01-2021",
	data_fim: 		"02-02-2022",
},];
function ReadViaturas() {
	const [viaturaSearch, setViaturaSearch] = useState(null);
	const [pendingViaturas, setPendingViaturas] = React.useState(true);
	const [viaturas, setViaturas] = React.useState([]);
	const [filteredViaturas, setFilteredViaturas] = React.useState([]);

	// fakeUsers.filter(
	// 	item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	// );

	function handleSearchViatura(event) {
		setViaturaSearch(event.target.value);
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

		//getAPI to get viaturas of an obra

		
		const timeout = setTimeout(() => {
			setViaturas(temp);
			setFilteredViaturas(temp);
			setPendingViaturas(false);
		}, 1000);
		return () => clearTimeout(timeout);

	}, [])


	return (
		<div className="bg-light min-vh-100 d-flex flex-row align-items-top">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md={9}>
						<CCardGroup>
							<CCard className="p-4">
								<CCardBody>
									<CRow >
										<CHeaderNav >
											<h1>Viaturas</h1>
											<CForm className="d-flex" style={{ maxHeight: '75%', marginLeft: '10Rem' }}>
												<CFormInput type="search" placeholder="Search" onChange={handleSearchViatura} />
												<CButton type="submit" color="dark" variant="outline">
													<CIcon icon={cilSearch} size="xl" />
												</CButton>
											</CForm>

											<CNavLink to="/addviaturas" component={NavLink} style={{ marginLeft: '1Rem' }}>
												<CCard className={`mb-3 border-${"dark"}`}>
													<CIcon icon={cilPlus} size="3xl" />
												</CCard>
											</CNavLink>
										</CHeaderNav>
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
						</CCardGroup>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	)
}

export default ReadViaturas
