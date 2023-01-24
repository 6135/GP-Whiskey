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
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { cilPencil, cilTrash ,cilPlus,cilSearch} from '@coreui/icons';
import { CCollapse } from '@coreui/react'
import { CListGroupItem,CListGroup } from '@coreui/react' 

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
                        <CHeaderNav >
                            <h1>Listagem de Obras</h1>
                            <CForm className="d-flex" style={{ maxHeight: '75%' , marginLeft: '5Rem' }}>
                                <CFormInput type="search" placeholder="Search" />
                                <CButton type="submit" color="dark" variant="outline">
                                    <CIcon icon={cilSearch} size="xl"/>
                                </CButton>
                            </CForm>

                            <CNavLink to="/addFuncionarios" component={NavLink} style={{ marginLeft: '1Rem' }}>
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
                    key={obra.id}
                    >
                    <CCardHeader>
                        <CHeaderNav>
                        <h5>{item.nome}</h5>
                            <CNavLink to="/dashboard" component={NavLink}>
                                <CIcon icon={cilPencil} size="xl"/>
                                {/* editar utilizador somehow passar dados do user p la 
                                    usar item.? */}
                            </CNavLink>
                                <CIcon icon={cilTrash} size="xl"/>
                                {/* arquivar utilizador */}
                        </CHeaderNav>
                    </CCardHeader>
                    <CCardBody>
                        {/* <CCardTitle>{item.color} card title</CCardTitle> */}
                            <CContainer fluid>
                                <CListGroup>
                                    <CListGroupItem>
                                        <CCardText>
                                            {item.cliente}
                                        </CCardText>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <CCardText>
                                        {item.funcionarios.map(item => {return (
                                            item.nome 
                                            )})}
                                        </CCardText>
                                    </CListGroupItem>
                                    <CListGroupItem><CCardText>{item.data_inicio}</CCardText></CListGroupItem>
                                    <CListGroupItem><CCardText>{item.data_conclusao}</CCardText></CListGroupItem>
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
