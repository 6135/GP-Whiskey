import React, { useState, useEffect } from 'react'
import {
  CCardTitle,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CCardHeader,
  CRow,
  CButton,
  CHeaderNav,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { cilPencil, cilUserX, cilPlus, cilSearch } from '@coreui/icons';
import { CCollapse } from '@coreui/react'
import { CButtonToolbar, CButtonGroup } from '@coreui/react'
import { CTableBody, CTableRow, CTableDataCell, CTableHeaderCell, CTable, CTableHead } from '@coreui/react'


function ReadMedicoes() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-top">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={10}>
            <CCardGroup>
              <CCard className="">
                <CCardBody>
                  <CForm>
                    <CRow >
                      <CHeaderNav >
                        <h1>Medições</h1>
                      </CHeaderNav>
                    </CRow>

                    <p className="text-medium-emphasis">Medições da Obra X</p>

                    <CContainer>
                      <CRow>
                        <CCol xs={4} >
                          <CCard
                            className={`mb-3 border-$dark`}
                          >
                            <CCardBody>
                              <CCardTitle> Equipamentos </CCardTitle>
                              <CCol>
                                {[
                                  /* { color: 'primary', textColor: 'primary' },
                                  { color: 'secondary', textColor: 'secondary' },
                                  { color: 'success', textColor: 'success' },
                                  { color: 'danger', textColor: 'danger' },
                                  { color: 'warning', textColor: 'warning' },
                                  { color: 'info', textColor: 'info' }, 
                                  colocar array de funcionarios */
                                  { color: 'light', id: '1' },
                                  { color: 'dark', id: '2' },
                                ].map((item, index) => (
                                  <CRow key={item.id}><CButton color="secondary" variant="ghost" onClick={() => handleButtonClick(item.id)} key={item.id}>
                                    {item.color}
                                  </CButton></CRow>




                                ))}
                              </CCol>
                            </CCardBody>
                          </CCard>
                        </CCol>
                        <CCol xs={8} >
                          <CCard
                            className={`mb-3 border-$dark`}
                            style={{ marginLeft: '0%' }}
                          >
                            <CCardBody>
                              <CCardTitle>  </CCardTitle>
                              {[
                                /* { color: 'primary', textColor: 'primary' },
                                { color: 'secondary', textColor: 'secondary' },
                                { color: 'success', textColor: 'success' },
                                { color: 'danger', textColor: 'danger' },
                                { color: 'warning', textColor: 'warning' },
                                { color: 'info', textColor: 'info' }, 
                                colocar array de funcionarios */
                                { color: 'light', id: '1' },
                                { color: 'dark', id: '2' },
                              ].map((item, index) => (
                                <div key={item.id} >

                                  {
                                    selectedButton === item.id &&

                                    <><h5>Equipamento {item.id}</h5>
                                      <h6>Id</h6>
                                      <h6>Ultima Atualização</h6>

                                      <h6>Obra</h6>
                                      <CCard>
                                        <CCardHeader><h6>Medições</h6></CCardHeader>


                                        <CTable>
                                          <CTableHead>
                                            <CTableRow>
                                              <CTableHeaderCell scope="col">id</CTableHeaderCell>
                                              <CTableHeaderCell scope="col">Data</CTableHeaderCell>
                                              <CTableHeaderCell scope="col">Hora</CTableHeaderCell>
                                              <CTableHeaderCell scope="col">Valor</CTableHeaderCell>
                                            </CTableRow>
                                          </CTableHead>
                                          <CTableBody >
                                            {[
                                              /* { color: 'primary', textColor: 'primary' },
                                              { color: 'secondary', textColor: 'secondary' },
                                              { color: 'success', textColor: 'success' },
                                              { color: 'danger', textColor: 'danger' },
                                              { color: 'warning', textColor: 'warning' },
                                              { color: 'info', textColor: 'info' }, 
                                              colocar array de funcionarios */
                                              { color: 'ai', nome: '55-5-5', id: '1' },
                                              { color: 'ui', nome: '66-6-6', id: '2' },
                                            ].map((item, index) => (
                                              selectedButton === item.id &&
                                              <CTableRow key={index}>
                                                <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                                                <CTableDataCell>{item.color}</CTableDataCell>
                                                <CTableDataCell>{item.nome}</CTableDataCell>
                                                <CTableDataCell>@mdo</CTableDataCell>
                                              </CTableRow>
                                            ))}


                                          </CTableBody>
                                        </CTable>

                                      </CCard>
                                    </>}
                                </div>
                              ))}

                            </CCardBody>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CContainer>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ReadMedicoes
