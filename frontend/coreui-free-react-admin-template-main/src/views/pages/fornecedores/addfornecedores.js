import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser,cilPhone,cilDollar ,cilHome} from '@coreui/icons'

const Register = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-top">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} >
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Registar Fornecedor</h1>
                  {/* <p className="text-medium-emphasis">Registar Funcionário</p> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Nome" autoComplete="nome" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        @
                    </CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Tipo" autoComplete="tipo" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput placeholder="Telefone" autoComplete="telefone" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilHome} />
                    </CInputGroupText>
                    <CFormInput placeholder="Morada" autoComplete="morada" />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="dark">Guardar</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
