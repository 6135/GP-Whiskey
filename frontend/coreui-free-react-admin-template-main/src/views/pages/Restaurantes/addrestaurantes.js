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
import { cilLockLocked, cilUser,cilCalendar,cilEuro,cilPhone,cilHome,cilLocationPin} from '@coreui/icons'
import { postAPI } from '../../../services/serviceapi';


function AddRestaurante  ()  {

  const [data, setData] = useState(
		{
			nome: '',
			email: '',
			telefone: '',
      morada: '',
			
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
      postAPI("http://127.0.0.1:8000/constructions/restaurante", data).then(result => {
        console.log(result.status);
      })
      
    }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-top">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={10} >
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Registar Restaurante</h1>
                  {/* <p className="text-medium-emphasis">Registar Funcionário</p> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Nome" autoComplete="nome" 
                     name="nome"
                     value={data.nome} onChange={handleChange}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email"
                     name="email"
                     value={data.email} onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput placeholder="Telefone" autoComplete="telefone" 
                     name="telefone"
                     value={data.telefone} onChange={handleChange}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilHome} />
                    </CInputGroupText>
                    <CFormInput placeholder="Morada" autoComplete="morada" 
                     name="morada"
                     value={data.morada} onChange={handleChange}/>
                  </CInputGroup>
{/*                   <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilLocationPin} />
                    </CInputGroupText>
                    <CFormInput placeholder="Localização" autoComplete="localização" />
                  </CInputGroup> */}
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

export default AddRestaurante
