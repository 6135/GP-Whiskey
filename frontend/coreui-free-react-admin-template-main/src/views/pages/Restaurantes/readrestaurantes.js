import React, { useState, useEffect } from 'react'
import { getAPI } from '../../../hooks/serviceapi';
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { cilPencil, cilFolder,cilPlus,cilSearch} from '@coreui/icons';
import { CCollapse } from '@coreui/react'
import DataTable from 'react-data-table-component';

const columns = [
	{
		name: 'Nome',
		selector: row => row.nome,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Email',
		selector: row => row.email,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Telefone',
		selector: row => row.telefone,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Morada',
		selector: row => row.morada,
		sortable: true,
		reorder: true,
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
	nome: "restaurante 1",
	email: "restaurante@gmail",
	telefone: "99999",
	morada: "rua das pombas",
}, {
	nome: "restaurante 1",
	email: "restaurante@gmail",
	telefone: "99999",
	morada: "rua das pombas",
}, {
	nome: "restaurante 1",
	email: "restaurante@gmail",
	telefone: "99999",
	morada: "rua das pombas",
}, {
	nome: "restaurante 1",
	email: "restaurante@gmail",
	telefone: "99999",
	morada: "rua das pombas",
}, {
	nome: "restaurante 1",
	email: "restaurante@gmail",
	telefone: "99999",
	morada: "rua das pombas",
}, {
	nome: "restaurante 1",
	email: "restaurante@gmail",
	telefone: "99999",
	morada: "rua das pombas",
},];


function ReadRestaurantes  ()  {
  const [pendingData, setPendingData] = React.useState(true);
	const [data, setData] = React.useState([]);
	const [filteredData, setFilteredData] = React.useState([]);

  function handleSearchData(event) {
		setFilteredData(
			data.filter(data => {
				return (data.nome && data.nome.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(data.email && data.email.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(data.telefone && data.telefone.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(data.morada && data.morada.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(data.data_inicio && data.data_inicio.toLowerCase().includes(event.target.value.toLowerCase()))

			}));
	}

  useEffect(() => {


		const timeout = setTimeout(() => {
			setData(temp);
			setFilteredData(temp);
			setPendingData(false);
		}, 1000);
		return () => clearTimeout(timeout);

	}, [])
  return (

              <CCard className="p-4">
                <CCardBody>
                    <CRow className='pb-4'>
										<CCol>
											<h1>Restaurantes</h1>
										</CCol>
										<CCol className='justify-content-end'>
											<CInputGroup>
												<CFormInput type="search" placeholder="Search" />
												<CButton type="submit" color="dark" variant="outline">
													<CIcon icon={cilSearch} size="xl" />
												</CButton>&nbsp;
												<CNavLink type="button" to="/addRestaurante" component={NavLink} className="btn btn-outline-dark ">
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
                      highlightOnHover
                      paginationPerPage={5}
                      paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50, 75, 100]}
              />
               
                </CCardBody>
              </CCard>
            
  )
}

export default ReadRestaurantes
