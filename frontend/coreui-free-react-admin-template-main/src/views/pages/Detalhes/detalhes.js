import React, { useState, useEffect } from 'react'
import { getAPI,postAPI } from '../../../services/serviceapi';
import { useNavigate,useLocation } from "react-router-dom";
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
 //Neste ecra, entramos no scope de apenas UMA obra
 const [obra, setObra] = useState([]);
 const location = useLocation();
 const navigate = useNavigate();

 useEffect(() => {
    async function func() {
        const { response, err, authenticated } = await postAPI("http://127.0.0.1:8000/constructions/detailsobra", { "obraid": location.state.obraid });
        //if (!authenticated)
        //  navigate("/Login");
  
          
        setObra(response);
      }
      func();
      console.log(obra)
}, []);

	return (
		<div className="bg-light min-vh-100 d-flex flex-row align-items-top">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md={9}>
						<CCardGroup>
                            <ReadFuncionarios/>
                            {/* detaildata={{funcionarios: obra.funcionarios}} */}
                        </CCardGroup>
                        <CCardGroup className='mt-3' detaildata= {{viaturas: obra.carros}}>
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
