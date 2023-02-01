import React ,{ useState, useEffect } from 'react'
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
import { cilLockLocked, cilUser,cilCalendar,cilEuro} from '@coreui/icons'
import { postAPI } from '../../../services/serviceapi';

function AddGasto () {

  const [data, setData] = useState(
		{
			descricao: '',
			data: '',
			preco: '',
			
		});

    function handleChange(event) {
      setData(item => ({
        ...item,
        [event.target.name]: event.target.value
      }))
      console.log(data);
    }
  
    function handleSubmit() {
      console.log(data);
      postAPI("http://127.0.0.1:8000/constructions/gastosextra", data).then(result => {
        console.log(result.status);
      })
      
    }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-top">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} >
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Registar Gasto Extra</h1>
                  {/* <p className="text-medium-emphasis">Registar Funcionário</p> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Descrição" autoComplete="descrição" 
                    name="descricao"
                    value={data.descricao} onChange={handleChange}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <CFormInput placeholder="Data" autoComplete="data" 
                    name="data"
                    value={data.data} onChange={handleChange}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilEuro} />
                    </CInputGroupText>
                    <CFormInput placeholder="Valor" autoComplete="valor" 
                    name="preco"
                    value={data.preco} onChange={handleChange}/>
                  </CInputGroup>
                  <div className="d-grid">
                    
                    <CButton value="Submit" onClick={handleSubmit} color="dark">Guardar</CButton>
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

export default AddGasto
