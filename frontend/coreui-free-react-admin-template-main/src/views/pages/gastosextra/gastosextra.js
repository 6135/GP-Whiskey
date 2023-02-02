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
	CInputGroup,
	CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { cilPencil, cilFolder, cilPlus, cilSearch } from '@coreui/icons';
import { CCollapse } from '@coreui/react'
import DataTable from 'react-data-table-component';
import CTableCell from '../../../components/CTableCell';

const columns = [
	{
		name: 'Descrição',
		selector: row => row.descricao,
		sortable: true,
		reorder: true,
		cell: row => <CTableCell data={row.descricao} />
	},
	{
		name: 'Data',
		selector: row => row.data,
		sortable: true,
		reorder: true,
		cell: row => <CTableCell data={row.data} />
	},
	{
		name: 'Preço',
		selector: row => row.preco,
		sortable: true,
		reorder: true,
		cell: row => <CTableCell data={row.preco} />
	}, {
		name: 'Ações',
		cell: row => (
			<><CNavLink type="button" to={`/funcionarios/editfuncionarios/${row.matricula}`}>
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
	obra: "obra1",
	descricao: "muito fixe",
	data: "4-3-5",
	preco: "40",
}, {
	obra: "esta obra",
	descricao: "que lindo",
	data: "3-3-3",
	preco: "21",
}, {
	obra: "Ana",
	descricao: "ana@gmail",
	data: "Engenheiro de Obra",
	preco: "Fidelidade",
}, {
	obra: "Ana",
	descricao: "ana@gmail",
	data: "Engenheiro de Obra",
	preco: "Fidelidade",
}, {
	obra: "Ana",
	descricao: "ana@gmail",
	data: "Engenheiro de Obra",
	preco: "Fidelidade",
}, {
	obra: "Ana",
	descricao: "ana@gmail",
	data: "Engenheiro de Obra",
	preco: "Fidelidade",
},];

function ReadGastosObra({ detaildata }) {
	const [pendingData, setPendingData] = React.useState(true);
	const [data, setData] = React.useState([]);
	const [filteredData, setFilteredData] = React.useState([]);
	const navigate = useNavigate();
	function handleSearchData(event) {
		setFilteredData(
			data.filter(data => {
				return (data.nome && data.nome.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(data.email && data.email.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(data.cargo && data.cargo.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(data.seguro_saude && data.seguro_saude.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(data.data_inicio && data.data_inicio.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(data.data_conclusao && data.data_conclusao.toLowerCase().includes(event.target.value.toLowerCase()))

			}));
	}

	useEffect(() => {
		async function func() {

			if (detaildata) {
				// console.log(detaildata.id_obra);
				const timeout = setTimeout(() => {
					setData(detaildata.gastos_extra);
					setFilteredData(detaildata.gastos_extra);
					setPendingData(false);
				}, 2000);
				return () => clearTimeout(timeout);
			}
			else {
				navigate("/");
				// const { response, err, authenticated } = await getAPI("http://localhost:8000/constructions/gastosextra");
				// if (!authenticated)
				// 	navigate("/Login");
				// if (response.status !== 404) {
				// 	setData(response);
				// 	setFilteredData(response);
				// }
				// setPendingData(false);
			}
		}
		func();
	}, [detaildata])

	function handlenavgasto()
	{
		navigate("/addgasto",{state: {id_obra:detaildata.id_obra}});
	}
	return (

		<CCard className="">
			<CCardBody>

				<CRow className='pb-4'>
					<CCol className='col-md-6 col-12'>
						<h1>Gastos Extra</h1>
					</CCol>
					<CCol className='col-md-6 col-12 justify-content-end'>
						<CInputGroup>
							<CFormInput type="search" placeholder="Search" onChange={handleSearchData} />
							<CButton type="submit" color="dark" variant="outline">
								<CIcon icon={cilSearch} size="xl" />
							</CButton>&nbsp;
							<CNavLink onClick={handlenavgasto} type="button"  className="btn btn-outline-dark ">
								<CIcon icon={cilPlus} size="3xl" />
							</CNavLink>
						</CInputGroup>
					</CCol>
				</CRow>


				<DataTable
					striped
					pagination
					columns={columns}
					data={filteredData}
					progressPending={pendingData}
					highlightOnHover responsive
					paginationPerPage={5}
					paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50, 75, 100]}
				/>
			</CCardBody>
		</CCard>

	)
}

export default ReadGastosObra
