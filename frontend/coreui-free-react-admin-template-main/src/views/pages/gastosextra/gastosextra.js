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
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { cilPencil, cilFolder,cilPlus,cilSearch} from '@coreui/icons';
import { CCollapse } from '@coreui/react'
import DataTable from 'react-data-table-component';


const columns = [
	{
		name: 'Obra',
		selector: row => row.obra,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Descrição',
		selector: row => row.descricao,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Data',
		selector: row => row.data,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Preço',
		selector: row => row.preco,
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

function ReadGastosObra  ()  {
  const [pendingData, setPendingData] = React.useState(true);
	const [Data, setData] = React.useState([]);
	const [filteredData, setFilteredData] = React.useState([]);

  function handleSearchData(event) {
		setFilteredData(
			Data.filter(Data => {
				return (Data.nome && Data.nome.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(Data.email && Data.email.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(Data.cargo && Data.cargo.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(Data.seguro_saude && Data.seguro_saude.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(Data.data_inicio && Data.data_inicio.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(Data.data_conclusao && Data.data_conclusao.toLowerCase().includes(event.target.value.toLowerCase()))

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
											<h1>Gastos Extra</h1>
										</CCol>
										<CCol className='justify-content-end'>
											<CInputGroup>
												<CFormInput type="search" placeholder="Search" />
												<CButton type="submit" color="dark" variant="outline">
													<CIcon icon={cilSearch} size="xl" />
												</CButton>&nbsp;
												<CNavLink type="button" to="/addgasto" component={NavLink} className="btn btn-outline-dark ">
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

export default ReadGastosObra
