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
import { cilPencil, cilUserX, cilPlus, cilSearch } from '@coreui/icons';
import { CCollapse } from '@coreui/react'
import ReadViaturas from '../viaturas/readviaturas';
import ReadFuncionarios from '../funcionarios/ReadFuncionarios';
import ReadGastosObra from '../gastosextra/gastosextra';
import ReadRestaurantes from '../Restaurantes/readrestaurantes';
import ReadFornecedores from '../fornecedores/fornecedores';


function ReadDetalhes() {

	return (
		<div className="bg-light min-vh-100 d-flex flex-row align-items-top">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md={9}>
						<CCardGroup>
                            <ReadFuncionarios/>
                        </CCardGroup>
                        <CCardGroup className='mt-3'>
                            <ReadViaturas/>
                        </CCardGroup>
                        <CCardGroup className='mt-3'>
                            <ReadGastosObra/>
                        </CCardGroup>
                        <CCardGroup className='mt-3'>
                            <ReadRestaurantes/>
                        </CCardGroup>
                        <CCardGroup className='mt-3'>
                            <ReadFornecedores/>
                        </CCardGroup>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	)
}

export default ReadDetalhes
