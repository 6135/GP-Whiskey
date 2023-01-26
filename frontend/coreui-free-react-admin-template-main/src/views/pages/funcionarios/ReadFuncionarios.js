import React from 'react'
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


const ReadFuncionarios = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-top">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <CRow >
                        <CHeaderNav >
                            <h1>Funcionários</h1>
                            <CForm className="d-flex" style={{ maxHeight: '75%' , marginLeft: '10Rem' }}>
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
                                <CFormCheck id="flexCheckDefault" label="Arquivadas" style={{ marginLeft: '1Rem' }} />
                        </CHeaderNav>
                    </CRow>

                    <p className="text-medium-emphasis">Funcionários registados na empresa</p>
                    
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
                        <h5>Adelaide</h5>
                            <CNavLink to="/dashboard" component={NavLink}>
                                <CIcon icon={cilPencil} size="xl"/>
                                {/* editar utilizador somehow passar dados do user p la 
                                    usar item.? */}
                            </CNavLink>
                                <CIcon icon={cilUserX} size="xl"/>
                                {/* arquivar utilizador */}
                        </CHeaderNav>
                    </CCardHeader>
                    <CCardBody>
                        {/* <CCardTitle>{item.color} card title</CCardTitle> */}
                        <CCardText>
                        <p>Nome </p>
                        <p>Email </p>
                        </CCardText>
                    </CCardBody>
                    </CCard>
                ))}
                </>

               {/*      <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText> */}
                     {/*  <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      /> */}
                    {/* </CInputGroup> */}
                    {/* <CRow> */}
                      {/* <CCol xs={6}>
                        <CButton color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol> */}
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    {/* </CRow> */}
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ReadFuncionarios
