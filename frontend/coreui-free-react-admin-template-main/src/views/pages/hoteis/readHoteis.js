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
import { cilPencil, cilUserX,cilPlus,cilSearch} from '@coreui/icons';
import { CCollapse } from '@coreui/react'
import { CAccordionItem,CAccordionHeader,CAccordionBody } from '@coreui/react'


function ReadHoteis  ()  {
   
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
                            <h1>Hotéis</h1>
                            <CForm className="d-flex" style={{ maxHeight: '75%' , marginLeft: '5Rem' }}>
                                <CFormInput type="search" placeholder="Search" />
                                <CButton type="submit" color="dark" variant="outline">
                                    <CIcon icon={cilSearch} size="xl"/>
                                </CButton>
                            </CForm>

                            <CNavLink to="/addhotel" component={NavLink} style={{ marginLeft: '1Rem' }}>
                                <CCard className= {`mb-3 border-${"dark"}`}>
                                        <CIcon icon={cilPlus} size="3xl"/>
                                </CCard>
                            </CNavLink>
                                <CFormCheck id="flexCheckDefault" label="Arquivadas" style={{ marginLeft: '1Rem' }} />
                        </CHeaderNav>
                    </CRow>
                    <p className="text-medium-emphasis">Hoteis e reservas relativos à Obra X</p>
                    
                                    <>
                {[
                    /* { color: 'primary', textColor: 'primary' },
                    { color: 'secondary', textColor: 'secondary' },
                    { color: 'success', textColor: 'success' },
                    { color: 'danger', textColor: 'danger' },
                    { color: 'warning', textColor: 'warning' },
                    { color: 'info', textColor: 'info' }, 
                    colocar array de funcionarios */
                    { color: 'light' },
                    { color: 'dark' },
                ].map((item, index) => (
                    <CCard
                    // textColor={item.textColor}
                    className={`mb-3 border-top-${'dark'} border-top-3`}
                    style={{ maxWidth: '100%' }}
                    key={index}
                    >
                    <CCardHeader>
                        <CHeaderNav>
                        <h5>Hotel 1</h5>
                            <CNavLink to="/dashboard" component={NavLink}>
                                <CIcon icon={cilPencil} size="xl"/>
                                {/* editar utilizador somehow passar dados do user p la 
                                    usar item.? */}
                            </CNavLink>
                        </CHeaderNav>
                    </CCardHeader>
                    <CCardBody>
                        <h6>Nome </h6>
                        <h6>Email </h6>
                        <h6>morada</h6>
                        
                        {[
                    /* { color: 'primary', textColor: 'primary' },
                    { color: 'secondary', textColor: 'secondary' },
                    { color: 'success', textColor: 'success' },
                    { color: 'danger', textColor: 'danger' },
                    { color: 'warning', textColor: 'warning' },
                    { color: 'info', textColor: 'info' }, 
                    colocar array de funcionarios */
                    { color: 'light' },
                    { color: 'dark' },
                ].map((item, index) => (
                    <CCard
                    // textColor={item.textColor}
                    className={`mb-3 border-top-${'dark'} border-top-3`}
                    style={{ maxWidth: '100%' }}
                    key={index}
                    >
                    <CCardHeader>
                        <CHeaderNav>
                        <h6>Reserva 1</h6>
                            <CNavLink to="/dashboard" component={NavLink}>
                                <CIcon icon={cilPlus} size="xl"/>
                                {/* editar utilizador somehow passar dados do user p la 
                                    usar item.? */}
                            </CNavLink>
                            <CNavLink to="/dashboard" component={NavLink}>
                                <CIcon icon={cilPencil} size="xl"/>
                                {/* editar utilizador somehow passar dados do user p la 
                                    usar item.? */}
                            </CNavLink>
                        </CHeaderNav>
                    </CCardHeader>
                    <CCardBody>
                        <h6>data inicio </h6>
                        <h6>data fim </h6>
                    </CCardBody>
                    </CCard>
                ))}
                
                    </CCardBody>
                    </CCard>
                ))}
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

export default ReadHoteis
