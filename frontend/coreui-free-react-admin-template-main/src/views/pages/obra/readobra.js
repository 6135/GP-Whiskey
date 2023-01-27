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
  CButtonGroup,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { cilPencil, cilTrash ,cilPlus,cilSearch} from '@coreui/icons';
import { CCollapse } from '@coreui/react'
import { CListGroupItem,CListGroup } from '@coreui/react' 
import moment from 'moment';


function Readobra  ()  {
    const [obra, setObra] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      getAPI("http://127.0.0.1:8000/constructions/obra").then(result => {
        console.log(result);
        if(result.status !== "nao existem obras")
          setObra(result);
      })
  
    }, []);
    return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-top">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                    <CRow >
                        <CHeaderNav>
                            <h1>Listagem de Obras</h1>
                            <CForm className="d-flex" style={{ maxHeight: '75%' , marginLeft: '5Rem' }}>
                                <CFormInput type="search" placeholder="Search" />
                                <CButton type="submit" color="dark" variant="outline">
                                    <CIcon icon={cilSearch} size="xl"/>
                                </CButton>
                            </CForm>

                            <CNavLink to="/addobra" component={NavLink} style={{ marginLeft: '1Rem' }}>
                                <CCard className= {`mb-3 border-${"dark"}`}>
                                        <CIcon icon={cilPlus} size="3xl"/>
                                </CCard>
                            </CNavLink>
                                <CFormCheck id="flexCheckDefault" label="Terminadas" style={{ marginLeft: '1Rem' }} />
                        </CHeaderNav>
                    </CRow>                    
                <>
                {obra && obra.map(item => {return (
                    <CCard
                    // textColor={item.textColor}
                    className={`mb-3 border-top-${'dark'} border-top-3`}
                    style={{ maxWidth: '100%' }}
                    key={item.id}
                    >
                    <CCardHeader>
                        <CHeaderNav>
                            <h5>{item.nome}</h5>
                            <CNavLink to="/readmedicoes" component={NavLink} style={{ marginLeft: '40%' }}>
                                <CButton color="light">
                                    Medições 
                                </CButton>
                            </CNavLink>
                            <CButton color="light"  style={{marginLeft: '3%'}}>
                                Upload photo
                            </CButton>
                            <CIcon icon={cilTrash} size="xl" style={{marginLeft: '3%'}}/>
                                {/* arquivar obra */}
                        </CHeaderNav>
                    </CCardHeader>
                    <CCardBody>
                        {/* <CCardTitle>{item.color} card title</CCardTitle> */}
                        <CButtonGroup style={{padding : '2%'}}>
                            <CNavLink to="/gastosextra" component={NavLink} style={{ marginLeft: '1Rem' }}>
                                <CButton  color="light">
                                    Gastos Extra
                                </CButton>
                            </CNavLink>
                            <CNavLink to="/readhotel" component={NavLink}>
                                <CButton color="light">
                                    Hoteis 
                                </CButton>
                            </CNavLink>
                            <CNavLink to="/readrestaurante" component={NavLink}>
                                <CButton color="light">
                                    Restaurantes
                                </CButton>
                            </CNavLink>
                            <CNavLink to="/readviaturas" component={NavLink}>
                                <CButton color="light">
                                    Viaturas
                                </CButton>
                            </CNavLink>  
                            <CNavLink to="/readfornecedores" component={NavLink}>
                                <CButton color="light">
                                    Fornecedores
                                </CButton>
                            </CNavLink>          
                         </CButtonGroup>
                            <CContainer fluid>
                                <CListGroup>
                                    <CListGroupItem>
                                            <h6>Cliente </h6> {item.cliente}
                                    </CListGroupItem>
                                    <CListGroupItem>
                                            <h6>Funcionários </h6> {item.funcionarios.map(item => {return (
                                            item.nome 
                                            )})}
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        {moment(item.data_inicio).format('MM/DD/YYYY')} - {moment(item.data_conclusao).format('MM/DD/YYYY') }
                                    </CListGroupItem>
                                    <CListGroupItem>
                                            <h6>Relatório </h6> <CButton color="link">relatorio.pdf</CButton>
                                    </CListGroupItem>
                                </CListGroup>
                            </CContainer>
                    </CCardBody>
                    </CCard>
                )})}
                </>
                </CCardBody>
              </CCard>
             
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Readobra
